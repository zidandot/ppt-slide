/* =============================================================================
   Chrome.tsx — BILAH NAVIGASI BAWAH + DAFTAR ISI (OVERVIEW).
   -----------------------------------------------------------------------------
   Berisi:
     • tombol "Awal" (home) — kembali ke halaman 1;
     • tombol atas (↑) dan bawah (↓) — pindah satu halaman dengan mulus;
     • penghitung halaman "03 / 26" + label bab;
     • bilah progres tipis di dasar layar;
     • tombol "Daftar Isi" yang membuka grid 26 halaman (dapat diklik).
   ========================================================================== */

import { useState } from "react";

export interface ChromeItem {
  id: string;
  number: number;
  label: string;
  section: string;
}

interface ChromeProps {
  items: ChromeItem[];
  index: number;
  progress: number;
  onPrev: () => void;
  onNext: () => void;
  onGo: (index: number) => void;
  onHome: () => void;
}

export default function Chrome({
  items,
  index,
  progress,
  onPrev,
  onNext,
  onGo,
  onHome,
}: ChromeProps) {
  const [overviewOpen, setOverviewOpen] = useState(false);
  const total = items.length;
  const current = items[index];

  const goAndClose = (target: number) => {
    setOverviewOpen(false);
    onGo(target);
  };

  return (
    <>
      <div className="chrome" role="navigation" aria-label="Navigasi halaman">
        <div className="chrome__bar">
          <button type="button" className="chrome__btn" onClick={onHome} aria-label="Ke halaman awal">
            ⌂
          </button>
          <button
            type="button"
            className="chrome__btn"
            onClick={onPrev}
            disabled={index === 0}
            aria-label="Halaman sebelumnya"
          >
            ↑
          </button>

          <span className="chrome__counter" aria-live="polite">
            <b>{String(index + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
          </span>

          <span className="chrome__divider" aria-hidden="true" />
          <span className="chrome__label" title={`${current.section} — ${current.label}`}>
            {current.section} — {current.label}
          </span>
          <span className="chrome__divider" aria-hidden="true" />

          <button
            type="button"
            className="chrome__btn"
            onClick={onNext}
            disabled={index === total - 1}
            aria-label="Halaman berikutnya"
          >
            ↓
          </button>
          <button
            type="button"
            className="chrome__btn"
            onClick={() => setOverviewOpen(true)}
            aria-label="Buka daftar isi"
          >
            Daftar
          </button>
        </div>

        <div className="chrome__progress" aria-hidden="true">
          <div
            className="chrome__progress-fill"
            style={{ transform: `scaleX(${Math.min(1, Math.max(0, progress))})` }}
          />
        </div>
      </div>

      {overviewOpen ? (
        <div className="overview" role="dialog" aria-modal="true" aria-label="Daftar isi presentasi">
          <div className="overview__head">
            <div>
              <p className="eyebrow" style={{ color: "var(--aruna-ember)" }}>
                Daftar Isi
              </p>
              <h2 className="h-scene" style={{ color: "var(--aruna-cream)" }}>
                {total} Halaman
              </h2>
            </div>
            <button
              type="button"
              className="chrome__btn"
              onClick={() => setOverviewOpen(false)}
              aria-label="Tutup daftar isi"
            >
              Tutup ✕
            </button>
          </div>

          <div className="overview__grid">
            {items.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                className="overview__item"
                aria-current={itemIndex === index}
                onClick={() => goAndClose(itemIndex)}
              >
                <span className="overview__no">{String(item.number).padStart(2, "0")}</span>
                <span className="overview__name">{item.label}</span>
                <span className="text-[0.66rem] uppercase tracking-[0.14em] text-cream/60">
                  {item.section}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
