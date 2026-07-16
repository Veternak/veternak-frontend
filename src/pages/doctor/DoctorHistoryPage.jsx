import { useMemo, useState } from 'react'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { doctorDemoHistory } from '../../data/doctorDemoData'

export default function DoctorHistoryPage() {
  const [query, setQuery] = useState('')
  const [species, setSpecies] = useState('ALL')

  const history = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return doctorDemoHistory
      .filter((item) => species === 'ALL' || item.species === species)
      .filter((item) => {
        if (!normalizedQuery) return true
        return [item.farmerName, item.animalName, item.finalDiagnosis, item.locationLabel]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
  }, [query, species])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="rounded-[28px] border border-[#E7EFE4] bg-white p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
        <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
          Rekam kasus
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-primary-dark">Riwayat penanganan</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Kasus selesai menampilkan diagnosis final yang berasal dari dokter, bukan dari sistem AI.
        </p>
      </header>

      <section className="rounded-[24px] border border-[#E7EFE4] bg-white p-5 shadow-[0_16px_42px_rgba(19,59,38,0.09),0_2px_8px_rgba(19,59,38,0.04)]">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label>
            <span className="text-sm font-bold text-primary-dark">Cari riwayat</span>
            <input
              className="doctor-input"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari ternak, peternak, diagnosis final"
              value={query}
            />
          </label>
          <label>
            <span className="text-sm font-bold text-primary-dark">Spesies</span>
            <select
              className="doctor-select"
              onChange={(event) => setSpecies(event.target.value)}
              value={species}
            >
              <option value="ALL">Semua</option>
              <option value="Sapi">Sapi</option>
              <option value="Kerbau">Kerbau</option>
            </select>
          </label>
        </div>
      </section>

      <section className="grid gap-4">
        {history.length > 0 ? (
          history.map((item) => (
            <article className="rounded-[24px] border border-[#E7EFE4] bg-white p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)]" key={item.id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <DoctorStatusBadge status={item.status} />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-primary-dark">{item.animalName} · {item.species}</h2>
                  <p className="mt-2 text-sm text-gray-600">{item.farmerName} · {item.locationLabel}</p>
                  <p className="mt-4 text-sm font-bold text-brand-green">{item.finalDiagnosisSource}</p>
                  <p className="mt-2 rounded-2xl bg-neutral-bg p-4 leading-7 text-gray-700">{item.finalDiagnosis}</p>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{item.recommendation}</p>
                </div>
                <p className="rounded-full bg-neutral-bg px-3 py-1 text-sm font-bold text-gray-500">{item.completedAt}</p>
              </div>
            </article>
          ))
        ) : (
          <EmptyState
            description="Belum ada riwayat yang cocok dengan filter. Coba ubah kata kunci atau spesies."
            title="Belum ada riwayat"
          />
        )}
      </section>
    </div>
  )
}
