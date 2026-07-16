# VETERNAK FRONTEND DESIGN GUIDE v1.0

**Product:** Veternak — Smart Livestock Health Response Platform  
**Design direction:** Pastoral Health-Tech / Editorial Organic  
**Platform:** Responsive web application  
**Primary users:** Peternak sapi dan kambing  
**Supporting users:** Dokter hewan dan petugas kesehatan hewan  
**Context:** MVP Hackathon 30 jam  
**Status:** Design foundation siap diterjemahkan ke Figma dan frontend

---

## 1. Tujuan Dokumen

Dokumen ini menjadi konteks visual dan UX utama bagi designer, frontend developer, product team, reviewer, dan AI coding agent dalam membangun Veternak secara konsisten.

Guide ini mengatur:

- fondasi merek;
- arah visual;
- warna;
- tipografi;
- grid dan spacing;
- sistem komponen;
- navigasi;
- pola form dan AI;
- pola status kesehatan ternak;
- struktur halaman;
- ilustrasi dan fotografi;
- responsive behavior;
- accessibility;
- UX writing;
- aturan implementasi frontend;
- quality checklist.

---

# 2. Fondasi Produk

## 2.1 Peran Veternak

Veternak adalah platform pendukung respons kesehatan ternak. Produk membantu peternak:

1. memilih ternak;
2. melaporkan gejala dengan bahasa sederhana;
3. menjawab pertanyaan lanjutan;
4. memahami tingkat urgensi awal;
5. memperoleh tindakan konservatif yang aman;
6. memilih dokter hewan;
7. memantau status kasus;
8. memperoleh edukasi kontekstual.

Veternak **bukan alat diagnosis**, tidak memberikan resep atau dosis obat, dan tidak menggantikan pemeriksaan dokter hewan.

## 2.2 Sasaran UX Utama

Pengguna harus dapat menyelesaikan laporan utama dalam waktu maksimal sekitar tiga menit, dengan pertanyaan lanjutan maksimal lima pertanyaan. Alur harus tetap dapat diteruskan ketika AI gagal atau koneksi tidak stabil.

## 2.3 Prioritas Desain

Urutan prioritas setiap keputusan desain:

1. **Kejelasan tindakan.** Pengguna selalu memahami apa yang harus dilakukan berikutnya.
2. **Keselamatan informasi.** UI tidak boleh terlihat memberikan diagnosis pasti.
3. **Kemudahan penggunaan.** Bahasa sederhana, tombol besar, form singkat.
4. **Kepercayaan.** Data asli, alasan triase, sumber guidance, dan status ditampilkan transparan.
5. **Kecepatan.** Alur utama tidak dibebani dekorasi atau input yang tidak dibutuhkan.
6. **Konsistensi.** Warna, komponen, istilah, dan interaksi menggunakan sistem yang sama.

---

# 3. Konsep Desain Utama

## 3.1 Nama Arah Visual

## **Pastoral Health-Tech**

Perpaduan antara:

- teknologi kesehatan yang profesional;
- suasana peternakan yang sehat dan alami;
- visual editorial yang modern;
- pengalaman yang hangat, tenang, dan manusiawi.

## 3.2 Formula Visual

- **50% clean digital product:** layout rapi, card terstruktur, whitespace luas.
- **30% healthy pastoral atmosphere:** rumput, bukit, sapi, kambing, cahaya pagi.
- **20% editorial character:** headline serif besar pada landing dan campaign section.

## 3.3 Karakter Merek

Veternak harus terasa:

- tepercaya;
- menenangkan;
- sederhana;
- cepat;
- peduli;
- membumi;
- modern;
- transparan.

Veternak tidak boleh terasa:

- seperti marketplace ternak;
- seperti aplikasi diagnosis otomatis;
- terlalu futuristik atau penuh efek AI;
- terlalu klinis dan menakutkan;
- seperti aplikasi anak-anak;
- terlalu formal seperti dokumen pemerintahan;
- terlalu padat dan teknis.

## 3.4 Prinsip Visual

### Calm before alarm
Mayoritas UI menggunakan putih, hijau lembut, dan neutral. Merah hanya muncul saat benar-benar dibutuhkan.

### Nature supports, information leads
Ilustrasi membangun emosi, tetapi informasi kesehatan tetap menjadi pusat perhatian.

### Explain, do not impress
AI dan triase harus menjelaskan alasan, bukan sekadar menampilkan hasil yang terlihat canggih.

### Large actions, short decisions
Tombol utama besar, pilihan mudah dipahami, dan satu layar idealnya hanya memiliki satu keputusan utama.

### Human language over medical jargon
Istilah medis selalu diterjemahkan ke bahasa peternak.

---

# 4. Identitas Visual

## 4.1 Logo Direction

Logo final belum ditetapkan. Arah logo yang digunakan sementara:

- wordmark `Veternak` dengan bentuk modern dan ramah;
- ikon sederhana yang menggabungkan siluet kepala sapi atau tanduk dengan daun atau tanda respons;
- bentuk tidak terlalu detail agar tetap terbaca pada ukuran favicon;
- tidak menggunakan simbol salib medis sebagai elemen utama;
- tidak menggunakan visual jarum suntik atau obat;
- dapat digunakan dalam versi horizontal, icon-only, dan monokrom.

### Penulisan merek

Gunakan konsisten:

- **Veternak** untuk nama produk;
- **VETERNAK** hanya untuk heading kecil atau lockup tertentu;
- jangan menggunakan `VetTernak`, `VETTERNAK`, atau variasi lain dalam UI.

## 4.2 Tagline Rekomendasi

**Respons Cepat untuk Ternak Lebih Sehat.**

Alternatif landing copy:

- Laporkan lebih cepat, tangani lebih tepat.
- Dari gejala pertama hingga bantuan dokter.
- Pendamping respons kesehatan ternak Anda.

---

# 5. Sistem Warna

## 5.1 Prinsip Penggunaan

- 65–70% interface menggunakan putih dan neutral.
- 15–20% menggunakan hijau natural.
- 5–8% menggunakan lime sebagai CTA dan highlight.
- 3–5% menggunakan kuning floral.
- Merah, jingga, dan kuning status hanya digunakan secara semantik.
- Status tidak boleh dibedakan hanya dengan warna; selalu gunakan label dan ikon.

## 5.2 Primary Brand Palette

| Token | Hex | Fungsi |
|---|---:|---|
| Primary 950 | `#102A1B` | Teks sangat gelap, tombol lime text |
| Primary 900 | `#173A25` | Footer dan surface gelap |
| Primary 800 | `#20502F` | Hover tombol gelap |
| Primary 700 | `#2F6B3C` | Warna brand utama |
| Primary 600 | `#4C8B45` | Ikon aktif, grafik |
| Primary 500 | `#6FAA48` | Elemen visual pendukung |
| Primary 400 | `#85CB18` | CTA utama |
| Primary 300 | `#B7DC72` | Accent ringan |
| Primary 200 | `#D8EDAC` | Focus ring, chip |
| Primary 100 | `#EFF8E3` | Background section |
| Primary 50 | `#F8FCEF` | Background sangat lembut |

### Kombinasi utama

- Primary action: `#85CB18` dengan teks `#102A1B`.
- Brand dark: `#2F6B3C` dengan teks putih.
- Soft brand surface: `#EFF8E3` dengan teks `#20502F`.

## 5.3 Botanical Illustration Palette

| Nama | Hex | Fungsi |
|---|---:|---|
| Pine Green | `#345B38` | Rumput atau pohon gelap |
| Moss Green | `#527C4D` | Bukit belakang |
| Sage Green | `#7FA273` | Daun lembut |
| Pasture Green | `#91BD65` | Bukit utama |
| Fresh Grass | `#A8CF63` | Area terkena cahaya |
| Sunlit Meadow | `#C8D667` | Bukit terang |
| Pale Sage | `#DCEADB` | Layer kabut |
| Mist Green | `#EEF5E9` | Background lanskap |

## 5.4 Yellow Accent Palette

| Token | Hex | Fungsi |
|---|---:|---|
| Yellow 700 | `#987500` | Teks pada surface kuning |
| Yellow 600 | `#BE9600` | Ikon perhatian |
| Yellow 500 | `#E4C52E` | Bunga dan detail ilustrasi |
| Yellow 400 | `#F2D84B` | Accent utama |
| Yellow 300 | `#F7E87F` | Highlight |
| Yellow 200 | `#FBF1B3` | Badge lembut |
| Yellow 100 | `#FFF9DA` | Background perhatian ringan |

## 5.5 Neutral Palette

| Token | Hex | Fungsi |
|---|---:|---|
| Neutral 950 | `#0B0E0B` | Headline |
| Neutral 900 | `#202722` | Teks utama |
| Neutral 800 | `#343D36` | Teks kuat sekunder |
| Neutral 700 | `#505B53` | Deskripsi |
| Neutral 600 | `#69736C` | Teks sekunder |
| Neutral 500 | `#8D978F` | Placeholder dan caption |
| Neutral 400 | `#B6BFB8` | Disabled text |
| Neutral 300 | `#D4DCD6` | Border kuat |
| Neutral 200 | `#E5EAE6` | Border standar |
| Neutral 100 | `#F1F4F1` | Background input disabled |
| Neutral 50 | `#F8FAF8` | Background aplikasi |
| Canvas | `#F1F4F9` | Background luar landing |
| White | `#FFFFFF` | Surface utama |

## 5.6 Warm Natural Surface

| Nama | Hex | Fungsi |
|---|---:|---|
| Warm White | `#FFFDF7` | Artikel dan detail modul |
| Soft Cream | `#FBF9EE` | Akademi Ternak |
| Sand | `#EFE9D5` | Card edukasi |
| Light Earth | `#D8CBA7` | Detail ilustrasi |
| Natural Brown | `#8C704B` | Kayu atau tanah |
| Deep Earth | `#594631` | Detail gelap ilustrasi |

## 5.7 Semantic Status Palette

| Status | Main | Soft Background | Dark Text |
|---|---:|---:|---:|
| Success | `#2E7D4F` | `#E8F5EC` | `#1D5937` |
| Information | `#2E74B5` | `#EAF3FB` | `#205580` |
| Warning | `#D69B00` | `#FFF7D6` | `#725300` |
| Error | `#D83A3A` | `#FDEBEC` | `#912525` |
| Disabled | `#8D978F` | `#F1F3F2` | `#5F6861` |

## 5.8 Urgency Palette

| Urgensi | Main | Background | Ikon |
|---|---:|---:|---|
| Darurat | `#D83A3A` | `#FDEBEC` | Siren / Octagon Alert |
| Mendesak | `#E56A22` | `#FFF0E5` | Triangle Alert / Clock |
| Perlu diperiksa | `#D69B00` | `#FFF7D6` | Stethoscope / Calendar |
| Pemantauan | `#2E7D6B` | `#E6F5F1` | Eye / Activity |
| Tidak dapat dinilai | `#6B7280` | `#F1F3F5` | Circle Question Mark |

## 5.9 Contagion Risk Palette

| Risiko | Main | Background |
|---|---:|---:|
| Rendah | `#3A8B57` | `#E9F6ED` |
| Sedang | `#D29B00` | `#FFF6D2` |
| Tinggi | `#C73B3B` | `#FCE8E8` |
| Belum dapat dinilai | `#737B76` | `#F0F2F1` |

## 5.10 Larangan Warna

- Jangan memakai merah sebagai warna brand atau dekorasi.
- Jangan memakai lime untuk teks panjang.
- Jangan menggunakan lebih dari satu warna status dominan dalam satu card.
- Jangan menggunakan gradient neon atau glow futuristik.
- Jangan menggunakan hijau untuk menyampaikan kondisi darurat.

---

# 6. Tipografi

## 6.1 Font Utama

### UI font — Plus Jakarta Sans

Digunakan untuk:

- navigasi;
- tombol;
- form;
- card;
- dashboard;
- data;
- status;
- body text.

Fallback:

```css
font-family: "Plus Jakarta Sans", Inter, system-ui, sans-serif;
```

### Display font — DM Serif Display

Digunakan terbatas untuk:

- hero landing page;
- headline kampanye;
- heading besar Akademi Ternak;
- statement brand.

Fallback:

```css
font-family: "DM Serif Display", Georgia, serif;
```

Display font tidak digunakan untuk form, status, data, atau dashboard dokter.

## 6.2 Type Scale

| Style | Desktop | Mobile | Weight | Line Height |
|---|---:|---:|---:|---:|
| Display XL | 72 px | 44 px | 400 serif | 1.00 |
| Display L | 56 px | 38 px | 400 serif | 1.05 |
| Heading 1 | 44 px | 32 px | 700 | 1.15 |
| Heading 2 | 36 px | 28 px | 700 | 1.20 |
| Heading 3 | 28 px | 24 px | 700 | 1.25 |
| Heading 4 | 22 px | 20 px | 700 | 1.30 |
| Body L | 18 px | 17 px | 400 | 1.60 |
| Body M | 16 px | 16 px | 400 | 1.55 |
| Body S | 14 px | 14 px | 400 | 1.50 |
| Label | 14 px | 14 px | 600 | 1.35 |
| Caption | 12 px | 12 px | 500 | 1.40 |
| Button | 15–16 px | 15–16 px | 700 | 1.00 |

## 6.3 Aturan Tipografi

- Panjang ideal body text: 55–75 karakter per baris.
- Hindari seluruh huruf kapital untuk kalimat panjang.
- Status boleh menggunakan uppercase kecil dengan letter spacing 0.04em.
- Data angka pada dashboard menggunakan tabular numbers.
- Maksimal dua keluarga font dalam satu halaman.
- Headline serif hanya digunakan sebagai aksen editorial, bukan di setiap halaman.

---

# 7. Grid, Spacing, dan Layout

## 7.1 Breakpoints

| Nama | Lebar |
|---|---:|
| Small mobile | 360 px |
| Mobile | 390–430 px |
| Tablet | 768 px |
| Small desktop | 1024 px |
| Desktop | 1280 px |
| Wide desktop | 1440 px |

Implementasi Tailwind:

- `sm`: 640 px
- `md`: 768 px
- `lg`: 1024 px
- `xl`: 1280 px
- `2xl`: 1440 px

## 7.2 Column Grid

- Mobile: 4 kolom, gutter 16 px, margin 16 px.
- Tablet: 8 kolom, gutter 20 px, margin 24 px.
- Desktop: 12 kolom, gutter 24 px, margin 32–64 px.
- Maximum content width: 1200 px.
- Landing marketing max width: 1280 px.
- Form utama max width: 720 px.
- Reading content max width: 760 px.

## 7.3 Spacing Scale

Gunakan basis 4 px:

| Token | Value |
|---|---:|
| 1 | 4 px |
| 2 | 8 px |
| 3 | 12 px |
| 4 | 16 px |
| 5 | 20 px |
| 6 | 24 px |
| 8 | 32 px |
| 10 | 40 px |
| 12 | 48 px |
| 16 | 64 px |
| 20 | 80 px |
| 24 | 96 px |

## 7.4 Section Spacing

- Mobile section vertical padding: 56–72 px.
- Desktop section vertical padding: 88–120 px.
- Dashboard content gap: 24 px.
- Card internal padding: 16 px mobile, 20–24 px desktop.
- Form field vertical gap: 20 px.

## 7.5 Border Radius

| Token | Value | Fungsi |
|---|---:|---|
| Radius S | 8 px | Small badge, small input |
| Radius M | 12 px | Input, button |
| Radius L | 16 px | Card standar |
| Radius XL | 20 px | Hero card, modal |
| Radius 2XL | 28 px | Marketing section |
| Pill | 999 px | Chip dan badge |

## 7.6 Shadow

```css
--shadow-xs: 0 1px 2px rgba(16, 42, 27, 0.04);
--shadow-sm: 0 4px 14px rgba(16, 42, 27, 0.06);
--shadow-md: 0 12px 32px rgba(16, 42, 27, 0.08);
--shadow-lg: 0 24px 64px rgba(16, 42, 27, 0.10);
```

Gunakan border lembut sebelum memakai shadow. Dashboard sebaiknya lebih banyak menggunakan border daripada shadow.

---

# 8. Ikonografi

## 8.1 Library

Gunakan **Lucide Icons** untuk UI.

## 8.2 Gaya

- Outline rounded.
- Stroke 1.75–2 px.
- Ukuran umum 18, 20, 24 px.
- Ikon tidak boleh berdiri sendiri untuk aksi kritis.
- Selalu sertai label teks pada status dan tindakan medis.

## 8.3 Ikon Utama

- House — Beranda.
- Beef — Sapi atau ternak.
- Paw Print atau custom goat icon — Kambing.
- Clipboard Plus — Lapor gejala.
- Stethoscope — Dokter.
- Message Circle — Konsultasi.
- Graduation Cap / Book Open — Akademi.
- Map Pin — Lokasi.
- Camera — Foto.
- Thermometer — Suhu.
- Activity — Kondisi umum.
- Wind — Pernapasan.
- Utensils / Wheat — Nafsu makan.
- Clock — Waktu gejala.
- Shield Check — Tindakan aman.
- Triangle Alert — Mendesak.
- Siren / Octagon Alert — Darurat.
- Sparkles — Bantuan AI nonmedis.

---

# 9. Ilustrasi dan Fotografi

## 9.1 Gaya Hero

Gunakan ilustrasi **editorial pastoral semi-flat**:

- bukit dan padang rumput berlapis;
- sapi sehat sebagai subjek utama;
- kambing sehat sebagai subjek sekunder;
- cahaya pagi atau sore lembut;
- rumput dan bunga kuning sebagai detail;
- bentuk organik;
- tekstur ringan seperti gouache atau vector painterly;
- ruang putih luas di bagian atas;
- tidak terlihat seperti kartun anak-anak.

## 9.2 Komposisi Hero

- 55–65% area atas tetap bersih untuk copy.
- Ilustrasi menempati 35–45% bagian bawah.
- Sapi berada di area sepertiga kanan atau kiri, bukan tepat di tengah headline.
- Horizon rendah agar headline tetap dominan.
- Detail rumput dapat keluar sedikit dari batas ilustrasi untuk memberi kedalaman.

## 9.3 Representasi Ternak

Ternak harus tampak:

- sehat;
- aktif;
- terawat;
- proporsional;
- berada di lingkungan peternakan yang bersih.

Hindari:

- luka terbuka pada landing page;
- hewan tampak menderita sebagai dekorasi;
- kandang kumuh stereotip;
- gaya peternakan luar negeri yang tidak relevan;
- logo atau merek pihak lain.

## 9.4 Fotografi

Gunakan foto nyata untuk:

- profil ternak;
- profil dokter;
- artikel edukasi;
- bukti laporan pengguna.

Prinsip foto:

- pencahayaan natural;
- konteks peternakan Indonesia bila memungkinkan;
- tidak menggunakan filter hijau berlebihan;
- fokus pada hewan dan tindakan perawatan;
- cropping sederhana dan jelas.

## 9.5 Empty State Illustration

Gunakan ilustrasi line atau semi-flat sederhana untuk:

- belum ada ternak;
- belum ada kasus;
- belum ada konsultasi;
- belum ada materi tersimpan;
- koneksi terputus.

Empty state tidak boleh terlihat seperti error besar. Gunakan tone lembut dan CTA jelas.

---

# 10. Sistem Komponen

## 10.1 Button

### Primary Button

- Background: `#85CB18`.
- Text: `#102A1B`.
- Height mobile: 52 px.
- Height desktop: 48 px.
- Horizontal padding: 20–24 px.
- Radius: 12 px atau pill untuk marketing CTA.
- Font: 15–16 px, weight 700.
- Hover: `#78B811`.
- Pressed: `#659E0D`.
- Focus ring: 3 px `#D8EDAC`.

### Secondary Button

- Background putih.
- Text `#2F6B3C`.
- Border `#D4DCD6`.
- Hover `#F8FCEF`.

### Dark Button

- Background `#2F6B3C`.
- Text putih.
- Hover `#20502F`.

### Destructive Button

- Background `#D83A3A`.
- Text putih.
- Hanya untuk tindakan destruktif seperti membatalkan laporan atau menghapus profil.

### Button Rules

- Satu halaman memiliki satu primary action dominan.
- Pada mobile, CTA utama dapat full width.
- Tombol kritis selalu menggunakan ikon dan teks.
- Disabled state tetap terbaca tetapi tidak terlalu samar.

## 10.2 Input

- Height: 52 px.
- Background: putih.
- Border: `#D4DCD6`.
- Radius: 12 px.
- Label selalu di luar input.
- Helper text di bawah input.
- Focus border: `#6FAA48`.
- Focus ring: `#D8EDAC`.
- Error: border `#D83A3A`, icon, dan pesan spesifik.
- Placeholder tidak menggantikan label.

## 10.3 Textarea Symptom Report

- Minimum height: 144 px.
- Menampilkan contoh bahasa sehari-hari.
- Mendukung voice input bila tersedia.
- Menampilkan counter karakter secara halus.
- Input asli tidak boleh diganti otomatis oleh AI.

Contoh placeholder:

> Contoh: Sapi saya sejak pagi tidak mau makan, terlihat lemas, dan napasnya lebih cepat.

## 10.4 Selection Card

Digunakan untuk:

- pilih ternak;
- jenis ternak;
- jawaban pertanyaan;
- layanan dokter.

Spesifikasi:

- min-height 56 px;
- border 1 px;
- selected state memakai border Primary 600 dan background Primary 50;
- check icon pada state selected;
- seluruh area card dapat diklik.

## 10.5 Animal Card

Isi minimum:

- foto atau avatar spesies;
- nama atau kode ternak;
- jenis;
- umur;
- lokasi kandang;
- status kesehatan terakhir;
- tanggal pembaruan;
- CTA lihat detail.

Pada mobile, status berada di bawah nama, bukan di pojok sempit.

## 10.6 Statistic Card

Digunakan di dashboard:

- jumlah ternak aktif;
- kasus aktif;
- konsultasi aktif;
- kasus perlu perhatian.

Aturan:

- angka besar 28–36 px;
- label singkat;
- ikon kecil;
- jangan membuat dashboard penuh warna;
- hanya card yang perlu perhatian memakai semantic highlight.

## 10.7 Status Badge

- Bentuk pill.
- Tinggi 28–32 px.
- Ikon 14–16 px.
- Label eksplisit.
- Gunakan background soft dan text dark semantic.

Contoh:

`[Alert icon] Darurat`

## 10.8 Triage Result Card

Struktur wajib:

1. label “Hasil penilaian awal”;
2. urgency badge;
3. satu kalimat arti status;
4. alasan utama;
5. data yang belum diketahui;
6. CTA dokter;
7. disclaimer.

Tidak boleh menampilkan:

- persentase penyakit;
- nama diagnosis sebagai hasil;
- ilustrasi penyakit yang menakutkan;
- animasi sirene berulang.

## 10.9 Guidance Checklist

Setiap item memiliki:

- checkbox;
- instruksi singkat;
- optional detail accordion;
- sumber atau label “Panduan terverifikasi”;
- daftar larangan terpisah.

Tindakan dan larangan tidak boleh bercampur dalam satu warna.

## 10.10 Veterinarian Card

Isi minimum:

- foto atau avatar;
- nama;
- keahlian spesies;
- area layanan;
- ketersediaan;
- jarak;
- estimasi waktu;
- kunjungan tersedia atau tidak;
- alasan rekomendasi;
- label `Data Demo` bila sintetis.

CTA:

- Lihat profil.
- Pilih dokter.

## 10.11 AI Assistant Panel

AI tidak memiliki persona dokter. Gunakan nama fungsional:

**Asisten Veternak**

Visual:

- icon sparkles atau structured-data icon;
- background biru atau hijau sangat lembut;
- tidak memakai avatar manusia berjas dokter;
- label “Dibantu AI” pada hasil ekstraksi;
- tombol “Periksa dan ubah data”.

## 10.12 Upload Card

- Dropzone pada desktop.
- Camera-first pada mobile.
- Preview gambar.
- Progress upload.
- Opsi ganti atau hapus.
- Informasi ukuran dan tipe file.
- Jelaskan bahwa foto membantu dokter memahami kondisi, bukan digunakan untuk diagnosis otomatis.

## 10.13 Timeline Status

Status kasus:

1. Laporan dibuat.
2. Analisis selesai.
3. Dokter dipilih.
4. Permintaan dikirim.
5. Dokter menerima.
6. Dokter menuju lokasi.
7. Dokter tiba.
8. Penanganan berlangsung.
9. Pemantauan.
10. Selesai atau dibatalkan.

Desktop: vertical timeline pada side panel atau content column.  
Mobile: vertical timeline full width.

Setiap status menampilkan timestamp dan aktor.

## 10.14 Chat

- Bubble sederhana, bukan gaya sosial media yang ramai.
- Label chat sebagai komunikasi, bukan kanal darurat terjamin.
- Pesan dokter dan peternak dibedakan melalui alignment serta surface, bukan hanya warna.
- Tombol kondisi memburuk berada di luar input chat dan selalu terlihat.

## 10.15 Academy Card

Isi:

- thumbnail;
- format: video, artikel, atau checklist;
- kategori;
- judul;
- estimasi waktu baca atau tonton;
- alasan rekomendasi bila kontekstual.

Gunakan warm cream surface untuk membedakan edukasi dari proses kasus.

---

# 11. Navigasi dan Information Architecture

## 11.1 Public Navigation

Desktop:

- Logo.
- Cara Kerja.
- Fitur.
- Akademi.
- Tentang.
- Masuk.
- CTA `Mulai Laporkan`.

Mobile:

- Logo.
- Menu button.
- CTA utama tetap mudah ditemukan.

## 11.2 Peternak Mobile Navigation

Bottom navigation maksimal lima item:

1. Beranda.
2. Ternak.
3. **Lapor** — tombol tengah paling dominan.
4. Konsultasi.
5. Akademi.

Tombol Lapor menggunakan lime dan icon clipboard plus.

## 11.3 Peternak Desktop Navigation

Sidebar ringan atau top navigation:

- Beranda.
- Ternak Saya.
- Laporan.
- Konsultasi.
- Akademi Ternak.

Pada desktop hackathon, sidebar 240 px memberi struktur yang lebih jelas.

## 11.4 Dokter Navigation

Sidebar:

- Ringkasan.
- Kasus Masuk.
- Kasus Aktif.
- Jadwal.
- Riwayat.
- Profil.

Kasus dengan urgensi tinggi memiliki indicator count, tetapi jangan membuat seluruh sidebar merah.

---

# 12. Blueprint Halaman

## 12.1 Landing Page

### Tujuan

Membangun kepercayaan dan menjelaskan alur Veternak dengan cepat.

### Struktur

1. Navbar minimal.
2. Small announcement badge.
3. Headline editorial.
4. Supporting copy.
5. CTA `Laporkan Gejala`.
6. Secondary CTA `Lihat Cara Kerja`.
7. Trust indicators.
8. Ilustrasi padang rumput dengan sapi dan kambing sehat.
9. Masalah yang diselesaikan.
10. Cara kerja empat langkah.
11. Fitur utama.
12. Penjelasan AI yang aman.
13. Akademi Ternak.
14. CTA penutup.
15. Footer.

### Hero Copy Rekomendasi

**Headline:**

> Respons Lebih Cepat, Ternak Lebih Terjaga.

**Subheadline:**

> Ceritakan kondisi ternak dengan bahasa sederhana, pahami tingkat urgensinya, dan temukan bantuan dokter hewan dalam satu alur.

### Visual

- White surface di atas page canvas `#F1F4F9`.
- Card atau frame utama radius 20–28 px.
- Ilustrasi mulai dari bawah hero.
- Hindari hero dashboard screenshot yang terlalu padat.

## 12.2 Login dan Onboarding

### Login

- Single column, max width 440 px.
- Logo dan welcome message.
- Email atau nomor telepon.
- Password.
- CTA masuk.
- Label data demo bila menggunakan akun simulasi.

### Onboarding peternak

1. Nama pengguna.
2. Nama kandang.
3. Lokasi kandang.
4. Jenis ternak utama.
5. Tambahkan ternak pertama.

Gunakan progress indicator dan pilihan “Lewati untuk sekarang” hanya untuk data yang tidak wajib.

## 12.3 Beranda Peternak

Urutan konten mobile:

1. Salam dan lokasi kandang.
2. Emergency-aware CTA `Laporkan Gejala`.
3. Ringkasan ternak.
4. Kasus aktif.
5. Daftar ternak.
6. Aktivitas terbaru.
7. Rekomendasi Akademi.

Desktop:

- 8 kolom content + 4 kolom side panel.
- Side panel untuk aktivitas dan edukasi.

## 12.4 Daftar dan Profil Ternak

### Daftar

- Search.
- Filter sapi atau kambing.
- Grid dua atau tiga kolom desktop.
- List card mobile.
- CTA `Tambah Ternak`.

### Profil

- Header foto, nama, kode, status.
- Data dasar.
- Riwayat laporan.
- Catatan.
- CTA `Laporkan Kondisi Ternak Ini`.

## 12.5 Smart Symptom Report

Gunakan multi-step form:

1. Pilih ternak.
2. Ceritakan kondisi.
3. Kondisi penting.
4. Foto.
5. Periksa laporan.

### Aturan

- Progress bar dan label langkah.
- Autosave local draft.
- Tombol Kembali dan Lanjut.
- Tidak lebih dari 5–7 input per langkah.
- Mobile menggunakan sticky bottom action bar.

## 12.6 Pertanyaan Lanjutan AI

- Satu pertanyaan per layar atau card.
- Progress `Pertanyaan 2 dari 5`.
- Jawaban berupa selection cards.
- Selalu sediakan `Tidak tahu`.
- Copy: “Kami membutuhkan sedikit informasi tambahan.”
- Hindari copy: “AI sedang mendiagnosis.”

## 12.7 Review Hasil Ekstraksi

Tampilkan dua area:

- Catatan asli peternak.
- Data yang disusun sistem.

Setiap field dapat diedit.

Gunakan label:

- `Dari laporan Anda`.
- `Disusun oleh Asisten Veternak`.
- `Belum diketahui`.

## 12.8 Hasil Triase dan Tindakan Awal

Urutan mobile:

1. Triage status.
2. Arti status.
3. Alasan.
4. Risiko penularan awal.
5. CTA cari dokter.
6. Guidance checklist.
7. Larangan.
8. Disclaimer.
9. Rekomendasi edukasi.

Kasus darurat menggunakan sticky CTA `Hubungi bantuan dokter` tanpa mengubah seluruh halaman menjadi merah.

## 12.9 Rekomendasi Dokter

- Header kasus singkat.
- Sort: paling sesuai, paling dekat, tersedia sekarang.
- Minimal tiga doctor cards.
- Alasan rekomendasi terlihat.
- Label demo jelas.
- Jika tidak tersedia, tampilkan fallback Puskeswan demo atau kontak layanan.

## 12.10 Ringkasan Kasus

- Informasi ternak.
- Gejala dan waktu mulai.
- Jawaban lanjutan.
- Foto.
- Urgensi dan risiko penularan.
- Tindakan yang sudah dilakukan.
- Catatan asli.
- Dokter terpilih.
- CTA kirim.

Ringkasan harus dapat dibaca cepat oleh dokter melalui heading dan bullet, bukan paragraf panjang.

## 12.11 Konsultasi dan Status Kasus

Desktop:

- Main column: timeline dan chat.
- Side column: dokter, ternak, urgency, emergency action.

Mobile:

- Status card.
- Doctor card compact.
- Timeline.
- Chat.
- Sticky `Kondisi Memburuk` action.

## 12.12 Akademi Ternak

Visual lebih hangat dan editorial:

- featured module;
- category chips;
- search;
- video card;
- article cards;
- checklist cards;
- recommended for your case.

Detail artikel menggunakan max width 760 px dan body typography 17–18 px.

## 12.13 Dashboard Dokter

Prioritas informasi:

1. Kasus darurat dan mendesak.
2. Kasus baru.
3. Kunjungan hari ini.
4. Kasus aktif.
5. Update terbaru.

Desktop-first, tetap usable pada tablet.

Tabel kasus memiliki:

- ternak;
- peternak;
- gejala utama;
- urgency;
- waktu laporan;
- jarak;
- status;
- CTA detail.

## 12.14 Detail Kasus Dokter

Struktur:

- urgency banner compact;
- ringkasan AI;
- catatan asli peternak;
- foto;
- data ternak;
- lokasi;
- rule yang terpicu;
- tindakan awal yang diberikan;
- tombol terima atau tolak;
- update status;
- catatan dokter.

Dokter dapat melihat data teknis lebih detail daripada peternak, tetapi diagnosis tetap berasal dari dokter.

---

# 13. Pola Interaksi AI

## 13.1 Posisi AI

AI adalah alat bantu untuk:

- memahami cerita;
- menyusun data;
- memilih pertanyaan dari bank pertanyaan;
- merangkum;
- menjelaskan rule;
- merekomendasikan modul.

AI bukan dokter dan tidak menentukan diagnosis.

## 13.2 Label AI

Gunakan:

- Dibantu AI.
- Disusun oleh Asisten Veternak.
- Periksa kembali informasi ini.
- Analisis laporan sedang diproses.

Hindari:

- Diagnosis AI.
- AI mendeteksi penyakit.
- Akurasi 95%.
- Positif penyakit tertentu.

## 13.3 AI Loading State

Urutan copy:

1. “Menyusun informasi dari laporan Anda…”
2. “Memeriksa informasi yang belum lengkap…”
3. “Menyiapkan langkah berikutnya…”

Gunakan progress indeterminate maksimal beberapa detik. Bila lebih lama, tampilkan fallback.

## 13.4 AI Failure State

Copy:

> Laporan belum dapat disusun otomatis. Jawaban Anda tetap tersimpan dan Anda dapat melanjutkan melalui form manual.

CTA:

- Lanjutkan secara manual.
- Coba lagi.
- Cari dokter.

AI gagal tidak boleh memblokir pencarian dokter.

## 13.5 Explainability

Setiap triase memiliki:

- status;
- alasan yang mudah dipahami;
- data yang belum diketahui;
- tindakan berikutnya;
- sumber keputusan: aturan sistem, bukan diagnosis AI.

Rule ID dapat ditampilkan di accordion `Detail sistem` untuk dokter atau demo juri, bukan sebagai informasi utama peternak.

---

# 14. UX Writing

## 14.1 Tone of Voice

- semi-formal;
- hangat;
- singkat;
- langsung;
- tidak menggurui;
- tidak menakut-nakuti;
- menggunakan Bahasa Indonesia sehari-hari.

Gunakan sapaan **Anda** agar netral dan profesional.

## 14.2 Terminologi Konsisten

| Gunakan | Hindari sebagai label utama |
|---|---|
| Tingkat urgensi | Triase tanpa penjelasan |
| Penilaian awal | Diagnosis |
| Laporan kondisi | Klaim penyakit |
| Tindakan awal | Pengobatan |
| Risiko penularan awal | Wabah terdeteksi |
| Dokter hewan | Dokter saja bila ambigu |
| Belum dapat dinilai | Sistem tidak tahu |
| Kondisi memburuk | Panic button |

## 14.3 Pola Pesan

### Instruksi

> Pilih ternak yang sedang mengalami perubahan kondisi.

### Helper

> Anda tetap dapat melanjutkan meskipun suhu belum diukur.

### Error

> Pilih satu ternak sebelum melanjutkan.

### Disclaimer

> Hasil ini merupakan penilaian awal berdasarkan informasi yang Anda berikan dan bukan diagnosis dokter hewan.

### Data Demo

> Profil ini menggunakan data demo dan belum menunjukkan kemitraan nyata.

## 14.4 Larangan Copy

Jangan menggunakan:

- pasti;
- positif;
- terdeteksi penyakit;
- dijamin;
- dokter pasti datang;
- obat yang harus diberikan;
- dosis;
- wabah terdeteksi.

---

# 15. State Design

## 15.1 Loading

- Gunakan skeleton yang menyerupai layout akhir.
- Jangan menampilkan spinner besar di tengah dashboard.
- Upload memakai progress bar.
- AI menggunakan status copy bertahap.

## 15.2 Empty State

Setiap empty state memiliki:

- ilustrasi atau icon;
- judul singkat;
- penjelasan satu kalimat;
- satu CTA utama.

Contoh:

> Belum ada ternak. Tambahkan ternak pertama agar laporan kondisi dapat dibuat lebih cepat.

## 15.3 Offline

- Banner persistent di atas atau bawah.
- Jelaskan bahwa draft disimpan di perangkat.
- Tampilkan tombol coba sinkronkan.
- Jangan menghapus input.

## 15.4 Error

- Jelaskan apa yang gagal.
- Jelaskan apakah data tersimpan.
- Berikan tindakan pemulihan.
- Jangan menampilkan kode teknis kepada pengguna umum.

## 15.5 Success

Gunakan toast untuk aksi ringan dan confirmation panel untuk aksi besar seperti laporan berhasil dikirim.

---

# 16. Motion dan Microinteraction

## 16.1 Prinsip

- Ringan.
- Fungsional.
- Tidak mengganggu.
- Tidak memperlambat tindakan kritis.

## 16.2 Durasi

- Hover: 120–160 ms.
- Button press: 100 ms.
- Card transition: 180–220 ms.
- Page or step transition: 220–300 ms.
- Modal: maksimal 250 ms.

## 16.3 Motion Utama

- Progress langkah laporan.
- Selection card check animation.
- Upload progress.
- Timeline status update.
- Checklist completion.
- Smooth collapse pada detail alasan.

Hindari animasi bounce, glow AI, dan sirene berulang.

Dukung `prefers-reduced-motion`.

---

# 17. Accessibility

## 17.1 Standar Minimum

Target WCAG 2.2 AA untuk alur utama.

## 17.2 Aturan

- Kontras teks normal minimal 4.5:1.
- Kontras teks besar minimal 3:1.
- Touch target minimal 44 x 44 px; target ideal 48–52 px.
- Focus state jelas.
- Semua form dapat digunakan dengan keyboard.
- Label selalu terhubung ke input.
- Pesan error dibaca screen reader.
- Status tidak hanya melalui warna.
- Ikon kritis disertai teks.
- Heading mengikuti urutan semantik.
- Modal mengelola focus dengan benar.
- Gambar dekoratif memakai alt kosong.
- Foto ternak memiliki alt kontekstual.
- Video Akademi memiliki ringkasan teks.

## 17.3 Bahasa dan Literasi

- Maksimal satu gagasan utama per paragraf.
- Kalimat ideal 8–18 kata.
- Hindari singkatan tanpa penjelasan.
- Jelaskan istilah veteriner dengan bahasa sehari-hari.
- Jangan mengandalkan tabel kompleks di mobile.

---

# 18. Responsive Behavior

## 18.1 Mobile-First

Peternak diprioritaskan pada mobile browser.

- CTA utama full width.
- Bottom navigation fixed.
- Form satu kolom.
- Sticky action bar pada multi-step form.
- Card ditumpuk vertikal.
- Tabel berubah menjadi card list.
- Side panel berubah menjadi section.

## 18.2 Tablet

- Dashboard dua kolom.
- Sidebar dapat collapse.
- Doctor case list dapat menggunakan table compact.
- Form tetap max width 720 px.

## 18.3 Desktop

- Max content width 1200 px.
- Sidebar 232–256 px.
- Main content tidak melebihi 900 px untuk halaman detail.
- Secondary information berada di side column.
- Jangan meregangkan paragraf ke seluruh layar.

## 18.4 Landing Page

- Hero desktop centered editorial.
- Hero mobile left-aligned agar mudah dibaca.
- Ilustrasi desktop lebih kaya.
- Ilustrasi mobile disederhanakan agar cepat dimuat.

---

# 19. Performance Design Rules

- Gunakan AVIF atau WebP untuk ilustrasi dan foto.
- Sediakan responsive image sizes.
- Kompres foto sebelum upload.
- Lazy-load video dan konten di bawah fold.
- Jangan memuat peta pada beranda.
- Gunakan skeleton loading.
- Ilustrasi hero memiliki versi mobile yang lebih ringan.
- Hindari background video.
- Hindari library animasi besar untuk kebutuhan sederhana.
- Draft form tersimpan secara lokal.

---

# 20. Implementasi Frontend

## 20.1 Stack

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- React Hook Form.
- Zod.
- Lucide Icons.
- TanStack Query bila dibutuhkan.

## 20.2 Component Strategy

Gunakan shadcn/ui sebagai fondasi, lalu sesuaikan token dan variant. Jangan menggunakan tampilan default shadcn tanpa branding.

Komponen domain yang perlu dibuat:

```text
components/
  brand/
    Logo.tsx
    PastoralHero.tsx
  animals/
    AnimalCard.tsx
    AnimalSelector.tsx
    HealthStatusBadge.tsx
  reports/
    SymptomTextarea.tsx
    ReportStepper.tsx
    FollowupQuestionCard.tsx
    ExtractionReview.tsx
  triage/
    UrgencyBadge.tsx
    TriageResultCard.tsx
    ContagionRiskCard.tsx
    GuidanceChecklist.tsx
    ProhibitedActions.tsx
  veterinarians/
    VeterinarianCard.tsx
    MatchReason.tsx
  cases/
    CaseTimeline.tsx
    CaseStatusBadge.tsx
    CaseChat.tsx
    VetBrief.tsx
  academy/
    AcademyCard.tsx
    ModuleRecommendation.tsx
  shared/
    EmptyState.tsx
    OfflineBanner.tsx
    LoadingSkeleton.tsx
    DemoDataBadge.tsx
    Disclaimer.tsx
```

## 20.3 Page Structure

```text
app/
  (public)/
    page.tsx
    cara-kerja/
    akademi/
  (auth)/
    masuk/
    daftar/
    onboarding/
  (farmer)/
    dashboard/
    ternak/
    laporan/
    konsultasi/
    akademi/
    profil/
  (veterinarian)/
    dokter/
      dashboard/
      kasus/
      jadwal/
      riwayat/
      profil/
```

## 20.4 Design Tokens CSS

```css
:root {
  --primary-950: #102a1b;
  --primary-900: #173a25;
  --primary-800: #20502f;
  --primary-700: #2f6b3c;
  --primary-600: #4c8b45;
  --primary-500: #6faa48;
  --primary-400: #85cb18;
  --primary-300: #b7dc72;
  --primary-200: #d8edac;
  --primary-100: #eff8e3;
  --primary-50: #f8fcef;

  --neutral-950: #0b0e0b;
  --neutral-900: #202722;
  --neutral-800: #343d36;
  --neutral-700: #505b53;
  --neutral-600: #69736c;
  --neutral-500: #8d978f;
  --neutral-400: #b6bfb8;
  --neutral-300: #d4dcd6;
  --neutral-200: #e5eae6;
  --neutral-100: #f1f4f1;
  --neutral-50: #f8faf8;
  --page-canvas: #f1f4f9;

  --success: #2e7d4f;
  --info: #2e74b5;
  --warning: #d69b00;
  --urgent: #e56a22;
  --emergency: #d83a3a;
  --monitoring: #2e7d6b;
  --unknown: #6b7280;

  --success-soft: #e8f5ec;
  --info-soft: #eaf3fb;
  --warning-soft: #fff7d6;
  --urgent-soft: #fff0e5;
  --emergency-soft: #fdebec;
  --monitoring-soft: #e6f5f1;
  --unknown-soft: #f1f3f5;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 28px;

  --shadow-xs: 0 1px 2px rgba(16, 42, 27, 0.04);
  --shadow-sm: 0 4px 14px rgba(16, 42, 27, 0.06);
  --shadow-md: 0 12px 32px rgba(16, 42, 27, 0.08);
}
```

---

# 21. Master Context untuk AI Coding Agent

Gunakan instruksi berikut sebelum meminta AI menghasilkan frontend:

```text
Anda sedang membangun frontend Veternak, sebuah responsive web application untuk membantu peternak sapi dan kambing melaporkan kondisi ternak, menjawab pertanyaan lanjutan, melihat tingkat urgensi awal, memperoleh tindakan konservatif yang aman, memilih dokter hewan, memantau status kasus, dan mengakses Akademi Ternak.

Veternak bukan alat diagnosis dan tidak boleh memberikan diagnosis pasti, persentase penyakit, resep, nama obat, atau dosis. Gunakan istilah “penilaian awal”, “tingkat urgensi”, “risiko penularan awal”, dan “tindakan awal”.

Target utama adalah peternak skala kecil-menengah dengan kemampuan digital beragam. Desain harus mobile-first, sederhana, ringan, mudah dibaca, dan memiliki tombol besar. Dokter menggunakan desktop atau tablet-friendly dashboard.

Arah visual: Pastoral Health-Tech / Editorial Organic. Gunakan whitespace luas, UI modern yang bersih, headline editorial pada landing page, serta ilustrasi padang rumput dengan sapi dan kambing sehat. Hindari visual futuristik, neon, dashboard terlalu padat, dan suasana medis yang menakutkan.

Gunakan:
- Next.js App Router;
- TypeScript;
- React;
- Tailwind CSS;
- shadcn/ui;
- React Hook Form;
- Zod;
- Lucide Icons.

Warna utama:
- brand dark #2F6B3C;
- CTA lime #85CB18 dengan teks #102A1B;
- soft green #EFF8E3;
- background #F8FAF8;
- text #202722;
- border #E5EAE6.

Status:
- Darurat #D83A3A / #FDEBEC;
- Mendesak #E56A22 / #FFF0E5;
- Perlu diperiksa #D69B00 / #FFF7D6;
- Pemantauan #2E7D6B / #E6F5F1;
- Tidak dapat dinilai #6B7280 / #F1F3F5.

Status selalu memiliki ikon dan label teks, tidak hanya warna.

Font:
- Plus Jakarta Sans untuk UI;
- DM Serif Display hanya untuk headline marketing.

Layout:
- mobile 4-column;
- tablet 8-column;
- desktop 12-column;
- max content width 1200px;
- form max width 720px;
- base spacing 4px;
- card radius 16px;
- button/input radius 12px;
- primary mobile button height 52px.

Gunakan satu primary action per layar. Form laporan menggunakan multi-step flow dengan autosave, progress indicator, pilihan “Tidak tahu”, dan maksimal lima pertanyaan lanjutan. Input asli peternak harus tetap terlihat dan hasil AI harus dapat diedit.

Jangan tampilkan copy seperti “AI mendiagnosis”, “positif penyakit”, “akurasi penyakit”, atau “wabah terdeteksi”. Gunakan “Menyusun informasi laporan”, “Penilaian awal”, dan “Periksa kembali data”.

Buat semua halaman dengan state loading, empty, error, offline, disabled, success, dan responsive. Penuhi accessibility WCAG AA, focus state, keyboard navigation, label form, touch target minimal 44px, serta reduced motion.
```

---

# 22. Quality Assurance Checklist

## Brand dan Visual

- [ ] Dominasi UI tetap putih dan neutral.
- [ ] Lime hanya dipakai untuk CTA dan highlight.
- [ ] Ilustrasi tidak mengganggu informasi kesehatan.
- [ ] Font serif hanya digunakan pada area marketing.
- [ ] Tidak ada gradient neon atau efek futuristik berlebihan.

## UX

- [ ] CTA Lapor Gejala dapat dicapai maksimal satu klik dari beranda.
- [ ] Pengguna memahami posisi mereka dalam multi-step form.
- [ ] Maksimal lima pertanyaan lanjutan.
- [ ] Selalu tersedia pilihan Tidak tahu pada pertanyaan yang relevan.
- [ ] Input asli tidak dihapus atau diganti AI.
- [ ] Data hasil ekstraksi dapat diedit.
- [ ] AI gagal tidak menghalangi pencarian dokter.

## Safety

- [ ] Tidak ada diagnosis otomatis.
- [ ] Tidak ada persentase penyakit.
- [ ] Tidak ada resep, obat, atau dosis.
- [ ] Tidak ada klaim wabah.
- [ ] Hasil triase memiliki disclaimer.
- [ ] Dokter demo diberi label Data Demo.
- [ ] Chat diberi label bukan kanal darurat terjamin.

## Status

- [ ] Semua status memakai ikon, teks, dan warna.
- [ ] Darurat selalu memiliki CTA dokter.
- [ ] Semantic color konsisten.
- [ ] Status memiliki timestamp.

## Responsive

- [ ] Mobile 360 px tidak mengalami horizontal scroll.
- [ ] Bottom navigation tidak menutup konten.
- [ ] Sticky CTA tidak menutup field terakhir.
- [ ] Table berubah menjadi card pada mobile.
- [ ] Headline landing tidak terpotong.
- [ ] Ilustrasi memiliki versi ringan mobile.

## Accessibility

- [ ] Contrast AA.
- [ ] Touch target minimal 44 px.
- [ ] Semua input memiliki label.
- [ ] Focus state terlihat.
- [ ] Error dibaca screen reader.
- [ ] Ikon aksi kritis memiliki label.
- [ ] Motion mendukung reduced motion.

## Performance

- [ ] Foto dikompresi.
- [ ] Ilustrasi menggunakan WebP atau AVIF.
- [ ] Video lazy-loaded.
- [ ] Skeleton tersedia.
- [ ] Peta tidak dimuat pada beranda.
- [ ] Draft form disimpan lokal.

---

# 23. Keputusan yang Dikunci untuk v1.0

1. Arah desain: **Pastoral Health-Tech / Editorial Organic**.
2. Produk utama: responsive web, mobile-first untuk peternak.
3. Dokter: desktop dan tablet-friendly.
4. UI font: Plus Jakarta Sans.
5. Display font: DM Serif Display.
6. CTA utama: lime `#85CB18` dengan teks gelap.
7. Brand dark: `#2F6B3C`.
8. Ilustrasi: padang rumput dan ternak sehat, bukan foto klinis.
9. Navigasi mobile: lima item dengan Lapor sebagai aksi utama.
10. Pelaporan: multi-step form, bukan satu form panjang.
11. AI tampil sebagai Asisten Veternak, bukan dokter virtual.
12. Status medis selalu menggunakan teks, ikon, dan warna.
13. Implementasi memakai Next.js, Tailwind, shadcn/ui, RHF, Zod, dan Lucide.
14. Design system dibuat untuk kebutuhan hackathon tetapi cukup rapi untuk diteruskan ke MVP.

---

**End of Veternak Frontend Design Guide v1.0**
