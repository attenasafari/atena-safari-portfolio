# Quiz Club

A mobile-first quiz game. Five-question rounds, a daily table, and challenges you can settle with sample friends. Progress stays in the browser.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Static export (`output: "export"`)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/).

```bash
npm run build
```

The static site is written to `out/`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/explore` | Search, categories, saved quizzes |
| `/category/[id]` | One category |
| `/quiz/[id]` | Quiz detail |
| `/play/[id]` | Five-question round |
| `/results/[id]` | Score |
| `/challenge` | Create a challenge, copy a code, compare |
| `/leaderboard` | Sample weekly board |
| `/profile` | XP, streak, achievements, history |
| `/settings` | Guest name, timer, reset |
