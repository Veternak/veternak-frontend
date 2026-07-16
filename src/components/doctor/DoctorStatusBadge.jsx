const statusLabels = {
  NEW: 'Baru',
  IN_REVIEW: 'Ditinjau',
  WAITING_DOCTOR: 'Menunggu dokter',
  MONITORING: 'Pemantauan',
  IN_CONSULTATION: 'Konsultasi',
  RESOLVED: 'Selesai',
  REQUESTED: 'Diminta',
  APPROVED: 'Disetujui',
  REJECTED: 'Ditolak',
  REJECTED_WITH_REASON: 'Ditolak',
  EN_ROUTE: 'Menuju lokasi',
  ARRIVED: 'Tiba',
  COMPLETED: 'Selesai',
  CANCELLED: 'Dibatalkan',
  VERIFIED: 'Terverifikasi',
  PENDING_VERIFICATION: 'Menunggu verifikasi',
}

const statusStyles = {
  NEW: 'border-[#D8EDAC] bg-[#F8FCEF] text-brand-green',
  IN_REVIEW: 'border-[#BBD7F0] bg-[#EAF3FB] text-[#205580]',
  WAITING_DOCTOR: 'border-[#F4DE8A] bg-[#FFF7D6] text-[#725300]',
  MONITORING: 'border-[#BFE4DC] bg-[#E6F5F1] text-[#1F5C50]',
  IN_CONSULTATION: 'border-[#D8EDAC] bg-[#F8FCEF] text-brand-green',
  RESOLVED: 'border-[#C7E8D1] bg-[#E8F5EC] text-[#1D5937]',
  REQUESTED: 'border-[#F4DE8A] bg-[#FFF7D6] text-[#725300]',
  APPROVED: 'border-[#C7E8D1] bg-[#E8F5EC] text-[#1D5937]',
  REJECTED: 'border-[#F5C2C2] bg-[#FDEBEC] text-[#912525]',
  REJECTED_WITH_REASON: 'border-[#F5C2C2] bg-[#FDEBEC] text-[#912525]',
  EN_ROUTE: 'border-[#BBD7F0] bg-[#EAF3FB] text-[#205580]',
  ARRIVED: 'border-[#D8EDAC] bg-[#F8FCEF] text-brand-green',
  COMPLETED: 'border-[#C7E8D1] bg-[#E8F5EC] text-[#1D5937]',
  CANCELLED: 'border-standard-border bg-[#F1F3F5] text-gray-700',
  VERIFIED: 'border-[#C7E8D1] bg-[#E8F5EC] text-[#1D5937]',
  PENDING_VERIFICATION: 'border-[#F4DE8A] bg-[#FFF7D6] text-[#725300]',
}

const statusDots = {
  NEW: 'bg-brand-lime',
  IN_REVIEW: 'bg-[#2E74B5]',
  WAITING_DOCTOR: 'bg-[#D69B00]',
  MONITORING: 'bg-[#2E7D6B]',
  IN_CONSULTATION: 'bg-brand-green',
  RESOLVED: 'bg-[#2E7D4F]',
  REQUESTED: 'bg-[#D69B00]',
  APPROVED: 'bg-[#2E7D4F]',
  REJECTED: 'bg-[#D83A3A]',
  REJECTED_WITH_REASON: 'bg-[#D83A3A]',
  EN_ROUTE: 'bg-[#2E74B5]',
  ARRIVED: 'bg-brand-green',
  COMPLETED: 'bg-[#2E7D4F]',
  CANCELLED: 'bg-gray-500',
  VERIFIED: 'bg-[#2E7D4F]',
  PENDING_VERIFICATION: 'bg-[#D69B00]',
}

export default function DoctorStatusBadge({ status }) {
  return (
    <span className={[
      'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold',
      statusStyles[status] || 'border-standard-border bg-white text-primary-dark',
    ].join(' ')}>
      <span aria-hidden="true" className={['h-2 w-2 rounded-full', statusDots[status] || 'bg-brand-green'].join(' ')} />
      {statusLabels[status] || status}
    </span>
  )
}
