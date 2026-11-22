"use client";

import Link from "next/link";
import { useMemo } from "react";
import { leaderboard } from "@/club/social";
import { levelFromXp } from "@/club/xp";
import { useClub } from "@/components/club/ClubProvider";

export function LeaderboardView() {
  const club = useClub();
  const rows = useMemo(() => {
    const you = { id: "you", name: `${club.state.name} (you)`, xp: club.state.xp, streak: club.state.streak.count };
    return [...leaderboard, you].sort((a, b) => b.xp - a.xp);
  }, [club.state.name, club.state.streak.count, club.state.xp]);

  return (
    <div className="pt-6 md:pt-8">
      <Link href="/challenge" className="font-semibold text-[var(--club-purple)]">
        Challenge
      </Link>
      <h1 className="display mt-3 text-5xl">Weekly leaderboard</h1>
      <p className="mt-3 max-w-xl text-lg">
        These ten players are sample data. Your row uses the XP stored on this device.
      </p>
      <ol className="mt-6 grid gap-2">
        {rows.map((row, index) => (
          <li
            key={row.id}
            className={`flex items-center justify-between rounded-[18px] px-4 py-3 ${
              row.id === "you" ? "bg-[var(--club-yellow)]" : "bg-white"
            }`}
          >
            <span>
              <span className="text-[var(--club-muted)]">{index + 1} </span>
              <span className="font-semibold">{row.name}</span>
            </span>
            <span className="text-sm">
              Level {levelFromXp(row.xp)} · {row.xp} XP · {row.streak} day streak
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
