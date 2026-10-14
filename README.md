# Atena Safari — Portfolio

Case-study portfolio for **Atena Safari**, Product Design Lead. Playful neubrutal / tactile keycap energy adapted from a Keyboard Portfolio reference — original Atena branding, not a clone.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:3847](http://127.0.0.1:3847)

```bash
npm run build
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home hero — brand keycaps, pink name highlight, black CTA |
| `/work` | Case study list |
| `/work/[slug]` | Case template (skeleton bodies until content lands) |
| `/about` | Bio, experience, skills |
| `/contact` | Email, LinkedIn, ADPList, phone |

Published case: Achareh customer home. Work page is ready for more cases later.

## Design system

Project doc (tokens, type, motion, page extension rules): see the workspace Agent Store at `docs/design-system.md` when working in the Cursor Project, or mirror those tokens from `src/app/globals.css`.
