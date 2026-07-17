import heroBg from '../assets/hero-bg.png'
import heroMid from '../assets/hero-mid.png' // Make sure this asset exists
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#F1FAEE] text-main-text flex flex-col">
      <Navbar anchorBase="/" />

      {/* --- IMPROVED FULL-SCREEN BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
        {/* Layer 1: Mid Hills */}
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-20"
          src={heroMid}
        />
        {/* Layer 2: Main Background (Cows) */}
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-15"
          src={heroBg}
        />
        
        {/* Gradients to keep the top clear and the bottom soft */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-[#D8EACD]/30" />
        
        {/* Tech-vibe Blur Accents */}
        <div className="absolute left-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-full bg-brand-lime/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-green/10 blur-[100px]" />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className={[
        'relative z-10 mx-auto grid flex-grow w-full max-w-6xl items-center gap-10 px-5 pb-20 pt-28 md:pt-32',
        isSplitRegister ? 'md:grid-cols-[1fr_488px]' : 'place-items-center',
      ].join(' ')}>
        
        {isSplitRegister ? (
          <div className="hidden md:block animate-in fade-in slide-in-from-left-8 duration-700">
            {infoPanel}
          </div>
        ) : null}

        <div className={[
          'w-full animate-in fade-in zoom-in-95 duration-500',
          isSplitRegister ? 'max-w-[488px]' : isRegister ? 'max-w-[680px]' : 'max-w-[520px]'
        ].join(' ')}>
          <AuthCard>
            {eyebrow ? (
              <p className={[
                'text-sm font-extrabold uppercase tracking-[0.16em] text-brand-green',
                isSplitRegister ? '' : 'text-center',
              ].join(' ')}>{eyebrow}</p>
            ) : null}
            
            <h1 className={isRegister
              ? ['mt-2 text-2xl font-extrabold leading-tight tracking-tight text-primary-dark', isSplitRegister ? '' : 'text-center'].join(' ')
              : 'mt-2 text-center font-serif text-4xl font-bold leading-tight text-primary-dark'}>
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
            <div className="mt-6 text-center text-sm text-gray-600 font-medium">
              {footer}
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  )
}