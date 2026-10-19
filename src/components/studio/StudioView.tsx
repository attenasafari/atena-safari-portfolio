"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { site } from "@/data/site";
import { studioLedger, studioScreens, type StudioPiece } from "./studio-data";

const links = [
  { href: "/home-2", label: "Home 2" },
  { href: "/work-2", label: "Work 2" },
  { href: "/about-2", label: "About 2" },
  { href: "/contact-2", label: "Contact 2" },
];

function samePath(pathname: string, href: string) {
  const current = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  return current === target;
}

function Still({ piece }: { piece: StudioPiece }) {
  if (!piece.src) {
    return (
      <div className="still-frame" aria-hidden>
        <p className="support" style={{ padding: "2rem" }}>
          {piece.title}
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="still-frame">
        <img src={piece.src} alt={piece.alt} />
      </div>
      <p className="still-caption">{piece.title}</p>
    </>
  );
}

function Nav() {
  const pathname = usePathname();
  return (
    <nav className="studio-nav" aria-label="Redesigned pages">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={samePath(pathname, item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
      <Link href="/contact-2" data-action>
        Write
      </Link>
    </nav>
  );
}

function Foot() {
  return (
    <footer className="studio-foot">
      <span>Product design lead</span>
      <Link href="/">Original site</Link>
      <Link href="/work-2">Work 2</Link>
      <Link href="/about-2">About 2</Link>
      <span>2026</span>
    </footer>
  );
}

function ScreenBand({ pieces }: { pieces: StudioPiece[] }) {
  return (
    <section aria-labelledby="screens-heading">
      <h2 id="screens-heading">Shipped screens</h2>
      <div className="screen-band">
        {pieces.slice(0, 3).map((piece) =>
          piece.src ? (
            <figure key={piece.slug}>
              <img src={piece.src} alt={piece.alt} />
              <figcaption>{piece.title}</figcaption>
            </figure>
          ) : null,
        )}
      </div>
    </section>
  );
}

export function StudioView({
  page,
}: {
  page: "home" | "work" | "about" | "contact";
}) {
  const screens = useMemo(() => studioScreens(), []);
  const ledger = useMemo(() => studioLedger(), []);
  const [slug, setSlug] = useState(screens[0]?.slug ?? "");
  const active = screens.find((item) => item.slug === slug) ?? screens[0];

  return (
    <div className="stage">
      <aside className="stage-still">
        {active ? <Still piece={active} /> : null}
      </aside>
      <div className="stage-read">
        <Nav />
        {page === "home" ? (
          <Home
            screens={screens}
            slug={slug}
            onPick={setSlug}
            active={active}
          />
        ) : null}
        {page === "work" ? (
          <Work ledger={ledger} slug={slug} onPick={setSlug} />
        ) : null}
        {page === "about" ? <About screens={screens} /> : null}
        {page === "contact" ? <Contact screens={screens} /> : null}
        <Foot />
      </div>
    </div>
  );
}

function Home({
  screens,
  slug,
  onPick,
  active,
}: {
  screens: StudioPiece[];
  slug: string;
  onPick: (slug: string) => void;
  active: StudioPiece | undefined;
}) {
  return (
    <>
      <header className="hero-copy">
        <p className="support rise">Product design lead for marketplaces and fintech.</p>
        <h1 className="monument">atena safari</h1>
        <Link className="action" href="/work-2">
          See the work
        </Link>
      </header>
      <section className="rise">
        <h2>Shipped with</h2>
        <div className="shipped">
          <p>The companies in the work.</p>
          {site.experience.map((job) => (
            <strong key={job.company}>{job.company}</strong>
          ))}
        </div>
      </section>
      <section>
        <h2 className="rise">The cases</h2>
        <div className="case-switch" role="listbox" aria-label="Cases">
          {screens.map((piece) => (
            <button
              key={piece.slug}
              type="button"
              aria-pressed={piece.slug === slug}
              onClick={() => onPick(piece.slug)}
            >
              {piece.title}
            </button>
          ))}
        </div>
        {active ? (
          <>
            <p className="outcome">{active.summary}</p>
            <p className="outcome">{active.outcome}</p>
            <p className="note">
              Data shown is mock and results are shown as percentages due to NDA.
            </p>
            <Link className="action" href={`/work/${active.slug}`}>
              Open this case
            </Link>
          </>
        ) : null}
      </section>
      <ScreenBand pieces={screens} />
      <section className="close">
        <h2>Read the work</h2>
        <p>Read the cases, or write to Atena directly.</p>
        <Link className="action" href="/work-2">
          Open Work 2
        </Link>
      </section>
    </>
  );
}

function Work({
  ledger,
  slug,
  onPick,
}: {
  ledger: StudioPiece[];
  slug: string;
  onPick: (slug: string) => void;
}) {
  return (
    <>
      <header className="hero-copy">
        <p className="support">Five stories from the shipped work.</p>
        <h1 className="monument">the work</h1>
      </header>
      <section>
        <h2>Selected work</h2>
        <div className="ledger">
          {ledger.map((piece) => (
            <button
              key={piece.slug}
              type="button"
              className="row"
              aria-pressed={piece.slug === slug}
              onClick={() => onPick(piece.slug)}
            >
              <span className="name">{piece.title}</span>
              <span className="kind">{piece.kind}</span>
              <span className="when">{piece.when}</span>
            </button>
          ))}
        </div>
        <p className="note">
          Data shown is mock and results are shown as percentages due to NDA.
        </p>
        <Link className="action" href={slug ? `/work/${slug}` : "/work"}>
          Open the full case
        </Link>
      </section>
      <ScreenBand pieces={ledger.filter((piece) => piece.src)} />
    </>
  );
}

function About({ screens }: { screens: StudioPiece[] }) {
  return (
    <>
      <header className="hero-copy">
        <p className="support">Ten years from research to shipped features.</p>
        <h1 className="monument">about</h1>
      </header>
      <section className="letter">
        <h2>A letter</h2>
        <p>I lead product design for marketplaces and fintech, from research to systems to shipped features.</p>
        <p>
          For ten years I have driven end-to-end UX across fintech, marketplace, and service
          platforms: design systems, research, data, and mentoring.
        </p>
        <p>
          At Achareh I lead design across the client and expert platforms. Before that I led design
          for ten financial services at 780.ir, and brand and product systems at AGAPE-NGO, where a
          key experience went from 64 seconds to 12 minutes of engagement.
        </p>
        <p>I am open to mentoring on product design craft.</p>
        <p className="sign">Atena Safari</p>
        <p className="role">Product Design Lead</p>
        <Link className="action" href="/contact-2">
          Write to Atena
        </Link>
      </section>
      <ScreenBand pieces={screens} />
    </>
  );
}

function Contact({ screens }: { screens: StudioPiece[] }) {
  return (
    <>
      <header className="hero-copy">
        <p className="support">Collaborations, mentorship, or a design leadership chat.</p>
        <h1 className="monument">contact</h1>
      </header>
      <section>
        <h2 className="prompt">
          <span>Write a note.</span>
          It opens in your mail.
        </h2>
        <form
          className="write-form"
          action={`mailto:${site.email}`}
          method="post"
          encType="text/plain"
        >
          <label className="sr-only" htmlFor="note">
            Your note
          </label>
          <input id="note" name="body" placeholder="A short note" />
          <button type="submit">Send</button>
        </form>
        <p className="note">The note opens in your email app, addressed to Atena.</p>
        <ul className="channels">
          <li>
            <a href={`mailto:${site.email}`}>
              <span>Email</span>
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              linkedin.com/in/attena-safari
            </a>
          </li>
          <li>
            <a href={site.links.adplist} target="_blank" rel="noopener noreferrer">
              <span>ADPList</span>
              adplist.org/mentors/atena-safari
            </a>
          </li>
        </ul>
      </section>
      <ScreenBand pieces={screens} />
    </>
  );
}
