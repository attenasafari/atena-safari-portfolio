import { Atmosphere } from "@/components/Atmosphere";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

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
