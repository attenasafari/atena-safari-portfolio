import type { Metadata } from "next";
import { Suspense } from "react";
import { ChallengeView } from "@/components/club/ChallengeView";

export const metadata: Metadata = { title: "Challenge" };

export default function ChallengePage() {
  return (
    <Suspense fallback={<p className="pt-10 text-lg">Opening challenges…</p>}>
      <ChallengeView />
    </Suspense>
  );
}
