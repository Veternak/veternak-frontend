import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-neutral-bg px-4 py-10 flex items-center justify-center">
      <section className="w-full max-w-[440px] rounded-2xl border border-standard-border bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-bold text-brand-green">404</p>
        <h1 className="mt-4 text-3xl font-bold text-primary-dark">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Route ini belum tersedia di Veternak.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-brand-lime px-5 py-3 font-bold text-primary-dark"
        >
          Kembali ke Beranda
        </Link>
      </section>
    </main>
  )
}
