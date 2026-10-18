import type { Metadata } from "next";
import { CaseList } from "@/components/CaseList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Atena Safari — customer home, moving calculator, and My Desk.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Selected work"
        description="Case studies first. Customer home, moving calculator, and My Desk — drafted from discovery."
      />
      <CaseList />
    </>
  );
}
