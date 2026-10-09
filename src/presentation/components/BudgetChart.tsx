/* =============================================================================
   BudgetChart.tsx — RAB: ANGKA BERHITUNG + DIAGRAM PEMASUKAN BERANIMASI.
   -----------------------------------------------------------------------------
   Nominal rupiah dianimasikan naik lalu DIKUNCI ke nilai sumber (lihat
   MetricCounter), sehingga angka final sama persis dengan PDF. Komposisi
   pemasukan ditampilkan sebagai bar bertumpuk dengan label persen jelas.
   ========================================================================== */

import type { BudgetContent } from "../types";
import { MetricCounter } from "./MetricCounter";

const INCOME_COLORS = ["#FC5C0D", "#0C988D", "#FD9F15"];

/** Mengubah "Rp18.824.000" menjadi angka 18824000. */
export function parseRupiah(value: string): number {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

export default function BudgetChart({ data }: { data: BudgetContent }) {
  const totalIncome = data.income.reduce((sum, item) => sum + item.percent, 0) || 1;

  return (
    <div className="budget">
      <div className="budget__expenses">
        <p className="budget__heading">Rincian Anggaran</p>
        {data.programKerja.map((item, index) => (
          <div className="budget__row" data-reveal key={`${item.label}-${index}`}>
            <span className="budget__idx">{String(index + 1).padStart(2, "0")}</span>
            <span className="budget__label">{item.label}</span>
            <MetricCounter className="budget__value" prefix="Rp" to={parseRupiah(item.value)} />
          </div>
        ))}
      </div>

      <div className="budget__income">
        <p className="budget__heading">Komposisi Pemasukan</p>
        <div className="budget__bar" role="img" aria-label="Komposisi pemasukan dana">
          {data.income.map((item, index) => (
            <span
              key={item.label}
              className="budget__seg"
              style={{
                width: `${(item.percent / totalIncome) * 100}%`,
                background: INCOME_COLORS[index % INCOME_COLORS.length],
              }}
            >
              <span className="budget__segvalue">
                <MetricCounter to={item.percent} suffix="%" />
              </span>
            </span>
          ))}
        </div>
        <ul className="budget__legend">
          {data.income.map((item, index) => (
            <li className="budget__legenditem" key={item.label} data-reveal>
              <span
                className="budget__dot"
                style={{ background: INCOME_COLORS[index % INCOME_COLORS.length] }}
                aria-hidden="true"
              />
              <span className="budget__legendlabel">{item.label}</span>
              <span className="budget__legendvalue">{item.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
