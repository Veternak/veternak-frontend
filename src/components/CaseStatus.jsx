export default function CaseStatus() {
  const steps = [
    { title: "Laporan Dibuat", time: "14:20", desc: "Gejala lemas & nafsu makan turun dilaporkan.", status: "complete" },
    { title: "Analisis AI Selesai", time: "14:21", desc: "Tingkat urgensi: Mendesak.", status: "complete" },
    { title: "Dokter Menuju Lokasi", time: "15:05", desc: "drh. Oktavianus sedang dalam perjalanan.", status: "current" },
    { title: "Penanganan Medis", time: "--:--", desc: "Menunggu dokter tiba di lokasi.", status: "upcoming" },
    { title: "Selesai", time: "--:--", desc: "Laporan penanganan akan muncul di sini.", status: "upcoming" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
      
      {/* --- LEFT: THE TIMELINE --- */}
      <div className="lg:w-1/2 bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-brand-soft rounded-2xl flex items-center justify-center text-2xl shadow-sm">🐄</div>
          <div>
            <h2 className="text-xl font-bold text-primary-dark">Status: Si Putih</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Kasus #VT-8821</p>
          </div>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6">
              {/* The Line & Dot */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 ${
                  step.status === 'complete' ? "bg-brand-green border-brand-soft text-white" : 
                  step.status === 'current' ? "bg-white border-brand-lime text-brand-green animate-pulse" : 
                  "bg-white border-gray-100 text-gray-300"
                }`}>
                  {step.status === 'complete' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                </div>
                {i !== steps.length - 1 && <div className={`w-1 h-16 ${step.status === 'complete' ? "bg-brand-green" : "bg-gray-100"}`}></div>}
              </div>

              {/* The Content */}
              <div className="pb-8">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className={`font-bold ${step.status === 'upcoming' ? "text-gray-300" : "text-primary-dark"}`}>{step.title}</h4>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{step.time}</span>
                </div>
                <p className={`text-sm leading-relaxed ${step.status === 'upcoming' ? "text-gray-300" : "text-gray-500"}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RIGHT: CHAT WITH DOCTOR --- */}
      <div className="lg:w-1/2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-50 bg-neutral-bg flex items-center gap-4">
          <img src="https://i.pravatar.cc/150?u=okta" className="w-10 h-10 rounded-xl object-cover" alt="" />
          <div>
            <h4 className="font-bold text-primary-dark text-sm">drh. Oktavianus K. Rohi</h4>
            <p className="text-[10px] text-brand-green font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Online
            </p>
          </div>
        </div>

        {/* Chat Bubbles */}
        <div className="flex-grow p-6 space-y-4 overflow-y-auto">
          <div className="bg-gray-100 rounded-2xl rounded-bl-none p-4 max-w-[80%] text-sm text-gray-700">
            Halo Pak Masrukhi, saya sedang menuju lokasi bapak. Mohon siapkan air bersih dan pisahkan sapinya ya.
          </div>
          <div className="bg-brand-green text-white rounded-2xl rounded-br-none p-4 max-w-[80%] ml-auto text-sm">
            Baik dok, sudah saya pisahkan di kandang karantina. Sapinya masih terlihat sangat lemas.
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white border-t border-gray-50">
          <div className="flex gap-3 bg-neutral-bg p-2 rounded-2xl border border-gray-100">
            <input type="text" placeholder="Tulis pesan..." className="flex-grow bg-transparent px-4 py-2 outline-none text-sm" />
            <button className="bg-brand-green text-white p-2 px-4 rounded-xl font-bold text-sm">Kirim</button>
          </div>
        </div>
      </div>

    </div>
  );
}