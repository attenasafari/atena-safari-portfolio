"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SCRUB = 0.85;

/**
 * Each block eases into the Figma position, then keeps drifting until it
 * leaves the viewport. Scroll progress drives the timeline, so reversing
 * the scroll reverses the motion.
 */
function travelWithSection(section: Element, target: Element, index: number, distance: number) {
  const shift = index * 10;

  gsap.fromTo(
    target,
    { y: distance + shift },
    {
      y: -Math.round(distance * 0.7) - shift * 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: SCRUB,
      },
    },
  );
}

function scrubHero(root: ParentNode) {
  const hero = root.querySelector(".ach-hero");
  const media = root.querySelector(".ach-heroMedia");
  const crop = root.querySelector(".ach-heroCrop");
  const card = root.querySelector(".ach-formCard");
  if (!hero || !media || !card) return;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.65,
      },
    })
    .to(media, { y: -150, ease: "none" }, 0)
    .to(crop, { y: 90, scale: 1.08, ease: "none" }, 0)
    .to(card, { y: -80, ease: "none" }, 0);
}

function scrubHow(root: ParentNode, pin: boolean) {
  const how = root.querySelector("#how");
  const wrap = how?.querySelector(".ach-wrap");
  if (!how || !wrap) return;

  gsap.fromTo(
    wrap,
    { y: 48 },
    {
      y: -36,
      ease: "none",
      scrollTrigger: {
        trigger: how,
        start: pin ? "top 88px" : "top bottom",
        end: pin ? "+=80%" : "bottom top",
        pin,
        scrub: 1,
        anticipatePin: 1,
      },
    },
  );
}

function scrubSection(root: ParentNode, selector: string, itemSelector: string, distance = 42) {
  const section = root.querySelector(selector);
  if (!section) return;
  const items = section.querySelectorAll(itemSelector);
  items.forEach((target, index) => {
    const isHeading = target.matches("h2, .ach-sub, .ach-quiet");
    travelWithSection(section, target, index, isHeading ? 22 : distance);
  });
}

export function startLandingMotion(root: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return () => {};

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("ach-smooth");

  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.05,
  });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const wide = window.matchMedia("(min-width: 1100px)").matches;

  const context = gsap.context(() => {
    scrubHero(root);
    scrubHow(root, wide);
    scrubSection(root, "#conditions", "h2, .ach-sub, .ach-panel");
    scrubSection(root, "#documents", "h2, .ach-sub, .ach-tabs, .ach-doc");
    scrubSection(root, "#locations", "h2, .ach-acc", 40);
    scrubSection(root, "#why", "h2, .ach-stat", 56);
    scrubSection(root, "#videos", "h2, .ach-video", 52);
    scrubSection(root, ".ach-stories", "h2, .ach-quiet, .ach-quote");
    scrubSection(root, "#posts", "h2, .ach-quiet, .ach-card, .ach-centerBtn");
    scrubSection(root, "#faq", "h2, .ach-faq", 32);
    scrubSection(root, ".ach-footer", ".ach-brand, .ach-cols, .ach-footerBottom", 28);
  }, root);

  ScrollTrigger.refresh();

  return () => {
    context.revert();
    lenis.destroy();
    gsap.ticker.remove(tick);
    document.documentElement.classList.remove("ach-smooth");
  };
}
