import { Link } from 'react-router-dom'

export default function NewReportPlaceholderPage() {
  return (
    <main className="min-h-screen bg-neutral-bg px-4 py-8 sm:py-10">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-standard-border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-brand-green">Laporan Kondisi</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-primary-dark">
          Form laporan akan dibangun setelah auth selesai
        </h1>
        <p className="mt-3 leading-7 text-gray-600">
          Placeholder ini menjaga CTA beranda tetap menuju halaman yang jelas.
          Alur lengkap laporan kondisi akan dikerjakan pada fase berikutnya.
        </p>

        <Link
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark"
          to="/peternak/beranda"
        >
          Kembali ke Beranda Peternak
        </Link>
      </section>
    </main>
  )
}
