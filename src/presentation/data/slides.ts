/* =============================================================================
   SLIDES.TS — DATA 26 SECTION PRESENTASI.
   -----------------------------------------------------------------------------
   Seluruh teks, angka, dan struktur di bawah ini disalin dari lapisan teks PDF
   "Salinan dari Aruna Tegallalang.pdf" (salinan sehat). Urutan mengikuti urutan
   halaman 1–26. Bagian yang tidak dapat diverifikasi dari PDF ditandai secara
   eksplisit melalui catatan (note), bukan dikarang.
   ========================================================================== */

import type { Slide } from "../types";
import { ASSETS, SPONSOR_LOGOS, backgroundFor } from "./assets";

/* Overlay standar yang dipakai berulang untuk menjaga keterbacaan teks. */
const OVERLAY_DARK =
  "linear-gradient(160deg, rgba(11,33,31,0.82) 0%, rgba(11,33,31,0.60) 45%, rgba(11,33,31,0.90) 100%)";
const OVERLAY_LIGHT =
  "linear-gradient(160deg, rgba(251,246,236,0.92) 0%, rgba(251,246,236,0.80) 50%, rgba(247,239,226,0.93) 100%)";
const OVERLAY_COVER =
  "linear-gradient(180deg, rgba(11,33,31,0.55) 0%, rgba(11,33,31,0.30) 42%, rgba(11,33,31,0.92) 100%)";

/** Latar gambar per halaman; bila kosong, slide memakai warna saja. */
const bg = (page: number, overlay: string, opts: Partial<Slide["background"]> = {}) => ({
  image: backgroundFor(page),
  color: "#0b211f",
  overlay,
  ...opts,
});

export const SLIDES: Slide[] = [
  /* ====================================================================== 01 */
  {
    id: "cover",
    number: 1,
    navLabel: "Cover",
    section: "Pembuka",
    title: "Bidding Aruna — Presentation",
    background: bg(1, OVERLAY_COVER, { parallax: true, zoom: true, position: "50% 40%" }),
    animation: "cinematic",
    tone: "dark",
    content: {
      kind: "cover",
      data: {
        kicker: "Bidding",
        title: "Aruna",
        subtitle: "Presentation",
        credit: "Presented by Tim Aruna",
        scrollHint: "Gulir untuk menjelajah",
      },
    },
  },

  /* ====================================================================== 02 */
  {
    id: "team",
    number: 2,
    navLabel: "Tim",
    section: "Tim",
    title: "Tim Aruna",
    background: bg(2, OVERLAY_COVER, { parallax: true }),
    animation: "mask-reveal",
    tone: "dark",
    content: {
      kind: "wordcloud",
      data: {
        words: ["KORMAN", "SEKRETARIS", "BENDAHARA", "KORMAS", "MATER"],
        note:
          "Kata pada PDF tersusun sebagai tipografi dekoratif melingkar. Hanya kata yang terbaca jelas yang ditampilkan; susunan lengkapnya tidak dapat diverifikasi dari lapisan teks.",
      },
    },
  },

  /* ====================================================================== 03 */
  {
    id: "our-cv",
    number: 3,
    navLabel: "Our CV",
    section: "Tim",
    title: "Our CV",
    background: bg(3, OVERLAY_DARK, { parallax: true }),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "divider",
      data: {
        title: "Our CV",
        caption:
          "Halaman profil tim. Detail nama & riwayat pada deck asli tersimpan sebagai gambar, sehingga ditampilkan apa adanya tanpa mengarang data.",
        figures: [{ src: ASSETS.teamCv, alt: "Komposisi profil tim dari halaman Our CV" }],
      },
    },
  },

  /* ====================================================================== 04 */
  {
    id: "five-forces",
    number: 4,
    navLabel: "Five Forces",
    section: "Tim",
    title: "Analisis Kompetitif Tim — Porter's Five Forces",
    background: bg(4, OVERLAY_DARK),
    animation: "fade",
    tone: "dark",
    content: {
      kind: "five-forces",
      data: {
        heading: "Porter's Five Forces",
        intro: "Analisis kompetitif tim Aruna dalam menghadapi dinamika program.",
        forces: [
          {
            name: "Bargaining Power of Buyers",
            items: [
              "Inklusivitas pemberdayaan masyarakat melalui kolaborasi dan keterlibatan pasti dalam setiap program kerja.",
              "Pengembangan kemampuan dasar menjadi praktik.",
              "Program disusun berdasarkan kebutuhan nyata di lapangan.",
              "Pelaksanaan program melalui pendekatan partisipatif guna membangun rasa kebersamaan, memiliki dan dilibatkan.",
            ],
          },
          {
            name: "Threat of Substitutes",
            items: [
              "Program berbasis riset ilmiah dan data konkret untuk menciptakan dampak nyata dan terukur.",
              "Program berfokus pada ekonomi sirkular dan keberlanjutan, dengan optimalisasi sumber daya, pemanfaatan limbah, serta transfer pengetahuan.",
              "Didukung dokumentasi dan desain visual profesional guna memperkuat publikasi dan keberlanjutan program.",
            ],
          },
          {
            name: "Bargaining Power of Suppliers",
            items: [
              "20+ sponsor potensial siap berkolaborasi selama program berlangsung.",
              "Rencana kemitraan dengan pemerintah daerah setempat untuk dukungan transportasi & akomodasi.",
              "Perangkat lengkap meliputi laptop desain dan perangkat pendukung lainnya.",
            ],
          },
          {
            name: "Threat of New Entrants",
            items: [
              "Putri daerah memahami konteks sosial, budaya, dan isu lokal.",
              "Tim memiliki anggota dengan keahlian lintas bidang (manajemen, teknologi, pertanian, kesehatan) yang mampu menghasilkan solusi komprehensif.",
            ],
          },
        ],
        advantages: {
          title: "Keunggulan Tim — Competitive Rivalry",
          items: [
            "Tim sudah memenuhi 4 aspek kluster.",
            "Tim solid baik dari segi koordinasi, loyalitas dan kedisiplinan kerja.",
            "Budaya kerja komunikatif, adaptif serta ahli dalam problem solving.",
            "Efektivitas program kerja terjamin dengan adanya keahlian lintas bidang yang ada.",
          ],
        },
      },
    },
  },

  /* ====================================================================== 05 */
  {
    id: "inventory",
    number: 5,
    navLabel: "Inventaris",
    section: "Tim",
    title: "Inventaris Tim",
    background: bg(5, OVERLAY_DARK),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "inventory",
      data: {
        heading: "Inventaris Tim",
        items: [{ name: "Kamera", detail: "Sony Alpha A7 Mark" }],
        note:
          "Hanya item kamera yang terbaca pada lapisan teks PDF. Item inventaris lainnya tampil sebagai gambar di deck asli.",
        figures: [
          { src: ASSETS.inventoryCamera, alt: "Peralatan inventaris tim (halaman 5)" },
          { src: ASSETS.inventoryExtra, alt: "Peralatan pendukung inventaris tim (halaman 5)" },
        ],
      },
    },
  },

  /* ====================================================================== 06 */
  {
    id: "tema",
    number: 6,
    navLabel: "Tema",
    section: "Tema",
    title: "Tema Program",
    background: bg(6, OVERLAY_COVER, { parallax: true }),
    animation: "cinematic",
    tone: "dark",
    content: {
      kind: "theme",
      data: {
        heading: "Tema",
        statement:
          "Optimalisasi Sumber Daya Alam melalui Pemanfaatan Teknologi dan Inovasi Berkelanjutan Berbasis Kearifan Lokal guna Meningkatkan Perekonomian Daerah Menuju Masyarakat yang Maju, Berbudaya, serta Inklusif.",
        keywords: [
          "Optimalisasi SDA",
          "Teknologi",
          "Inklusivitas",
          "Inovasi Berkelanjutan",
          "Kearifan Lokal",
        ],
      },
    },
  },

  /* ====================================================================== 07 */
  {
    id: "region",
    number: 7,
    navLabel: "Profil Wilayah",
    section: "Profil",
    title: "Profil Kecamatan Tegallalang",
    background: bg(7, OVERLAY_LIGHT),
    animation: "fade",
    tone: "light",
    source: "Kecamatan Tegallalang dalam Angka 2025",
    content: {
      kind: "region",
      data: {
        heading: "Profil Wilayah",
        location: "Kecamatan Tegallalang, Kabupaten Gianyar, Provinsi Bali",
        stats: [
          { value: "52.242", label: "Jumlah Penduduk", note: "Jiwa" },
          { value: "61,8", label: "Luas Daerah", note: "km²" },
        ],
        boundaries: [
          { label: "Utara", text: "Kecamatan Kintamani" },
          { label: "Selatan", text: "Kecamatan Tampaksiring dan Kecamatan Gianyar" },
          { label: "Barat", text: "Kecamatan Payangan" },
          { label: "Timur", text: "Kecamatan Ubud" },
        ],
        villages: [
          "Desa Pupuan",
          "Desa Sebatu",
          "Desa Taro",
          "Desa Kedisan",
          "Desa Kenderan",
          "Desa Tegallalang",
          "Desa Keliki",
        ],
        distribution: [
          { value: 20.94 },
          { value: 13.36 },
          { value: 16.66 },
          { value: 10.87 },
          { value: 10.49 },
          { value: 18.29 },
          { value: 9.39 },
        ],
        source: "Kecamatan Tegallalang dalam Angka 2025",
        distributionNote:
          "Nilai persentase sebaran penduduk sesuai PDF. Pasangan desa↔nilai tidak dicantumkan karena tidak dapat diverifikasi dari lapisan teks.",
      },
    },
  },

  /* ====================================================================== 08 */
  {
    id: "problem-tree",
    number: 8,
    navLabel: "Problem Tree",
    section: "Analisis",
    title: "Analisis Potensi & Masalah",
    background: bg(8, OVERLAY_DARK),
    animation: "parallax",
    tone: "dark",
    content: {
      kind: "problem-tree",
      data: {
        heading: "Analisis Potensi & Masalah",
        potential: [
          "Kekayaan wisata alam dan budaya",
          "Pertanian dan produk lokal",
          "Keaktifan dan keterlibatan masyarakat muda",
          "Konektivitas digital",
          "Kesadaran masyarakat terhadap kesehatan",
        ],
        core:
          "Kurangnya Pengoptimalan Kualitas SDM Khususnya dalam Pemanfaatan Potensi SDA Lokal",
        causes: [
          {
            title: "Ekonomi",
            items: [
              "Ketergantungan ekonomi pada sektor primer",
              "Tidak adanya diversifikasi ekonomi",
              "Kurang optimalnya pemanfaatan SDA",
            ],
          },
          {
            title: "Pariwisata",
            items: [
              "Kurang maksimalnya perkembangan pariwisata daerah",
              "Kurang maksimalnya promosi terkait wisata daerah",
              "Kurangnya kapasitas promosi dan infrastruktur pendukung pariwisata",
            ],
          },
          {
            title: "SDM & Kolaborasi",
            items: [
              "Minimnya edukasi masyarakat terkait pengelolaan SDA",
              "Rendahnya pendapatan masyarakat",
              "Kurangnya keterlibatan stakeholders eksternal dalam perkembangan daerah",
              "Kurangnya kolaborasi dan koordinasi pemerintah setempat",
            ],
          },
          {
            title: "Teknologi & Infrastruktur",
            items: [
              "Keterbatasan dalam pemanfaatan teknologi",
              "Kurang maksimalnya pemanfaatan teknologi digital",
              "Kurangnya akses menuju sarpras dasar",
              "Buruknya kualitas jalan",
              "Topografi perbukitan",
              "Infrastruktur dan sarana yang kurang memadai",
              "Kurang siapnya daerah untuk menghadapi perkembangan",
            ],
          },
        ],
        effects: [
          "Sulit bersaing dengan daerah sekitar yang lebih memadai",
          "Lambatnya pertumbuhan ekonomi daerah",
          "Rendahnya pendapatan dari sektor wisata",
          "Kurang optimalnya pendapatan penduduk",
        ],
      },
    },
  },

  /* ====================================================================== 09 */
  {
    id: "portfolio",
    number: 9,
    navLabel: "Portofolio",
    section: "Program",
    title: "Portofolio Program",
    background: bg(9, OVERLAY_DARK),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "portfolio",
      data: {
        heading: "Portofolio Program",
        statement:
          "Optimalisasi Sumber Daya Alam Melalui Pemanfaatan Teknologi Dan Inovasi Berkelanjutan Berbasis Kearifan Lokal Guna Meningkatkan Perekonomian Daerah Menuju Masyarakat Yang Maju, Berbudaya, Serta Inklusif Di Desa Kedisan dan Desa Pupuan",
        programs: [
          {
            name: "BioLoka",
            tagline: "Pemanfaatan TOGA Berbasis Potensi Lokal",
            points: [
              "Mengoptimalkan TOGA berbasis inovasi dan berkelanjutan.",
              "Terwujudnya kolaborasi masyarakat dan petani untuk meningkatkan nilai TOGA.",
              "Peningkatan budidaya, kualitas, pemanfaatan kesehatan, dan daya saing produk TOGA.",
            ],
          },
          {
            name: "VCO",
            tagline: "Upaya Pemanfaatan Potensi Kelapa",
            points: [
              "Terwujudnya usaha pengolahan VCO kelapa.",
              "Masyarakat mampu mengembangkan pengolahan kelapa secara efisien, higienis, dan mandiri.",
              "Peningkatan nilai, efisiensi, kesehatan, dan kemandirian ekonomi berbasis VCO kelapa lokal.",
            ],
          },
          {
            name: "EcoHero",
            tagline: "Aksi Bersih Lingkungan Sehat",
            points: [
              "Terwujudnya desa bersih, sehat, dan berkelanjutan.",
              "Masyarakat mampu menerapkan pengelolaan sampah ramah lingkungan berkelanjutan.",
              "Optimalisasi lingkungan desa bersih, sehat, nyaman, dan berkelanjutan.",
            ],
          },
          {
            name: "Jejak Tegallalang",
            tagline: "Branding Desa Wisata",
            points: [
              "Terwujudnya desa wisata berdaya saing dan berkelanjutan.",
              "Masyarakat mampu memaksimalkan kreativitas lokal dan citra desa wisata berkelanjutan.",
              "Peningkatan kreativitas, pemasaran, kesehatan, dan kemandirian desa wisata.",
            ],
          },
          {
            name: "TEMAN",
            tagline: "Tegallalang Mengajar",
            points: [
              "Terwujudnya pendidikan berkarakter dan literasi teknologi berkelanjutan.",
              "Meningkatnya pemahaman siswa tentang lingkungan dan etika digital.",
              "Peningkatan kesadaran ekologis, teknologi, sanitasi, dan etika digital siswa.",
            ],
          },
          {
            name: "Tegalalert",
            tagline: "Tegallalang Siaga Bencana",
            points: [
              "Terwujudnya masyarakat tangguh bencana dan berwawasan lingkungan.",
              "Masyarakat menjadi lebih peduli lingkungan dan siap siaga bencana.",
              "Peningkatan kepedulian lingkungan dan kesiapsiagaan bencana masyarakat.",
            ],
          },
        ],
        interdiscipline:
          "Aktivitas interdisipliner dari agro, medika, soshum, dan saintek.",
      },
    },
  },

  /* ====================================================================== 10 */
  {
    id: "logo",
    number: 10,
    navLabel: "Logo",
    section: "Identitas",
    title: "Logo Aruna",
    background: bg(10, OVERLAY_DARK),
    animation: "zoom",
    tone: "dark",
    content: {
      kind: "logo",
      data: {
        heading: "Logo",
        kicker: "Identitas Visual",
        description:
          "Logo menggambarkan semangat perubahan, inovasi, dan pemberdayaan masyarakat Tegallalang berlandaskan kearifan lokal dan prinsip keberlanjutan. Setiap elemennya mencerminkan harmoni budaya, ekologi, dan kearifan lokal sebagai dasar inovasi berkelanjutan.",
        figure: {
          src: ASSETS.logoMark,
          alt: "Logo Aruna Tegallalang dari halaman 10",
        },
      },
    },
  },

  /* ====================================================================== 11 */
  {
    id: "logo-philosophy",
    number: 11,
    navLabel: "Filosofi Logo",
    section: "Identitas",
    title: "Filosofi Logo",
    background: bg(11, OVERLAY_DARK),
    animation: "fade",
    tone: "dark",
    content: {
      kind: "logo-philosophy",
      data: {
        heading: "Filosofi Logo",
        elements: [
          {
            title: "Pura",
            text: "Pura sebagai salah satu ikon dari Bali melambangkan spiritualitas dan kearifan lokal masyarakat Bali. Pura menjadi ikon utama yang mencerminkan kehidupan religius dan budaya yang dijunjung tinggi oleh masyarakat Gianyar.",
          },
          {
            title: "Terasering",
            text: "Terasering melambangkan kearifan lokal sistem pertanian Bali yang harmonis dengan alam. Terasering juga menggambarkan keseimbangan, kerjasama, dan kesinambungan dalam menjaga lingkungan.",
          },
          {
            title: "Pola Ukiran",
            text: "Pola ukiran terinspirasi dari seni ukir tradisional yang menjadi identitas khas Gianyar. Menggambarkan keindahan, kreativitas, serta nilai seni yang melekat kuat dalam kehidupan masyarakat setempat.",
          },
          {
            title: "Jajaran Gigi",
            text: "Jajaran gigi yang menandakan integrasi dan kebersamaan antar komunitas di Bali. Simbol ini mencerminkan semangat gotong royong, solidaritas, dan kolaborasi antara mahasiswa, masyarakat, serta lembaga daerah.",
          },
          {
            title: "Tanaman Obat & Padi",
            text: "Tanaman obat dan lambang padi menunjukkan komoditas khas Tegalalang, yaitu pertanian dan tanaman herbal. Elemen ini melambangkan kesejahteraan, ketahanan pangan, serta pemanfaatan sumber daya alam secara berkelanjutan.",
          },
          {
            title: "Sorot Mata Berbinar",
            text: "Sorot mata berbinar menyerupai cahaya lampu yang melambangkan semangat, pengetahuan, dan pencerahan. Elemen ini mencerminkan kontribusi mahasiswa dalam membawa inovasi dan inspirasi bagi masyarakat.",
          },
        ],
      },
    },
  },

  /* ====================================================================== 12 */
  {
    id: "framework",
    number: 12,
    navLabel: "Kerangka Berpikir",
    section: "Kerangka",
    title: "Kerangka Berpikir",
    background: bg(12, OVERLAY_DARK),
    animation: "mask-reveal",
    tone: "dark",
    content: {
      kind: "framework",
      data: {
        heading: "Kerangka Berpikir",
        levels: [
          {
            label: "Tema",
            text: "Optimalisasi Sumber Daya Alam melalui Pemanfaatan Teknologi dan Inovasi Berkelanjutan Berbasis Kearifan Lokal guna Meningkatkan Perekonomian Daerah Menuju Masyarakat yang Maju, Berbudaya, serta Inklusif.",
          },
          {
            label: "Goal",
            text: "Terwujudnya Desa Inklusif yang Memaksimalkan Potensi Sumber Daya Alam dan Manusia Melalui Pemanfaatan Teknologi Digital.",
          },
          {
            label: "Outcome",
            text: "Masyarakat Lokal Mampu Berinovasi dan Berkolaborasi dalam Mengembangkan Potensi Lokal secara Berkelanjutan, Sehingga Tercapai Kehidupan Sosial-Ekonomi yang Mandiri, Inklusif dan Berbudaya.",
          },
        ],
        outputs: [
          {
            title: "Optimalisasi SDA & Digitalisasi",
            text: "Mendorong perluasan transformasi digital demi memaksimalkan pemanfaatan sumber daya alam",
          },
          {
            title: "Inklusivitas",
            text: "Mendorong keterlibatan seluruh lapisan masyarakat dalam pengembangan potensi desa secara setara",
          },
          {
            title: "Inovasi Berkelanjutan",
            text: "Mendorong penerapan inovasi berbasis potensi lokal yang berkelanjutan dan berdampak jangka panjang",
          },
          {
            title: "Kearifan Lokal",
            text: "Menguatkan nilai dan budaya lokal sebagai dasar pengembangan desa",
          },
        ],
      },
    },
  },

  /* ====================================================================== 13 */
  {
    id: "program-design",
    number: 13,
    navLabel: "Rancangan Proker",
    section: "Program",
    title: "Rancangan Program Kerja",
    background: bg(13, OVERLAY_DARK),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "program-design",
      data: {
        heading: "Rancangan Program Kerja",
        categories: [
          {
            title: "Pariwisata",
            programs: [
              { name: "Jejak Tegallalang" },
              { name: "Geotagging UMKM" },
              { name: "Rupa Desa" },
              { name: "Papan Pesona" },
            ],
          },
          {
            title: "Pendidikan",
            programs: [
              { name: "PELITA", detail: "Pojok Edukasi dan Literasi Anak" },
              { name: "RESPECT", detail: "Regulasi Emosi, Sehatkan Mental, Perangi Bully" },
              { name: "Gen CerMat", detail: "Generasi Cerdas Membaca dan Menghitung" },
              { name: "Dompet Pintar", detail: "Bijak Kelola Uang Sejak Dini" },
              { name: "Jelajah Khatulistiwa", detail: "Mengenal Indonesia" },
              { name: "Sekolah Aksara" },
            ],
          },
          {
            title: "Kesehatan",
            programs: [
              { name: "BioLoka", detail: "Pemanfaatan TOGA Berkelanjutan" },
              { name: "GEMAS", detail: "Gerakan MPASI Sehat Cegah Stunting" },
              { name: "CERIA", detail: "Cegah Karies Sejak Dini" },
              { name: "GENTAR", detail: "Gerakan Tekanan Darah Terkendali" },
              { name: "SENADA", detail: "Sehat Napas dan Alam Desa Asri" },
            ],
          },
          {
            title: "Lingkungan",
            programs: [
              { name: "Virgin Coconut Oil (VCO)" },
              { name: "EcoHero" },
              { name: "Botani Art" },
              { name: "Compost for All" },
            ],
          },
        ],
      },
    },
  },

  /* ====================================================================== 14 */
  {
    id: "bioloka",
    number: 14,
    navLabel: "BioLoka",
    section: "Program Unggulan",
    title: "Program Unggulan — BioLoka",
    background: bg(14, OVERLAY_DARK),
    animation: "fade",
    tone: "dark",
    content: {
      kind: "program-feature",
      data: {
        heading: "Program Unggulan",
        kicker: "BioLoka",
        intro: [
          "Pengembangan alat pengering dan sistem vertikultur ramah lingkungan dilakukan untuk mendukung pengolahan serta budidaya tanaman herbal. Inovasi mencakup Solar Dryer tertutup dan Dehidrator Pijar hemat energi untuk pengeringan higienis, serta Vertikultur sebagai media tanam efisien dan berkelanjutan.",
          "Program Penanaman dan Pembudidayaan Tanaman Obat guna meningkatkan potensi tanaman obat lokal dengan melibatkan masyarakat secara aktif dalam pembelajaran dan pengelolaan tanaman herbal.",
          "Farm to Table Experience: Pemanfaatan Olahan Tanaman Obat untuk Hewan Ternak dalam bentuk produk HMB (Herbal Mineral Block) sebagai wujud inovasi penerapan pada sektor peternakan.",
        ],
        highlights: [
          {
            title: "Sasaran Dewasa",
            text: "EFEK (Edukasi Pemanfaatan Ekstrak Tanaman Obat terhadap Kesehatan), HERBARI (Herbal Rumah Berseri), serta pencantuman nutrition facts pada produk olahan herbal sebagai bentuk edukasi gizi.",
          },
          {
            title: "Sasaran Anak-anak",
            text: "Roleplay edukatif terkait TOGA, simulasi Apoteker Cilik melalui pembuatan jamu beras kencur, serta games interaktif seperti Herbal Hunter, Hidung Sakti, dan Warna Ajaib untuk menumbuhkan pengetahuan dan kreativitas seputar tanaman obat.",
          },
          {
            title: "Pendampingan & Digital",
            text: "Mengajarkan pembuatan packaging; pengelolaan website; contoh RAB perencanaan penjualan produk; guidebook fisik; serta memanfaatkan pihak eksternal (karang taruna lokal & universitas lain).",
          },
        ],
        figures: [{ src: ASSETS.biolokaHero, alt: "Dokumentasi program BioLoka (halaman 14)" }],
      },
    },
  },

  /* ====================================================================== 15 */
  {
    id: "bioloka-indicators",
    number: 15,
    navLabel: "BioLoka — Indikator",
    section: "Program Unggulan",
    title: "BioLoka — Indikator Keberhasilan",
    background: bg(15, OVERLAY_DARK),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "program-indicators",
      data: {
        heading: "Visualisasi Alat & Produk",
        kicker: "BioLoka — Indikator Keberhasilan Proker",
        indicators: [
          {
            pillar: "SAINTEK",
            text: "Beroperasinya alat pengering tanaman inovatif berupa solar dryer dan dehidrator pijar hemat biaya berbasis lampu pijar dengan ventilasi dan sirkulasi udara panas untuk pengeringan optimal saat udara lembap, ditambah pemanfaatan media tanam adaptif yang memungkinkan pemanfaatan toga dapat maksimal segala kondisi lingkungan.",
          },
          {
            pillar: "SOSHUM",
            text: "Masyarakat setempat bersama dengan berbagai pihak berhasil menciptakan desain dan pengemasan produk yang mampu meningkatkan value produk tersebut, dikolaborasikan dengan pengetahuan terkait pemanfaatan informasi digital sebagai alat utama pemasaran produk.",
          },
          {
            pillar: "MEDIKA",
            text: "Masyarakat setempat, khususnya golongan dewasa dan anak-anak dapat memahami dengan baik dan mengaplikasikan ilmu terkait manfaat toga bagi kesehatan.",
          },
          {
            pillar: "AGRO",
            text: "Meningkatnya partisipasi masyarakat terkait penanaman dan pemanfaatan tanaman toga secara berkelanjutan melalui terwujudnya inovasi produk Herbal Mineral Block guna meningkatkan produktivitas ternak.",
          },
        ],
        figures: [
          { src: ASSETS.biolokaTool1, alt: "Alat/produk BioLoka 1" },
          { src: ASSETS.biolokaTool2, alt: "Alat/produk BioLoka 2" },
          { src: ASSETS.biolokaTool3, alt: "Alat/produk BioLoka 3" },
          { src: ASSETS.biolokaTool4, alt: "Alat/produk BioLoka 4" },
        ],
      },
    },
  },

  /* ====================================================================== 16 */
  {
    id: "jejak-visual",
    number: 16,
    navLabel: "Jejak — Visual",
    section: "Program Unggulan",
    title: "Jejak Tegallalang — Visualisasi Produk",
    background: bg(16, OVERLAY_DARK, { parallax: true }),
    animation: "zoom",
    tone: "dark",
    content: {
      kind: "program-feature",
      data: {
        heading: "Program Unggulan",
        kicker: "Jejak Tegallalang",
        intro: ["Visualisasi dalam produk website."],
        figures: [
          {
            src: ASSETS.jejakHero,
            alt: "Visualisasi produk website Jejak Tegallalang",
            aspect: "3 / 4",
          },
        ],
        note: "Halaman visualisasi produk website dari deck asli.",
      },
    },
  },

  /* ====================================================================== 17 */
  {
    id: "jejak",
    number: 17,
    navLabel: "Jejak Tegallalang",
    section: "Program Unggulan",
    title: "Jejak Tegallalang — Program",
    background: bg(17, OVERLAY_DARK),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "program-feature",
      data: {
        heading: "Program Unggulan",
        kicker: "Jejak Tegallalang",
        intro: [
          "Pengembangan Desa Wisata guna meningkatkan kualitas pelayanan dan daya tarik wisata Kecamatan Tegallalang melalui pelatihan hospitality dan penyusunan paket wisata dengan perluasan isi website sebagai media promosi utama.",
        ],
        highlights: [
          {
            title: "SAINTEK",
            text: "Mengembangkan sistem informasi digital Kecamatan Tegallalang melalui pengembangan dan optimalisasi fungsi website guna memperluas promosi potensi lokal dan meningkatkan kesadaran masyarakat sekitar terhadap pentingnya pemaksimalan pemanfaatan teknologi. Sasaran: wisatawan, penduduk lokal, perangkat desa.",
          },
          {
            title: "SOSHUM",
            text: "Pengembangan Desa Wisata melalui pelatihan hospitality dan penyusunan paket wisata, dengan perluasan isi website sebagai media promosi utama. Sasaran: penduduk lokal dan wisatawan.",
          },
          {
            title: "AGRO",
            text: "Penanaman bibit toga kolaboratif antar pihak disertai dengan peracikan minuman herbal secara mandiri oleh penduduk lokal dengan tujuan pengoptimalan pemanfaatan toga. Sasaran: wisatawan dan penduduk lokal.",
          },
        ],
        figures: [{ src: ASSETS.jejakPhoto, alt: "Dokumentasi Jejak Tegallalang (halaman 17)" }],
      },
    },
  },

  /* ====================================================================== 18 */
  {
    id: "jejak-indicators",
    number: 18,
    navLabel: "Jejak — Indikator",
    section: "Program Unggulan",
    title: "Jejak Tegallalang — Indikator Keberhasilan",
    background: bg(18, OVERLAY_DARK, { parallax: true }),
    animation: "fade",
    tone: "dark",
    content: {
      kind: "program-indicators",
      data: {
        heading: "Visualisasi Alat & Produk",
        kicker: "Jejak Tegallalang — Indikator Keberhasilan Proker",
        indicators: [
          {
            pillar: "SAINTEK",
            text: "Terwujudnya website Kecamatan Tegallalang yang menarik, informatif, interaktif, dan mudah diakses sebagai salah satu senjata utama dalam mempromosikan potensi lokal dan peningkatan branding daerah untuk mendukung transparansi, ekonomi kreatif, dan pariwisata berbasis budaya.",
          },
          {
            pillar: "SOSHUM",
            text: "Tersusunnya paket wisata berbasis potensi alam, budaya, dan komunitas dengan pemanfaatan website sebagai media pemasaran utama yang digerakkan melalui kolaborasi antar sektor terutama pemuda lokal untuk menjangkau sasaran yang lebih luas.",
          },
          {
            pillar: "AGRO",
            text: "Meluasnya pengetahuan masyarakat terkait pemanfaatan toga sebagai bahan dasar pembuatan minuman herbal dan materi kegiatan edukatif pengembangan pariwisata melalui pelibatan aktif masyarakat lokal guna meningkatkan ekonomi lokal dan promosi wisata berbasis kearifan lokal.",
          },
        ],
        figures: [
          {
            src: ASSETS.jejakSite1,
            alt: "Tampilan website Jejak Tegallalang 1",
            aspect: "2 / 3",
          },
          {
            src: ASSETS.jejakSite2,
            alt: "Tampilan website Jejak Tegallalang 2",
            aspect: "2 / 3",
          },
        ],
      },
    },
  },

  /* ====================================================================== 19 */
  {
    id: "ecohero",
    number: 19,
    navLabel: "EcoHero",
    section: "Program Unggulan",
    title: "Program Unggulan — EcoHero",
    background: bg(19, OVERLAY_DARK, { parallax: true }),
    animation: "parallax",
    tone: "dark",
    content: {
      kind: "program-feature",
      data: {
        heading: "Program Unggulan",
        kicker: "EcoHero",
        intro: [
          "Pengembangan media edukasi dan sistem konservasi lingkungan dilakukan untuk mendukung pengelolaan sampah dan pelestarian ekosistem desa. Inovasi meliputi Waste Timeline sebagai edukasi visual waktu terurai sampah, Kala Biopori sebagai sistem konservasi air dan tanah berbasis aktivitas biologi, serta BERKAS sebagai aksi bersih kawasan untuk menjaga kebersihan dan sumber air.",
          "Pemberdayaan masyarakat dan kaderisasi terkait edukasi hubungan pengolahan sampah, air tergenang, siklus hidup nyamuk, dan penerapan PHBS di lingkungan sekitar.",
          "Pemantauan dan kolaborasi berkelanjutan untuk menciptakan sistem yang transparan dan berbasis lingkungan.",
          "Biocycle: pengolahan limbah organik menjadi eco-enzym sebagai inovasi ramah lingkungan demi mendukung sektor pertanian dan peternakan berkelanjutan melalui kolaborasi antara mahasiswa, petani, dan peternak.",
        ],
        figures: [{ src: ASSETS.ecoheroHero, alt: "Dokumentasi program EcoHero (halaman 19)" }],
      },
    },
  },

  /* ====================================================================== 20 */
  {
    id: "ecohero-indicators",
    number: 20,
    navLabel: "EcoHero — Indikator",
    section: "Program Unggulan",
    title: "EcoHero — Indikator Keberhasilan",
    background: bg(20, OVERLAY_DARK),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "program-indicators",
      data: {
        heading: "Visualisasi Alat & Produk",
        kicker: "EcoHero — Indikator Keberhasilan Proker",
        indicators: [
          {
            pillar: "SAINTEK",
            text: "Meningkatnya pengetahuan dan kesadaran masyarakat, pelajar, serta wisatawan terhadap waktu terurai berbagai jenis sampah dan pentingnya pengelolaan sampah berkelanjutan melalui pemanfaatan media edukasi visual Waste Timeline yang interaktif dan informatif.",
          },
          {
            pillar: "SOSHUM",
            text: "Meningkatnya partisipasi dan kemandirian masyarakat dalam penerapan gerakan 'Satu Rumah Satu Biopori,' disertai dengan optimalisasi fungsi dan estetika tempat pemilahan sampah non-organik hasil revitalisasi, yang tercermin melalui pengelolaan sampah yang lebih tertib, efektif, dan berkelanjutan.",
          },
          {
            pillar: "MEDIKA",
            text: "Meningkatnya pengetahuan dan kesadaran masyarakat mengenai keterkaitan antara pengelolaan sampah, air tergenang, dan pertumbuhan jentik nyamuk, disertai terbentuknya kader lingkungan yang mandiri dan aktif dalam kegiatan pemantauan jentik secara berkelanjutan, serta terjalinnya kolaborasi efektif.",
          },
          {
            pillar: "AGRO",
            text: "Meningkatnya kemampuan, kemandirian, dan partisipasi masyarakat dalam mengolah limbah organik menjadi eco-enzyme yang dimanfaatkan untuk pertanian dan peternakan berkelanjutan, disertai penerapan inovasi digitalisasi dalam proses edukasi, pemantauan, dan promosi hasil olahan, serta terbangunnya kolaborasi berkelanjutan.",
          },
        ],
        figures: [
          { src: ASSETS.ecoheroTool1, alt: "Alat/produk EcoHero 1" },
          { src: ASSETS.ecoheroTool2, alt: "Alat/produk EcoHero 2" },
        ],
      },
    },
  },

  /* ====================================================================== 21 */
  {
    id: "vco",
    number: 21,
    navLabel: "VCO",
    section: "Program Unggulan",
    title: "Program Unggulan — Virgin Coconut Oil (VCO)",
    background: bg(21, OVERLAY_DARK),
    animation: "fade",
    tone: "dark",
    content: {
      kind: "program-feature",
      data: {
        heading: "Program Unggulan",
        kicker: "Virgin Coconut Oil (VCO)",
        intro: [
          "Program ini mengembangkan alat pengeringan higienis dan efisien untuk ampas kelapa sisa produksi VCO. Alat pengering berupa Solar Dryer (energi surya, tertutup) dan Dehidrator Pijar (lampu, sirkulasi stabil). Teknologi ganda ini menjamin kualitas bahan baku mineral blok tetap terjaga dan mengoptimalkan limbah padat secara serbaguna serta ramah lingkungan.",
          "Sosialisasi pembuatan dan pengolahan VCO secara sederhana dengan tujuan agar dapat dibuat ulang secara mudah oleh tiap rumah tangga.",
          "Pelatihan dan pendampingan perancangan penjualan hasil olahan VCO mulai dari pembuatan rencana keuangan sampai perancangan desain kemasan dan pemasaran.",
          "Edukasi kesehatan gigi dan mulut melalui penyuluhan interaktif terkait pentingnya menjaga kebersihan mulut dan manfaat terapi oil pulling menggunakan VCO.",
          "Edukasi dan pelatihan terkait pembuatan VCO beserta pemanfaatan ampas hasil VCO sebagai upaya untuk memaksimalkan nilai ekonomi dan mendorong terciptanya sistem produksi yang berkelanjutan.",
        ],
        figures: [{ src: ASSETS.vcoHero, alt: "Dokumentasi program VCO (halaman 21)" }],
      },
    },
  },

  /* ====================================================================== 22 */
  {
    id: "vco-indicators",
    number: 22,
    navLabel: "VCO — Indikator",
    section: "Program Unggulan",
    title: "VCO — Indikator Keberhasilan",
    background: bg(22, OVERLAY_DARK),
    animation: "slide",
    tone: "dark",
    content: {
      kind: "program-indicators",
      data: {
        heading: "Visualisasi Alat & Produk",
        kicker: "Virgin Coconut Oil (VCO) — Indikator Keberhasilan Proker",
        indicators: [
          {
            pillar: "SAINTEK",
            text: "Beroperasinya alat pengering tanaman inovatif berupa solar dryer dan dehidrator pijar hemat biaya berbasis lampu pijar dengan ventilasi dan sirkulasi udara panas untuk pengeringan optimal saat udara lembap, ditambah pemanfaatan media tanam adaptif yang memungkinkan pemanfaatan toga dapat maksimal segala kondisi lingkungan.",
          },
          {
            pillar: "SOSHUM",
            text: "Masyarakat mampu memproduksi VCO secara mandiri di tingkat rumah tangga serta merancang pengemasan, perencanaan keuangan, dan strategi pemasaran produk secara sederhana dan berkelanjutan.",
          },
          {
            pillar: "MEDIKA",
            text: "Meningkatnya pengetahuan dan kesadaran masyarakat terkait pentingnya menjaga kesehatan gigi dan mulut melalui penerapan rutin oil pulling berbasis pemanfaatan potensi lokal VCO.",
          },
          {
            pillar: "AGRO",
            text: "Terlaksananya pelatihan pembuatan Virgin Coconut Oil (VCO) secara berhasil oleh masyarakat Tegallalang hingga menghasilkan produk VCO berkualitas baik, serta dimanfaatkannya limbah produksi menjadi pakan ternak dan pupuk organik sebagai bentuk penerapan pengolahan yang berkelanjutan.",
          },
        ],
        figures: [
          { src: ASSETS.vcoTool1, alt: "Alat/produk VCO 1" },
          { src: ASSETS.vcoTool2, alt: "Alat/produk VCO 2" },
        ],
      },
    },
  },

  /* ====================================================================== 23 */
  {
    id: "partnership",
    number: 23,
    navLabel: "Key Partnership",
    section: "Kemitraan",
    title: "Key Partnership — Hexa Helix & Mendelow's Matrix",
    background: bg(23, OVERLAY_DARK),
    animation: "fade",
    tone: "dark",
    content: {
      kind: "partnership",
      data: {
        heading: "Key Partnership",
        matrix: [
          {
            quadrant: "Key Players",
            stakeholders: [
              "Pemkab Gianyar",
              "Bappeda Gianyar",
              "BUMDes Tegallalang",
              "Dinas Pariwisata Kabupaten Gianyar",
              "Koperasi Petani dan UMKM Lokal",
              "Universitas Udayana",
              "Politeknik Negeri Bali",
              "Institute Seni Indonesia",
              "Yayasan Kopernik",
              "Karang Taruna",
              "PKK",
              "Kelompok Tani",
              "Yayasan IDEP Selaras Alam",
            ],
          },
          {
            quadrant: "Keep Satisfied",
            stakeholders: [
              "Unilever",
              "Pertamina Hulu Rokan",
              "PT Timah TBK",
              "Harita Nickel",
              "Jasamarga",
              "Paragon Corp",
              "Pepsodent",
              "Pertamina Hulu Energi",
              "Bank Indonesia",
              "Tempo Scan",
              "PT Tekad Mandiri Citra (TMC)",
              "Realfood",
              "Yamie Panda",
              "Posind Logistik Indonesia",
              "PT Penerbit Erlangga",
              "Waskita",
              "PT Pupuk Kaltim",
              "Ultramilk",
              "PT Inalum",
              "Bank Jateng Syariah",
              "Badak LNG",
              "PT Antam",
              "Puri Kauhan Ubud",
              "Mandiri",
              "Bank BPD Bali",
              "PT Pupuk Indonesia",
              "Wearsoon Apparel",
              "Parikesit",
            ],
          },
          {
            quadrant: "Keep Informed",
            stakeholders: [
              "STT (Sekaa Teruna Teruni)",
              "Kelompok Tani",
              "Posyandu",
              "LPD Desa Adat Kedisan",
              "LPD Desa Adat Sebatu",
              "Pelajar",
              "UMKM Lokal",
              "Yayasan Kopernik",
              "Yayasan IDEP Selaras Alam",
            ],
          },
          {
            quadrant: "Monitor",
            stakeholders: [
              "Gianyar Daily",
              "Bali Post",
              "Menara FM 102.8 Bali",
              "Denpasar Now",
              "GNFI",
              "Media Bali Dwipa",
              "Pesona Indonesia",
              "RRI Denpasar",
              "TVRI Bali",
              "Greenpeace",
            ],
          },
        ],
        hexa: [
          {
            pillar: "Government",
            orgs: [
              "Pemkab Gianyar",
              "Bappeda Gianyar",
              "BUMDes Tegallalang",
              "Dinas Pariwisata Kabupaten Gianyar",
              "Koperasi Petani dan UMKM Lokal",
              "Universitas Udayana",
              "Politeknik Negeri Bali",
              "Institute Seni Indonesia",
              "Yayasan Kopernik",
              "Karang Taruna",
              "PKK",
              "Kelompok Tani",
              "DPKM",
              "Yayasan IDEP Selaras Alam",
            ],
          },
          {
            pillar: "Academician",
            orgs: [
              "Institut Seni Indonesia Denpasar",
              "Balai Penelitian Tanaman Obat dan Aromatik (Balittro)",
              "Universitas Gadjah Mada",
            ],
          },
          {
            pillar: "Community",
            orgs: [
              "STT (Sekaa Teruna Teruni)",
              "Kelompok Tani",
              "Posyandu",
              "LPD Desa Adat Kedisan",
              "LPD Desa Adat Sebatu",
              "Pelajar",
              "UMKM Lokal",
              "Yayasan Kopernik",
              "Yayasan IDEP Selaras Alam",
            ],
          },
          {
            pillar: "Business",
            orgs: [
              "Unilever",
              "Pertamina Hulu Rokan",
              "PT Timah TBK",
              "Harita Nickel",
              "Jasamarga",
              "Paragon Corp",
              "Pepsodent",
              "Pertamina Hulu Energi",
              "Bank Indonesia",
              "Tempo Scan",
              "PT Tekad Mandiri Citra (TMC)",
              "Realfood",
              "Yamie Panda",
              "Posind Logistik Indonesia",
              "PT Penerbit Erlangga",
              "Waskita",
              "PT Pupuk Kaltim",
              "Ultramilk",
              "PT Inalum",
              "Bank Jateng Syariah",
              "Badak LNG",
              "PT Antam",
              "Puri Kauhan Ubud",
              "Mandiri",
              "Bank BPD Bali",
              "PT Pupuk Indonesia",
              "Wearsoon Apparel",
              "Parikesit",
            ],
          },
          {
            pillar: "Media",
            orgs: [
              "Gianyar Daily",
              "Bali Post",
              "Menara FM 102.8 Bali",
              "Denpasar Now",
              "GNFI",
              "Media Bali Dwipa",
              "Pesona Indonesia",
              "RRI Denpasar",
              "TVRI Bali",
              "Greenpeace",
            ],
          },
          {
            pillar: "NGO",
            orgs: [
              "Taman Nasional Bali Barat",
              "Yayasan IDEP Selaras Alam",
              "Greenpeace Indonesia",
              "Bali Organic Association (BOA)",
              "Komunitas Pecinta Alam",
              "Yayasan Kopernik",
            ],
          },
        ],
        paradigma: "Sustainable Paradigm",
        note: "Mendelow's Matrix & Hexa Helix Collaboration.",
      },
    },
  },

  /* ====================================================================== 24 */
  {
    id: "sponsors",
    number: 24,
    navLabel: "Sponsor & Media",
    section: "Kemitraan",
    title: "Potential Sponsors & Media Partners",
    background: bg(24, OVERLAY_LIGHT),
    animation: "fade",
    tone: "light",
    content: {
      kind: "sponsors",
      data: {
        heading: "Potential Sponsors & Media Partners",
        sponsorsLabel: "Potential Sponsors",
        mediaLabel: "Potential Media Partners",
        sponsors: [],
        media: [],
        logoGallery: SPONSOR_LOGOS.map((src, i) => ({
          src,
          alt: `Logo sponsor/media partner ${i + 1} dari halaman 24`,
        })),
        note:
          "Nama brand tidak terbaca pada lapisan teks PDF, sehingga logo ditampilkan sesuai aslinya. Pemisahan sponsor vs media partner tidak dapat diverifikasi dan keduanya disatukan dalam galeri.",
      },
    },
  },

  /* ====================================================================== 25 */
  {
    id: "budget",
    number: 25,
    navLabel: "RAB",
    section: "Anggaran",
    title: "Rencana Anggaran Biaya (RAB)",
    background: bg(25, OVERLAY_LIGHT),
    animation: "fade",
    tone: "light",
    content: {
      kind: "budget",
      data: {
        heading: "Rencana Anggaran Biaya (RAB)",
        programKerja: [
          { label: "Transportasi", value: "Rp18.824.000" },
          { label: "Kebutuhan Dasar", value: "Rp30.000.000" },
          { label: "Dana Darurat", value: "Rp28.000.000" },
          { label: "Pos Anggaran Tambahan (label tidak terbaca)", value: "Rp10.000.000" },
        ],
        income: [
          { label: "Sponsorship", percent: 70 },
          { label: "DPKM", percent: 25 },
          { label: "Kemitraan", percent: 5 },
        ],
        incomeNote:
          "Persentase pemasukan sesuai PDF (70% / 25% / 5%). Pasangan label↔persentase tidak dapat diverifikasi sepenuhnya dari lapisan teks.",
        expenseNote:
          "Nilai rupiah ditampilkan persis seperti pada PDF; tidak dihitung ulang maupun direkonsiliasi.",
      },
    },
  },

  /* ====================================================================== 26 */
  {
    id: "closing",
    number: 26,
    navLabel: "Penutup",
    section: "Penutup",
    title: "Matur Suksma",
    background: bg(26, OVERLAY_COVER, { parallax: true, zoom: true }),
    animation: "cinematic",
    tone: "dark",
    content: {
      kind: "closing",
      data: {
        title: "Matur Suksma",
        subtitle: "Terima kasih",
      },
    },
  },
];

/** Total jumlah slide — dipakai bilah progres & penghitung. */
export const TOTAL_SLIDES = SLIDES.length;
