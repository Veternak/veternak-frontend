export default function TriageResult({ onConsult }) {
  const doctors = [
    { name: "drh. Oktavianus K. Rohi", expertise: "Spesialis Sapi & Kambing", distance: "2.4 km", status: "Tersedia", img: "https://i.pravatar.cc/150?u=okta" },
    { name: "drh. Siti Aminah", expertise: "Kesehatan Ruminansia", distance: "4.8 km", status: "Tersedia", img: "https://i.pravatar.cc/150?u=siti" }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* 1. URGENCY BANNER */}
      <div className="bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] p-8 text-center">
        <div className="inline-flex p-4 bg-orange-200 rounded-full text-orange-700 mb-4">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Hasil Penilaian Awal</h2>
        <h3 className="font-serif text-5xl text-primary-dark mb-4">Mendesak</h3>
        <p className="text-gray-700 max-w-md mx-auto leading-relaxed text-lg">
          Ditemukan indikasi <strong>gangguan pernapasan</strong>. Harap segera hubungi dokter hewan terdekat.
        </p>
      </div>

      {/* 2. ACTIONS */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
        <h4 className="font-bold text-2xl text-primary-dark mb-6 flex items-center gap-3">
          <svg className="text-brand-green" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Langkah Aman Segera
        </h4>
        <div className="grid gap-3">
          {[
            "Pisahkan ternak dari kelompok (Isolasi)",
            "Pastikan akses air bersih selalu tersedia",
            "Jangan berikan obat tanpa arahan dokter",
            "Batasi pergerakan ternak agar tidak stres"
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-neutral-bg rounded-2xl font-semibold text-gray-700 border border-transparent hover:border-gray-200 transition-colors">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm border border-gray-100 shadow-sm text-brand-green">{i+1}</span>
              {task}
            </div>
          ))}
        </div>
      </div>

      {/* 3. DOCTORS */}
      <div className="space-y-6">
        <h4 className="font-bold text-2xl text-primary-dark px-2">Rekomendasi Dokter</h4>
        <div className="grid gap-4">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-xl transition-all cursor-pointer group">
              <img src={doc.img} className="w-20 h-20 rounded-3xl object-cover shadow-md" alt="" />
              <div className="flex-grow">
                <h5 className="text-xl font-bold text-primary-dark group-hover:text-brand-green transition-colors">{doc.name}</h5>
                <p className="text-sm text-gray-500 mb-3 font-medium">{doc.expertise}</p>
                <div className="flex gap-3">
                   <span className="text-xs bg-brand-soft text-brand-green px-3 py-1.5 rounded-full font-bold flex items-center gap-2">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                     {doc.distance}
                   </span>
                </div>
              </div>
              <button onClick={onConsult} className="bg-brand-lime p-4 rounded-2xl text-primary-dark hover:scale-110 active:scale-95 transition-all shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}