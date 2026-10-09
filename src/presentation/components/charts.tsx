/* =============================================================================
   charts.tsx — VISUALISASI DATA BERBASIS SVG/CSS.
   -----------------------------------------------------------------------------
   Diagram dibuat ulang sebagai SVG/HTML (bukan sekadar gambar) supaya:
     • tajam di semua ukuran layar;
     • teks di dalamnya dapat dibaca mesin & screen reader;
     • mudah diubah datanya.
   ========================================================================== */

export interface DonutDatum {
  label?: string;
  value: number;
  color: string;
}

/**
 * Diagram donat SVG. Nilai dirender sebagai potongan berdasarkan proporsi.
 * `centerTitle`/`centerSubtitle` mengisi bagian tengah donat.
 */
export function DonutChart({
  data,
  size = 300,
  thickness = 46,
  centerTitle,
  centerSubtitle,
}: {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  centerTitle?: string;
  centerSubtitle?: string;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  // Hitung offset tiap potongan secara murni (tanpa mutasi variabel saat render).
  const segments = data.map((datum, index) => {
    const length = (datum.value / total) * circumference;
    const precedingValue = data
      .slice(0, index)
      .reduce((sum, item) => sum + item.value, 0);
    const offset = (precedingValue / total) * circumference;

    return (
      <circle
        key={`${datum.label ?? "slice"}-${index}`}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={datum.color}
        strokeWidth={thickness}
        strokeDasharray={`${length} ${circumference - length}`}
        strokeDashoffset={-offset}
        strokeLinecap="butt"
      />
    );
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      role="img"
      aria-label={data
        .map((d) => `${d.label ?? "bagian"}: ${d.value}%`)
        .join(", ")}
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>{segments}</g>
      {centerTitle ? (
        <>
          <text
            x="50%"
            y="47%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current font-display"
            fontSize={size * 0.14}
          >
            {centerTitle}
          </text>
          {centerSubtitle ? (
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current opacity-70"
              fontSize={size * 0.05}
            >
              {centerSubtitle}
            </text>
          ) : null}
        </>
      ) : null}
    </svg>
  );
}
