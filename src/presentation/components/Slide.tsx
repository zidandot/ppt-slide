/* =============================================================================
   Slide.tsx — SATU HALAMAN PRESENTASI (full-screen).
   -----------------------------------------------------------------------------
   Struktur:
     .slide            → seksi setinggi layar (min 100svh), seamless
       .slide__bg      → gambar latar (dianimasikan oleh useScrollScene)
       .slide__overlay → gradien gelap/terang demi kontras
       .slide__inner   → isi halaman (dari registry konten)
         .slide__number→ nomor halaman besar sebagai elemen desain
   Warna semantik teks/gambar diatur per halaman lewat variabel CSS sesuai
   slide.tone ("dark" = teks terang di atas latar gelap, "light" = sebaliknya).
   ========================================================================== */

import type { CSSProperties, ReactNode } from "react";
import type { Slide as SlideModel, SlideTone } from "../types";
import SlideBackground from "./SlideBackground";

/** Variabel CSS warna untuk tone TERANG (teks gelap). */
const LIGHT_TONE: Record<string, string> = {
  "--color-fg": "#12302f",
  "--color-muted": "#3f5f5a",
  "--color-faint": "#7d928c",
  "--color-line": "rgba(18, 48, 47, 0.18)",
  "--color-surface": "rgba(251, 246, 236, 0.86)",
  "--color-surface2": "#f0e8da",
  "--color-accent": "#1f5b52",
};

/** Variabel CSS warna untuk tone GELAP (teks terang). */
const DARK_TONE: Record<string, string> = {
  "--color-fg": "#f7efe2",
  "--color-muted": "rgba(247, 239, 226, 0.76)",
  "--color-faint": "rgba(247, 239, 226, 0.52)",
  "--color-line": "rgba(247, 239, 226, 0.22)",
  "--color-surface": "rgba(11, 33, 31, 0.55)",
  "--color-surface2": "rgba(11, 33, 31, 0.72)",
  "--color-accent": "#e3cda9",
};

const toneVars = (tone: SlideTone): CSSProperties =>
  (tone === "dark" ? DARK_TONE : LIGHT_TONE) as CSSProperties;

interface SlideProps {
  slide: SlideModel;
  index: number;
  children: ReactNode;
}

export default function Slide({ slide, index, children }: SlideProps) {
  return (
    <section
      id={slide.id}
      className={`slide slide--${slide.tone}`}
      data-anim={slide.animation}
      data-slide-index={index}
      style={toneVars(slide.tone)}
      aria-label={`${slide.title} — ${slide.section}`}
    >
      <SlideBackground slide={slide} eager={index < 2} />

      <div className="slide__inner">
        <span className="slide__number" aria-hidden="true">
          {String(slide.number).padStart(2, "0")}
        </span>
        <div className="slide__content will-reveal">{children}</div>
      </div>
    </section>
  );
}
