/* =============================================================================
   INTERLUDES.TS — GALERI HORIZONTAL 3D ANTARBAB.
   -----------------------------------------------------------------------------
   Semua gambar di sini berasal dari hasil ekstraksi PDF asli (tidak ada foto
   stok atau dokumentasi rekaan). Interlude adalah jembatan visual antarbab:
   galeri digerakkan horizontal oleh progres gulir vertikal dengan perspektif
   3D. Karena hanya memakai foto/logo sumber, tidak ada isi presentasi yang
   diganti atau dihilangkan.
   ========================================================================== */

import type { FigureRef } from "../types";
import { ASSETS, SPONSOR_LOGOS } from "./assets";

export interface Interlude {
  /** Interlude tampil tepat setelah slide dengan id ini. */
  afterId: string;
  kicker: string;
  title: string;
  accent: string;
  note?: string;
  figureAspect: string;
  figures: FigureRef[];
}

const photo = (src: string, alt: string, caption?: string): FigureRef => ({
  src,
  alt,
  caption,
  fit: "cover",
});

export const INTERLUDES: Interlude[] = [
  {
    afterId: "inventory",
    kicker: "Bab 02 · Galeri",
    title: "Wajah Tim Aruna",
    accent: "#0C988D",
    figureAspect: "4 / 5",
    note: "Kolase foto & elemen dari halaman 1–5 deck asli.",
    figures: [
      photo(ASSETS.coverPhoto, "Visual sampul Aruna", "Halaman 1 — Sampul"),
      photo(ASSETS.teamGroup, "Kebersamaan tim Aruna", "Halaman 2 — Tim"),
      photo(ASSETS.teamCv, "Komposisi profil tim (Our CV)", "Halaman 3 — Our CV"),
      photo(ASSETS.inventoryCamera, "Kamera Sony Alpha A7 Mark", "Halaman 5 — Inventaris"),
      photo(ASSETS.regionPhoto, "Lanskap wilayah Tegallalang", "Halaman 7 — Wilayah"),
    ],
  },
  {
    afterId: "problem-tree",
    kicker: "Bab 03 · Galeri",
    title: "Dari Potensi ke Program",
    accent: "#FC5C0D",
    figureAspect: "4 / 5",
    note: "Visual program unggulan dari halaman 14–22 deck asli.",
    figures: [
      photo(ASSETS.biolokaHero, "Dokumentasi program BioLoka", "BioLoka"),
      photo(ASSETS.jejakPhoto, "Dokumentasi Jejak Tegallalang", "Jejak Tegallalang"),
      photo(ASSETS.ecoheroHero, "Dokumentasi program EcoHero", "EcoHero"),
      photo(ASSETS.vcoHero, "Dokumentasi program VCO", "Virgin Coconut Oil"),
      photo(ASSETS.biolokaTool1, "Alat pendukung BioLoka", "BioLoka — Alat"),
      photo(ASSETS.ecoheroTool1, "Alat pendukung EcoHero", "EcoHero — Alat"),
    ],
  },
  {
    afterId: "jejak-indicators",
    kicker: "Bab 08 · Galeri",
    title: "Jejak Tegallalang di Layar",
    accent: "#087D74",
    figureAspect: "3 / 4",
    note: "Tangkapan visual produk website dari halaman 16–18 deck asli.",
    figures: [
      photo(ASSETS.jejakHero, "Visual produk website Jejak Tegallalang", "Halaman 16"),
      photo(ASSETS.jejakSite1, "Tampilan website Jejak Tegallalang", "Halaman 18"),
      photo(ASSETS.jejakSite2, "Tampilan website Jejak Tegallalang", "Halaman 18"),
    ],
  },
  {
    afterId: "sponsors",
    kicker: "Bab 10 · Galeri",
    title: "Jaringan Sponsor & Mitra Media",
    accent: "#FC5C0D",
    figureAspect: "3 / 2",
    note: "Logo ditampilkan apa adanya dari halaman 24 deck asli; tanpa klaim keterkaitan brand.",
    figures: SPONSOR_LOGOS.map((src, index) => ({
      src,
      alt: `Logo sponsor atau media partner ${index + 1} dari halaman 24`,
      fit: "contain" as const,
      aspect: "3 / 2",
    })),
  },
];
