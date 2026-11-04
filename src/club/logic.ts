import { characters } from "@/club/categories";
import { quizzes } from "@/club/quizzes";
import { achievements, seedChallenges, simulatedFriendScore } from "@/club/social";
import type { Answer, Attempt, ClubState, Question, Quiz, Trait } from "@/club/types";
import {
  XP_COMPLETE,
  XP_CORRECT,
  XP_DAILY,
  performanceTitle,
  todayKey,
  yesterdayKey,
} from "@/club/xp";

const STORAGE_KEY = "quiz-club-v1";

export function freshState(): ClubState {
  return {
    name: "Guest Star",
    avatar: "spark",
    xp: 0,
    streak: { count: 0, lastDate: null },
    saved: [],
    history: [],
    achievements: [],
    challenges: seedChallenges(),
    inProgress: null,
    lastResult: null,
    timerOn: true,
  };
}

export function loadState(): ClubState {
  if (typeof window === "undefined") return freshState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw) as Partial<ClubState>;
    const base = freshState();
    return {
      ...base,
      ...parsed,
      streak: { ...base.streak, ...parsed.streak },
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
      challenges: Array.isArray(parsed.challenges) ? parsed.challenges : base.challenges,
    };
  } catch {
    return freshState();
  }
}

export function saveState(state: ClubState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function dailyQuizId(date = new Date()) {
  const key = todayKey(date);
  const pool = quizzes.filter((quiz) => quiz.mode === "scored");
  let hash = 0;
  for (const char of key) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return pool[hash % pool.length]?.id ?? pool[0].id;
}

export function tallyPersonality(quiz: Quiz, answers: Answer[]) {
  const counts: Record<Trait, number> = { spark: 0, tower: 0, ranger: 0, comet: 0 };
  for (const answer of answers) {
    const question = quiz.questions.find((item) => item.id === answer.questionId);
    const option = question?.options.find((item) => item.id === answer.selectedId);
    if (option?.trait) counts[option.trait] += 1;
  }
  const order: Trait[] = ["spark", "tower", "ranger", "comet"];
  const top = order.reduce((best, trait) => (counts[trait] > counts[best] ? trait : best), order[0]);
  return { ...characters[top], id: top, top: counts[top] };
}

export function questionNote(question: Question, selectedId: string | null) {
  return question.options.find((option) => option.id === selectedId)?.note;
}

export function applyCompletion(
  prev: ClubState,
  input: {
    quiz: Quiz;
    answers: Answer[];
    seconds: number;
    timed: boolean;
    challengeCode?: string;
  },
) {
  const today = todayKey();
  const total = input.quiz.questions.length;
  const correct = input.answers.filter((answer) => answer.correct).length;
  const personality = input.quiz.mode === "personality" ? tallyPersonality(input.quiz, input.answers) : undefined;
  const shownCorrect = personality ? personality.top : correct;
  const accuracy = Math.round((shownCorrect / total) * 100);
  const alreadyDaily = prev.history.some((item) => item.daily && item.at.slice(0, 10) === today);
  const isDaily = input.quiz.id === dailyQuizId() && !alreadyDaily && input.quiz.mode === "scored";
  const answered = input.answers.filter((answer) => answer.selectedId).length;
  const xp =
    (input.quiz.mode === "personality" ? answered : correct) * XP_CORRECT +
    XP_COMPLETE +
    (isDaily ? XP_DAILY : 0);

  let streak = prev.streak.count;
  let streakGrew = false;
  if (prev.streak.lastDate === today) {
    streak = Math.max(streak, 1);
  } else if (prev.streak.lastDate === yesterdayKey()) {
    streak += 1;
    streakGrew = true;
  } else {
    streak = 1;
    streakGrew = true;
  }

  const attempt: Attempt = {
    id: `${input.quiz.id}-${Date.now()}`,
    quizId: input.quiz.id,
    categoryId: input.quiz.categoryId,
    mode: input.quiz.mode,
    correct: shownCorrect,
    total,
    accuracy,
    xp,
    daily: isDaily,
    timed: input.timed,
    seconds: input.seconds,
    at: new Date().toISOString(),
    title: personality ? personality.name : performanceTitle(accuracy),
    personalityId: personality?.id,
    challengeCode: input.challengeCode,
  };

  const challenges = input.challengeCode
    ? prev.challenges.map((challenge) => {
        if (challenge.code !== input.challengeCode) return challenge;
        const youScore = {
          correct: input.quiz.mode === "personality" ? answered : correct,
          total,
        };
        return {
          ...challenge,
          status: "completed" as const,
          youScore,
          friendScore: challenge.friendScore ?? simulatedFriendScore(challenge.code, total),
        };
      })
    : prev.challenges;

  const draft: ClubState = {
    ...prev,
    xp: prev.xp + xp,
    streak: { count: streak, lastDate: today },
    history: [attempt, ...prev.history].slice(0, 40),
    lastResult: attempt,
    inProgress: prev.inProgress?.quizId === input.quiz.id ? null : prev.inProgress,
    challenges,
  };

  const unlocked = achievements
    .filter((badge) => !prev.achievements.some((item) => item.id === badge.id) && badge.check(draft))
    .map((badge) => badge.id);

  draft.achievements = [
    ...prev.achievements,
    ...unlocked.map((id) => ({ id, at: attempt.at })),
  ];

  return { state: draft, attempt, unlocked, streakGrew, xp };
}

export function averageAccuracy(state: ClubState) {
  const scored = state.history.filter((item) => item.mode === "scored");
  if (!scored.length) return null;
  return Math.round(scored.reduce((sum, item) => sum + item.accuracy, 0) / scored.length);
}
