export default function Button({
  children,
  className = '',
  disabled = false,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const variants = {
    primary:
      'bg-brand-lime text-primary-dark shadow-[0_16px_30px_rgba(133,203,24,0.28)] hover:-translate-y-0.5 hover:bg-[#78B916] focus-visible:ring-brand-green/30',
    secondary:
      'border border-standard-border bg-white text-primary-dark hover:bg-neutral-bg focus-visible:ring-brand-green/20',
  }

  return (
    <button
      className={[
        'inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition-all',
        'focus-visible:outline-none focus-visible:ring-4',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      ].join(' ')}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
