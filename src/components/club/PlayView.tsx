"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCategory } from "@/club/categories";
import { questionNote } from "@/club/logic";
import { getQuiz } from "@/club/quizzes";
import { bootQuiz, flushClub } from "@/club/store";
import type { Answer } from "@/club/types";
import { useClub } from "@/components/club/ClubProvider";
import { Modal, Plush } from "@/components/club/ui";

const LIMIT = 20;

export function PlayView({ id }: { id: string }) {
  const club = useClub();
  const quiz = getQuiz(id);
  if (!quiz) {
    return (
      <p className="pt-10 text-lg">
        That round is missing. <Link href="/">Home</Link>
      </p>
    );
  }
  if (!club.ready) return <p className="pt-10 text-lg">Setting the table…</p>;
  return <PlaySession id={id} />;
}

function PlaySession({ id }: { id: string }) {
  const quiz = getQuiz(id);
  const club = useClub();
  const router = useRouter();
  const [boot] = useState(() => bootQuiz(id, quiz?.questions.map((question) => question.id) ?? []));
  const [index, setIndex] = useState(boot.index);
  const [selected, setSelected] = useState<string | null>(boot.selected);
  const [locked, setLocked] = useState(boot.locked);
  const [answers, setAnswers] = useState<Answer[]>(boot.answers);
  const [left, setLeft] = useState(LIMIT);
  const [paused, setPaused] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const elapsedRef = useRef(boot.elapsed);
  const lockedRef = useRef(boot.locked);
  const answersRef = useRef<Answer[]>(boot.answers);
  const indexRef = useRef(boot.index);
  const challengeRef = useRef<string | undefined>(boot.challengeCode);
  const startedRef = useRef(boot.startedAt);
  const selectedRef = useRef<string | null>(boot.selected);
  const lockRef = useRef<(choice: string | null) => void>(() => {});
  const goNextRef = useRef<() => void>(() => {});

  useEffect(() => {
    flushClub();
  }, []);

  useEffect(() => {
    lockRef.current = lockIn;
    goNextRef.current = goNext;
  });

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      elapsedRef.current += 1;
    }, 1000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (!club.state.timerOn || paused || locked) return;
    const timer = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          window.setTimeout(() => lockRef.current(selectedRef.current), 0);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [club.state.timerOn, index, locked, paused]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (paused || confirmExit) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const digit = Number(event.key);
      const options = quiz?.questions[indexRef.current]?.options ?? [];
      if (!lockedRef.current && digit >= 1 && digit <= options.length) {
        setSelected(options[digit - 1].id);
        selectedRef.current = options[digit - 1].id;
      }
      if (event.key === "Enter") goNextRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmExit, paused, quiz]);

  if (!quiz) {
    return (
      <p className="pt-10 text-lg">
        That round is missing. <Link href="/">Home</Link>
      </p>
    );
  }

  const question = quiz.questions[index];
  const category = getCategory(quiz.categoryId);
  const personality = quiz.mode === "personality";
  const correctOption = question.options.find((option) => option.id === question.correctId);
  const progress = Math.round((((locked ? index + 1 : index) / quiz.questions.length) * 100));
  const score = answers.filter((answer) => answer.correct && !personality).length;
  const image =
    question.image === "crew"
      ? "/assets/mascots/crew.jpg"
      : question.image
        ? getCategory(question.image)?.image
        : undefined;

  function persist(nextAnswers: Answer[], nextIndex: number) {
    club.saveProgress({
      quizId: quiz!.id,
      index: nextIndex,
      answers: nextAnswers,
      elapsed: elapsedRef.current,
      challengeCode: challengeRef.current,
      startedAt: startedRef.current,
    });
  }

  function lockIn(choice: string | null) {
    if (lockedRef.current || !quiz) return;
    const current = quiz.questions[indexRef.current];
    if (!current) return;
    if (current.format !== "personality" && answersRef.current.some((answer) => answer.questionId === current.id)) {
      lockedRef.current = true;
      setLocked(true);
      return;
    }
    lockedRef.current = true;
    setLocked(true);
    setSelected(choice);
    const correct = personality ? Boolean(choice) : choice === current.correctId;
    const nextAnswers = [
      ...answersRef.current.filter((answer) => answer.questionId !== current.id),
      { questionId: current.id, selectedId: choice, correct },
    ];
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
    persist(nextAnswers, indexRef.current);
  }

  function choose(optionId: string) {
    if (lockedRef.current) return;
    selectedRef.current = optionId;
    setSelected(optionId);
  }

  function goNext() {
    if (!quiz) return;
    if (!lockedRef.current) {
      if (selected) lockIn(selected);
      return;
    }
    if (indexRef.current + 1 >= quiz.questions.length) {
      const result = club.completeQuiz({
        quiz,
        answers: answersRef.current,
        seconds: elapsedRef.current,
        timed: club.state.timerOn,
        challengeCode: challengeRef.current,
      });
      if (result?.attempt.challengeCode) {
        router.push(`/results/${quiz.id}?challenge=${result.attempt.challengeCode}`);
      } else {
        router.push(`/results/${quiz.id}`);
      }
      return;
    }
    const nextIndex = indexRef.current + 1;
    indexRef.current = nextIndex;
    lockedRef.current = false;
    setIndex(nextIndex);
    selectedRef.current = null;
    setSelected(null);
    setLocked(false);
    setLeft(LIMIT);
    persist(answersRef.current, nextIndex);
  }

  function optionState(optionId: string) {
    if (!locked) return selected === optionId ? "selected" : "default";
    if (personality) return selected === optionId ? "selected" : "default";
    if (optionId === question.correctId) return "correct";
    if (optionId === selected) return "wrong";
    return "default";
  }

  const styles: Record<string, string> = {
    default: "bg-white",
    selected: "bg-[#E4DCFF]",
    correct: "bg-[#B7EBD9]",
    wrong: "bg-[#FFC7C2]",
  };

  return (
    <div className="mx-auto max-w-xl pt-5">
      <div className="flex items-center justify-between gap-3">
        <button type="button" className="font-semibold text-[var(--club-purple)]" onClick={() => setConfirmExit(true)}>
          Exit
        </button>
        <p className="text-sm font-semibold">
          Question {index + 1} of {quiz.questions.length}
        </p>
        <button type="button" className="font-semibold" onClick={() => setPaused(true)}>
          Pause
        </button>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white" aria-hidden="true">
        <div className="h-full rounded-full bg-[var(--club-purple)]" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p>{personality ? "Character round" : `Score ${score}`}</p>
        {club.state.timerOn ? <p aria-live="polite">{left}s left</p> : <p>Timer off</p>}
      </div>
      <h1 className="display mt-6 text-4xl leading-tight">{question.prompt}</h1>
      {image ? (
        <Plush
          src={image}
          alt={question.image === "crew" ? "The four fuzzy Quiz Club friends" : category?.alt ?? ""}
          className="mt-5 h-52 w-full rounded-[24px]"
        />
      ) : null}
      <div className="mt-6 grid gap-3" role="group" aria-label="Answers">
        {question.options.map((option, optionIndex) => {
          const state = optionState(option.id);
          const mark =
            state === "correct" ? "Correct" : state === "wrong" ? "Not this one" : state === "selected" ? "Selected" : "";
          return (
            <button
              key={option.id}
              type="button"
              disabled={locked}
              aria-pressed={selected === option.id}
              onClick={() => choose(option.id)}
              className={`club-btn rounded-[22px] px-4 py-4 text-left text-lg ${styles[state]} disabled:opacity-100`}
            >
              <span className="mr-2 text-[var(--club-muted)]">{optionIndex + 1}</span>
              {option.label}
              {mark ? <span className="mt-1 block text-sm font-semibold">{mark}</span> : null}
            </button>
          );
        })}
      </div>
      <p className="sr-only">Keys 1 to 4 pick an answer. Enter locks it or moves on.</p>
      {locked ? (
        <p role="status" className="mt-4 text-base leading-relaxed">
          {personality
            ? questionNote(question, selected) ?? question.explanation
            : selected && selected === question.correctId
              ? question.explanation
              : `The answer is ${correctOption?.label}. ${question.explanation}`}
        </p>
      ) : null}
      <button
        type="button"
        onClick={goNext}
        disabled={!selected && !locked}
        className="club-btn mt-6 w-full rounded-full bg-[var(--club-purple)] px-6 py-4 text-lg font-semibold text-white disabled:opacity-50"
      >
        {!locked ? "Lock it in" : index + 1 === quiz.questions.length ? "See results" : "Next question"}
      </button>

      <Modal open={paused} title="Paused" onClose={() => setPaused(false)}>
        <p>The clock is holding still.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="club-btn rounded-full bg-[var(--club-purple)] px-5 py-3 font-semibold text-white" onClick={() => setPaused(false)}>
            Resume
          </button>
          <button type="button" className="club-btn rounded-full bg-white px-5 py-3 font-semibold" onClick={() => setConfirmExit(true)}>
            Exit round
          </button>
        </div>
      </Modal>
      <Modal open={confirmExit} title="Leave this round?" onClose={() => setConfirmExit(false)}>
        <p>Your place is saved. You can continue from Home.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            className="club-btn rounded-full bg-[var(--club-ink)] px-5 py-3 font-semibold text-white"
            onClick={() => {
              persist(answersRef.current, indexRef.current);
              router.push("/");
            }}
          >
            Save and leave
          </button>
          <button type="button" className="club-btn rounded-full bg-[#EAE7F0] px-5 py-3 font-semibold text-[#242334]" onClick={() => setConfirmExit(false)}>
            Keep playing
          </button>
        </div>
      </Modal>
    </div>
  );
}
