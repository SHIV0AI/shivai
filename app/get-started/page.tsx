import HowItWorks from "@/components/HowItWorks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started - AI Transformation Journey",
  description: "Begin your transformation with intelligent agentic systems",
};

export default function GetStartedPage() {
  return (
    <div className="pt-20">
      <HowItWorks />
    </div>
  );
}
