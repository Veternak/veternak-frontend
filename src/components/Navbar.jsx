import { Link } from 'react-router-dom'
import logo from '../assets/logo-full.png'

export default function Navbar({ anchorBase = '', onHome }) {
  const sectionHref = (hash) => `${anchorBase}${hash}`

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 py-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/82 px-4 shadow-[0_18px_48px_rgba(19,59,38,0.10)] backdrop-blur-xl md:h-18 md:px-6">
        {onHome ? (
          <button
            className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
            onClick={onHome}
            type="button"
          >
            <img alt="Veternak Logo" className="h-12 w-auto object-contain md:h-14" src={logo} />
          </button>
        ) : (
          <Link
            aria-label="Kembali ke beranda Veternak"
            className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
            to="/"
          >
            <img alt="Veternak Logo" className="h-12 w-auto object-contain md:h-14" src={logo} />
          </Link>
        )}

        <div className="hidden items-center gap-2 rounded-full bg-[#F4FAF1] p-1 md:flex">
          <a className="rounded-full px-4 py-2 text-sm font-extrabold text-primary-dark transition hover:bg-white hover:text-brand-green" href={sectionHref('#produk')}>Produk</a>
          <a className="rounded-full px-4 py-2 text-sm font-extrabold text-primary-dark transition hover:bg-white hover:text-brand-green" href={sectionHref('#akademi')}>Akademi</a>
          <a className="rounded-full px-4 py-2 text-sm font-extrabold text-primary-dark transition hover:bg-white hover:text-brand-green" href={sectionHref('#tentang')}>Tentang</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link className="rounded-full px-4 py-2 text-sm font-extrabold text-primary-dark transition hover:bg-brand-soft" to="/masuk">
            Masuk
          </Link>
          <Link
            className="rounded-full bg-brand-lime px-6 py-3 text-sm font-extrabold text-primary-dark shadow-[0_12px_24px_rgba(133,203,24,0.28)] transition hover:-translate-y-0.5 hover:bg-[#95DF2A]"
            to="/daftar"
          >
            Gabung Sekarang
          </Link>
        </div>

        <div className="flex items-center gap-2 text-sm font-extrabold md:hidden">
          <Link className="text-primary-dark" to="/masuk">
            Masuk
          </Link>
          <Link className="rounded-full bg-brand-lime px-4 py-2 text-primary-dark" to="/daftar">
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  )
}
