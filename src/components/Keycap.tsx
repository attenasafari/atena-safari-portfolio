"use client";

import type { CSSProperties, ReactNode } from "react";

type KeycapProps = {
  label: string;
  color: string;
  delayMs?: number;
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
};

export function Keycap({
  label,
  color,
  delayMs = 0,
  size = "lg",
  className = "",
  onClick,
  children,
}: KeycapProps) {
  const dims =
    size === "lg"
      ? "h-[4.5rem] w-[4.5rem] text-2xl sm:h-20 sm:w-20 sm:text-3xl"
      : "h-14 w-14 text-xl sm:h-16 sm:w-16 sm:text-2xl";

  const style = {
    backgroundColor: color,
    animationDelay: `${delayMs}ms`,
  } as CSSProperties;

  const sharedClass = `animate-key-in group relative inline-flex ${dims} select-none items-center justify-center rounded-[var(--radius-key)] font-[family-name:var(--font-fredoka)] font-semibold text-[var(--ink)] shadow-[var(--shadow-key)] transition-[transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-press)] hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(26,26,26,0.18),0_18px_32px_rgba(26,26,26,0.1)] active:translate-y-1 active:shadow-[var(--shadow-key-pressed)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)] ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[3px] rounded-[calc(var(--radius-key)-4px)] bg-gradient-to-b from-white/35 to-transparent"
      />
      <span className="relative z-[1] tracking-wide">{children ?? label}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Key ${label}`}
        className={sharedClass}
        style={style}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={sharedClass} style={style} aria-hidden>
      {inner}
    </div>
  );
}
