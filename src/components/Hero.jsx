import { Link } from 'react-router-dom'
import heroBg from '../assets/hero-bg.png'
import heroMid from '../assets/hero-mid.png'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F1FAEE] px-5 pb-20 pt-28 md:pt-32">
      <div className="absolute inset-0">
        <img
          alt=""
          aria-hidden="true"
          className="hero-bg-layer hero-bg-one h-full w-full object-cover object-bottom"
          src={heroMid}
        />
        <img
          alt=""
          aria-hidden="true"
          className="hero-bg-layer hero-bg-two absolute inset-0 h-full w-full object-cover object-bottom"
          src={heroBg}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FFF6]/62 via-[#EFF8E3]/28 to-[#D8EACD]/18" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/68 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#D9EBCF]/70 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/24 blur-3xl" />
        <div className="absolute left-[8%] top-[20%] h-56 w-56 rounded-full bg-brand-lime/16 blur-3xl" />
        <div className="absolute right-[10%] bottom-[18%] h-72 w-72 rounded-full bg-brand-green/12 blur-3xl" />
      </div>

      <div className="hero-content-enter relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D8EDAC] bg-white/78 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green shadow-[0_16px_38px_rgba(19,59,38,0.12)] backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-brand-lime" />
          Platform kesehatan ternak digital
        </div>

        <h1 className="mt-7 max-w-4xl font-serif text-4xl leading-[1.04] tracking-tight text-primary-dark drop-shadow-[0_10px_28px_rgba(255,255,255,0.72)] md:text-6xl lg:text-7xl">
          Respon Lebih Cepat, Ternak Lebih Sehat
        </h1>

        <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-[#425044] md:text-xl">
          Buat laporan kondisi ternak dalam alur yang rapi, dapatkan penilaian awal tingkat urgensi, lalu lanjutkan konsultasi dengan dokter hewan. Veternak membantu mempercepat keputusan tanpa menggantikan diagnosis profesional.
        </p>

        <div className="mt-9 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-brand-green px-8 py-4 text-base font-extrabold text-white shadow-[0_20px_42px_rgba(47,107,60,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#275A33]"
            to="/daftar"
          >
            Mulai sebagai Peternak
          </Link>
          <a
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#D8E7D2] bg-white/86 px-8 py-4 text-base font-extrabold text-primary-dark shadow-[0_16px_34px_rgba(19,59,38,0.12)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
            href="#produk"
          >
            Lihat cara kerja
          </a>
        </div>

      </div>
    </section>
  )
}
