======================================================================
DOCUMENT 1 OF 2: PMT - Veternak PRD (v1.0 - Overview & Functional Spec)
======================================================================

**PRODUCT REQUIREMENTS DOCUMENT**

*PMT - Veternak*

| **Nama Produk**   | **PMT - Veternak**  |
|-------------------|---------------------|
| **Versi Dokumen** | *1.0*               |
| **Tanggal**       | *14 July 2026*      |
| **Author / PM**   | *Ahmad Fillah Alwy* |
| **Status**        | *Draft*             |

# Log

| **Versi** | **Tanggal**  | **Perubahan**          | **Author**          |
|-----------|--------------|------------------------|---------------------|
| *1.0*     | *14-07-2026* | *Initial draft*        | *Ahmad Fillah Alwy* |
| *2.0*     | *15-07-2026* | *Update Business Flow* | *Ahmad Fillah Alwy* |

#  

# Table Of Contents

[**Riwayat Revisi 1**](#)

[**Table Of Contents 2**](#)

[**1. Overview & Tujuan 3**](#)

> [**1.1 Latar Belakang 3**](#)
>
> [**1.2 Tujuan Produk 3**](#)
>
> [**1.3 Success Metrics (KPI) 3**](#)

[**2. Scope 3**](#)

> [**2.1 In Scope 3**](#)
>
> [**2.2 Out of Scope 3**](#)

[**3. Target Pengguna & Persona 4**](#)

> [**3.1 Persona 4**](#)

[**4. User Stories 4**](#)

[**5. Functional Requirements 6**](#)

[**6. Non-Functional Requirements 7**](#)

> [**6.1 Performa 7**](#)
>
> [**6.2 Keamanan 7**](#)
>
> [**6.3 Skalabilitas 7**](#)
>
> [**6.4 Ketersediaan (Availability) 7**](#)

[**7. UI/UX & Desain 7**](#)

> [**7.1 Wireframe / Mockup 7**](#)
>
> [**7.2 User Flow 8**](#)

[**8. Arsitektur Teknis (Ringkasan) 8**](#)

> [**8.1 Tech Stack 8**](#)
>
> [**8.2 Diagram Arsitektur 8**](#)

[**9. API Contract (Ringkasan) 8**](#)

[**10. Timeline & Milestones 8**](#)

[**11. Risiko & Mitigasi 9**](#)

[**12. Persetujuan 9**](#)

# **1. Overview & Tujuan**

## **1.1 Latar Belakang**

Sektor peternakan sapi dan kerbau merupakan salah satu pilar ketahanan pangan Indonesia, terutama sebagai sumber protein hewani bagi jutaan keluarga. Namun di balik perannya yang vital, para peternak — khususnya peternak kecil dan menengah di pedesaan — menghadapi kerentanan ekonomi yang serius. Sebagian besar modal usaha mereka bertumpu pada nilai hewan ternak itu sendiri, sehingga satu kejadian wabah penyakit dapat langsung mengancam keberlangsungan hidup keluarga peternak.

Salah satu faktor utama yang memperparah kondisi ini adalah keterbatasan akses terhadap layanan kesehatan hewan yang cepat dan terpercaya. Rasio dokter hewan terhadap populasi ternak di Indonesia sangat tidak seimbang, dan distribusinya sangat terpusat di wilayah perkotaan. Akibatnya, ketika hewan ternak menunjukkan gejala penyakit, peternak di pedesaan seringkali tidak memiliki jalur yang jelas dan cepat untuk mendapatkan diagnosis serta penanganan yang tepat.

Kondisi ini mendorong kebutuhan akan sebuah sistem yang mampu menghubungkan peternak dengan tenaga medis hewan secara cepat, sekaligus membangun basis data kesehatan ternak yang dapat digunakan untuk deteksi dini penyebaran penyakit berbasis wilayah.

| **Masalah yang Ingin Diselesaikan**                                                                                                                                                                                                                                             |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Peternak sapi dan kerbau di Indonesia tidak memiliki akses cepat ke layanan kesehatan hewan yang terstruktur, sehingga penanganan penyakit ternak sering terlambat — mengancam aset ekonomi peternak secara langsung dan memperlemah ketahanan pangan nasional secara sistemik. |

## **1.2 Tujuan Produk**

- Memberikan peternak alur diagnosis awal yang mudah melalui pengisian form kuesioner gejala, yang kemudian diproses oleh AI untuk menghasilkan diagnosis sementara.

- Memberikan akses layanan dokter hewan jarak jauh (chat / konsultasi virtual) bagi peternak yang secara geografis terbatas.

- Memfasilitasi kunjungan lapangan dokter hewan ketika kondisi hewan membutuhkan penanganan fisik langsung.

# **2. Scope**

## **2.1 In Scope**

### 2.1.1 Peternak (User)

- Registrasi dan login

- Input gejala hewan via form

- Menerima diagnosis AI berdasarkan input

- Menerima rekomendasi dokter hewan

- Mengakses Marketplace Dokter Hewan dan melihat Detail Dokter Hewan.

- Konsultasi dengan dokter hewan via chat

- Request kunjungan lapangan dokter hewan

### 2.1.2 Dokter Hewan (User)

- Registrasi dan verifikasi akun dokter hewan

- Menerima dan membaca laporan klinis dari AI

- Merespons konsultasi via chat

- Menerima dan mengkonfirmasi request kunjungan lapangan

- Mengisi catatan diagnosis dan rekomendasi penanganan pasca konsultasi

- Mengakses Dashboard Dokter Hewan.

- Mengelola Kasus Masuk dari peternak yang memilihnya.

- Mengelola Daftar Kunjungan lapangan.

- Melihat Riwayat konsultasi dan kunjungan.

- Menerima dan melihat Notifikasi.

### 2.1.3 Sistem

- AI engine untuk memproses form gejala menjadi diagnosis dan mencocokkannya dengan rekomendasi dokter.

- Sistem marketplace dokter hewan berbasis lokasi dan spesialisasi.

- Notifikasi untuk peternak dan dokter hewan.

## **2.2 Out of Scope**

- Konsultasi video call (digantikan chat teks)

- Sistem pembayaran dan billing konsultasi

- Integrasi dengan apotek atau marketplace obat hewan

- Fitur asuransi ternak

- Verifikasi lokasi dan routing otomatis untuk kunjungan lapangan

- Notifikasi / integrasi langsung ke sistem dinas peternakan atau Kementan

- Multi-bahasa daerah pada AI engine

- Fitur untuk spesies hewan selain sapi dan kerbau

- Sistem pembayaran dan billing konsultasi (fase ini).

- Integrasi dengan apotek atau marketplace obat hewan.

- Notifikasi / integrasi langsung ke sistem dinas peternakan atau Kementan.

# **3. Target Pengguna & Persona**

## 3.1 Target Pengguna

## **3.**2 **Persona**

### 3.2.1 Masrukhi, Peternak Sapi

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 74%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Nama Persona</strong></th>
<th><em>Masrukhi</em></th>
</tr>
<tr class="odd">
<th><strong>Demografi</strong></th>
<th><em>40 tahun, Peternak/pengelola Sapi, Jombang, Jawa Timur</em></th>
</tr>
<tr class="header">
<th><strong>Goals</strong></th>
<th><ul>
<li><blockquote>
<p><em>Mengetahui kondisi kesehatan setiap sapi.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Menyimpan identitas dan riwayat ternak.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Melaporkan perubahan kondisi dengan cepat.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Mendapatkan bantuan profesional ketika gejala tidak dapat ditangani sendiri.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Menjaga nilai ekonomi ternak.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Memiliki bukti riwayat perawatan dan pemeriksaan.</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><strong>Pain Points</strong></th>
<th><ul>
<li><blockquote>
<p><em>Apakah pencatatan kesehatan masih dilakukan secara manual.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Berapa lama biasanya memperoleh respons dokter.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Kanal komunikasi yang digunakan dengan dokter.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Kesulitan menyampaikan gejala melalui chat.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Kesediaan memasukkan profil masing-masing ternak.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Kebutuhan terhadap pengingat vaksinasi dan kontrol.</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><strong>Context</strong></th>
<th><em>Masrukhi merawat sapi dengan pemberian pakan teratur, pemeriksaan kesehatan, dan kebersihan kandang. Salah satu sapi yang dipeliharanya menjalani pemeriksaan kesehatan rutin untuk memastikan bebas dari PMK dan Lumpy Skin Disease.</em></th>
</tr>
<tr class="odd">
<th><strong>Sumber</strong></th>
<th><em>Detik, 28 Mei 2025</em></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### 

### 3.2.2 Tohari, Pelaku Usaha Ternak

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 74%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Nama Persona</strong></th>
<th><em>Tohari</em></th>
</tr>
<tr class="odd">
<th><strong>Demografi</strong></th>
<th><em>Pedagang/pelaku usaha sapi,Pasar hewan Jrebeng Kidul, Probolinggo</em></th>
</tr>
<tr class="header">
<th><strong>Goals</strong></th>
<th><ul>
<li></li>
</ul></th>
</tr>
<tr class="odd">
<th><strong>Pain Points</strong></th>
<th><ul>
<li><blockquote>
<p><em>Penyakit ternak menimbulkan konsekuensi ekonomi langsung.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Risiko penularan memengaruhi keputusan pemindahan ternak.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Pelaku usaha membutuhkan informasi kesehatan dan pencegahan yang cepat.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Ketidakpastian kondisi ternak dapat menurunkan kepercayaan pasar.</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><strong>Context</strong></th>
<th><em>Tohari melaporkan bahwa harga sapi turun tajam ketika PMK merebak. Ia juga menyampaikan kekhawatiran membawa sapi yang tidak terjual kembali ke kandang karena dapat menularkan penyakit kepada ternak lain.</em></th>
</tr>
<tr class="odd">
<th><strong>Sumber</strong></th>
<th><em>Detik, 28 Januari 2025</em></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### 3.2.3 drh. Oktavianus K. Rohi, Dokter Hewan

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 74%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Nama Persona</strong></th>
<th><em>drh. Oktavianus K. Rohi</em></th>
</tr>
<tr class="odd">
<th><strong>Demografi</strong></th>
<th><em>Dokter hewan dan pakar kambing, Dinas Peternakan Kabupaten Sumba Timur</em></th>
</tr>
<tr class="header">
<th><strong>Goals</strong></th>
<th><ul>
<li><blockquote>
<p><em>Memperoleh informasi kasus sebelum konsultasi.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Menentukan prioritas kasus berdasarkan tingkat urgensi.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Mengetahui jumlah ternak terdampak.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Melihat foto, lokasi, dan riwayat gejala.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Mengurangi pengulangan pertanyaan dasar.</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Memberikan catatan dan status penanganan.</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><strong>Pain Points</strong></th>
<th><ul>
<li></li>
</ul></th>
</tr>
<tr class="header">
<th><strong>Context</strong></th>
<th><em>drh. Oktavianus K. Rohi menjadi pakar yang diwawancarai dalam penelitian mengenai penyakit kambing di Desa Kaliuda. Penelitian tersebut menemukan bahwa keterbatasan akses dokter dan pengetahuan peternak menyulitkan penanganan penyakit kambing.</em></th>
</tr>
<tr class="odd">
<th><strong>Sumber</strong></th>
<th><em>Jurnal Rekayasa Informasi Swadharma, Januari 2025</em></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# **4. User Stories**

<table>
<colgroup>
<col style="width: 9%" />
<col style="width: 12%" />
<col style="width: 38%" />
<col style="width: 11%" />
<col style="width: 28%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>ID</strong></th>
<th><strong>Role</strong></th>
<th><strong>User Story</strong></th>
<th><strong>Prioritas</strong></th>
<th><strong>Acceptance Criteria</strong></th>
</tr>
<tr class="odd">
<th><em>US-01</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin mendaftar akun menggunakan nomor telepon agar bisa mengakses platform</em></th>
<th><em>High</em></th>
<th><ul>
<li><p><em>Form registrasi tersedia dengan field nama, nomor telepon, dan lokasi (kecamatan/kabupaten)</em></p></li>
<li><p><em>Akun berhasil dibuat dan langsung masuk ke halaman utama</em></p></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-02</em></th>
<th><em>Dokter Hewan</em></th>
<th><em>Saya ingin mendaftar akun dengan menyertakan nomor STR agar identitas saya terverifikasi sebagai tenaga medis</em></th>
<th><em>High</em></th>
<th><ul>
<li><p><em>Form registrasi tersedia dengan field nama, nomor STR, dan wilayah praktik</em></p></li>
<li><p><em>Status akun menunjukkan "menunggu verifikasi" setelah submit - Akun aktif setelah diverifikasi admin</em></p></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-03</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin menambahkan data hewan ternak saya agar setiap hewan memiliki profil tersendiri</em></th>
<th><em>Medium</em></th>
<th><ul>
<li><blockquote>
<p><em>Form input tersedia dengan field jenis hewan, usia estimasi, jenis kelamin, dan nama/kode hewan</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Hewan berhasil tersimpan dan muncul di daftar ternak milik pengguna</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-04</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin mendeskripsikan gejala hewan saya agar AI bisa membuat laporan yang siap dibaca dokter</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Peternak bisa memilih hewan mana yang sakit dari daftar ternaknya</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Tersedia field input teks bebas untuk deskripsi gejala</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Tersedia opsi upload foto kondisi hewan (maks. 3 foto)</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Sistem menampilkan konfirmasi bahwa laporan sedang diproses setelah submit</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-05</em></th>
<th><em>Sistem</em></th>
<th><em>Saya ingin memproses input gejala dari peternak dan menghasilkan laporan klinis terstruktur agar dokter bisa langsung membaca informasi yang relevan</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Laporan memuat ringkasan gejala, estimasi durasi, tingkat urgensi (rendah/sedang/tinggi), dan konteks lokasi saat laporan dibuat</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Laporan selesai diproses dalam waktu &lt; 30 detik</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Jika informasi tidak cukup, AI mengajukan satu pertanyaan klarifikasi sebelum generate laporan</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-06</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin melihat ringkasan laporan AI sebelum dikirim ke dokter agar saya bisa memastikan informasinya benar</em></th>
<th><em>Low</em></th>
<th><ul>
<li><blockquote>
<p><em>Peternak melihat preview laporan sebelum dikirim</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Tersedia tombol "Kirim ke Dokter" dan "Edit Deskripsi" - Laporan terkirim ke dokter hanya setelah peternak konfirmasi</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-07</em></th>
<th><em>Dokter Hewan</em></th>
<th><em>Saya ingin menerima notifikasi ketika ada laporan masuk agar saya bisa segera merespons</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Notifikasi muncul saat laporan baru masuk</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Notifikasi memuat nama peternak, jenis hewan, dan tingkat urgensi</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Dokter bisa langsung membuka laporan dari notifikasi</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-08</em></th>
<th><em>Dokter Hewan</em></th>
<th><em>Saya ingin membaca laporan klinis dari AI agar saya memiliki konteks yang cukup sebelum berkonsultasi</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Halaman laporan menampilkan data hewan, ringkasan gejala, tingkat urgensi, foto yang diupload, dan lokasi peternak</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Dokter bisa scroll dan membaca seluruh isi laporan</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-09</em></th>
<th><em>Dokter Hewan</em></th>
<th><em>Saya ingin membalas konsultasi peternak via chat agar penanganan bisa dilakukan tanpa harus bertemu langsung</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Fitur chat tersedia di dalam halaman konsultasi</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Pesan terkirim dan diterima secara real-time</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Dokter bisa mengirim teks dan gambar</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-10</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin menerima balasan dari dokter hewan via chat agar saya bisa segera mengambil tindakan</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Notifikasi muncul ketika dokter membalas chat</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Peternak bisa membalas pesan dokter dari halaman yang sama</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Riwayat chat tersimpan dan bisa dibuka kembali</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-11</em></th>
<th><em>Dokter Hewan</em></th>
<th><em>Saya ingin mengisi diagnosis dan rekomendasi penanganan setelah konsultasi selesai agar tersimpan di rekam medis hewan</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Tersedia form isian diagnosis dan rekomendasi penanganan</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Data otomatis masuk ke rekam medis hewan yang bersangkutan</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Konsultasi ditandai "selesai" setelah form diisi</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-12</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin meminta kunjungan lapangan dokter hewan ketika kondisi hewan membutuhkan penanganan fisik langsung</em></th>
<th><em>Low</em></th>
<th><ul>
<li><blockquote>
<p><em>Tersedia tombol "Minta Kunjungan Lapangan" di halaman konsultasi</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Peternak bisa mengisi catatan tambahan dan konfirmasi lokasi sebelum request dikirim</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Status request tampil sebagai "menunggu konfirmasi dokter"</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-13</em></th>
<th><em>Dokter Hewan</em></th>
<th><em>Saya ingin menerima dan mengkonfirmasi request kunjungan lapangan agar peternak tahu kapan saya akan datang</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Notifikasi request kunjungan masuk ke dokter</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Dokter bisa menerima atau menolak request disertai alasan</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Jika diterima, dokter bisa mengisi estimasi waktu kedatangan</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-14</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin mendapat konfirmasi dari dokter setelah request kunjungan diterima agar saya bisa mempersiapkan kedatangannya</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Notifikasi konfirmasi masuk ke peternak setelah dokter menerima request</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Notifikasi memuat estimasi waktu kedatangan dokter</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-15</em></th>
<th><em>Peternak</em></th>
<th><em>Saya ingin melihat riwayat kesehatan setiap hewan ternak saya agar saya bisa memantau kondisinya dari waktu ke waktu</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Halaman rekam medis per hewan tersedia dan menampilkan daftar konsultasi beserta diagnosis yang pernah diterima</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Data diurutkan dari yang terbaru</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-16</em></th>
<th><em>Dokter Hewan</em></th>
<th><em>Saya ingin mengakses rekam medis hewan sebelum memberikan diagnosis agar saya bisa mempertimbangkan riwayat kesehatannya</em></th>
<th><em>High</em></th>
<th><ul>
<li><blockquote>
<p><em>Rekam medis hewan bisa diakses dokter dari halaman laporan konsultasi</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Riwayat diagnosis, obat, dan tanggal konsultasi sebelumnya tampil dengan jelas</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><em>US-17</em></th>
<th><em>Sistem</em></th>
<th><em>Saya ingin mengagregasi data kasus penyakit per wilayah agar pola penyebaran penyakit ternak bisa dipantau secara visual</em></th>
<th><em>Medium</em></th>
<th><ul>
<li><blockquote>
<p><em>Setiap kasus yang selesai ditangani otomatis tercatat dengan data lokasi peternak dan jenis penyakit</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Data teragregasi dan dapat divisualisasikan dalam bentuk peta</em></p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><em>US-18</em></th>
<th><em>Admin/Dinas</em></th>
<th><em>Saya ingin melihat peta sebaran kasus penyakit ternak per wilayah agar bisa mengambil tindakan preventif lebih cepat</em></th>
<th><em>Low</em></th>
<th><ul>
<li><blockquote>
<p><em>Dashboard peta tersedia dan menampilkan titik-titik kasus per kecamatan/kabupaten</em></p>
</blockquote></li>
<li><blockquote>
<p><em>Peta bisa difilter berdasarkan jenis penyakit dan rentang waktu</em></p>
</blockquote></li>
</ul></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# **5. Functional Requirements**

| **ID**  | **Nama Fitur**                      | **Deskripsi**                                                                                                                              | **Prioritas** | **User Story** |
|---------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------|
| *FR-01* | *Registrasi Peternak*               | *Pendaftaran akun peternak menggunakan nomor telepon*                                                                                      | *High*        |                |
| *FR-02* | *Registrasi Dokter Hewan*           | *Pendaftaran akun dokter hewan dengan input nomor STR, menunggu verifikasi manual oleh admin*                                              | *High*        |                |
| *FR-03* | *Login*                             | *Masuk ke akun menggunakan nomor telepon*                                                                                                  | *High*        |                |
| *FR-04* | *Manajemen Profil*                  | *Edit data profil pengguna seperti nama, lokasi, dan foto profil*                                                                          | *Medium*      |                |
| *FR-05* | *Tambah Data Hewan Ternak*          | *Input profil hewan ternak baru dengan data jenis, nama/kode, usia estimasi, dan jenis kelamin*                                            | *High*        |                |
| *FR-06* | *Daftar Hewan Ternak*               | *Menampilkan seluruh hewan ternak milik peternak yang terdaftar*                                                                           | *High*        |                |
| *FR-07* | *Edit & Hapus Data Hewan Ternak*    | *Mengubah atau menghapus profil hewan ternak yang sudah terdaftar*                                                                         | *Medium*      |                |
| *FR-08* | *Input Gejala*                      | *Peternak memilih hewan yang sakit, mendeskripsikan gejala via form, dan mengupload foto kondisi hewan (maks. 3 foto)*                     | *High*        |                |
| *FR-09* | *AI Report Generator*               | *Memproses input gejala menjadi laporan klinis terstruktur berisi ringkasan gejala, estimasi durasi, tingkat urgensi, dan konteks lokasi*  | *High*        |                |
| *FR-10* | *Preview Laporan*                   | *Peternak melihat hasil laporan AI sebelum dikirim ke dokter, dengan opsi konfirmasi atau edit ulang deskripsi gejala*                     | *Medium*      |                |
| *FR-11* | *Notifikasi Laporan Masuk*          | *Dokter hewan menerima notifikasi real-time ketika ada laporan konsultasi baru yang masuk*                                                 | *High*        |                |
| *FR-12* | *Baca Laporan AI*                   | *Dokter hewan membaca laporan klinis terstruktur yang dihasilkan AI sebelum memulai konsultasi*                                            | *High*        |                |
| *FR-13* | *Konsultasi Chat*                   | *Chat dua arah antara peternak dan dokter hewan, mendukung pengiriman teks dan gambar secara real-time*                                    | *High*        |                |
| *FR-14* | *Notifikasi Balasan Chat*           | *Peternak menerima notifikasi ketika dokter hewan membalas pesan di sesi konsultasi*                                                       | *High*        |                |
| *FR-15* | *Riwayat Chat*                      | *Seluruh riwayat percakapan per sesi konsultasi tersimpan dan dapat dibuka kembali*                                                        | *High*        |                |
| *FR-16* | *Form Diagnosis & Rekomendasi*      | *Dokter mengisi diagnosis dan rekomendasi penanganan setelah konsultasi, data otomatis tersimpan ke rekam medis hewan*                     | *High*        |                |
| *FR-17* | *Status Konsultasi*                 | *Menampilkan status sesi konsultasi secara real-time: menunggu respons → aktif → selesai*                                                  | *Medium*      |                |
| *FR-18* | *Request Kunjungan Lapangan*        | *Peternak mengajukan request kunjungan lapangan dari halaman konsultasi disertai catatan tambahan dan konfirmasi lokasi*                   | *Medium*      |                |
| *FR-19* | *Konfirmasi Kunjungan*              | *Dokter menerima atau menolak request kunjungan lapangan disertai alasan dan estimasi waktu kedatangan*                                    | *Medium*      |                |
| *FR-20* | *Notifikasi Konfirmasi Kunjungan*   | *Peternak menerima notifikasi setelah dokter mengkonfirmasi atau menolak request kunjungan lapangan*                                       | *Medium*      |                |
| *FR-21* | *Rekam Medis per Hewan*             | *Menampilkan riwayat kesehatan per individu hewan ternak berisi tanggal konsultasi, gejala, diagnosis, dan rekomendasi penanganan*         | *Medium*      |                |
| *FR-22* | *Akses Rekam Medis saat Konsultasi* | *Dokter hewan dapat mengakses rekam medis hewan langsung dari halaman laporan konsultasi sebelum memberikan diagnosis*                     | *Medium*      |                |
| *FR-23* | *Agregasi Data Kasus*               | *Sistem secara otomatis mencatat data lokasi dan jenis penyakit dari setiap konsultasi yang selesai untuk keperluan pemetaan*              | *Medium*      |                |
| *FR-24* | *Peta Sebaran Penyakit*             | *Visualisasi peta sebaran kasus penyakit ternak per kecamatan/kabupaten yang dapat di filter berdasarkan jenis penyakit dan rentang waktu* | *Low*         |                |

# 

# **6. Non-Functional Requirements**

## **6.1 Performa**

- Halaman utama terbuka maksimal sekitar 3 detik pada jaringan normal.

- Foto dikompresi.

- Lazy loading pada video.

- Skeleton loading.

- Tidak memuat peta pada halaman utama.

## **6.2 Keamanan**

- Row Level Security aktif.

- Peternak hanya melihat datanya sendiri.

- Dokter hanya melihat kasus yang ditugaskan.

- API key tidak pernah dikirim ke browser.

- Lokasi tidak ditampilkan publik.

- File memiliki batas tipe dan ukuran.

- API membawa token JWT

## 6.3. Accessibility

- Ikon selalu disertai teks.

- Kontras warna memadai.

- Tombol cukup besar.

- Form dapat digunakan dengan keyboard.

- Istilah medis diberi penjelasan.

- Bahasa dibuat singkat dan langsung.

# 7. Daftar Halaman dan Hak Akses Pengguna

Satu codebase website, dibagi berdasarkan role. Halaman peternak dioptimasi untuk mobile view (PWA).

## 7.1 Daftar Halaman Peternak (Mobile First / PWA)

| **ID** | **Nama Halaman**             | **Deskripsi**                                                                                                                                                         | **Fitur** |
|--------|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| *P-01* | *Onboarding*                 | *Halaman pembuka dengan penjelasan singkat produk dan pilihan masuk sebagai peternak atau dokter hewan*                                                               | *High*    |
|        | *Registrasi*                 | *Form pendaftaran akun peternak dengan input nama, nomor telepon, lokasi, dan password*                                                                               |           |
|        | *Login*                      | *Masuk ke akun via nomor telepon dan password*                                                                                                                        |           |
|        | *Beranda*                    | *Ringkasan: daftar hewan ternak aktif, konsultasi yang sedang berjalan, dan tombol shortcut input gejala baru*                                                        |           |
|        | *Daftar Hewan Ternak*        | *List seluruh hewan ternak milik peternak beserta status kesehatan terakhir*                                                                                          |           |
|        | *Profil Hewan Ternak*        | *Detail profil hewan ternak beserta shortcut ke rekam medis dan riwayat konsultasi*                                                                                   |           |
|        | *Tambah Hewan Ternak*        | *Form input data hewan ternak baru*                                                                                                                                   |           |
|        | *Edit Hewan Ternak*          | *Form edit data hewan ternak yang sudah terdaftar*                                                                                                                    |           |
|        | *Input Gejala*               | *Form input gejala ternak, pilih hewan yang sakit, masukkan beberapa checklist gejala, deskripsi gejala, upload foto (maks. 3), dan AI follow-up question (opsional)* |           |
|        | *Preview Laporan AI*         | *Tampilkan hasil laporan klinis AI sebelum dikirim ke dokter, dengan opsi konfirmasi atau edit ulang*                                                                 |           |
|        | *Daftar Konsultasi*          | *Riwayat dan status seluruh sesi konsultasi peternak (menunggu respons / aktif / selesai)*                                                                            |           |
|        | *Detail Konsultasi dan Chat* | *Halaman chat aktif dengan dokter hewan, laporan AI ditampilkan di bagian atas sebagai konteks*                                                                       |           |
|        | *Request Kunjungan Lapangan* | *Form pengajuan kunjungan lapangan: catatan tambahan dan konfirmasi lokasi*                                                                                           |           |
|        | *Status Kunjungan Lapangan*  | *Menampilkan status dan detail konfirmasi atau penolakan kunjungan lapangan dari dokter*                                                                              |           |
|        | *Rekam Medis Hewan*          | *Riwayat kesehatan lengkap per individu hewan: tanggal, gejala, diagnosis, dan rekomendasi*                                                                           |           |
|        | *Notifikasi*                 | *Pusat notifikasi: balasan chat, konfirmasi kunjungan, dan update status konsultasi*                                                                                  |           |
|        | *Profil dan Pengaturan*      | *Edit profil peternak, pengaturan notifikasi, dan opsi logout*                                                                                                        |           |

## 7.2 Daftar Halaman Dokter Hewan (Web, Responsive)

| **ID** | **Nama Halaman**                | **Deskripsi** | **Fitur** |
|--------|---------------------------------|---------------|-----------|
| *P-01* | *Registrasi*                    |               | *High*    |
|        | *Menunggu Verifikasi*           |               |           |
|        | *Login*                         |               |           |
|        | *Beranda Dokter*                |               |           |
|        | *Daftar Laporan Masuk*          |               |           |
|        | *Detail Laporan & AI Report*    |               |           |
|        | *Konsultasi & Chat*             |               |           |
|        | *Form Diagnosis & Rekomendasi*  |               |           |
|        | *Daftar Kunjungan Lapangan*     |               |           |
|        | *Konfirmasi Kunjungan Lapangan* |               |           |
|        | *Riwayat Konsultasi*            |               |           |
|        | *Notifikasi*                    |               |           |
|        | *Profil & Pengaturan*           |               |           |

## 7.3 Daftar Halaman Admin (Web Dashboard)

| **ID** | **Nama Halaman**          | **Deskripsi**                | **Fitur** |
|--------|---------------------------|------------------------------|-----------|
| *P-01* | *Login Admin*             | *Halaman masuk khusus admin* | *High*    |
|        | *Dashboard Utama*         |                              |           |
|        | *Peta Sebaran Penyakit*   |                              |           |
|        | *Daftar Kasus*            |                              |           |
|        | *Detail Kasus*            |                              |           |
|        | *Verifikasi Dokter Hewan* |                              |           |
|        | *M*                       |                              |           |

# 

# **7. UI/UX & Desain**

## **7.1 Wireframe / Mockup / UI/UX**

| **Link Desain**                                             |
|-------------------------------------------------------------|
| *Embed atau lampirkan wireframe di sini (bisa dari Figma).* |

## **7.2 User Flow**

| **User Flow**                                                                          |
|----------------------------------------------------------------------------------------|
| *Deskripsikan atau embed diagram alur pengguna dari entry point hingga goal tercapai.* |

# **8. Arsitektur Teknis (Ringkasan)**

## **8.1 Tech Stack**

### 8.1.1 Frontend

Frontend menggunakan library React.js dan juga framework Tailwind CSS

### 8.1.2 Backend

Backend menggunakan Node.js dengan Framework Express.js

### 8.1.3 Database

Database menggunakan Postgresql/Supabase dengan Prisma

### 8.1.4 Infrastruktur

Menggunakan Infrastruktur Microservice agar dapat dengan mudah berfokus pada masing-masing bagian

## **8.2 Diagram Arsitektur**

| **Arsitektur Sistem**                                                                                   |
|---------------------------------------------------------------------------------------------------------|
| *Embed atau lampirkan diagram arsitektur sistem di sini (bisa dari draw.io, Lucidchart, atau Mermaid).* |

# **<span class="mark">9. API Contract (Ringkasan)</span>**

| **Method** | **Endpoint**           | **Deskripsi**            | **Auth** | **Response** |
|------------|------------------------|--------------------------|----------|--------------|
| *GET*      | */api/v1/\[resource\]* | *\[Deskripsi endpoint\]* | *JWT*    | *200 OK*     |

# **10. Timeline & Milestones**

| **Milestone**    | **Target Penyelesaian** | **PIC** | **Status** |
|------------------|-------------------------|---------|------------|
| FR-01 s.d. FR-07 | 3 Jam                   |         | Planned    |
| FR-08 s.d. FR-12 | 4 Jam                   |         | Planned    |
| FR-13 s.d. FR-17 | 2 Jam                   |         | Planned    |
| FR-18 s.d. FR-20 | 2 Jam                   |         | Planned    |
| FR-21 s.d. FR-24 | 2 Jam                   |         | Planned    |

# **11. Risiko & Mitigasi**

| **ID** | **Risiko**             | **Level** | **Mitigasi**           | **Owner**      |
|--------|------------------------|-----------|------------------------|----------------|
| *R-01* | *\[Deskripsi risiko\]* | *High*    | *\[Langkah mitigasi\]* | *\[Nama/Tim\]* |

# 12. Referensi


======================================================================
DOCUMENT 2 OF 2: Veternak PRD v1.0 (Full Detailed PRD - Hackathon Context)
======================================================================

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Veternak</strong><br />
Smart Livestock Health Response Platform</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**PRODUCT REQUIREMENTS  
DOCUMENT**

**Platform Respons dan Konsultasi Kesehatan Ternak**

| **Nama Produk**      | Veternak                                     |
|----------------------|----------------------------------------------|
| **Versi Dokumen**    | PRD v1.0                                     |
| **Konteks**          | Hackathon 30 Jam                             |
| **Wilayah Simulasi** | Kabupaten Sleman, Daerah Istimewa Yogyakarta |
| **Tanggal**          | Juli 2026                                    |

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>POSISI PRODUK</strong></p>
<p>Veternak merupakan sistem pendukung respons, komunikasi, dokumentasi, dan edukasi kesehatan ternak. Veternak bukan alat diagnosis dan tidak menggantikan dokter hewan.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Dokumen ini digunakan sebagai konteks utama untuk product team, designer, developer, reviewer, dan AI coding agent dalam membangun MVP Veternak secara konsisten.

# Informasi Dokumen

| **Informasi**            | **Keterangan**                                                                       |
|--------------------------|--------------------------------------------------------------------------------------|
| **Nama produk**          | Veternak                                                                             |
| **Jenis produk**         | Aplikasi web responsif                                                               |
| **Domain**               | Peternakan dan kesehatan hewan                                                       |
| **Fokus ternak MVP**     | Sapi dan kambing                                                                     |
| **Target utama**         | Peternak skala kecil-menengah                                                        |
| **Pengguna pendukung**   | Dokter hewan dan petugas kesehatan hewan                                             |
| **Konteks pengembangan** | Hackathon 30 jam                                                                     |
| **Status dokumen**       | Draft PRD v1.0                                                                       |
| **Tujuan dokumen**       | Konteks utama untuk product team, developer, designer, reviewer, dan AI coding agent |
| **Wilayah simulasi MVP** | Kabupaten Sleman, Daerah Istimewa Yogyakarta                                         |
| **Posisi produk**        | Sistem pendukung respons kesehatan ternak, bukan pengganti diagnosis dokter hewan    |

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>CATATAN VALIDITAS DATA</strong></p>
<p>Data pendukung menggunakan publikasi atau sumber yang terbit pada 2025-2026. Beberapa publikasi resmi tahun 2025 menggunakan tahun referensi data 2024 karena siklus statistik nasional; tahun datanya tetap disebutkan secara terbuka.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# Daftar Isi

| [Ringkasan Eksekutif](#bookmark=id.qvwhxr1tq4p7)          | [7. Scope](#bookmark=id.ypyfgxc0wmj)                        |
|-----------------------------------------------------------|-------------------------------------------------------------|
| [1. Latar Belakang Masalah](#bookmark=id.89dwlftdsn3o)    | [8. Data Pendukung](#bookmark=id.ivk2ygupnrke)              |
| [2. Rumusan Masalah](#bookmark=id.9a6rb1xr7w9m)           | [9. Kelengkapan Fitur MVP](#bookmark=id.tc0tie39jbsb)       |
| [3. Tujuan Utama Pengembangan](#bookmark=id.skvkh4j3t493) | [10. Penjelasan Terkait AI](#bookmark=id.91sy5q2rrmlp)      |
| [4. Batasan Pengembangan](#bookmark=id.djfj9vrxqsxa)      | [11. Warna dan Identitas Visual](#bookmark=id.rtir5wfn7o1e) |
| [5. Deskripsi Aplikasi](#bookmark=id.m4wnxezdfxe4)        | [12. Tech Stack](#bookmark=id.fiatnvxxk4xa)                 |
| [6. Fokus Aplikasi](#bookmark=id.qi2svu428up0)            | [13. Referensi](#bookmark=id.5rqvketnyre)                   |

# Ringkasan Eksekutif

Veternak merupakan platform kesehatan ternak yang membantu peternak sapi dan kambing melaporkan kondisi ternak menggunakan bahasa sederhana, melengkapi informasi melalui pertanyaan lanjutan, mengetahui tingkat urgensi awal, memperoleh panduan respons awal yang aman, dan terhubung dengan dokter hewan yang sesuai.

Veternak tidak dirancang untuk memberikan diagnosis penyakit atau meresepkan obat secara otomatis. Sistem menggunakan pendekatan hybrid AI, yaitu model bahasa untuk memahami dan merangkum laporan peternak serta rule engine yang telah divalidasi dokter hewan untuk menentukan kategori urgensi.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>ALUR UTAMA PRODUK</strong></p>
<p>Laporan gejala -&gt; pertanyaan lanjutan -&gt; triase awal -&gt; tindakan aman -&gt; pencocokan dokter -&gt; ringkasan kasus -&gt; pemantauan status konsultasi -&gt; edukasi kontekstual.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Produk tidak hanya berfungsi ketika ternak sakit, tetapi juga membantu pencegahan melalui Akademi Ternak, yang menyediakan video, artikel, dan checklist perawatan sesuai jenis dan kondisi ternak.

## Ringkasan Prioritas MVP

| **Prioritas** | **Kapabilitas**                          | **Hasil yang Diharapkan**                                                 |
|---------------|------------------------------------------|---------------------------------------------------------------------------|
| P0            | Pelaporan gejala dan pertanyaan lanjutan | Informasi kasus terkumpul secara sederhana dan terstruktur.               |
| P0            | Triase awal dan tindakan aman            | Peternak memahami urgensi dan langkah konservatif sambil menunggu dokter. |
| P0            | Matching dokter dan ringkasan kasus      | Dokter menerima informasi yang relevan sebelum konsultasi.                |
| P0            | Status konsultasi dan Akademi Ternak     | Pengguna dapat memantau proses dan memperoleh edukasi kontekstual.        |
| P2            | Peta Risiko Ternak                       | Hanya menjadi stretch feature apabila seluruh alur utama telah selesai.   |

# 1. Latar Belakang Masalah

## 1.1 Besarnya Populasi Ternak yang Perlu Dilindungi

Badan Pusat Statistik mencatat bahwa pada 2025 Indonesia memiliki sekitar 13.549.850 ekor sapi potong dan 15.824.305 ekor kambing. Angka tersebut menunjukkan bahwa kesehatan sapi dan kambing bukan persoalan yang terbatas pada segelintir peternak, tetapi menyangkut jutaan aset produktif yang tersebar di berbagai wilayah Indonesia. \[1\]\[2\]

Publikasi Statistik Peternakan dan Kesehatan Hewan 2025 mencatat tenaga kerja subsektor peternakan pada Februari 2024 mencapai sekitar 4,29 juta orang. Publikasi tersebut juga menunjukkan bahwa sekitar 82,83% tenaga kerja peternakan masih didominasi tingkat pendidikan dasar. Kondisi ini memperkuat kebutuhan terhadap aplikasi yang menggunakan bahasa sederhana, navigasi singkat, dan tidak mengandalkan istilah veteriner yang rumit. \[3\]

Pada 2024, produk domestik bruto subsektor peternakan atas dasar harga berlaku mencapai sekitar Rp349,8 triliun. Nilai ekonomi ini menunjukkan bahwa penyakit ternak dapat berdampak bukan hanya pada kesehatan hewan, tetapi juga terhadap pendapatan keluarga peternak, pasokan pangan, perdagangan, dan perekonomian daerah. \[3\]

## 1.2 Penyakit Menular Masih Menjadi Ancaman Nyata

Penyakit Mulut dan Kuku (PMK) merupakan penyakit viral yang sangat menular dan dapat menyerang sapi, kambing, domba, babi, serta hewan berkuku belah lainnya. Walaupun kematian pada hewan dewasa tidak selalu tinggi, PMK dapat menyebabkan penurunan produksi, gangguan perdagangan ternak, dan kerugian ekonomi yang serius. \[7\]

Pada awal Januari 2025, kasus PMK di Indonesia sempat mencapai sekitar 2.412 kasus per minggu. Setelah kegiatan pengendalian dan vaksinasi, jumlah tersebut turun menjadi sekitar 182 kasus pada pekan ketiga Februari 2025. Perubahan yang cepat ini menunjukkan bahwa penyakit dapat meningkat dalam waktu singkat, tetapi pelaporan, pengawasan, vaksinasi, dan respons yang terkoordinasi dapat menekan penyebarannya. \[5\]

Di Kabupaten Sleman, dalam periode 1 Desember 2024 hingga 14 Januari 2025 tercatat 274 ternak sakit, 40 sembuh, 22 mati, dan 13 dipotong bersyarat. Pada saat yang sama, Sleman memiliki sekitar 97.310 ternak rentan PMK. Fakta tersebut menunjukkan bahwa keterlambatan pelaporan satu kasus dapat berpengaruh terhadap seluruh kandang atau peternakan di sekitarnya. \[6\]

## 1.3 Keterbatasan Pengetahuan dan Akses Layanan

Penelitian yang diterbitkan pada Januari 2025 mengenai peternak kambing di Desa Kaliuda, Sumba Timur, melaporkan bahwa salah satu peternak yang diwawancarai mengalami penurunan populasi kambing dari sekitar 60 ekor pada 2022 menjadi 20 ekor pada 2024 karena penyakit dan kematian ternak. Penelitian tersebut juga menemukan keterbatasan pengetahuan peternak dalam menangani penyakit serta tidak adanya dokter hewan di kelompok ternak yang diteliti. \[11\]

Penelitian yang sama mencatat bahwa peternak terkadang menjual kambing sakit dengan harga jauh lebih rendah atau memberikan penanganan yang tidak tepat sehingga kondisi ternak memburuk. Aplikasi sistem pakar yang diuji memperoleh skor System Usability Scale sebesar 75 dan dinilai membantu pengguna, terutama peternak yang lokasinya jauh dari dinas peternakan atau penyuluh. \[11\]

Pengalaman lapangan Puskeswan di Kebumen yang dipublikasikan Universitas Airlangga pada Januari 2025 menjelaskan adanya layanan Puskeswan Keliling untuk menjangkau wilayah yang sulit diakses atau tidak memiliki akses mudah ke fasilitas kesehatan hewan tetap. Tantangan akses bukan semata-mata ketiadaan dokter, tetapi juga jarak, waktu tempuh, distribusi tenaga, dan komunikasi dengan peternak. \[12\]

Pada 2026, Kementerian Pertanian juga menyatakan bahwa jumlah pusat kesehatan hewan masih perlu terus ditingkatkan agar penguatan layanan veteriner dapat menjangkau lebih banyak wilayah. \[13\]

## 1.4 Informasi Kasus Sering Tidak Terstruktur

Dalam praktik sehari-hari, peternak mungkin hanya menyampaikan informasi seperti:

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>CONTOH LAPORAN</strong></p>
<p>“Sapi saya lemas, tidak mau makan, dan dari hidung keluar lendir.”</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Informasi tersebut penting, tetapi dokter masih memerlukan data tambahan:

- Sejak kapan gejala muncul.

- Apakah ternak masih dapat berdiri dan minum.

- Apakah suhu tubuh telah diukur.

- Apakah ada ternak lain dengan gejala serupa.

- Apakah pernapasan terlihat berat.

- Apakah kondisi memburuk dengan cepat.

- Tindakan apa yang sudah dilakukan.

Tanpa format laporan yang terstruktur, dokter perlu mengulangi banyak pertanyaan sebelum dapat menentukan prioritas penanganan. Dalam situasi mendesak, proses tersebut dapat memperlambat respons.

## 1.5 Dampak Ekonomi dan Kekhawatiran Penularan

Pada Januari 2025, pedagang sapi bernama Tohari dan Syarif di Pasar Hewan Jrebeng Kidul, Probolinggo, melaporkan penurunan harga sapi sekitar 25-35% ketika PMK kembali merebak. Tohari juga menyampaikan kekhawatiran membawa sapi yang tidak terjual kembali ke kandang karena takut menularkan penyakit kepada ternak lainnya. Kasus ini menunjukkan bahwa ketidakpastian kesehatan ternak secara langsung memengaruhi keputusan ekonomi pelaku usaha. \[15\]

Karena itu, sistem kesehatan ternak perlu membantu peternak:

> **1.** Mengenali apakah kondisi perlu ditangani segera.
>
> **2.** Mengetahui apakah ternak harus dipisahkan.
>
> **3.** Menyampaikan kondisi secara lengkap.
>
> **4.** Mengurangi tindakan improvisasi yang tidak terverifikasi.
>
> **5.** Mendokumentasikan penanganan dan perkembangan ternak.

## 1.6 Peluang dan Keterbatasan Adopsi Digital

Pada 2025, penetrasi internet Indonesia diperkirakan telah mencapai sekitar 80% atau 229 juta pengguna. Namun, pemerintah juga menyatakan sekitar 60 juta warga masih belum terkoneksi, terutama pada wilayah yang menghadapi kesenjangan infrastruktur digital. \[17\]\[18\]

Implikasi bagi Veternak adalah:

- Aplikasi web memiliki potensi menjangkau banyak pengguna.

- Antarmuka harus ringan dan responsif.

- Foto perlu dikompresi sebelum diunggah.

- Form tidak boleh terlalu panjang.

- Fitur penting harus tetap dapat digunakan pada koneksi yang tidak stabil.

- Video Akademi Ternak harus memiliki ringkasan teks dan checklist.

## 1.7 Posisi Veternak terhadap Sistem Pemerintah

Indonesia telah memiliki iSIKHNAS, sistem nasional yang menghubungkan laporan penyakit, data laboratorium, peta, lalu lintas hewan, rumah potong, populasi, dan berbagai data kesehatan hewan lainnya. \[9\]

Veternak tidak diposisikan sebagai pengganti iSIKHNAS. Veternak berfokus pada sisi pengguna akhir:

- Mempermudah peternak membuat laporan awal.

- Mempercepat penyusunan informasi kasus.

- Membantu dokter menerima ringkasan terstruktur.

- Mengelola komunikasi dan status penanganan.

- Memberikan edukasi preventif.

Integrasi dengan iSIKHNAS hanya menjadi kemungkinan pengembangan di masa depan dan memerlukan kerja sama serta otorisasi resmi.

## 1.8 Sintesis Masalah

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>MASALAH UTAMA</strong></p>
<p>Peternak sapi dan kambing belum selalu memiliki sarana yang mudah, cepat, dan terstruktur untuk melaporkan ternak sakit, memahami tingkat urgensi awal, memperoleh tindakan aman sambil menunggu bantuan, serta menemukan dokter hewan yang sesuai.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Masalah tersebut diperkuat oleh:

- Risiko penyakit menular dan dampaknya pada seluruh kandang.

- Nilai ekonomi ternak yang tinggi.

- Keterbatasan pengetahuan kesehatan hewan.

- Kesenjangan akses dokter atau Puskeswan.

- Laporan gejala yang belum terstruktur.

- Penggunaan obat atau penanganan mandiri yang berisiko.

- Tidak tersedianya rekam kasus sederhana yang dapat diakses peternak dan dokter.

- Materi edukasi yang tersebar dan tidak selalu relevan dengan kondisi ternak.

## 1.9 User Persona Berbasis Orang Nyata

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>CATATAN METODOLOGIS</strong></p>
<p>Persona berikut disusun dari profil orang nyata yang diberitakan atau tercantum dalam publikasi terbuka. Fakta biografisnya nyata, sedangkan kebutuhan produk yang diturunkan darinya merupakan hipotesis desain. Persona tidak menggantikan wawancara pengguna.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Persona A — Masrukhi, Peternak Sapi

| **Atribut** | **Informasi**                      |
|-------------|------------------------------------|
| **Nama**    | Masrukhi                           |
| **Usia**    | 43 tahun                           |
| **Profesi** | Peternak/pengelola peternakan sapi |
| **Lokasi**  | Jombang, Jawa Timur                |
| **Usaha**   | Putra Mandiri Farm                 |
| **Ternak**  | Sapi potong                        |
| **Sumber**  | Detik, 28 Mei 2025 \[14\]          |

Masrukhi merawat sapi dengan pemberian pakan teratur, pemeriksaan kesehatan, dan kebersihan kandang. Salah satu sapi yang dipeliharanya menjalani pemeriksaan kesehatan rutin untuk memastikan bebas dari PMK dan Lumpy Skin Disease. \[14\]

Sasaran pengguna yang dapat diturunkan:

- Mengetahui kondisi kesehatan setiap sapi.

- Menyimpan identitas dan riwayat ternak.

- Melaporkan perubahan kondisi dengan cepat.

- Mendapatkan bantuan profesional ketika gejala tidak dapat ditangani sendiri.

- Menjaga nilai ekonomi ternak.

- Memiliki bukti riwayat perawatan dan pemeriksaan.

Pain point yang masih perlu divalidasi langsung:

- Apakah pencatatan kesehatan masih dilakukan secara manual.

- Berapa lama biasanya memperoleh respons dokter.

- Kanal komunikasi yang digunakan dengan dokter.

- Kesulitan menyampaikan gejala melalui chat.

- Kesediaan memasukkan profil masing-masing ternak.

- Kebutuhan terhadap pengingat vaksinasi dan kontrol.

Fitur relevan: Profil Ternak, Lapor Gejala, Ringkasan Kasus, Status Konsultasi, Riwayat Kasus, dan Akademi Ternak.

### Persona B — Tohari, Pelaku Usaha Ternak

| **Atribut** | **Informasi**                                           |
|-------------|---------------------------------------------------------|
| **Nama**    | Tohari                                                  |
| **Profesi** | Pedagang/pelaku usaha sapi                              |
| **Lokasi**  | Pasar Hewan Jrebeng Kidul, Probolinggo                  |
| **Kondisi** | Terdampak ketidakpastian dan kekhawatiran penularan PMK |
| **Sumber**  | Detik, 18 Januari 2025 \[15\]                           |

Tohari melaporkan bahwa harga sapi turun tajam ketika PMK merebak. Ia juga menyampaikan kekhawatiran membawa sapi yang tidak terjual kembali ke kandang karena dapat menularkan penyakit kepada ternak lain. \[15\]

Masalah yang divalidasi:

- Penyakit ternak menimbulkan konsekuensi ekonomi langsung.

- Risiko penularan memengaruhi keputusan pemindahan ternak.

- Pelaku usaha membutuhkan informasi kesehatan dan pencegahan yang cepat.

- Ketidakpastian kondisi ternak dapat menurunkan kepercayaan pasar.

Fitur relevan: Risiko Penularan Awal, panduan isolasi dan biosecurity, riwayat kesehatan, ringkasan pemeriksaan dokter, dan Akademi Ternak.

### Persona C — drh. Oktavianus K. Rohi, Dokter Hewan

| **Atribut**   | **Informasi**                                            |
|---------------|----------------------------------------------------------|
| **Nama**      | drh. Oktavianus K. Rohi                                  |
| **Profesi**   | Dokter hewan dan pakar kambing                           |
| **Institusi** | Dinas Peternakan Kabupaten Sumba Timur                   |
| **Peran**     | Narasumber pakar pada penelitian sistem penyakit kambing |
| **Sumber**    | Jurnal Rekayasa Informasi Swadharma, Januari 2025 \[11\] |

drh. Oktavianus K. Rohi menjadi pakar yang diwawancarai dalam penelitian mengenai penyakit kambing di Desa Kaliuda. Penelitian tersebut menemukan bahwa keterbatasan akses dokter dan pengetahuan peternak menyulitkan penanganan penyakit kambing. \[11\]

Sasaran pengguna dokter:

- Memperoleh informasi kasus sebelum konsultasi.

- Menentukan prioritas kasus berdasarkan tingkat urgensi.

- Mengetahui jumlah ternak terdampak.

- Melihat foto, lokasi, dan riwayat gejala.

- Mengurangi pengulangan pertanyaan dasar.

- Memberikan catatan dan status penanganan.

Fitur relevan: Ringkasan Kasus Otomatis, daftar kasus berdasarkan urgensi, Profil Ternak, status penerimaan kasus, Catatan Dokter, dan Riwayat Konsultasi.

### Asumsi Persona yang Wajib Divalidasi Tim

| **Responden**               | **Jumlah Minimum** | **Tujuan**                                     |
|-----------------------------|--------------------|------------------------------------------------|
| Peternak sapi               | 2 orang            | Menguji alur pelaporan dan bahasa.             |
| Peternak kambing            | 2 orang            | Menguji kesesuaian gejala dan kebutuhan.       |
| Dokter hewan                | 1 orang            | Memvalidasi triase, pertanyaan, dan ringkasan. |
| Petugas Puskeswan/paramedik | 1 orang            | Memvalidasi alur respons lapangan.             |

# 2. Rumusan Masalah

## 2.1 Rumusan Masalah Utama

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>RUMUSAN UTAMA</strong></p>
<p>Bagaimana merancang platform respons kesehatan ternak yang membantu peternak sapi dan kambing melaporkan gejala secara sederhana, memahami tingkat urgensi awal, memperoleh arahan tindakan aman, dan terhubung dengan dokter hewan yang sesuai tanpa menggantikan kewenangan diagnosis tenaga medis veteriner?</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 2.2 Poin Masalah yang Diangkat

| **Masalah**                             | **Penjelasan**                                                                                                                         |
|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Kesulitan mengenali tingkat urgensi** | Peternak belum selalu dapat membedakan kondisi darurat, mendesak, perlu diperiksa, atau masih dapat dipantau.                          |
| **Laporan gejala tidak terstruktur**    | Informasi sering disampaikan melalui cerita pendek, telepon, atau pesan chat tanpa format standar.                                     |
| **Akses dokter tidak selalu cepat**     | Peternak belum tentu mengetahui dokter yang tersedia, relevan dengan spesies, mampu melakukan kunjungan, dan berada dalam jarak wajar. |
| **Kebutuhan tindakan awal yang aman**   | Peternak memerlukan langkah konservatif seperti isolasi, menyediakan air, dan membatasi pergerakan ternak sambil menunggu bantuan.     |
| **Risiko kesalahan penanganan mandiri** | Obat, antibiotik, obat manusia, atau ramuan dapat diberikan tanpa penilaian profesional.                                               |
| **Dokumentasi kasus tidak konsisten**   | Informasi gejala, foto, hasil pemeriksaan, dokter yang menangani, dan perkembangan kondisi sering tersebar.                            |
| **Edukasi belum kontekstual**           | Peternak membutuhkan materi yang sesuai dengan jenis, umur, gejala, dan tahap pemulihan ternaknya.                                     |

# 3. Tujuan Utama Pengembangan

## 3.1 Tujuan Umum

Mengembangkan aplikasi web yang mempercepat dan menyederhanakan proses respons terhadap ternak sapi dan kambing yang sakit, mulai dari pelaporan gejala hingga komunikasi dengan dokter hewan.

## 3.2 Tujuan Khusus

> **1.** Membantu peternak menyampaikan gejala dengan bahasa sehari-hari.
>
> **2.** Mengubah laporan bebas menjadi data kasus terstruktur.
>
> **3.** Mengajukan pertanyaan lanjutan berdasarkan informasi yang belum lengkap.
>
> **4.** Memberikan kategori urgensi awal yang dapat dijelaskan.
>
> **5.** Menampilkan panduan respons awal yang telah disetujui dokter hewan.
>
> **6.** Memberikan rekomendasi dokter berdasarkan spesies, keahlian, ketersediaan, dan jarak.
>
> **7.** Membuat ringkasan kasus otomatis bagi dokter.
>
> **8.** Menyediakan status konsultasi dan kunjungan.
>
> **9.** Menyediakan materi edukasi yang relevan dengan kondisi ternak.
>
> **10.** Menyimpan riwayat kasus dasar untuk kebutuhan pemantauan.

## 3.3 Tujuan MVP Hackathon

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>SKENARIO KEBERHASILAN UTAMA</strong></p>
<p>Peternak memilih ternak -&gt; melaporkan gejala -&gt; menjawab pertanyaan lanjutan -&gt; menerima hasil triase -&gt; melihat tindakan awal -&gt; memilih dokter -&gt; dokter menerima ringkasan -&gt; status kasus diperbarui.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 3.4 Target Keberhasilan Produk

Target berikut merupakan target pengembangan, bukan hasil pengujian aktual.

| **Metrik**                                   | **Target MVP**                  |
|----------------------------------------------|---------------------------------|
| **Waktu menyelesaikan laporan**              | Maksimal 3 menit                |
| **Jumlah pertanyaan lanjutan**               | Maksimal 5 pertanyaan per kasus |
| **Waktu menghasilkan triase**                | Maksimal 10 detik               |
| **Ringkasan kasus terbentuk**                | 100% laporan lengkap            |
| **Hasil triase memiliki alasan**             | 100%                            |
| **Kasus darurat menawarkan eskalasi dokter** | 100%                            |
| **AI memberikan resep/diagnosis pasti**      | 0 kasus                         |
| **Dokter rekomendasi yang ditampilkan**      | Minimal 3 profil                |
| **Modul edukasi tersedia**                   | Minimal 6 modul                 |
| **Alur demo end-to-end berhasil**            | 1 skenario penuh                |

# 4. Batasan Pengembangan

## 4.1 Batasan Pengguna

MVP hanya melayani peternak sapi, peternak kambing, dokter hewan atau profil dokter simulasi, dan administrator konten secara terbatas.

MVP belum ditujukan untuk hewan peliharaan, unggas, babi, kuda, satwa liar, rumah potong hewan, distributor obat, atau instansi pemerintah sebagai pengguna dashboard resmi.

## 4.2 Batasan Medis

Veternak tidak boleh:

- Menyatakan diagnosis pasti.

- Menampilkan persentase akurasi penyakit.

- Menjamin ternak menderita penyakit tertentu.

- Meresepkan antibiotik atau obat.

- Menentukan dosis obat.

- Menggantikan pemeriksaan fisik.

- Menjamin dokter akan tiba dalam keadaan darurat.

- Memberikan keputusan pemotongan atau pemusnahan ternak.

- Menyatakan suatu wilayah mengalami wabah.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>LANDASAN PRODUK</strong></p>
<p>Pelayanan medik veteriner berada dalam kewenangan profesi dokter hewan. Veternak harus menjadi alat bantu komunikasi dan prioritas respons, bukan pelaksana diagnosis medis. [20]</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 4.3 Batasan Data Dokter

- Profil dokter dapat berupa data sintetis.

- Profil sintetis wajib diberi label “Data Demo”.

- Nama, foto, nomor telepon, dan lokasi dokter nyata tidak boleh digunakan tanpa persetujuan.

- Sistem tidak boleh mengklaim dokter telah bermitra apabila belum ada kerja sama.

## 4.4 Batasan Geografis

Demo menggunakan Kabupaten Sleman sebagai wilayah simulasi karena memiliki populasi sapi dan kambing yang relevan, terdapat data kasus 2025, memiliki struktur Puskeswan, dan mudah digunakan sebagai studi kasus hackathon.

Produk tidak boleh mengklaim memiliki cakupan nasional sebelum jaringan dokter tersedia, validasi operasional dilakukan, regulasi daerah dipahami, dan integrasi layanan diuji.

## 4.5 Batasan Fitur

Fitur berikut tidak termasuk MVP utama:

- Pembayaran.

- Video call.

- Resep digital.

- Pembelian obat.

- Analisis foto penyakit.

- Prediksi penyakit dengan computer vision.

- Integrasi iSIKHNAS.

- Integrasi laboratorium.

- QR health passport penuh.

- Monitoring dosis obat.

- Marketplace pakan.

- Sistem asuransi.

- Peta Risiko Ternak.

## 4.6 Posisi Peta Risiko

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>STRETCH FEATURE</strong></p>
<p>Peta Risiko Ternak menjadi fitur opsi terakhir. Apabila sempat dibuat, peta hanya menggunakan data simulasi, area agregat, lokasi yang disamarkan, label laporan awal/terverifikasi, dan istilah “indikasi risiko” — bukan “wabah”.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 4.7 Batasan Privasi

Data yang dianggap sensitif meliputi nama dan nomor telepon peternak, lokasi kandang, koordinat peternakan, foto kandang, riwayat konsultasi, identitas dokter, dan percakapan kasus.

Penggunaan lokasi dan identitas pengguna harus didasarkan pada persetujuan serta dibatasi sesuai tujuan layanan, sejalan dengan kewajiban pengendali dan prosesor data dalam UU Pelindungan Data Pribadi. \[21\]

# 5. Deskripsi Aplikasi

## 5.1 Definisi Produk

Veternak adalah aplikasi web responsif yang membantu peternak sapi dan kambing memperoleh respons awal ketika ternaknya menunjukkan gejala sakit.

Peternak dapat memilih ternak, memasukkan gejala, mengunggah foto, dan menjelaskan kondisi dengan bahasa sederhana. Sistem kemudian:

> **1.** Menyusun laporan menjadi data terstruktur.
>
> **2.** Mengidentifikasi informasi yang belum lengkap.
>
> **3.** Memberikan pertanyaan lanjutan.
>
> **4.** Menjalankan rule engine untuk menentukan kategori urgensi.
>
> **5.** Menampilkan alasan hasil triase.
>
> **6.** Memberikan panduan awal yang aman.
>
> **7.** Menampilkan dokter hewan yang sesuai.
>
> **8.** Membuat ringkasan kasus untuk dokter.
>
> **9.** Menampilkan perkembangan status konsultasi.
>
> **10.** Merekomendasikan materi edukasi terkait.

## 5.2 Value Proposition

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>VALUE PROPOSITION</strong></p>
<p>Veternak membantu peternak merespons ternak sakit dengan lebih cepat melalui laporan gejala terstruktur, triase awal yang dapat dijelaskan, tindakan aman, dan koneksi kepada dokter hewan dalam satu platform.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 5.3 One-Liner Pitch

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>PITCH</strong></p>
<p>Veternak adalah platform respons kesehatan ternak yang membantu peternak dari pelaporan gejala hingga penanganan dokter dan edukasi pemulihan.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 5.4 Pembeda Produk

| **Solusi Konvensional**                      | **Veternak**                          |
|----------------------------------------------|---------------------------------------|
| Menghubungi dokter melalui chat tanpa format | Laporan gejala terstruktur            |
| Dokter menanyakan informasi dari awal        | Ringkasan kasus otomatis              |
| Peternak tidak mengetahui urgensi            | Kategori urgensi dengan alasan        |
| Hanya menampilkan daftar dokter              | Matching berdasarkan kebutuhan kasus  |
| Tidak ada arahan sambil menunggu             | Panduan tindakan awal yang aman       |
| Materi edukasi umum                          | Modul sesuai kondisi ternak           |
| Catatan tersebar                             | Riwayat kasus terpusat                |
| Chat berakhir setelah konsultasi             | Status kasus dan pemantauan sederhana |

# 6. Fokus Aplikasi

| **Fokus**                      | **Cakupan**                                                                                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|
| **Respons Cepat**              | Pelaporan gejala, pertanyaan lanjutan, penentuan urgensi, risiko penularan awal, dan panduan tindakan aman.  |
| **Komunikasi Peternak–Dokter** | Ringkasan kasus, foto ternak, data lokasi, riwayat gejala, jumlah ternak terdampak, dan status konsultasi.   |
| **Akses Tenaga Medis**         | Pencocokan dokter berdasarkan spesies, keahlian, ketersediaan, jarak, layanan kunjungan, dan estimasi waktu. |
| **Edukasi dan Pencegahan**     | Video, artikel, checklist, biosecurity, nutrisi, perawatan harian, dan rekomendasi modul berdasarkan kasus.  |

# 7. Scope

## 7.1 In-Scope MVP

| **Area**       | **Termasuk**                                  |
|----------------|-----------------------------------------------|
| **Platform**   | Web responsif                                 |
| **Bahasa**     | Bahasa Indonesia                              |
| **Spesies**    | Sapi dan kambing                              |
| **Pengguna**   | Peternak dan dokter                           |
| **Pelaporan**  | Form gejala dan catatan bebas                 |
| **Media**      | Unggah foto                                   |
| **AI**         | Ekstraksi, pertanyaan lanjutan, dan ringkasan |
| **Triase**     | Kategori urgensi berbasis aturan              |
| **Guidance**   | Tindakan awal dari knowledge base             |
| **Dokter**     | Matching dengan data demo                     |
| **Konsultasi** | Timeline dan chat sederhana                   |
| **Edukasi**    | Katalog dan detail modul                      |
| **Lokasi**     | Input kandang dan perhitungan jarak sederhana |
| **Riwayat**    | Penyimpanan kasus dasar                       |

## 7.2 Out-of-Scope MVP

| **Area**             | **Tidak Termasuk**           |
|----------------------|------------------------------|
| **Diagnosis**        | Diagnosis penyakit otomatis  |
| **Obat**             | Resep dan dosis              |
| **Pemeriksaan**      | Analisis medis berbasis foto |
| **Pembayaran**       | Payment gateway              |
| **Komunikasi**       | Video call                   |
| **Pemerintah**       | Integrasi iSIKHNAS           |
| **Laboratorium**     | Hasil uji laboratorium       |
| **Mapping**          | Peta risiko penyakit         |
| **Commerce**         | Penjualan pakan atau obat    |
| **Skala**            | Operasi nasional             |
| **Validitas dokter** | Verifikasi STR/SIP otomatis  |

## 7.3 Peran Pengguna

### Peternak

- Membuat akun dan profil kandang.

- Menambahkan ternak.

- Melaporkan gejala.

- Menjawab pertanyaan.

- Melihat triase.

- Memilih dokter.

- Melihat status kasus.

- Mengakses Akademi Ternak.

### Dokter Hewan

- Melihat daftar dan ringkasan kasus.

- Menerima atau menolak permintaan.

- Memperbarui status.

- Mengirim pesan singkat.

- Menambahkan catatan pemeriksaan.

### Administrator

- Mengelola data demo dokter.

- Mengelola modul Akademi Ternak.

- Mengelola daftar tindakan awal.

- Mengelola aturan triase.

## 7.4 User Journey Utama

### Alur Peternak

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>Beranda<br />
v<br />
Pilih ternak / tambah ternak<br />
v<br />
Lapor gejala<br />
v<br />
AI menyusun data<br />
v<br />
Pertanyaan lanjutan<br />
v<br />
Hasil triase<br />
v<br />
Tindakan awal<br />
v<br />
Rekomendasi dokter<br />
v<br />
Konfirmasi kasus<br />
v<br />
Status konsultasi<br />
v<br />
Riwayat dan modul edukasi</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Alur Dokter

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>Kasus masuk<br />
v<br />
Baca ringkasan kasus<br />
v<br />
Lihat foto dan lokasi<br />
v<br />
Terima / tolak kasus<br />
v<br />
Perbarui status<br />
v<br />
Konsultasi atau kunjungan<br />
v<br />
Tambahkan catatan<br />
v<br />
Tutup kasus</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 7.5 Halaman Utama

> **1.** Login/onboarding.
>
> **2.** Beranda.
>
> **3.** Profil ternak.
>
> **4.** Lapor gejala.
>
> **5.** Pertanyaan lanjutan AI.
>
> **6.** Hasil triase dan tindakan awal.
>
> **7.** Rekomendasi dokter.
>
> **8.** Ringkasan kasus.
>
> **9.** Konsultasi dan status kasus.
>
> **10.** Akademi Ternak.
>
> **11.** Detail modul.
>
> **12.** Profil pengguna.

# 8. Data Pendukung

| **Fakta**                        | **Data**                                        | **Implikasi Produk**                               | **Sumber** |
|----------------------------------|-------------------------------------------------|----------------------------------------------------|------------|
| Populasi sapi potong 2025        | 13.549.850 ekor                                 | Target aset ternak sangat besar.                   | \[1\]      |
| Populasi kambing 2025            | 15.824.305 ekor                                 | Kambing relevan sebagai fokus MVP.                 | \[2\]      |
| Tenaga kerja peternakan          | ±4,29 juta orang                                | Dampak produk berhubungan dengan mata pencaharian. | \[3\]      |
| Pendidikan dasar mendominasi     | ±82,83%                                         | Bahasa dan UX harus sederhana.                     | \[3\]      |
| PDB subsektor peternakan 2024    | ±Rp349,8 triliun                                | Kesehatan ternak memiliki konsekuensi ekonomi.     | \[3\]      |
| PMK awal Januari 2025            | 2.412 kasus/minggu                              | Penyakit dapat meningkat cepat.                    | \[5\]      |
| PMK pekan ketiga Februari 2025   | 182 kasus/minggu                                | Respons terkoordinasi dapat menekan kasus.         | \[5\]      |
| Kasus Sleman                     | 274 sakit; 22 mati; 13 potong bersyarat         | Penanganan dan pelaporan lokal penting.            | \[6\]      |
| Ternak rentan di Sleman          | 97.310 ekor                                     | Risiko tidak terbatas pada satu ternak.            | \[6\]      |
| Studi Kaliuda                    | Populasi satu peternak turun 60 menjadi 20 ekor | Penyakit dapat menggerus aset peternak.            | \[11\]     |
| Akses dokter di kelompok Kaliuda | Tidak tersedia dokter hewan dalam kelompok      | Matching dan komunikasi jarak jauh relevan.        | \[11\]     |
| Internet Indonesia 2025          | ±229 juta pengguna                              | Web app memungkinkan.                              | \[17\]     |
| Penduduk belum terkoneksi        | ±60 juta                                        | Aplikasi harus ringan dan toleran jaringan.        | \[18\]     |

# 9. Kelengkapan Fitur MVP

## 9.1 Matriks Prioritas

| **Prioritas** | **Fitur**                       | **Status**              |
|---------------|---------------------------------|-------------------------|
| P0            | Beranda dan profil ternak dasar | Wajib                   |
| P0            | Smart Symptom Report            | Wajib                   |
| P0            | Pertanyaan Lanjutan AI          | Wajib                   |
| P0            | Explainable Smart Triage        | Wajib                   |
| P0            | First Response Guidance         | Wajib                   |
| P0            | Smart Veterinarian Matching     | Wajib                   |
| P0            | Auto-Generated Vet Brief        | Wajib                   |
| P0            | Konsultasi dan Status Kasus     | Wajib                   |
| P0            | Akademi Ternak                  | Wajib versi sederhana   |
| P1            | Voice symptom report            | Jika waktu memungkinkan |
| P1            | Recovery monitoring             | Jika waktu memungkinkan |
| P1            | Notifikasi                      | Jika waktu memungkinkan |
| P2            | Animal Health Passport lengkap  | Future                  |
| P2            | Peta Risiko Ternak              | Opsi terakhir           |
| P2            | Integrasi iSIKHNAS              | Future partnership      |

## 9.2 Beranda

**Tujuan:** Memberikan gambaran cepat kondisi peternakan dan akses langsung untuk melaporkan ternak sakit.

Komponen utama:

- Salam pengguna dan tombol Laporkan Gejala.

- Jumlah ternak aktif, kasus darurat, dan konsultasi aktif.

- Daftar ternak dan status kesehatan terakhir.

- Peringatan cepat, aktivitas terbaru, dan akses Akademi Ternak.

Data/Input:

- Jumlah ternak.

- Jumlah kasus aktif.

- Jumlah konsultasi.

- Nama, jenis, umur, dan status kesehatan ternak.

- Tanggal pembaruan.

Acceptance criteria:

- Pengguna dapat menuju form laporan maksimal satu klik.

- Ternak berstatus perlu dipantau terlihat berbeda.

- Kasus darurat ditampilkan dengan indikator merah dan label teks.

- Data kosong memiliki empty state yang jelas.

- Pengguna baru diarahkan untuk menambahkan ternak.

## 9.3 Profil Ternak Dasar

**Tujuan:** Menyediakan identitas ternak yang digunakan dalam laporan dan riwayat kasus.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>BATASAN MVP</strong></p>
<p>Profil belum menjadi health passport lengkap. Data yang disimpan hanya informasi dasar dan riwayat laporan.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Data/Input:

| **Field**           | **Wajib** |
|---------------------|-----------|
| Nama/nomor ternak   | Ya        |
| Jenis ternak        | Ya        |
| Ras                 | Tidak     |
| Jenis kelamin       | Ya        |
| Umur/perkiraan umur | Ya        |
| Foto                | Tidak     |
| Lokasi kandang      | Ya        |
| Catatan             | Tidak     |

Acceptance criteria:

- Peternak dapat memilih profil ketika melapor.

- Sistem dapat membuat laporan tanpa nomor identifikasi resmi.

- Satu pengguna dapat memiliki beberapa ternak.

- Satu kandang dapat memiliki beberapa profil.

## 9.4 Smart Symptom Report

**Tujuan:** Mengumpulkan informasi kondisi ternak dalam format sederhana dan terstruktur.

Data/Input:

- Ternak yang dilaporkan.

- Waktu mulai gejala.

- Nafsu makan.

- Kemampuan berdiri.

- Kondisi pernapasan.

- Jumlah ternak terdampak.

- Catatan gejala.

- Opsional: suhu, foto, video pendek, perubahan kotoran, kondisi mulut/kulit/kaki, dan tindakan yang sudah dilakukan.

Proses sistem:

> **1.** Memvalidasi field wajib.
>
> **2.** Menyimpan input asli.
>
> **3.** Mengirim teks kepada AI extraction service.
>
> **4.** Mengubahnya menjadi JSON terstruktur.
>
> **5.** Menandai field yang belum tersedia.
>
> **6.** Mengarahkan pengguna ke pertanyaan lanjutan.

Acceptance criteria:

- Laporan tidak dapat dilanjutkan tanpa ternak dan catatan gejala.

- Foto dikompresi sebelum unggah.

- Input asli tidak boleh diubah oleh AI.

- Hasil ekstraksi dapat diedit pengguna.

- Sistem menampilkan persetujuan bahwa hasil bukan diagnosis.

## 9.5 Pertanyaan Lanjutan AI

**Tujuan:** Mengumpulkan informasi penting yang belum tersedia tanpa membuat form awal terlalu panjang.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>KONTROL AI</strong></p>
<p>AI tidak bebas menciptakan pertanyaan medis. AI hanya memilih pertanyaan dari question bank berdasarkan field yang kosong dan gejala yang dilaporkan.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Komponen utama:

- Maksimal lima pertanyaan.

- Satu pertanyaan per kartu.

- Bahasa sehari-hari.

- Pilihan “Tidak tahu”.

- Pertanyaan berasal dari question bank yang disetujui.

Data/Input:

- Apakah ternak masih bisa minum?

- Apakah ternak dapat berdiri tanpa bantuan?

- Apakah napasnya terlihat berat?

- Apakah ada ternak lain dengan gejala yang sama?

- Apakah terdapat luka atau lepuhan pada mulut?

- Apakah kondisi memburuk dalam beberapa jam?

- Apakah ada pendarahan?

Acceptance criteria:

- Tidak ada pertanyaan yang berulang.

- Jawaban tersimpan ke laporan.

- Pengguna dapat kembali memperbaiki jawaban.

- Sistem berhenti bertanya ketika informasi cukup.

- Apabila AI gagal, sistem menggunakan pertanyaan default.

## 9.6 Explainable Smart Triage

**Tujuan:** Mengelompokkan tingkat urgensi awal tanpa memberikan diagnosis.

Komponen utama:

- Tingkat urgensi.

- Alasan dan faktor pemicu.

- Data yang belum diketahui.

- Risiko penularan awal.

- Tombol mencari dokter.

- Rule ID, timestamp, dan versi engine.

Data/Input:

| **Kategori**        | **Arti**                                               |
|---------------------|--------------------------------------------------------|
| Darurat             | Perlu segera menghubungi dokter atau layanan setempat. |
| Mendesak            | Perlu konsultasi dalam beberapa jam.                   |
| Perlu diperiksa     | Dapat dijadwalkan.                                     |
| Pemantauan          | Pantau dengan indikator yang ditentukan.               |
| Tidak dapat dinilai | Data belum cukup atau sistem gagal.                    |

Acceptance criteria:

- Hasil tidak menggunakan persentase diagnosis.

- Setiap hasil memiliki minimal satu alasan.

- Kasus darurat selalu menampilkan CTA dokter.

- Hasil dapat dibagikan ke dokter.

- Apabila data kurang, sistem tidak memaksakan hasil.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>Contoh rule yang ditampilkan:<br />
R-RESP-01: gangguan pernapasan berat<br />
R-MOB-02: tidak mampu berdiri<br />
R-HERD-01: lebih dari satu ternak terdampak</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 9.7 Risiko Penularan Awal

**Tujuan:** Memberikan peringatan konservatif apabila terdapat pola yang berpotensi melibatkan lebih dari satu ternak.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>LARANGAN ISTILAH</strong></p>
<p>Sistem tidak boleh menampilkan “wabah terdeteksi”, “positif PMK”, “penyakit pasti menular”, atau “kandang terinfeksi”. Gunakan bahasa indikasi dan kewaspadaan.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Komponen utama:

- Lebih dari satu ternak terdampak.

- Gejala serupa muncul dalam waktu berdekatan.

- Gangguan pernapasan atau demam pada beberapa ternak.

- Kondisi mulut/kaki pada beberapa ternak.

- Kematian mendadak.

- Riwayat masuknya ternak baru.

Data/Input:

| **Kategori**        | **Makna**                                        |
|---------------------|--------------------------------------------------|
| Rendah              | Sedikit indikator risiko.                        |
| Sedang              | Perlu kewaspadaan dan pemantauan.                |
| Tinggi              | Perlu isolasi konservatif dan konsultasi dokter. |
| Belum dapat dinilai | Data belum memadai.                              |

## 9.8 First Response Guidance

**Tujuan:** Memberikan tindakan konservatif yang aman sambil menunggu dokter.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>KNOWLEDGE BASE TERVERIFIKASI</strong></p>
<p>Semua langkah dan larangan harus dibuat bersama dokter, memiliki sumber, versi, dan tanggal review.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Komponen utama:

- Pisahkan ternak yang sakit apabila dapat dilakukan dengan aman.

- Batasi pergerakan ternak.

- Sediakan air bersih.

- Jaga area tetap teduh dan berventilasi.

- Catat perubahan kondisi.

- Siapkan foto dan informasi untuk dokter.

- Bersihkan peralatan sesuai panduan.

Acceptance criteria:

- Guidance selalu disertai disclaimer.

- Langkah berasal dari database, bukan teks improvisasi AI.

- Kasus darurat memiliki tombol menghubungi dokter.

- Guidance dapat ditandai selesai.

- Tidak terdapat rekomendasi dosis obat.

Contoh larangan:

- Jangan memberikan obat manusia.

- Jangan memberikan antibiotik tanpa arahan dokter.

- Jangan memaksa ternak berdiri atau berjalan.

- Jangan memindahkan ternak sakit ke pasar.

- Jangan mencampurkan ternak baru dengan ternak sakit.

## 9.9 Smart Veterinarian Matching

**Tujuan:** Menampilkan dokter yang paling sesuai dengan kebutuhan kasus.

Komponen utama:

- Nama dan foto.

- Keahlian spesies.

- Area layanan.

- Ketersediaan dan layanan kunjungan.

- Jarak dan estimasi waktu.

- Rating demo.

- Status data demo/terverifikasi.

Data/Input:

| **Faktor**                   | **Bobot Internal MVP** |
|------------------------------|------------------------|
| Ketersediaan                 | 35%                    |
| Keahlian sesuai ternak/kasus | 30%                    |
| Jarak                        | 20%                    |
| Estimasi waktu tiba          | 10%                    |
| Rating                       | 5%                     |

Acceptance criteria:

- Minimal tiga dokter muncul.

- Hasil dapat diurutkan.

- Pengguna dapat melihat alasan rekomendasi.

- Pengguna dapat memilih dokter.

- Sistem menyimpan dokter terpilih.

- Apabila tidak ada dokter, sistem menampilkan kontak layanan/Puskeswan demo.

## 9.10 Auto-Generated Vet Brief

**Tujuan:** Memberikan ringkasan terstruktur agar dokter dapat memahami kasus sebelum konsultasi.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>INTEGRITAS INFORMASI</strong></p>
<p>Ringkasan harus membedakan pernyataan peternak, hasil ekstraksi AI, hasil rule engine, dan catatan dokter. AI tidak boleh menambahkan gejala yang tidak dilaporkan.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Komponen utama:

- Identitas ternak.

- Jenis, umur, dan lokasi kandang.

- Waktu mulai gejala.

- Gejala utama dan jawaban pertanyaan lanjutan.

- Jumlah ternak terdampak.

- Tingkat urgensi dan risiko penularan awal.

- Tindakan yang sudah dilakukan.

- Foto terlampir dan catatan asli peternak.

Acceptance criteria:

- Ringkasan terbentuk dari data aktual.

- Catatan asli tetap tersedia.

- Foto dapat dibuka.

- Dokter dapat melihat lokasi.

- Ringkasan tidak menyebut diagnosis.

- Pengguna dapat memperbaiki data sebelum dikirim.

## 9.11 Konsultasi dan Status Kasus

**Tujuan:** Menyediakan satu tempat untuk mengetahui perkembangan penanganan.

Komponen utama:

- Dokter terpilih.

- Waktu dan lokasi kunjungan.

- Timeline status.

- Chat sederhana.

- Tombol kondisi memburuk.

- Catatan dokter.

- Tombol menutup kasus.

Acceptance criteria:

- Peternak dapat melihat status terbaru.

- Dokter dapat memperbarui status.

- Waktu setiap perubahan tercatat.

- Riwayat status tidak dapat dihapus oleh pengguna biasa.

- Tombol kondisi memburuk meningkatkan prioritas kasus.

- Chat diberi label sebagai komunikasi, bukan kanal darurat terjamin.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>Status kasus:<br />
Laporan dibuat -&gt; Analisis selesai -&gt; Dokter dipilih -&gt; Permintaan dikirim<br />
-&gt; Dokter menerima -&gt; Dokter menuju lokasi -&gt; Dokter tiba<br />
-&gt; Penanganan berlangsung -&gt; Pemantauan -&gt; Selesai / Dibatalkan</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 9.12 Akademi Ternak

**Tujuan:** Membantu peternak memperoleh pengetahuan preventif dan respons dasar.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>CONTEXT-AWARE LEARNING</strong></p>
<p>Modul direkomendasikan berdasarkan kasus: risiko penularan -&gt; biosecurity; masa pemulihan -&gt; pemantauan nafsu makan; pengguna baru -&gt; pemeriksaan harian.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Komponen utama:

- Penanganan awal.

- Mengenali gejala.

- Biosecurity.

- Perawatan harian.

- Nutrisi dan pakan.

- Pemulihan ternak.

Data/Input:

| **Konten**     | **Jumlah Minimum MVP** |
|----------------|------------------------|
| Video unggulan | 1                      |
| Artikel        | 3                      |
| Checklist      | 2                      |
| Kategori       | 4-6                    |
| Halaman detail | 1 template             |

Acceptance criteria:

- Pengguna dapat mencari modul.

- Pengguna dapat memfilter kategori.

- Minimal satu rekomendasi muncul setelah triase.

- Modul memiliki tombol “Laporkan Gejala”.

- Video memiliki ringkasan teks.

- Konten medis tidak dibuat bebas oleh AI.

# 10. Penjelasan Terkait AI

## 10.1 Prinsip Arsitektur AI

Veternak menggunakan arsitektur hybrid. Keputusan medis tidak diserahkan sepenuhnya kepada large language model.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>Input peternak<br />
v<br />
AI mengekstrak informasi<br />
v<br />
Validator schema<br />
v<br />
Rule engine menentukan urgensi<br />
v<br />
Knowledge base memilih guidance<br />
v<br />
AI menyusun penjelasan dan ringkasan<br />
v<br />
Dokter melakukan verifikasi</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 10.2 Pembagian Tanggung Jawab

| **Komponen**             | **Tugas**                                                         |
|--------------------------|-------------------------------------------------------------------|
| **Large language model** | Memahami teks, ekstraksi data, memilih pertanyaan, dan merangkum. |
| **Rule engine**          | Menentukan tingkat urgensi dan risk flag.                         |
| **Knowledge base**       | Menyediakan tindakan awal dan larangan.                           |
| **Database**             | Menyimpan data kasus.                                             |
| **Dokter hewan**         | Diagnosis, tindakan, resep, dan keputusan medis.                  |

## 10.3 Aktivitas AI yang Diperbolehkan

- Mengubah cerita menjadi field terstruktur.

- Mengidentifikasi informasi yang belum tersedia.

- Memilih pertanyaan dari question bank.

- Menyederhanakan bahasa.

- Membuat ringkasan kasus.

- Merekomendasikan modul edukasi.

- Menjelaskan rule yang terpicu.

- Mendeteksi inkonsistensi input.

## 10.4 Aktivitas AI yang Dilarang

- Mendiagnosis penyakit.

- Menentukan peluang penyakit dalam persen.

- Memberikan resep atau dosis.

- Mengklaim foto menunjukkan penyakit tertentu.

- Mengklaim dokter pasti tersedia.

- Menetapkan suatu area sebagai wabah.

- Menghapus atau mengubah catatan asli.

- Menggunakan data kasus untuk pelatihan tanpa persetujuan.

## 10.5 Struktur Hasil Ekstraksi

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>{<br />
"species": "cattle",<br />
"animal_id": "animal_001",<br />
"symptom_start": "2026-07-13T08:00:00+07:00",<br />
"reported_symptoms": [<br />
"decreased_appetite",<br />
"weakness",<br />
"rapid_breathing"<br />
],<br />
"can_stand": true,<br />
"can_drink": "unknown",<br />
"temperature_celsius": null,<br />
"affected_animals": 1,<br />
"other_animals_similar": "unknown",<br />
"farmer_original_note": "Sapi lemas, tidak mau makan dan napas cepat.",<br />
"missing_information": [<br />
"can_drink",<br />
"temperature_celsius",<br />
"other_animals_similar"<br />
]<br />
}</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 10.6 Struktur Hasil Triase

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>{<br />
"urgency": "urgent",<br />
"contagion_risk": "unknown",<br />
"requires_veterinarian": true,<br />
"triggered_rule_ids": [<br />
"R-RESP-02",<br />
"R-APP-01"<br />
],<br />
"reason_codes": [<br />
"rapid_breathing",<br />
"decreased_appetite"<br />
],<br />
"approved_guidance_ids": [<br />
"G-WATER-01",<br />
"G-OBSERVE-01"<br />
],<br />
"prohibited_action_ids": [<br />
"P-MED-01"<br />
],<br />
"engine_version": "triage-rules-0.1.0"<br />
}</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 10.7 Mengapa Rule Engine Diperlukan

LLM dapat menghasilkan jawaban berbeda untuk input yang mirip. Dalam konteks kesehatan ternak, tingkat urgensi perlu konsisten, dapat diaudit, dapat diuji, dapat direvisi dokter, dan tidak bergantung pada gaya bahasa model. Karena itu, AI hanya menstrukturkan data; keputusan kategori dilakukan oleh aturan deterministik.

## 10.8 Sumber dan Tata Kelola Aturan

> **1.** Disusun bersama dokter hewan.
>
> **2.** Memiliki sumber ilmiah atau pedoman.
>
> **3.** Diuji menggunakan skenario.
>
> **4.** Memiliki versioning.
>
> **5.** Mendapat persetujuan sebelum dipublikasikan.

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>LABEL PROTOTIPE</strong></p>
<p>Untuk hackathon, aturan dapat berupa simulasi, tetapi harus diberi label: “Prototipe — aturan belum digunakan untuk keputusan medis nyata.”</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 10.9 Prompt Policy untuk AI Agent Veternak

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>Anda adalah Veternak Triage Assistant.<br />
<br />
Tujuan Anda adalah membantu menstrukturkan laporan peternak,<br />
bukan mendiagnosis penyakit.<br />
<br />
Aturan:<br />
1. Jangan menyatakan diagnosis.<br />
2. Jangan memberikan resep, obat, atau dosis.<br />
3. Jangan menambahkan gejala yang tidak diberikan pengguna.<br />
4. Gunakan Bahasa Indonesia sederhana.<br />
5. Pilih pertanyaan hanya dari question bank yang tersedia.<br />
6. Keluarkan hasil sesuai JSON schema.<br />
7. Jika informasi tidak diketahui, gunakan null atau unknown.<br />
8. Jika terdapat indikasi kondisi serius, tandai untuk rule engine;<br />
jangan memberi keputusan medis sendiri.<br />
9. Pertahankan catatan asli pengguna.<br />
10. Arahkan keputusan medis kepada dokter hewan.</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 10.10 Penanganan Kegagalan AI

- Tampilkan pesan yang jelas.

- Jangan menampilkan hasil parsial sebagai keputusan.

- Gunakan form manual.

- Jalankan rule engine dari input pilihan pengguna.

- Simpan error tanpa data sensitif.

- Berikan tombol coba lagi.

- Peternak tetap dapat mencari dokter tanpa hasil AI.

## 10.11 Keamanan AI

- API key hanya berada di server.

- Input dibatasi panjangnya.

- File diperiksa tipe dan ukuran.

- Output harus lolos validasi schema.

- Prompt pengguna tidak boleh mengubah system policy.

- Catatan dokter tidak boleh dimodifikasi AI.

- Semua hasil AI memiliki timestamp dan model version.

- Log tidak menyimpan nomor telepon secara terbuka.

- Respons medis bebas harus diblokir.

Gemini API menyediakan structured output berbasis schema, sehingga hasil AI dapat divalidasi sebelum digunakan oleh aplikasi. Pendekatan ini cocok untuk ekstraksi data dan pembuatan ringkasan terstruktur. \[24\]

# 12. Tech Stack

## 12.1 Arsitektur Umum

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>Browser / Mobile Browser<br />
v<br />
Next.js Web Application<br />
v<br />
Server Actions / API Routes<br />
/ v \<br />
Supabase AI Service Rule Engine<br />
Database Gemini TypeScript<br />
Auth<br />
Storage<br />
Realtime</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 12.2 Frontend

| **Teknologi**          | **Fungsi**                |
|------------------------|---------------------------|
| **Next.js App Router** | Framework web full-stack. |
| **TypeScript**         | Type safety.              |
| **React**              | Antarmuka komponen.       |
| **Tailwind CSS**       | Styling.                  |
| **shadcn/ui**          | Komponen UI.              |
| **React Hook Form**    | Pengelolaan form.         |
| **Zod**                | Validasi schema.          |
| **Lucide Icons**       | Ikon.                     |
| **TanStack Query**     | Data fetching opsional.   |

Next.js App Router mendukung pengembangan aplikasi full-stack dengan layout, server/client components, data fetching, dan route handlers. \[22\]

## 12.3 Backend dan Database

| **Teknologi**                | **Fungsi**             |
|------------------------------|------------------------|
| **Supabase Postgres**        | Database.              |
| **Supabase Auth**            | Login dan role.        |
| **Supabase Storage**         | Foto ternak.           |
| **Supabase Realtime**        | Status kasus dan chat. |
| **Row Level Security**       | Pembatasan akses data. |
| **Edge Functions/API Route** | Proses server-side.    |

Supabase menyediakan Postgres, Authentication, Storage, Realtime, dan Row Level Security dalam satu platform, sehingga cocok untuk pengerjaan MVP dengan waktu terbatas. \[23\]

## 12.4 AI

| **Komponen**       | **Rekomendasi**                                                        |
|--------------------|------------------------------------------------------------------------|
| **Provider**       | Gemini API                                                             |
| **Model**          | Model Flash stabil terbaru, dikonfigurasi melalui environment variable |
| **Output**         | Structured JSON                                                        |
| **Validator**      | Zod                                                                    |
| **Fallback**       | Form dan rule engine manual                                            |
| **Prompt storage** | File versioned dalam repository                                        |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>AI_PROVIDER=gemini<br />
AI_MODEL=latest-stable-flash<br />
GEMINI_API_KEY=...</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Model tidak boleh ditulis permanen di banyak file. Gunakan satu konfigurasi agar dapat diganti tanpa mengubah business logic.

## 12.5 Rule Engine

Rule engine dibuat menggunakan TypeScript, JSON rule configuration, unit test, dan versioning. Rule tidak disimpan langsung di prompt AI.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>/src/domain/triage/<br />
rules/<br />
cattle-rules.json<br />
goat-rules.json<br />
engine.ts<br />
types.ts<br />
validators.ts<br />
tests/</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 12.6 Pemetaan Opsional

Apabila Peta Risiko dibuat sebagai stretch feature, gunakan Leaflet, React Leaflet, OpenStreetMap tiles, GeoJSON, dan lokasi agregat tingkat kecamatan. Leaflet merupakan library open-source untuk peta interaktif. \[25\]

## 12.7 Deployment

| **Komponen**    | **Platform**                |
|-----------------|-----------------------------|
| **Web app**     | Vercel                      |
| **Database**    | Supabase                    |
| **Storage**     | Supabase Storage            |
| **AI**          | Gemini API                  |
| **Source code** | GitHub                      |
| **Monitoring**  | Vercel Logs/Sentry opsional |
| **Analytics**   | PostHog opsional            |

## 12.8 Struktur Database

### Tabel \`users\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
role<br />
full_name<br />
phone<br />
email<br />
avatar_url<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`farms\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
owner_id<br />
name<br />
province<br />
regency<br />
district<br />
village<br />
latitude<br />
longitude<br />
location_precision<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`animals\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
farm_id<br />
name_or_code<br />
species<br />
breed<br />
sex<br />
birth_date<br />
estimated_age_months<br />
photo_url<br />
last_health_status<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`symptom_reports\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
animal_id<br />
reporter_id<br />
original_note<br />
symptom_started_at<br />
temperature<br />
affected_count<br />
location_id<br />
status<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`symptom_observations\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
report_id<br />
symptom_code<br />
value<br />
source<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`ai_followup_questions\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
report_id<br />
question_code<br />
question_text<br />
answer<br />
sequence<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`triage_results\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
report_id<br />
urgency<br />
contagion_risk<br />
triggered_rule_ids<br />
guidance_ids<br />
engine_version<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`veterinarians\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
user_id<br />
display_name<br />
species_expertise<br />
service_area<br />
is_available<br />
visit_enabled<br />
verification_status<br />
is_demo</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`case_assignments\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
report_id<br />
veterinarian_id<br />
match_score<br />
status<br />
estimated_arrival<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`case_updates\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
case_id<br />
status<br />
message<br />
actor_id<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`messages\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
case_id<br />
sender_id<br />
content<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`academy_modules\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
title<br />
slug<br />
category<br />
format<br />
thumbnail_url<br />
content_url<br />
summary<br />
reviewer_name<br />
source_url<br />
reviewed_at<br />
version<br />
published</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`module_recommendations\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
report_id<br />
module_id<br />
reason_code<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### Tabel \`audit_logs\`

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>id<br />
actor_id<br />
action<br />
entity_type<br />
entity_id<br />
metadata<br />
created_at</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Nilai source pada symptom_observations: farmer_form, farmer_text, ai_extracted, followup_answer, dan doctor_note.

## 12.9 Relasi Data

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><blockquote>
<p>User -&gt; Farm -&gt; Animal -&gt; Symptom Report -&gt; Triage Result<br />
v<br />
Case Assignment<br />
v<br />
Veterinarian + Case Updates<br />
<br />
Symptom Report -&gt; Module Recommendations -&gt; Academy Module</p>
</blockquote></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 12.10 Endpoint Utama

| **Method** | **Endpoint**                 | **Fungsi**               |
|------------|------------------------------|--------------------------|
| POST       | /api/reports                 | Membuat laporan.         |
| POST       | /api/ai/extract              | Ekstraksi gejala.        |
| POST       | /api/ai/followup             | Memilih pertanyaan.      |
| POST       | /api/triage                  | Menjalankan rule engine. |
| GET        | /api/veterinarians/match     | Matching dokter.         |
| POST       | /api/cases                   | Membuat kasus.           |
| PATCH      | /api/cases/:id/status        | Update status.           |
| POST       | /api/cases/:id/messages      | Mengirim pesan.          |
| GET        | /api/reports/:id/brief       | Ringkasan dokter.        |
| GET        | /api/academy/recommendations | Modul kontekstual.       |

## 12.11 Non-Functional Requirements

### Performa

- Halaman utama terbuka maksimal sekitar 3 detik pada jaringan normal.

- Foto dikompresi.

- Lazy loading pada video.

- Skeleton loading.

- Tidak memuat peta pada halaman utama.

### Keamanan

- Row Level Security aktif.

- Peternak hanya melihat datanya sendiri.

- Dokter hanya melihat kasus yang ditugaskan.

- API key tidak pernah dikirim ke browser.

- Lokasi tidak ditampilkan publik.

- File memiliki batas tipe dan ukuran.

### Accessibility

- Ikon selalu disertai teks.

- Kontras warna memadai.

- Tombol cukup besar.

- Form dapat digunakan dengan keyboard.

- Istilah medis diberi penjelasan.

- Bahasa dibuat singkat dan langsung.

### Reliability

- AI gagal tidak menghalangi pencarian dokter.

- Error tidak menghapus input.

- Draft laporan disimpan lokal.

- Status memiliki timestamp.

- Data demo dipisahkan dari data produksi.

## 12.12 Pembagian Pengerjaan Hackathon 30 Jam

| **Waktu**     | **Fokus**                                        |
|---------------|--------------------------------------------------|
| **Jam 0-2**   | Finalisasi scope, schema, dan pembagian tim.     |
| **Jam 2-6**   | Setup Next.js, Supabase, auth, dan UI system.    |
| **Jam 6-12**  | Beranda, profil ternak, dan form laporan.        |
| **Jam 12-17** | AI extraction, pertanyaan, dan rule engine.      |
| **Jam 17-21** | Triase, guidance, matching dokter.               |
| **Jam 21-24** | Ringkasan kasus dan status konsultasi.           |
| **Jam 24-26** | Akademi Ternak.                                  |
| **Jam 26-28** | Integrasi, testing, dan perbaikan.               |
| **Jam 28-30** | Seed data, demo script, pitch, dan backup video. |

## 12.13 Definition of Done MVP

- Pengguna dapat membuat atau memilih ternak.

- Laporan dapat disimpan.

- AI menghasilkan struktur data valid.

- Pertanyaan lanjutan dapat dijawab.

- Rule engine menghasilkan kategori.

- Hasil memiliki alasan.

- Guidance berasal dari database.

- Dokter dapat dipilih.

- Ringkasan kasus terbentuk.

- Status kasus dapat diperbarui.

- Akademi dapat dibuka.

- Tidak ada diagnosis atau resep otomatis.

- Alur demo berhasil tanpa mengedit database secara manual.

# 13. Referensi

**1. BPS — Populasi Sapi Potong menurut Provinsi, 2025.** [<u>https://www.bps.go.id/id/statistics-table/2/NDY5IzI%3D/populasi-sapi-potong-menurut-provinsi.html</u>](https://www.bps.go.id/id/statistics-table/2/NDY5IzI%3D/populasi-sapi-potong-menurut-provinsi.html)

**2. BPS — Populasi Kambing menurut Provinsi, 2025.** [<u>https://www.bps.go.id/id/statistics-table/2/NDcyIzI%3D/populasi-kambing-menurut-provinsi.html</u>](https://www.bps.go.id/id/statistics-table/2/NDcyIzI%3D/populasi-kambing-menurut-provinsi.html)

**3. Direktorat Jenderal PKH — Statistik Peternakan dan Kesehatan Hewan 2025.** [<u>https://ditjenpkh.pertanian.go.id/storage/master/file/DBAZgfzg_Buku_Statistik_2025_ISSN.pdf</u>](https://ditjenpkh.pertanian.go.id/storage/master/file/DBAZgfzg_Buku_Statistik_2025_ISSN.pdf)

**4. BPS — Peternakan Dalam Angka 2025.** [<u>https://www.bps.go.id/id/publication/2026/01/09/50771bc6f5761886458558ba/peternakan-dalam-angka-2025.html</u>](https://www.bps.go.id/id/publication/2026/01/09/50771bc6f5761886458558ba/peternakan-dalam-angka-2025.html)

**5. Kementerian Pertanian — Pasar Ternak Mulai Beroperasi Kembali, PMK Melandai, Februari 2025.** [<u>https://www.pertanian.go.id/?act=view&id=6614&show=news</u>](https://www.pertanian.go.id/?act=view&id=6614&show=news)

**6. Dinas Pertanian Sleman — Pengendalian PMK Awal Tahun 2025.** [<u>https://pertanian.slemankab.go.id/amankan-kebutuhan-ternak-pemkab-sleman-dan-kementan-lakukan-pengendalian-pmk-diawal-tahun-2025/</u>](https://pertanian.slemankab.go.id/amankan-kebutuhan-ternak-pemkab-sleman-dan-kementan-lakukan-pengendalian-pmk-diawal-tahun-2025/)

**7. WOAH — Foot and Mouth Disease.** [<u>https://www.woah.org/en/disease/foot-and-mouth-disease/</u>](https://www.woah.org/en/disease/foot-and-mouth-disease/)

**8. FAO — Kampanye Kesehatan Ternak dan Pelaporan Dini, Juni 2025.** [<u>https://www.fao.org/ectad/asiapacific/news-and-events/news/news-detail/news-roundup-1-to-15-june-2025/en</u>](https://www.fao.org/ectad/asiapacific/news-and-events/news/news-detail/news-roundup-1-to-15-june-2025/en)

**9. iSIKHNAS — Sistem Kesehatan Hewan Nasional Terpadu.** [<u>https://isikhnas.pertanian.go.id/</u>](https://isikhnas.pertanian.go.id/)

**10. Kementerian Pertanian — Pengawasan LSD dan Pelaporan Cepat melalui iSIKHNAS, Mei 2025.** [<u>https://bvetlampung.ditjenpkh.pertanian.go.id/berita/kementan-perketat-pengawasan-penyakit-lsd-jelang-idul-adha-siapkan-vaksin-di-tujuh-provinsi-prioritas</u>](https://bvetlampung.ditjenpkh.pertanian.go.id/berita/kementan-perketat-pengawasan-penyakit-lsd-jelang-idul-adha-siapkan-vaksin-di-tujuh-provinsi-prioritas)

**11. Jurnal Rekayasa Informasi Swadharma — Sistem Pakar Penyakit Kambing, Januari 2025.** [<u>https://ejurnal.swadharma.ac.id/index.php/jris/article/download/690/450</u>](https://ejurnal.swadharma.ac.id/index.php/jris/article/download/690/450)

**12. Universitas Airlangga — Pengalaman Pelayanan Puskeswan Keliling di Kebumen, Januari 2025.** [<u>https://unair.ac.id/post_fetcher/fakultas-kedokteran-hewan-magang-mandiri-di-kebumen-mengenal-dan-merawat-sapi-po-kebumen-bersama-puskeswan/</u>](https://unair.ac.id/post_fetcher/fakultas-kedokteran-hewan-magang-mandiri-di-kebumen-mengenal-dan-merawat-sapi-po-kebumen-bersama-puskeswan/)

**13. Kementerian Pertanian — Penguatan Profesi Dokter Hewan dan Puskeswan, 2026.** [<u>https://bpmsph.ditjenpkh.pertanian.go.id/berita/kementan-terima-audiensi-kvi-bahas-penguatan-profesi-dokter-hewan</u>](https://bpmsph.ditjenpkh.pertanian.go.id/berita/kementan-terima-audiensi-kvi-bahas-penguatan-profesi-dokter-hewan)

**14. Detik — Profil Masrukhi, Peternak Sapi Jombang, Mei 2025.** [<u>https://www.detik.com/jatim/berita/d-7937850/mengenal-pedrosa-sapi-kurban-presiden-prabowo-di-jombang</u>](https://www.detik.com/jatim/berita/d-7937850/mengenal-pedrosa-sapi-kurban-presiden-prabowo-di-jombang)

**15. Detik — Dampak PMK terhadap Harga Sapi dan Risiko Penularan, Januari 2025.** [<u>https://www.detik.com/jatim/bisnis/d-7738587/harga-sapi-di-pasar-hewan-kota-probolinggo-turun-30-dampak-wabah-pmk</u>](https://www.detik.com/jatim/bisnis/d-7738587/harga-sapi-di-pasar-hewan-kota-probolinggo-turun-30-dampak-wabah-pmk)

**16. Detik — Kasus PMK di Barru, Juni 2025.** [<u>https://www.detik.com/sulsel/berita/d-7944356/143-sapi-di-barru-terjangkit-pmk-jelang-idul-adha-2025</u>](https://www.detik.com/sulsel/berita/d-7944356/143-sapi-di-barru-terjangkit-pmk-jelang-idul-adha-2025)

**17. Komdigi — Penetrasi Internet Indonesia 2025.** [<u>https://www.komdigi.go.id/berita/siaran-pers/detail/menkomdigi-gen-z-dan-umkm-digital-jadi-motor-ekonomi-baru-indonesia</u>](https://www.komdigi.go.id/berita/siaran-pers/detail/menkomdigi-gen-z-dan-umkm-digital-jadi-motor-ekonomi-baru-indonesia)

**18. Komdigi — 60 Juta Warga Belum Terkoneksi Internet, Oktober 2025.** [<u>https://www.komdigi.go.id/berita/siaran-pers/detail/meutya-hafid-60-juta-warga-belum-terkoneksi-internet-pemerintah-akselerasi-konektivitas-desa</u>](https://www.komdigi.go.id/berita/siaran-pers/detail/meutya-hafid-60-juta-warga-belum-terkoneksi-internet-pemerintah-akselerasi-konektivitas-desa)

**19. BPS — Statistik Telekomunikasi Indonesia 2024, diterbitkan Agustus 2025.** [<u>https://www.bps.go.id/id/publication/2025/08/29/beaa2be400eda6ce6c636ef8/statistik-telekomunikasi-indonesia-2024.html</u>](https://www.bps.go.id/id/publication/2025/08/29/beaa2be400eda6ce6c636ef8/statistik-telekomunikasi-indonesia-2024.html)

**20. UU Nomor 41 Tahun 2014 tentang Peternakan dan Kesehatan Hewan.** [<u>https://peraturan.bpk.go.id/Home/Details/38801</u>](https://peraturan.bpk.go.id/Home/Details/38801)

**21. UU Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.** [<u>https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022</u>](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022)

**22. Next.js Documentation.** [<u>https://nextjs.org/docs</u>](https://nextjs.org/docs)

**23. Supabase Documentation.** [<u>https://supabase.com/docs</u>](https://supabase.com/docs)

**24. Gemini API — Structured Outputs.** [<u>https://ai.google.dev/gemini-api/docs/structured-output</u>](https://ai.google.dev/gemini-api/docs/structured-output)

**25. Leaflet — Interactive Maps.** [<u>https://leafletjs.com/</u>](https://leafletjs.com/)

<table>
<colgroup>
<col style="width: 2%" />
<col style="width: 97%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th><p><strong>PERNYATAAN PRODUK</strong></p>
<p>Veternak bukan alat diagnosis dan bukan pengganti dokter hewan. Veternak merupakan sistem pendukung respons, komunikasi, dokumentasi, dan edukasi untuk membantu peternak memperoleh penanganan profesional dengan lebih cepat dan terstruktur.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>
