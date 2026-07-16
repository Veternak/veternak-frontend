# TODO.md - Frontend Auth Peternak Veternak

Dokumen ini adalah rencana kerja step by step untuk membangun frontend halaman login dan register user peternak terlebih dahulu. Konteks utama sudah dibaca dari `PROJECT.MD`, dengan tambahan arahan visual dari `Veternak_Design_Guide_v1.0.md`.

## 1. Scope awal

Fokus fase ini:

- Halaman Masuk untuk peternak.
- Halaman Daftar akun dasar untuk peternak.
- Halaman Lupa Password untuk pemulihan akun.
- Navigasi dasar antar halaman publik dan auth.
- Validasi form di sisi frontend.
- Tampilan mobile-first sesuai karakter Veternak.
- Integrasi API masih boleh memakai mock/placeholder sampai backend tersedia.

Belum termasuk fase ini:

- Register dokter dengan STR.
- Login admin.
- OTP nyata, refresh token, dan session production.
- Profil kandang dan profil ternak saat register awal.
- Dashboard peternak penuh.
- Integrasi backend production.

## 2. Keputusan dan asumsi sementara

- Project tetap memakai React + Vite sesuai kondisi repository saat ini.
- Auth peternak memakai nomor HP sebagai field utama, sesuai `PROJECT.MD`.
- Karena metode auth masih keputusan terbuka, UI dibuat fleksibel untuk password sekarang dan mudah diganti/ditambah OTP nanti.
- Register awal membuat akun dasar plus lokasi administratif; profil kandang dan ternak dipindahkan ke onboarding setelah login.
- Route konseptual:
  - `/masuk`
  - `/daftar`
  - `/lupa-password`
  - `/peternak/beranda` sebagai target setelah auth berhasil.
- Copy UI memakai istilah aman, ramah, dan tidak menakutkan.
- Tidak ada klaim diagnosis AI pada halaman auth.

## 3. Checklist implementasi

### Step 1 - Review kondisi repo

- [x] Baca ulang `PROJECT.MD`, terutama bagian:
  - pengguna peternak;
  - information architecture;
  - arsitektur frontend Vite;
  - design system;
  - security dan privacy;
  - keputusan terbuka auth.
- [x] Baca bagian auth di `Veternak_Design_Guide_v1.0.md`, terutama:
  - login single column max width 440 px;
  - logo dan welcome message;
  - email atau nomor telepon;
  - password;
  - CTA masuk;
  - label data demo bila memakai akun simulasi.
- [x] Cek struktur `src/` saat ini sebelum mengubah file.
- [x] Pastikan perubahan tidak menimpa pekerjaan user yang belum di-commit.

### Step 2 - Siapkan routing dasar

- [x] Install dependency routing bila belum ada:

```bash
npm install react-router-dom
```

- [x] Buat struktur folder awal:

```text
src/
  app/
  components/
    auth/
    ui/
  layouts/
  pages/
    auth/
```

- [x] Buat konfigurasi router di `src/app/router.jsx`.
- [x] Update `src/App.jsx` agar memakai router.
- [x] Tambahkan route:
  - `/` untuk landing page yang sudah ada;
  - `/masuk` untuk login;
  - `/daftar` untuk register peternak;
  - fallback route sederhana untuk halaman tidak ditemukan.

Acceptance criteria:

- [x] Landing page tetap bisa dibuka.
- [x] `/masuk` dan `/daftar` bisa diakses langsung dari browser.
- [x] Tidak ada blank screen ketika route tidak dikenal.

### Step 3 - Siapkan token dan utility UI

- [x] Rapikan token warna di CSS global atau Tailwind config berdasarkan `PROJECT.MD`:
  - brand dark `#2F6B3C`;
  - CTA lime `#85CB18`;
  - soft green `#EFF8E3`;
  - app background `#F8FAF8`;
  - main text `#202722`;
  - standard border `#E5EAE6`.
- [x] Buat komponen UI kecil:
  - `Button`;
  - `InputField`;
  - `AuthCard` atau `AuthShell`;
  - `FormError`;
  - `PasswordInput` dengan show/hide password.
- [x] Pastikan input dan button punya tinggi nyaman untuk mobile, minimal sekitar 44 px.
- [x] Pastikan focus state terlihat jelas.

Acceptance criteria:

- [x] Komponen bisa dipakai ulang oleh login dan register.
- [x] Style konsisten dengan landing page.
- [x] Tidak ada UI card bertumpuk yang membuat layout terasa berat.

### Step 4 - Buat layout auth

- [x] Buat `AuthLayout.jsx` untuk membungkus halaman login/register.
- [x] Layout mobile-first:
  - background `#F8FAF8`;
  - konten center;
  - form max width 440 px;
  - logo Veternak di atas form;
  - copy pendek dan jelas.
- [x] Tambahkan link kembali ke landing page.
- [x] Tambahkan area bantuan kecil:
  - link "Belum punya akun?" di login;
  - link "Sudah punya akun?" di register.

Acceptance criteria:

- [x] Layout rapi pada viewport 360 px.
- [x] Form tidak melebar berlebihan di desktop.
- [x] Logo dan heading terlihat sebagai identitas Veternak.

### Step 5 - Buat halaman login peternak

- [x] Buat `src/pages/auth/LoginPage.jsx`.
- [x] Field minimum:
  - nomor HP atau email;
  - password.
- [x] Tambahkan validasi:
  - field wajib diisi;
  - nomor HP/email tidak boleh terlalu pendek;
  - password minimal 8 karakter.
- [x] Tambahkan CTA utama:
  - `Masuk`.
- [x] Tambahkan link:
  - `Lupa password?`;
  - `Daftar sebagai peternak`.
- [x] Tambahkan state:
  - idle;
  - loading;
  - error validasi;
  - error login;
  - success redirect placeholder.
- [x] Untuk sementara, buat handler submit mock yang:
  - mencegah submit kosong;
  - menampilkan loading singkat;
  - mengarahkan ke `/peternak/beranda` atau menampilkan pesan bila route belum dibuat.

Copy yang disarankan:

- Heading: `Masuk ke Veternak`
- Subcopy: `Pantau kondisi ternak dan lanjutkan laporan kesehatan dengan akun peternak Anda.`
- Label: `Nomor HP atau email`
- Label: `Password`
- CTA: `Masuk`

Acceptance criteria:

- [x] User bisa mengetik dan submit form.
- [x] Error muncul dekat field yang bermasalah.
- [x] Button disabled saat loading.
- [x] Tidak ada data password yang dicetak ke console.

### Step 5b - Buat halaman lupa password

- [x] Buat `src/pages/auth/ForgotPasswordPage.jsx`.
- [x] Tambahkan route `/lupa-password`.
- [x] Field minimum:
  - nomor telepon.
- [x] Tambahkan validasi:
  - nomor telepon wajib diisi;
  - nomor telepon tidak boleh terlalu pendek.
- [x] Tambahkan state:
  - idle;
  - loading;
  - error validasi;
  - error pemulihan demo;
  - success instruction.

Acceptance criteria:

- [x] Link `Lupa password?` dari login membuka halaman pemulihan.
- [x] User bisa submit nomor telepon.
- [x] Success state menjelaskan bahwa pengiriman OTP/link menunggu backend.

### Step 6 - Buat halaman register peternak

- [x] Buat `src/pages/auth/RegisterPage.jsx`.
- [x] Field minimum akun:
  - nama lengkap;
  - nomor HP;
  - provinsi;
  - kabupaten;
  - password;
  - konfirmasi password.
- [x] Profil kandang dan profil ternak tidak diminta pada register awal.
- [x] Opsi jenis ternak ditunda ke onboarding setelah login.
- [x] Tambahkan checkbox consent:
  - menyetujui syarat penggunaan dan kebijakan privasi;
  - memahami Veternak memberi penilaian awal dan konsultasi, bukan diagnosis otomatis.
- [x] Tambahkan validasi:
  - nama wajib;
  - nomor HP wajib;
  - password minimal 8 karakter;
  - konfirmasi password harus sama;
  - consent wajib dicentang.
- [x] Tambahkan CTA utama:
  - `Daftar sebagai Peternak`.
- [x] Untuk sementara, buat handler submit mock akun dasar sesuai endpoint konseptual `POST /api/v1/auth/register/farmer`.

Copy yang disarankan:

- Heading: `Daftar sebagai Peternak`
- Subcopy: `Buat akun peternak dulu. Profil kandang dan ternak bisa dilengkapi setelah Anda masuk.`
- CTA: `Daftar sebagai Peternak`

Acceptance criteria:

- [x] Password dan konfirmasi password divalidasi.
- [x] Consent harus dicentang sebelum submit.
- [x] Payload tidak menyimpan data yang tidak diminta.
- [x] UI tetap nyaman di layar kecil tanpa horizontal scroll.

### Step 7 - Tambahkan halaman placeholder setelah login

- [x] Buat placeholder ringan untuk `/peternak/beranda` bila dashboard belum ada.
- [x] Isi placeholder:
  - sapaan singkat;
  - CTA `Buat Laporan Kondisi`;
  - teks bahwa dashboard peternak akan dikembangkan di fase berikutnya.
- [x] Jangan membangun dashboard penuh di task ini.

Acceptance criteria:

- [x] Setelah login/register mock sukses, user tidak diarahkan ke route kosong.
- [x] Placeholder jelas sebagai halaman sementara.

### Step 8 - Siapkan service auth sementara

- [ ] Buat `src/services/authService.js`.
- [ ] Buat function:
  - `loginFarmer(payload)`;
  - `registerFarmer(payload)`;
  - `logout()`.
- [ ] Untuk sekarang, function boleh mock dengan `Promise`.
- [ ] Struktur payload mengikuti kontrak konseptual:
  - login: `POST /api/v1/auth/login`;
  - register: `POST /api/v1/auth/register/farmer`.
- [ ] Jangan menyimpan token production di localStorage sebelum strategi auth diputuskan.

Acceptance criteria:

- [ ] Page tidak berisi logic API mentah yang berulang.
- [ ] Nanti mudah diganti ke fetch/axios ketika backend siap.

### Step 9 - Hubungkan navbar landing page

- [x] Update tombol/link `Masuk` di navbar menuju `/masuk`.
- [x] Update CTA register atau mulai menuju `/daftar` atau flow yang disepakati.
- [x] Pastikan link tidak merusak landing page existing.

Acceptance criteria:

- [x] User bisa masuk ke halaman login dari landing page.
- [x] User bisa masuk ke halaman register dari CTA yang relevan.

### Step 10 - Accessibility dan responsive QA

- [ ] Cek heading semantik: satu H1 per halaman.
- [ ] Semua input punya label yang terhubung.
- [ ] Error message terbaca dan spesifik.
- [ ] Focus state terlihat saat navigasi keyboard.
- [ ] Button dan link bisa diakses dengan keyboard.
- [ ] Touch target minimal 44 px.
- [ ] Kontras teks memenuhi target WCAG AA.
- [ ] Test viewport:
  - 360 px mobile;
  - 768 px tablet;
  - 1280 px desktop.

Acceptance criteria:

- [ ] Tidak ada horizontal scroll pada 360 px.
- [ ] Form tetap mudah dibaca dan tidak saling menimpa.
- [ ] Error state tidak menggeser layout secara berlebihan.

### Step 11 - Validasi teknis

- [ ] Jalankan lint:

```bash
npm run lint
```

- [ ] Jalankan build:

```bash
npm run build
```

- [ ] Jalankan dev server untuk review manual:

```bash
npm run dev
```

- [ ] Buka halaman:
  - `/`;
  - `/masuk`;
  - `/daftar`;
  - `/peternak/beranda`.

Acceptance criteria:

- [ ] Lint tidak menghasilkan error baru.
- [ ] Build sukses.
- [ ] Tidak ada error console saat membuka login/register.

## 4. Definition of Done khusus auth frontend

- [ ] Login page dan register page tersedia sebagai route.
- [ ] UI mobile-first dan konsisten dengan design system Veternak.
- [ ] Field, label, error, loading, disabled, dan success state tersedia.
- [ ] Form tidak membocorkan password/token ke console atau URL.
- [ ] Copy aman dan tidak mengandung klaim diagnosis AI.
- [ ] Link antar login, register, landing, dan placeholder beranda berjalan.
- [ ] Kode auth service siap diganti dari mock ke API nyata.
- [ ] `npm run lint` dan `npm run build` lulus.

## 5. Catatan untuk task berikutnya

Setelah TODO ini selesai, prioritas frontend berikutnya adalah:

1. Auth state/provider dan protected route.
2. Onboarding peternak lebih lengkap.
3. Dashboard peternak mobile-first.
4. Profil ternak.
5. Multi-step laporan kondisi.
