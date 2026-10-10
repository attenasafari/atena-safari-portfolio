import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseBySlug } from "@/data/cases";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) return { title: "Case study" };
  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const prev = index > 0 ? caseStudies[index - 1] : null;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : null;

  return (
    <article className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] pb-20 pt-6">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
      >
        ← All work
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
          {study.eyebrow}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-fredoka)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {study.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">{study.summary}</p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Company", value: study.company },
            { label: "Role", value: study.role },
            { label: "When", value: study.timeframe },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border-[2px] border-[var(--ink)] bg-[var(--bg-elevated)] px-4 py-3"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                {item.label}
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-fredoka)] text-base font-semibold">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div
          className="mt-8 h-36 overflow-hidden rounded-[1.75rem] border-[2.5px] border-[var(--ink)] shadow-[var(--shadow-soft)] sm:h-48"
          style={{
            background: `linear-gradient(135deg, ${study.accent}, color-mix(in srgb, ${study.accent} 35%, white))`,
          }}
          aria-hidden
        >
          <div className="flex h-full items-end justify-between p-6">
            <span className="rounded-[1rem] bg-[var(--ink)] px-4 py-2 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-white">
              Visuals coming soon
            </span>
            <span className="rounded-[1rem] bg-white/85 px-3 py-2 text-sm font-semibold text-[var(--ink)]">
              {study.outcomeTeaser}
            </span>
          </div>
        </div>
      </header>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div className="space-y-6">
          {study.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-[1.5rem] border-[2px] border-[var(--line)] bg-[var(--bg-elevated)]/80 p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold">
                  {section.title}
                </h2>
                {section.status === "placeholder" && (
                  <span className="rounded-[var(--radius-pill)] border border-dashed border-[var(--ink-soft)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                    Skeleton
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-3xl leading-relaxed text-[var(--ink-muted)]">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <aside className="h-fit rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] lg:sticky lg:top-6">
          <p className="font-[family-name:var(--font-fredoka)] text-lg font-semibold">
            In this case
          </p>
          <ol className="mt-4 space-y-2 text-sm">
            {study.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-relaxed text-[var(--ink-soft)]">
            Bodies stay skeleton until metrics, process, and showable assets are confirmed with
            Atena.
          </p>
        </aside>
      </div>

      <nav
        aria-label="Adjacent cases"
        className="mt-14 flex flex-col gap-3 border-t border-[var(--line)] pt-8 sm:flex-row sm:justify-between"
      >
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="rounded-[1.25rem] border-[2px] border-[var(--ink)] bg-white/70 px-5 py-4 transition-transform hover:-translate-y-0.5"
          >
            <span className="block text-xs uppercase tracking-wider text-[var(--ink-soft)]">
              Previous
            </span>
            <span className="font-[family-name:var(--font-fredoka)] font-semibold">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="rounded-[1.25rem] border-[2px] border-[var(--ink)] bg-white/70 px-5 py-4 text-right transition-transform hover:-translate-y-0.5"
          >
            <span className="block text-xs uppercase tracking-wider text-[var(--ink-soft)]">
              Next
            </span>
            <span className="font-[family-name:var(--font-fredoka)] font-semibold">
              {next.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
