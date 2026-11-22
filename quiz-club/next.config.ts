import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Dev is documented on 127.0.0.1. Next blocks that host unless it is allowed,
  // which leaves the page as static HTML with no clicks.
  allowedDevOrigins: ["127.0.0.1"],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
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
