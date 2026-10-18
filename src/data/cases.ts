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

export type SampleAdoptionRow = {
  feature: string;
  before: string;
  after: string;
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
  /** Illustrative feature-level rows — not verified analytics unless noted */
  sampleAdoption?: {
    caption: string;
    rows: SampleAdoptionRow[];
  };
  visuals?: CaseVisual[];
  visualsNote?: string;
  visualsTitle?: string;
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
    visualsTitle: "Before → after → order status",
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
    visualsTitle: "Before → after",
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
  {
    slug: "achareh-my-desk",
    title: "My Desk — expert activity hub",
    eyebrow: "Achareh · Expert side",
    company: "Achareh",
    role: "Product Design Lead",
    timeframe: "Expert platform",
    summary:
      "A new expert-side hub for Achareh — My Desk — giving pros a central place for activities and engagement they didn’t have before.",
    accent: "var(--accent-lime)",
    tags: ["Expert tools", "Hub", "Engagement"],
    draftStatus: "draft",
    outcomeTeaser: "Page view +80% · feature adoption → 40%",
    metrics: [
      {
        label: "Page view",
        value: "+80%",
        note: "As stated by Atena — definition / window TBD",
      },
      {
        label: "Avg. feature adoption (My Desk)",
        value: "→ 40%",
        note: "Average for all features in My Desk — as stated by Atena",
      },
    ],
    sampleAdoption: {
      caption:
        "Sample feature-level adoption (illustrative; overall average adoption → 40% as stated). Not verified analytics — examples for storytelling until Atena confirms feature-level numbers.",
      rows: [
        { feature: "Work Calendar", before: "2%", after: "10%" },
        { feature: "Customer Order", before: "5%", after: "45%" },
        { feature: "Saved Replies", before: "3%", after: "38%" },
        { feature: "Service Areas", before: "8%", after: "42%" },
        { feature: "Study Materials", before: "4%", after: "35%" },
        { feature: "Guides & Tutorials", before: "6%", after: "40%" },
        { feature: "Refer & earn", before: "2%", after: "28%" },
        { feature: "My Performance", before: "10%", after: "52%" },
        { feature: "Price List", before: "7%", after: "48%" },
        { feature: "Client Discounts", before: "4%", after: "36%" },
        { feature: "Experts Club", before: "12%", after: "55%" },
        { feature: "Finance", before: "15%", after: "50%" },
      ],
    },
    visualsTitle: "My Desk hub",
    visualsNote:
      "Expert-side My Desk hub screen from discovery. Before-state screens and messaging examples still TBD.",
    visuals: [
      {
        src: "/cases/achareh-my-desk/my-desk-hub.png",
        label: "My Desk",
        state: "Hub",
        caption:
          "Central hub for expert activities — club, finance, calendar, orders, guides, performance, and more — plus engagement entry points that didn’t exist as a home before.",
        alt: "Achareh My Desk hub showing Experts Club, Finance, and grid of expert activity shortcuts",
        badgeColor: "var(--accent-lime)",
        width: 1500,
        height: 3268,
      },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "On the Achareh expert side, pros lacked a central place for their activities and engagement. My Desk was introduced as that hub.",
        bullets: [
          "No single home for expert activities before My Desk.",
          "Engagement activities needed a clear place on the expert side.",
        ],
        status: "ready",
      },
      {
        id: "role",
        title: "Role",
        body: "Product Design Lead at Achareh (from resume / inventory). Collaborators and decision rights for this hub still TBD.",
        status: "ready",
      },
      {
        id: "what-changed",
        title: "What changed",
        body: "Shipped a new hub page — My Desk — as the central place for expert activities and engagement.",
        bullets: [
          "New My Desk hub covering expert activities and engagement they didn’t have before.",
          "Entry points into club, finance, calendar, orders, learning, and related tools (as shown on the hub screen).",
        ],
        status: "ready",
      },
      {
        id: "outcome",
        title: "Outcomes",
        body: "Headline results as Atena stated them. Feature-level rows below are sample / illustrative only (Work Calendar 2% → 10% follows her direction; other rows are coherent examples averaging toward ~40% after). Metric definitions and time windows still TBD.",
        bullets: [
          "Page view +80%",
          "Average feature adoption for all features in My Desk increased to 40%",
        ],
        status: "ready",
      },
      {
        id: "also-messaging",
        title: "Also — expert messaging",
        body: "Related expert-side work from the same inventory: message-tone research — survey with message screenshots → rewrite confusing or cold copy warmer. Screens and outcome metrics for this thread are TBD; not the primary chapter of this case.",
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
