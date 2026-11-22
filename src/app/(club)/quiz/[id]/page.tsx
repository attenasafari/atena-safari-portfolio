import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuiz, quizzes } from "@/club/quizzes";
import { QuizDetailView } from "@/components/club/QuizDetailView";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const quiz = getQuiz(id);
  return { title: quiz?.title ?? "Quiz", description: quiz?.description };
}

export default async function QuizPage({ params }: PageProps) {
  const { id } = await params;
  if (!getQuiz(id)) notFound();
  return <QuizDetailView id={id} />;
}
