import { useMemo, useState } from 'react'
import IncomingCaseCard from '../../components/doctor/IncomingCaseCard'
import EmptyState from '../../components/shared/EmptyState'
import { doctorDemoCases } from '../../data/doctorDemoData'

const filters = [
  { label: 'Semua', value: 'ALL' },
  { label: 'Darurat', value: 'EMERGENCY' },
  { label: 'Mendesak', value: 'URGENT' },
  { label: 'Perlu diperiksa', value: 'NEEDS_EXAM' },
  { label: 'Pemantauan', value: 'MONITORING' },
]

const priorityOrder = {
  EMERGENCY: 1,
  URGENT: 2,
  NEEDS_EXAM: 3,
  MONITORING: 4,
}

export default function DoctorCasesPage() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('priority')

  const cases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return doctorDemoCases
      .filter((item) => activeFilter === 'ALL' || item.urgency === activeFilter)
      .filter((item) => {
        if (!normalizedQuery) return true
        return [item.farmerName, item.animalName, item.species, item.locationLabel, item.symptomSummary]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
      .sort((a, b) => {
        if (sortBy === 'priority') return priorityOrder[a.urgency] - priorityOrder[b.urgency]
        return a.reportedAt.localeCompare(b.reportedAt)
      })
  }, [activeFilter, query, sortBy])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="rounded-[28px] border border-[#E7EFE4] bg-gradient-to-br from-white to-[#F8FCEF] p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
        <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
          Case queue
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-primary-dark">Kasus masuk</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Antrean kasus dokter berdasarkan tingkat urgensi, waktu laporan, dan status penanganan.
        </p>
      </header>

      <section className="rounded-[24px] border border-[#E7EFE4] bg-white p-5 shadow-[0_16px_42px_rgba(19,59,38,0.09),0_2px_8px_rgba(19,59,38,0.04)]">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
          <label className="block">
            <span className="text-sm font-bold text-primary-dark">Cari kasus</span>
            <input
              className="doctor-input"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama ternak, peternak, lokasi, gejala"
              value={query}
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-primary-dark">Urutkan</span>
            <select
              className="doctor-select"
              onChange={(event) => setSortBy(event.target.value)}
              value={sortBy}
            >
              <option value="priority">Prioritas urgensi</option>
              <option value="time">Waktu laporan</option>
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              className={[
                'rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20',
                activeFilter === filter.value
                  ? 'bg-brand-green text-white'
                  : 'border border-standard-border bg-white text-primary-dark hover:bg-brand-soft',
              ].join(' ')}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        {cases.length > 0 ? (
          cases.map((item) => (
            <IncomingCaseCard item={item} key={item.id} />
          ))
        ) : (
          <EmptyState
            description="Coba ubah filter atau kata kunci pencarian untuk melihat kasus lain."
            title="Tidak ada kasus masuk"
          />
        )}
      </section>
    </div>
  )
}
