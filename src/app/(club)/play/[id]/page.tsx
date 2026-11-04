import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuiz, quizzes } from "@/club/quizzes";
import { PlayView } from "@/components/club/PlayView";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const quiz = getQuiz(id);
  return { title: quiz ? `Play ${quiz.title}` : "Play" };
}

export default async function PlayPage({ params }: PageProps) {
  const { id } = await params;
  if (!getQuiz(id)) notFound();
  return <PlayView id={id} />;
}
