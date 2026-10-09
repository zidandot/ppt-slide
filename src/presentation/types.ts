/* =============================================================================
   TYPES.TS — kontrak tipe untuk seluruh sistem presentasi.
   -----------------------------------------------------------------------------
   Semua slide direpresentasikan sebagai data bertipe "Slide". Komponen hanya
   membaca data ini, sehingga penambahan/pengubahan konten tidak menyentuh
   kode layout.
   ========================================================================== */

/** Preset animasi scroll yang bisa dipilih per slide. */
export type AnimPreset =
  | "cinematic"   // zoom latar + pin (dipakai hemat untuk momen kunci)
  | "fade"        // memudar saat masuk
  | "slide"       // konten bergeser dari bawah
  | "zoom"        // latar membesar/mengecil mengikuti scroll
  | "mask-reveal" // konten terungkap dari balik topeng
  | "parallax"    // lapisan bergerak dengan kecepatan berbeda
  | "none";       // tanpa animasi

/** Nada slide menentukan warna teks default di atas latar. */
export type SlideTone = "dark" | "light";

/* --- Sistem animasi sinematik -------------------------------------------- */

/**
 * Jenis koreografi transisi masuk/keluar satu adegan. Setiap jenis memberi
 * "rasa" gerak yang berbeda agar perjalanan gulir tidak monoton:
 *   zoom-through : konten membesar seolah kamera menembusnya
 *   pull-back    : mulai dari detail ter-zoom, kamera menjauh membuka komposisi
 *   mask-wipe    : konten tersapu oleh topeng persegi
 *   iris         : konten terungkap dari lingkaran (motif logo Aruna)
 *   pan-up       : konten naik dengan parallax lembut tanpa topeng
 *   layer-parallax: latar & konten bergerak berlawanan arah (kedalaman)
 */
export type TransitionKind =
  | "zoom-through"
  | "pull-back"
  | "mask-wipe"
  | "iris"
  | "pan-up"
  | "layer-parallax";

/**
 * Konfigurasi satu adegan. Bila sebuah slide memakai mode "pin", viewport
 * ditahan (position: sticky) selama beberapa kelipatan tinggi layar sehingga
 * komposisi bisa bertransformasi sebelum fokus berpindah ke bab berikutnya.
 * Pin memakai sticky native, BUKAN scroll-jacking: roda/sentuh tetap normal.
 */
export interface SceneConfig {
  mode: "flow" | "pin";
  transition: TransitionKind;
  /** Panjang adegan pin dalam kelipatan tinggi viewport (mis. 1.6). */
  pinLength?: number;
  /** Skala latar saat masuk -> saat keluar. */
  zoom?: [number, number];
  /** Kekuatan parallax/kedalaman. 0 = diam, 1 = normal, >1 = dramatis. */
  depth?: number;
}

/** Satu bab naratif yang menaungi beberapa halaman PDF. */
export interface Chapter {
  /** Nomor bab, 1..N. */
  number: number;
  id: string;
  title: string;
  /** Aksen warna bab (dipakai untuk wash transisi & indikator). */
  accent: string;
  /** id slide pertama & terakhir bab (batas transisi antarbab). */
  fromId: string;
  toId: string;
}

/** Galeri gambar opsional untuk gerakan horizontal 3D. */
export interface GalleryConfig {
  title: string;
  caption?: string;
  figures: FigureRef[];
}

/**
 * Konfigurasi background per slide.
 * Setiap slide boleh punya gambar, warna dasar, overlay gradien, posisi fokus,
 * serta opsi parallax & zoom.
 */
export interface BackgroundConfig {
  /** Path gambar latar (di dalam /assets/images/backgrounds). */
  image?: string;
  /** Warna dasar (fallback bila gambar gagal dimuat). */
  color: string;
  /** Gradien overlay untuk menjaga keterbacaan teks. */
  overlay?: string;
  /** object-position gambar, mis. "50% 40%". */
  position?: string;
  /** Aktifkan pergerakan parallax saat scroll. */
  parallax?: boolean;
  /** Aktifkan zoom (scale) mengikuti progres scroll. */
  zoom?: boolean;
}

/* --- Blok konten yang dipakai berulang ----------------------------------- */
export interface Stat {
  value: string;
  label: string;
  note?: string;
}

export interface Indicator {
  pillar: "SAINTEK" | "SOSHUM" | "MEDIKA" | "AGRO";
  text: string;
}

export interface FigureRef {
  src: string;
  alt: string;
  caption?: string;
  /** Rasio aspek (mis. "3 / 4" untuk gambar potret). Default "4 / 3". */
  aspect?: string;
  /** Mode muat: "cover" untuk foto, "contain" untuk logo/ilustrasi. */
  fit?: "cover" | "contain";
}

/* --- Konten per jenis layout --------------------------------------------- */
export interface CoverContent {
  kicker: string;
  title: string;
  subtitle: string;
  credit: string;
  scrollHint: string;
}

export interface WordCloudContent {
  words: string[];
  note?: string;
}

export interface DividerContent {
  title: string;
  caption?: string;
  figures?: FigureRef[];
}

export interface FiveForcesContent {
  heading: string;
  intro?: string;
  forces: { name: string; items: string[] }[];
  advantages: { title: string; items: string[] };
}

export interface InventoryContent {
  heading: string;
  items: { name: string; detail?: string }[];
  note?: string;
  figures?: FigureRef[];
}

export interface ThemeContent {
  heading: string;
  statement: string;
  keywords: string[];
}

export interface RegionContent {
  heading: string;
  location: string;
  stats: Stat[];
  boundaries: { label: string; text: string }[];
  villages: string[];
  /** Nilai persentase sebaran penduduk; label sengaja dikosongkan bila
   *  pasangan desa↔nilai tidak dapat diverifikasi dari PDF. */
  distribution: { value: number }[];
  source: string;
  distributionNote?: string;
}

export interface ProblemTreeContent {
  heading: string;
  potential: string[];
  core: string;
  causes: { title: string; items: string[] }[];
  effects: string[];
}

export interface PortfolioContent {
  heading: string;
  statement: string;
  programs: { name: string; tagline: string; points: string[] }[];
  interdiscipline: string;
}

export interface LogoContent {
  heading: string;
  kicker: string;
  description: string;
  figure?: FigureRef;
}

export interface LogoPhilosophyContent {
  heading: string;
  elements: { title: string; text: string }[];
}

export interface FrameworkContent {
  heading: string;
  levels: { label: string; text: string }[];
  outputs: { title: string; text: string }[];
}

export interface ProgramDesignContent {
  heading: string;
  categories: { title: string; programs: { name: string; detail?: string }[] }[];
}

export interface ProgramFeatureContent {
  heading: string;
  kicker: string;
  intro: string[];
  highlights?: { title: string; text: string }[];
  figures?: FigureRef[];
  note?: string;
}

export interface ProgramIndicatorsContent {
  heading: string;
  kicker: string;
  indicators: Indicator[];
  figures?: FigureRef[];
  note?: string;
}

export interface PartnershipContent {
  heading: string;
  matrix: { quadrant: string; stakeholders: string[] }[];
  hexa: { pillar: string; orgs: string[] }[];
  paradigma?: string;
  note?: string;
}

export interface SponsorsContent {
  heading: string;
  sponsorsLabel: string;
  mediaLabel: string;
  /** Nama brand bila terbaca dari PDF. */
  sponsors: string[];
  media: string[];
  /** Logo hasil ekstraksi (tanpa klaim keterkaitan brand tertentu). */
  logoGallery: FigureRef[];
  note?: string;
}

export interface BudgetContent {
  heading: string;
  programKerja: { label: string; value: string }[];
  income: { label: string; percent: number }[];
  incomeNote?: string;
  expenseNote?: string;
}

export interface ClosingContent {
  title: string;
  subtitle: string;
}

export type SlideContent =
  | { kind: "cover"; data: CoverContent }
  | { kind: "wordcloud"; data: WordCloudContent }
  | { kind: "divider"; data: DividerContent }
  | { kind: "five-forces"; data: FiveForcesContent }
  | { kind: "inventory"; data: InventoryContent }
  | { kind: "theme"; data: ThemeContent }
  | { kind: "region"; data: RegionContent }
  | { kind: "problem-tree"; data: ProblemTreeContent }
  | { kind: "portfolio"; data: PortfolioContent }
  | { kind: "logo"; data: LogoContent }
  | { kind: "logo-philosophy"; data: LogoPhilosophyContent }
  | { kind: "framework"; data: FrameworkContent }
  | { kind: "program-design"; data: ProgramDesignContent }
  | { kind: "program-feature"; data: ProgramFeatureContent }
  | { kind: "program-indicators"; data: ProgramIndicatorsContent }
  | { kind: "partnership"; data: PartnershipContent }
  | { kind: "sponsors"; data: SponsorsContent }
  | { kind: "budget"; data: BudgetContent }
  | { kind: "closing"; data: ClosingContent };

/** Metadata lengkap satu section presentasi (satu halaman PDF). */
export interface Slide {
  id: string;
  /** Nomor halaman PDF (1–26). */
  number: number;
  /** Label pendek untuk navigasi & ikhtisar. */
  navLabel: string;
  /** Nama bab/bagian, mis. "Analisis". */
  section: string;
  /** Judul panjang untuk <title> section. */
  title: string;
  background: BackgroundConfig;
  animation: AnimPreset;
  tone: SlideTone;
  /** Sumber data bila halaman mencantumkannya. */
  source?: string;
  /** Nomor bab naratif (diisi otomatis dari daftar CHAPTERS). */
  chapter?: number;
  /** Konfigurasi adegan sinematik; bila kosong diturunkan dari `animation`. */
  scene?: SceneConfig;
  /** Galeri horizontal 3D opsional yang ditampilkan di adegan ini. */
  gallery?: GalleryConfig;
  content: SlideContent;
}
