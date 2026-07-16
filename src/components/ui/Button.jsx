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
      'bg-brand-lime text-primary-dark hover:bg-[#78B916] focus-visible:ring-brand-green/30',
    secondary:
      'border border-standard-border bg-white text-primary-dark hover:bg-neutral-bg focus-visible:ring-brand-green/20',
  }

  return (
    <button
      className={[
        'inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-all',
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
