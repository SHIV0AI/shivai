import { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Our Services | Shiv.AI - AI Solutions That Deliver Results",
  description: "Explore Shiv.AI's full range of AI services — agentic systems, knowledge ecosystems, workflow automation, deep learning, computer vision, and more.",
  alternates: { canonical: "https://www.shivai.co.in/services" },
};

export default function ServicesPage() {
  return <Services />;
}
