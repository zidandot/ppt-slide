/* =============================================================================
   scenes/bodies.tsx — ISI SETIAP JENIS HALAMAN (gaya editorial web).
   -----------------------------------------------------------------------------
   Berbeda dari versi "slide" sebelumnya, isi di sini ditata sebagai bagian
   naratif satu halaman: tipografi besar, baris bergaris, dan ruang lega —
   bukan kartu-kartu presentasi. Semua teks tetap berasal dari data PDF
   (src/presentation/data/slides.ts); tidak ada konten yang dikarang.
   ========================================================================== */

import { useState, type ReactNode } from "react";
import type {
  BudgetContent,
  ClosingContent,
  CoverContent,
  DividerContent,
  FigureRef,
  FiveForcesContent,
  FrameworkContent,
  InventoryContent,
  LogoContent,
  LogoPhilosophyContent,
  PartnershipContent,
  PortfolioContent,
  ProblemTreeContent,
  ProgramDesignContent,
  ProgramFeatureContent,
  ProgramIndicatorsContent,
  RegionContent,
  SponsorsContent,
  ThemeContent,
  WordCloudContent,
} from "../types";
import { DonutChart, type DonutDatum } from "../components/charts";

/* --- Primitif editorial --------------------------------------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="h-scene mt-5 max-w-4xl">{children}</h2>;
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="lead mt-6">{children}</p>;
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 max-w-2xl border-l-2 border-line pl-4 text-xs leading-relaxed text-faint">
      {children}
    </p>
  );
}

function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm text-muted">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Row({
  index,
  title,
  children,
}: {
  index: number;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="row">
      <span className="row__idx">{String(index).padStart(2, "0")}</span>
      <div>
        {title ? <h3 className="font-display text-xl text-fg sm:text-2xl">{title}</h3> : null}
        <div className="mt-1.5 text-sm text-muted">{children}</div>
      </div>
    </div>
  );
}

function Media({
  figure,
  aspect = "4 / 3",
  contain = false,
}: {
  figure: FigureRef;
  aspect?: string;
  contain?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ratio = figure.aspect ?? aspect;

  if (failed) {
    return (
      <div
        className="media flex items-center justify-center text-xs text-faint"
        style={{ aspectRatio: ratio }}
      >
        Gambar tidak tersedia
      </div>
    );
  }

  return (
    <figure className="media">
      <img
        src={figure.src}
        alt={figure.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        style={{
          aspectRatio: ratio,
          objectFit: contain || figure.fit === "contain" ? "contain" : "cover",
        }}
      />
      {figure.caption ? (
        <figcaption className="border-t border-line px-4 py-2 text-xs text-faint">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* --- 01 · COVER / HERO ---------------------------------------------------- */
export function CoverScene({ data }: { data: CoverContent }) {
  return (
    <div className="flex min-h-[74vh] flex-col justify-center">
      <Eyebrow>{data.kicker}</Eyebrow>
      <h1 className="h-hero mt-6" aria-label={data.title}>
        {data.title.split("").map((ch, i) => (
          <span className="char" key={`${ch}-${i}`} aria-hidden="true">
            {ch}
          </span>
        ))}
      </h1>
      <p className="script-accent mt-2 text-5xl text-accent sm:text-6xl">{data.subtitle}</p>
      <p className="mt-8 max-w-md text-sm text-muted">{data.credit}</p>
      <div className="mt-12 flex items-center gap-3 text-faint" aria-hidden="true">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.3em]">{data.scrollHint}</span>
        <span className="h-px w-12 bg-line" />
      </div>
    </div>
  );
}

/* --- 02 · TIM (awan kata) -------------------------------------------------- */
export function WordCloudScene({ data }: { data: WordCloudContent }) {
  return (
    <div>
      <Eyebrow>Bagian 1 · Tim</Eyebrow>
      <Heading>Tim Aruna</Heading>
      <Lead>Struktur kepengurusan tim Aruna, ditampilkan sebagai tipografi besar.</Lead>
      <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
        {data.words.map((word, index) => (
          <li
            key={word}
            className="font-display leading-none text-fg/90"
            style={{
              fontSize: `${[3.4, 2.4, 2.9, 2, 2.2][index % 5]}rem`,
              transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (2 + index)}deg)`,
            }}
          >
            {word}
          </li>
        ))}
      </ul>
      {data.note ? <Note>{data.note}</Note> : null}
    </div>
  );
}

/* --- 03 · DIVIDER ---------------------------------------------------------- */
export function DividerScene({ data }: { data: DividerContent }) {
  return (
    <div>
      <Eyebrow>Bagian Tim</Eyebrow>
      <Heading>{data.title}</Heading>
      {data.caption ? <Lead>{data.caption}</Lead> : null}
      {data.figures && data.figures.length > 0 ? (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {data.figures.map((figure) => (
            <Media key={figure.src + figure.alt} figure={figure} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* --- 04 · FIVE FORCES ------------------------------------------------------ */
export function FiveForcesScene({ data }: { data: FiveForcesContent }) {
  return (
    <div>
      <Eyebrow>Analisis Tim</Eyebrow>
      <Heading>{data.heading}</Heading>
      {data.intro ? <Lead>{data.intro}</Lead> : null}
      <div className="mt-12">
        {data.forces.map((force, index) => (
          <Row key={force.name} index={index + 1} title={force.name}>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {force.items.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </Row>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-accent/40 bg-accent/5 p-6">
        <span className="tag tag--accent">Competitive Rivalry</span>
        <h3 className="mt-3 font-display text-2xl text-fg">{data.advantages.title}</h3>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {data.advantages.items.map((item) => (
            <li key={item} className="text-sm text-muted">
              — {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* --- 05 · INVENTARIS ------------------------------------------------------- */
export function InventoryScene({ data }: { data: InventoryContent }) {
  return (
    <div>
      <Eyebrow>Perlengkapan</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          {data.items.map((item, index) => (
            <Row key={item.name} index={index + 1} title={item.name}>
              {item.detail ? (
                <span className="font-mono text-xs tracking-[0.1em] text-accent">{item.detail}</span>
              ) : null}
            </Row>
          ))}
          {data.note ? <Note>{data.note}</Note> : null}
        </div>
        {data.figures && data.figures.length > 0 ? (
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {data.figures.map((figure) => (
              <Media key={figure.src + figure.alt} figure={figure} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* --- 06 · TEMA (sinematik) ------------------------------------------------- */
export function ThemeScene({ data }: { data: ThemeContent }) {
  return (
    <div className="max-w-5xl">
      <Eyebrow>{data.heading}</Eyebrow>
      <blockquote className="mt-8 font-display text-[2rem] leading-tight tracking-[-0.03em] text-fg sm:text-4xl lg:text-[3.4rem]">
        {data.statement}
      </blockquote>
      <ul className="mt-10 flex flex-wrap gap-2">
        {data.keywords.map((keyword) => (
          <li key={keyword}>
            <span className="tag">{keyword}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --- 07 · PROFIL WILAYAH --------------------------------------------------- */
const DIST_COLORS = ["#d8a24a", "#3f9d8c", "#c9a77e", "#e0864b", "#6f948a", "#9fb8ac", "#b9714c"];

export function RegionScene({ data }: { data: RegionContent }) {
  const donut: DonutDatum[] = data.distribution.map((item, index) => ({
    label: `Bagian ${index + 1}`,
    value: item.value,
    color: DIST_COLORS[index % DIST_COLORS.length],
  }));

  return (
    <div>
      <Eyebrow>Profil Daerah</Eyebrow>
      <Heading>{data.heading}</Heading>
      <Lead>{data.location}</Lead>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="grid gap-8 sm:grid-cols-2">
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <p className="bigstat text-accent">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-fg">{stat.label}</p>
                {stat.note ? <p className="text-xs text-faint">{stat.note}</p> : null}
              </div>
            ))}
          </div>

          <div className="mt-10">
            {data.boundaries.map((boundary) => (
              <div key={boundary.label} className="flex gap-4 border-t border-line py-3">
                <span className="w-16 shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent">
                  {boundary.label}
                </span>
                <span className="text-sm text-muted">{boundary.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mx-auto max-w-[280px] text-accent">
            <DonutChart data={donut} centerTitle="7" centerSubtitle="Desa" />
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {data.distribution.map((item, index) => (
              <li key={`dist-${index}`} className="flex items-center gap-2 text-xs text-muted">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: DIST_COLORS[index % DIST_COLORS.length] }}
                  aria-hidden="true"
                />
                <span className="font-mono tabular-nums">
                  {item.value.toString().replace(".", ",")}%
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
              Daftar Desa
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {data.villages.map((village) => (
                <li key={village}>
                  <span className="tag">{village}</span>
                </li>
              ))}
            </ul>
          </div>
          {data.distributionNote ? <Note>{data.distributionNote}</Note> : null}
        </div>
      </div>

      <Note>
        Sumber: {data.source}. Nilai persentase &amp; daftar desa ditampilkan apa adanya sesuai PDF.
      </Note>
    </div>
  );
}

/* --- 08 · POHON MASALAH ---------------------------------------------------- */
export function ProblemTreeScene({ data }: { data: ProblemTreeContent }) {
  return (
    <div>
      <Eyebrow>Pohon Masalah</Eyebrow>
      <Heading>{data.heading}</Heading>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow" style={{ color: "var(--aruna-sand)" }}>
            Potensi Daerah
          </p>
          <Bullets items={data.potential} className="mt-4" />
        </div>
        <div>
          <p className="eyebrow" style={{ color: "var(--aruna-ember)" }}>
            Dampak
          </p>
          <Bullets items={data.effects} className="mt-4" />
        </div>
      </div>

      <div className="my-10 border-y border-line py-10 text-center">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-accent">Masalah Inti</p>
        <p className="mx-auto mt-4 max-w-4xl font-display text-2xl leading-snug text-fg sm:text-3xl">
          {data.core}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {data.causes.map((cause) => (
          <div key={cause.title}>
            <h3 className="font-display text-lg text-fg">{cause.title}</h3>
            <Bullets items={cause.items} className="mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 09 · PORTOFOLIO ------------------------------------------------------- */
export function PortfolioScene({ data }: { data: PortfolioContent }) {
  return (
    <div>
      <Eyebrow>Enam Program Unggulan</Eyebrow>
      <Heading>{data.heading}</Heading>
      <Lead>{data.statement}</Lead>
      <div className="mt-12">
        {data.programs.map((program, index) => (
          <Row key={program.name} index={index + 1} title={program.name}>
            <p className="text-sm font-medium text-accent">{program.tagline}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {program.points.map((point) => (
                <li key={point}>— {point}</li>
              ))}
            </ul>
          </Row>
        ))}
      </div>
      <p className="mt-8">
        <span className="tag tag--teal">{data.interdiscipline}</span>
      </p>
    </div>
  );
}

/* --- 10 · LOGO ------------------------------------------------------------- */
export function LogoScene({ data }: { data: LogoContent }) {
  return (
    <div>
      <Eyebrow>{data.kicker}</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {data.figure ? (
          <div className="mx-auto w-full max-w-sm rounded-3xl bg-[#f3f0ea] p-8">
            <Media figure={{ ...data.figure, fit: "contain" }} aspect="1 / 1" contain />
          </div>
        ) : null}
        <p className="lead">{data.description}</p>
      </div>
    </div>
  );
}

/* --- 11 · FILOSOFI LOGO ---------------------------------------------------- */
export function LogoPhilosophyScene({ data }: { data: LogoPhilosophyContent }) {
  return (
    <div>
      <Eyebrow>Makna Tiap Elemen</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-12">
        {data.elements.map((element, index) => (
          <Row key={element.title} index={index + 1} title={element.title}>
            {element.text}
          </Row>
        ))}
      </div>
    </div>
  );
}

/* --- 12 · KERANGKA --------------------------------------------------------- */
export function FrameworkScene({ data }: { data: FrameworkContent }) {
  return (
    <div>
      <Eyebrow>Alur Logika Program</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-12">
        {data.levels.map((level, index) => (
          <div key={level.label} className="grid gap-4 border-t border-line py-6 sm:grid-cols-[200px_1fr]">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-3xl text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-faint">
                {level.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{level.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {data.outputs.map((output) => (
          <div key={output.title} className="border-t border-accent/50 pt-4">
            <h3 className="font-display text-lg text-fg">{output.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{output.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 13 · RANCANGAN PROGRAM KERJA ------------------------------------------ */
export function ProgramDesignScene({ data }: { data: ProgramDesignContent }) {
  return (
    <div>
      <Eyebrow>Empat Bidang</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        {data.categories.map((category) => (
          <div key={category.title}>
            <h3 className="border-b border-line pb-3 font-display text-xl text-accent">
              {category.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {category.programs.map((program) => (
                <li key={program.name}>
                  <p className="text-sm font-semibold text-fg">{program.name}</p>
                  {program.detail ? <p className="text-xs text-faint">{program.detail}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 14/16/17/19/21 · PROGRAM (penjelasan) --------------------------------- */
export function ProgramFeatureScene({ data }: { data: ProgramFeatureContent }) {
  const hasHighlights = Boolean(data.highlights && data.highlights.length);

  return (
    <div>
      <Eyebrow>{data.kicker}</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {data.intro.map((paragraph) => (
            <p key={paragraph} className="mb-4 max-w-3xl text-sm leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          {hasHighlights ? (
            <div className="mt-8">
              {data.highlights!.map((highlight, index) => (
                <Row key={highlight.title} index={index + 1} title={highlight.title}>
                  {highlight.text}
                </Row>
              ))}
            </div>
          ) : null}
        </div>
        {data.figures && data.figures.length > 0 ? (
          <div className="grid content-start gap-4">
            {data.figures.map((figure) => (
              <Media key={figure.src + figure.alt} figure={figure} />
            ))}
          </div>
        ) : null}
      </div>
      {data.note ? <Note>{data.note}</Note> : null}
    </div>
  );
}

/* --- 15/18/20/22 · PROGRAM (indikator) ------------------------------------- */
export function ProgramIndicatorsScene({ data }: { data: ProgramIndicatorsContent }) {
  return (
    <div>
      <Eyebrow>{data.kicker}</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          {data.indicators.map((indicator) => (
            <div key={indicator.pillar} className="grid gap-3 border-t border-line py-4 sm:grid-cols-[150px_1fr]">
              <span className="tag tag--teal h-fit">{indicator.pillar}</span>
              <p className="text-sm leading-relaxed text-muted">{indicator.text}</p>
            </div>
          ))}
        </div>
        {data.figures && data.figures.length > 0 ? (
          <div className="grid content-start gap-4">
            {data.figures.map((figure) => (
              <Media key={figure.src + figure.alt} figure={figure} />
            ))}
          </div>
        ) : null}
      </div>
      {data.note ? <Note>{data.note}</Note> : null}
    </div>
  );
}

/* --- 23 · KEMITRAAN -------------------------------------------------------- */
export function PartnershipScene({ data }: { data: PartnershipContent }) {
  const subtitle = [data.paradigma, data.note].filter(Boolean).join(" · ");

  return (
    <div>
      <Eyebrow>Kolaborasi Lintas Sektor</Eyebrow>
      <Heading>{data.heading}</Heading>
      {subtitle ? <Lead>{subtitle}</Lead> : null}

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {data.matrix.map((quadrant) => (
          <div key={quadrant.quadrant} className="rounded-2xl border border-line bg-surface/40 p-5">
            <h3 className="font-display text-lg text-accent">{quadrant.quadrant}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {quadrant.stakeholders.map((stakeholder) => (
                <li key={stakeholder}>
                  <span className="tag">{stakeholder}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-accent">
        Hexa Helix Collaboration
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data.hexa.map((pillar) => (
          <div key={pillar.pillar}>
            <h4 className="font-display text-base text-fg">{pillar.pillar}</h4>
            <ul className="mt-2 space-y-1 text-xs text-faint">
              {pillar.orgs.map((org) => (
                <li key={org}>{org}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- 24 · SPONSOR ---------------------------------------------------------- */
export function SponsorsScene({ data }: { data: SponsorsContent }) {
  return (
    <div>
      <Eyebrow>
        {data.sponsorsLabel} · {data.mediaLabel}
      </Eyebrow>
      <Heading>{data.heading}</Heading>
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.logoGallery.map((logo) => (
          <li
            key={logo.src}
            className="flex items-center justify-center rounded-2xl border border-line bg-[#f3f0ea] p-3"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="h-14 w-full object-contain"
            />
          </li>
        ))}
      </ul>
      {data.note ? <Note>{data.note}</Note> : null}
    </div>
  );
}

/* --- 25 · RAB / ANGGARAN --------------------------------------------------- */
export function BudgetScene({ data }: { data: BudgetContent }) {
  const colors = ["#d8a24a", "#3f9d8c", "#b9714c"];
  const donut: DonutDatum[] = data.income.map((item, index) => ({
    label: item.label,
    value: item.percent,
    color: colors[index % colors.length],
  }));

  return (
    <div>
      <Eyebrow>Pembiayaan</Eyebrow>
      <Heading>{data.heading}</Heading>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-faint">Program Kerja</p>
          <div className="mt-4">
            {data.programKerja.map((item, index) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 border-t border-line py-4">
                <span className="text-sm text-muted">
                  <span className="mr-3 font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </span>
                <span className="font-mono text-base font-semibold tabular-nums text-fg">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          {data.expenseNote ? <Note>{data.expenseNote}</Note> : null}
        </div>

        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-faint">Pemasukan</p>
          <div className="mx-auto mt-6 max-w-[260px] text-accent">
            <DonutChart data={donut} centerTitle="100%" centerSubtitle="Total" />
          </div>
          <ul className="mt-6 space-y-2">
            {data.income.map((item, index) => (
              <li key={item.label} className="flex items-center gap-3 text-sm text-muted">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.label}</span>
                <span className="font-mono font-semibold tabular-nums text-fg">{item.percent}%</span>
              </li>
            ))}
          </ul>
          {data.incomeNote ? <Note>{data.incomeNote}</Note> : null}
        </div>
      </div>
    </div>
  );
}

/* --- 26 · PENUTUP (sinematik) ---------------------------------------------- */
export function ClosingScene({ data }: { data: ClosingContent }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="script-accent text-6xl text-accent sm:text-7xl lg:text-8xl">{data.subtitle}</p>
      <h2 className="mt-4 font-display text-5xl text-fg sm:text-7xl lg:text-8xl">{data.title}</h2>
      <p className="mt-8">
        <span className="tag">Tim Aruna · Kecamatan Tegallalang</span>
      </p>
    </div>
  );
}
