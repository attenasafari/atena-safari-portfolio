import type { Challenge } from "@/club/types";
import { levelFromXp } from "@/club/xp";

type AchievementCheck = (state: {
  xp: number;
  history: { quizId: string; categoryId: string; mode: string; correct: number; total: number; daily: boolean; timed: boolean; seconds: number }[];
  challenges: { createdByYou: boolean }[];
}) => boolean;

export type AchievementDef = {
  id: string;
  title: string;
  detail: string;
  check: AchievementCheck;
};

export const achievements: AchievementDef[] = [
  {
    id: "first-quiz",
    title: "First Quiz",
    detail: "Finish any round, even a messy one.",
    check: (state) => state.history.length >= 1,
  },
  {
    id: "perfect",
    title: "Perfect Score",
    detail: "Get every question right on a scored round.",
    check: (state) =>
      state.history.some((item) => item.mode === "scored" && item.correct === item.total),
  },
  {
    id: "explorer",
    title: "Quiz Explorer",
    detail: "Play five different categories.",
    check: (state) => new Set(state.history.map((item) => item.categoryId)).size >= 5,
  },
  {
    id: "daily",
    title: "Daily Player",
    detail: "Clear a daily challenge.",
    check: (state) => state.history.some((item) => item.daily),
  },
  {
    id: "brain",
    title: "Brain Master",
    detail: "Score 4 or better on a brain teaser.",
    check: (state) =>
      state.history.some((item) => item.categoryId === "brain" && item.correct >= 4),
  },
  {
    id: "social",
    title: "Social Butterfly",
    detail: "Send a challenge to a friend.",
    check: (state) => state.challenges.some((item) => item.createdByYou),
  },
  {
    id: "speed",
    title: "Speed Demon",
    detail: "Finish a timed scored round in under a minute.",
    check: (state) =>
      state.history.some((item) => item.mode === "scored" && item.timed && item.seconds > 0 && item.seconds < 60),
  },
  {
    id: "champion",
    title: "Quiz Champion",
    detail: "Reach level 5.",
    check: (state) => levelFromXp(state.xp) >= 5,
  },
];

export const leaderboard = [
  { id: "nia", name: "Nia Cole", xp: 860, streak: 12 },
  { id: "omar", name: "Omar Shah", xp: 740, streak: 6 },
  { id: "lina", name: "Lina Park", xp: 690, streak: 9 },
  { id: "theo", name: "Theo Marsh", xp: 610, streak: 4 },
  { id: "priya", name: "Priya Nair", xp: 540, streak: 3 },
  { id: "jonas", name: "Jonas Berg", xp: 480, streak: 2 },
  { id: "maya", name: "Maya Chen", xp: 420, streak: 7 },
  { id: "leo", name: "Leo Adeyemi", xp: 360, streak: 1 },
  { id: "hana", name: "Hana Ito", xp: 290, streak: 5 },
  { id: "sam", name: "Sam Okonkwo", xp: 210, streak: 1 },
];

export function seedChallenges(): Challenge[] {
  return [
    {
      code: "NIA204",
      quizId: "movie-night",
      status: "incoming",
      createdByYou: false,
      friendName: "Nia Cole",
      youScore: null,
      friendScore: { correct: 4, total: 5 },
      createdAt: "2026-11-02T18:10:00.000Z",
    },
    {
      code: "OMR118",
      quizId: "kitchen-lab",
      status: "incoming",
      createdByYou: false,
      friendName: "Omar Shah",
      youScore: null,
      friendScore: { correct: 3, total: 5 },
      createdAt: "2026-11-03T09:40:00.000Z",
    },
    {
      code: "LNA552",
      quizId: "song-five",
      status: "active",
      createdByYou: false,
      friendName: "Lina Park",
      youScore: null,
      friendScore: null,
      createdAt: "2026-11-03T21:05:00.000Z",
    },
    {
      code: "THO881",
      quizId: "brain-test",
      status: "completed",
      createdByYou: true,
      friendName: "Theo Marsh",
      youScore: { correct: 5, total: 5 },
      friendScore: { correct: 3, total: 5 },
      createdAt: "2026-10-28T16:20:00.000Z",
    },
    {
      code: "MAYA09",
      quizId: "weird-facts",
      status: "completed",
      createdByYou: false,
      friendName: "Maya Chen",
      youScore: { correct: 2, total: 5 },
      friendScore: { correct: 4, total: 5 },
      createdAt: "2026-10-30T11:15:00.000Z",
    },
  ];
}

export function simulatedFriendScore(code: string, total = 5) {
  let hash = 0;
  for (const char of code) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return { correct: Math.min(total, 2 + (hash % 4)), total };
}

export function makeChallengeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint32Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("");
}
