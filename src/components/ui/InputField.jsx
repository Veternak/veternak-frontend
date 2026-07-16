import FormError from './FormError'

export default function InputField({
  error,
  helperText,
  id,
  label,
  leftAddon,
  leftIcon,
  type = 'text',
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined
  const helperId = helperText ? `${id}-helper` : undefined

  return (
    <div>
      <label className="block text-sm font-bold text-primary-dark" htmlFor={id}>
        {label}
      </label>
      {leftIcon || leftAddon ? (
        <div className="relative">
          <input
            aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
            aria-invalid={Boolean(error)}
            className={[
            'mt-2 min-h-12 w-full rounded-2xl border bg-white/90 px-4 py-3 pl-12 text-sm font-semibold text-main-text shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition',
            'placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-green/15',
              error ? 'border-[#D92D20]' : 'border-[#DCE8D6]',
            ].join(' ')}
            id={id}
            type={type}
            {...props}
          />
          <div className="pointer-events-none absolute inset-y-0 left-4 mt-2 flex items-center text-gray-500">
            {leftIcon || <span className="text-sm font-medium">{leftAddon}</span>}
          </div>
        </div>
      ) : (
        <input
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(error)}
          className={[
            'mt-2 min-h-12 w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm font-semibold text-main-text shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition',
            'placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-green/15',
            error ? 'border-[#D92D20]' : 'border-[#DCE8D6]',
          ].join(' ')}
          id={id}
          type={type}
          {...props}
        />
      )}
      {helperText ? (
        <p className="mt-2 text-sm text-gray-500" id={helperId}>
          {helperText}
        </p>
      ) : null}
      <FormError id={errorId}>{error}</FormError>
    </div>
  )
}
