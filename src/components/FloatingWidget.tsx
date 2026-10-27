import Link from "next/link";
import type { ReactNode } from "react";

type FloatingWidgetProps = {
  href: string;
  title: string;
  meta: string;
  accent: string;
  delayClass?: string;
  icon?: ReactNode;
};

export function FloatingWidget({
  href,
  title,
  meta,
  accent,
  delayClass = "animate-float",
  icon,
}: FloatingWidgetProps) {
  return (
    <Link
      href={href}
      className={`group relative z-10 block w-[9.5rem] rounded-[1.35rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow-float)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(26,26,26,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)] ${delayClass}`}
    >
      <div
        className="mb-3 flex h-16 items-end justify-start overflow-hidden rounded-[1rem] px-3 pb-2"
        style={{ backgroundColor: accent }}
      >
        {icon ?? (
          <div className="flex gap-1">
            <span className="h-8 w-3 rounded-t-md bg-white/70" />
            <span className="h-11 w-3 rounded-t-md bg-white/90" />
            <span className="h-6 w-3 rounded-t-md bg-white/60" />
          </div>
        )}
      </div>
      <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold leading-snug text-[var(--ink)]">
        {title}
      </p>
      <p className="mt-1 text-xs text-[var(--ink-muted)]">{meta}</p>
    </Link>
  );
}
