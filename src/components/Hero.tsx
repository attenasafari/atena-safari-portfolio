import { NameHighlight } from "@/components/NameHighlight";
import { Keycap } from "@/components/Keycap";
import { KeycapCta } from "@/components/KeycapCta";
import { FloatingWidget } from "@/components/FloatingWidget";
import { getFeaturedCase } from "@/data/cases";
import { site } from "@/data/site";

const brandKeys = [
  { letter: "A", color: "var(--accent-coral)" },
  { letter: "T", color: "var(--accent-amber)" },
  { letter: "E", color: "var(--accent-lime)" },
  { letter: "N", color: "var(--accent-mint)" },
  { letter: "A", color: "var(--accent-sky)" },
] as const;

export function Hero() {
  const featured = getFeaturedCase();

  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] flex-col items-center justify-center px-[var(--page-pad)] pb-16 pt-4">
      <FloatingWidget
        side="left"
        href={`/work/${featured.slug}`}
        title={featured.title}
        meta="Featured case"
        accent="var(--accent-sky)"
        delayClass="animate-float"
        icon={
          <div className="flex w-full items-end justify-between gap-2 text-[var(--ink)]">
            <span className="font-[family-name:var(--font-fredoka)] text-xs font-semibold opacity-80">
              Desk
            </span>
            <span className="rounded-lg bg-white/85 px-2 py-1 text-[10px] font-bold">
              +80%
            </span>
          </div>
        }
      />
      <FloatingWidget
        side="right"
        href="/about"
        title="About Atena"
        meta="10 yrs · Lead"
        accent="var(--accent-pink-soft)"
        delayClass="animate-float-delayed"
        icon={
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink)] font-[family-name:var(--font-fredoka)] text-sm font-semibold text-white">
              AS
            </span>
            <span className="rounded-md bg-white/80 px-2 py-1 text-[10px] font-semibold text-[var(--ink)]">
              Mentor
            </span>
          </div>
        }
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="font-[family-name:var(--font-fredoka)] text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Hi, I&apos;m <NameHighlight name={site.name} />
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">
          {site.role}. I ship service platforms with research, systems, and a little tactile joy.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          aria-label="Atena brand keycaps"
        >
          {brandKeys.map((key, i) => (
            <Keycap
              key={`${key.letter}-${i}`}
              label={key.letter}
              color={key.color}
              delayMs={80 + i * 70}
              size="lg"
            />
          ))}
        </div>

        <div className="mt-8 flex w-full justify-center">
          <KeycapCta href="/work" label="See the work" />
        </div>
      </div>
    </section>
  );
}
