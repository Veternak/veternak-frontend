import { Link } from 'react-router-dom'
import heroBg from '../assets/hero-bg.png'
import logoFull from '../assets/logo-full.png'
import AuthCard from '../components/auth/AuthCard'

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#EFF8E3] px-5 text-main-text">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[46vh] bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#EFF8E3] via-[#EFF8E3]/80 to-white/10" />

      <header className="relative z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between md:h-24">
        <Link
          aria-label="Kembali ke beranda Veternak"
          className="inline-flex w-fit items-center rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
          to="/"
        >
          <img
            alt="Veternak"
            className="h-14 w-auto object-contain md:h-20"
            src={logoFull}
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-bold text-primary-dark md:flex">
          <Link to="/#produk" className="transition-colors hover:text-brand-green">Produk</Link>
          <Link to="/#akademi" className="transition-colors hover:text-brand-green">Akademi</Link>
          <Link to="/#tentang" className="transition-colors hover:text-brand-green">Tentang</Link>
          <Link to="/masuk" className="transition-colors hover:text-brand-green">Masuk</Link>
          <Link
            className="rounded-full bg-brand-lime px-8 py-3 font-bold text-primary-dark shadow-md transition-all hover:scale-105 active:scale-95"
            to="/daftar"
          >
            Gabung Sekarang
          </Link>
        </nav>

        <div className="flex items-center gap-3 text-sm font-bold md:hidden">
          <Link to="/masuk" className="text-primary-dark">
            Masuk
          </Link>
          <Link
            className="rounded-full bg-brand-lime px-4 py-2 text-primary-dark"
            to="/daftar"
          >
            Daftar
          </Link>
        </div>
      </header>

      <div className={[
        'relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-6xl items-center gap-10 pb-14',
        isRegister ? 'md:grid-cols-[1fr_488px]' : 'place-items-center',
      ].join(' ')}>
        {isRegister && infoPanel ? <div className="hidden md:block">{infoPanel}</div> : null}

        <div className={isRegister ? 'w-full max-w-[488px]' : 'w-full max-w-[574px]'}>
          <AuthCard>
            {eyebrow ? (
              <p className="text-base font-medium text-brand-green">{eyebrow}</p>
            ) : null}
            <h1 className={isRegister
              ? 'mt-1 text-base font-normal leading-tight text-main-text'
              : 'mt-2 text-center font-serif text-4xl font-bold leading-tight text-brand-green'}>
              {title}
            </h1>
            <p className={isRegister
              ? 'text-base leading-6 text-gray-700'
              : 'mx-auto mt-3 max-w-[320px] text-center text-base leading-6 text-gray-600'}>
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>
          </AuthCard>

          {footer ? (
            <div className="mt-6 text-center text-sm text-gray-600">{footer}</div>
          ) : null}
        </div>
      </div>

      <footer className="relative z-10 pb-6 text-center text-xs text-gray-500">
        © 2024 Veternak Indonesia. Platform Kesehatan Hewan Ternak Berbasis Teknologi.
      </footer>
    </main>
  )
}
