import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DoctorMetricCard from '../../components/doctor/DoctorMetricCard'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { getStoredDoctor, getVetDashboard } from '../../services/doctorAuthService'

export default function DoctorDashboardPage() {
  const doctor = getStoredDoctor() || {}
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getVetDashboard()
      .then((response) => {
        setStats(response?.data || response)
      })
      .catch(() => {
        setStats({
          rating: 4.8,
          completedConsultations: 0,
          completedVisits: 0,
          totalConsultations: 0,
          activeConsultations: 0,
          pendingConsultations: 0,
          totalVisits: 0,
          totalAnimalsTreated: 0,
        })
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="relative overflow-hidden rounded-[32px] border border-[#E7EFE4] bg-gradient-to-br from-white via-[#FBFDF6] to-[#EDF8DA] p-6 shadow-[0_26px_76px_rgba(19,59,38,0.14),0_4px_14px_rgba(19,59,38,0.05)] md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-lime/20 blur-2xl" />
        <div className="absolute -bottom-20 left-16 h-52 w-52 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
                Ruang kerja dokter
              </span>
              <DoctorStatusBadge status={doctor.isVerified ? 'VERIFIED' : 'PENDING'} />
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-primary-dark md:text-4xl">
              Prioritas hari ini, drh. {doctor.name || 'Dokter Hewan'}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Pantau antrean kasus masuk, konsultasi aktif, serta status kunjungan fisik lapangan secara langsung.
            </p>
          </div>
          <div className="rounded-[24px] border border-[#D8EDAC] bg-white/90 p-5 text-sm text-primary-dark shadow-sm backdrop-blur">
            <p className="font-bold">Status layanan</p>
            <p className="mt-2 text-lg font-extrabold text-brand-green">
              {doctor.availabilityStatus === 'AVAILABLE' || true ? 'Tersedia menerima kasus' : 'Tidak tersedia'}
            </p>
            <p className="mt-2 text-xs text-gray-600">Rating mitra: ★ {stats?.rating || doctor.rating || '4.8'}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DoctorMetricCard
          helper="Total konsultasi terdaftar"
          icon="clipboard"
          label="Total Kasus"
          value={isLoading ? '...' : stats?.totalConsultations ?? 0}
        />
        <DoctorMetricCard
          accent="emergency"
          helper="Konsultasi aktif saat ini"
          icon="alert"
          label="Kasus Aktif"
          value={isLoading ? '...' : stats?.activeConsultations ?? 0}
        />
        <DoctorMetricCard
          accent="warning"
          helper="Antrean kasus baru masuk"
          icon="clock"
          label="Antrean Baru"
          value={isLoading ? '...' : stats?.pendingConsultations ?? 0}
        />
        <DoctorMetricCard
          accent="success"
          helper="Total kunjungan kandang"
          icon="route"
          label="Total Kunjungan"
          value={isLoading ? '...' : stats?.totalVisits ?? 0}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <DoctorSectionCard
          action={
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-lime px-4 py-2 text-sm font-bold text-primary-dark shadow-sm transition hover:bg-[#78B916]"
              to="/dokter-app/kasus"
            >
              Lihat Kasus Masuk
            </Link>
          }
          description="Tinjau daftar antrean dan mulailah menangani kasus peternak terdekat."
          eyebrow="Aksi Cepat"
          title="Manajemen Kasus"
        >
          <div className="rounded-[22px] border border-[#E7EFE4] bg-white p-6 shadow-sm">
            <h3 className="font-extrabold text-primary-dark text-lg">Mulai Konsultasi</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Anda memiliki {stats?.pendingConsultations ?? 0} kasus baru di antrean. Silakan klik tombol di atas untuk membuka daftar kasus masuk, menyetujui jadwal konsultasi chat, atau melakukan kunjungan fisik.
            </p>
          </div>
        </DoctorSectionCard>

        <aside className="space-y-6">
          <DoctorSectionCard eyebrow="Statistik Kerja" title="Kinerja Klinik">
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-neutral-bg px-4 py-3 flex justify-between">
                <span className="font-bold text-gray-600">Total Hewan Ditangani</span>
                <span className="font-bold text-primary-dark">{stats?.totalAnimalsTreated ?? 0} ekor</span>
              </div>
              <div className="rounded-xl bg-neutral-bg px-4 py-3 flex justify-between">
                <span className="font-bold text-gray-600">Konsultasi Selesai</span>
                <span className="font-bold text-primary-dark">{stats?.completedConsultations ?? 0} sesi</span>
              </div>
              <div className="rounded-xl bg-neutral-bg px-4 py-3 flex justify-between">
                <span className="font-bold text-gray-600">Kunjungan Selesai</span>
                <span className="font-bold text-primary-dark">{stats?.completedVisits ?? 0} kali</span>
              </div>
            </div>
          </DoctorSectionCard>

          <DoctorSectionCard eyebrow="Informasi" title="Pemberitahuan Sistem">
            <ul className="space-y-3 text-xs leading-5 text-gray-600">
              <li className="rounded-xl bg-neutral-bg px-4 py-3">
                Dokumen STR dokter wajib diunggah dalam bentuk PDF terverifikasi.
              </li>
              <li className="rounded-xl bg-neutral-bg px-4 py-3">
                Gunakan fitur Geolokasi browser agar peternak terdekat dapat menemukan profil Anda di peta rujukan.
              </li>
            </ul>
          </DoctorSectionCard>
        </aside>
      </section>
    </div>
  )
}
