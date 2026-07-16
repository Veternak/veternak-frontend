import { Link, useLocation } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'

export default function DoctorVerificationPendingPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const isRejected = params.get('status') === 'rejected'
  const doctorName = location.state?.doctorName || 'Dokter Veternak'
  const strNumber = location.state?.strNumber || 'STR-Demo-2026-001'

  return (
    <AuthLayout
      eyebrow="Data Demo"
      footer={
        <>
          Ingin masuk dengan akun yang sudah terverifikasi?{' '}
          <Link className="font-bold text-brand-green hover:underline" to="/dokter/masuk">
            Masuk dokter
          </Link>
        </>
      }
      subtitle={
        isRejected
          ? 'Akun dokter belum dapat menerima kasus sampai data diperbaiki dan diverifikasi ulang.'
          : 'Akun dokter Anda belum dapat menerima kasus sampai proses verifikasi selesai.'
      }
      title={isRejected ? 'Verifikasi perlu diperbaiki' : 'Menunggu verifikasi'}
    >
      <section className="space-y-5">
        <div className={[
          'rounded-2xl border p-5',
          isRejected ? 'border-[#F5C2C2] bg-[#FDEBEC]' : 'border-[#D8EDAC] bg-[#F8FCEF]',
        ].join(' ')}>
          <p className="text-sm font-bold text-brand-green">Status akun</p>
          <p className="mt-2 text-xl font-bold text-primary-dark">
            {isRejected ? 'Perlu diperbaiki' : 'Menunggu verifikasi'}
          </p>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {isRejected
              ? `Data demo untuk ${doctorName} perlu diperbaiki. Alasan demo: dokumen STR belum terbaca jelas.`
              : `Data demo untuk ${doctorName} sudah diterima. Tim admin perlu meninjau dokumen sebelum akun tampil publik.`}
          </p>
        </div>

        <div className="rounded-2xl border border-standard-border bg-white/80 p-5">
          <p className="text-sm font-bold text-primary-dark">Nomor STR</p>
          <p className="mt-2 text-gray-700">{strNumber}</p>
          <p className="mt-3 text-sm text-gray-500">
            Estimasi proses pada demo: 1-2 hari kerja. Ini bukan janji verifikasi otomatis.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark" to="/">
            Kembali ke Beranda
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-standard-border bg-white px-5 py-3 text-sm font-bold text-primary-dark" to="/dokter/masuk">
            Masuk Dokter
          </Link>
        </div>
      </section>
    </AuthLayout>
  )
}
