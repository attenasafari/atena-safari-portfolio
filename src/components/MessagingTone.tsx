import type { MessagingChapter } from "@/data/cases";

type MessagingToneProps = {
  chapter: MessagingChapter;
};

export function MessagingTone({ chapter }: MessagingToneProps) {
  return (
    <section
      id="messaging-tone"
      aria-labelledby="messaging-tone-heading"
      className="mt-10 space-y-6"
    >
      <div>
        <h2
          id="messaging-tone-heading"
          className="font-[family-name:var(--font-fredoka)] text-xl font-semibold sm:text-2xl"
        >
          Messaging & tone
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-[var(--ink-muted)]">
          {chapter.intro}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border-[2px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold">
            Method
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--ink-muted)]">
            {chapter.method.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-[0.3rem] bg-[var(--accent-coral)] shadow-[2px_2px_0_rgba(26,26,26,0.18)]"
                />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.5rem] border-[2px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold">
            Design principles
          </h3>
          <ol className="mt-3 space-y-3">
            {chapter.principles.map((p, i) => (
              <li key={p.title} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent-mint)] font-[family-name:var(--font-fredoka)] text-xs font-semibold text-[var(--ink)] shadow-[2px_2px_0_rgba(26,26,26,0.15)]"
                >
                  {i + 1}
                </span>
                <span>
                  <span className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-[var(--ink)]">
                    {p.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-[var(--ink-muted)]">
                    {p.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold">
          Before → after copy
        </h3>
        {chapter.examplesNote ? (
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{chapter.examplesNote}</p>
        ) : null}
        <ul className="mt-4 grid gap-4">
          {chapter.examples.map((ex) => (
            <li
              key={ex.label}
              className="overflow-hidden rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)]"
            >
              <div className="border-b-2 border-[var(--ink)] px-4 py-3">
                <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold">
                  {ex.label}
                </p>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-[var(--line)] p-4 sm:border-b-0 sm:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                    Before
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                    “{ex.before}”
                  </p>
                </div>
                <div className="bg-[color-mix(in_srgb,var(--accent-mint)_18%,white)] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                    After
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--ink)]">
                    “{ex.after}”
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
