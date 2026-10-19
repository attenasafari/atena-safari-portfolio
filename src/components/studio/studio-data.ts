import { caseStudies, getChildCases, getWorkListEntries } from "@/data/cases";
import { withBasePath } from "@/lib/base-path";

export type StudioPiece = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  kind: string;
  when: string;
  src: string | null;
  alt: string;
};

function pieceFrom(study: (typeof caseStudies)[number]): StudioPiece {
  const visuals = study.visuals ?? [];
  const after = visuals.find(
    (visual) =>
      /after/i.test(visual.state ?? "") || /after/i.test(visual.label),
  );
  const visual = after ?? visuals[0];
  return {
    slug: study.slug,
    title: study.title,
    summary: study.summary,
    outcome: study.outcomeTeaser,
    kind: study.tags[0] ?? study.company,
    when: study.timeframe,
    src: visual ? withBasePath(visual.src) : null,
    alt: visual?.alt ?? study.title,
  };
}

export function studioScreens(): StudioPiece[] {
  return caseStudies.filter((study) => study.visuals?.length).map(pieceFrom);
}

export function studioLedger(): StudioPiece[] {
  const rows: StudioPiece[] = [];
  for (const study of getWorkListEntries()) {
    rows.push(pieceFrom(study));
    for (const child of getChildCases(study.slug)) rows.push(pieceFrom(child));
  }
  return rows;
}
