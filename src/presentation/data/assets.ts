/* =============================================================================
   ASSETS.TS — MANIFES ASET TERPUSAT.
   -----------------------------------------------------------------------------
   Ini SATU-SATUNYA tempat path gambar ditulis. Komponen/slide harus mengambil
   aset dari sini (bukan hardcode "/assets/..."), sehingga:
     • mengganti gambar cukup diubah di sini;
     • mudah mencari aset yang tidak terpakai;
     • konsisten antara background dan gambar elemen.
   Semua file berasal dari ekstraksi PDF asli ke:
     public/assets/images/backgrounds/pXX.webp   (latar tiap halaman)
     public/assets/images/pXX/pXX-NN.webp        (foto/logo/elemen per halaman)
   ========================================================================== */

/** Folder akar aset gambar yang diserve Vite. */
const IMG = "/assets/images";

/** Membentuk path absolut aset dari sub-path relatif. */
export function asset(relativePath: string): string {
  return `${IMG}/${relativePath}`;
}

/**
 * Latar full-page tiap slide. Kunci "p01".."p26" sesuai nomor halaman PDF.
 * Beberapa halaman memang memakai latar yang sama (sesuai deck asli).
 */
export const BACKGROUNDS: Record<string, string> = {
  p01: asset("backgrounds/p01.webp"),
  p02: asset("backgrounds/p02.webp"),
  p03: asset("backgrounds/p03.webp"),
  p04: asset("backgrounds/p04.webp"),
  p05: asset("backgrounds/p05.webp"),
  p06: asset("backgrounds/p06.webp"),
  p07: asset("backgrounds/p07.webp"),
  p08: asset("backgrounds/p08.webp"),
  p09: asset("backgrounds/p09.webp"),
  p10: asset("backgrounds/p10.webp"),
  p11: asset("backgrounds/p11.webp"),
  p12: asset("backgrounds/p12.webp"),
  p13: asset("backgrounds/p13.webp"),
  p14: asset("backgrounds/p14.webp"),
  p15: asset("backgrounds/p15.webp"),
  p16: asset("backgrounds/p16.webp"),
  p17: asset("backgrounds/p17.webp"),
  p18: asset("backgrounds/p18.webp"),
  p19: asset("backgrounds/p19.webp"),
  p20: asset("backgrounds/p20.webp"),
  p21: asset("backgrounds/p21.webp"),
  p22: asset("backgrounds/p22.webp"),
  p23: asset("backgrounds/p23.webp"),
  p24: asset("backgrounds/p24.webp"),
  p25: asset("backgrounds/p25.webp"),
  p26: asset("backgrounds/p26.webp"),
};

/**
 * Ambil latar berdasarkan nomor halaman (1–26).
 * Jika nomor di luar rentang, kembalikan warna fallback transparan.
 */
export function backgroundFor(pageNumber: number): string | undefined {
  const key = `p${String(pageNumber).padStart(2, "0")}`;
  return BACKGROUNDS[key];
}

/**
 * Gambar elemen yang dikurasi dari hasil ekstraksi.
 * Nama kunci menjelaskan peran/kandungan agar mudah ditelusuri.
 */
export const ASSETS = {
  // Cover & tim
  coverPhoto: asset("p01/p01-04.webp"),
  teamGroup: asset("p02/p02-06.webp"),
  teamCv: asset("p03/p03-08.webp"),

  // Analisis & profil
  regionPhoto: asset("p07/p07-01.webp"),
  problemPhoto: asset("p08/p08-02.webp"),

  // Identitas
  logoMark: asset("p10/p10-02.webp"),
  logoSquare: asset("p10/p10-08.webp"),
  frameworkPhoto: asset("p12/p12-06.webp"),
  programDesignPhoto: asset("p13/p13-02.webp"),

  // Program unggulan — BioLoka (halaman 14–15)
  biolokaHero: asset("p14/p14-06.webp"),
  biolokaTool1: asset("p15/p15-17.webp"),
  biolokaTool2: asset("p15/p15-18.webp"),
  biolokaTool3: asset("p15/p15-19.webp"),
  biolokaTool4: asset("p15/p15-08.webp"),

  // Jejak Tegallalang (halaman 16–18)
  jejakHero: asset("p16/p16-06.webp"),
  jejakPhoto: asset("p17/p17-06.webp"),
  jejakSite1: asset("p18/p18-10.webp"),
  jejakSite2: asset("p18/p18-12.webp"),

  // EcoHero (halaman 19–20)
  ecoheroHero: asset("p20/p20-09.webp"),
  ecoheroTool1: asset("p20/p20-08.webp"),
  ecoheroTool2: asset("p20/p20-15.webp"),

  // VCO (halaman 21–22)
  vcoHero: asset("p22/p22-02.webp"),
  vcoTool1: asset("p22/p22-16.webp"),
  vcoTool2: asset("p22/p22-17.webp"),

  // Kemitraan
  partnershipMatrix: asset("p23/p23-07.webp"),
  partnershipHexa: asset("p23/p23-02.webp"),

  // Penutup
  closingPhoto: asset("p26/p26-04.webp"),

  // Inventaris (halaman 5)
  inventoryCamera: asset("p05/p05-07.webp"),
  inventoryExtra: asset("p05/p05-10.webp"),
} as const;

/**
 * Logo sponsor & media partner hasil ekstraksi halaman 24.
 * Tidak ada klaim keterkaitan brand tertentu — hanya menampilkan logo
 * sebagaimana tampil di PDF asli.
 */
export const SPONSOR_LOGOS: string[] = [
  "p24-09", "p24-11", "p24-12", "p24-14", "p24-15", "p24-16",
  "p24-17", "p24-19", "p24-20", "p24-23", "p24-24", "p24-25",
  "p24-26", "p24-27", "p24-28", "p24-31", "p24-32", "p24-33",
  "p24-34", "p24-35", "p24-36", "p24-37", "p24-38", "p24-39",
].map((name) => asset(`p24/${name}.webp`));
