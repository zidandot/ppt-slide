/* =============================================================================
   sceneBuilder.ts — PUSTAKA KOREOGRAFI ADEGAN.
   -----------------------------------------------------------------------------
   Fungsi-fungsi di sini membangun ScrollTrigger + timeline untuk satu adegan.
   Semua parameter berasal dari SceneConfig (data/scenes.ts), jadi mengubah
   rasa gerak website cukup lewat data, bukan mengobrak-abrik komponen.

   Prinsip:
     • Semua memakai `scrub` sehingga animasi MAJU & BERBALIK mengikuti gulir.
     • Tidak ada ScrollTrigger `pin`; adegan "pin" memakai position: sticky
       pada CSS sehingga tinggi layout natural dan tidak ada lompatan posisi.
     • Elemen [data-reveal] di dalam konten diungkap berurutan.
     • Reduced-motion ditangani di pemanggil (hook), bukan di sini.
   ========================================================================== */

import { gsap, ScrollTrigger } from "../../lib/motion";
import type { SceneConfig } from "../types";

/** Elemen yang dibutuhkan dari satu adegan (semuanya opsional-safe). */
interface SceneParts {
  section: HTMLElement;
  bg: HTMLElement | null;
  content: HTMLElement | null;
  accent: HTMLElement | null;
  wash: HTMLElement | null;
}

/** Kumpulan target reveal di dalam konten (atau konten itu sendiri). */
function revealTargets(content: HTMLElement | null): Element[] {
  if (!content) return [];
  const marked = Array.from(content.querySelectorAll("[data-reveal]"));
  return marked.length > 0 ? marked : [content];
}

/* --- Fase latar: zoom masuk → tahan → zoom keluar ------------------------- */
function buildBackground(parts: SceneParts, cfg: SceneConfig, pin: boolean): void {
  if (!parts.bg) return;
  const [zoomIn, zoomOut] = cfg.zoom ?? [1.2, 1.08];
  const depth = cfg.depth ?? 1;

  if (pin) {
    // Sepanjang adegan ditahan: kamera mendekat lalu menjauh perlahan.
    gsap.fromTo(
      parts.bg,
      { scale: zoomIn },
      {
        scale: zoomOut,
        ease: "none",
        scrollTrigger: {
          trigger: parts.section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    );
    return;
  }

  // Adegan mengalir: mendekat saat masuk, menjauh saat pergi.
  gsap.fromTo(
    parts.bg,
    { scale: zoomIn },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: parts.section, start: "top bottom", end: "top 32%", scrub: 0.6, invalidateOnRefresh: true },
    },
  );
  gsap.fromTo(
    parts.bg,
    { scale: 1 },
    {
      scale: zoomOut,
      ease: "none",
      immediateRender: false,
      scrollTrigger: { trigger: parts.section, start: "bottom 68%", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
    },
  );

  // Parallax vertikal tipis pada latar.
  if (depth > 0) {
    gsap.fromTo(
      parts.bg,
      { yPercent: -depth * 4 },
      {
        yPercent: depth * 4,
        ease: "none",
        scrollTrigger: { trigger: parts.section, start: "top bottom", end: "bottom top", scrub: 0.8 },
      },
    );
  }
}

/* --- Aksen dekoratif (kontur/logo/nomor) ---------------------------------- */
function buildAccent(parts: SceneParts, cfg: SceneConfig, pin: boolean): void {
  if (!parts.accent) return;
  const depth = cfg.depth ?? 1;

  gsap.fromTo(
    parts.accent,
    { scale: 1.12, rotate: -2.5, opacity: 0 },
    {
      scale: 1,
      rotate: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: parts.section,
        start: pin ? "top top" : "top bottom",
        end: pin ? "top+=45% top" : "top 45%",
        scrub: 0.8,
      },
    },
  );
  gsap.fromTo(
    parts.accent,
    { rotate: 0 },
    {
      rotate: 9 + depth * 3,
      yPercent: -10,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: parts.section,
        start: pin ? "top top" : "top 60%",
        end: "bottom top",
        scrub: 0.9,
      },
    },
  );
}

/* --- Fase konten: reveal masuk sesuai jenis transisi ---------------------- */
function enterVars(transition: SceneConfig["transition"], depth: number): gsap.TweenVars {
  switch (transition) {
    case "pull-back":
      return { scale: 1.22, y: depth * 34, opacity: 0 };
    case "zoom-through":
      return { scale: 0.9, y: depth * 46, opacity: 0 };
    case "mask-wipe":
      return { clipPath: "inset(0% 0% 100% 0%)", y: depth * 30, opacity: 0.35 };
    case "iris":
      return { clipPath: "circle(0% at 50% 56%)", opacity: 0, scale: 1.08 };
    case "layer-parallax":
      return { y: depth * 40, opacity: 0 };
    case "pan-up":
    default:
      return { y: depth * 58, opacity: 0 };
  }
}

/** Nilai akhir saat konten berada di tengah fokus. */
const REST_VARS: gsap.TweenVars = {
  scale: 1,
  y: 0,
  opacity: 1,
  clipPath: "inset(0% 0% 0% 0%)",
};

/** Nilai keluar saat konten ditinggalkan (kamera melanjutkan perjalanan). */
function exitVars(transition: SceneConfig["transition"], depth: number): gsap.TweenVars {
  switch (transition) {
    case "zoom-through":
      return { scale: 1.2, y: -depth * 40, opacity: 0 };
    case "pull-back":
      return { scale: 0.94, y: -depth * 30, opacity: 0 };
    case "mask-wipe":
      return { clipPath: "inset(100% 0% 0% 0%)", y: -depth * 24, opacity: 0.2 };
    case "iris":
      return { clipPath: "circle(0% at 50% 44%)", opacity: 0 };
    default:
      return { scale: 1.04, y: -depth * 34, opacity: 0 };
  }
}

/* --- Fase konten pada adegan pin (tiga babak) ----------------------------- */
function buildPinnedContent(parts: SceneParts, cfg: SceneConfig, timeline: gsap.core.Timeline): void {
  if (!parts.content) return;
  const depth = cfg.depth ?? 1;
  const targets = revealTargets(parts.content);
  const isContentTarget = targets.length === 1 && targets[0] === parts.content;

  // Babak 1 — judul/konten masuk.
  timeline.fromTo(
    parts.content,
    enterVars(cfg.transition, depth),
    { ...REST_VARS, duration: 1, ease: "power2.out" },
    0,
  );

  // Babak 2 — elemen [data-reveal] terungkap berurutan.
  if (!isContentTarget) {
    timeline.fromTo(
      targets,
      { y: depth * 46, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.5, ease: "power2.out" },
      0.6,
    );
  }

  // Babak 3 — kamera menjauh, konten memudar menuju bab berikutnya.
  timeline.to(
    parts.content,
    { scale: 1.05, y: -depth * 30, opacity: 0.12, duration: 1, ease: "power1.in" },
    1.7,
  );
}

/* --- Wash transisi antarbab (kontinuitas visual) --------------------------- */
function buildWash(parts: SceneParts, isStart: boolean, isEnd: boolean, pin: boolean): void {
  if (!parts.wash) return;
  const cover = { yPercent: 0 };

  if (isStart) {
    // Bab baru: wash tertutup lalu tersapu keluar membuka adegan.
    gsap.fromTo(
      parts.wash,
      { yPercent: 0 },
      {
        yPercent: -101,
        ease: "none",
        scrollTrigger: {
          trigger: parts.section,
          start: pin ? "top top" : "top bottom",
          end: pin ? "top+=30% top" : "top 55%",
          scrub: 0.6,
        },
      },
    );
  } else {
    // Pastikan wash tidak menutup bila bukan awal bab.
    gsap.set(parts.wash, { yPercent: 101 });
  }

  if (isEnd) {
    // Akhir bab: wash menutup layar menuju bab berikutnya.
    gsap.fromTo(
      parts.wash,
      { yPercent: 101 },
      {
        ...cover,
        ease: "none",
        immediateRender: !isStart,
        scrollTrigger: {
          trigger: parts.section,
          start: pin ? "bottom-=30% bottom" : "bottom 70%",
          end: pin ? "bottom bottom" : "bottom top",
          scrub: 0.6,
        },
      },
    );
  }
}

/* --- Entry point ----------------------------------------------------------- */

/**
 * Membangun seluruh animasi satu adegan. `isChapterStart/End` menentukan wash
 * transisi; `accentColor` diset pada wash via inline style di komponen.
 */
export function buildScene(
  section: HTMLElement,
  cfg: SceneConfig,
  isChapterStart: boolean,
  isChapterEnd: boolean,
): void {
  const parts: SceneParts = {
    section,
    bg: section.querySelector<HTMLElement>(".slide__bg"),
    content: section.querySelector<HTMLElement>(".slide__content"),
    accent: section.querySelector<HTMLElement>(".slide__accent"),
    wash: section.querySelector<HTMLElement>(".slide__wash"),
  };

  const pin = cfg.mode === "pin";
  const depth = cfg.depth ?? 1;

  buildBackground(parts, cfg, pin);
  buildAccent(parts, cfg, pin);
  buildWash(parts, isChapterStart, isChapterEnd, pin);

  if (!parts.content) return;

  if (pin) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: parts.section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    buildPinnedContent(parts, cfg, timeline);
    return;
  }

  // Adegan mengalir: reveal masuk lalu keluar (dua tween terpisah agar reverse mulus).
  const targets = revealTargets(parts.content);
  const isContentTarget = targets.length === 1 && targets[0] === parts.content;

  const fromState = enterVars(cfg.transition, depth);
  const toState = { ...REST_VARS };

  if (isContentTarget) {
    gsap.fromTo(parts.content, fromState, {
      ...toState,
      ease: "none",
      scrollTrigger: { trigger: parts.section, start: "top bottom", end: "top 34%", scrub: 0.6 },
    });
  } else {
    gsap.fromTo(
      targets,
      { ...fromState, y: depth * 42, opacity: 0 },
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.45, ease: "none", scrollTrigger: { trigger: parts.section, start: "top bottom", end: "top 30%", scrub: 0.7 } },
    );
    gsap.fromTo(parts.content, { clipPath: fromState.clipPath ?? "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: parts.section, start: "top bottom", end: "top 34%", scrub: 0.6 } });
  }

  // Keluar: konten menjauh & meredup saat halaman ditinggalkan.
  gsap.fromTo(
    parts.content,
    { scale: 1, y: 0, opacity: 1, ...(cfg.transition === "iris" ? { clipPath: "circle(140% at 50% 56%)" } : {}) },
    {
      ...exitVars(cfg.transition, depth),
      ease: "none",
      immediateRender: false,
      scrollTrigger: { trigger: parts.section, start: "bottom 62%", end: "bottom top", scrub: 0.6 },
    },
  );
}

/** Ukur ulang semua trigger (dipakai setelah resize/font termuat). */
export function refreshScenes(): void {
  ScrollTrigger.refresh();
}
