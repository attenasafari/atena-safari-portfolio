import type { Metadata } from "next";
import { StudioView } from "@/components/studio/StudioView";

export const metadata: Metadata = {
  title: "Contact 2",
  description: "Write to Atena Safari by email, LinkedIn, or ADPList.",
};

export default function ContactTwoPage() {
  return <StudioView page="contact" />;
}