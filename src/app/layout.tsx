import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Google Fonts sometimes returns extensionless /l/font?kit= URLs. Turbopack
// splits those on "&" and fails the Pages build. These are the same Latin
// weights the site already used, stored in the repo.
const fredoka = localFont({
  src: [
    { path: "../fonts/fredoka/fredoka-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/fredoka/fredoka-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/fredoka/fredoka-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/fredoka/fredoka-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-fredoka",
  display: "swap",
});

const figtree = localFont({
  src: [
    { path: "../fonts/figtree/figtree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/figtree/figtree-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/figtree/figtree-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/figtree/figtree-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Atena Safari — Product Design Lead",
    template: "%s · Atena Safari",
  },
  description:
    "Case-study portfolio of Atena Safari, Product Design Lead — marketplaces, fintech, design systems, and data-driven UX.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-[family-name:var(--font-figtree)]">
        {children}
      </body>
    </html>
  );
}
