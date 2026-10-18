export type CaseSection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type CaseMetric = {
  label: string;
  value: string;
};

export type AdoptionRow = {
  feature: string;
  before: string;
  after: string;
};

export type MessagingExample = {
  label: string;
  before: string;
  after: string;
};

export type MessagingChapter = {
  intro: string;
  method: string[];
  principles: { title: string; body: string }[];
  examplesNote?: string;
  examples: MessagingExample[];
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
  /** Parent overview vs story case */
  kind?: "overview" | "case";
  parentSlug?: string;
  childSlugs?: string[];
  outcomeTeaser: string;
  metrics?: CaseMetric[];
  adoptionTable?: {
    caption: string;
    rows: AdoptionRow[];
  };
  messaging?: MessagingChapter;
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
      "Redesigning Achareh’s customer home so people could find orders, set the right city, and get from search into add-order without hunting.",
    accent: "var(--accent-sky)",
    tags: ["Marketplace", "Home redesign"],
    featured: true,
    kind: "case",
    outcomeTeaser: "Search usage +80% · bounce −10%",
    metrics: [
      { label: "Search bar usage", value: "+80%" },
      { label: "Time to find a service", value: "−1 minute" },
      { label: "Bounce rate", value: "−10%" },
      { label: "Order management", value: "From first page" },
    ],
    visualsTitle: "Before → after → order status",
    visualsNote:
      "Customer home before the redesign, the live after home with My Orders in nav, and the order-status modal on home.",
    visuals: [
      {
        src: "/cases/achareh-customer-home/before-home.png",
        label: "Before",
        state: "Prior home",
        caption:
          "Compact top search and city (“Tehran”); category grid and promo carousel. No bottom nav, no My Orders entry, and no order-status UI on home.",
        alt: "Achareh customer home before redesign — compact search bar and category grid without bottom navigation",
        badgeColor: "var(--accent-amber)",
        width: 446,
        height: 918,
      },
      {
        src: "/cases/achareh-customer-home/after-home-categories.png",
        label: "After — home",
        state: "After",
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
        state: "After",
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
        body: "On Achareh’s customer home — a marketplace for home services where city changes which services are available and what they cost — three frictions stacked on top of each other.",
        bullets: [
          "Users couldn’t find their orders.",
          "City and search weren’t findable on the home experience.",
          "Search didn’t get people into add-order fast enough.",
        ],
      },
      {
        id: "role",
        title: "Role",
        body: "Senior product designer on the customer home redesign.",
      },
      {
        id: "decisions",
        title: "What changed",
        body: "Four product directions answered the problem.",
        bullets: [
          "Button navigation, including My Orders in the bottom nav.",
          "Ask for city first — services and pricing differ by city; city sits with search in the hero.",
          "Search as the main hero action so people move into add-order faster.",
          "Current order status on home for recent orders — status, main actions, pro data.",
        ],
      },
      {
        id: "outcome",
        title: "Outcomes",
        body: "Results from the redesign.",
        bullets: [
          "Search bar usage +80%",
          "Time-to-find-service −1 minute",
          "Bounce rate −10%",
          "Orders manageable from the first page",
        ],
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
    kind: "case",
    outcomeTeaser: "Adoption 2% → 18% · drop-off −5%",
    metrics: [
      { label: "Feature adoption", value: "2% → 18%" },
      { label: "Checkout drop-off", value: "−5%" },
      { label: "Engagement", value: "Increased" },
    ],
    visualsTitle: "Before → after",
    visualsNote:
      "Moving calculator before (form + Calculate price) and after (realtime estimated cost).",
    visuals: [
      {
        src: "/cases/achareh-moving-calculator/before-calculate-button.png",
        label: "Before",
        state: "Form + calculate",
        caption:
          "Pickup, destination, and extra details as a long form. Price sits behind a bottom “Calculate price” action.",
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
        body: "On Achareh customer web for moving, funnel review showed a huge drop-off between the checkout step and submit order — the moment users were trying to get a price. A moving calculator was added so people could check price before intent, but adoption stayed weak: users saw and started the feature, then stalled because it felt like a huge form.",
        bullets: [
          "Huge drop-off between checkout and submit while seeking price.",
          "Calculator existed, but form + calculate felt heavy.",
        ],
      },
      {
        id: "role",
        title: "Role",
        body: "Product designer on this work.",
      },
      {
        id: "what-changed",
        title: "What changed",
        body: "After a session and data review, the UI shifted from a submit-form calculate pattern to realtime price calculation as inputs change.",
        bullets: [
          "Moving price calculator so users can check price before intent.",
          "Removed submit-form style calculate CTA.",
          "Calculate price realtime while configuring the move.",
        ],
      },
      {
        id: "outcome",
        title: "Outcomes",
        body: "Results from the realtime calculator redesign.",
        bullets: [
          "Feature adoption 2% → 18%",
          "Checkout drop-off reduced by 5%",
          "Engagement increased",
        ],
      },
    ],
  },
  {
    slug: "achareh-expert",
    title: "Achareh Expert",
    eyebrow: "Achareh · Expert platform",
    company: "Achareh",
    role: "Product Design Lead",
    timeframe: "Expert side",
    summary:
      "Expert-side product work spanning a new activity hub and clearer system messaging — so pros can find what they need and feel like partners, not blocked users.",
    accent: "var(--accent-lime)",
    tags: ["Expert tools", "Hub", "Messaging"],
    kind: "overview",
    childSlugs: ["achareh-my-desk", "achareh-expert-messages"],
    outcomeTeaser: "Two stories · hub + messaging",
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "On Achareh’s expert side, professionals needed a home for daily work and engagement — and system messages that didn’t feel cold or punitive. This case groups that work into two focused stories.",
        bullets: [
          "My Desk — a central hub for expert activities and engagement.",
          "Expert messages — research-led rewrites of system copy into partner language.",
        ],
      },
    ],
  },
  {
    slug: "achareh-my-desk",
    title: "My Desk — expert activity hub",
    eyebrow: "Achareh Expert · My Desk",
    company: "Achareh",
    role: "Product Design Lead",
    timeframe: "Expert platform",
    summary:
      "A new expert-side hub — My Desk — giving pros a central place for activities and engagement they didn’t have before.",
    accent: "var(--accent-lime)",
    tags: ["Expert tools", "Hub", "Engagement"],
    kind: "case",
    parentSlug: "achareh-expert",
    outcomeTeaser: "Page views +80% · adoption → 40%",
    metrics: [
      { label: "Page views", value: "+80%" },
      { label: "Avg. feature adoption", value: "→ 40%" },
    ],
    adoptionTable: {
      caption: "Feature-level adoption before → after the My Desk hub.",
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
    visualsNote: "Expert-side My Desk hub — the central home for activities and engagement.",
    visuals: [
      {
        src: "/cases/achareh-my-desk/my-desk-hub.png",
        label: "My Desk",
        state: "Hub",
        caption:
          "Central hub for expert activities — club, finance, calendar, orders, guides, performance, and more.",
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
      },
      {
        id: "role",
        title: "Role",
        body: "Product Design Lead at Achareh.",
      },
      {
        id: "what-changed",
        title: "What changed",
        body: "Shipped a new hub page — My Desk — as the central place for expert activities and engagement.",
        bullets: [
          "New My Desk hub covering expert activities and engagement they didn’t have before.",
          "Entry points into club, finance, calendar, orders, learning, and related tools.",
        ],
      },
      {
        id: "outcome",
        title: "Outcomes",
        body: "Results after launching the My Desk hub.",
        bullets: [
          "Page views +80%",
          "Average feature adoption for all features in My Desk increased to 40%",
        ],
      },
    ],
  },
  {
    slug: "achareh-expert-messages",
    title: "Expert messages — clearer tone",
    eyebrow: "Achareh Expert · Messaging",
    company: "Achareh",
    role: "Product Design Lead",
    timeframe: "Expert app",
    summary:
      "Experts understood many system messages — and still felt distrusted, limited, or punished. Research-led rewrites turned cold error language into partner copy.",
    accent: "var(--accent-mint)",
    tags: ["Messaging", "Research", "Tone"],
    kind: "case",
    parentSlug: "achareh-expert",
    outcomeTeaser: "Partner language for system messages",
    messaging: {
      intro:
        "System messages fire while experts browse and accept jobs. Cold “error” and quota language made a busy marketplace feel like a wall — even when the rule was clear.",
      method: [
        "Show message screenshots in context.",
        "Ask how experts feel when they see each message.",
        "Ask how they’d explain the situation to a colleague.",
        "Rewrite confusing or harsh copy into clearer partner language — without hiding the rule.",
      ],
      principles: [
        {
          title: "Marketplace, not failure",
          body: "Peers took the job; don’t call normal competition an “error.”",
        },
        {
          title: "Name the limit",
          body: "Whose quota, what refill, what to do next.",
        },
        {
          title: "Define the money",
          body: "One plain meaning for commission / balance / fee.",
        },
        {
          title: "Coach on exit",
          body: "Cancel reasons and fees without scaring people off.",
        },
        {
          title: "Match how experts talk",
          body: "Short lines; done / not done; status they can scan in My Desk (quota, credit, silver/gold progress).",
        },
      ],
      examplesNote: "Signature rewrite from Atena, plus directions that scale the same principles to quota limits.",
      examples: [
        {
          label: "Unavailable request",
          before: "Sorry, this request isn’t available right now.",
          after: "Your colleagues working on this project, maybe another time :)",
        },
        {
          label: "Proposal capacity full",
          before: "Dear expert, proposal capacity for this request is full.",
          after: "This request already has enough proposals. Browse other open requests.",
        },
        {
          label: "Personal proposal quota",
          before: "Unfortunately your proposal quota is finished.",
          after:
            "You’ve used this period’s proposals. Finish or close jobs in progress to free quota — then you can bid again.",
        },
      ],
    },
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "Experts understood many system messages — and still felt distrusted, limited, or punished. Cold error and quota language made a busy marketplace feel like a wall.",
      },
      {
        id: "role",
        title: "Role",
        body: "Product Design Lead — message audit and rewrite for the Achareh expert app.",
      },
      {
        id: "scope",
        title: "What the audit covered",
        body: "Unavailable jobs, per-request capacity, personal proposal quota, schedule conflicts, debt / wallet, employer credit, commission on success, cashless payment rules, customer cancel, connection errors, and cancel-fee warnings — plus how experts actually speak: short, binary, low ambiguity.",
      },
      {
        id: "outcome",
        title: "Outcomes",
        body: "A full rewrite system for expert-facing messages: marketplace framing, named limits, plain money language, and coach-on-exit copy that matches how experts talk — ready to ship across job and hub flows.",
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

export function getWorkListEntries(): CaseStudy[] {
  return caseStudies.filter((c) => !c.parentSlug);
}

export function getChildCases(parentSlug: string): CaseStudy[] {
  const parent = getCaseBySlug(parentSlug);
  if (!parent?.childSlugs) return [];
  return parent.childSlugs
    .map((slug) => getCaseBySlug(slug))
    .filter((c): c is CaseStudy => Boolean(c));
}

export function getSiblingCases(study: CaseStudy): CaseStudy[] {
  if (!study.parentSlug) return [];
  return getChildCases(study.parentSlug).filter((c) => c.slug !== study.slug);
}
