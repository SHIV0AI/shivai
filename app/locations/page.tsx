import { Metadata } from "next";
import Locations from "@/components/Locations";

export const metadata: Metadata = {
  title: "Global Presence | Shiv.AI - Intelligence Worldwide",
  description: "Shiv.AI operates from Dehradun, India and Singapore — building AI that serves the world with research labs and enterprise solutions.",
  alternates: { canonical: "https://www.shivai.co.in/locations" },
};

export default function LocationsPage() {
  return <Locations />;
}
