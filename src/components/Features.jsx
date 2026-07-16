export default function Features() {
  const features = [
    {
      title: "Laporan Terstruktur",
      desc: "Data kesehatan tersusun rapi untuk memudahkan diagnosa dokter dan riwayat kesehatan jangka panjang.",
      // Document Icon SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
      ),
      bgColor: "bg-lime-100",
      iconColor: "text-lime-700",
    },
    {
      title: "Triase Cepat",
      desc: "Sistem AI kami menganalisis gejala awal dalam hitungan detik untuk menentukan tingkat urgensi penanganan.",
      // Zap/Flash Icon SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      ),
      bgColor: "bg-brand-soft",
      iconColor: "text-brand-green",
    },
    {
      title: "Terhubung Dokter",
      desc: "Konsultasi langsung via chat dengan dokter hewan profesional kapanpun dibutuhkan.",
      // Message/Chat Icon SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ),
      bgColor: "bg-slate-100",
      iconColor: "text-slate-700",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-white relative z-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-6xl text-primary-dark mb-6">
            Kenapa Veternak?
          </h2>
          <p className="text-gray-500 md:text-xl max-w-2xl mx-auto">
            Solusi terintegrasi untuk manajemen kesehatan hewan ternak Anda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group p-10 rounded-[2.5rem] bg-[#F8FAF8] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${item.bgColor} ${item.iconColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-primary-dark mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}