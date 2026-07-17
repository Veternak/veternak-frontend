import { useEffect, useState } from 'react'
import AnimalList from '../../components/AnimalList'
import CaseStatus from '../../components/CaseStatus'
import DashboardShell from '../../components/DashboardShell'
import { getFarmerDisplayName } from '../../services/farmerAuthService'
import { getFarmerDashboard } from '../../services/farmerCoreService'
import FarmerAcademyPage from './FarmerAcademyPage'

function DashboardHome({ setActiveTab, stats }) {
  const farmerName = getFarmerDisplayName()

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-brand-green p-6 text-white shadow-xl shadow-brand-green/10 md:p-8">
        <p className="text-sm font-bold text-brand-lime">Beranda Peternak</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
          Selamat datang kembali, {farmerName}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-white/80">
          Pantau kondisi ternak, buat laporan kesehatan, dan lanjutkan konsultasi
          dari satu dashboard Veternak.
        </p>
        <button
          className="mt-8 rounded-2xl bg-brand-lime px-6 py-3 text-sm font-bold text-primary-dark shadow-lg shadow-brand-lime/20 animate-pulse"
          onClick={() => setActiveTab('lapor')}
          type="button"
        >
          Buat Laporan Kondisi
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-500">Total Ternak</p>
          <p className="mt-3 text-3xl font-bold text-primary-dark">{stats?.totalAnimals ?? 0}</p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-500">Total Konsultasi</p>
          <p className="mt-3 text-3xl font-bold text-primary-dark">{stats?.totalConsultations ?? 0}</p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-500">Kasus Aktif</p>
          <p className="mt-3 text-3xl font-bold text-primary-dark">
            {Array.isArray(stats?.activeConsultations) ? stats.activeConsultations.length : 0}
          </p>
        </div>
      </section>
    </div>
  )
}

function PlaceholderPanel({ title, description }) {
  return (
    <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-10">
      <p className="text-sm font-bold text-brand-green">Segera Hadir</p>
      <h1 className="mt-3 text-3xl font-bold text-primary-dark">{title}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-gray-600">{description}</p>
    </section>
  )
}

export default function FarmerDashboardPage() {
  const [activeTab, setActiveTab] = useState('beranda')
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getFarmerDashboard()
      .then((response) => {
        setStats(response?.data || response);
      })
      .catch(() => {
        // Fallback jika gagal
        setStats({ totalAnimals: 0, totalConsultations: 0, activeConsultations: [] });
      });
  }, []);

  const panels = {
    beranda: <DashboardHome setActiveTab={setActiveTab} stats={stats} />,
    ternak: <AnimalList />,
    lapor: (
      <PlaceholderPanel
        description="Alur laporan kondisi akan berisi pilihan ternak, catatan gejala, foto, dan penilaian awal."
        title="Buat Laporan Kondisi"
      />
    ),
    konsultasi: <CaseStatus />,
    akademi: <FarmerAcademyPage />,
  }

  return (
    <DashboardShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {panels[activeTab]}
    </DashboardShell>
  )
}
