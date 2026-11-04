"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategory } from "@/club/categories";
import { getQuiz } from "@/club/quizzes";
import { XP_COMPLETE, XP_CORRECT } from "@/club/xp";
import { useClub } from "@/components/club/ClubProvider";
import { Plush } from "@/components/club/ui";

export function QuizDetailView({ id }: { id: string }) {
  const quiz = getQuiz(id);
  const club = useClub();
  const router = useRouter();
  if (!quiz) {
    return (
      <p className="pt-10 text-lg">
        That quiz is not on the table. <Link href="/explore">Browse quizzes</Link>
      </p>
    );
  }
  const category = getCategory(quiz.categoryId);
  const saved = club.state.saved.includes(quiz.id);
  const maxXp = quiz.questions.length * XP_CORRECT + XP_COMPLETE;

  function start(resume: boolean) {
    if (!quiz) return;
    club.armLaunch({ quizId: quiz.id, resume });
    router.push(`/play/${quiz.id}`);
  }

  return (
    <div className="pt-6 md:pt-8">
      <Link href={`/category/${quiz.categoryId}`} className="font-semibold text-[var(--club-purple)]">
        {category?.name}
      </Link>
      <div className="mt-4 grid items-start gap-6 lg:grid-cols-[280px_1fr]">
        <Plush
          src={category?.image ?? "/assets/mascots/crew.jpg"}
          alt={category?.alt ?? "Quiz Club mascot"}
          className="aspect-square w-full rounded-[28px]"
        />
        <div>
          <h1 className="display text-5xl">{quiz.title}</h1>
          <p className="mt-3 max-w-xl text-lg">{quiz.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-[var(--club-muted)]">Difficulty</dt>
              <dd className="display text-2xl">{quiz.difficulty}</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--club-muted)]">Questions</dt>
              <dd className="display text-2xl">{quiz.questions.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--club-muted)]">Time</dt>
              <dd className="display text-2xl">{quiz.minutes} min</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--club-muted)]">XP</dt>
              <dd className="display text-2xl">Up to {maxXp}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => start(false)}
              className="club-btn rounded-full bg-[var(--club-purple)] px-6 py-3 text-lg font-semibold text-white"
            >
              Start quiz
            </button>
            {club.state.inProgress?.quizId === quiz.id ? (
              <button
                type="button"
                onClick={() => start(true)}
                className="club-btn rounded-full bg-[var(--club-ink)] px-6 py-3 font-semibold text-white"
              >
                Continue
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                club.toggleSave(quiz.id);
                club.toast(saved ? "Removed from saved" : "Saved for later");
              }}
              aria-pressed={saved}
              className="club-btn rounded-full bg-white px-6 py-3 font-semibold"
            >
              {saved ? "Saved" : "Save quiz"}
            </button>
            <Link
              href={`/challenge?quiz=${quiz.id}`}
              className="club-btn inline-flex items-center rounded-full bg-[var(--club-yellow)] px-6 py-3 font-semibold no-underline"
            >
              Challenge a friend
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
