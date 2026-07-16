# PROJECT.MD - Master Context Veternak

> Dokumen ini adalah sumber konteks utama bagi AI coding agent, designer, developer, product manager, dan reviewer yang mengembangkan Veternak. Baca dokumen ini sebelum mengubah aplikasi.

## 1. Identitas Dokumen

| Atribut | Nilai |
|---|---|
| Produk | Veternak |
| Jenis produk | Responsive web application / PWA kesehatan ternak |
| Tahap | Draft MVP / hackathon |
| Tanggal konteks | 16 Juli 2026 |
| Sumber produk | `PRD - Veternak (2).pdf`, versi dokumen 1.0 dengan log perubahan sampai 2.0 |
| Sumber desain | `Veternak_Design_Guide_v1.0.md` |
| Kondisi repository | Landing page awal berbasis React, Vite, dan Tailwind CSS |
| Tujuan dokumen | Menyatukan visi produk, ruang lingkup, UX, arsitektur, data, API, keselamatan, dan aturan implementasi |

### 1.1 Urutan otoritas sumber

Jika terdapat perbedaan antar dokumen, gunakan urutan berikut:

1. Keputusan terbaru yang diberikan langsung oleh product owner/user.
2. Guardrail keselamatan, privasi, dan keamanan dalam dokumen ini.
3. Ruang lingkup bisnis pada PRD.
4. Sistem UX dan visual pada `Veternak_Design_Guide_v1.0.md`.
5. Kondisi teknis repository yang sedang berjalan.

Jangan menyelesaikan konflik besar secara diam-diam. Catat asumsi pada PR/commit/task dan perbarui bagian "Keputusan Terbuka" bila sudah diputuskan.

---

## 2. Ringkasan Produk

Veternak adalah platform respons kesehatan ternak yang menghubungkan peternak dengan dokter hewan. Peternak dapat menyimpan profil ternak, melaporkan perubahan kondisi melalui kuesioner dan catatan sederhana, mengunggah foto, memperoleh **penilaian awal dan tingkat urgensi**, memilih dokter hewan yang relevan, berkonsultasi melalui chat, dan mengajukan kunjungan lapangan. Dokter menerima ringkasan kasus terstruktur, mengelola antrean konsultasi dan kunjungan, lalu mencatat diagnosis profesional serta rekomendasi setelah pemeriksaan.

Veternak membantu pengambilan keputusan dan mempercepat akses bantuan. Veternak **bukan pengganti dokter hewan** dan AI di dalamnya **bukan alat diagnosis final**.

### 2.1 Masalah utama

Peternak kecil dan menengah, khususnya di wilayah pedesaan, sering tidak memiliki jalur cepat dan terstruktur menuju layanan kesehatan hewan. Keterlambatan respons dapat menyebabkan:

- memburuknya kondisi ternak;
- penularan ke ternak lain;
- hilangnya aset ekonomi keluarga;
- turunnya kepercayaan dan nilai pasar;
- lemahnya data historis kesehatan ternak;
- sulitnya dokter memprioritaskan kasus sebelum konsultasi.

### 2.2 Nilai yang ditawarkan

- **Cepat:** laporan kondisi dapat dibuat dalam sekitar tiga menit.
- **Terstruktur:** cerita peternak diubah menjadi ringkasan yang tetap dapat diperiksa dan diedit.
- **Aman:** hasil sistem berupa penilaian awal, urgensi, dan tindakan konservatif, bukan diagnosis pasti atau resep.
- **Terhubung:** peternak dapat menemukan dokter, chat, dan meminta kunjungan.
- **Terlacak:** profil ternak, laporan, konsultasi, tindakan, dan status tersimpan sebagai riwayat.
- **Operasional:** dokter dan admin memiliki dashboard sesuai kewenangan.

### 2.3 Sasaran MVP

MVP harus membuktikan alur end-to-end berikut:

1. Peternak membuat akun dan profil ternak.
2. Peternak melaporkan gejala/kondisi.
3. Sistem menyusun laporan dan menentukan tingkat urgensi berdasarkan aturan yang dapat dijelaskan.
4. Peternak memilih dokter yang relevan.
5. Dokter menerima kasus dan berkonsultasi melalui chat.
6. Peternak dapat meminta kunjungan bila memenuhi aturan layanan.
7. Dokter menyelesaikan kasus dan menulis diagnosis profesional/catatan penanganan.
8. Riwayat dan notifikasi tersedia bagi pihak yang berhak.

---

## 3. Prinsip Produk yang Tidak Boleh Dilanggar

1. **Keselamatan lebih penting daripada kesan canggih.** Jangan membuat klaim diagnosis AI, probabilitas penyakit, resep, nama obat, atau dosis kepada peternak.
2. **Input asli dipertahankan.** Sistem boleh menyusun dan merangkum, tetapi tidak boleh menghapus atau mengganti cerita asli pengguna.
3. **Manusia tetap memegang keputusan klinis.** Diagnosis final dan resep hanya berasal dari dokter hewan yang berwenang.
4. **AI tidak menjadi penghalang.** Jika AI gagal, peternak tetap dapat meneruskan form manual dan mencari dokter.
5. **Urgensi dapat dijelaskan.** Tampilkan alasan aturan yang terpicu dan data yang belum diketahui.
6. **Privasi berdasarkan kebutuhan akses.** Peternak hanya melihat datanya; dokter hanya melihat kasus yang ditugaskan/diterima; admin mengakses data sesuai fungsi operasional.
7. **Mobile-first untuk peternak.** Alur kritis harus mudah digunakan pada layar 360 px dan koneksi tidak stabil.
8. **Status tidak hanya memakai warna.** Selalu sertakan teks, ikon, dan timestamp.
9. **Data demo harus jujur.** Profil dokter, rating, lokasi, atau ketersediaan sintetis wajib berlabel `Data Demo`.
10. **Kanal chat bukan kanal darurat terjamin.** Kondisi darurat harus diarahkan ke bantuan dokter/layanan terdekat dengan disclaimer yang jelas.

---

## 4. Pengguna dan Hak Akses

### 4.1 Peternak

Target utama adalah peternak/pengelola ternak kecil-menengah dengan kemampuan digital beragam.

Kebutuhan utama:

- registrasi/login dengan nomor telepon;
- mengelola profil kandang dan ternak;
- melaporkan kondisi dengan bahasa sederhana;
- memilih `Tidak tahu` ketika data tidak tersedia;
- memahami urgensi dan tindakan berikutnya;
- menemukan dan memilih dokter;
- chat teks dan gambar;
- meminta kunjungan;
- melihat status, notifikasi, dan riwayat kasus.

### 4.2 Dokter hewan

Dokter membutuhkan informasi yang ringkas namun dapat ditelusuri ke data asli.

Kebutuhan utama:

- registrasi dengan nomor STR dan unggahan dokumen;
- status verifikasi akun;
- mengatur status tersedia/tidak tersedia;
- melihat kasus baru berdasarkan urgensi;
- menerima atau menolak kasus;
- chat teks dan gambar;
- melihat profil ternak, foto, lokasi yang diizinkan, riwayat, serta aturan triase yang terpicu;
- menerima/menolak permintaan kunjungan dan memberi estimasi waktu;
- menulis diagnosis final, rekomendasi, resep bila sesuai kewenangan, dan catatan klinis;
- menutup kasus dan melihat riwayat.

### 4.3 Administrator

Kebutuhan utama:

- login admin terpisah;
- melihat ringkasan operasional;
- memantau kasus dan peta agregat sebaran laporan;
- memverifikasi akun dan dokumen dokter;
- mengelola akun dokter dan peternak;
- mengelola referensi penyakit, bank pertanyaan, aturan triase, dan konten guidance;
- mengaudit perubahan status dan akses sensitif.

### 4.4 Matriks akses ringkas

| Resource | Peternak | Dokter | Admin |
|---|---|---|---|
| Profil peternak/kandang | Milik sendiri | Hanya kasus yang diterima | Sesuai kebutuhan operasional |
| Profil ternak | Milik sendiri | Hanya kasus yang diterima | Sesuai kebutuhan operasional |
| Laporan asli dan foto | Milik sendiri | Hanya kasus yang ditugaskan | Audit/operasional |
| Penilaian awal | Milik sendiri | Kasus yang ditugaskan | Audit/konfigurasi |
| Diagnosis final | Baca milik sendiri | Tulis pada kasus yang diterima | Audit, tidak mengubah klinis |
| Chat | Peserta percakapan | Peserta percakapan | Akses terbatas dan teraudit |
| Dokumen STR | Tidak | Milik sendiri | Verifikasi |
| Aturan triase/master penyakit | Tidak | Baca detail yang relevan | Kelola versi dan publikasi |

---

## 5. Ruang Lingkup

### 5.1 In scope MVP

- autentikasi peternak, dokter, dan admin;
- verifikasi akun dokter oleh admin;
- profil kandang dan profil individual ternak;
- laporan kondisi berbentuk multi-step form;
- maksimal tiga foto per laporan;
- pertanyaan lanjutan maksimal lima;
- ekstraksi/ringkasan data yang dapat diperiksa dan diedit;
- penilaian awal berbasis aturan dengan tingkat urgensi dan risiko penularan awal;
- rekomendasi dan marketplace dokter berdasarkan relevansi, lokasi, serta ketersediaan;
- halaman detail dokter;
- pembuatan kasus dan accept/reject oleh dokter;
- chat real-time teks dan gambar;
- pengajuan dan pengelolaan kunjungan lapangan;
- diagnosis final dan catatan dokter setelah konsultasi;
- riwayat kasus/konsultasi/kunjungan;
- notifikasi in-app/realtime;
- dashboard dokter;
- dashboard operasional admin;
- Akademi Ternak/konten edukasi kontekstual jika waktu MVP memungkinkan;
- draft laporan lokal dan fallback manual saat AI/koneksi gagal.

### 5.2 Out of scope fase ini

- video call;
- pembayaran, billing, dan settlement;
- integrasi apotek atau marketplace obat;
- asuransi ternak;
- routing kunjungan otomatis dan verifikasi lokasi otomatis tingkat produksi;
- integrasi langsung dengan Kementan/dinas peternakan;
- bahasa daerah pada AI;
- klaim deteksi wabah otomatis;
- sistem rekam medis nasional;
- aplikasi mobile native terpisah.

### 5.3 Scope spesies sementara

PRD menetapkan **sapi dan kerbau** serta menyatakan spesies lain out of scope. Design guide berulang kali menyebut **sapi dan kambing**, dan persona dokter dalam PRD juga merujuk pakar kambing. Sampai product owner memutuskan lain:

- domain dan data model harus mendukung enum spesies yang dapat diperluas;
- seed/demo MVP memakai `CATTLE` dan `BUFFALO` sesuai PRD;
- jangan hard-code copy atau icon yang membuat penambahan `GOAT` sulit;
- kambing belum boleh dianggap scope final tanpa keputusan eksplisit.

---

## 6. Alur Bisnis Utama

### 6.1 Pelaporan sampai konsultasi

```text
Peternak login
  -> pilih/tambah ternak
  -> isi laporan kondisi
  -> jawab kondisi penting dan pertanyaan lanjutan
  -> unggah foto (opsional)
  -> periksa catatan asli + data terstruktur
  -> kirim untuk penilaian awal
  -> lihat urgensi, alasan, risiko penularan awal, guidance, disclaimer
  -> pilih dokter yang direkomendasikan
  -> kirim permintaan konsultasi
  -> dokter menerima/menolak
  -> bila diterima, ruang chat aktif
  -> konsultasi atau permintaan kunjungan
  -> dokter menulis hasil profesional
  -> kasus selesai dan masuk riwayat
```

### 6.2 Fallback AI

```text
Pemrosesan AI gagal/lambat
  -> simpan semua input dan foto yang sudah berhasil diunggah
  -> tampilkan alasan yang ramah pengguna
  -> pilihan: coba lagi / lanjutkan form manual / cari dokter
  -> sistem tetap dapat membuat kasus dengan status "Belum dapat dinilai"
```

### 6.3 Permintaan kunjungan

```text
Chat aktif
  -> peternak memilih Request Kunjungan
  -> sistem mengecek area layanan/jarak (target awal contoh <= 20 km)
  -> peternak memilih waktu dan melengkapi catatan lokasi
  -> dokter menerima notifikasi
  -> dokter menyetujui + memberi ETA, atau menolak + alasan
  -> status: REQUESTED -> APPROVED/REJECTED -> EN_ROUTE -> ARRIVED -> COMPLETED/CANCELLED
```

Nilai ambang jarak harus configurable; jangan tanam permanen `20 km` dalam UI maupun business logic.

### 6.4 Verifikasi dokter

```text
Dokter registrasi + unggah STR
  -> status PENDING_VERIFICATION
  -> admin meninjau dokumen
  -> VERIFIED atau REJECTED_WITH_REASON
  -> hanya VERIFIED yang dapat tampil publik dan menerima kasus
```

### 6.5 Siklus status kasus

```text
DRAFT
  -> ASSESSING
  -> READY_FOR_MATCHING
  -> DOCTOR_REQUESTED
  -> ACCEPTED | REJECTED | EXPIRED
  -> IN_CONSULTATION
  -> VISIT_REQUESTED (opsional)
  -> RESOLVED
  -> CLOSED
```

Transisi harus divalidasi server-side dan setiap perubahan menghasilkan audit event serta timestamp.

---

## 7. Functional Requirements

### 7.1 Prioritas Must Have

| ID | Kapabilitas | Acceptance minimum |
|---|---|---|
| FR-01 | Registrasi/login | Peternak mendaftar via nomor HP; dokter menyertakan STR; session aman |
| FR-02 | Profil ternak | Tambah, ubah, lihat ternak dan riwayatnya |
| FR-03 | Laporan kondisi | Form interaktif tersimpan, tervalidasi, mendukung draft dan maks. 3 foto |
| FR-04 | Penilaian awal | Selesai target <30 detik; menghasilkan urgency, alasan, unknown data, dan disclaimer |
| FR-05 | Marketplace dokter | Cari/filter/sort dokter relevan, tersedia, dan sesuai area |
| FR-06 | Detail dokter | Profil, STR terverifikasi, spesialisasi, jarak, ketersediaan, dan CTA konsultasi |
| FR-07 | Kasus masuk | Dokter melihat antrean dan dapat accept/reject secara aman dari race condition |
| FR-08 | Chat | Teks dan foto real-time, riwayat persisten, status pengiriman, kontrol akses |
| FR-09 | Notifikasi | Kasus baru, balasan chat, perubahan kunjungan, dan status verifikasi |
| FR-10 | Hasil dokter | Dokter menyimpan diagnosis final dan rekomendasi; peternak dapat melihat hasil |

### 7.2 Prioritas Should Have

| ID | Kapabilitas | Acceptance minimum |
|---|---|---|
| FR-11 | Kunjungan lapangan | Validasi area, accept/reject, ETA, dan status kunjungan |
| FR-12 | Riwayat | Search/filter kasus selesai berdasarkan tanggal dan spesies |
| FR-13 | Dashboard dokter | Status ketersediaan, kasus hari ini, kunjungan, dan aktivitas terbaru |
| FR-14 | Admin verification | Review STR, alasan penolakan, audit trail |
| FR-15 | Admin case monitoring | Daftar/detail kasus dan metrik tanpa mengubah keputusan klinis |
| FR-16 | Offline resilience | Draft lokal, banner offline, dan sinkronisasi ulang aman |

### 7.3 Prioritas Could Have

- rating dan ulasan dokter setelah kasus selesai;
- peta agregat sebaran kasus untuk admin dengan perlindungan lokasi individu;
- rekomendasi materi Akademi berdasarkan konteks kasus;
- pengingat vaksinasi/kontrol;
- Puskeswan atau layanan fallback bila dokter tidak tersedia;
- push notification setelah in-app notification stabil.

---

## 8. Penilaian Awal, AI, dan Keselamatan Klinis

### 8.1 Pembagian tanggung jawab

| Komponen | Boleh | Tidak boleh |
|---|---|---|
| AI/LLM | Menyusun teks, mengekstrak field, memilih pertanyaan dari bank terverifikasi, merangkum, menjelaskan hasil aturan | Menentukan diagnosis final, memberi probabilitas penyakit, membuat pertanyaan klinis bebas tanpa kontrol, memberi obat/dosis |
| Rules engine | Menentukan urgency, risiko awal, red flag, guidance terverifikasi berdasarkan input | Mengklaim kepastian penyakit |
| Dokter hewan | Meninjau data, bertanya, mendiagnosis, memberi rekomendasi/resep sesuai kewenangan | Mengakses kasus yang tidak ditugaskan |

### 8.2 Output penilaian awal wajib

- label `Hasil penilaian awal`;
- satu urgency: `EMERGENCY`, `URGENT`, `NEEDS_EXAM`, `MONITORING`, atau `UNASSESSABLE`;
- penjelasan singkat arti status;
- alasan/red flags yang memicu hasil;
- data penting yang belum diketahui;
- risiko penularan awal: `LOW`, `MEDIUM`, `HIGH`, atau `UNASSESSABLE`;
- tindakan konservatif yang aman dan bersumber;
- larangan tindakan;
- CTA dokter yang proporsional dengan urgensi;
- disclaimer bahwa hasil bukan diagnosis dokter;
- versi rule set dan timestamp.

### 8.3 Bahasa yang digunakan

Gunakan:

- `penilaian awal`;
- `tingkat urgensi`;
- `risiko penularan awal`;
- `tindakan awal`;
- `Dibantu AI`;
- `Disusun oleh Asisten Veternak`;
- `Periksa kembali informasi ini`.

Hindari pada output sistem untuk peternak:

- `diagnosis AI`;
- `positif penyakit`;
- `AI mendeteksi penyakit`;
- persentase keyakinan penyakit;
- `wabah terdeteksi`;
- jaminan dokter akan datang;
- nama obat, resep, atau dosis yang dibuat sistem.

### 8.4 Audit dan versioning

Simpan secara terpisah:

- input asli peternak;
- hasil ekstraksi AI dan confidence per field untuk internal review;
- koreksi pengguna;
- jawaban pertanyaan lanjutan;
- rule ID dan versi aturan yang terpicu;
- output yang ditampilkan;
- model/prompt version bila memakai LLM;
- status fallback/error;
- waktu proses.

Jangan mengekspos confidence penyakit kepada pengguna. Confidence ekstraksi hanya untuk menentukan apakah suatu field perlu dikonfirmasi.

---

## 9. Information Architecture dan Halaman

### 9.1 Publik

- Landing page
- Cara Kerja
- Marketplace/daftar dokter publik terbatas
- Detail dokter publik terbatas
- Akademi Ternak dan detail materi
- Masuk, daftar, lupa password
- Kebijakan privasi dan syarat penggunaan

### 9.2 Peternak - mobile-first/PWA

| Route konseptual | Halaman | Fungsi utama |
|---|---|---|
| `/peternak/beranda` | Beranda | CTA laporan, ringkasan ternak, kasus aktif, aktivitas, edukasi |
| `/peternak/ternak` | Daftar ternak | Search/filter, tambah ternak |
| `/peternak/ternak/:id` | Profil ternak | Data dasar, status, riwayat, CTA laporan |
| `/peternak/laporan/baru` | Smart Symptom Report | Multi-step laporan dan autosave |
| `/peternak/laporan/:id/review` | Review ekstraksi | Catatan asli vs data terstruktur yang editable |
| `/peternak/laporan/:id/hasil` | Penilaian awal | Urgency, alasan, guidance, disclaimer, CTA dokter |
| `/dokter` | Marketplace dokter | Rekomendasi, search, filter, sort |
| `/dokter/:id` | Detail dokter | Kredensial, pengalaman, layanan, CTA konsultasi |
| `/peternak/kasus/:id` | Ringkasan/status kasus | Timeline, dokter, urgensi, tindakan |
| `/peternak/konsultasi/:id` | Chat | Pesan, gambar, request kunjungan |
| `/peternak/notifikasi` | Notifikasi | Update kasus/chat/kunjungan |
| `/peternak/riwayat` | Riwayat | Kasus dan konsultasi selesai |
| `/peternak/profil` | Profil | Akun, kandang, lokasi, preferensi |

Navigasi bawah peternak: `Beranda`, `Ternak`, aksi utama `Lapor`, `Konsultasi`, `Profil`.

### 9.3 Dokter - responsive desktop/tablet

| Route konseptual | Halaman | Fungsi utama |
|---|---|---|
| `/dokter-app/dashboard` | Dashboard | Ketersediaan, kasus, kunjungan, aktivitas |
| `/dokter-app/kasus` | Kasus masuk | Antrean berdasar urgensi dan waktu |
| `/dokter-app/kasus/:id` | Detail kasus | Ringkasan, data asli, foto, rule, accept/reject |
| `/dokter-app/konsultasi/:id` | Chat dan rekam medis | Chat, panel ternak, hasil profesional |
| `/dokter-app/kunjungan` | Daftar kunjungan | Filter status, approve/reject, ETA |
| `/dokter-app/riwayat` | Riwayat penanganan | Search/filter dan detail hasil |
| `/dokter-app/notifikasi` | Notifikasi | Kasus, chat, kunjungan, sistem |
| `/dokter-app/profil` | Profil dokter | STR, spesialisasi, area, jadwal, status |

### 9.4 Admin - desktop

- Login admin
- Dashboard operasional
- Peta agregat sebaran laporan
- Daftar dan detail kasus
- Verifikasi dokter
- Manajemen dokter
- Manajemen peternak
- Manajemen penyakit/referensi
- Bank pertanyaan dan ruleset triase
- Manajemen guidance/konten Akademi
- Audit log dan konfigurasi sistem

---

## 10. UX Detail Alur Laporan

Form laporan menggunakan stepper, bukan satu form panjang:

1. **Pilih ternak** - ternak yang sudah tersimpan atau tambah cepat.
2. **Ceritakan kondisi** - textarea bahasa sehari-hari, waktu mulai, perubahan utama.
3. **Kondisi penting** - kesadaran, napas, makan/minum, berdiri/bergerak, suhu jika ada, jumlah ternak terdampak.
4. **Pertanyaan lanjutan** - maksimal lima, satu per card/layar, selalu ada `Tidak tahu` bila relevan.
5. **Foto** - opsional, camera-first mobile, maksimal tiga, preview/hapus/ganti.
6. **Periksa laporan** - input asli dan data terstruktur tampil berdampingan/berurutan dan dapat diperbaiki.
7. **Kirim** - persetujuan pemrosesan data dan hasil penilaian awal.

Ketentuan:

- target selesai sekitar tiga menit;
- maksimal 5-7 input per step;
- draft otomatis disimpan lokal;
- CTA bawah sticky pada mobile, tetapi tidak menutup field terakhir;
- suhu dan data yang tidak diketahui tidak boleh memblokir proses;
- validasi menjelaskan cara memperbaiki, bukan hanya menyatakan error;
- setelah submit, cegah duplikasi akibat retry dengan idempotency key.

---

## 11. Model Data Konseptual

Gunakan UUID, timestamp UTC, soft delete bila relevan, serta `created_at`, `updated_at`, dan audit actor pada data sensitif.

### 11.1 Entitas inti

**User**

- id, role (`FARMER`, `VETERINARIAN`, `ADMIN`)
- phone, email optional, password_hash/auth_provider
- name, status, phone_verified_at, last_login_at

**FarmerProfile**

- user_id, farm_name, address, village/city/province
- latitude/longitude terenkripsi atau terlindungi
- primary_species, consent timestamps

**VeterinarianProfile**

- user_id, title, STR number, STR document path
- verification_status/reason/timestamps/admin_id
- species expertise, services, service_radius_km
- practice location, availability status/schedule
- demo flag, rating aggregate optional

**Animal**

- id, farmer_id, name/code, species, breed, sex
- birth_date/estimated_age, weight optional
- photo, enclosure/location label, active status
- latest_health_status

**HealthReport**

- id, animal_id, reporter_id, original_note
- symptom_started_at/approximation, structured_payload JSON
- extraction_status, submitted_at, idempotency_key

**ReportAnswer**

- report_id, question_id/version, answer, unknown flag, source (`USER`, `AI_CONFIRMED`, `MANUAL`)

**MediaAsset**

- owner/resource relation, storage key, mime type, size, checksum
- upload status, moderation/scan status, metadata stripped flag

**Assessment**

- report_id, urgency, contagion_risk, reasons JSON, unknowns JSON
- guidance_version, rule_set_version, status, processing duration

**VeterinarianRecommendation**

- report_id, veterinarian_id, rank, match reasons, distance estimate, availability snapshot

**Case**

- report_id, farmer_id, animal_id, veterinarian_id optional
- status, priority, requested/accepted/resolved/closed timestamps
- rejection/closure reason

**Conversation / Message**

- case_id, participants
- message sender, type (`TEXT`, `IMAGE`, `SYSTEM`), body/storage key
- sent/delivered/read timestamps, client_message_id for deduplication

**VisitRequest**

- case_id, requested schedule, address snapshot, distance estimate
- status, doctor ETA, decision reason, timestamps

**ClinicalRecord**

- case_id, veterinarian_id, final_diagnosis, recommendation, prescription optional
- follow_up, completed_at, version history

**Notification**

- user_id, type, title/body, related resource, read_at, delivery channels/status

**TriageRule / Question / Guidance**

- stable ID, version, species applicability, conditions, outcome, source/reference
- draft/published/retired status, effective dates, author/reviewer

**AuditLog**

- actor, action, resource, before/after metadata, IP/device context, timestamp

### 11.2 Aturan data penting

- STR number unik untuk profil dokter aktif.
- Satu laporan terkait tepat satu ternak.
- Hanya satu dokter aktif per kasus MVP, tetapi histori assignment harus disimpan.
- Accept kasus harus transaksional agar dua aksi tidak menciptakan state ganda.
- Pesan tidak dihapus permanen dari audit hanya karena UI melakukan hide.
- Lokasi presisi tidak pernah ditampilkan di marketplace publik.
- Peta admin memakai agregasi/anonymization dan batas zoom yang aman.

---

## 12. API Contract Awal

Base path: `/api/v1`. Semua endpoint privat memakai access token JWT pendek dan mekanisme refresh yang aman. Response error menggunakan format konsisten.

### 12.1 Format response

```json
{
  "data": {},
  "meta": {},
  "error": null
}
```

```json
{
  "data": null,
  "meta": { "requestId": "uuid" },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Periksa kembali data yang ditandai.",
    "fields": { "phone": "Nomor telepon tidak valid." }
  }
}
```

### 12.2 Endpoint konseptual

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/register/farmer` | Registrasi peternak |
| POST | `/auth/register/veterinarian` | Registrasi dokter + metadata STR |
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh session |
| GET/PATCH | `/me` | Profil user aktif |
| GET/POST | `/animals` | Daftar/tambah ternak milik peternak |
| GET/PATCH | `/animals/:id` | Detail/ubah ternak |
| GET/POST | `/reports` | Daftar/buat draft laporan |
| GET/PATCH | `/reports/:id` | Detail/ubah draft |
| POST | `/reports/:id/media` | Upload terkontrol atau signed upload |
| POST | `/reports/:id/extract` | Susun data dari laporan |
| POST | `/reports/:id/assess` | Jalankan rules engine |
| GET | `/reports/:id/assessment` | Hasil penilaian awal |
| GET | `/reports/:id/veterinarian-recommendations` | Rekomendasi dokter |
| GET | `/veterinarians` | Search/filter marketplace |
| GET | `/veterinarians/:id` | Detail dokter publik |
| POST | `/cases` | Meminta konsultasi untuk laporan |
| GET | `/cases` | Daftar kasus sesuai role |
| GET | `/cases/:id` | Detail kasus sesuai akses |
| POST | `/cases/:id/accept` | Dokter menerima kasus |
| POST | `/cases/:id/reject` | Dokter menolak kasus |
| GET/POST | `/cases/:id/messages` | Riwayat/kirim pesan fallback HTTP |
| POST | `/cases/:id/visit-requests` | Request kunjungan |
| PATCH | `/visit-requests/:id/status` | Keputusan/update kunjungan |
| POST | `/cases/:id/clinical-record` | Simpan hasil dokter |
| POST | `/cases/:id/close` | Tutup kasus |
| GET | `/notifications` | Daftar notifikasi |
| PATCH | `/notifications/:id/read` | Tandai dibaca |
| GET/POST | `/admin/veterinarians/verifications` | Antrean/keputusan verifikasi |

Mutasi kritis harus memakai authorization policy di backend, validation schema, rate limit, idempotency, audit log, dan optimistic concurrency/version check bila dibutuhkan.

---

## 13. Arsitektur Teknis

### 13.1 Kondisi repository saat ini

- React 19 dan React DOM 19;
- Vite 8;
- Tailwind CSS 4 via plugin Vite;
- JavaScript/JSX, belum TypeScript;
- landing page awal: `Navbar`, `Hero`, dan `Features`;
- belum ada routing, auth, state server, form library, schema validation, backend, atau testing setup;
- aset logo dan ilustrasi hero sudah tersedia;
- README masih template Vite bawaan.

### 13.2 Target arsitektur yang direkomendasikan

```text
React PWA / responsive web
  -> REST API + realtime gateway
      -> Auth/RBAC service
      -> User & livestock service
      -> Report/assessment service
      -> Doctor matching service
      -> Case/chat/visit service
      -> Notification service
      -> Admin/content service
          -> PostgreSQL / Supabase
          -> Object storage
          -> Realtime/pub-sub
          -> AI extraction adapter
          -> Deterministic triage rules engine
```

Untuk MVP hackathon, gunakan **modular monolith** dengan batas domain yang jelas. Jangan memecah menjadi microservice deployment terpisah sebelum kebutuhan skalabilitas dan ownership terbukti. Modul dapat diekstrak kemudian tanpa mengubah kontrak domain.

### 13.3 Pilihan stack

Ada konflik sumber:

- PRD dan repository: React.js + Vite + Tailwind; backend Node.js/Express; PostgreSQL/Supabase + Prisma.
- Design guide: Next.js App Router + TypeScript + Tailwind + shadcn/ui + React Hook Form + Zod.

Aturan sementara untuk melanjutkan repository:

- pertahankan **React + Vite** agar tidak melakukan migrasi besar tanpa persetujuan;
- arahkan kode baru ke **TypeScript secara bertahap**;
- tambahkan React Router untuk routing SPA bila frontend tetap Vite;
- gunakan Tailwind, React Hook Form, Zod, Lucide, dan TanStack Query sesuai kebutuhan;
- backend target tetap Node.js/Express atau Supabase Edge Functions dengan PostgreSQL;
- Prisma dipakai hanya bila backend Node mengelola koneksi database secara langsung;
- migrasi ke Next.js hanya dilakukan melalui keputusan arsitektur eksplisit.

### 13.4 Struktur frontend target (Vite)

```text
src/
  app/                 # bootstrap, router, providers
  assets/
  components/
    ui/                # primitive reusable
    brand/
    animals/
    reports/
    triage/
    veterinarians/
    cases/
    academy/
    shared/
  features/            # domain state, hooks, API, schemas
  layouts/             # public, farmer, veterinarian, admin
  pages/
  services/            # API client, realtime, storage
  styles/
  types/
  utils/
```

### 13.5 State management

- server state: TanStack Query;
- form state: React Hook Form + Zod;
- auth/session: provider kecil, tidak menyimpan token sensitif sembarangan;
- transient local UI: component state atau store ringan bila benar-benar diperlukan;
- offline draft: IndexedDB, versioned schema, dan sync queue;
- realtime: Supabase Realtime/WebSocket dengan HTTP fallback.

---

## 14. Keamanan, Privasi, dan Reliability

### 14.1 Wajib

- Row Level Security aktif bila memakai Supabase.
- Authorization tetap diverifikasi di server untuk setiap resource.
- API key/service role tidak pernah dikirim ke browser.
- JWT diverifikasi, memiliki expiry pendek, dan refresh direvokasi saat logout/kompromi.
- Password di-hash dengan algoritma modern; OTP dan login diberi rate limit.
- Upload dibatasi tipe, jumlah, dan ukuran; nama file diacak; lakukan malware scan bila tersedia.
- Hapus EXIF/GPS foto kecuali benar-benar dibutuhkan dan disetujui.
- URL storage privat memakai signed URL singkat.
- Lokasi kandang presisi tidak tampil publik.
- Log tidak menyimpan token, password, isi chat penuh, atau data lokasi sensitif tanpa kebutuhan.
- Semua aksi admin, verifikasi dokter, akses rekam klinis, dan perubahan ruleset diaudit.
- Consent dan kebijakan retensi data harus tercatat.
- Backup database dan prosedur restore harus diuji sebelum production.

### 14.2 Reliability

- idempotency pada submit laporan, kirim pesan, request konsultasi, dan request kunjungan;
- retry dengan exponential backoff untuk operasi yang aman;
- optimistic update harus rollback bila server menolak;
- transaksi untuk accept case dan transisi status;
- health check, structured logging, error monitoring, dan request ID;
- AI timeout menghasilkan fallback, bukan loading tanpa akhir;
- graceful degradation ketika realtime gagal.

---

## 15. Non-Functional Requirements

### 15.1 Performa

- halaman utama usable sekitar <=3 detik pada jaringan normal;
- target Core Web Vitals: LCP <=2.5 s, INP <=200 ms, CLS <=0.1 pada persentil 75;
- gambar WebP/AVIF, responsive sizes, dan kompres sebelum upload;
- lazy-load konten di bawah fold dan video;
- jangan memuat peta di beranda;
- route-level code splitting;
- skeleton menyerupai layout akhir;
- bundle dan query dimonitor, bukan hanya dioptimasi berdasarkan asumsi.

### 15.2 Accessibility

Target WCAG 2.2 AA pada alur utama:

- kontras teks normal >=4.5:1;
- touch target minimal 44x44 px;
- seluruh form dapat digunakan dengan keyboard;
- focus state terlihat;
- label terhubung ke input;
- error diumumkan screen reader dan fokus diarahkan dengan benar;
- status selalu memakai teks + ikon + warna;
- modal mengelola focus;
- heading semantik;
- alt text kontekstual dan alt kosong untuk dekorasi;
- dukung `prefers-reduced-motion`.

### 15.3 Kompatibilitas

- mobile minimum 360 px tanpa horizontal scroll;
- browser modern dua versi terakhir;
- peternak: mobile browser/PWA sebagai prioritas;
- dokter/admin: desktop dan tablet responsive;
- koneksi lambat/offline parsial tidak menghapus draft.

---

## 16. Sistem Desain Ringkas

Detail lengkap ada di `Veternak_Design_Guide_v1.0.md`. Aturan inti:

### 16.1 Arah visual

`Pastoral Health-Tech / Editorial Organic`: bersih, hangat, membumi, modern, dan transparan. Hindari neon, visual AI futuristik, suasana klinis menakutkan, dan dashboard terlalu padat.

### 16.2 Token utama

| Peran | Nilai |
|---|---|
| Brand dark | `#2F6B3C` |
| CTA lime | `#85CB18`, teks `#102A1B` |
| Soft green | `#EFF8E3` |
| App background | `#F8FAF8` |
| Main text | `#202722` |
| Standard border | `#E5EAE6` |
| Emergency | `#D83A3A` / `#FDEBEC` |
| Urgent | `#E56A22` / `#FFF0E5` |
| Needs exam | `#D69B00` / `#FFF7D6` |
| Monitoring | `#2E7D6B` / `#E6F5F1` |
| Unassessable | `#6B7280` / `#F1F3F5` |

### 16.3 Tipografi dan layout

- Plus Jakarta Sans untuk seluruh UI;
- DM Serif Display hanya untuk headline marketing/editorial;
- max content width 1200 px;
- form max width 720 px;
- spacing berbasis 4 px;
- radius input/button 12 px, card 16 px;
- primary button mobile tinggi 52 px;
- satu primary action dominan per layar.

### 16.4 State wajib

Setiap halaman/fitur harus merancang state:

- loading/skeleton;
- empty;
- error dan recovery;
- offline bila relevan;
- disabled;
- success;
- permission denied;
- data demo;
- stale/reconnecting untuk realtime.

---

## 17. Notifikasi dan Realtime

Event minimum:

- dokter: kasus baru, kasus dibatalkan, pesan baru, request kunjungan, perubahan jadwal;
- peternak: dokter menerima/menolak, pesan baru, kunjungan disetujui/ditolak/ETA berubah, hasil dokter tersedia;
- dokter: status verifikasi berubah;
- admin: permohonan verifikasi baru dan kegagalan operasional penting.

Setiap notifikasi memiliki type, resource link, timestamp, read state, dan payload minimal. Jangan memasukkan detail medis sensitif ke push notification lock-screen.

---

## 18. Observability dan Analytics

### 18.1 Product analytics

Ukur tanpa merekam isi medis mentah:

- registrasi dimulai/selesai per role;
- profil ternak dibuat;
- laporan dimulai, step completion, abandon, submit;
- durasi pengisian dan durasi assessment;
- fallback AI digunakan;
- dokter dilihat/dipilih;
- kasus diterima/ditolak/expired;
- time-to-first-doctor-response;
- request kunjungan dan penyelesaiannya;
- kasus selesai;
- error rate per alur.

### 18.2 KPI awal

PRD belum mengisi success metrics secara konkret. KPI awal yang harus divalidasi product owner:

- completion rate laporan >=70%;
- median waktu membuat laporan <=3 menit;
- assessment selesai <=30 detik untuk >=95% request yang berhasil;
- persentase kasus memperoleh respons dokter;
- median waktu respons pertama dokter;
- AI/fallback tidak menyebabkan laporan hilang;
- critical authorization incident = 0;
- crash-free sessions >=99.5% selama demo/pilot.

---

## 19. Strategi Testing

### 19.1 Unit

- validation schema;
- rules engine dan boundary urgency;
- status transition;
- ranking/match reason;
- permission helpers;
- formatter waktu/jarak/status.

### 19.2 Integration

- auth + RLS/authorization;
- draft -> submit -> assessment;
- case request -> accept/reject;
- chat persistence dan deduplication;
- visit lifecycle;
- doctor verification;
- storage signed URL dan file restrictions.

### 19.3 End-to-end

- peternak menyelesaikan alur happy path;
- AI timeout lalu lanjut manual;
- kondisi darurat menampilkan CTA dan disclaimer benar;
- dokter hanya melihat kasus yang ditugaskan;
- dua accept/update bersamaan tidak merusak status;
- offline draft pulih setelah reconnect;
- admin memverifikasi dokter;
- keyboard-only dan viewport 360 px.

### 19.4 Safety regression

Tambahkan test copy/output untuk memastikan sistem tidak menampilkan diagnosis pasti, persentase penyakit, obat/dosis AI, klaim wabah, atau profil demo tanpa label.

---

## 20. Tahapan Implementasi yang Disarankan

### Fase 0 - Foundation

- putuskan Vite vs Next.js dan spesies MVP;
- perbarui README dan environment example;
- TypeScript, router, lint/format, test runner;
- design tokens dan UI primitives;
- auth shell dan role-based layouts;
- kontrak API dan schema database awal.

### Fase 1 - Farmer reporting vertical slice

- profil ternak;
- multi-step report + IndexedDB draft;
- upload foto;
- review ekstraksi/fallback manual;
- rules engine dan hasil penilaian aman.

### Fase 2 - Doctor matching and cases

- marketplace/detail dokter;
- recommendation reason;
- create case;
- dashboard/kasus masuk dokter;
- accept/reject dan timeline.

### Fase 3 - Consultation and visits

- realtime chat teks/gambar;
- notifikasi;
- request dan status kunjungan;
- clinical record dan case closure;
- riwayat kedua role.

### Fase 4 - Admin and hardening

- verifikasi dokter;
- master data/rules/guidance;
- monitoring kasus dan peta agregat;
- security review, accessibility audit, performance budget;
- backup/restore dan observability.

---

## 21. Definition of Done

Sebuah fitur dianggap selesai hanya bila:

- acceptance criteria dan authorization terpenuhi;
- responsif pada mobile/desktop yang relevan;
- loading, empty, error, success, dan permission state tersedia;
- validasi client dan server konsisten;
- tidak melanggar guardrail klinis/copy;
- keyboard, focus, label, contrast, dan touch target diperiksa;
- test proporsional terhadap risiko lulus;
- tidak ada error console atau lint baru;
- data demo diberi label;
- analytics dan audit event ditambahkan bila relevan;
- dokumentasi/kontrak diperbarui;
- perubahan tidak menghapus input/draft pengguna saat gagal.

---

## 22. Risiko dan Mitigasi

| Risiko | Level | Mitigasi |
|---|---|---|
| Pengguna menganggap output sebagai diagnosis | Tinggi | Terminologi penilaian awal, disclaimer, rules explainability, review klinis |
| AI menghasilkan saran berbahaya | Tinggi | AI hanya ekstraksi/ringkasan; guidance allowlist terverifikasi; output schema dan safety tests |
| Kebocoran rekam medis/lokasi | Tinggi | RLS, server authorization, private storage, signed URL, audit, agregasi peta |
| Dokter palsu/tidak terverifikasi | Tinggi | Verifikasi STR, status publik hanya VERIFIED, audit admin |
| Koneksi pedesaan tidak stabil | Tinggi | PWA, IndexedDB draft, retry, kompres foto, HTTP fallback |
| Dokter tidak merespons | Tinggi | Status ketersediaan, expiry/reassignment, fallback layanan, ekspektasi waktu jelas |
| Scope hackathon terlalu besar | Tinggi | Vertical slice end-to-end, modular monolith, mock/demo data jujur, fase implementasi |
| Konflik spesies dan stack | Sedang | Keputusan eksplisit sebelum memperluas domain/migrasi framework |
| Data aturan klinis tidak terverifikasi | Tinggi | Versioning, source, reviewer dokter, publish workflow, audit |
| Race condition kasus/chat | Sedang | Transaction, idempotency, unique constraint, optimistic concurrency |

---

## 23. Keputusan Terbuka

Product owner perlu mengunci hal berikut:

1. Spesies MVP: sapi + kerbau (PRD) atau sapi + kambing (design guide), atau ketiganya.
2. Tetap React/Vite atau migrasi ke Next.js App Router.
3. Apakah Supabase menjadi backend utama, atau Express + Prisma dengan Supabase hanya sebagai database/storage/realtime.
4. Metode autentikasi nomor telepon: password, OTP, atau keduanya.
5. Siapa dan bagaimana proses verifikasi STR pada pilot nyata.
6. Sumber klinis, dokter reviewer, dan governance ruleset/guidance.
7. Wilayah pilot dan aturan radius kunjungan.
8. SLA respons dokter serta alur reassignment/expiry.
9. Apakah rating/ulasan masuk MVP atau data demo saja.
10. Batas ukuran file dan retensi foto/chat/rekam medis.
11. Apakah admin map hanya demo atau menggunakan data pilot nyata.
12. KPI resmi, target pilot, dan definisi keberhasilan bisnis.

Sebelum keputusan tersedia, implementasikan abstraction/configuration yang mudah diubah dan hindari klaim palsu pada UI.

---

## 24. Instruksi Kerja untuk AI Coding Agent

Sebelum mengerjakan task:

1. Baca `PROJECT.MD` dan bagian relevan di `Veternak_Design_Guide_v1.0.md`.
2. Periksa repository dan perubahan yang sudah ada; jangan menimpa pekerjaan pengguna.
3. Identifikasi role, data sensitif, state, dan guardrail klinis yang terkait.
4. Gunakan kondisi repository nyata; jangan menganggap struktur Next.js sudah tersedia.
5. Bila task menyentuh keputusan terbuka, pilih solusi configurable atau minta keputusan jika dampaknya besar.

Saat implementasi:

- pertahankan input asli peternak;
- jangan membuat diagnosis AI atau saran obat/dosis;
- gunakan Bahasa Indonesia singkat, hangat, dan tidak menakutkan;
- satu primary CTA per layar;
- mobile-first untuk peternak, desktop/tablet-friendly untuk dokter/admin;
- buat component domain reusable, bukan halaman monolitik;
- validasi dan authorization wajib ada di server, bukan hanya UI;
- jangan mengekspos secret, lokasi presisi, atau private storage URL;
- buat failure recovery, bukan hanya happy path;
- jangan menambahkan dependency besar tanpa kebutuhan jelas;
- perbarui dokumen ini jika keputusan produk/arsitektur berubah.

Jika PRD meminta "diagnosis AI", tafsirkan di UI peternak sebagai **penilaian awal yang aman**. Diagnosis final tetap diisi dokter. Ini adalah resolusi keselamatan sementara sampai product owner menyatakan kebijakan lain yang tetap memenuhi standar keselamatan.

---

## 25. Referensi Internal

- `PRD - Veternak (2).pdf` - requirement bisnis awal, persona, user stories, daftar halaman, dan stack ringkas.
- `Veternak_Design_Guide_v1.0.md` - design system, UX flow, accessibility, copy, AI safety, dan target implementasi frontend.
- `package.json` dan `src/` - kondisi implementasi aktual repository.

Dokumen PRD masih memiliki bagian placeholder/kosong pada KPI, wireframe, diagram arsitektur, API contract, risiko, referensi, beberapa persona, dan milestone. Bagian-bagian konkret dalam `PROJECT.MD` adalah rancangan operasional untuk melengkapi kekosongan tersebut dan harus divalidasi product owner sebelum production.
