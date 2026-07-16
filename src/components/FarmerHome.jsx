export default function FarmerHome({ onLapor }) {
  const stats = [
    { label: "Sehat", count: 10, color: "text-brand-green", bg: "bg-brand-soft" },
    { label: "Sakit", count: 1, color: "text-red-600", bg: "bg-red-50" },
    { label: "Pantau", count: 1, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header Greeting */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-brand-green uppercase tracking-widest mb-1">Putra Mandiri Farm</p>
          <h2 className="font-serif text-4xl text-primary-dark">Selamat Pagi,<br />Pak Masrukhi!</h2>
        </div>
        <div className="hidden md:block text-right text-xs text-gray-400 font-medium">
          <p>Sleman, Yogyakarta</p>
          <p>24°C • Cerah Berawan</p>
        </div>
      </div>

      {/* 2. Quick Action CTA (The Big Green Button) */}
      <div 
        onClick={onLapor}
        className="relative overflow-hidden bg-brand-green rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand-green/20 cursor-pointer group hover:scale-[1.01] transition-all"
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Ada kendala pada ternak?</h3>
          <p className="text-brand-soft/80 text-sm mb-6 max-w-xs">Laporkan gejala sekarang untuk mendapatkan screening AI dan bantuan dokter.</p>
          <button className="bg-brand-lime text-primary-dark px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
            Laporkan Gejala Sekarang 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
        {/* Decorative Cow Icon in background */}
        <div className="absolute -right-4 -bottom-4 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
           <svg width="160" height="160" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.5C22 12.5 20 10.5 16 10.5C12 10.5 10 12.5 10 12.5V15.5C10 15.5 12 17.5 16 17.5C20 17.5 22 15.5 22 15.5V12.5Z"/></svg>
        </div>
      </div>

      {/* 3. Health Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} p-6 rounded-[2rem] text-center border border-white/50 shadow-sm`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 4. Active Case Alert (Context-Aware) */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div className="flex-grow">
          <p className="text-[10px] font-bold text-orange-600 uppercase">Update Kasus #VT-8821</p>
          <h4 className="text-sm font-bold text-primary-dark">Dokter sedang menuju lokasi</h4>
        </div>
        <button className="text-brand-green text-xs font-bold px-4 py-2 bg-brand-soft rounded-lg">Lihat</button>
      </div>

      {/* 5. Recommended Academy (Editorial snippet) */}
      <div className="pt-4">
        <h4 className="text-lg font-bold text-primary-dark mb-4">Tips Untuk Anda</h4>
        <div className="bg-[#FBF9EE] rounded-[2.5rem] p-6 flex gap-6 items-center border border-[#EFE9D5]">
          <div className="flex-grow">
            <span className="text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded uppercase">Biosecurity</span>
            <h5 className="font-serif text-xl text-primary-dark mt-2 mb-2 leading-tight">Pentingnya Sanitasi Kandang Pasca Melahirkan</h5>
            <p className="text-xs text-gray-500">4 Menit Baca • Oleh drh. Siti</p>
          </div>
          <div className="w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden shrink-0">
             <img src="https://images.unsplash.com/photo-1594140733592-2374662df94d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}