"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

interface ServiceNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  category: string;
}

interface ServiceEdge {
  from: string;
  to: string;
  label?: string;
}

const nodes: ServiceNode[] = [
  /* ── Core (foundational AI capabilities) ── */
  { id: "nlp",     label: "NLP Engine",       icon: "💬", color: "#00fff5", x: 30, y: 12, category: "core" },
  { id: "cv",      label: "Computer Vision",  icon: "👁️", color: "#00d4ff", x: 50, y: 12, category: "core" },
  { id: "predict", label: "Predictive AI",    icon: "🔮", color: "#39ff14", x: 70, y: 12, category: "core" },

  /* ── Product (customer-facing solutions built on Core) ── */
  { id: "rag",     label: "RAG Pipeline",     icon: "🔗", color: "#bf00ff", x: 25, y: 45, category: "product" },
  { id: "agent",   label: "AI Agents",        icon: "🤖", color: "#ff006e", x: 50, y: 40, category: "product" },
  { id: "mlops",   label: "MLOps Platform",   icon: "🚀", color: "#a855f7", x: 75, y: 45, category: "product" },

  /* ── Service (ongoing delivery & support layers) ── */
  { id: "analytics",  label: "Analytics",     icon: "📊", color: "#ffe600", x: 20, y: 78, category: "service" },
  { id: "automation", label: "Automation",     icon: "⚡", color: "#ff6d00", x: 50, y: 82, category: "service" },
  { id: "security",   label: "AI Security",   icon: "🔒", color: "#00fff5", x: 80, y: 78, category: "service" },
];

const edges: ServiceEdge[] = [
  /* Core → Product  (core capabilities feed into products) */
  { from: "nlp",     to: "rag",       label: "embeddings" },
  { from: "nlp",     to: "agent",     label: "language understanding" },
  { from: "cv",      to: "rag",       label: "multimodal input" },
  { from: "cv",      to: "agent",     label: "visual reasoning" },
  { from: "predict", to: "agent",     label: "decision signals" },
  { from: "predict", to: "mlops",     label: "model lifecycle" },

  /* Product → Service  (products power services) */
  { from: "rag",     to: "analytics",  label: "knowledge retrieval" },
  { from: "rag",     to: "automation", label: "context injection" },
  { from: "agent",   to: "automation", label: "task orchestration" },
  { from: "agent",   to: "security",   label: "policy enforcement" },
  { from: "mlops",   to: "automation", label: "CI/CD pipelines" },
  { from: "mlops",   to: "security",   label: "model governance" },

  /* Service cross-links (services reinforce each other) */
  { from: "analytics", to: "automation", label: "insight-driven triggers" },
  { from: "security",  to: "analytics",  label: "audit data" },
];

const categoryColors: Record<string, string> = {
  core: "#00fff5",
  product: "#bf00ff",
  service: "#ffe600",
};

const categoryDescriptions: Record<string, string> = {
  core: "Foundational AI",
  product: "Solutions",
  service: "Delivery & Support",
};

const ServiceGraph = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animatedEdge, setAnimatedEdge] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setAnimatedEdge((prev) => (prev + 1) % edges.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isInView]);

  const getConnectedNodes = useCallback(
    (nodeId: string) =>
      edges
        .filter((e) => e.from === nodeId || e.to === nodeId)
        .map((e) => (e.from === nodeId ? e.to : e.from)),
    []
  );

  const isNodeHighlighted = (nodeId: string) => {
    if (!hoveredNode && !selectedNode) return true;
    const active = hoveredNode || selectedNode;
    if (!active) return true;
    if (nodeId === active) return true;
    return getConnectedNodes(active).includes(nodeId);
  };

  const isEdgeHighlighted = (edge: ServiceEdge) => {
    if (!hoveredNode && !selectedNode) return true;
    const active = hoveredNode || selectedNode;
    if (!active) return true;
    return edge.from === active || edge.to === active;
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-green">
          🌐 Knowledge Graph
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-themed-primary">
          Service <span className="gradient-text-neon">Relationships</span>
        </h3>
        <p className="text-themed-secondary max-w-2xl mx-auto text-sm">
          How our AI services connect and strengthen each other — from foundational models to enterprise delivery
        </p>
      </motion.div>

      {/* Category legend */}
      <div className="flex justify-center gap-6 mb-6">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-themed-secondary font-medium">{categoryDescriptions[cat]}</span>
          </div>
        ))}
      </div>

      {/* Graph visualization */}
      <div className="relative w-full aspect-[16/10] ai-glass rounded-2xl overflow-hidden">
        {/* SVG Edges */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {edges.map((edge, i) => {
            const fromNode = nodes.find((n) => n.id === edge.from)!;
            const toNode = nodes.find((n) => n.id === edge.to)!;
            const highlighted = isEdgeHighlighted(edge);
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <motion.line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={fromNode.color}
                  strokeWidth={animatedEdge === i ? 0.4 : 0.2}
                  animate={{
                    opacity: highlighted ? (animatedEdge === i ? [0.2, 0.7, 0.2] : 0.25) : 0.05,
                  }}
                  transition={{
                    duration: animatedEdge === i ? 1.5 : 0.3,
                    repeat: animatedEdge === i ? Infinity : 0,
                  }}
                  strokeDasharray={animatedEdge === i ? "1,1" : "none"}
                />
                {/* Edge label */}
                {edge.label && highlighted && (
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 1.5}
                    textAnchor="middle"
                    className="fill-current text-themed-secondary"
                    fontSize="1.8"
                    opacity={0.5}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const highlighted = isNodeHighlighted(node.id);
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? { opacity: highlighted ? 1 : 0.3, scale: highlighted ? 1 : 0.8 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.15, zIndex: 10 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              className="absolute cursor-pointer ai-glass rounded-xl p-1.5 md:p-2 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                boxShadow:
                  selectedNode === node.id ? `0 0 15px ${node.color}44` : undefined,
                borderColor: selectedNode === node.id ? node.color : undefined,
              }}
            >
              <span className="text-lg md:text-xl">{node.icon}</span>
              <span
                className="text-[8px] md:text-[10px] font-bold whitespace-nowrap"
                style={{ color: node.color }}
              >
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Selected node detail */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 ai-glass rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-1">
            {nodes.find((n) => n.id === selectedNode)?.icon}
          </div>
          <h4
            className="font-bold text-sm mb-1"
            style={{ color: nodes.find((n) => n.id === selectedNode)?.color }}
          >
            {nodes.find((n) => n.id === selectedNode)?.label}
          </h4>
          <p className="text-xs text-themed-secondary mb-2">
            Connected to: {getConnectedNodes(selectedNode).map((id) => nodes.find((n) => n.id === id)?.label).join(", ")}
          </p>
          <div className="flex justify-center gap-2">
            {getConnectedNodes(selectedNode).map((id) => {
              const n = nodes.find((n) => n.id === id)!;
              return (
                <span key={id} className="text-sm" title={n.label}>
                  {n.icon}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceGraph;
