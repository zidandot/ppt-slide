/* =============================================================================
   PartnershipMatrix.tsx — MENDELOW'S MATRIX DUA SUMBU.
   -----------------------------------------------------------------------------
   Memetakan stakeholder ke kuadran berdasarkan Kekuatan (power, sumbu Y) dan
   Kepentingan (interest, sumbu X). Seluruh nama stakeholder tetap terbaca
   sebagai chip. Matriks disusun per sumbu agar panel penilai mudah meninjau.
   ========================================================================== */

import type { PartnershipContent } from "../types";

/** Posisi baku kuadran Mendelow. */
const QUADRANT_POSITION: Record<string, { row: 1 | 2; col: 1 | 2; axis: string }> = {
  "Keep Satisfied": { row: 1, col: 1, axis: "Kekuatan tinggi · Kepentingan rendah" },
  "Key Players": { row: 1, col: 2, axis: "Kekuatan tinggi · Kepentingan tinggi" },
  Monitor: { row: 2, col: 1, axis: "Kekuatan rendah · Kepentingan rendah" },
  "Keep Informed": { row: 2, col: 2, axis: "Kekuatan rendah · Kepentingan tinggi" },
};

export default function PartnershipMatrix({ data }: { data: PartnershipContent }) {
  const quadrants = [...data.matrix].sort((a, b) => {
    const pa = QUADRANT_POSITION[a.quadrant] ?? { row: 2, col: 2 };
    const pb = QUADRANT_POSITION[b.quadrant] ?? { row: 2, col: 2 };
    return pa.row - pb.row || pa.col - pb.col;
  });

  return (
    <div className="matrix">
      <div className="matrix__grid">
        <span className="matrix__ylabel" aria-hidden="true">
          Kepentingan →
        </span>
        <span className="matrix__xlabel" aria-hidden="true">
          Kekuatan / Pengaruh ↑
        </span>

        {quadrants.map((quadrant, index) => {
          const position = QUADRANT_POSITION[quadrant.quadrant] ?? { row: 2, col: 2, axis: "" };
          return (
            <article
              className="matrix__cell"
              data-reveal
              key={quadrant.quadrant}
              style={{ gridRow: position.row, gridColumn: position.col }}
              data-axis={position.axis}
            >
              <header className="matrix__head">
                <span className="matrix__no">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="matrix__title">{quadrant.quadrant}</h3>
                <span className="matrix__axis">{position.axis}</span>
              </header>
              <ul className="matrix__chips">
                {quadrant.stakeholders.map((stakeholder) => (
                  <li className="matrix__chip" key={stakeholder}>
                    {stakeholder}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="matrix__caption">
        {[data.paradigma, data.note].filter(Boolean).join(" · ")}
      </p>
    </div>
  );
}
