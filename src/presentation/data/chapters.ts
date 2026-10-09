/* =============================================================================
   CHAPTERS.TS — 11 BAB NARATIF.
   -----------------------------------------------------------------------------
   Mengelompokkan 26 halaman PDF menjadi 11 bab agar perjalanan gulir terasa
   sebagai cerita, bukan tumpukan slide. Pengelompokan TIDAK menghilangkan isi:
   setiap halaman tetap dirender penuh. Bab hanya dipakai untuk indikator,
   menu, dan transisi antarbab (wash & continuity).
   ========================================================================== */

import type { Chapter } from "../types";

export const CHAPTERS: Chapter[] = [
  { number: 1, id: "pembuka", title: "Pembuka", accent: "#FC5C0D", fromId: "cover", toId: "cover" },
  { number: 2, id: "tim", title: "Tim & Kredibilitas", accent: "#0C988D", fromId: "team", toId: "inventory" },
  { number: 3, id: "tema-wilayah", title: "Tema & Wilayah", accent: "#1F880B", fromId: "tema", toId: "region" },
  { number: 4, id: "akar-masalah", title: "Akar Masalah", accent: "#FC5C0D", fromId: "problem-tree", toId: "problem-tree" },
  { number: 5, id: "enam-program", title: "Enam Program Unggulan", accent: "#FD9F15", fromId: "portfolio", toId: "portfolio" },
  { number: 6, id: "identitas", title: "Identitas & Kerangka", accent: "#0C988D", fromId: "logo", toId: "framework" },
  { number: 7, id: "rancangan", title: "Rancangan Program", accent: "#FD9F15", fromId: "program-design", toId: "program-design" },
  { number: 8, id: "bioloka-jejak", title: "BioLoka & Jejak Tegallalang", accent: "#087D74", fromId: "bioloka", toId: "jejak-indicators" },
  { number: 9, id: "ecohero-vco", title: "EcoHero & VCO", accent: "#1F880B", fromId: "ecohero", toId: "vco-indicators" },
  { number: 10, id: "kemitraan", title: "Kemitraan & Pendanaan", accent: "#FC5C0D", fromId: "partnership", toId: "sponsors" },
  { number: 11, id: "anggaran-penutup", title: "Anggaran & Penutup", accent: "#FD9F15", fromId: "budget", toId: "closing" },
];

export const TOTAL_CHAPTERS = CHAPTERS.length;

/** Bab yang memuat sebuah slide (berdasarkan id). */
export function chapterForSlide(slideId: string): Chapter | undefined {
  return CHAPTERS.find((chapter) => {
    const start = slideIdIndex(chapter.fromId);
    const end = slideIdIndex(chapter.toId);
    const current = slideIdIndex(slideId);
    return current >= start && current <= end;
  });
}

/** Indeks urutan id slide; -1 bila tidak dikenal. */
function slideIdIndex(id: string): number {
  return CHAPTERS_SLIDE_ORDER.indexOf(id);
}

/**
 * Urutan id slide 1..26. Dipakai untuk memetakan slide→bab tanpa mengimpor
 * data presentasi (menghindari ketergantungan melingkar).
 */
export const CHAPTERS_SLIDE_ORDER: string[] = [
  "cover",
  "team",
  "our-cv",
  "five-forces",
  "inventory",
  "tema",
  "region",
  "problem-tree",
  "portfolio",
  "logo",
  "logo-philosophy",
  "framework",
  "program-design",
  "bioloka",
  "bioloka-indicators",
  "jejak-visual",
  "jejak",
  "jejak-indicators",
  "ecohero",
  "ecohero-indicators",
  "vco",
  "vco-indicators",
  "partnership",
  "sponsors",
  "budget",
  "closing",
];
