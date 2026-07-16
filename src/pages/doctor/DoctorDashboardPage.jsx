import { Link } from 'react-router-dom'
import CasePriorityBadge from '../../components/doctor/CasePriorityBadge'
import DoctorMetricCard from '../../components/doctor/DoctorMetricCard'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { doctorDemoCases, doctorDemoProfile, doctorDemoVisitRequests } from '../../data/doctorDemoData'

const priorityCases = doctorDemoCases.slice(0, 3)
const emergencyCases = doctorDemoCases.filter((item) => item.urgency === 'EMERGENCY').length
const activeCases = doctorDemoCases.filter((item) => item.status !== 'MONITORING').length
const urgentCases = doctorDemoCases.filter((item) => item.urgency === 'URGENT').length

export default function DoctorDashboardPage() {
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
              <DoctorStatusBadge status={doctorDemoProfile.verificationStatus} />
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-primary-dark md:text-4xl">
              Prioritas hari ini, {doctorDemoProfile.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Mulai dari kasus darurat, lanjutkan konsultasi aktif, lalu cek request kunjungan dan aktivitas terbaru.
            </p>
          </div>
          <div className="rounded-[24px] border border-[#D8EDAC] bg-white/90 p-5 text-sm text-primary-dark shadow-sm backdrop-blur">
            <p className="font-bold">Status layanan</p>
            <p className="mt-2 text-lg font-extrabold text-brand-green">Tersedia menerima kasus</p>
            <p className="mt-2 text-xs text-gray-600">Update: {doctorDemoProfile.lastUpdated}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DoctorMetricCard helper="Antrean masuk hari ini" icon="clipboard" label="Kasus hari ini" value={doctorDemoCases.length} />
        <DoctorMetricCard accent="emergency" helper="Perlu ditinjau lebih dulu" icon="alert" label="Darurat" value={emergencyCases} />
        <DoctorMetricCard accent="warning" helper={`${urgentCases} mendesak`} icon="clock" label="Kasus aktif" value={activeCases} />
        <DoctorMetricCard accent="success" helper="Request perlu keputusan" icon="route" label="Kunjungan" value={doctorDemoVisitRequests.length} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <DoctorSectionCard
          action={
            <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-lime px-4 py-2 text-sm font-bold text-primary-dark shadow-sm transition hover:bg-[#78B916]" to="/dokter-app/kasus">
              Lihat Kasus Masuk
            </Link>
          }
          description="Ringkasan awal membantu prioritas, bukan diagnosis final."
          eyebrow="Prioritas klinis"
          title="Kasus prioritas"
        >
          <div className="grid gap-4">
            {priorityCases.map((item) => (
              <article key={item.id} className="rounded-[22px] border border-[#E7EFE4] bg-neutral-bg/80 p-4 shadow-[0_10px_24px_rgba(19,59,38,0.06)] transition hover:bg-white hover:shadow-[0_16px_34px_rgba(19,59,38,0.10)]">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <CasePriorityBadge label={item.urgencyLabel} urgency={item.urgency} />
                      <DoctorStatusBadge status={item.status} />
                    </div>
                    <h3 className="mt-3 font-extrabold tracking-tight text-primary-dark">
                      {item.animalName} · {item.farmerName}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.symptomSummary}</p>
                  </div>
                  <div className="shrink-0 text-sm font-semibold text-gray-500 md:text-right">
                    <p>{item.reportedAt}</p>
                    <Link className="mt-3 inline-flex text-sm font-bold text-brand-green hover:underline" to={`/dokter-app/kasus/${item.id}`}>
                      Detail →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </DoctorSectionCard>

        <aside className="space-y-6">
          <DoctorSectionCard eyebrow="Visit" title="Kunjungan hari ini">
            {doctorDemoVisitRequests.map((visit) => (
              <div key={visit.id} className="rounded-2xl border border-[#E7EFE4] bg-neutral-bg p-4 shadow-[0_10px_24px_rgba(19,59,38,0.06)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-primary-dark">{visit.animalName}</p>
                    <p className="mt-2 text-sm text-gray-600">{visit.requestedSchedule}</p>
                  </div>
                  <DoctorStatusBadge status={visit.status} />
                </div>
                <p className="mt-3 text-xs font-bold text-brand-green">{visit.distanceLabel}</p>
              </div>
            ))}
          </DoctorSectionCard>

          <DoctorSectionCard eyebrow="Timeline" title="Aktivitas terbaru">
            <ul className="space-y-3 text-sm leading-6 text-gray-600">
              <li className="rounded-xl bg-neutral-bg px-4 py-3">Case-001 masuk kategori Darurat.</li>
              <li className="rounded-xl bg-neutral-bg px-4 py-3">Request kunjungan menunggu keputusan.</li>
              <li className="rounded-xl bg-neutral-bg px-4 py-3">Status ketersediaan dokter: Tersedia.</li>
            </ul>
          </DoctorSectionCard>
        </aside>
      </section>
    </div>
  )
}
