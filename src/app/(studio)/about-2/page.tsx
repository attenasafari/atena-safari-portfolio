import type { Metadata } from "next";
import { StudioView } from "@/components/studio/StudioView";

export const metadata: Metadata = {
  title: "About 2",
  description: "About Atena Safari, product design lead.",
};

export default function AboutTwoPage() {
  return <StudioView page="about" />;
}
