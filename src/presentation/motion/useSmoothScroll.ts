/* =============================================================================
   useSmoothScroll.ts — LENIS + GSAP/SCROLLTRIGGER.
   -----------------------------------------------------------------------------
   Mengaktifkan smooth scrolling native-friendly (Lenis) dan menyinkronkannya
   dengan ScrollTrigger:
     • setiap frame Lenis dijalankan lewat gsap.ticker (satu loop, tanpa lag);
     • setiap peristiwa scroll Lenis memanggil ScrollTrigger.update();
     • lagSmoothing dimatikan agar scrub tetap presisi.
   Preferensi "prefers-reduced-motion" dihormati: Lenis tidak dibuat dan gulir
   kembali ke perilaku native. Tidak ada scroll-jacking — roda, sentuh, dan
   keyboard tetap berfungsi normal.
   ========================================================================== */

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../../lib/motion";

/** Instance aktif (dipakai navigasi untuk scrollTo tanpa prop drilling). */
let activeLenis: Lenis | null = null;

/** Mengembalikan Lenis aktif, atau null bila native scroll / reduced motion. */
export function getLenis(): Lenis | null {
  return activeLenis;
}

/**
 * Menggulir ke elemen berdasarkan id dengan Lenis bila tersedia, atau
 * scrollIntoView bila tidak. Dipakai tombol navigasi & menu bab.
 */
export function scrollToId(id: string, immediate = false): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (activeLenis) {
    activeLenis.scrollTo(el, {
      offset: 0,
      immediate,
      duration: immediate ? 0 : 1.15,
    });
    return;
  }

  el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
}

export function useSmoothScroll(): void {
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      activeLenis = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Roda tetap responsif; sentuh sedikit lebih cepat agar tidak "berat" di HP.
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
      // Biarkan browser menangani anchor & fokus.
      anchors: false,
    });
    activeLenis = lenis;

    // Satu loop animasi untuk Lenis + GSAP.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Sinkronkan ScrollTrigger setiap Lenis bergerak.
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // Ukur ulang setelah font/gambar termuat.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if ("fonts" in document && document.fonts) void document.fonts.ready.then(refresh);
    const settle = window.setTimeout(refresh, 400);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      activeLenis = null;
      window.removeEventListener("load", refresh);
      window.clearTimeout(settle);
    };
  }, []);
}
