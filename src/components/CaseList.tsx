"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { getChildCases, getWorkListEntries, type CaseStudy } from "@/data/cases";

function CaseStackItem({ study, nested = false }: { study: CaseStudy; nested?: boolean }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <li className={nested ? "pl-3" : undefined}>
      <div className={`case-card ${open ? "is-open" : ""}`}>
        <div
          className={`flex items-center gap-1 rounded-[1.1rem] border-[2px] border-[var(--ink)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)] ${
            nested ? "border-[var(--line)]" : ""
          }`}
        >
          <Link
            href={`/work/${study.slug}`}
            className="min-w-0 flex-1 rounded-[1rem] px-3 py-2.5 font-[family-name:var(--font-fredoka)] text-base font-semibold leading-snug text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a]"
          >
            {study.title}
          </Link>
          <button
            type="button"
            className="case-toggle mr-1.5 h-9 w-9 shrink-0 items-center justify-center rounded-[0.8rem] text-lg text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a]"
            aria-expanded={open}
            aria-controls={detailsId}
            aria-label={`${open ? "Hide" : "Show"} details for ${study.title}`}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden>{open ? "–" : "+"}</span>
          </button>
        </div>
        <div className="case-more" id={detailsId}>
          <div className="overflow-hidden">
            <div className="px-3 pt-2 pb-1">
              <p className="text-sm leading-snug text-[var(--ink-muted)]">{study.summary}</p>
              <p className="mt-1.5 text-xs font-semibold text-[var(--ink)]">{study.outcomeTeaser}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function CaseGroup({ study }: { study: CaseStudy }) {
  const children = study.kind === "overview" ? getChildCases(study.slug) : [];

  return (
    <li>
      <ul className="flex flex-col gap-1.5">
        <CaseStackItem study={study} />
        {children.map((child) => (
          <CaseStackItem key={child.slug} study={child} nested />
        ))}
      </ul>
    </li>
  );
}

export function CaseList() {
  const topLevel = getWorkListEntries();

  return (
    <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] pb-16">
      <ul className="flex w-full max-w-md flex-col gap-3">
        {topLevel.map((study) => (
          <CaseGroup key={study.slug} study={study} />
        ))}
      </ul>
    </div>
  );
}
