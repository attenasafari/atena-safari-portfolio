import type { Metadata } from "next";
import { Fredoka, Figtree } from "next/font/google";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        <Atmosphere />
        <Nav />
        <main className="relative z-[1] flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
