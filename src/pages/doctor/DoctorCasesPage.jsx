import { useEffect, useMemo, useState } from 'react'
import IncomingCaseCard from '../../components/doctor/IncomingCaseCard'
import EmptyState from '../../components/shared/EmptyState'
import { getVetConsultations } from '../../services/doctorAuthService'

const filters = [
  { label: 'Semua', value: 'ALL' },
  { label: 'Darurat (High)', value: 'HIGH' },
  { label: 'Mendesak (Medium)', value: 'MEDIUM' },
  { label: 'Ringan (Low)', value: 'LOW' },
]

const priorityOrder = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
}

export default function DoctorCasesPage() {
  const [rawCases, setRawCases] = useState([])
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('priority')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    getVetConsultations()
      .then((response) => {
        if (!isMounted) return
        setRawCases(response?.data?.consultations || response || [])
        setError('')
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || 'Gagal memuat daftar kasus.')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const cases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return rawCases
      .map((c) => ({
        id: c.id,
        urgency: c.urgencyLevel,
        urgencyLabel: c.urgencyLevel === 'HIGH' ? 'Darurat' : c.urgencyLevel === 'MEDIUM' ? 'Mendesak' : 'Ringan',
        status: c.status,
        animalName: c.animal?.name || 'Ternak',
        species: c.animal?.species || 'Jenis Spesifik',
        farmerName: c.farmer?.name || 'Peternak',
        locationLabel: [c.farmer?.district, c.farmer?.regency].filter(Boolean).join(', ') || 'Lokasi',
        symptomSummary: c.aiDiagnosisSummary || 'Tidak ada ringkasan diagnosis AI.',
        reportedAt: new Date(c.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' }),
      }))
      .filter((item) => activeFilter === 'ALL' || item.urgency === activeFilter)
      .filter((item) => {
        if (!normalizedQuery) return true
        return [item.farmerName, item.animalName, item.species, item.locationLabel, item.symptomSummary]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
      .sort((a, b) => {
        if (sortBy === 'priority') return (priorityOrder[a.urgency] || 9) - (priorityOrder[b.urgency] || 9)
        return b.id - a.id
      })
  }, [rawCases, activeFilter, query, sortBy])

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
      <header className="rounded-[28px] border border-[#E7EFE4] bg-gradient-to-br from-white to-[#F8FCEF] p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
        <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
          Case queue
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-primary-dark">Kasus masuk</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Antrean kasus dokter berdasarkan tingkat urgensi, waktu laporan, dan status penanganan dari database Veternak.
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
              <option value="time">Kasus terbaru</option>
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

      {isLoading && (
        <p className="rounded-2xl bg-white p-8 text-center text-sm font-semibold text-gray-500 shadow-sm border border-gray-100">
          Memuat daftar kasus masuk dari database...
        </p>
      )}

      {!isLoading && error && (
        <p className="rounded-2xl bg-red-50 p-8 text-center text-sm font-semibold text-red-700 shadow-sm border border-red-100">
          {error}
        </p>
      )}

      {!isLoading && !error && (
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
      )}
    </div>
  )
}
