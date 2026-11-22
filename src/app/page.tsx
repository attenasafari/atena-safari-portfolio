import type { Metadata } from "next";
import localFont from "next/font/local";
import { Landing } from "@/components/landing/Landing";

const vazirmatn = localFont({
  src: "../fonts/vazirmatn/Vazirmatn-Variable.woff2",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  title: { absolute: "ثبت‌نام متخصصان آچاره" },
  description:
    "مهارتت رو به درآمد تبدیل کن. شرایط ثبت‌نام، مدارک، محل مراجعه و سوالات متداول متخصصان آچاره.",
};

export default function Page() {
  return (
    <div className={vazirmatn.className}>
      <Landing />
    </div>
  );
}
