export default function EmptyState({
  action,
  description,
  title,
}) {
  return (
    <section className="rounded-[24px] border border-dashed border-standard-border bg-white p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-xl font-bold text-brand-green">
        i
      </div>
      <h2 className="mt-4 text-xl font-bold text-primary-dark">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  )
}
