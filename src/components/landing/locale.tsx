"use client";

import { useEffect } from "react";

export function DocumentLocale() {
  useEffect(() => {
    const root = document.documentElement;
    const prevLang = root.lang;
    const prevDir = root.getAttribute("dir");
    root.lang = "fa";
    root.dir = "rtl";
    return () => {
      root.lang = prevLang;
      if (prevDir == null) root.removeAttribute("dir");
      else root.dir = prevDir;
    };
  }, []);

  return null;
}
