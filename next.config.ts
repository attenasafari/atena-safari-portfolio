import type { NextConfig } from "next";
import { basePath } from "./src/lib/base-path";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Emit /about/index.html so static hosts (including GitHub Pages) resolve
  // directory URLs without a rewrite to .html files.
  trailingSlash: true,
  images: {
    // The default image optimizer is a server route and cannot run on Pages.
    unoptimized: true,
  },
  // cacheComponents turns on Partial Prerendering, which Next rejects with
  // "PPR cannot be enabled in export mode". partialPrefetching requires
  // cacheComponents, so both stay off for a fully static GitHub Pages build.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
