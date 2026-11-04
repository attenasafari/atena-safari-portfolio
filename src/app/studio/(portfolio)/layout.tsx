import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: {
    default: "Atena Safari — Product Design Lead",
    template: "%s · Atena Safari",
  },
  description:
    "Case-study portfolio of Atena Safari, Product Design Lead — marketplaces, fintech, design systems, and data-driven UX.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Atmosphere />
      <Nav />
      <main className="relative z-[1] flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
