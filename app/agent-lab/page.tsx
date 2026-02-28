import { Metadata } from "next";
import AgentLabClient from "@/components/AgentLabClient";

export const metadata: Metadata = {
  title: "Agent Lab | Shiv.AI — Intelligent Agentic Ecosystem",
  description:
    "Explore Shiv.AI's Agent Lab: design, deploy, and orchestrate autonomous AI agents for enterprise knowledge orchestration, workflow automation, and multi-agent collaboration.",
  alternates: {
    canonical: "https://www.shivai.co.in/agent-lab",
  },
};

export default function AgentLabPage() {
  return <AgentLabClient />;
}
