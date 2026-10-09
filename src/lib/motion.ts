import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Shared motion language so every section reveals with the same feel. */
export const EASE = "power3.out";
export const EASE_CINEMATIC = "power4.inOut";

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Layout can settle after fonts and lazy media arrive. Re-measuring keeps
 * scroll-triggered reveals aligned with the real geometry.
 */
export const refreshScroll = () => ScrollTrigger.refresh();

let refreshBound = false;
export const bindScrollRefresh = () => {
  if (refreshBound || typeof window === "undefined") return;
  refreshBound = true;
  const run = () => refreshScroll();
  window.addEventListener("load", run);
  if ("fonts" in document && document.fonts) void document.fonts.ready.then(run);
};

export { gsap, ScrollTrigger };
