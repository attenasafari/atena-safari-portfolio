# Atena Safari — Portfolio

Case-study portfolio for **Atena Safari**, Product Design Lead. Playful neubrutal / tactile keycap energy adapted from a Keyboard Portfolio reference — original Atena branding, not a clone.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:3847/atena-safari-portfolio/](http://127.0.0.1:3847/atena-safari-portfolio/)

```bash
npm run build
```

`output: "export"` writes a static site to `out/`. `next start` does not serve that export.

Preview it under the GitHub Pages base path:

```bash
mkdir -p /tmp/pages-preview
ln -sfn "$PWD/out" /tmp/pages-preview/atena-safari-portfolio
python3 -m http.server 4173 --directory /tmp/pages-preview
```

Open [http://127.0.0.1:4173/atena-safari-portfolio/](http://127.0.0.1:4173/atena-safari-portfolio/).

## Deploy

Pushes to `main` run [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds the static export and deploys it with the official GitHub Pages actions.

The site is published at [https://attenasafari.github.io/atena-safari-portfolio/](https://attenasafari.github.io/atena-safari-portfolio/).

One-time setup in the GitHub repository (Actions cannot change this setting):

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

After that setting is saved, the next push to `main` (or a manual run of the workflow) publishes the site.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home hero — brand keycaps, pink name highlight, black CTA |
| `/work` | Case study list |
| `/work/[slug]` | Case template (skeleton bodies until content lands) |
| `/about` | Bio, experience, skills |
| `/contact` | Email, LinkedIn, ADPList |

Cases: Achareh customer home; moving calculator; Achareh Expert (My Desk + Expert messages).

## Design system

Project doc (tokens, type, motion, page extension rules): see the workspace Agent Store at `docs/design-system.md` when working in the Cursor Project, or mirror those tokens from `src/app/globals.css`.
