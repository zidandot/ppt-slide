/* =============================================================================
   HorizontalGallery.tsx — GALERI HORIZONTAL 3D YANG DIKENDALIKAN GULIR.
   -----------------------------------------------------------------------------
   Panel gambar bergerak horizontal mengikuti progres gulir vertikal, dengan
   perspektif 3D: panel yang menjauh dari pusat berputar (rotateY), mengecil,
   dan surut ke belakang (translateZ). Di layar kecil / reduced-motion, galeri
   jatuh ke gulir horizontal native (overflow-x) agar tidak menyulitkan.

   Semua gambar berasal dari hasil ekstraksi PDF (lihat data/interludes.ts).
   ========================================================================== */

import { useEffect, useRef } from "react";
import type { FigureRef } from "../types";
import { gsap, ScrollTrigger } from "../../lib/motion";

const prefersReduced = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface HorizontalGalleryProps {
  figures: FigureRef[];
  /** Rasio aspek panel, mis. "4 / 5". */
  aspect?: string;
  /** Warna aksen bayangan/garis. */
  accent?: string;
  ariaLabel?: string;
}

export default function HorizontalGallery({
  figures,
  aspect = "4 / 5",
  accent = "#FC5C0D",
  ariaLabel = "Galeri gambar",
}: HorizontalGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const span = Math.min(4.4, 1 + figures.length * 0.5);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReduced()) return;

    const viewport = root.querySelector<HTMLElement>(".gallery__viewport");
    const track = root.querySelector<HTMLElement>(".gallery__track");
    if (!viewport || !track) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>(".gallery__panel"));
    const mm = gsap.matchMedia();

    // Hanya di layar lebar: pin (sticky) + gerak horizontal 3D.
    mm.add("(min-width: 768px)", () => {
      const setX = gsap.quickSetter(track, "x", "px");

      const update = (progress: number) => {
        const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
        const x = -distance * progress;
        setX(x);

        const vw = viewport.clientWidth;
        for (const panel of panels) {
          const center = panel.offsetLeft + panel.offsetWidth / 2 + x;
          const relative = (center - vw / 2) / vw; // 0 = tengah
          const rotateY = gsap.utils.clamp(-17, 17, relative * 32);
          const scale = 1 - Math.min(0.26, Math.abs(relative) * 0.28);
          const z = -Math.abs(relative) * 190;
          const opacity = 1 - Math.min(0.6, Math.abs(relative) * 0.55);
          gsap.set(panel, { rotateY, scale, z, opacity, transformPerspective: 1500 });
        }
      };

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      });
      update(0);
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [figures]);

  return (
    <div
      ref={rootRef}
      className="gallery"
      style={{ "--gallery-span": span, "--gallery-accent": accent } as React.CSSProperties}
      aria-label={ariaLabel}
    >
      <div className="gallery__viewport">
        <div className="gallery__track">
          {figures.map((figure, index) => (
            <figure className="gallery__panel" key={`${figure.src}-${index}`}>
              <img
                src={figure.src}
                alt={figure.alt}
                loading="lazy"
                decoding="async"
                style={{
                  aspectRatio: figure.aspect ?? aspect,
                  objectFit: figure.fit === "contain" ? "contain" : "cover",
                }}
              />
              {figure.caption ? (
                <figcaption className="gallery__caption">
                  <span className="gallery__index">{String(index + 1).padStart(2, "0")}</span>
                  {figure.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
