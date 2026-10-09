/* =============================================================================
   useScrollScene.ts — ANIMASI SCROLL PER HALAMAN (REVERSIBLE).
   -----------------------------------------------------------------------------
   Setiap ".slide" mendapat animasi yang terikat pada progres gulir (scrub),
   sehingga berjalan MAJU saat menggulir ke bawah dan BERBALIK saat ke atas.
   Preset (dibaca dari slide.animation lewat atribut data-anim):
     • cinematic   : latar zoom besar + konten mengecil/memudar (momen kunci)
     • zoom        : latar membesar → fokus, lalu membesar lagi saat keluar
     • parallax    : latar bergerak lebih lambat dari gulir
     • mask-reveal : konten terungkap dari balik topeng (clip-path)
     • slide       : konten bergeser naik dari bawah
     • fade        : konten memudar masuk
     • none        : tanpa animasi
   Preferensi "prefers-reduced-motion" dihormati: tanpa animasi, konten tampil.
   ========================================================================== */

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useScrollScene(scopeRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;

    const slides = Array.from(root.querySelectorAll<HTMLElement>(".slide"));

    if (prefersReduced()) {
      slides.forEach((slide) => {
        const content = slide.querySelector<HTMLElement>(".slide__content");
        if (content) gsap.set(content, { clearProps: "all" });
      });
      return;
    }

    const ctx = gsap.context(() => {
      slides.forEach((slide) => {
        const anim = slide.dataset.anim ?? "zoom";
        if (anim === "none") return;

        const bg = slide.querySelector<HTMLElement>(".slide__bg");
        const content = slide.querySelector<HTMLElement>(".slide__content");

        /* Fase masuk: elemen muncul saat halaman mendekat. */
        const enterStart = "top bottom";
        const enterEnd = "top 35%";

        /* Fase keluar: elemen menjauh saat halaman ditinggalkan. */
        const leaveStart = "bottom 65%";
        const leaveEnd = "bottom top";

        // --- Latar: zoom & parallax ---
        if (bg) {
          if (anim === "parallax") {
            gsap.fromTo(
              bg,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: { trigger: slide, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          } else {
            const zoomIn = anim === "cinematic" ? 1.24 : 1.14;
            gsap.fromTo(
              bg,
              { scale: zoomIn },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: slide, start: enterStart, end: enterEnd, scrub: true, invalidateOnRefresh: true },
              },
            );
            gsap.fromTo(
              bg,
              { scale: 1 },
              {
                scale: anim === "cinematic" ? 1.16 : 1.08,
                ease: "none",
                immediateRender: false,
                scrollTrigger: { trigger: slide, start: leaveStart, end: leaveEnd, scrub: true },
              },
            );
          }
        }

        // --- Konten: reveal sesuai preset ---
        if (content) {
          if (anim === "mask-reveal") {
            gsap.fromTo(
              content,
              { clipPath: "inset(0% 0% 100% 0%)", y: 40, opacity: 0 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: { trigger: slide, start: enterStart, end: "top 40%", scrub: true },
              },
            );
          } else if (anim === "cinematic") {
            gsap.fromTo(
              content,
              { y: 60, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: slide, start: enterStart, end: enterEnd, scrub: true },
              },
            );
          } else {
            const distance = anim === "fade" ? 0 : 60;
            gsap.fromTo(
              content,
              { y: distance, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: { trigger: slide, start: enterStart, end: enterEnd, scrub: true },
              },
            );
          }

          // Fase keluar konten (reversible) untuk semua preset.
          gsap.fromTo(
            content,
            { y: 0, opacity: 1 },
            {
              y: -40,
              opacity: 0.15,
              ease: "none",
              immediateRender: false,
              scrollTrigger: { trigger: slide, start: leaveStart, end: leaveEnd, scrub: true },
            },
          );
        }
      });
    }, root);

    // Ukur ulang setelah font/gambar termuat agar trigger presisi.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) void document.fonts.ready.then(refresh);
    const timer = window.setTimeout(refresh, 350);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [scopeRef]);
}
