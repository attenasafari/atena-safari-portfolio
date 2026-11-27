<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Install with `npm ci`. Node 22 is already on the default image.
- Dev server: `npm run dev -- --hostname 0.0.0.0`. Open `http://127.0.0.1:3847/atena-safari-portfolio/`. The `dev` script sets port 3847, and `basePath` is `/atena-safari-portfolio`.
- Next.js 16 stops the first agent `dev` or `build` process to print a security upgrade nudge, then allows the immediate retry. Run the same command again if it exits after that message. Leave the Next.js version pinned unless someone asks to upgrade it.
- `npm run build` writes a static export to `out/`. `next start` does not serve that export. Preview the export the way `README.md` describes.
- `npm run lint` is the lint command. It currently fails on existing react-hooks errors in `.agents/skills/design-taste-frontend/` and reports image warnings in `src/components/studio/StudioView.tsx`.
- There is no automated test script. `npx tsc --noEmit` passes after Next has generated its types (a production build does this).
