import type { Metadata } from "next";
import AILabClient from "@/components/AILabClient";

export const metadata: Metadata = {
  title: "AI Lab - Explore Neural Networks | Shiv.AI",
  description:
    "Step inside our AI lab. Interact with neural networks, watch models train in real-time, and explore our infrastructure.",
};

export default function AILabPage() {
  return <AILabClient />;
}
