import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] py-10">
      <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-[family-name:var(--font-fredoka)] text-base font-semibold">
          {site.name}
          <span className="ml-2 text-sm font-normal text-[var(--ink-muted)]">
            {site.role}
          </span>
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-[var(--ink-muted)]">
          <Link href="/work" className="hover:text-[var(--ink)]">
            Work
          </Link>
          <Link href="/contact" className="hover:text-[var(--ink)]">
            Contact
          </Link>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)]"
          >
            LinkedIn
          </a>
          <a
            href={site.links.adplist}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)]"
          >
            ADPList
          </a>
        </div>
      </div>
    </footer>
  );
}
