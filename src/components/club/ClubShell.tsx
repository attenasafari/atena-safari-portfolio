"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeDialog, Toasts, Avatar } from "@/components/club/ui";
import { useClub } from "@/components/club/ClubProvider";
import { levelFromXp } from "@/club/xp";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/challenge", label: "Challenge" },
  { href: "/profile", label: "Profile" },
];

function clean(path: string) {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

function active(path: string, href: string) {
  const current = clean(path);
  return href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`);
}

export function ClubShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const focused = clean(pathname).startsWith("/play/");
  const club = useClub();

  return (
    <div className="club flex min-h-full flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-[1120px] flex-1 gap-8 px-4 md:px-6">
        {focused ? null : (
          <aside className="sticky top-0 hidden h-screen w-52 shrink-0 flex-col py-8 md:flex">
            <Link href="/" className="display text-3xl text-[var(--club-ink)] no-underline">
              Quiz Club
            </Link>
            <nav aria-label="Primary" className="mt-8 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active(pathname, link.href) ? "page" : undefined}
                  className={`rounded-2xl px-3 py-3 text-lg no-underline ${
                    active(pathname, link.href)
                      ? "bg-[var(--club-purple)] font-semibold text-white"
                      : "text-[var(--club-ink)] hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex items-center gap-3 pb-6">
              <Avatar trait={club.state.avatar} alt="" />
              <p className="text-sm leading-snug">
                <span className="block font-semibold">{club.state.name}</span>
                <span className="text-[var(--club-muted)]">Level {levelFromXp(club.state.xp)}</span>
              </p>
            </div>
          </aside>
        )}
        <div className={`min-w-0 flex-1 ${focused ? "pb-10" : "pb-28 md:pb-16"}`}>{children}</div>
      </div>
      {focused ? null : (
        <nav
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 z-30 border-t-0 bg-[var(--club-bg)] px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
        >
          <ul className="mx-auto grid max-w-md grid-cols-4 gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active(pathname, link.href) ? "page" : undefined}
                  className={`block rounded-2xl py-3 text-center text-sm font-semibold no-underline ${
                    active(pathname, link.href)
                      ? "bg-[var(--club-purple)] text-white"
                      : "text-[var(--club-ink)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Toasts />
      <BadgeDialog />
    </div>
  );
}
