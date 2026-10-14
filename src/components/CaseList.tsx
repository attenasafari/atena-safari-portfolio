import Link from "next/link";
import { caseStudies } from "@/data/cases";

export function CaseList() {
  return (
    <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] pb-16">
      <ul className="grid gap-5">
        {caseStudies.map((study, index) => (
          <li key={study.slug}>
            <Link
              href={`/work/${study.slug}`}
              className="group grid gap-4 rounded-[1.75rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-7"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[var(--ink)] shadow-[var(--shadow-key)] transition-transform duration-200 group-hover:-translate-y-0.5"
                style={{ backgroundColor: study.accent }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                  {study.eyebrow}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-fredoka)] text-2xl font-semibold tracking-tight sm:text-3xl">
                  {study.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[var(--ink-muted)]">{study.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[var(--radius-pill)] border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--ink-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:text-right">
                <p className="text-sm font-medium text-[var(--ink)]">{study.outcomeTeaser}</p>
                <span className="inline-flex h-11 items-center rounded-[1rem] bg-[var(--ink)] px-4 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-white transition-transform duration-200 group-hover:translate-x-1">
                  Open case ↵
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 rounded-[1.35rem] border border-dashed border-[var(--ink-soft)] px-5 py-4 text-sm text-[var(--ink-soft)]">
        More case studies will appear here as they’re ready — no placeholders.
      </p>
    </div>
  );
}
