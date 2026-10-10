type NameHighlightProps = {
  name: string;
};

export function NameHighlight({ name }: NameHighlightProps) {
  return (
    <span className="relative inline-block px-3 py-1">
      <span
        aria-hidden
        className="absolute inset-0 -rotate-1 rounded-[1.1rem] bg-[var(--accent-pink-soft)] shadow-[inset_0_0_0_2px_rgba(255,143,184,0.55)]"
      />
      <span className="relative font-[family-name:var(--font-fredoka)] font-semibold">
        {name}
      </span>
    </span>
  );
}
