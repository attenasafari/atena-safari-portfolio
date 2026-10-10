import type { Metadata } from "next";
import { CaseList } from "@/components/CaseList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies from Atena Safari — Achareh, 780.ir, and more.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Selected work"
        description="Case studies first — narrative skeletons ready for real process, decisions, and verified outcomes."
      />
      <CaseList />
    </>
  );
}
