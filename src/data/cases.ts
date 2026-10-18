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
    title: "See the price first — moving calculator",
    eyebrow: "Achareh · Moving · Web",
    company: "Achareh",
    role: "Product designer",
    timeframe: "Customer · web",
    summary:
      "On Achareh’s moving service, a huge drop-off sat between checkout and submit while people hunted for price. A calculator helped — until it felt like a huge form. Realtime price brought adoption and checkout completion back.",
    accent: "var(--accent-coral)",
    tags: ["Moving", "Pricing", "Checkout"],
    draftStatus: "draft",
    outcomeTeaser: "Adoption 2% → 18% · drop-off −5%",
    metrics: [
      {
        label: "Feature adoption",
        value: "2% → 18%",
        note: "As stated by Atena — event definition / window TBD",
      },
      {
        label: "Checkout drop-off",
        value: "−5%",
        note: "As stated by Atena — baseline / platform TBD",
      },
      {
        label: "Engagement",
        value: "Increased",
        note: "Qualitative — as stated by Atena",
      },
    ],
    visualsNote:
      "Moving calculator screens from discovery. Before = form with Calculate price; After = realtime estimated cost while configuring the move.",
    visuals: [
      {
        src: "/cases/achareh-moving-calculator/before-calculate-button.png",
        label: "Before",
        state: "Form + calculate",
        caption:
          "Pickup, destination, and extra details as a long form. Price sits behind a bottom “Calculate price” action — the submit-form pattern users bounced on.",
        alt: "Achareh moving calculator before — multi-section form with Calculate price button",
        badgeColor: "var(--accent-amber)",
        width: 843,
        height: 1896,
      },
      {
        src: "/cases/achareh-moving-calculator/after-realtime-price.png",
        label: "After",
        state: "Realtime price",
        caption:
          "Estimated moving cost stays visible while users change floors, elevator, workers, and more — no calculate-submit step to get a number.",
        alt: "Achareh moving calculator after — sticky estimated cost with realtime inputs",
        badgeColor: "var(--accent-mint)",
        width: 1674,
        height: 3417,
      },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "On Achareh customer web for moving, funnel review showed a huge drop-off between the checkout step and submit order — the moment users were trying to get a price. A moving calculator was added so people could check price before intent, but adoption stayed unsatisfying: users saw and started the feature, then stalled because it felt like a huge form.",
        bullets: [
          "Huge drop-off between checkout and submit while seeking price.",
          "Calculator existed, but form + calculate felt heavy — weak conversion into the feature.",
        ],
        status: "ready",
      },
      {
        id: "role",
        title: "Role",
        body: "Product designer on this work. Collaborators and decision rights still TBD.",
        status: "ready",
      },
      {
        id: "what-changed",
        title: "What changed",
        body: "After a session and data review, the UI shifted away from a submit-form calculate pattern to realtime price calculation as inputs change.",
        bullets: [
          "Moving price calculator so users can check price before intent.",
          "Removed submit-form style calculate CTA.",
          "Calculate price realtime while configuring the move.",
        ],
        status: "ready",
      },
      {
        id: "outcome",
        title: "Outcomes",
        body: "Results as Atena stated them. Event definitions, fuller baselines, and time windows are not confirmed yet.",
        bullets: [
          "Feature adoption 2% → 18%",
          "Checkout drop-off reduced by 5%",
          "Engagement increased",
        ],
        status: "ready",
      },
      {
        id: "reflection",
        title: "Reflection",
        body: "Coming soon — what she’d revisit once metric definitions and process notes are filled.",
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
