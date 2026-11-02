import type { Metadata } from "next";
import localFont from "next/font/local";
import { LandingPage } from "@/components/landing/page-view";
import "./landing.css";

const vazir = localFont({
  src: [
    { path: "../fonts/vazirmatn/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/vazirmatn/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/vazirmatn/Vazirmatn-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/vazirmatn/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/vazirmatn/Vazirmatn-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "آچاره شرکتی — از پشت‌بام تا موتورخانه",
  description:
    "هر طبقه از ساختمانتان یک کار فنی دارد. همه را یک نفر از آچاره پیگیری می‌کند و آخر ماه یک فاکتور رسمی می‌گیرید.",
};

export default function Page() {
  return (
    <div className={`${vazir.variable} landing-root`}>
      <LandingPage />
    </div>
  );
}
