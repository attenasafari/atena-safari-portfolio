"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { achievements, makeChallengeCode } from "@/club/social";
import { applyCompletion } from "@/club/logic";
import {
  armLaunch,
  commitClub,
  getClientClub,
  getClientReady,
  getServerClub,
  getServerReady,
  resetClub,
  saveProgress,
  subscribeClub,
  takeLaunch,
  updateClub,
} from "@/club/store";
import type { Challenge, ClubState, InProgress, Launch, Quiz } from "@/club/types";
import type { Answer } from "@/club/types";

type Toast = { id: string; message: string };

type CompleteInput = {
  quiz: Quiz;
  answers: Answer[];
  seconds: number;
  timed: boolean;
  challengeCode?: string;
};

type ClubContextValue = {
  ready: boolean;
  state: ClubState;
  toasts: Toast[];
  badgeId: string | null;
  openBadge: (id: string) => void;
  closeBadge: () => void;
  toast: (message: string) => void;
  setName: (name: string) => void;
  setAvatar: (avatar: ClubState["avatar"]) => void;
  setTimer: (timerOn: boolean) => void;
  toggleSave: (quizId: string) => void;
  armLaunch: (launch: Launch) => void;
  consumeLaunch: () => Launch | null;
  saveProgress: (progress: InProgress) => void;
  completeQuiz: (input: CompleteInput) => ReturnType<typeof applyCompletion>;
  createChallenge: (quizId: string) => Challenge;
  acceptChallenge: (code: string) => void;
  simulateAccept: (code: string) => void;
  resetProgress: () => void;
};

const ClubContext = createContext<ClubContextValue | null>(null);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribeClub, getClientClub, getServerClub);
  const ready = useSyncExternalStore(subscribeClub, getClientReady, getServerReady);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [badgeId, setBadgeId] = useState<string | null>(null);

  const toast = useCallback((message: string) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3400);
  }, []);

  const value = useMemo<ClubContextValue>(() => {
    return {
      ready,
      state,
      toasts,
      badgeId,
      openBadge: setBadgeId,
      closeBadge: () => setBadgeId(null),
      toast,
      setName: (name) => updateClub((current) => ({ ...current, name: name.trim() || "Guest Star" })),
      setAvatar: (avatar) => updateClub((current) => ({ ...current, avatar })),
      setTimer: (timerOn) => updateClub((current) => ({ ...current, timerOn })),
      toggleSave: (quizId) =>
        updateClub((current) => ({
          ...current,
          saved: current.saved.includes(quizId)
            ? current.saved.filter((id) => id !== quizId)
            : [...current.saved, quizId],
        })),
      armLaunch,
      consumeLaunch: takeLaunch,
      saveProgress,
      completeQuiz: (input) => {
        const result = applyCompletion(getClientClub(), input);
        commitClub(result.state);
        toast(`+${result.xp} XP`);
        if (result.streakGrew) {
          toast(
            result.state.streak.count === 1
              ? "Streak started. Come back tomorrow to keep it."
              : `Streak is ${result.state.streak.count} days.`,
          );
        }
        if (result.unlocked[0]) setBadgeId(result.unlocked[0]);
        return result;
      },
      createChallenge: (quizId) => {
        const challenge: Challenge = {
          code: makeChallengeCode(),
          quizId,
          status: "pending",
          createdByYou: true,
          friendName: "A friend",
          youScore: null,
          friendScore: null,
          createdAt: new Date().toISOString(),
        };
        const current = getClientClub();
        const next: ClubState = { ...current, challenges: [challenge, ...current.challenges] };
        const badge = achievements.find((item) => item.id === "social");
        if (badge && !current.achievements.some((item) => item.id === "social") && badge.check(next)) {
          next.achievements = [...current.achievements, { id: "social", at: challenge.createdAt }];
          setBadgeId("social");
        }
        commitClub(next);
        return challenge;
      },
      acceptChallenge: (code) =>
        updateClub((current) => ({
          ...current,
          challenges: current.challenges.map((challenge) =>
            challenge.code === code && challenge.status === "incoming"
              ? { ...challenge, status: "active" }
              : challenge,
          ),
        })),
      simulateAccept: (code) =>
        updateClub((current) => ({
          ...current,
          challenges: current.challenges.map((challenge) =>
            challenge.code === code && challenge.status === "pending"
              ? { ...challenge, status: "active", friendName: "Priya Nair" }
              : challenge,
          ),
        })),
      resetProgress: () => {
        resetClub();
        toast("Progress cleared. You are a guest again.");
      },
    };
  }, [badgeId, ready, state, toast, toasts]);

  return <ClubContext.Provider value={value}>{children}</ClubContext.Provider>;
}

export function useClub() {
  const context = useContext(ClubContext);
  if (!context) throw new Error("useClub must be used inside ClubProvider");
  return context;
}
