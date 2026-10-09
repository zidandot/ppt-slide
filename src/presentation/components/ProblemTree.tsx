/* =============================================================================
   ProblemTree.tsx — POHON MASALAH INTERAKTIF.
   -----------------------------------------------------------------------------
   Menyusun potensi (akar) → penyebab (cabang) → masalah inti (batang) → dampak
   (daun) sebagai satu alur vertikal. Seluruh teks berasal dari data PDF; node
   ditandai [data-reveal] agar terungkap berurutan pada adegan pin.
   ========================================================================== */

import type { ProblemTreeContent } from "../types";

export default function ProblemTree({ data }: { data: ProblemTreeContent }) {
  return (
    <div className="ptree">
      {/* Dampak (di atas) */}
      <section className="ptree__layer ptree__layer--effects" aria-label="Dampak">
        <p className="ptree__label">Dampak</p>
        <ul className="ptree__chips">
          {data.effects.map((effect) => (
            <li className="ptree__chip ptree__chip--effect" data-reveal key={effect}>
              {effect}
            </li>
          ))}
        </ul>
      </section>

      <span className="ptree__trunk" aria-hidden="true" />

      {/* Masalah inti */}
      <section className="ptree__core" data-reveal aria-label="Masalah inti">
        <span className="ptree__eyebrow">Masalah Inti</span>
        <p className="ptree__coretext">{data.core}</p>
      </section>

      <span className="ptree__trunk" aria-hidden="true" />

      {/* Penyebab (cabang) */}
      <section className="ptree__layer" aria-label="Penyebab">
        <p className="ptree__label">Penyebab</p>
        <div className="ptree__causes">
          {data.causes.map((cause, index) => (
            <article className="ptree__cause" data-reveal key={cause.title}>
              <span className="ptree__num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="ptree__causetitle">{cause.title}</h3>
              <ul className="ptree__causelist">
                {cause.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <span className="ptree__trunk" aria-hidden="true" />

      {/* Potensi (akar) */}
      <section className="ptree__layer ptree__layer--potential" aria-label="Potensi daerah">
        <p className="ptree__label">Potensi Daerah · Akar</p>
        <ul className="ptree__chips">
          {data.potential.map((potential) => (
            <li className="ptree__chip ptree__chip--potential" data-reveal key={potential}>
              {potential}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
