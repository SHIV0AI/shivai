import { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Us | Shiv.AI - Intelligent Agentic Knowledge Ecosystem",
  description: "Learn about Shiv.AI — our mission, vision, journey, and the team pioneering autonomous AI systems for enterprises worldwide.",
  alternates: { canonical: "https://www.shivai.co.in/about" },
};

export default function AboutPage() {
  return <About />;
}
