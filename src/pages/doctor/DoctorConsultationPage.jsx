import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CasePriorityBadge from '../../components/doctor/CasePriorityBadge'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { doctorDemoCases, doctorDemoMessages } from '../../data/doctorDemoData'

export default function DoctorConsultationPage() {
  const { id } = useParams()
  const item = doctorDemoCases.find((caseItem) => caseItem.id === id) || doctorDemoCases[0]
  const messages = doctorDemoMessages[item.id] || []
  const [draft, setDraft] = useState('')

  return (
    <div className="mx-auto grid max-w-6xl gap-6 xl:grid-cols-[1.45fr_0.85fr]">
      <section className="rounded-[32px] border border-[#E7EFE4] bg-white p-5 shadow-[0_18px_48px_rgba(19,59,38,0.11),0_2px_8px_rgba(19,59,38,0.04)] md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <DoctorStatusBadge status="IN_CONSULTATION" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">Konsultasi {item.animalName}</h1>
            <p className="mt-2 text-sm text-gray-600">Pesan dokter dan peternak dibedakan lewat posisi, teks, dan warna surface.</p>
          </div>
          <CasePriorityBadge label={item.urgencyLabel} urgency={item.urgency} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#F4DE8A] bg-[#FFF7D6] p-4 text-sm leading-6 text-[#725300]">
          Chat bukan kanal darurat terjamin. Bila kondisi memburuk, arahkan peternak ke bantuan dokter atau layanan terdekat.
        </div>

        <div className="mt-6 space-y-4 rounded-[24px] bg-neutral-bg p-4">
          {messages.map((message) => {
            const isDoctor = message.senderRole === 'VETERINARIAN'
            const isSystem = message.senderRole === 'SYSTEM'

            return (
              <div
                className={[
                  'max-w-[88%] rounded-2xl p-4 text-sm leading-6 shadow-sm',
                  isDoctor ? 'ml-auto bg-brand-green text-white' : '',
                  isSystem ? 'mx-auto border border-standard-border bg-white text-primary-dark' : '',
                  !isDoctor && !isSystem ? 'bg-white text-primary-dark' : '',
                ].join(' ')}
                key={message.id}
              >
                <p className="font-bold">{message.senderName}</p>
                <p className="mt-1">{message.body}</p>
                <p className="mt-2 text-xs opacity-70">{message.sentAt}</p>
              </div>
            )
          })}
          {draft ? (
            <div className="ml-auto max-w-[88%] rounded-2xl bg-brand-green p-4 text-sm leading-6 text-white shadow-sm">
              <p className="font-bold">Draft pesan</p>
              <p className="mt-1">{draft}</p>
            </div>
          ) : null}
        </div>

        <form className="mt-5 flex flex-col gap-3 md:flex-row" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="chat-draft">Tulis pesan</label>
          <input
            className="doctor-input mt-0 flex-1"
            id="chat-draft"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Tulis pesan untuk peternak..."
            value={draft}
          />
          <button className="min-h-12 rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark shadow-sm" type="submit">
            Simpan draft
          </button>
        </form>
      </section>

      <aside className="space-y-6">
        <DoctorSectionCard title="Panel kasus">
          <p className="text-sm leading-6 text-gray-600">{item.symptomSummary}</p>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="rounded-xl bg-neutral-bg px-4 py-3"><dt className="font-bold text-gray-500">Peternak</dt><dd>{item.farmerName}</dd></div>
            <div className="rounded-xl bg-neutral-bg px-4 py-3"><dt className="font-bold text-gray-500">Lokasi umum</dt><dd>{item.locationLabel}</dd></div>
            <div className="rounded-xl bg-neutral-bg px-4 py-3"><dt className="font-bold text-gray-500">Status</dt><dd>Konsultasi aktif</dd></div>
          </dl>
        </DoctorSectionCard>

        <DoctorSectionCard title="Timeline">
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="rounded-xl bg-neutral-bg px-4 py-3">Laporan diterima · {item.reportedAt}</li>
            <li className="rounded-xl bg-neutral-bg px-4 py-3">Dokter menerima kasus · sekarang</li>
            <li className="rounded-xl bg-neutral-bg px-4 py-3">Konsultasi aktif · sekarang</li>
          </ol>
        </DoctorSectionCard>

        <div className="grid gap-3">
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark shadow-sm" to="/dokter-app/kunjungan">
            Kelola kunjungan
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-standard-border bg-white px-5 py-3 text-sm font-bold text-primary-dark" to={`/dokter-app/kasus/${item.id}`}>
            Isi hasil profesional
          </Link>
        </div>
      </aside>
    </div>
  )
}
