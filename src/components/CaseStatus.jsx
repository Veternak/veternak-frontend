import { useMemo, useState } from "react";

const doctors = [
  {
    id: "okta",
    name: "drh. Oktavianus K. Rohi",
    photo: "https://i.pravatar.cc/180?img=12",
    expertise: "Ruminansia dan kasus kambing",
    area: "Sleman Barat",
    distance: 2.4,
    eta: "25 menit",
    available: "Tersedia sekarang",
    mode: ["Chat", "Kunjungan"],
    species: ["Sapi", "Kambing"],
    visitFee: "Estimasi Rp85.000",
    nextSlot: "Hari ini, 15:30",
    reason: "Cocok untuk kasus lemas, napas berat, dan laporan dengan risiko penularan awal.",
  },
  {
    id: "siti",
    name: "drh. Siti Aminah",
    photo: "https://i.pravatar.cc/180?img=47",
    expertise: "Kesehatan sapi potong",
    area: "Mlati, Sleman",
    distance: 4.8,
    eta: "40 menit",
    available: "Bisa chat",
    mode: ["Chat"],
    species: ["Sapi"],
    visitFee: "Chat demo",
    nextSlot: "Hari ini, 16:00",
    reason: "Berpengalaman menangani penurunan nafsu makan dan pemantauan sapi potong.",
  },
  {
    id: "bima",
    name: "drh. Bima Prakoso",
    photo: "https://i.pravatar.cc/180?img=52",
    expertise: "Kunjungan lapangan dan biosecurity",
    area: "Gamping, Sleman",
    distance: 5.6,
    eta: "50 menit",
    available: "Kunjungan sore",
    mode: ["Kunjungan"],
    species: ["Sapi", "Kambing", "Domba"],
    visitFee: "Estimasi Rp95.000",
    nextSlot: "Hari ini, 17:15",
    reason: "Relevan bila ternak perlu dipisahkan dan kondisi kandang perlu ditinjau langsung.",
  },
  {
    id: "puskeswan",
    name: "Puskeswan Demo Sleman",
    photo: "https://i.pravatar.cc/180?img=68",
    expertise: "Layanan kesehatan hewan wilayah",
    area: "Kabupaten Sleman",
    distance: 6.1,
    eta: "60 menit",
    available: "Rujukan wilayah",
    mode: ["Rujukan", "Kunjungan"],
    species: ["Sapi", "Kerbau", "Kambing", "Domba"],
    visitFee: "Data demo",
    nextSlot: "Besok, 09:00",
    reason: "Fallback wilayah bila dokter pribadi belum tersedia atau kasus perlu rujukan.",
  },
];

const filters = ["Paling sesuai", "Terdekat", "Tersedia sekarang", "Kunjungan"];

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10.5h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="m20 6-11 11-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStatus() {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [consultMode, setConsultMode] = useState("Chat");

  const sortedDoctors = useMemo(() => {
    const list = [...doctors];
    if (selectedFilter === "Terdekat") return list.sort((a, b) => a.distance - b.distance);
    if (selectedFilter === "Tersedia sekarang") return list.sort((a, b) => Number(!a.available.includes("sekarang")) - Number(!b.available.includes("sekarang")));
    if (selectedFilter === "Kunjungan") return list.sort((a, b) => Number(!a.mode.includes("Kunjungan")) - Number(!b.mode.includes("Kunjungan")));
    return list;
  }, [selectedFilter]);

  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId) ?? doctors[0];

  return (
    <section className="mx-auto max-w-7xl pb-10">
      <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Konsultasi dokter hewan</p>
          <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">Pilih dokter di sekitar kandang Anda</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#69736C] md:text-base">
            Pilih dokter demo berdasarkan jarak, ketersediaan, spesies, dan jenis bantuan. Profil ini menggunakan data demo dan belum menunjukkan kemitraan nyata.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#D8EDAC] bg-brand-soft p-6">
          <div className="flex items-start gap-3">
            <span className="mt-1 text-brand-green"><PinIcon /></span>
            <div>
              <p className="text-sm font-bold text-primary-dark">Lokasi kandang</p>
              <p className="mt-1 text-sm leading-relaxed text-[#527C4D]">Putra Mandiri Farm, Sleman Barat</p>
              <p className="mt-3 text-xs font-semibold text-[#527C4D]">Jarak dihitung sebagai simulasi untuk demo MVP.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold ${
                  selectedFilter === filter
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-[#D4DCD6] bg-white text-[#505B53]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {sortedDoctors.map((doctor) => {
              const selected = selectedDoctorId === doctor.id;
              return (
                <button
                  key={doctor.id}
                  type="button"
                  onClick={() => {
                    setSelectedDoctorId(doctor.id);
                    setConsultMode(doctor.mode.includes("Chat") ? "Chat" : doctor.mode[0]);
                  }}
                  className={`rounded-[2rem] border p-4 text-left transition-all md:p-5 ${
                    selected ? "border-brand-green bg-brand-soft" : "border-[#E5EAE6] bg-white hover:border-[#B7DC72]"
                  }`}
                >
                  <div className="flex gap-4">
                    <img src={doctor.photo} alt={`Foto demo ${doctor.name}`} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="mb-2 inline-flex rounded-full bg-[#FFF7D6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#725300]">Data Demo</span>
                          <h2 className="text-lg font-bold text-primary-dark">{doctor.name}</h2>
                          <p className="mt-1 text-sm text-[#69736C]">{doctor.expertise}</p>
                        </div>
                        {selected && <span className="text-brand-green"><CheckIcon /></span>}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#505B53]">
                        <span className="rounded-full bg-white px-3 py-1.5">{doctor.distance} km</span>
                        <span className="rounded-full bg-white px-3 py-1.5">{doctor.eta}</span>
                        <span className="rounded-full bg-white px-3 py-1.5">{doctor.available}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#69736C]">{doctor.reason}</p>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <div className="flex items-start gap-4">
            <img src={selectedDoctor.photo} alt={`Foto demo ${selectedDoctor.name}`} className="h-20 w-20 rounded-2xl object-cover" />
            <div>
              <span className="mb-2 inline-flex rounded-full bg-[#FFF7D6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#725300]">Data Demo</span>
              <h2 className="font-bold text-primary-dark">{selectedDoctor.name}</h2>
              <p className="mt-1 text-sm text-[#69736C]">{selectedDoctor.area}</p>
            </div>
          </div>

          <div className="my-5 h-px bg-[#E5EAE6]" />

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold text-primary-dark">Spesies ditangani</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedDoctor.species.map((item) => (
                  <span key={item} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand-green">{item}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F8FAF8] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8D978F]">Slot</p>
                <p className="mt-1 font-bold text-primary-dark">{selectedDoctor.nextSlot}</p>
              </div>
              <div className="rounded-2xl bg-[#F8FAF8] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8D978F]">Biaya</p>
                <p className="mt-1 font-bold text-primary-dark">{selectedDoctor.visitFee}</p>
              </div>
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 text-sm font-bold text-primary-dark">Jenis konsultasi</legend>
            <div className="grid gap-2">
              {selectedDoctor.mode.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setConsultMode(mode)}
                  className={`min-h-12 rounded-xl border px-4 text-sm font-bold ${
                    consultMode === mode ? "border-brand-green bg-brand-soft text-brand-green" : "border-[#D4DCD6] text-[#505B53]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 rounded-2xl bg-[#EAF3FB] p-4 text-sm text-[#205580]">
            <p className="font-bold">Ringkasan untuk dokter</p>
            <p className="mt-1 leading-relaxed">Kasus #VT-8821, Si Putih, tingkat urgensi awal Mendesak, gejala lemas dan nafsu makan turun.</p>
          </div>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => alert(`Permintaan ${consultMode} demo dikirim ke ${selectedDoctor.name}.`)}
              className="min-h-12 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark"
            >
              Atur {consultMode}
            </button>
            <button
              type="button"
              className="min-h-12 rounded-xl border border-[#D4DCD6] bg-white px-5 text-sm font-bold text-brand-green"
            >
              Lihat Profil Dokter
            </button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#8D978F]">
            Konsultasi di halaman ini adalah simulasi. Dalam kondisi berat atau memburuk, hubungi dokter hewan atau petugas kesehatan hewan setempat.
          </p>
        </aside>
      </div>
    </section>
  );
}
