import { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Shiv.AI - Let's Build the Future Together",
  description: "Get in touch with Shiv.AI. Reach our offices in Dehradun, India and Singapore. Start your AI transformation journey today.",
  alternates: { canonical: "https://www.shivai.co.in/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
