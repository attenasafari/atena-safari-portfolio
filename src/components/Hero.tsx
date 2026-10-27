import { NameHighlight } from "@/components/NameHighlight";
import { typeDuration } from "@/lib/type-timing";
import { Keycap } from "@/components/Keycap";
import { KeycapCta } from "@/components/KeycapCta";
import { FloatingWidget } from "@/components/FloatingWidget";
import { site } from "@/data/site";

const portfolioLetters = "PORTFOLIO".split("");
const portfolioColors = [
  "var(--accent-coral)",
  "var(--accent-amber)",
  "var(--accent-lime)",
  "var(--accent-mint)",
  "var(--accent-sky)",
  "var(--accent-pink)",
  "var(--accent-coral)",
  "var(--accent-amber)",
  "var(--accent-lime)",
];

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] flex-col items-center justify-center px-[var(--page-pad)] pb-16 pt-4">
      <div className="relative z-[1] mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="font-[family-name:var(--font-fredoka)] text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
          Hi, I&apos;m <NameHighlight name={site.name} />
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">
          {site.role}. I ship service platforms with research, systems, and a little tactile joy.
        </p>

        <div
          className="mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
          aria-hidden
        >
          {portfolioLetters.map((letter, i) => (
            <Keycap
              key={`${letter}-${i}`}
              label={letter}
              color={portfolioColors[i]}
              press
              delayMs={typeDuration(site.name) + i * 420}
              size="row"
            />
          ))}
        </div>
        <p className="sr-only">Portfolio</p>

        <div className="mt-8 flex w-full justify-center">
          <KeycapCta href="/work" label="See the work" />
        </div>
        <div className="mt-8 flex w-full justify-center">
          <FloatingWidget
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
        </div>
      </div>
    </section>
  );
}
