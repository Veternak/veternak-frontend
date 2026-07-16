import { useState } from "react";

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
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-dark mb-2">Screening Awal Penyakit Ternak</h2>
            <p className="text-gray-500 mb-10 text-sm md:text-base">Prototype untuk sapi, kerbau, kambing, dan domba. Hasil bukan diagnosis final.</p>

            {/* --- SECTION: DATA AWAL TERNAK --- */}
            <div className="mb-12">
              <h3 className="font-bold text-xl text-primary-dark border-b pb-2 mb-6">Data Awal Ternak</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Row 1 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Jenis Ternak</label>
                  <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white outline-none">
                    <option>Sapi</option>
                    <option>Kerbau</option>
                    <option>Kambing</option>
                    <option>Domba</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Umur Ternak (Bulan)</label>
                  <div className="flex h-12 border border-gray-200 rounded-xl overflow-hidden">
                    <button className="px-4 bg-gray-50 border-r border-gray-200">-</button>
                    <input type="number" className="w-full text-center outline-none" defaultValue="12" />
                    <button className="px-4 bg-gray-50 border-l border-gray-200">+</button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Sedang menghasilkan susu?</label>
                  <div className="flex gap-4 h-12 items-center">
                    {["Tidak", "Ya"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="milk" className="w-4 h-4 accent-brand-green" />
                        <span className="text-sm font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">ID / Nama Ternak (Opsional)</label>
                  <input type="text" placeholder="Contoh: Sapi_Bau" className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Status Ternak</label>
                  <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 outline-none">
                    <option>Sehat</option>
                    <option>Sakit</option>
                    <option>Baru Melahirkan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Baru melahirkan?</label>
                  <div className="flex gap-4 h-12 items-center">
                    {["Tidak", "Ya"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="birth" className="w-4 h-4 accent-brand-green" />
                        <span className="text-sm font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* --- SECTION: PERTANYAAN GEJALA --- */}
            <div className="mb-12">
              <h3 className="font-bold text-xl text-primary-dark border-b pb-2 mb-8">Pertanyaan Gejala</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {symptoms.map((s) => (
                  <div key={s.id} className="bg-gray-50/30 p-4 rounded-2xl border border-transparent hover:border-gray-100 transition-colors">
                    <p className="text-sm font-bold text-gray-800 mb-4">{s.label}</p>
                    <div className="flex gap-6">
                      {["Tidak", "Mungkin", "Ya"].map((val) => (
                        <label key={val} className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name={s.id} className="w-4 h-4 accent-brand-green" />
                          <span className="text-sm text-gray-600 group-hover:text-brand-green transition-colors">{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                window.scrollTo(0,0);
                setStep(2);
              }}
              className="w-full h-16 bg-brand-green text-white rounded-2xl font-bold text-xl shadow-lg shadow-brand-green/20 hover:brightness-110 active:scale-[0.99] transition-all"
            >
              Lihat Hasil Screening
            </button>
          </div>
        ) : (
          /* --- RESULT PAGE --- */
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
             {/* Result UI Code Here (as provided in previous step) */}
             <button onClick={() => setStep(1)} className="text-brand-green font-bold mb-6 flex items-center gap-2">← Kembali ke Form</button>
             <h2 className="font-serif text-3xl text-primary-dark mb-6">Hasil Screening</h2>
             {/* ... (Keep the Result UI from the previous code) */}
          </div>
        )}
      </div>
    </section>
  );
}