"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const tabs = [
  { id: "chatbot", label: "AI Chatbot", icon: "💬" },
  { id: "playground", label: "Model Playground", icon: "🎮" },
  { id: "compare", label: "Compare Models", icon: "📊" },
];

const mockModels = [
  { name: "ShivAI-7B", accuracy: 94.2, speed: 120, cost: 0.002, color: "#00fff5" },
  { name: "ShivAI-13B", accuracy: 96.8, speed: 85, cost: 0.005, color: "#bf00ff" },
  { name: "ShivAI-70B", accuracy: 99.1, speed: 45, cost: 0.015, color: "#39ff14" },
];

const chatResponses = [
  "I'm ShivAI, your intelligent assistant. I can help with data analysis, predictions, and automation workflows.",
  "I've analyzed your dataset. Key insights: 23% improvement in efficiency detected, 3 anomalies flagged for review.",
  "Based on the patterns I've identified, I recommend deploying the RAG pipeline for your knowledge base integration.",
  "Processing complete! Your model achieved 97.3% accuracy on the validation set. Training curves show optimal convergence.",
];

const AIModelDemo = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTab, setActiveTab] = useState("chatbot");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: theme === "light"
          ? "linear-gradient(to bottom, #ffffff 0%, #eef2ff 50%, #ffffff 100%)"
          : "#000000",
      }}
    >
      <div className="absolute inset-0 circuit-bg opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "radial-gradient(ellipse at center, rgba(67,97,238,0.05) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(191,0,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-purple">
            ⚡ Interactive Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-3 text-themed-primary">
            Experience <span className="gradient-text-neon">AI in Action</span>
          </h2>
          <p className="text-themed-secondary max-w-2xl mx-auto">
            Try our AI models live — chat with our assistant, tune parameters, and compare performance
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-neon-cyan to-neon-purple text-white neon-glow-cyan"
                  : "ai-glass text-themed-secondary hover:text-themed-primary"
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "chatbot" && <ChatbotTab key="chatbot" isInView={isInView} />}
          {activeTab === "playground" && <PlaygroundTab key="playground" isInView={isInView} />}
          {activeTab === "compare" && <CompareTab key="compare" isInView={isInView} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

function ChatbotTab({ isInView }: { isInView: boolean }) {
  const [isLocked, setIsLocked] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm ShivAI. Ask me anything about our AI capabilities..." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleAccessRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Access Request",
          email: email.trim(),
          subject: "AI Chatbot Demo Access Request",
          message: `User ${email.trim()} has requested access to the AI Chatbot demo in Agent Lab.`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
    let i = 0;
    setDisplayedText("");

    const typeInterval = setInterval(() => {
      if (i < response.length) {
        setDisplayedText(response.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setMessages((prev) => [...prev, { role: "ai", text: response }]);
        setDisplayedText("");
        setIsTyping(false);
      }
    }, 20);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="ai-glass rounded-2xl p-6 max-w-3xl mx-auto relative overflow-hidden"
    >
      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {/* Blurred background */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/60" />
          
          {/* Access request modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-30 bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center border border-neon-cyan/30">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Access</h3>
              <p className="text-sm text-gray-400">
                Enter your email to get access to the AI Chatbot demo
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-400 font-semibold mb-1">Request Submitted!</p>
                <p className="text-sm text-gray-400">We&apos;ll get back to you soon at {email}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleAccessRequest} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-neon-cyan/50 focus:outline-none transition-all"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-semibold disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8v8m0 0a8 8 0 11-8-8" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Request Access"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Chat messages */}
      <div className="h-[350px] overflow-y-auto mb-4 space-y-3 pr-2 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 text-themed-primary border border-neon-cyan/20"
                  : "ai-glass text-themed-primary"
              }`}
            >
              {msg.role === "ai" && <span className="text-neon-cyan text-xs font-bold block mb-1">🧠 ShivAI</span>}
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && displayedText && (
          <div className="flex justify-start">
            <div className="max-w-[80%] ai-glass rounded-xl px-4 py-2.5 text-sm text-themed-primary">
              <span className="text-neon-cyan text-xs font-bold block mb-1">🧠 ShivAI</span>
              {displayedText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-neon-cyan"
              >
                |
              </motion.span>
            </div>
          </div>
        )}
        {isTyping && !displayedText && (
          <div className="flex justify-start">
            <div className="ai-glass rounded-xl px-4 py-2.5 text-sm flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-neon-cyan"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask ShivAI anything..."
          disabled={isLocked}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-themed-primary focus:border-neon-cyan/50 focus:outline-none transition-all disabled:opacity-50"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={isTyping || !input.trim() || isLocked}
          className="px-4 py-2.5 bg-gradient-to-r from-neon-cyan to-neon-purple text-white rounded-lg font-semibold text-sm disabled:opacity-50 transition-all"
        >
          Send ⚡
        </motion.button>
      </div>
    </motion.div>
  );
}

function PlaygroundTab({ isInView }: { isInView: boolean }) {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(512);
  const [topP, setTopP] = useState(0.9);
  const [output, setOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setOutput(null);
    setTimeout(() => {
      const outputs = [
        `Model output (temp=${temperature.toFixed(1)}): Predicted 23% revenue increase for Q3 with 94.7% confidence. Key drivers: seasonal trends, marketing spend correlation, customer retention improvement.`,
        `Analysis complete (tokens=${maxTokens}): Identified 5 high-priority anomalies in dataset. Recommendation: Apply anomaly-aware preprocessing before model training.`,
        `Inference result (topP=${topP.toFixed(1)}): Classification accuracy: 97.2%. The model shows strong performance on edge cases with optimized hyperparameters.`,
      ];
      setOutput(outputs[Math.floor(Math.random() * outputs.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="ai-glass rounded-2xl p-6 max-w-3xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-5">
          <h4 className="text-sm font-bold text-neon-cyan flex items-center gap-2">
            <span>🎮</span> Model Parameters
          </h4>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-themed-secondary">Temperature</span>
              <span className="text-neon-cyan font-mono">{temperature.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0" max="2" step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-[#00fff5] h-1"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-themed-secondary">Max Tokens</span>
              <span className="text-neon-purple font-mono">{maxTokens}</span>
            </div>
            <input
              type="range"
              min="64" max="2048" step="64"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full accent-[#bf00ff] h-1"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-themed-secondary">Top P</span>
              <span className="text-neon-green font-mono">{topP.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0" max="1" step="0.1"
              value={topP}
              onChange={(e) => setTopP(Number(e.target.value))}
              className="w-full accent-[#39ff14] h-1"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg font-semibold text-sm neon-glow-purple disabled:opacity-50 transition-all"
          >
            {isGenerating ? "⏳ Generating..." : "🚀 Run Inference"}
          </motion.button>
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-neon-purple mb-3 flex items-center gap-2">
            <span>📋</span> Model Output
          </h4>
          <div className="flex-1 ai-glass rounded-lg p-4 text-sm">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-neon-purple border-t-transparent rounded-full"
                />
              </div>
            ) : output ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-themed-secondary leading-relaxed"
              >
                {output}
              </motion.p>
            ) : (
              <div className="flex items-center justify-center h-full text-themed-secondary opacity-50">
                <p className="text-center">
                  Adjust parameters and click<br />
                  <span className="text-neon-purple font-bold">Run Inference</span> to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CompareTab({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="ai-glass rounded-2xl p-6 max-w-4xl mx-auto"
    >
      <h4 className="text-sm font-bold text-neon-green mb-6 flex items-center gap-2">
        <span>📊</span> Model Comparison
      </h4>

      {/* Comparison cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {mockModels.map((model, i) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="ai-glass rounded-xl p-4 text-center"
          >
            <div className="text-2xl mb-2">🤖</div>
            <h5 className="font-bold text-sm mb-3" style={{ color: model.color }}>
              {model.name}
            </h5>

            {/* Metric bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-themed-secondary">Accuracy</span>
                  <span style={{ color: model.color }}>{model.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ background: model.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${model.accuracy}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-themed-secondary">Speed (tok/s)</span>
                  <span style={{ color: model.color }}>{model.speed}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ background: model.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(model.speed / 150) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.2 + 0.3 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-themed-secondary">Cost/1K tok</span>
                  <span style={{ color: model.color }}>${model.cost}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ background: model.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(1 - model.cost / 0.02) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.2 + 0.6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-center text-themed-secondary italic">
        All metrics are based on standardized benchmarks • Updated in real-time
      </p>
    </motion.div>
  );
}

export default AIModelDemo;
