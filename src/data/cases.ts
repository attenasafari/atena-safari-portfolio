export type CaseSection = {
  id: string;
  title: string;
  body: string;
  status: "ready" | "placeholder";
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
  outcomeTeaser: string;
  sections: CaseSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "achareh-my-desk",
    title: "My Desk & expert scheduling",
    eyebrow: "Achareh · Expert platform",
    company: "Achareh",
    role: "Product Design Lead",
    timeframe: "2023 – Present",
    summary:
      "How analytics on the expert side shaped My Desk and the scheduling calendar — unlocking daily tools providers actually open.",
    accent: "var(--accent-coral)",
    tags: ["Marketplace", "Expert tools", "Analytics-led"],
    featured: true,
    outcomeTeaser: "80% increase in feature usage (resume)",
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "Placeholder — expert desk and scheduling adoption story to be drafted with Atena. Resume notes Metabase-guided design of the expert scheduling calendar and My Desk application page.",
        status: "placeholder",
      },
      {
        id: "role",
        title: "Role",
        body: "Product Design Lead at Achareh. Collaborators, decision rights, and scope details TBD.",
        status: "placeholder",
      },
      {
        id: "process",
        title: "Process",
        body: "Placeholder for research, analytics instrumentation, ideation, and validation steps.",
        status: "placeholder",
      },
      {
        id: "decisions",
        title: "Decisions",
        body: "Placeholder for key tradeoffs — what shipped, what waited, and why.",
        status: "placeholder",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "Resume: 80% increase in feature usage for My Desk / expert scheduling. Metric definitions, baselines, and platforms to confirm with Atena.",
        status: "placeholder",
      },
      {
        id: "reflection",
        title: "Reflection",
        body: "Placeholder — what she would revisit, and what viewers should notice.",
        status: "placeholder",
      },
    ],
  },
  {
    slug: "achareh-customer-home",
    title: "Find, book, manage — customer home",
    eyebrow: "Achareh · Client home",
    company: "Achareh",
    role: "Senior product designer",
    timeframe: "2023 – Present",
    summary:
      "A home redesign so clients could find orders, set city first, and search into add-order without hunting.",
    accent: "var(--accent-sky)",
    tags: ["Marketplace", "Home redesign", "Conversion"],
    outcomeTeaser: "Search usage +80% · bounce −10% (stated)",
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "Users couldn’t find their orders. City and search were hard to discover. Search didn’t route into add-order fast enough. City affects available services and price.",
        status: "ready",
      },
      {
        id: "role",
        title: "Role",
        body: "Senior product designer on the customer home redesign. Collaborators and decision rights still to confirm.",
        status: "placeholder",
      },
      {
        id: "process",
        title: "Process",
        body: "Placeholder — research methods, insights that drove city-first + order modal, rollout / A/B details.",
        status: "placeholder",
      },
      {
        id: "decisions",
        title: "Decisions",
        body: "Shipped directions (from Atena): button navigation including My Order; city asked first; search as hero primary action; current-order status modal for last 3 orders (status, actions, pro data, phone). Deeper tradeoffs TBD.",
        status: "ready",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "As stated by Atena: search-bar usage +80%; time-on-task finding a service −1 minute; order management from the first page; bounce rate −10%. Measurement definitions and baselines still UNKNOWN — do not treat as final published proof until confirmed.",
        status: "placeholder",
      },
      {
        id: "reflection",
        title: "Reflection",
        body: "Placeholder for retrospective once process and assets are captured.",
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
      "Usability-led redesign across a suite of fintech services, with a structured Figma design system to keep velocity honest.",
    accent: "var(--accent-lime)",
    tags: ["Fintech", "Design system", "Usability"],
    outcomeTeaser: "Ten services · ~6-month delivery",
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "Placeholder — usability debt across core financial products and pressure to ship new services quickly.",
        status: "placeholder",
      },
      {
        id: "role",
        title: "Role",
        body: "Senior Product Designer. Led design of ten financial services; built structured design system in Figma.",
        status: "ready",
      },
      {
        id: "process",
        title: "Process",
        body: "Placeholder — usability testing, pain-point prioritization, gamification / Lottie motion, system contribution culture.",
        status: "placeholder",
      },
      {
        id: "decisions",
        title: "Decisions",
        body: "Placeholder for service prioritization and system vs one-off tradeoffs.",
        status: "placeholder",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "Ten services designed; new fintech services within a tight ~6-month timeline. Numeric KPIs UNKNOWN pending Atena.",
        status: "placeholder",
      },
      {
        id: "reflection",
        title: "Reflection",
        body: "Placeholder.",
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
