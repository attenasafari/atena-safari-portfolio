"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-[var(--content-max)] items-center justify-between gap-4 px-[var(--page-pad)] py-5">
      <Link
        href="/"
        className="font-[family-name:var(--font-fredoka)] text-lg font-semibold tracking-tight text-[var(--ink)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        {site.name}
      </Link>
      <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
        {site.nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a] ${
                active
                  ? "nav-active"
                  : "text-[#3f3d3a] hover:bg-black/10 hover:text-[#1a1a1a]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
