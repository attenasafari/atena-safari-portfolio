export type CategoryId =
  | "movies"
  | "music"
  | "brain"
  | "general"
  | "science"
  | "funny"
  | "logic"
  | "personality"
  | "sports"
  | "history";

export type Trait = "spark" | "tower" | "ranger" | "comet";

export type QuestionFormat = "multiple" | "true-false" | "image" | "logic" | "personality";

export type Option = {
  id: string;
  label: string;
  trait?: Trait;
  note?: string;
};

export type Question = {
  id: string;
  prompt: string;
  format: QuestionFormat;
  image?: "crew" | CategoryId;
  options: Option[];
  correctId?: string;
  explanation: string;
};

export type QuizMode = "scored" | "personality";

export type Quiz = {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  difficulty: "Easy" | "Medium" | "Tricky";
  minutes: number;
  mode: QuizMode;
  trending?: boolean;
  isNew?: boolean;
  plays: number;
  questions: Question[];
};

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
  alt: string;
  tint: string;
};

export type Answer = {
  questionId: string;
  selectedId: string | null;
  correct: boolean;
};

export type Attempt = {
  id: string;
  quizId: string;
  categoryId: CategoryId;
  mode: QuizMode;
  correct: number;
  total: number;
  accuracy: number;
  xp: number;
  daily: boolean;
  timed: boolean;
  seconds: number;
  at: string;
  title: string;
  personalityId?: Trait;
  challengeCode?: string;
};

export type Score = { correct: number; total: number };

export type ChallengeStatus = "pending" | "incoming" | "active" | "completed";

export type Challenge = {
  code: string;
  quizId: string;
  status: ChallengeStatus;
  createdByYou: boolean;
  friendName: string;
  youScore: Score | null;
  friendScore: Score | null;
  createdAt: string;
};

export type InProgress = {
  quizId: string;
  index: number;
  answers: Answer[];
  elapsed: number;
  challengeCode?: string;
  startedAt: number;
};

export type Unlocked = { id: string; at: string };

export type ClubState = {
  name: string;
  avatar: Trait;
  xp: number;
  streak: { count: number; lastDate: string | null };
  saved: string[];
  history: Attempt[];
  achievements: Unlocked[];
  challenges: Challenge[];
  inProgress: InProgress | null;
  lastResult: Attempt | null;
  timerOn: boolean;
};

export type Launch = {
  quizId: string;
  resume: boolean;
  challengeCode?: string;
};
