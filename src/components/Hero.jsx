import heroBg from "../assets/hero-bg.png";
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-white">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src={heroBg} 
          className="w-full h-full object-cover object-bottom" 
          alt="Veternak Pastoral Background" 
        />
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="relative z-40 max-w-5xl mx-auto text-center px-4 mb-20">
        <div className="inline-flex items-center gap-2 bg-brand-soft/50 border border-brand-green/20 px-3 py-1 rounded-full text-xs font-bold text-brand-green mb-8">
          <span className="bg-brand-lime px-1.5 py-0.5 rounded text-[10px] text-primary-dark">BARU</span>
          AI Triage untuk Hewan Ternak →
        </div>

        <h1 className="font-serif text-5xl md:text-8xl text-primary-dark leading-[1.1] mb-8 tracking-tight">
          Tanggap Lebih Cepat,<br /> Ternak Lebih Sehat
        </h1>

        <p className="text-gray-600 md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Laporkan kondisi ternak secara instan, pahami tingkat urgensinya, 
          dan hubungkan dengan dokter hewan profesional dalam satu alur kerja cerdas.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
          {/* Main Action Button */}
          <Link
            to="/daftar"
            className="w-full md:w-auto bg-brand-green text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-green/90 transition-all shadow-xl shadow-brand-green/20 cursor-pointer"
          >
            Mulai sebagai Peternak
          </Link>

          {/* Secondary Button */}
          <a href="#produk" className="w-full md:w-auto bg-white border border-gray-200 text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all cursor-pointer">
            Lihat Cara Kerja
          </a>
        </div>
      </div>

      {/* Subtle fade at the top */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-10"></div>
    </section>
  );
}
