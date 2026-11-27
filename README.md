# Atena Safari — Portfolio

Case-study portfolio for **Atena Safari**, Product Design Lead. Playful neubrutal / tactile keycap energy adapted from a Keyboard Portfolio reference — original Atena branding, not a clone.

Quiz Club lives in a separate repo: [attenasafari/Quiz-club](https://github.com/attenasafari/Quiz-club).

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

`output: "export"` writes a static site to `out/`.

## Deploy

Pushes to `main` run [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds the static export and deploys it with GitHub Pages.

Live: [https://attenasafari.github.io/atena-safari-portfolio/](https://attenasafari.github.io/atena-safari-portfolio/)

One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Portfolio home |
| `/work` | Case study list |
| `/work/[slug]` | Case study |
| `/about` | Bio, experience, skills |
| `/contact` | Email, LinkedIn, ADPList |

Cases: Achareh customer home; moving calculator; Achareh Expert (My Desk + Expert messages).
