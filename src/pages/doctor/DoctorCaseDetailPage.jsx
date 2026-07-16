import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CasePriorityBadge from '../../components/doctor/CasePriorityBadge'
import ClinicalRecordForm from '../../components/doctor/ClinicalRecordForm'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { doctorDemoCases } from '../../data/doctorDemoData'

export default function DoctorCaseDetailPage() {
  const { id } = useParams()
  const item = doctorDemoCases.find((caseItem) => caseItem.id === id) || doctorDemoCases[0]
  const [decision, setDecision] = useState('')
  const [rejectReason, setRejectReason] = useState('')

  function rejectCase() {
    if (!rejectReason) return
    setDecision('rejected')
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="rounded-[32px] border border-[#E7EFE4] bg-gradient-to-br from-white via-white to-[#F8FCEF] p-6 shadow-[0_22px_58px_rgba(19,59,38,0.12),0_3px_10px_rgba(19,59,38,0.04)] md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <CasePriorityBadge label={item.urgencyLabel} urgency={item.urgency} />
              <DoctorStatusBadge status={decision === 'accepted' ? 'IN_CONSULTATION' : item.status} />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">{item.animalName}</h1>
            <p className="mt-2 text-gray-600">{item.farmerName} · {item.species} · {item.locationLabel}</p>
          </div>
          <p className="rounded-full bg-white px-3 py-1 text-sm font-bold text-gray-500 shadow-sm">{item.reportedAt}</p>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-6">
          <DoctorSectionCard description={item.safetyNote} eyebrow={item.aiSummaryLabel} title="Ringkasan laporan">
            <p className="rounded-2xl bg-neutral-bg p-4 leading-7 text-gray-700">{item.symptomSummary}</p>
          </DoctorSectionCard>

          <DoctorSectionCard title="Catatan asli peternak">
            <p className="rounded-2xl border border-[#E7EFE4] bg-white p-4 leading-7 text-gray-700 shadow-[0_10px_24px_rgba(19,59,38,0.06)]">{item.originalNote}</p>
          </DoctorSectionCard>

          <DoctorSectionCard title="Lampiran foto">
            <div className="grid gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((photo) => (
                <div key={photo} className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-[#D8E7D2] bg-neutral-bg text-sm font-bold text-gray-500">
                  Foto laporan {photo}
                </div>
              ))}
            </div>
          </DoctorSectionCard>

          {decision === 'accepted' ? (
            <DoctorSectionCard description="Form ini hanya untuk hasil profesional dokter, bukan output sistem." title="Hasil profesional">
              <ClinicalRecordForm caseId={item.id} />
            </DoctorSectionCard>
          ) : null}
        </div>

        <aside className="space-y-6">
          <DoctorSectionCard title="Data ternak">
            <dl className="grid gap-3 text-sm">
              {[
                ['Nama', item.animalName],
                ['Spesies', item.species],
                ['Lokasi umum', item.locationLabel],
                ['Riwayat ringkas', 'Belum ada kasus berat dalam 30 hari terakhir.'],
              ].map(([label, value]) => (
                <div className="rounded-xl bg-neutral-bg px-4 py-3" key={label}>
                  <dt className="font-bold text-gray-500">{label}</dt>
                  <dd className="mt-1 text-primary-dark">{value}</dd>
                </div>
              ))}
            </dl>
          </DoctorSectionCard>

          <DoctorSectionCard title="Rule yang terpicu">
            <ul className="space-y-2">
              {item.triggeredRules.map((rule) => (
                <li className="rounded-xl bg-neutral-bg px-4 py-3 text-sm font-semibold text-primary-dark" key={rule}>
                  {rule}
                </li>
              ))}
            </ul>
          </DoctorSectionCard>

          <DoctorSectionCard description="Pilih keputusan setelah membaca ringkasan dan catatan peternak." title="Keputusan kasus">
            {decision === 'accepted' ? (
              <div className="space-y-3">
                <p className="rounded-2xl bg-[#E8F5EC] p-4 text-sm font-bold text-[#1D5937]">Kasus diterima. Status: konsultasi aktif.</p>
                <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark" to={`/dokter-app/konsultasi/${item.id}`}>
                  Masuk konsultasi
                </Link>
              </div>
            ) : decision === 'rejected' ? (
              <div className="space-y-3">
                <p className="rounded-2xl bg-[#FDEBEC] p-4 text-sm font-bold text-[#912525]">Kasus ditolak.</p>
                <p className="text-sm text-gray-600">Alasan: {rejectReason}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button className="min-h-12 w-full rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark" onClick={() => setDecision('accepted')} type="button">
                  Terima kasus
                </button>
                <label className="block">
                  <span className="text-sm font-bold text-primary-dark">Alasan tolak</span>
                  <select className="doctor-select" onChange={(event) => setRejectReason(event.target.value)} value={rejectReason}>
                    <option value="">Pilih alasan sebelum menolak</option>
                    <option value="Di luar area layanan">Di luar area layanan</option>
                    <option value="Sedang tidak tersedia">Sedang tidak tersedia</option>
                    <option value="Butuh rujukan layanan terdekat">Butuh rujukan layanan terdekat</option>
                  </select>
                </label>
                <button className="min-h-12 w-full rounded-xl border border-[#F5C2C2] bg-white px-5 py-3 text-sm font-bold text-[#912525] disabled:cursor-not-allowed disabled:opacity-50" disabled={!rejectReason} onClick={rejectCase} type="button">
                  Tolak kasus
                </button>
              </div>
            )}
          </DoctorSectionCard>
        </aside>
      </section>
    </div>
  )
}
