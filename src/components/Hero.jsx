export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Pastoral Image Placeholder */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-soft to-white opacity-50"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-brand-green/20 px-3 py-1 rounded-full text-xs font-bold text-brand-green mb-6 shadow-sm">
          <span className="bg-brand-lime px-1.5 py-0.5 rounded text-[10px]">BARU</span>
          AI Triage untuk Hewan Ternak →
        </div>

        {/* Headline - Uses the Serif Font */}
        <h1 className="font-serif text-5xl md:text-7xl text-primary-dark leading-tight mb-6">
          Tanggap Lebih Cepat,<br /> Ternak Lebih Sehat
        </h1>

        {/* Subheadline */}
        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Laporkan gejala ternak Anda dalam hitungan detik. Dapatkan analisis instan 
          dan konsultasi langsung dengan dokter hewan ahli di seluruh Indonesia.
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="w-full md:w-auto bg-brand-green text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-green/90 transition shadow-lg shadow-brand-green/20">
            <span></span> Laporkan Gejala Sekarang
          </button>
          <button className="w-full md:w-auto bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <span>▶</span> Cara Kerja Veternak
          </button>
        </div>
      </div>

      {/* Decorative Illustration Area */}
      <div className="mt-16 max-w-5xl mx-auto">
        <img 
          src="/src/assets/hero.png" 
          alt="Pastoral Illustration" 
          className="w-full h-auto rounded-3xl"
        />
      </div>
    </section>
  )
}