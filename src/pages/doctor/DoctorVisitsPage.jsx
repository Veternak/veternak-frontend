import { useEffect, useState } from 'react'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { getVetConsultations, approveVisit, rejectVisit } from '../../services/doctorAuthService'

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
  const [visits, setVisits] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [etas, setEtas] = useState({})

  const loadVisits = () => {
    setIsLoading(true)
    setError('')
    getVetConsultations()
      .then((response) => {
        const consultations = response?.data?.consultations || response || []
        const fetchedVisits = consultations
          .filter((c) => c.visit !== null)
          .map((c) => ({
            id: c.visit.id,
            status: c.visit.status,
            eta: c.visit.eta,
            estimatedTime: c.visit.estimatedTime,
            notes: c.visit.notes,
            updatedAt: c.visit.updatedAt,
            consultation: c,
          }))
        setVisits(fetchedVisits)
        
        // Inisialisasi etas
        const initialEtas = {}
        fetchedVisits.forEach((v) => {
          initialEtas[v.id] = v.eta || ''
        })
        setEtas(initialEtas)
      })
      .catch((err) => {
        setError(err?.message || 'Gagal memuat daftar kunjungan.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    loadVisits()
  }, [])

  const handleApprove = async (id) => {
    const eta = etas[id] || '30 menit';
    try {
      await approveVisit(id, { eta });
      alert('Kunjungan lapangan disetujui!');
      loadVisits();
    } catch (err) {
      alert(err?.message || 'Gagal menyetujui kunjungan.');
    }
  }

  const handleReject = async (id) => {
    const confirmed = window.confirm('Tolak request kunjungan fisik ini?');
    if (!confirmed) return;
    try {
      await rejectVisit(id);
      alert('Kunjungan lapangan ditolak!');
      loadVisits();
    } catch (err) {
      alert(err?.message || 'Gagal menolak kunjungan.');
    }
  }

  const handleEtaChange = (id, value) => {
    setEtas((current) => ({ ...current, [id]: value }));
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
      <header className="rounded-[32px] border border-[#E7EFE4] bg-gradient-to-br from-white to-[#F8FCEF] p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
        <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
          Visit
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">Kunjungan lapangan</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Kelola request kunjungan fisik peternak, tentukan estimasi kedatangan (ETA), dan berikan keputusan status.
        </p>
      </header>

      {isLoading && (
        <p className="rounded-[28px] border border-gray-100 bg-white p-8 text-center text-sm font-semibold text-gray-500 shadow-sm">
          Memuat daftar kunjungan lapangan dari database...
        </p>
      )}

      {!isLoading && error && (
        <p className="rounded-[28px] border border-red-100 bg-red-50 p-8 text-center text-sm font-semibold text-red-700 shadow-sm">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <section className="grid gap-4">
          {visits.length > 0 ? (
            visits.map((visit) => {
              const animalName = visit.consultation?.animal?.name || 'Ternak';
              const farmerName = visit.consultation?.farmer?.name || 'Peternak';
              const district = visit.consultation?.farmer?.district;
              const regency = visit.consultation?.farmer?.regency;
              const locationLabel = [district, regency].filter(Boolean).join(', ') || 'Lokasi';
              const requestedSchedule = new Date(visit.estimatedTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
              
              return (
                <article className="rounded-[28px] border border-[#E7EFE4] bg-white p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)]" key={visit.id}>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-2">
                        <DoctorStatusBadge status={visit.status} />
                      </div>
                      <h2 className="mt-4 text-xl font-extrabold tracking-tight text-primary-dark">{animalName}</h2>
                      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <div className="rounded-xl bg-neutral-bg px-4 py-3">
                          <dt className="font-bold text-gray-500">Peternak</dt>
                          <dd className="mt-1 text-primary-dark">{farmerName}</dd>
                        </div>
                        <div className="rounded-xl bg-neutral-bg px-4 py-3">
                          <dt className="font-bold text-gray-500">Lokasi</dt>
                          <dd className="mt-1 text-primary-dark">{locationLabel}</dd>
                        </div>
                        <div className="rounded-xl bg-neutral-bg px-4 py-3">
                          <dt className="font-bold text-gray-500">Jadwal Diminta</dt>
                          <dd className="mt-1 text-primary-dark">{requestedSchedule}</dd>
                        </div>
                        <div className="rounded-xl bg-neutral-bg px-4 py-3">
                          <dt className="font-bold text-gray-500">Catatan Peternak</dt>
                          <dd className="mt-1 text-primary-dark truncate">{visit.notes || '-'}</dd>
                        </div>
                      </dl>
                      <p className="mt-3 text-xs font-semibold text-gray-500">
                        Update: {new Date(visit.updatedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                      </p>
                    </div>

                    <DoctorSectionCard title="Keputusan kunjungan">
                      <div className="grid gap-3 lg:w-72">
                        {visit.status === 'REQUESTED' ? (
                          <>
                            <label className="block">
                              <span className="text-sm font-bold text-primary-dark">ETA kedatangan dokter</span>
                              <input
                                className="doctor-input"
                                onChange={(e) => handleEtaChange(visit.id, e.target.value)}
                                placeholder="Contoh: 45 menit"
                                value={etas[visit.id] || ''}
                              />
                            </label>
                            <div className="grid grid-cols-2 gap-3 pt-2">
                              <button
                                className="min-h-11 rounded-xl bg-brand-lime px-4 py-2 text-sm font-bold text-primary-dark hover:bg-[#78B916] transition-colors"
                                onClick={() => handleApprove(visit.id)}
                                type="button"
                              >
                                Setujui
                              </button>
                              <button
                                className="min-h-11 rounded-xl border border-[#F5C2C2] bg-white px-4 py-2 text-sm font-bold text-[#912525] hover:bg-red-50 transition-colors"
                                onClick={() => handleReject(visit.id)}
                                type="button"
                              >
                                Tolak
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="rounded-xl bg-brand-soft p-4 border border-[#E7EFE4]">
                            <p className="text-xs font-bold uppercase text-[#8D978F]">Status & ETA Terdaftar</p>
                            <p className="mt-2 font-bold text-primary-dark">Status: {visitStatusLabels[visit.status] || visit.status}</p>
                            <p className="mt-1 font-bold text-brand-green">ETA: {visit.eta || 'Tidak dicantumkan'}</p>
                          </div>
                        )}
                      </div>
                    </DoctorSectionCard>
                  </div>
                </article>
              )
            })
          ) : (
            <EmptyState
              description="Belum ada request kunjungan lapangan untuk akun dokter ini."
              title="Tidak ada kunjungan"
            />
          )}
        </section>
      )}
    </div>
  )
}
