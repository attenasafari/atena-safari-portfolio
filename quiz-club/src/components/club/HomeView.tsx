"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/club/categories";
import { dailyQuizId } from "@/club/logic";
import { getQuiz, quizzes } from "@/club/quizzes";
import { todayKey } from "@/club/xp";
import { useClub } from "@/components/club/ClubProvider";
import { Avatar, Plush, QuizCard } from "@/components/club/ui";

export function HomeView() {
  const club = useClub();
  const router = useRouter();
  const dailyId = dailyQuizId();
  const daily = getQuiz(dailyId);
  const today = todayKey();
  const dailyDone = club.state.history.some((item) => item.daily && item.at.slice(0, 10) === today);
  const played = new Set(club.state.history.map((item) => item.quizId));
  const fresh = quizzes.filter((quiz) => !played.has(quiz.id));
  const recommended = [...(fresh.length ? fresh : quizzes)]
    .sort((a, b) => Number(Boolean(b.trending)) - Number(Boolean(a.trending)) || b.plays - a.plays)
    .slice(0, 3);
  const trending = quizzes.filter((quiz) => quiz.trending).slice(0, 4);
  const progress = club.state.inProgress;
  const progressQuiz = progress ? getQuiz(progress.quizId) : undefined;

  function playDaily() {
    if (!daily) return;
    const resume = progress?.quizId === daily.id;
    club.armLaunch({ quizId: daily.id, resume, challengeCode: progress?.challengeCode });
    router.push(`/play/${daily.id}`);
  }

  function resume() {
    if (!progress) return;
    club.armLaunch({
      quizId: progress.quizId,
      resume: true,
      challengeCode: progress.challengeCode,
    });
    router.push(`/play/${progress.quizId}`);
  }

  return (
    <div className="pt-6 md:pt-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--club-purple)] md:hidden">Quiz Club</p>
          <h1 className="display mt-1 text-5xl md:text-6xl">Hey, {club.state.name}</h1>
          <p className="mt-3 max-w-xl text-lg leading-snug">
            Five-question rounds, a daily table, and friends who will try to beat you.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="display text-3xl">{club.state.xp}</p>
            <p className="text-sm text-[var(--club-muted)]">XP</p>
          </div>
          <div className="text-right">
            <p className="display text-3xl">{club.state.streak.count}</p>
            <p className="text-sm text-[var(--club-muted)]">day streak</p>
          </div>
          <Link href="/profile" aria-label="Open profile" className="hidden sm:inline-flex">
            <Avatar trait={club.state.avatar} size={56} alt="" />
          </Link>
        </div>
      </header>

      {daily ? (
        <section className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1.15fr_0.85fr]" aria-labelledby="daily-heading">
          <div className="flex flex-col rounded-[28px] bg-[var(--club-yellow)] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="daily-heading" className="display text-4xl md:text-5xl">
                  Tonight’s table
                </h2>
                <p className="mt-3 max-w-md text-lg">{daily.title}</p>
              </div>
              <Plush
                src="/assets/mascots/crew.jpg"
                alt="The four fuzzy Quiz Club friends"
                className="club-float h-28 w-28 rounded-[20px] lg:hidden"
              />
            </div>
            <p className="mt-4 text-base">
              {daily.questions.length} questions · about {daily.minutes} minutes ·{" "}
              {dailyDone ? "bonus already claimed today" : "30 XP bonus if you clear it"}
            </p>
            <button
              type="button"
              onClick={playDaily}
              className="club-btn mt-6 w-fit rounded-full bg-[var(--club-purple)] px-6 py-3 text-lg font-semibold text-white"
            >
              {progress?.quizId === daily.id ? "Continue the table" : dailyDone ? "Play it again" : "Play the daily"}
            </button>
          </div>
          <Plush
            src="/assets/mascots/crew.jpg"
            alt="Blue, yellow, green, and red fuzzy friends in a studio"
            className="club-float hidden h-full min-h-72 w-full rounded-[28px] object-cover lg:block"
          />
        </section>
      ) : null}

      <section className="mt-10" aria-labelledby="continue-heading">
        <h2 id="continue-heading" className="display text-3xl">
          Pick up where you left off
        </h2>
        {progressQuiz ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-white p-4 shadow-[var(--club-shadow)]">
            <div>
              <p className="display text-2xl">{progressQuiz.title}</p>
              <p className="mt-1 text-sm text-[var(--club-muted)]">
                Question {Math.min(progressQuiz.questions.length, (progress?.index ?? 0) + 1)} of{" "}
                {progressQuiz.questions.length}
              </p>
            </div>
            <button
              type="button"
              onClick={resume}
              className="club-btn rounded-full bg-[var(--club-ink)] px-5 py-3 font-semibold text-white"
            >
              Continue
            </button>
          </div>
        ) : (
          <p className="mt-4 max-w-xl text-lg">
            Nothing is half-finished.{" "}
            <Link href={`/quiz/${recommended[0]?.id ?? "movie-night"}`} className="font-semibold text-[var(--club-purple)]">
              Start {recommended[0]?.title ?? "a round"}
            </Link>
            .
          </p>
        )}
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <section aria-labelledby="for-you-heading">
          <h2 id="for-you-heading" className="display text-3xl">
            For you
          </h2>
          <div className="mt-4 grid gap-3">
            {recommended.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
        <section aria-labelledby="trending-heading">
          <h2 id="trending-heading" className="display text-3xl">
            Trending
          </h2>
          <ol className="mt-4 grid gap-3">
            {trending.map((quiz) => (
              <li key={quiz.id}>
                <Link href={`/quiz/${quiz.id}`} className="block text-inherit no-underline">
                  <span className="display block text-xl">{quiz.title}</span>
                  <span className="text-sm text-[var(--club-muted)]">
                    {quiz.plays.toLocaleString()} sample plays
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="categories-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="categories-heading" className="display text-3xl">
            Categories
          </h2>
          <Link href="/explore" className="font-semibold text-[var(--club-purple)]">
            See all
          </Link>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="w-36 shrink-0 text-inherit no-underline"
            >
              <Plush src={category.image} alt={category.alt} className="aspect-square w-full rounded-[24px]" />
              <span className="mt-2 block text-sm font-semibold">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[28px] bg-[var(--club-coral)] p-6 text-[#242334] md:p-8" aria-labelledby="friend-heading">
        <h2 id="friend-heading" className="display text-4xl">
          Challenge a friend
        </h2>
        <p className="mt-3 max-w-lg text-lg">
          Pick a quiz, send a code, and let a simulated friend take the same five questions.
        </p>
        <Link
          href="/challenge"
          className="club-btn mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[var(--club-ink)] no-underline"
        >
          Make a challenge
        </Link>
      </section>

      <button
        type="button"
        onClick={() => club.toast("Ads are pretend in this prototype.")}
        className="mt-8 flex w-full items-center justify-between gap-4 rounded-[20px] bg-white px-4 py-3 text-left"
      >
        <span>
          <span className="text-[var(--club-muted)]">Simulated sponsor. </span>
          Fuzzy Boots, the pair Comet keeps kicking off.
        </span>
        <span className="text-sm font-semibold text-[var(--club-purple)]">Ad</span>
      </button>
    </div>
  );
}
