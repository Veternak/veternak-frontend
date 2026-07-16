import { Link } from 'react-router-dom'
import logo from '../assets/logo-full.png'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#DDE8D5] bg-[#102A1B] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <Link aria-label="Veternak" className="inline-flex rounded-2xl bg-white px-3 py-2" to="/">
              <img alt="Veternak" className="h-10 w-auto object-contain" src={logo} />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
              Veternak membantu peternak membuat laporan kondisi ternak, memahami tingkat urgensi awal, dan terhubung dengan dokter hewan.
            </p>
            <p className="mt-4 max-w-md text-xs leading-6 text-white/55">
              Veternak mendukung penilaian awal dan konsultasi. Diagnosis final tetap berasal dari dokter hewan berwenang.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-lime">Navigasi</h2>
            <nav className="mt-5 grid gap-3 text-sm font-semibold text-white/72">
              <a className="transition hover:text-white" href="/#produk">Produk</a>
              <a className="transition hover:text-white" href="/#akademi">Akademi</a>
              <a className="transition hover:text-white" href="/#tentang">Tentang</a>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-lime">Akun</h2>
            <nav className="mt-5 grid gap-3 text-sm font-semibold text-white/72">
              <Link className="transition hover:text-white" to="/masuk">Masuk Peternak</Link>
              <Link className="transition hover:text-white" to="/daftar">Daftar Peternak</Link>
              <Link className="transition hover:text-white" to="/dokter/masuk">Masuk Dokter</Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/52 md:flex-row md:items-center md:justify-between">
          <p>© 2024 Veternak Indonesia. Platform Kesehatan Hewan Ternak Berbasis Teknologi.</p>
          <p>Privasi • Syarat Penggunaan • Bantuan</p>
        </div>
      </div>
    </footer>
  )
}
