import type { Metadata } from "next";
import { StudioView } from "@/components/studio/StudioView";

export const metadata: Metadata = {
  title: "Work 2",
  description: "Selected case studies by Atena Safari.",
};

export default function WorkTwoPage() {
  return <StudioView page="work" />;
}
