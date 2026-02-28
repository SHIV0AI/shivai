import { Metadata } from "next";
import NeuroLabClient from "@/components/NeuroLabClient";

export const metadata: Metadata = {
  title: "Neuro Lab | Shiv.AI — Advanced Neural Research",
  description:
    "Explore Shiv.AI's Neuro Lab: deep learning, neural network architectures, model training, computer vision, NLP, and reinforcement learning research.",
  alternates: {
    canonical: "https://www.shivai.co.in/neuro-lab",
  },
};

export default function NeuroLabPage() {
  return <NeuroLabClient />;
}
