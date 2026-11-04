"use client";

import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";
import { characters, getCategory } from "@/club/categories";
import { achievements } from "@/club/social";
import type { CategoryId, Quiz, Trait } from "@/club/types";
import { useClub } from "@/components/club/ClubProvider";

export function asset(src: string) {
  return withBasePath(src);
}

export function categoryImage(id: CategoryId) {
  return asset(getCategory(id)?.image ?? "/assets/categories/globe.jpg");
}

export function Avatar({
  trait,
  size = 48,
  alt = "",
}: {
  trait: Trait;
  size?: number;
  alt?: string;
}) {
  return (
    <span
      className="inline-flex shrink-0 overflow-hidden rounded-full bg-white"
      style={{ width: size, height: size }}
    >
      <Image
        src={asset("/assets/mascots/crew.jpg")}
        alt={alt}
        width={160}
        height={160}
        className="h-full w-full object-cover"
        style={{ objectPosition: characters[trait].crop }}
      />
    </span>
  );
}

export function Plush({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={asset(src)}
      alt={alt}
      width={640}
      height={640}
      className={`bg-white object-contain ${className}`}
    />
  );
}

export function QuizCard({ quiz }: { quiz: Quiz }) {
  const category = getCategory(quiz.categoryId);
  return (
    <Link
      href={`/quiz/${quiz.id}`}
      className="club-card flex min-h-28 items-center gap-4 p-3 text-inherit no-underline"
    >
      <Plush
        src={category?.image ?? ""}
        alt=""
        className="h-24 w-24 shrink-0 rounded-[18px]"
      />
      <span className="min-w-0">
        <span className="display block text-xl text-[var(--club-ink)]">{quiz.title}</span>
        <span className="mt-1 block text-sm text-[var(--club-muted)]">
          {category?.name} · {quiz.difficulty} · {quiz.minutes} min
        </span>
      </span>
    </Link>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#242334]/45 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="club-dialog-title"
        className="club-pop w-full max-w-md rounded-[28px] bg-white p-6 text-[#242334] shadow-[0_24px_60px_rgba(36,35,52,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="club-dialog-title" className="display text-3xl">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export function BadgeDialog() {
  const club = useClub();
  const badge = achievements.find((item) => item.id === club.badgeId);
  const unlocked = club.state.achievements.some((item) => item.id === badge?.id);
  return (
    <Modal open={Boolean(badge)} title={badge?.title ?? "Badge"} onClose={club.closeBadge}>
      {badge ? (
        <>
          <p className="text-base leading-relaxed">{badge.detail}</p>
          <p className="mt-3 text-sm text-[var(--club-muted)]">
            {unlocked ? "This one is on your shelf." : "Still locked. Play to open it."}
          </p>
          <button
            type="button"
            className="club-btn mt-5 rounded-full bg-[var(--club-purple)] px-5 py-3 font-semibold text-white"
            onClick={club.closeBadge}
          >
            Close
          </button>
        </>
      ) : null}
    </Modal>
  );
}

export function Toasts() {
  const { toasts } = useClub();
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <p
          key={toast.id}
          role="status"
          className="club-pop rounded-full bg-[#242334] px-4 py-2 text-sm text-white"
        >
          {toast.message}
        </p>
      ))}
    </div>
  );
}
