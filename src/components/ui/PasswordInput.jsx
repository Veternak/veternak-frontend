import { useState } from 'react'
import FormError from './FormError'

export default function PasswordInput({ error, id, label, leftIcon, ...props }) {
  const [isVisible, setIsVisible] = useState(false)
  const errorId = error ? `${id}-error` : undefined

  return (
    <div>
      <label className="block text-sm font-bold text-primary-dark" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2">
        <input
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          className={[
            'min-h-12 w-full rounded-2xl border bg-white/90 px-4 py-3 pr-20 text-sm font-semibold text-main-text shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition',
            'placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-green/15',
            leftIcon ? 'pl-12' : '',
            error ? 'border-[#D92D20]' : 'border-[#DCE8D6]',
          ].join(' ')}
          id={id}
          type={isVisible ? 'text' : 'password'}
          {...props}
        />
        {leftIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-500">
            {leftIcon}
          </div>
        ) : null}
        <button
          className="absolute inset-y-1 right-1 rounded-xl px-3 text-xs font-extrabold text-brand-green transition hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
          type="button"
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? 'Sembunyi' : 'Lihat'}
        </button>
      </div>
      <FormError id={errorId}>{error}</FormError>
    </div>
  )
}
