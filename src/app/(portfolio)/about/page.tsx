import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { KeycapCta } from "@/components/KeycapCta";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Atena Safari — Product Design Lead across marketplaces and fintech.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" description={site.summary} />
      <div className="mx-auto grid w-full max-w-[var(--content-max)] gap-8 px-[var(--page-pad)] pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-4">
          <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold">
            Experience
          </h2>
          <ul className="space-y-4">
            {site.experience.map((job) => (
              <li
                key={`${job.company}-${job.role}`}
                className="rounded-[1.5rem] border-[2px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold">
                    {job.company}
                  </h3>
                  <span className="text-sm text-[var(--ink-soft)]">{job.dates}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[var(--ink-muted)]">{job.role}</p>
                <p className="mt-3 text-[var(--ink-muted)]">{job.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-float)]">
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold">
              Focus areas
            </h2>
            <ul className="mt-4 space-y-3">
              {site.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-start gap-3 text-[var(--ink-muted)]"
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-3 w-3 shrink-0 rounded-[0.35rem] bg-[var(--accent-coral)] shadow-[2px_2px_0_rgba(26,26,26,0.2)]"
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.5rem] border-[2px] border-[var(--line)] bg-white/60 p-6">
            <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold">
              Mentoring
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
              Open to mentoring on product design craft — book time on ADPList.
            </p>
            <a
              href={site.links.adplist}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-[1rem] bg-[var(--accent-pink-soft)] px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[inset_0_0_0_2px_rgba(255,143,184,0.55)] transition-transform hover:-translate-y-0.5"
            >
              ADPList profile →
            </a>
          </section>

          <div className="pt-2">
            <KeycapCta href="/contact" label="Say hello" />
          </div>
          <p className="text-sm text-[var(--ink-soft)]">
            Prefer LinkedIn?{" "}
            <Link
              href={site.links.linkedin}
              className="font-medium text-[var(--ink)] underline decoration-[var(--accent-pink)] underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect there
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  );
}
