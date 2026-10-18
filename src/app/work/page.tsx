import type { Metadata } from "next";
import { CaseList } from "@/components/CaseList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Atena Safari — Achareh customer home and moving price/checkout.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Selected work"
        description="Case studies first. Achareh customer home and moving calculator are drafted from discovery with before/after screens."
      />
      <CaseList />
    </>
  );
}
