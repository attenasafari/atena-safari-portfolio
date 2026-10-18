import Image from "next/image";
import type { CaseVisual } from "@/data/cases";
import { withBasePath } from "@/lib/base-path";

type CaseVisualsProps = {
  visuals: CaseVisual[];
  caption?: string;
  title?: string;
};

export function CaseVisuals({
  visuals,
  caption,
  title = "Before → after",
}: CaseVisualsProps) {
  const cols =
    visuals.length >= 3
      ? "md:grid-cols-3"
      : visuals.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  return (
    <section id="visuals" aria-labelledby="visuals-heading" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="visuals-heading"
            className="font-[family-name:var(--font-fredoka)] text-xl font-semibold sm:text-2xl"
          >
            {title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--ink-muted)]">
            {caption ?? "Product screens from discovery."}
          </p>
        </div>
      </div>

      <ol className={`mt-6 grid gap-5 ${cols}`}>
        {visuals.map((visual, index) => (
          <li
            key={visual.src}
            className="flex flex-col overflow-hidden rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-center justify-between gap-2 border-b-2 border-[var(--ink)] px-4 py-3">
              <span
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-3 py-1 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-[var(--ink)]"
                style={{ backgroundColor: visual.badgeColor }}
              >
                <span
                  aria-hidden
                  className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--ink)] text-[10px] font-bold text-white"
                >
                  {index + 1}
                </span>
                {visual.label}
              </span>
              {visual.state ? (
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                  {visual.state}
                </span>
              ) : null}
            </div>
            <div className="relative mx-auto w-full max-w-[20rem] bg-[linear-gradient(180deg,#eef8f6,#f7f4ee)] px-4 py-5">
              <div className="overflow-hidden rounded-[1.25rem] border-2 border-[var(--ink)] bg-white shadow-[var(--shadow-key)]">
                <Image
                  src={withBasePath(visual.src)}
                  alt={visual.alt}
                  width={visual.width}
                  height={visual.height}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 90vw, 320px"
                  priority={index === 0}
                />
              </div>
            </div>
            <p className="border-t border-[var(--line)] px-4 py-3 text-sm leading-relaxed text-[var(--ink-muted)]">
              {visual.caption}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
