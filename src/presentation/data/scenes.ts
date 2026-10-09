/* =============================================================================
   SCENES.TS — KONFIGURASI ADEGAN SINEMATIK TERPUSAT.
   -----------------------------------------------------------------------------
   Di sinilah "koreografi kamera" seluruh website diatur: jenis transisi,
   panjang pin, rentang zoom, dan kedalaman parallax per halaman. Semua
   komponen animasi membaca konfigurasi ini — tidak ada nilai animasi yang
   ditulis ad-hoc di dalam komponen isi.

   Ubah angka di file ini untuk mengubah rasa gerak website tanpa menyentuh
   isi presentasi.
   ========================================================================== */

import type { AnimPreset, SceneConfig, Slide } from "../types";

/** Nilai default per preset lama, agar slide lama tetap punya arti. */
const PRESET_DEFAULTS: Record<AnimPreset, SceneConfig> = {
  cinematic: { mode: "pin", transition: "pull-back", pinLength: 1.5, zoom: [1.45, 1.06], depth: 1.2 },
  zoom: { mode: "flow", transition: "zoom-through", zoom: [1.28, 1.12], depth: 1 },
  "mask-reveal": { mode: "flow", transition: "mask-wipe", zoom: [1.16, 1.06], depth: 0.9 },
  parallax: { mode: "flow", transition: "layer-parallax", zoom: [1.1, 1.1], depth: 1.3 },
  slide: { mode: "flow", transition: "pan-up", zoom: [1.14, 1.06], depth: 1 },
  fade: { mode: "flow", transition: "iris", zoom: [1.2, 1.08], depth: 1 },
  none: { mode: "flow", transition: "pan-up", zoom: [1, 1], depth: 0 },
};

/**
 * Penyetelan khusus per halaman agar setiap adegan terasa berbeda. Hanya
 * sebagian properti yang perlu ditulis; sisanya mewarisi default preset.
 */
const SCENE_BY_ID: Record<string, Partial<SceneConfig>> = {
  /* Bab 1 — Pembuka & tim */
  cover: { mode: "pin", transition: "pull-back", pinLength: 1.9, zoom: [1.6, 1.04], depth: 1.5 },
  team: { mode: "flow", transition: "mask-wipe", zoom: [1.14, 1.12], depth: 1.2 },
  "our-cv": { mode: "flow", transition: "pan-up", depth: 1 },
  "five-forces": { mode: "pin", transition: "layer-parallax", pinLength: 1.9, zoom: [1.12, 1.22], depth: 1.6 },
  inventory: { mode: "flow", transition: "zoom-through", zoom: [1.3, 1.08], depth: 1.1 },

  /* Bab 2 — Tema & wilayah */
  tema: { mode: "pin", transition: "pull-back", pinLength: 2.1, zoom: [1.4, 1.08], depth: 1.3 },
  region: { mode: "pin", transition: "layer-parallax", pinLength: 2.0, zoom: [1.08, 1.24], depth: 1.6 },

  /* Bab 3 — Akar masalah */
  "problem-tree": { mode: "pin", transition: "mask-wipe", pinLength: 2.4, zoom: [1.18, 1.0], depth: 1.2 },

  /* Bab 4 — Enam program & identitas */
  portfolio: { mode: "pin", transition: "iris", pinLength: 2.2, zoom: [1.23, 1.0], depth: 1.3 },
  logo: { mode: "pin", transition: "zoom-through", pinLength: 1.8, zoom: [1.5, 0.96], depth: 1.5 },
  "logo-philosophy": { mode: "pin", transition: "layer-parallax", pinLength: 1.7, zoom: [1.14, 1.22], depth: 1.4 },
  framework: { mode: "pin", transition: "pan-up", pinLength: 1.6, zoom: [1.16, 1.12], depth: 1.1 },

  /* Bab 5 — Rancangan program */
  "program-design": { mode: "pin", transition: "mask-wipe", pinLength: 1.9, zoom: [1.16, 1.04], depth: 1.2 },

  /* Bab 6 — BioLoka & Jejak */
  bioloka: { mode: "flow", transition: "pan-up", depth: 1.1 },
  "bioloka-indicators": { mode: "flow", transition: "zoom-through", zoom: [1.3, 1.06], depth: 1.2 },
  "jejak-visual": { mode: "pin", transition: "pull-back", pinLength: 1.9, zoom: [1.45, 1.02], depth: 1.5 },
  jejak: { mode: "flow", transition: "layer-parallax", depth: 1.2 },
  "jejak-indicators": { mode: "pin", transition: "layer-parallax", pinLength: 1.8, zoom: [1.12, 1.22], depth: 1.5 },

  /* Bab 7 — EcoHero & VCO */
  ecohero: { mode: "pin", transition: "layer-parallax", pinLength: 1.7, zoom: [1.12, 1.2], depth: 1.4 },
  "ecohero-indicators": { mode: "flow", transition: "pan-up", depth: 1.1 },
  vco: { mode: "pin", transition: "layer-parallax", pinLength: 1.7, zoom: [1.12, 1.2], depth: 1.4 },
  "vco-indicators": { mode: "flow", transition: "zoom-through", zoom: [1.28, 1.06], depth: 1.2 },

  /* Bab 8 — Kemitraan & penutup */
  partnership: { mode: "pin", transition: "mask-wipe", pinLength: 2.4, zoom: [1.16, 1.0], depth: 1.2 },
  sponsors: { mode: "pin", transition: "pan-up", pinLength: 1.7, zoom: [1.1, 1.16], depth: 1 },
  budget: { mode: "pin", transition: "iris", pinLength: 2.1, zoom: [1.18, 1.0], depth: 1.2 },
  closing: { mode: "pin", transition: "pull-back", pinLength: 2.0, zoom: [1.5, 1.0], depth: 1.6 },
};

/** Gabungkan default preset dengan override per id menjadi konfigurasi utuh. */
export function resolveScene(slide: Slide): SceneConfig {
  const base = PRESET_DEFAULTS[slide.animation] ?? PRESET_DEFAULTS.zoom;
  const override = SCENE_BY_ID[slide.id] ?? {};
  return { ...base, ...override };
}
