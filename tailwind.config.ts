import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },
        accent: {
          cyan: "#06b6d4",
          purple: "#9333ea",
          orange: "#f97316",
          blue: "#3b82f6",
        },
        shiva: {
          blue: "#1e40af",
          orange: "#ea580c",
          cosmic: "#7c3aed",
        },
        neon: {
          cyan: "#00fff5",
          purple: "#bf00ff",
          pink: "#ff006e",
          green: "#39ff14",
          blue: "#4361ee",
          orange: "#ff6d00",
          yellow: "#ffe600",
        },
        ai: {
          dark: "#0a0a1a",
          deeper: "#050510",
          card: "#111133",
          border: "#1a1a4a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #3b82f6 0%, #9333ea 50%, #ea580c 100%)",
        "gradient-accent": "linear-gradient(135deg, #06b6d4 0%, #9333ea 50%, #f97316 100%)",
        "gradient-shiva": "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ea580c 100%)",
        "gradient-neon": "linear-gradient(135deg, #00fff5 0%, #bf00ff 50%, #ff006e 100%)",
        "gradient-ai": "linear-gradient(135deg, #4361ee 0%, #bf00ff 50%, #00fff5 100%)",
        "gradient-neural": "linear-gradient(90deg, #00fff5, #bf00ff, #ff006e, #39ff14)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.8s ease-in",
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "neural-flow": "neuralFlow 3s linear infinite",
        "data-stream": "dataStream 2s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 40s linear infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.5)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseNeon: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.5)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        neuralFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        dataStream: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
