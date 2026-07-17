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
  const isPaid = item.status !== 'PENDING';

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
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2 items-center">
            <CasePriorityBadge label={`Risiko: ${item.urgencyLabel}`} urgency={item.urgency} />
            <DoctorStatusBadge status={item.status} />
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${
              isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isPaid ? 'Sudah Bayar' : 'Belum Bayar'}
            </span>
          </div>
          
          <h2 className="mt-4 text-lg font-extrabold tracking-tight text-primary-dark">
            Hewan: {item.animalName} · {item.species}
          </h2>
          <p className="mt-1 text-sm font-semibold text-gray-600">Peternak: {item.farmerName} · {item.locationLabel}</p>
          <div className="mt-3 rounded-xl bg-gray-50/50 p-3 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gejala / Laporan AI</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-700 font-semibold">{item.symptomSummary}</p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2 items-start md:items-end">
          <p className="text-sm font-bold text-gray-500">{item.reportedAt}</p>
          <div className="flex gap-2 mt-2 w-full md:w-auto">
            <Link
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-lime px-4 py-2 text-xs font-bold text-primary-dark shadow-xs hover:bg-[#78B916] transition"
              to={`/dokter-app/kasus/${item.id}`}
            >
              Lihat detail
            </Link>

            {isPaid ? (
              <Link
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-green px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-green/90 transition"
                to={`/dokter-app/konsultasi/${item.id}`}
              >
                Buka Ruang Chat
              </Link>
            ) : (
              <button
                disabled
                title="Peternak belum menyelesaikan pembayaran untuk konsultasi ini"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-gray-100 px-4 py-2 text-xs font-bold text-gray-400 cursor-not-allowed border border-gray-200"
              >
                Chat Terkunci
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
