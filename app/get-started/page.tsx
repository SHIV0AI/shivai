import type { Metadata } from "next";
import GetStartedClient from "@/components/GetStartedClient";

export const metadata: Metadata = {
  title: "Get Started - AI Transformation Journey | Shiv.AI",
  description: "Explore our ML pipeline, AI knowledge graph, and begin your transformation with intelligent agentic systems",
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
