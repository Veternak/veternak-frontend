const priorityStyles = {
  EMERGENCY: 'border-[#F5C2C2] bg-[#FDEBEC] text-[#912525] shadow-[0_0_0_3px_rgba(216,58,58,0.06)]',
  URGENT: 'border-[#FFD3B8] bg-[#FFF0E5] text-[#8A3A12]',
  NEEDS_EXAM: 'border-[#F4DE8A] bg-[#FFF7D6] text-[#725300]',
  MONITORING: 'border-[#BFE4DC] bg-[#E6F5F1] text-[#1F5C50]',
}

const priorityIcons = {
  EMERGENCY: '!',
  URGENT: 'i',
  NEEDS_EXAM: '•',
  MONITORING: '✓',
}

export default function CasePriorityBadge({ urgency, label }) {
  return (
    <span className={[
      'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold',
      priorityStyles[urgency] || 'border-standard-border bg-white text-gray-700',
    ].join(' ')}>
      <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/75 text-[10px] font-black leading-none">
        {priorityIcons[urgency] || '•'}
      </span>
      {label}
    </span>
  )
}
