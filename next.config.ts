import type { NextConfig } from "next";
import { basePath } from "./src/lib/base-path";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Dev is documented on 127.0.0.1. Next blocks that host unless it is allowed,
  // which leaves the page as static HTML with no clicks.
  allowedDevOrigins: ["127.0.0.1"],
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
