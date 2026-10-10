import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Atena Safari — email, LinkedIn, ADPList.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="For collaborations, mentorship, or design leadership chats — reach out directly."
      />
      <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] pb-20">
        <ul className="grid max-w-2xl gap-4">
          {[
            {
              label: "Email",
              value: site.email,
              href: `mailto:${site.email}`,
              accent: "var(--accent-coral)",
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/attena-safari",
              href: site.links.linkedin,
              accent: "var(--accent-sky)",
            },
            {
              label: "ADPList",
              value: "adplist.org/mentors/atena-safari",
              href: site.links.adplist,
              accent: "var(--accent-lime)",
            },
            {
              label: "Phone",
              value: site.phone,
              href: `tel:${site.phone.replace(/\s/g, "")}`,
              accent: "var(--accent-amber)",
            },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-[1.5rem] border-[2.5px] border-[var(--ink)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] font-[family-name:var(--font-fredoka)] text-lg font-semibold shadow-[var(--shadow-key)] transition-transform group-hover:-translate-y-0.5 group-active:translate-y-1"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden
                >
                  ↵
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-fredoka)] text-xl font-semibold">
                    {item.value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
