"use client";

import dynamic from "next/dynamic";
import HowItWorks from "@/components/HowItWorks";

const ServiceGraph = dynamic(() => import("@/components/ServiceGraph"), { ssr: false });

const faqs = [
  {
    q: "How long does an AI integration take?",
    a: "Most integrations take 4-8 weeks depending on complexity. We start with a rapid prototype in week 1, followed by iterative development with your team.",
  },
  {
    q: "What data do you need to get started?",
    a: "We work with any structured or unstructured data — databases, APIs, documents, images. Our pipeline handles data cleaning and preprocessing automatically.",
  },
  {
    q: "Can your models run on our infrastructure?",
    a: "Yes! We support cloud deployment (AWS, Azure, GCP), on-premise solutions, and hybrid configurations with full data sovereignty.",
  },
  {
    q: "What about data privacy and security?",
    a: "All data is encrypted at rest and in transit. We're SOC2 compliant and offer private model deployments that never share data externally.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Every plan includes 24/7 monitoring, model retraining, and a dedicated AI success manager. We continuously improve model performance.",
  },
];

export default function GetStartedClient() {
  return (
    <div className="pt-20">
      {/* How It Works (Brain section) — ServiceGraph injected after "We Build Your Brain" */}
      <HowItWorks knowledgeGraphSlot={<ServiceGraph />} />

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-cyan inline-block neon-glow-cyan">
              ❓ Frequently Asked
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-themed-primary">
              Common <span className="gradient-text-neon">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="ai-glass rounded-xl group cursor-pointer">
                <summary className="px-5 py-4 font-semibold text-sm text-themed-primary list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-neon-cyan group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-themed-secondary leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
