"use client";

import Link from "next/link";
import { achievements } from "@/club/social";
import { getQuiz } from "@/club/quizzes";
import { averageAccuracy } from "@/club/logic";
import { levelFromXp, xpIntoLevel, XP_PER_LEVEL } from "@/club/xp";
import { useClub } from "@/components/club/ClubProvider";
import { Avatar, QuizCard } from "@/components/club/ui";

export function ProfileView() {
  const club = useClub();
  const level = levelFromXp(club.state.xp);
  const into = xpIntoLevel(club.state.xp);
  const accuracy = averageAccuracy(club.state);
  const saved = club.state.saved
    .map((id) => getQuiz(id))
    .filter((quiz) => quiz != null);

  return (
    <div className="pt-6 md:pt-8">
      <div className="flex items-center gap-4">
        <Avatar trait={club.state.avatar} size={84} alt={`${club.state.name}'s club portrait`} />
        <div>
          <h1 className="display text-5xl">{club.state.name}</h1>
          <p className="mt-1 text-lg">Level {level}</p>
        </div>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white" aria-hidden="true">
        <div className="h-full rounded-full bg-[var(--club-purple)]" style={{ width: `${(into / XP_PER_LEVEL) * 100}%` }} />
      </div>
      <p className="mt-2 text-sm text-[var(--club-muted)]">
        {into} of {XP_PER_LEVEL} XP toward level {level + 1}. Total {club.state.xp} XP.
      </p>
      <dl className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-[20px] bg-white p-4">
          <dt className="text-sm text-[var(--club-muted)]">Streak</dt>
          <dd className="display text-3xl">{club.state.streak.count}</dd>
        </div>
        <div className="rounded-[20px] bg-white p-4">
          <dt className="text-sm text-[var(--club-muted)]">Rounds</dt>
          <dd className="display text-3xl">{club.state.history.length}</dd>
        </div>
        <div className="rounded-[20px] bg-white p-4">
          <dt className="text-sm text-[var(--club-muted)]">Accuracy</dt>
          <dd className="display text-3xl">{accuracy == null ? "—" : `${accuracy}%`}</dd>
        </div>
      </dl>

      <section className="mt-10" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="display text-3xl">
          Achievements
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {achievements.map((badge) => {
            const unlocked = club.state.achievements.some((item) => item.id === badge.id);
            return (
              <li key={badge.id}>
                <button
                  type="button"
                  onClick={() => club.openBadge(badge.id)}
                  className={`w-full rounded-[22px] p-4 text-left ${unlocked ? "bg-[var(--club-mint)]" : "bg-white"}`}
                >
                  <span className="display block text-2xl">{badge.title}</span>
                  <span className="mt-1 block text-sm">{unlocked ? "Unlocked" : "Locked"} · {badge.detail}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="history-heading">
        <h2 id="history-heading" className="display text-3xl">
          Quiz history
        </h2>
        {club.state.history.length ? (
          <ul className="mt-4 grid gap-3">
            {club.state.history.map((item) => {
              const quiz = getQuiz(item.quizId);
              return (
                <li key={item.id}>
                  <Link href={`/results/${item.quizId}`} className="block rounded-[20px] bg-white p-4 text-inherit no-underline">
                    <span className="display block text-xl">{quiz?.title ?? item.title}</span>
                    <span className="text-sm text-[var(--club-muted)]">
                      {item.title} · {item.correct}/{item.total} · +{item.xp} XP
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-lg">No rounds yet. The daily table is the easiest place to start.</p>
        )}
      </section>

      <section className="mt-10" aria-labelledby="saved-profile">
        <h2 id="saved-profile" className="display text-3xl">
          Saved quizzes
        </h2>
        {saved.length ? (
          <div className="mt-4 grid gap-3">
            {saved.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <p className="mt-3 text-lg">Save a quiz from its page and it will wait here.</p>
        )}
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/settings" className="font-semibold text-[var(--club-purple)]">
          Settings
        </Link>
        <Link href="/studio" className="font-semibold text-[var(--club-muted)]">
          Atena’s studio
        </Link>
      </div>
    </div>
  );
}
