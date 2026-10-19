"use client";

import { useEffect, useState } from "react";
import { TYPE_INTERVAL_MS, TYPE_START_MS } from "@/lib/type-timing";

type NameHighlightProps = {
  name: string;
};

export function NameHighlight({ name }: NameHighlightProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let shown = 0;
    let tick = 0;
    const start = window.setTimeout(() => {
      tick = window.setInterval(() => {
        shown += 1;
        setCount(shown);
        if (shown >= name.length) window.clearInterval(tick);
      }, TYPE_INTERVAL_MS);
    }, TYPE_START_MS);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(tick);
    };
  }, [name]);

  const shown = name.slice(0, count);
  const typing = count < name.length;

  return (
    <>
      <span className="sr-only">{name}</span>
      <span className="name-still relative inline-block px-3 py-1 align-bottom" aria-hidden>
        <span
          aria-hidden
          className="absolute inset-0 -rotate-1 rounded-[1.1rem] bg-[var(--accent-pink-soft)] shadow-[inset_0_0_0_2px_rgba(255,143,184,0.55)]"
        />
        <span className="relative font-[family-name:var(--font-fredoka)] font-semibold">
          {name}
        </span>
      </span>
      <span
        className="name-typed relative inline-block px-3 py-1 align-bottom"
        aria-hidden
      >
        <span
          aria-hidden
          className="absolute inset-0 -rotate-1 rounded-[1.1rem] bg-[var(--accent-pink-soft)] shadow-[inset_0_0_0_2px_rgba(255,143,184,0.55)]"
        />
        <span className="relative font-[family-name:var(--font-fredoka)] font-semibold">
          {shown}
          {typing ? <span className="type-caret" /> : null}
          {shown.length === 0 ? <span className="inline-block w-[1ch]" /> : null}
        </span>
      </span>
    </>
  );
}
