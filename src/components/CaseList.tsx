import Link from "next/link";
import { getChildCases, getWorkListEntries, type CaseStudy } from "@/data/cases";

function CaseRow({
  study,
  index,
  nested = false,
}: {
  study: CaseStudy;
  index: number;
  nested?: boolean;
}) {
  const isOverview = study.kind === "overview";

  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group grid gap-4 rounded-[1.75rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-7 ${
        nested ? "border-[var(--line)] shadow-none" : ""
      }`}
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
          {isOverview ? "Open overview ↵" : "Open case ↵"}
        </span>
      </div>
    </Link>
  );
}

export function CaseList() {
  const topLevel = getWorkListEntries();
  let counter = 0;

  return (
    <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] pb-16">
      <ul className="grid gap-5">
        {topLevel.map((study) => {
          const index = counter++;
          const children =
            study.kind === "overview" ? getChildCases(study.slug) : [];

          return (
            <li key={study.slug} className="space-y-3">
              <CaseRow study={study} index={index} />
              {children.length > 0 ? (
                <ul className="ml-0 grid gap-3 border-l-[3px] border-[var(--accent-lime)] pl-4 sm:ml-6">
                  {children.map((child) => {
                    const childIndex = counter++;
                    return (
                      <li key={child.slug}>
                        <CaseRow study={child} index={childIndex} nested />
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
