import Link from "next/link";

type KeycapCtaProps = {
  href: string;
  label: string;
  className?: string;
};

export function KeycapCta({ href, label, className = "" }: KeycapCtaProps) {
  return (
    <Link
      href={href}
      className={`animate-cta-pulse group relative inline-flex h-[3.75rem] w-full max-w-md items-center justify-between gap-4 rounded-[1.35rem] bg-[var(--accent-ink)] px-7 text-white shadow-[var(--shadow-key)] transition-[transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-press)] hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(26,26,26,0.35),0_18px_32px_rgba(26,26,26,0.18)] active:translate-y-1 active:shadow-[var(--shadow-key-pressed)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[3px] rounded-[1.15rem] bg-gradient-to-b from-white/18 to-transparent"
      />
      <span className="relative z-[1] font-[family-name:var(--font-fredoka)] text-lg font-semibold tracking-wide text-white sm:text-xl">
        {label}
      </span>
      <span
        aria-hidden
        className="relative z-[1] flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-xl transition-transform duration-200 group-hover:translate-x-0.5"
      >
        ↵
      </span>
    </Link>
  );
}
