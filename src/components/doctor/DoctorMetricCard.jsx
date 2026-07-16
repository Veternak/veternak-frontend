function MetricIcon({ name }) {
  const paths = {
    clipboard: (
      <>
        <path d="M8 5.5h8" />
        <path d="M9 3.5h6l1 2H8l1-2Z" />
        <path d="M7 5.5H6a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5a2 2 0 0 0-2-2h-1" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
      </>
    ),
    alert: (
      <>
        <path d="M12 7v5" />
        <path d="M12 16h.01" />
        <path d="M10.3 4.2 3.4 16.1A2 2 0 0 0 5.1 19h13.8a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0Z" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    route: (
      <>
        <path d="M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M8 16h4a4 4 0 0 0 0-8h4" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {paths[name] || paths.clipboard}
      </g>
    </svg>
  )
}

export default function DoctorMetricCard({
  accent = 'default',
  helper,
  icon = 'clipboard',
  label,
  value,
}) {
  const styles = {
    default: {
      card: 'border-[#E7EFE4] bg-white text-primary-dark',
      icon: 'bg-brand-soft text-brand-green',
    },
    emergency: {
      card: 'border-[#F8D9D9] bg-gradient-to-br from-white to-[#FDEBEC] text-[#912525]',
      icon: 'bg-[#FDEBEC] text-[#912525]',
    },
    warning: {
      card: 'border-[#F8EBC1] bg-gradient-to-br from-white to-[#FFF7D6] text-[#725300]',
      icon: 'bg-[#FFF7D6] text-[#725300]',
    },
    success: {
      card: 'border-[#D5ECE7] bg-gradient-to-br from-white to-[#E6F5F1] text-[#1F5C50]',
      icon: 'bg-[#E6F5F1] text-[#1F5C50]',
    },
  }
  const tone = styles[accent] || styles.default

  return (
    <article className={[
      'rounded-[26px] border p-5 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(19,59,38,0.14),0_4px_12px_rgba(19,59,38,0.06)]',
      tone.card,
    ].join(' ')}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-bold opacity-80">{label}</p>
        <span className={[
          'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
          tone.icon,
        ].join(' ')}>
          <MetricIcon name={icon} />
        </span>
      </div>
      <p className="mt-4 text-4xl font-extrabold tracking-tight tabular-nums">{value}</p>
      {helper ? <p className="mt-2 text-xs font-semibold opacity-75">{helper}</p> : null}
    </article>
  )
}
