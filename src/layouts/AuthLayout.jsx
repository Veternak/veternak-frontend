import heroBg from '../assets/hero-bg.png'
import AuthCard from '../components/auth/AuthCard'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function AuthLayout({
  children,
  eyebrow,
  footer,
  infoPanel,
  subtitle,
  title,
  variant = 'login',
}) {
  const isRegister = variant === 'register'
  const isSplitRegister = isRegister && infoPanel

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#EFF8E3] text-main-text">
      <Navbar anchorBase="/" />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[45vh] h-[46vh] bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#EFF8E3] via-[#EFF8E3]/86 to-white/20" />

      <div className={[
        'relative z-10 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 pb-14 pt-28 md:pt-32',
        isSplitRegister ? 'md:grid-cols-[1fr_488px]' : 'place-items-center',
      ].join(' ')}>
        {isSplitRegister ? <div className="hidden md:block">{infoPanel}</div> : null}

        <div className={isSplitRegister ? 'w-full max-w-[488px]' : isRegister ? 'w-full max-w-[680px]' : 'w-full max-w-[520px]'}>
          <AuthCard>
            {eyebrow ? (
              <p className={[
                'text-sm font-extrabold uppercase tracking-[0.16em] text-brand-green',
                isSplitRegister ? '' : 'text-center',
              ].join(' ')}>{eyebrow}</p>
            ) : null}
            <h1 className={isRegister
              ? ['mt-2 text-2xl font-extrabold leading-tight tracking-tight text-primary-dark', isSplitRegister ? '' : 'text-center'].join(' ')
              : 'mt-2 text-center font-serif text-4xl font-bold leading-tight text-brand-green'}>
              {title}
            </h1>
            <p className={isRegister
              ? ['mt-2 text-sm leading-6 text-gray-600', isSplitRegister ? '' : 'mx-auto max-w-md text-center'].join(' ')
              : 'mx-auto mt-3 max-w-[320px] text-center text-sm leading-6 text-gray-600'}>
              {subtitle}
            </p>

            <div className="mt-7">{children}</div>
          </AuthCard>

          {footer ? (
            <div className="mt-6 text-center text-sm text-gray-600">{footer}</div>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  )
}
