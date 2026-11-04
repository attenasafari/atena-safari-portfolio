import type { Metadata } from "next";
import { LeaderboardView } from "@/components/club/LeaderboardView";

export const metadata: Metadata = { title: "Leaderboard" };

export default function LeaderboardPage() {
  return <LeaderboardView />;
}
