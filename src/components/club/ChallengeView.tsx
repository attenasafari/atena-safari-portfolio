"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getQuiz, quizzes } from "@/club/quizzes";
import { leaderboard } from "@/club/social";
import type { Challenge } from "@/club/types";
import { levelFromXp } from "@/club/xp";
import { useClub } from "@/components/club/ClubProvider";
import { Modal } from "@/components/club/ui";

export function ChallengeView() {
  const club = useClub();
  const router = useRouter();
  const params = useSearchParams();
  const preset = params.get("quiz") ?? "";
  const openCode = params.get("code") ?? "";
  const [quizId, setQuizId] = useState(preset || quizzes[0].id);
  const [invite, setInvite] = useState(false);
  const focus = club.state.challenges.find((challenge) => challenge.code === openCode) ?? null;
  const groups = {
    pending: club.state.challenges.filter((challenge) => challenge.status === "pending"),
    incoming: club.state.challenges.filter((challenge) => challenge.status === "incoming"),
    active: club.state.challenges.filter((challenge) => challenge.status === "active"),
    completed: club.state.challenges.filter((challenge) => challenge.status === "completed"),
  };

  const ranking = useMemo(() => {
    const you = { id: "you", name: club.state.name, xp: club.state.xp, streak: club.state.streak.count };
    return [...leaderboard, you].sort((a, b) => b.xp - a.xp);
  }, [club.state.name, club.state.streak.count, club.state.xp]);

  async function copy(text: string, note: string) {
    try {
      await navigator.clipboard.writeText(text);
      club.toast(note);
    } catch {
      club.toast("Copy did not go through. Select the code and copy it yourself.");
    }
  }

  async function shareChallenge(challenge: Challenge) {
    const quiz = getQuiz(challenge.quizId);
    const text = `Quiz Club challenge ${challenge.code}: ${quiz?.title ?? "a five-question round"}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Quiz Club challenge", text });
        return;
      } catch {
        /* copy instead */
      }
    }
    await copy(text, "Challenge copied");
  }

  function play(challenge: Challenge) {
    club.armLaunch({ quizId: challenge.quizId, resume: false, challengeCode: challenge.code });
    router.push(`/play/${challenge.quizId}`);
  }

  return (
    <div className="pt-6 md:pt-8">
      <h1 className="display text-5xl md:text-6xl">Challenge</h1>
      <p className="mt-3 max-w-xl text-lg">
        Send a code, let a friend accept, then compare the same five questions. Friends here are sample players.
      </p>

      <section className="mt-8 rounded-[28px] bg-[var(--club-yellow)] p-6" aria-labelledby="create-heading">
        <h2 id="create-heading" className="display text-4xl">
          Challenge a friend
        </h2>
        <label htmlFor="challenge-quiz" className="mt-4 block text-sm font-semibold">
          Quiz
        </label>
        <select
          id="challenge-quiz"
          value={quizId}
          onChange={(event) => setQuizId(event.target.value)}
          className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-base"
        >
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title}
            </option>
          ))}
        </select>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="club-btn rounded-full bg-[var(--club-purple)] px-5 py-3 font-semibold text-white"
            onClick={() => {
              const created = club.createChallenge(quizId);
              router.replace(`/challenge?code=${created.code}`);
              club.toast("Challenge code is ready");
            }}
          >
            Create challenge
          </button>
          <button type="button" className="club-btn rounded-full bg-white px-5 py-3 font-semibold" onClick={() => setInvite(true)}>
            Invite friends
          </button>
        </div>
      </section>

      {focus ? <ChallengeCard challenge={focus} onCopy={copy} onShare={shareChallenge} onPlay={play} featured /> : null}

      <Group title="Incoming" items={groups.incoming} onCopy={copy} onShare={shareChallenge} onPlay={play} />
      <Group title="Active" items={groups.active} onCopy={copy} onShare={shareChallenge} onPlay={play} />
      <Group title="Waiting on a friend" items={groups.pending} onCopy={copy} onShare={shareChallenge} onPlay={play} />
      <Group title="Completed" items={groups.completed} onCopy={copy} onShare={shareChallenge} onPlay={play} />

      <section className="mt-10" aria-labelledby="board-heading">
        <div className="flex items-end justify-between gap-3">
          <h2 id="board-heading" className="display text-3xl">
            Weekly leaderboard
          </h2>
          <Link href="/leaderboard" className="font-semibold text-[var(--club-purple)]">
            Full board
          </Link>
        </div>
        <p className="mt-2 text-sm text-[var(--club-muted)]">Sample standings for the prototype, plus your live XP.</p>
        <ol className="mt-4 grid gap-2">
          {ranking.slice(0, 5).map((row, index) => (
            <li key={row.id} className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
              <span>
                <span className="text-[var(--club-muted)]">{index + 1} </span>
                <span className="font-semibold">{row.name}</span>
              </span>
              <span>{row.xp} XP</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8" aria-labelledby="friends-heading">
        <h2 id="friends-heading" className="display text-3xl">
          Friends ranking
        </h2>
        <ol className="mt-4 grid gap-2">
          {ranking.slice(0, 6).map((row) => (
            <li key={row.id} className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
              <span className="font-semibold">{row.name}</span>
              <span className="text-sm text-[var(--club-muted)]">
                Level {levelFromXp(row.xp)} · {row.streak} day streak
              </span>
            </li>
          ))}
        </ol>
      </section>

      <Modal open={invite} title="Invite friends" onClose={() => setInvite(false)}>
        <p>Send a note. When they are not really here, Priya will accept for the prototype.</p>
        <button
          type="button"
          className="club-btn mt-5 rounded-full bg-[var(--club-purple)] px-5 py-3 font-semibold text-white"
          onClick={() => {
            void copy("Come play Quiz Club with me. Five questions, no homework.", "Invite copied");
            setInvite(false);
          }}
        >
          Copy invite
        </button>
      </Modal>
    </div>
  );
}

function Group({
  title,
  items,
  onCopy,
  onShare,
  onPlay,
}: {
  title: string;
  items: Challenge[];
  onCopy: (text: string, note: string) => void;
  onShare: (challenge: Challenge) => void;
  onPlay: (challenge: Challenge) => void;
}) {
  return (
    <section className="mt-8" aria-labelledby={`${title}-heading`}>
      <h2 id={`${title}-heading`} className="display text-3xl">
        {title}
      </h2>
      {items.length ? (
        <div className="mt-4 grid gap-3">
          {items.map((challenge) => (
            <ChallengeCard key={challenge.code} challenge={challenge} onCopy={onCopy} onShare={onShare} onPlay={onPlay} />
          ))}
        </div>
      ) : (
        <p className="mt-3 text-base text-[var(--club-muted)]">None right now.</p>
      )}
    </section>
  );
}

function ChallengeCard({
  challenge,
  onCopy,
  onShare,
  onPlay,
  featured = false,
}: {
  challenge: Challenge;
  onCopy: (text: string, note: string) => void;
  onShare: (challenge: Challenge) => void;
  onPlay: (challenge: Challenge) => void;
  featured?: boolean;
}) {
  const club = useClub();
  const quiz = getQuiz(challenge.quizId);
  const you = challenge.youScore;
  const friend = challenge.friendScore;
  return (
    <article className={`rounded-[24px] p-4 ${featured ? "mt-6 bg-[var(--club-sky)]" : "bg-white"}`}>
      <h3 className="display text-2xl">{quiz?.title ?? "Quiz"}</h3>
      <p className="mt-1 text-sm">
        {challenge.friendName} · code {challenge.code}
      </p>
      {you && friend ? (
        <p className="mt-3 text-lg">
          You {you.correct}/{you.total} · {challenge.friendName} {friend.correct}/{friend.total}.{" "}
          {you.correct === friend.correct ? "A tie." : you.correct > friend.correct ? "You took it." : `${challenge.friendName} took it.`}
        </p>
      ) : (
        <p className="mt-3 text-base">
          {challenge.status === "pending"
            ? "Waiting for a friend to accept."
            : challenge.status === "incoming"
              ? `${challenge.friendName} already played ${friend?.correct}/${friend?.total}.`
              : "Both of you still owe this round."}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="rounded-full bg-[var(--club-ink)] px-4 py-2 text-sm font-semibold text-white" onClick={() => onCopy(challenge.code, "Code copied")}>
          Copy code
        </button>
        <button type="button" className="rounded-full bg-white px-4 py-2 text-sm font-semibold" onClick={() => onShare(challenge)}>
          Share
        </button>
        {challenge.status === "incoming" ? (
          <button type="button" className="rounded-full bg-[var(--club-purple)] px-4 py-2 text-sm font-semibold text-white" onClick={() => club.acceptChallenge(challenge.code)}>
            Accept
          </button>
        ) : null}
        {challenge.status === "pending" ? (
          <button type="button" className="rounded-full bg-[var(--club-purple)] px-4 py-2 text-sm font-semibold text-white" onClick={() => club.simulateAccept(challenge.code)}>
            Friend accepts
          </button>
        ) : null}
        {challenge.status === "active" || challenge.status === "incoming" ? (
          <button type="button" className="rounded-full bg-[var(--club-yellow)] px-4 py-2 text-sm font-semibold" onClick={() => onPlay(challenge)}>
            Play your side
          </button>
        ) : null}
        {challenge.status === "completed" ? (
          <Link href={`/results/${challenge.quizId}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold no-underline">
            Your latest result
          </Link>
        ) : null}
      </div>
    </article>
  );
}
