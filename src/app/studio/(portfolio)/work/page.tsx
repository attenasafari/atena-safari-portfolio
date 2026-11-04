import type { Metadata } from "next";
import { CaseList } from "@/components/CaseList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Atena Safari — Achareh customer home, moving calculator, and Achareh Expert.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Selected work"
        description="Case studies across Achareh customer and expert experiences."
      />
      <CaseList />
    </>
  );
}
