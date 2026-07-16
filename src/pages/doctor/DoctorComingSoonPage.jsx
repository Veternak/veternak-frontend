import { Link } from 'react-router-dom'

export default function DoctorComingSoonPage({ title, description }) {
  return (
    <section className="mx-auto max-w-5xl rounded-[28px] border border-[#E7EFE4] bg-white p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
      <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-green">
        Segera hadir
      </span>
      <h1 className="mt-4 text-3xl font-bold text-primary-dark">{title}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-gray-600">{description}</p>
      <p className="mt-5 rounded-2xl bg-[#F8FCEF] p-4 text-sm leading-6 text-primary-dark">
        Halaman ini sudah masuk routing dokter dan akan diisi pada step implementasi berikutnya.
      </p>
      <Link
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark"
        to="/dokter-app/dashboard"
      >
        Kembali ke Dashboard
      </Link>
    </section>
  )
}
