import { freshState, loadState, saveState, clearState } from "@/club/logic";
import type { Answer, ClubState, InProgress, Launch } from "@/club/types";

const serverState = freshState();
let clientState: ClubState | null = null;
let launch: Launch | null = null;
let takenLaunch: Launch | null | undefined;
let bootMemo: { quizId: string; boot: Boot } | null = null;

export type Boot = {
  index: number;
  answers: Answer[];
  elapsed: number;
  challengeCode?: string;
  startedAt: number;
  selected: string | null;
  locked: boolean;
};
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeClub(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getClientClub(): ClubState {
  if (!clientState) clientState = loadState();
  return clientState;
}

export function getServerClub(): ClubState {
  return serverState;
}

export function getClientReady() {
  return true;
}

export function getServerReady() {
  return false;
}

export function commitClub(next: ClubState) {
  clientState = next;
  if (typeof window !== "undefined") saveState(next);
  emit();
}

export function updateClub(updater: (current: ClubState) => ClubState) {
  commitClub(updater(getClientClub()));
}

export function resetClub() {
  clearState();
  const next = freshState();
  clientState = next;
  saveState(next);
  emit();
}

export function armLaunch(next: Launch) {
  launch = next;
  takenLaunch = undefined;
  bootMemo = null;
}

export function takeLaunch() {
  if (takenLaunch === undefined) {
    takenLaunch = launch;
    launch = null;
  }
  return takenLaunch;
}

export function saveProgress(progress: InProgress, quiet = false) {
  clientState = { ...getClientClub(), inProgress: progress };
  if (typeof window !== "undefined") saveState(clientState);
  if (!quiet) emit();
}

export function flushClub() {
  emit();
}

export function bootQuiz(quizId: string, questionIds: string[]): Boot {
  if (bootMemo?.quizId === quizId) return bootMemo.boot;
  const pending = takeLaunch();
  const progress = getClientClub().inProgress;
  const resume = pending ? Boolean(pending.resume && progress?.quizId === quizId) : progress?.quizId === quizId;
  if (resume && progress) {
    const questionId = questionIds[progress.index];
    const existing = progress.answers.find((answer) => answer.questionId === questionId);
    const boot: Boot = {
      index: progress.index,
      answers: progress.answers,
      elapsed: progress.elapsed,
      challengeCode: progress.challengeCode ?? pending?.challengeCode,
      startedAt: progress.startedAt,
      selected: existing?.selectedId ?? null,
      locked: Boolean(existing),
    };
    bootMemo = { quizId, boot };
    return boot;
  }
  const startedAt = Date.now();
  const boot: Boot = {
    index: 0,
    answers: [],
    elapsed: 0,
    challengeCode: pending?.challengeCode,
    startedAt,
    selected: null,
    locked: false,
  };
  saveProgress(
    {
      quizId,
      index: 0,
      answers: [],
      elapsed: 0,
      challengeCode: pending?.challengeCode,
      startedAt,
    },
    true,
  );
  bootMemo = { quizId, boot };
  return boot;
}
