/* =============================================================================
   useCinematicScroll.ts — ORKESTRATOR ANIMASI SINEMATIK.
   -----------------------------------------------------------------------------
   Menyusuri seluruh `.slide` di dalam scope dan membangun adegan untuk
   masing-masing lewat buildScene(). Semua ScrollTrigger dibuat di dalam
   gsap.context() sehingga di-revert bersih saat komponen dilepas (tidak ada
   instance duplikat saat resize/HMR).

   Menghormati prefers-reduced-motion: animasi dilewati dan konten tampil.
   ========================================================================== */

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "../../lib/motion";
import type { SceneConfig } from "../types";
import { buildScene } from "./sceneBuilder";

export interface SceneDescriptor {
  id: string;
  scene: SceneConfig;
  isChapterStart: boolean;
  isChapterEnd: boolean;
}

const prefersReduced = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useCinematicScroll(
  scopeRef: RefObject<HTMLElement | null>,
  scenes: SceneDescriptor[],
): void {
  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;

    if (prefersReduced()) {
      // Tanpa animasi: pastikan semua konten & wash tampil wajar.
      root.querySelectorAll<HTMLElement>(".slide__content").forEach((el) => gsap.set(el, { clearProps: "all" }));
      root.querySelectorAll<HTMLElement>(".slide__wash").forEach((el) => gsap.set(el, { yPercent: 101 }));
      return;
    }

    const ctx = gsap.context(() => {
      // Konfigurasi umum: hormati perubahan ukuran mobile (address bar).
      ScrollTrigger.config({ ignoreMobileResize: true });

      for (const descriptor of scenes) {
        const section = document.getElementById(descriptor.id);
        if (!section) continue;
        buildScene(section, descriptor.scene, descriptor.isChapterStart, descriptor.isChapterEnd);
      }

      // Segarkan setelah semua trigger dibuat agar pengukuran konsisten.
      ScrollTrigger.refresh();
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    const settle = window.setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(settle);
      ctx.revert();
    };
  }, [scopeRef, scenes]);
}
