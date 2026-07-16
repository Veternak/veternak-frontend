import { useState } from 'react'
import AnimalList from '../../components/AnimalList'
import CaseStatus from '../../components/CaseStatus'
import DashboardShell from '../../components/DashboardShell'

function DashboardHome({ setActiveTab }) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-brand-green p-6 text-white shadow-xl shadow-brand-green/10 md:p-8">
        <p className="text-sm font-bold text-brand-lime">Beranda Peternak</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
          Selamat datang kembali, Masrukhi
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-white/80">
          Pantau kondisi ternak, buat laporan kesehatan, dan lanjutkan konsultasi
          dari satu dashboard Veternak.
        </p>
        <button
          className="mt-8 rounded-2xl bg-brand-lime px-6 py-3 text-sm font-bold text-primary-dark shadow-lg shadow-brand-lime/20"
          onClick={() => setActiveTab('lapor')}
          type="button"
        >
          Buat Laporan Kondisi
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-500">Total Ternak</p>
          <p className="mt-3 text-3xl font-bold text-primary-dark">12</p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-500">Perlu Dipantau</p>
          <p className="mt-3 text-3xl font-bold text-primary-dark">2</p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-500">Kasus Aktif</p>
          <p className="mt-3 text-3xl font-bold text-primary-dark">1</p>
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

  const panels = {
    beranda: <DashboardHome setActiveTab={setActiveTab} />,
    ternak: <AnimalList />,
    lapor: (
      <PlaceholderPanel
        description="Alur laporan kondisi akan berisi pilihan ternak, catatan gejala, foto, dan penilaian awal."
        title="Buat Laporan Kondisi"
      />
    ),
    konsultasi: <CaseStatus />,
    akademi: (
      <PlaceholderPanel
        description="Materi edukasi peternakan dan kesehatan hewan akan tersedia untuk membantu perawatan harian."
        title="Akademi Ternak"
      />
    ),
  }

  return (
    <DashboardShell activeTab={activeTab} setActiveTab={setActiveTab}>
      {panels[activeTab]}
    </DashboardShell>
  )
}
