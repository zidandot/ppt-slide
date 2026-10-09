/* =============================================================================
   Presentation.tsx — ORKESTRATOR PRESENTASI 26 HALAMAN.
   -----------------------------------------------------------------------------
   Menyatukan:
     • seluruh halaman (SLIDES) yang dirender sebagai <Slide> full-screen;
     • isi tiap halaman (SlideBody) sesuai jenis kontennya;
     • <Chrome> — navigasi bawah: home, atas/bawah, penghitung, progres,
       dan daftar isi 26 halaman;
     • hook navigasi (observer, keyboard, hash, progres) & animasi scroll.
   ========================================================================== */

import { useMemo, useRef } from "react";
import { SLIDES } from "./data/slides";
import { useSlideNavigation } from "./hooks/useSlideNavigation";
import { useScrollScene } from "./hooks/useScrollScene";
import Slide from "./components/Slide";
import Chrome, { type ChromeItem } from "./components/Chrome";
import { SlideBody } from "./scenes/registry";

export default function Presentation() {
  const scopeRef = useRef<HTMLDivElement>(null);

  // Daftar id & item navigasi stabil (tidak berubah tiap render).
  const ids = useMemo(() => SLIDES.map((slide) => slide.id), []);
  const items: ChromeItem[] = useMemo(
    () =>
      SLIDES.map((slide) => ({
        id: slide.id,
        number: slide.number,
        label: slide.navLabel,
        section: slide.section,
      })),
    [],
  );

  const { index, progress, goTo, next, prev, home } = useSlideNavigation(ids);
  useScrollScene(scopeRef);

  return (
    <div ref={scopeRef} className="presentation">
      <main>
        {SLIDES.map((slide, slideIndex) => (
          <Slide key={slide.id} slide={slide} index={slideIndex}>
            <SlideBody slide={slide} />
          </Slide>
        ))}
      </main>

      <Chrome
        items={items}
        index={index}
        progress={progress}
        onPrev={prev}
        onNext={next}
        onGo={goTo}
        onHome={home}
      />
    </div>
  );
}
