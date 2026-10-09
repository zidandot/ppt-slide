/* =============================================================================
   SlideBackground.tsx — LATAR SETIAP HALAMAN.
   -----------------------------------------------------------------------------
   Menampilkan gambar latar (bila ada) + warna dasar + overlay gradien untuk
   menjaga keterbacaan teks. Posisi fokus (object-position) diambil dari data.
   Elemen pembungkus (.slide__bg) dianimasikan zoom/parallax oleh useScrollScene.
   ========================================================================== */

import type { Slide } from "../types";

export default function SlideBackground({
  slide,
  eager = false,
}: {
  slide: Slide;
  eager?: boolean;
}) {
  const { image, color, overlay, position } = slide.background;

  return (
    <>
      <div className="slide__bg" aria-hidden="true">
        {image ? (
          <img
            src={image}
            alt=""
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : "low"}
            style={{ objectPosition: position ?? "50% 50%" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: color }} />
        )}
      </div>
      <div
        className="slide__overlay"
        aria-hidden="true"
        style={{ background: overlay ?? color }}
      />
    </>
  );
}
