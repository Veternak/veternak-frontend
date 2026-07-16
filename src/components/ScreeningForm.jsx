import { useState } from "react";
import TriageResult from "./TriageResult";

export default function ScreeningForm() {
  const [step, setStep] = useState(1);
  
  const symptoms = [
    { id: "lemas", label: "Apakah ternak terlihat lemas?" },
    { id: "makan", label: "Apakah nafsu makan ternak menurun?" },
    { id: "susu_turun", label: "Apakah produksi susu menurun?" },
    { id: "batuk", label: "Apakah ternak batuk atau keluar ingus?" },
    { id: "napas", label: "Apakah ternak terlihat sesak napas?" },
    { id: "liur", label: "Apakah ternak mengeluarkan air liur berlebihan?" },
    { id: "luka", label: "Apakah ada luka di mulut?" },
    { id: "diare", label: "Apakah ternak diare?" },
    { id: "kembung", label: "Apakah perut ternak kembung?" },
    { id: "pincang", label: "Apakah ternak pincang atau sulit berdiri?" },
    { id: "bengkak", label: "Apakah ada bengkak, luka, atau benjolan di tubuh?" },
    { id: "mirip", label: "Apakah ada ternak lain yang sakit dengan gejala mirip?" },
  ];

  return (
    <section className="py-12 px-4 min-h-screen bg-neutral-bg">
      <div className="max-w-4xl mx-auto">
        
        {step === 1 ? (
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="font-serif text-3xl md:text-5xl text-primary-dark mb-4">Screening Awal Penyakit</h2>
            <p className="text-gray-500 mb-12">Lengkapi data untuk mendapatkan penilaian tingkat urgensi awal.</p>

            {/* --- DATA AWAL --- */}
            <div className="mb-16">
              <h3 className="font-bold text-xl text-primary-dark border-b pb-2 mb-8">1. Data Awal Ternak</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-3">Jenis Ternak</label>
                  <select className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-brand-green transition-all">
                    <option>Sapi</option><option>Kambing</option><option>Domba</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-3">Umur (Bulan)</label>
                  <input type="number" defaultValue="12" className="w-full h-14 px-4 rounded-2xl border border-gray-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-3">ID Ternak</label>
                  <input type="text" placeholder="Sapi_01" className="w-full h-14 px-4 rounded-2xl border border-gray-200" />
                </div>
              </div>
            </div>

            {/* --- GEJALA --- */}
            <div className="mb-16">
              <h3 className="font-bold text-xl text-primary-dark border-b pb-2 mb-10">2. Pertanyaan Gejala</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {symptoms.map((s) => (
                  <div key={s.id}>
                    <p className="text-sm font-bold text-gray-800 mb-4">{s.label}</p>
                    <div className="flex gap-6">
                      {["Tidak", "Mungkin", "Ya"].map((val) => (
                        <label key={val} className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name={s.id} className="w-5 h-5 accent-brand-green" />
                          <span className="text-sm text-gray-600 font-medium group-hover:text-brand-green">{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { window.scrollTo(0,0); setStep(2); }}
              className="w-full h-16 bg-brand-green text-white rounded-[1.5rem] font-bold text-xl shadow-lg shadow-brand-green/20 hover:brightness-110 active:scale-95 transition-all"
            >
              Lihat Hasil Screening
            </button>
          </div>
        ) : (
          /* --- THE RESULT PAGE --- */
          <div className="max-w-3xl mx-auto">
             <button 
               onClick={() => setStep(1)} 
               className="text-brand-green font-bold mb-8 flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
               Kembali ke Form
             </button>
             
             <TriageResult onConsult={() => alert("Menghubungi Dokter...")} />
          </div>
        )}
      </div>
    </section>
  );
}