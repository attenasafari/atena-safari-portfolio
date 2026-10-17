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
    slug: "moving-price-checkout",
    title: "Moving: price calculator & checkout",
    eyebrow: "Achareh · Moving service",
    company: "Achareh",
    role: "TBD — confirm with Atena",
    timeframe: "TBD",
    summary:
      "Goals for Achareh’s moving service (اسباب‌کشی): raise adoption of the price-calculated feature and cut checkout abandonment. Company assumed Achareh moving — confirm if another product. Numbers still TBD.",
    accent: "var(--accent-coral)",
    tags: ["Moving", "Pricing", "Checkout"],
    draftStatus: "draft",
    outcomeTeaser: "Adoption ↑ · abandonment ↓ — numbers TBD",
    metrics: [
      {
        label: "Price-calculated feature adoption",
        value: "↑ TBD",
        note: "Goal framing — no measured number yet",
      },
      {
        label: "Checkout abandonment",
        value: "↓ TBD",
        note: "Goal framing — baseline and post delta TBD",
      },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "On the moving (اسباب‌کشی) flow, the price-calculated experience was under-adopted and too many people left during checkout. Exact friction points, prior UI, and analytics proof are still TBD with Atena.",
        bullets: [
          "Price-calculated feature adoption too low (details TBD).",
          "Checkout abandonment too high (step / rate TBD).",
        ],
        status: "ready",
      },
      {
        id: "role",
        title: "Role",
        body: "Role, collaborators, and decision rights for this moving work are not captured yet. Resume notes Metabase-backed checkout drop-off work at Achareh in general — whether this moving case is that same effort is TBD.",
        status: "placeholder",
      },
      {
        id: "what-changed",
        title: "What changed",
        body: "Shipped changes TBD. Placeholder for the redesign directions once Atena describes what moved in pricing, calculator UX, and checkout.",
        bullets: [
          "Price calculator / price-calculated feature — changes TBD.",
          "Checkout flow — changes TBD.",
        ],
        status: "placeholder",
      },
      {
        id: "outcome",
        title: "Outcomes",
        body: "Stated goals only — do not treat as measured results until Atena provides numbers, definitions, and windows.",
        bullets: [
          "Increase price-calculated feature adoption — number TBD",
          "Reduce checkout abandonment rate — number TBD",
        ],
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
