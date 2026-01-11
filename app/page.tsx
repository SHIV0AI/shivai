import { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Shiv.AI | Intelligent Agentic Knowledge Ecosystem",
  description: "Transform your enterprise with autonomous AI agents that learn, adapt, and collaborate. SHiV.Ai creates an interconnected knowledge ecosystem where intelligent agents unlock infinite possibilities.",
  alternates: {
    canonical: "https://www.shivai.co.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shiv.AI",
  url: "https://www.shivai.co.in",
  logo: "https://www.shivai.co.in/logo.png",
  description: "Intelligent Agentic Knowledge Ecosystem - Transform your enterprise with autonomous AI agents",
  sameAs: [
    "https://www.linkedin.com/company/shiv-ai",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@shivai.co.in",
    url: "https://www.shivai.co.in/contact",
  },
  potentialAction: {
    "@type": "OfferAction",
    target: "https://www.shivai.co.in/get-started",
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />
      
      <Hero />
      <Services />
      <About />
      <CaseStudies />
      <Contact />
    </>
  );
}
