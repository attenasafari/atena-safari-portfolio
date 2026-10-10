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
    tags: ["Marketplace", "Home redesign", "Conversion"],
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
        body: "Four shipped directions she described — framed as the product changes that answered the problem. Deeper tradeoffs (for example, modal vs a full orders page) are still TBD.",
        bullets: [
          "Button navigation, including a clear My Order entry point.",
          "Ask for city first — services and pricing differ by city, and some cities offer different services.",
          "Put search as the main hero action so people move into add-order faster.",
          "Current order status modal showing the last 3 orders with status, main actions, pro data, and phone number.",
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
        body: "Coming soon — what she’d revisit, and what she wants viewers to notice, once process and assets are in.",
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
