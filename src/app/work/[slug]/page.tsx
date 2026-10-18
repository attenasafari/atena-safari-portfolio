import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseVisuals } from "@/components/CaseVisuals";
import { MessagingTone } from "@/components/MessagingTone";
import {
  caseStudies,
  getCaseBySlug,
  getChildCases,
  getSiblingCases,
} from "@/data/cases";

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

  const children = study.kind === "overview" ? getChildCases(study.slug) : [];
  const siblings = getSiblingCases(study);
  const parent = study.parentSlug ? getCaseBySlug(study.parentSlug) : null;
  const heroVisual = study.visuals?.[1] ?? study.visuals?.[0];

  const topLevel = caseStudies.filter((c) => !c.parentSlug);
  const index = topLevel.findIndex((c) => c.slug === study.slug);
  const prev =
    !study.parentSlug && index > 0
      ? topLevel[index - 1]
      : parent
        ? null
        : null;
  const next =
    !study.parentSlug && index < topLevel.length - 1
      ? topLevel[index + 1]
      : null;

  return (
    <article className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] pb-20 pt-6">
      <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--ink-muted)]">
        <Link href="/work" className="transition-colors hover:text-[var(--ink)]">
          ← All work
        </Link>
        {parent ? (
          <>
            <span aria-hidden>/</span>
            <Link
              href={`/work/${parent.slug}`}
              className="transition-colors hover:text-[var(--ink)]"
            >
              {parent.title}
            </Link>
          </>
        ) : null}
      </div>

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

        {heroVisual ? (
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)]">
            <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div
                className="flex flex-col justify-between gap-6 p-6 sm:p-8"
                style={{
                  background: `linear-gradient(135deg, ${study.accent}, color-mix(in srgb, ${study.accent} 40%, white))`,
                }}
              >
                <div>
                  <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink)]">
                    {heroVisual.label}
                  </p>
                  <p className="mt-3 max-w-md text-lg font-medium leading-snug text-[var(--ink)]">
                    {heroVisual.caption}
                  </p>
                </div>
                <span className="w-fit rounded-[1rem] bg-white/90 px-3 py-2 text-sm font-semibold text-[var(--ink)]">
                  {study.outcomeTeaser}
                </span>
              </div>
              <div className="flex items-end justify-center bg-[linear-gradient(180deg,#eef8f6,#f7f4ee)] px-6 pt-6">
                <div className="w-full max-w-[14rem] overflow-hidden rounded-t-[1.35rem] border-x-2 border-t-2 border-[var(--ink)] bg-white shadow-[var(--shadow-key)]">
                  <Image
                    src={heroVisual.src}
                    alt={heroVisual.alt}
                    width={heroVisual.width}
                    height={heroVisual.height}
                    className="h-auto w-full"
                    sizes="224px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        ) : study.kind === "overview" ? (
          <div
            className="mt-8 overflow-hidden rounded-[1.75rem] border-[2.5px] border-[var(--ink)] p-6 sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${study.accent}, color-mix(in srgb, ${study.accent} 40%, white))`,
            }}
          >
            <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold uppercase tracking-[0.14em]">
              Case series
            </p>
            <p className="mt-3 max-w-xl text-lg font-medium leading-snug">
              {study.outcomeTeaser}
            </p>
          </div>
        ) : null}
      </header>

      {study.metrics && study.metrics.length > 0 ? (
        <section aria-label="Outcomes" className="mt-10">
          <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold">
            Outcomes
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {study.metrics.map((metric) => (
              <li
                key={metric.label}
                className="rounded-[1.35rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-soft)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                  {metric.label}
                </p>
                <p className="mt-2 font-[family-name:var(--font-fredoka)] text-2xl font-semibold tracking-tight">
                  {metric.value}
                </p>
              </li>
            ))}
          </ul>

          {study.adoptionTable ? (
            <div className="mt-6 overflow-hidden rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)]">
              <div className="border-b-2 border-[var(--ink)] px-4 py-3">
                <p className="font-[family-name:var(--font-fredoka)] text-base font-semibold">
                  Feature adoption
                </p>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">
                  {study.adoptionTable.caption}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[20rem] text-left text-sm">
                  <thead className="bg-black/[0.03] text-xs uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Feature</th>
                      <th className="px-4 py-3 font-semibold">Before</th>
                      <th className="px-4 py-3 font-semibold">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {study.adoptionTable.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-t border-[var(--line)] text-[var(--ink-muted)]"
                      >
                        <td className="px-4 py-2.5 font-medium text-[var(--ink)]">
                          {row.feature}
                        </td>
                        <td className="px-4 py-2.5">{row.before}</td>
                        <td className="px-4 py-2.5 font-[family-name:var(--font-fredoka)] font-semibold text-[var(--ink)]">
                          {row.after}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {study.visuals && study.visuals.length > 0 ? (
        <CaseVisuals
          visuals={study.visuals}
          caption={study.visualsNote}
          title={study.visualsTitle ?? "Visuals"}
        />
      ) : null}

      {study.messaging ? <MessagingTone chapter={study.messaging} /> : null}

      {children.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold sm:text-2xl">
            Cases in this series
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {children.map((child) => (
              <li key={child.slug}>
                <Link
                  href={`/work/${child.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
                >
                  <span
                    className="inline-flex w-fit rounded-[0.85rem] px-3 py-1 font-[family-name:var(--font-fredoka)] text-sm font-semibold"
                    style={{ backgroundColor: child.accent }}
                  >
                    {child.title.split("—")[0].trim()}
                  </span>
                  <p className="mt-3 font-[family-name:var(--font-fredoka)] text-xl font-semibold">
                    {child.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {child.summary}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-[var(--ink)] transition-transform group-hover:translate-x-1">
                    Open case ↵
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div className="space-y-6">
          {study.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-[1.5rem] border-[2px] border-[var(--line)] bg-[var(--bg-elevated)]/80 p-6 sm:p-8"
            >
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold">
                {section.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-[var(--ink-muted)]">
                {section.body}
              </p>
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="mt-4 max-w-3xl space-y-2">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[var(--ink-muted)]"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-[0.3rem] bg-[var(--accent-sky)] shadow-[2px_2px_0_rgba(26,26,26,0.18)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="h-fit rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] lg:sticky lg:top-6">
          <p className="font-[family-name:var(--font-fredoka)] text-lg font-semibold">
            In this case
          </p>
          <ol className="mt-4 space-y-2 text-sm">
            {study.visuals && study.visuals.length > 0 ? (
              <li>
                <a href="#visuals" className="text-[var(--ink-muted)] hover:text-[var(--ink)]">
                  Visuals
                </a>
              </li>
            ) : null}
            {study.messaging ? (
              <li>
                <a
                  href="#messaging-tone"
                  className="text-[var(--ink-muted)] hover:text-[var(--ink)]"
                >
                  Messaging & tone
                </a>
              </li>
            ) : null}
            {study.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[var(--ink-muted)] hover:text-[var(--ink)]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
          {siblings.length > 0 ? (
            <div className="mt-6 border-t border-[var(--line)] pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                Also in Achareh Expert
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                {siblings.map((sib) => (
                  <li key={sib.slug}>
                    <Link
                      href={`/work/${sib.slug}`}
                      className="font-medium text-[var(--ink)] hover:underline"
                    >
                      {sib.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      {(prev || next) && (
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
      )}
    </article>
  );
}
