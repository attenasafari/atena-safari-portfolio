import type { Metadata } from "next";
import { CaseList } from "@/components/CaseList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies from Atena Safari — starting with Achareh customer home.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Selected work"
        description="Case studies first. Achareh customer home is live; more stories will land here as Atena drafts them."
      />
      <CaseList />
    </>
  );
}
