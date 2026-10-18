/**
 * GitHub Pages project site path. next/link and the asset pipeline apply this
 * via `basePath` in next.config.ts. Unoptimized next/image does not, so public
 * file srcs need withBasePath().
 */
export const basePath = "/atena-safari-portfolio";

export function withBasePath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  return `${basePath}${src}`;
}
