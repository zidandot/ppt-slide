/* =============================================================================
   useSlideNavigation.ts — NAVIGASI 26 HALAMAN.
   -----------------------------------------------------------------------------
   Menyediakan:
     • index       : halaman aktif (0..25) — dilacak lewat IntersectionObserver;
     • progress    : 0..1 posisi gulir dokumen (untuk bilah progres);
     • goTo/next/prev/home : berpindah halaman dengan gulir mulus;
     • dukungan keyboard (Panah Atas/Bawah, Page Up/Down, Home/End, spasi);
     • sinkronisasi URL hash (#cover, #team, ...) dua arah.
   ========================================================================== */

import { useCallback, useEffect, useState } from "react";

export function useSlideNavigation(ids: string[]) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /* --- Pindah ke halaman tertentu ---------------------------------------- */
  const goTo = useCallback(
    (target: number) => {
      if (ids.length === 0) return;
      const clamped = Math.max(0, Math.min(ids.length - 1, target));
      const el = document.getElementById(ids[clamped]);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${ids[clamped]}`);
      setIndex(clamped);
    },
    [ids],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const home = useCallback(() => goTo(0), [goTo]);

  /* --- Pantau halaman aktif lewat IntersectionObserver -------------------- */
  useEffect(() => {
    if (ids.length === 0 || typeof IntersectionObserver === "undefined") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1;
        let bestRatio = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          const value = Number(target.dataset.slideIndex ?? "-1");
          if (value >= 0 && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIndex = value;
          }
        }
        if (bestIndex >= 0) setIndex(bestIndex);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -20% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  /* --- Progres gulir ------------------------------------------------------ */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* --- Keyboard ----------------------------------------------------------- */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
        case " ":
          event.preventDefault();
          next();
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          prev();
          break;
        case "Home":
          event.preventDefault();
          home();
          break;
        case "End":
          event.preventDefault();
          goTo(ids.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, home, goTo, ids.length]);

  /* --- Hash masuk & perubahan hash ---------------------------------------- */
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace("#", "");
      const target = ids.indexOf(id);
      if (target >= 0) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
        setIndex(target);
      }
    };

    // Terapkan hash awal setelah tata letak siap.
    const timer = window.setTimeout(applyHash, 120);
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", applyHash);
    };
  }, [ids]);

  return { index, progress, goTo, next, prev, home };
}
