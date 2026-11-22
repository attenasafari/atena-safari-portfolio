"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories } from "@/club/categories";
import { quizzes } from "@/club/quizzes";
import { useClub } from "@/components/club/ClubProvider";
import { Plush, QuizCard } from "@/components/club/ui";

const hints = ["movies", "riddles", "weird facts", "songs", "science"];

export function ExploreView() {
  const club = useClub();
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const saved = quizzes.filter((quiz) => club.state.saved.includes(quiz.id));
  const results = useMemo(() => {
    if (!needle) return [];
    return quizzes.filter((quiz) => {
      const category = categories.find((item) => item.id === quiz.categoryId);
      const haystack = `${quiz.title} ${quiz.description} ${category?.name ?? ""}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [needle]);
  const popular = [...quizzes].sort((a, b) => b.plays - a.plays).slice(0, 4);
  const fresh = quizzes.filter((quiz) => quiz.isNew);
  const trending = quizzes.filter((quiz) => quiz.trending);

  return (
    <div className="pt-6 md:pt-8">
      <h1 className="display text-5xl md:text-6xl">Explore</h1>
      <p className="mt-3 max-w-xl text-lg">Search the club, or wander a shelf.</p>
      <form
        className="mt-6"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="quiz-search" className="display block text-2xl">
          Search quizzes
        </label>
        <input
          id="quiz-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try songs, science, riddles"
          className="mt-3 w-full rounded-[20px] bg-white px-4 py-4 text-lg text-[var(--club-ink)]"
        />
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {hints.map((hint) => (
          <button
            key={hint}
            type="button"
            onClick={() => setQuery(hint)}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold"
          >
            {hint}
          </button>
        ))}
      </div>

      {needle ? (
        <section className="mt-8" aria-labelledby="search-results">
          <h2 id="search-results" className="display text-3xl">
            {results.length ? `${results.length} matches` : "Nothing matches"}
          </h2>
          {results.length ? (
            <div className="mt-4 grid gap-3">
              {results.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-lg">
              Try a category name, or clear the search and browse the shelves.
            </p>
          )}
        </section>
      ) : (
        <>
          <section className="mt-8" aria-labelledby="all-categories">
            <h2 id="all-categories" className="display text-3xl">
              All categories
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`} className="text-inherit no-underline">
                  <Plush src={category.image} alt={category.alt} className="aspect-square w-full rounded-[24px]" />
                  <span className="mt-2 block font-semibold">{category.name}</span>
                </Link>
              ))}
            </div>
          </section>
          <Shelf title="Popular" quizzes={popular} />
          <Shelf title="New" quizzes={fresh} />
          <Shelf title="Trending" quizzes={trending} />
          <section className="mt-10" aria-labelledby="saved-heading">
            <h2 id="saved-heading" className="display text-3xl">
              Saved
            </h2>
            {saved.length ? (
              <div className="mt-4 grid gap-3">
                {saved.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-lg">
                Nothing saved yet. Open a quiz and keep it for later.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function Shelf({ title, quizzes: items }: { title: string; quizzes: typeof quizzes }) {
  return (
    <section className="mt-10" aria-labelledby={`${title}-heading`}>
      <h2 id={`${title}-heading`} className="display text-3xl">
        {title}
      </h2>
      <div className="mt-4 grid gap-3">
        {items.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </section>
  );
}
