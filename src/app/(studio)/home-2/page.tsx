import type { Metadata } from "next";
import { StudioView } from "@/components/studio/StudioView";

export const metadata: Metadata = {
  title: "Home 2",
  description: "Atena Safari, product design lead for marketplaces and fintech.",
};

export default function HomeTwoPage() {
  return <StudioView page="home" />;
}
