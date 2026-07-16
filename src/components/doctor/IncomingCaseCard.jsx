import { Link } from 'react-router-dom'
import CasePriorityBadge from './CasePriorityBadge'
import DoctorStatusBadge from './DoctorStatusBadge'

const urgencySurface = {
  EMERGENCY: 'bg-[#FFF8F8]',
  URGENT: 'bg-[#FFF9F4]',
  NEEDS_EXAM: 'bg-[#FFFCF0]',
  MONITORING: 'bg-white',
}

const urgencyRail = {
  EMERGENCY: 'bg-[#D83A3A]',
  URGENT: 'bg-[#E56A22]',
  NEEDS_EXAM: 'bg-[#D69B00]',
  MONITORING: 'bg-[#2E7D6B]',
}

export default function IncomingCaseCard({ item }) {
  return (
    <article className={[
      'relative overflow-hidden rounded-[26px] border border-[#E7EFE4] p-5 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_60px_rgba(19,59,38,0.14),0_4px_12px_rgba(19,59,38,0.06)]',
      urgencySurface[item.urgency] || 'bg-white',
    ].join(' ')}>
      <span className={[
        'absolute left-0 top-6 h-16 w-1 rounded-r-full',
        urgencyRail[item.urgency] || 'bg-brand-green',
      ].join(' ')} />
      <div className="flex flex-col gap-4 pl-2 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <CasePriorityBadge label={item.urgencyLabel} urgency={item.urgency} />
            <DoctorStatusBadge status={item.status} />
          </div>
          <h2 className="mt-4 text-lg font-extrabold tracking-tight text-primary-dark">
            {item.animalName} · {item.species}
          </h2>
          <p className="mt-1 text-sm font-semibold text-gray-600">{item.farmerName} · {item.locationLabel}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">{item.symptomSummary}</p>
        </div>
        <div className="shrink-0 text-left md:text-right">
          <p className="text-sm font-bold text-gray-500">{item.reportedAt}</p>
          <Link
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-lime px-4 py-2 text-sm font-bold text-primary-dark shadow-[0_10px_20px_rgba(147,222,37,0.25)] transition hover:-translate-y-0.5 hover:bg-[#78B916]"
            to={`/dokter-app/kasus/${item.id}`}
          >
            Lihat detail →
          </Link>
        </div>
      </div>
    </article>
  )
}
