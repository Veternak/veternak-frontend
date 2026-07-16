export default function DoctorSectionCard({
  action,
  children,
  description,
  eyebrow,
  title,
}) {
  return (
    <section className="rounded-[28px] border border-[#E7EFE4] bg-white/95 p-5 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] backdrop-blur md:p-6">
      {(title || action) ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            {eyebrow ? <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">{eyebrow}</p> : null}
            {title ? <h2 className="text-xl font-extrabold tracking-tight text-primary-dark">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className={title || action ? 'mt-5' : ''}>{children}</div>
    </section>
  )
}
