"use client";

import Link from "next/link";
import { getCategory } from "@/club/categories";
import { quizzesIn } from "@/club/quizzes";
import type { CategoryId } from "@/club/types";
import { Plush, QuizCard } from "@/components/club/ui";

export function CategoryView({ id }: { id: CategoryId }) {
  const category = getCategory(id);
  if (!category) {
    return (
      <p className="pt-10 text-lg">
        That shelf is not in the club. <Link href="/explore">Back to explore</Link>
      </p>
    );
  }
  const items = quizzesIn(id);
  return (
    <div className="pt-6 md:pt-8">
      <Link href="/explore" className="font-semibold text-[var(--club-purple)]">
        All categories
      </Link>
      <div className="mt-4 grid items-center gap-6 md:grid-cols-[220px_1fr]">
        <Plush src={category.image} alt={category.alt} className="aspect-square w-full rounded-[28px]" />
        <div>
          <h1 className="display text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-xl text-lg">{category.blurb}</p>
        </div>
      </div>
      <section className="mt-8" aria-labelledby="category-quizzes">
        <h2 id="category-quizzes" className="display text-3xl">
          Quizzes
        </h2>
        <div className="mt-4 grid gap-3">
          {items.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>
    </div>
  );
}
