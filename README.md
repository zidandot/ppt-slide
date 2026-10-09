# Aruna Tegallalang — Presentasi Interaktif

Website presentasi 26 halaman yang dibangun ulang dari berkas
`Salinan dari Aruna Tegallalang.pdf` (bidding Tim **Aruna** untuk
Kecamatan Tegallalang, Kabupaten Gianyar, Bali).

Presentasi ini:
- menampilkan **seluruh 26 halaman** sesuai urutan, teks, angka, dan data PDF asli;
- menata ulang isi sebagai HTML/CSS/SVG (teks bisa dipilih, tajam di semua ukuran layar);
- memakai gambar latar hasil ekstraksi per halaman + beberapa gambar elemen pilihan;
- memberi animasi gulir (GSAP) yang **berbalik** saat pengguna menggulir ke atas;
- menyediakan navigasi lengkap (progres, penghitung, tombol, keyboard, ikhtisar, hash URL).

> Catatan penting: salinan PDF di akar proyek ini rusak permanen akibat
> konversi UTF-8. Sumber resmi yang sehat ada di
> `/home/al_zidan/Downloads/Salinan dari Aruna Tegallalang.pdf`.
> Semua aset diekstraksi dari salinan sehat tersebut.

---

## A. Ringkasan

| Aspek | Keterangan |
|---|---|
| Jumlah slide | 26 (satu halaman PDF = satu `<section>`) |
| Bahasa | Indonesia (teks konten mengikuti PDF) |
| Teknologi | React 19, Vite, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger |
| Arsitektur | Berbasis data: metadata slide terpisah dari komponen |
| Font | League Spartan (display), Plus Jakarta Sans (teks), Great Vibes (aksen)*, Roboto Mono (angka/label) |

\* BlostaScript (font script pada PDF) tidak tersedia bebas lisensi, sehingga
aksen tulisan tangan didekati dengan **Great Vibes**.

**Bab presentasi**
1. Pembuka & tim (slide 1–6): cover, tim, five forces, inventaris, tema.
2. Analisis wilayah & program (slide 7–9): profil Tegallalang, pohon masalah, portofolio.
3. Identitas & rancangan (slide 10–13): logo, filosofi, kerangka, rancangan proker.
4. Program unggulan (slide 14–22): 6 program (BioLoka, VCO, EcoHero, Jejak Tegallalang, TEMAN, Tegalalert).
5. Kemitraan & penutup (slide 23–26): Mendelow matrix, sponsor, RAB, penutup.

---

## B. Instalasi

Prasyarat: **Node.js 20+** dan npm.

```bash
npm install
```

Tidak ada langkah build aset yang wajib. Seluruh gambar sudah tersedia di
`public/assets/images/`.

---

## C. Menjalankan (mode pengembangan)

```bash
npm run dev
```

Buka alamat yang tercetak di terminal (biasanya `http://localhost:5173`).

**Navigasi saat presentasi:**

| Aksi | Kontrol |
|---|---|
| Slide berikutnya | `↓` / `Page Down` / tombol panah bawah |
| Slide sebelumnya | `↑` / `Page Up` / tombol panah atas |
| Ke cover | `Home` / tombol "Cover" |
| Ke slide terakhir | `End` |
| Lompat ke slide tertentu | Buka ikhtisar (tombol "Ikhtisar") atau buka `#nama-slide` |
| Gulir bebas | Roda tetikus / layar sentuh tetap berfungsi normal |

Setiap slide juga punya tautan hash, mis. `http://localhost:5173/#bioloka`.

---

## D. Build & pratinjau produksi

```bash
npm run build
npm run preview
```

`npm run build` menjalankan pemeriksaan tipe (`tsc -b`) lalu memaket dengan Vite
ke folder `dist/`. Perintah pemeriksaan lain:

```bash
npm run lint
```

---

## E. Struktur folder

```
src/
├─ presentation/
│  ├─ Presentation.tsx          # Orkestrator: merender 26 slide + chrome + animasi
│  ├─ types.ts                  # Kontrak data (Slide, SlideContent, FigureRef, …)
│  ├─ data/
│  │  ├─ assets.ts              # MANIFES TERPUSAT semua path gambar
│  │  └─ slides.ts              # ISI & METADATA 26 slide (teks asli PDF)
│  ├─ hooks/
│  │  ├─ useSlideNavigation.ts  # Aktif slide, hash, keyboard, progres
│  │  └─ useScrollScene.ts      # Preset animasi GSAP/ScrollTrigger
│  ├─ components/
│  │  ├─ Slide.tsx              # Kerangka satu halaman (full-screen, tone terang/gelap)
│  │  ├─ SlideBackground.tsx    # Latar gambar + overlay
│  │  ├─ Chrome.tsx             # Bilah navigasi ↑/↓ + penghitung + daftar isi
│  │  └─ charts.tsx             # DonutChart (SVG)
│  └─ scenes/
│     ├─ bodies.tsx             # Isi setiap jenis halaman (gaya editorial)
│     └─ registry.tsx           # Pemetaan jenis konten → komponen isi
├─ styles/
│  ├─ tokens.css                # Variabel warna/ukuran/tipografi
│  └─ global.css                # Gaya global + kelas slide/chrome
├─ index.css                    # @theme Tailwind + impor token/global
├─ App.tsx                      # Titik masuk → <Presentation />
└─ main.tsx                     # Bootstrap React
public/assets/images/
├─ backgrounds/p01.webp … p26.webp   # Latar 1920×1080 per halaman
└─ p01/ … p26/                        # Gambar elemen hasil ekstraksi
review/
├─ pdf/                         # 26 render halaman PDF (referensi)
└─ screenshots/                 # Tangkapan layar hasil verifikasi
```

---

## F. Manajemen gambar/aset

**Semua path gambar terdaftar di satu tempat:** `src/presentation/data/assets.ts`.
Jangan menulis path gambar langsung di komponen. Gunakan konstanta atau helper
`asset()`:

```ts
import { ASSETS, BACKGROUNDS, SPONSOR_LOGOS, asset } from "../data/assets";

// contoh
ASSETS.logoAruna;                 // path logo
BACKGROUNDS.p07;                  // latar halaman 7
asset("p15/p15-08.webp");         // menyusun path dari public/assets/images
```

Cara mengganti gambar:
1. Taruh berkas baru di `public/assets/images/...` (format `.webp` disarankan).
2. Perbarui entri terkait di `src/presentation/data/assets.ts`.
3. Jalankan `npm run dev` dan periksa hasilnya.

Cara mengekstrak ulang aset dari PDF sehat (membutuhkan `poppler-utils`, `gs`,
dan Python + Pillow):

```bash
python3 /tmp/opencode/aruna/extract.py \
  "/home/al_zidan/Downloads/Salinan dari Aruna Tegallalang.pdf" \
  /home/al_zidan/ppt/public/assets/images
```

Skrip tersebut menghasilkan latar per halaman (1920×1080) dan gambar elemen,
lalu menandai duplikat dan kandidat logo. Metadata hasil ekstraksi disimpan di
`/tmp/opencode/aruna/manifest.json`.

---

## G. Mengedit isi slide

Seluruh teks, angka, tabel, dan program berasal dari
`src/presentation/data/slides.ts`. Setiap slide berbentuk objek:

```ts
{
  id: "bioloka",            // dipakai untuk hash URL (#bioloka)
  number: 14,               // nomor halaman PDF
  section: "Program Unggulan",
  title: "BioLoka",
  navLabel: "BioLoka",      // label pendek di ikhtisar
  tone: "dark",             // "dark" | "light" → warna teks & scrim
  animation: "slide",       // preset animasi (lihat bagian H)
  background: { image: BACKGROUNDS.p14, color: "#0b211f", overlay: "…" },
  content: {
    kind: "program-feature",
    data: { kicker: "…", heading: "…", intro: ["…"], highlights: [ … ], figures: [ … ] },
  },
}
```

Untuk mengubah teks: cukup edit nilai di `slides.ts`, simpan, dan Vite akan
memuat ulang. Tidak perlu menyentuh komponen.

Catatan integritas data: beberapa pasangan di PDF asli **tidak dapat
diverifikasi** dari lapisan teks (mis. pasangan persentase↔desa pada sebaran
penduduk, label keempat RAB yang tidak terbaca, dan pemisahan sponsor vs mitra
media). Hal ini ditandai dengan `note` pada slide terkait dan **tidak dikarang**.
Bila Anda punya informasi pasti, perbarui `slides.ts` lalu hapus `note`-nya.

---

## H. Konfigurasi animasi

Preset animasi didefinisikan di `src/presentation/hooks/useScrollScene.ts` dan
dipilih per slide lewat properti `animation`:

| Preset | Efek |
|---|---|
| `cinematic` | Latar zoom besar + konten mengecil/memudar (momen kunci: cover, tema, penutup) |
| `zoom` | Latar membesar → normal seiring gulir |
| `parallax` | Latar dan konten bergerak dengan kecepatan berbeda |
| `mask-reveal` | Konten terungkap dari balik topeng (`clip-path`) |
| `slide` | Konten bergeser naik dari bawah |
| `fade` | Konten memudar + naik pelan |
| `none` | Tanpa animasi |

Semua animasi memakai `scrub`, sehingga **berbalik** saat pengguna menggulir ke
atas. Preferensi sistem **`prefers-reduced-motion: reduce`** dihormati: animasi
dinonaktifkan dan konten langsung tampil.

Mengubah hanya untuk satu slide:

```ts
// di slides.ts
animation: "parallax",
```

Mengubah perilaku preset untuk semua slide: edit blok animasi di
`useScrollScene.ts`. Animasi **tidak memakai pin**, sehingga tiap halaman tetap
seamless; di layar besar (`≥1024px`) gulir memakai *scroll-snap* `proximity`
agar terasa per halaman (nonaktif pada perangkat mobile).

---

## I. Menambah slide baru

1. **Siapkan aset** (opsional): tambahkan latar di
   `public/assets/images/backgrounds/` dan daftarkan di `BACKGROUNDS`
   (`assets.ts`).
2. **Definisikan tipe konten** baru (jika belum ada) di `types.ts`, lalu
   tambahkan ke union `SlideContent`.
3. **Tambah data slide** di `slides.ts` (objek baru dengan `id` unik dan
   `number` yang sesuai).
4. **Buat komponen** di `scenes/bodies.tsx` yang menerima `data` bertipe baru.
5. **Daftarkan** komponen tersebut di `scenes/registry.tsx` pada `switch`
   `content.kind`.
6. (Opsional) Tambahkan preset animasi baru di `useScrollScene.ts`.

Penghitung halaman dan daftar isi otomatis mengikuti panjang array `SLIDES`,
sehingga tidak ada angka yang perlu diubah secara manual.

---

## J. Troubleshooting

**Slide tampil kosong / latar putih.**
Pastikan berkas latar ada di `public/assets/images/backgrounds/` dan path di
`assets.ts` benar. Komponen `SlideBackground` otomatis jatuh ke warna dasar
slide bila gambar gagal dimuat (tanpa error).

**Gambar tidak muncul (ikon/placeholder "Gambar tidak tersedia").**
Cek nama berkas di `assets.ts`. Jalankan `npm run build` untuk memastikan tidak
ada impor yang salah, lalu muat ulang.

**Animasi tidak berjalan.**
Periksa apakah sistem/browser mengaktifkan "reduce motion". Itu memang
menonaktifkan animasi. Bila bukan, pastikan GSAP terpasang (`npm install`) dan
`data-anim` pada slide terisi.

**Posisi setelah pin terasa bergeser.**
Slide `cinematic` memakai penyangga pin (`pin-spacer`) sehingga tinggi total
bertambah. Ini normal. Untuk menghilangkannya, ubah `pin: true` → `pin: false`.

**Gulir terasa berat di perangkat lemah.**
Kurangi jumlah slide ber-preset `zoom`/`parallax`, atau turunkan resolusi latar
(dari 1920×1080 ke 1280×720) di `public/assets/images/backgrounds/`.

**Hash URL tidak membuka slide yang tepat.**
Gunakan `id` yang persis sama seperti di `slides.ts`, mis. `#jejak-tegallalang`.
Daftar `id` ada pada objek `SLIDES`.

**Build gagal pada TypeScript.**
Proyek memakai mode ketat (`noUnusedLocals`, `noUnusedParameters`). Hapus impor
atau variabel yang tidak terpakai, lalu jalankan `npm run build` lagi.

---

## Sumber & catatan verifikasi

- Sumber konten: `Salinan dari Aruna Tegallalang.pdf` (26 halaman, 1440×810 pt).
- Aset: hasil ekstraksi otomatis (latar per halaman + elemen) dari PDF sehat.
- Diagram (donat, pohon masalah, matriks, kerangka) **digambar ulang** dalam
  SVG/HTML — bukan tangkapan layar halaman.
- Verifikasi otomatis yang sudah dilakukan: `npm run build` dan `npm run lint`
  tanpa galat; 26 slide ter-render; seluruh 69 gambar dan 26 latar termuat tanpa
  kegagalan (tidak ada HTTP 404); tidak ada overflow horizontal pada desktop
  (1440×900) maupun mobile (390×844); navigasi keyboard, penghitung, dan panel
  ikhtisar berfungsi; tidak ada error di konsol.
- **Belum diverifikasi secara visual oleh saya** (model tanpa penglihatan):
  kecocokan estetika tiap latar dan pemetaan gambar elemen ke perannya. Silakan
  periksa `review/screenshots/` (dan bandingkan dengan `review/pdf/`).
# ppt-slide
