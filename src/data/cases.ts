export type CaseSection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  status: "ready" | "placeholder";
};

export type CaseMetric = {
  label: string;
  value: string;
  note?: string;
};

export type CaseVisual = {
  src: string;
  label: string;
  state?: string;
  caption: string;
  alt: string;
  badgeColor: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  company: string;
  role: string;
  timeframe: string;
  summary: string;
  accent: string;
  tags: string[];
  featured?: boolean;
  /** Drafted from discovery vs waiting on Atena */
  draftStatus: "draft" | "coming-soon";
  outcomeTeaser: string;
  metrics?: CaseMetric[];
  visuals?: CaseVisual[];
  visualsNote?: string;
  sections: CaseSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "achareh-customer-home",
    title: "Find, book, manage — customer home",
    eyebrow: "Achareh · Client home",
    company: "Achareh",
    role: "Senior product designer",
    timeframe: "2023 – Present",
    summary:
      "Redesigning Achareh’s customer home so people could find orders, set the right city, and get from search into add-order without hunting. Now live in production.",
    accent: "var(--accent-sky)",
    tags: ["Marketplace", "Home redesign", "Live"],
    featured: true,
    draftStatus: "draft",
    outcomeTeaser: "Search usage +80% · bounce −10%",
    metrics: [
      {
        label: "Search bar usage",
        value: "+80%",
        note: "As stated by Atena — definition / baseline TBD",
      },
      {
        label: "Time to find a service",
        value: "−1 minute",
        note: "As stated by Atena — baseline TBD",
      },
      {
        label: "Bounce rate",
        value: "−10%",
        note: "As stated by Atena — window / platform TBD",
      },
      {
        label: "Order management",
        value: "From first page",
        note: "Qualitative outcome she reported",
      },
    ],
    visualsNote:
      "Live product screens from Achareh’s customer home. Before = prior home; After frames = current production UI (Atena confirmed the redesign is live).",
    visuals: [
      {
        src: "/cases/achareh-customer-home/before-home.png",
        label: "Before",
        state: "Prior home",
        caption:
          "Compact top search and city (“”); category grid and promo carousel. No bottom nav, no My Orders entry, and no order-status UI on home.",
        alt: "Achareh customer home before redesign — compact search bar and category grid without bottom navigation",
        badgeColor: "var(--accent-amber)",
        width: 446,
        height: 918,
      },
      {
        src: "/cases/achareh-customer-home/after-home-categories.png",
        label: "After — home",
        state: "Live now",
        caption:
          "Teal hero with city + search as the primary control; category grid below; bottom nav including My Orders so orders are findable from the first page.",
        alt: "Achareh customer home after redesign — teal hero with city and search, categories, and My Orders in bottom nav",
        badgeColor: "var(--accent-mint)",
        width: 750,
        height: 2366,
      },
      {
        src: "/cases/achareh-customer-home/after-order-status-modal.png",
        label: "After — order modal",
        state: "Live now",
        caption:
          "Order status on home — recent orders with progress, actions (e.g. rate the expert), and pro details, without leaving the first page.",
        alt: "Achareh customer home order status modal showing completed luxury cleaning order and expert rating prompt",
        badgeColor: "var(--accent-sky)",
        width: 375,
        height: 801,
      },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "On Achareh’s customer (client) home — a marketplace for home services where city changes which services are available and what they cost — three frictions stacked on top of each other.",
        bullets: [
          "Users couldn’t find their orders.",
          "City and search weren’t findable on the home experience.",
          "Search didn’t get people into add-order fast enough.",
        ],
        status: "ready",
      },
      {
        id: "role",
        title: "Role",
        body: "Senior product designer on the customer home redesign. Collaborators, decision rights, and who owned analytics vs design are still open follow-ups — this draft only claims the role Atena named.",
        status: "ready",
      },
      {
        id: "process",
        title: "Process",
        body: "Coming soon. Research methods, the insights behind city-first and the order modal, and any A/B or rollout detail still need to be captured with Atena.",
        status: "placeholder",
      },
      {
        id: "decisions",
        title: "Decisions",
        body: "Four shipped directions she described — visible in the live after screens. Deeper tradeoffs (for example, modal vs a full orders page) are still TBD.",
        bullets: [
          "Button navigation, including My Orders in the bottom nav.",
          "Ask for city first — services and pricing differ by city; city sits with search in the hero (“Teh.”).",
          "Search as the main hero action so people move into add-order faster.",
          "Current order status on home (modal / stacked cards) for recent orders — status, main actions, pro data.",
        ],
        status: "ready",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "Results as Atena stated them. Measurement definitions, baselines, platforms, and time windows are not confirmed yet — numbers below are her wording, not independently verified analytics.",
        bullets: [
          "Search bar usage +80%",
          "Time-to-find-service −1 minute",
          "Bounce rate −10%",
          "Orders manageable from the first page",
        ],
        status: "ready",
      },
      {
        id: "reflection",
        title: "Reflection",
        body: "Coming soon — what she’d revisit, and what she wants viewers to notice, once process notes are in.",
        status: "placeholder",
      },
    ],
  },
  {
    slug: "achareh-my-desk",
    title: "My Desk & expert scheduling",
    eyebrow: "Achareh · Expert platform",
    company: "Achareh",
    role: "Product Design Lead",
    timeframe: "2023 – Present",
    summary:
      "Expert-side My Desk and scheduling calendar — resume notes an analytics-led usage lift. Full case study coming soon.",
    accent: "var(--accent-coral)",
    tags: ["Marketplace", "Expert tools", "Coming soon"],
    draftStatus: "coming-soon",
    outcomeTeaser: "Coming soon",
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "Coming soon. Resume points to Metabase-guided work on the expert scheduling calendar and My Desk application page — story still to interview with Atena.",
        status: "placeholder",
      },
      {
        id: "role",
        title: "Role",
        body: "Product Design Lead at Achareh. Scope and collaborators TBD.",
        status: "placeholder",
      },
      {
        id: "process",
        title: "Process",
        body: "Coming soon.",
        status: "placeholder",
      },
      {
        id: "decisions",
        title: "Decisions",
        body: "Coming soon.",
        status: "placeholder",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "Resume mentions an 80% increase in feature usage for My Desk / scheduling. Kept off this page as a published outcome until Atena confirms the story (and that it is distinct from the customer-home search +80%).",
        status: "placeholder",
      },
      {
        id: "reflection",
        title: "Reflection",
        body: "Coming soon.",
        status: "placeholder",
      },
    ],
  },
  {
    slug: "780-fintech-suite",
    title: "Ten financial services in six months",
    eyebrow: "780.ir · Fintech",
    company: "780.ir",
    role: "Senior Product Designer",
    timeframe: "Apr 2022 – Apr 2023",
    summary:
      "Ten financial services and a Figma design system under a tight timeline. Case draft coming soon — no discovery answers yet.",
    accent: "var(--accent-lime)",
    tags: ["Fintech", "Design system", "Coming soon"],
    draftStatus: "coming-soon",
    outcomeTeaser: "Coming soon",
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "Coming soon.",
        status: "placeholder",
      },
      {
        id: "role",
        title: "Role",
        body: "Senior Product Designer. Resume: led design of ten financial services; structured design system in Figma.",
        status: "ready",
      },
      {
        id: "process",
        title: "Process",
        body: "Coming soon.",
        status: "placeholder",
      },
      {
        id: "decisions",
        title: "Decisions",
        body: "Coming soon.",
        status: "placeholder",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "Coming soon. Resume scope only: ten services on a ~6-month timeline. No numeric KPIs from discovery yet.",
        status: "placeholder",
      },
      {
        id: "reflection",
        title: "Reflection",
        body: "Coming soon.",
        status: "placeholder",
      },
    ],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getFeaturedCase(): CaseStudy {
  return caseStudies.find((c) => c.featured) ?? caseStudies[0];
}
