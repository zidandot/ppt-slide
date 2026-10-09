/* =============================================================================
   MetricCounter.tsx — ANGKA YANG BERHITUNG SAAT MASUK LAYAR.
   -----------------------------------------------------------------------------
   Nilai akhir SELALU sama persis dengan sumber (diambil dari `to` + format).
   Animasi hanya kosmetik menuju nilai final; ketika selesai, angka dikunci ke
   nilai sumber sehingga tidak ada pembulatan yang mengubah informasi.

   Tanpa animasi (reduced motion / JS gagal) angka final langsung tampil karena
   sudah dirender pada markup awal.
   ========================================================================== */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/motion";

interface MetricCounterProps {
  /** Nilai akhir (angka asli). */
  to: number;
  /** Jumlah desimal (mis. 1 untuk 61,8). */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

const prefersReduced = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Format angka gaya Indonesia: pemisah ribuan titik, desimal koma. */
export function formatId(value: number, decimals = 0): string {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function MetricCounter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 1.5,
}: MetricCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${formatId(to, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced()) {
      el.textContent = finalText;
      return;
    }

    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: to,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${formatId(state.value, decimals)}${suffix}`;
      },
      onComplete: () => {
        // Kunci ke nilai sumber secara persis.
        el.textContent = finalText;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, decimals, prefix, suffix, duration, finalText]);

  return (
    <span ref={ref} className={className} aria-label={finalText}>
      {finalText}
    </span>
  );
}

/** Menyegarkan ScrollTrigger setelah font/gambar (dipakai modul lain). */
export function refreshCounters(): void {
  ScrollTrigger.refresh();
}
