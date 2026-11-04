import type { Metadata } from "next";
import { ClubProvider } from "@/components/club/ClubProvider";
import { ClubShell } from "@/components/club/ClubShell";

export const metadata: Metadata = {
  title: {
    default: "Quiz Club",
    template: "%s · Quiz Club",
  },
  description:
    "Quiz Club is a short, playful quiz game with a daily table, five-question rounds, and friendly challenges.",
};

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClubProvider>
      <ClubShell>{children}</ClubShell>
    </ClubProvider>
  );
}
