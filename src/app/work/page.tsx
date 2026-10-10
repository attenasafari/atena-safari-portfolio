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
        description="Case studies first. Achareh customer home is drafted from discovery; My Desk and 780.ir stay coming soon until Atena answers."
      />
      <CaseList />
    </>
  );
}
