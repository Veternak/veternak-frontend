import { useState } from 'react'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { doctorDemoVisitRequests } from '../../data/doctorDemoData'

const visitStatuses = ['REQUESTED', 'APPROVED', 'REJECTED', 'EN_ROUTE', 'ARRIVED', 'COMPLETED', 'CANCELLED']
const visitStatusLabels = {
  REQUESTED: 'Diminta',
  APPROVED: 'Disetujui',
  REJECTED: 'Ditolak',
  EN_ROUTE: 'Menuju lokasi',
  ARRIVED: 'Tiba',
  COMPLETED: 'Selesai',
  CANCELLED: 'Dibatalkan',
}

export default function DoctorVisitsPage() {
  const [visits, setVisits] = useState(
    doctorDemoVisitRequests.map((visit) => ({
      ...visit,
      eta: '',
    })),
  )

  function updateVisit(id, patch) {
    setVisits((current) => current.map((visit) => (visit.id === id ? { ...visit, ...patch } : visit)))
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="rounded-[32px] border border-[#E7EFE4] bg-gradient-to-br from-white to-[#F8FCEF] p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
        <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
          Visit
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">Kunjungan lapangan</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Kelola request kunjungan dengan status, ETA, dan keputusan dokter sesuai area layanan.
        </p>
      </header>

      <section className="grid gap-4">
        {visits.length > 0 ? (
          visits.map((visit) => (
            <article className="rounded-[28px] border border-[#E7EFE4] bg-white p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)]" key={visit.id}>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <DoctorStatusBadge status={visit.status} />
                  </div>
                  <h2 className="mt-4 text-xl font-extrabold tracking-tight text-primary-dark">{visit.animalName}</h2>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div className="rounded-xl bg-neutral-bg px-4 py-3"><dt className="font-bold text-gray-500">Peternak</dt><dd>{visit.farmerName}</dd></div>
                    <div className="rounded-xl bg-neutral-bg px-4 py-3"><dt className="font-bold text-gray-500">Lokasi umum</dt><dd>{visit.locationLabel}</dd></div>
                    <div className="rounded-xl bg-neutral-bg px-4 py-3"><dt className="font-bold text-gray-500">Jadwal diminta</dt><dd>{visit.requestedSchedule}</dd></div>
                    <div className="rounded-xl bg-neutral-bg px-4 py-3"><dt className="font-bold text-gray-500">Area layanan</dt><dd>{visit.distanceLabel}</dd></div>
                  </dl>
                  <p className="mt-3 text-xs font-semibold text-gray-500">Update: {visit.updatedAt}</p>
                </div>

                <DoctorSectionCard title="Keputusan kunjungan">
                  <div className="grid gap-3 lg:w-72">
                    <label className="block">
                      <span className="text-sm font-bold text-primary-dark">ETA dokter</span>
                      <input
                        className="doctor-input"
                        onChange={(event) => updateVisit(visit.id, { eta: event.target.value })}
                        placeholder="Contoh: 45 menit"
                        value={visit.eta}
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-primary-dark">Status kunjungan</span>
                      <select
                        className="doctor-select"
                        onChange={(event) => updateVisit(visit.id, { status: event.target.value, updatedAt: 'Baru saja' })}
                        value={visit.status}
                      >
                        {visitStatuses.map((status) => (
                          <option key={status} value={status}>{visitStatusLabels[status]}</option>
                        ))}
                      </select>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="min-h-11 rounded-xl bg-brand-lime px-4 py-2 text-sm font-bold text-primary-dark" onClick={() => updateVisit(visit.id, { status: 'APPROVED', updatedAt: 'Baru saja' })} type="button">
                        Setujui
                      </button>
                      <button className="min-h-11 rounded-xl border border-[#F5C2C2] bg-white px-4 py-2 text-sm font-bold text-[#912525]" onClick={() => updateVisit(visit.id, { status: 'REJECTED', updatedAt: 'Baru saja' })} type="button">
                        Tolak
                      </button>
                    </div>
                  </div>
                </DoctorSectionCard>
              </div>
            </article>
          ))
        ) : (
          <EmptyState
            description="Belum ada request kunjungan lapangan untuk akun dokter ini."
            title="Tidak ada kunjungan"
          />
        )}
      </section>
    </div>
  )
}
