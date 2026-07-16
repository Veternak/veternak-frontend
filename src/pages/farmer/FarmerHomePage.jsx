import { Link } from 'react-router-dom'

export default function FarmerHomePage() {
  return (
    <main className="min-h-screen bg-neutral-bg px-4 py-8 sm:py-10">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-standard-border bg-white p-6 shadow-sm sm:p-8">
        <div className="rounded-2xl bg-brand-soft p-5">
          <p className="text-sm font-bold text-brand-green">Beranda Peternak</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-primary-dark">
            Selamat datang di Veternak
          </h1>
          <p className="mt-3 leading-7 text-gray-700">
            Akun peternak sudah masuk ke area aplikasi. Dashboard lengkap akan
            dikembangkan pada fase berikutnya.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-standard-border p-4">
            <p className="text-sm font-bold text-primary-dark">Laporan kondisi</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Nantinya alur ini dipakai untuk memilih ternak, mencatat gejala,
              mengunggah foto, dan melihat penilaian awal.
            </p>
          </div>
          <div className="rounded-xl border border-standard-border p-4">
            <p className="text-sm font-bold text-primary-dark">Profil ternak</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Data kandang dan ternak akan muncul di sini setelah fitur profil
              dibuat.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/peternak/laporan/baru"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark"
          >
            Buat Laporan Kondisi
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-standard-border px-5 py-3 text-sm font-bold text-primary-dark"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </main>
  )
}
