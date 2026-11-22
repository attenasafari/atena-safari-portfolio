"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { characters } from "@/club/categories";
import { getQuiz } from "@/club/quizzes";
import { useClub } from "@/components/club/ClubProvider";
import { Modal, Plush } from "@/components/club/ui";

export function ResultsView({ id }: { id: string }) {
  const club = useClub();
  const router = useRouter();
  const quiz = getQuiz(id);
  const attempt =
    club.state.lastResult?.quizId === id
      ? club.state.lastResult
      : club.state.history.find((item) => item.quizId === id);
  const [shareOpen, setShareOpen] = useState(false);
  if (!quiz || !attempt) {
    return (
      <div className="pt-10">
        <h1 className="display text-4xl">No result yet</h1>
        <p className="mt-3 text-lg">Play the round and the score will land here.</p>
        <Link href={quiz ? `/quiz/${quiz.id}` : "/"} className="mt-4 inline-block font-semibold text-[var(--club-purple)]">
          {quiz ? "Open the quiz" : "Home"}
        </Link>
      </div>
    );
  }
  const character = attempt.personalityId ? characters[attempt.personalityId] : undefined;
  const missed = attempt.mode === "scored" ? attempt.total - attempt.correct : null;
  const blurb = shareText(quiz.title, attempt);

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Quiz Club", text: blurb });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    await navigator.clipboard.writeText(blurb);
    club.toast("Result copied");
    setShareOpen(false);
  }

  return (
    <div className="mx-auto max-w-xl pt-8">
      <p className="text-sm font-semibold text-[var(--club-purple)]">{quiz.title}</p>
      <h1 className="display mt-2 text-6xl">{attempt.title}</h1>
      <p className="mt-3 text-lg">
        {character
          ? character.line
          : attempt.accuracy >= 90
            ? "The table is yours."
            : attempt.accuracy >= 70
              ? "That was a strong round."
              : attempt.accuracy >= 40
                ? "A few of them got away."
                : "The next round is already warmer."}
      </p>
      <Plush
        src="/assets/mascots/crew.jpg"
        alt="The Quiz Club friends celebrating the result"
        className="club-float mt-6 h-64 w-full rounded-[28px] object-cover"
      />
      <dl className="mt-6 grid grid-cols-2 gap-4">
        <Stat label={attempt.mode === "personality" ? "Best match" : "Correct"} value={String(attempt.correct)} />
        <Stat label={attempt.mode === "personality" ? "Questions" : "Missed"} value={String(missed ?? attempt.total)} />
        <Stat label="Accuracy" value={`${attempt.accuracy}%`} />
        <Stat label="XP earned" value={`+${attempt.xp}`} />
      </dl>
      <p className="mt-4 text-sm text-[var(--club-muted)]">
        Day streak {club.state.streak.count}. Sample standings only — this prototype keeps score on your device.
      </p>
      <div className="mt-6 grid gap-3">
        <button type="button" onClick={() => setShareOpen(true)} className="club-btn rounded-full bg-[var(--club-purple)] px-6 py-3 font-semibold text-white">
          Share result
        </button>
        <button
          type="button"
          onClick={() => {
            club.armLaunch({ quizId: quiz.id, resume: false });
            router.push(`/play/${quiz.id}`);
          }}
          className="club-btn rounded-full bg-[var(--club-ink)] px-6 py-3 font-semibold text-white"
        >
          Play again
        </button>
        <Link href={`/challenge?quiz=${quiz.id}`} className="club-btn rounded-full bg-[var(--club-yellow)] px-6 py-3 text-center font-semibold no-underline">
          Challenge a friend
        </Link>
        <Link href="/" className="px-6 py-3 text-center font-semibold text-[var(--club-purple)]">
          Back to home
        </Link>
      </div>
      <Modal open={shareOpen} title="Share this round" onClose={() => setShareOpen(false)}>
        <p>{blurb}</p>
        <button type="button" onClick={() => void share()} className="club-btn mt-5 rounded-full bg-[var(--club-purple)] px-5 py-3 font-semibold text-white">
          Share or copy
        </button>
      </Modal>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] bg-white p-4">
      <dt className="text-sm text-[var(--club-muted)]">{label}</dt>
      <dd className="display text-3xl">{value}</dd>
    </div>
  );
}

function shareText(title: string, attempt: { correct: number; total: number; title: string; mode: string }) {
  if (attempt.mode === "personality") {
    return `Quiz Club says I am ${attempt.title} after “${title}”.`;
  }
  return `I scored ${attempt.correct}/${attempt.total} on “${title}” in Quiz Club. ${attempt.title}.`;
}
