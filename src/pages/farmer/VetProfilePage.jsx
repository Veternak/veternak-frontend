import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { demoDoctors } from "../../data/demoDoctors";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="m20 6-11 11-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VetProfilePage() {
  const { vetId } = useParams();
  const doctor = useMemo(
    () => demoDoctors.find((item) => item.id === vetId),
    [vetId],
  );
  const [consultMode, setConsultMode] = useState(doctor?.mode[0] ?? "Chat");

  if (!doctor) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#E5EAE6] bg-white p-8 shadow-sm">
        <Link to="/peternak/konsultasi" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
          <ArrowLeftIcon />
          Kembali ke konsultasi
        </Link>
        <h1 className="text-3xl font-bold text-primary-dark">Profil dokter tidak ditemukan</h1>
        <p className="mt-3 text-[#69736C]">Data dokter demo ini belum tersedia di daftar konsultasi.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl pb-10">
      <Link to="/peternak/konsultasi" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
        <ArrowLeftIcon />
        Kembali ke daftar dokter
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <img src={doctor.photo} alt={`Foto demo ${doctor.name}`} className="h-32 w-32 rounded-[1.5rem] object-cover" />
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-[#FFF7D6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#725300]">Data Demo</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                    doctor.isVerified ? "bg-brand-soft text-brand-green" : "bg-[#F1F3F5] text-[#6B7280]"
                  }`}>
                    {doctor.isVerified && <CheckIcon />}
                    {doctor.isVerified ? "Terverifikasi" : "Rujukan demo"}
                  </span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">{doctor.name}</h1>
                <p className="mt-2 text-base font-semibold text-[#505B53]">{doctor.expertise}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C]">{doctor.reason}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Jarak", `${doctor.distance} km`],
              ["Estimasi respons", doctor.eta],
              ["Rating demo", doctor.rating],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{label}</p>
                <p className="mt-2 text-xl font-bold text-primary-dark">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Data profil dokter</h2>
            <p className="mt-2 text-sm text-[#69736C]">Struktur informasi ini mengikuti tabel `Vet` pada rancangan database backend.</p>

            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="font-bold text-primary-dark">ID Vet</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.numericId}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Nomor STR</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.strNumber}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Telepon</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.phone}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Status verifikasi</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.isVerified ? "Sudah diverifikasi" : "Belum diverifikasi"}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Provinsi</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.province}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kabupaten</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.regency}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kecamatan</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.district}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Koordinat demo</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.latitude}, {doctor.longitude}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-bold text-primary-dark">Alamat detail</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.addressDetail}</dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-primary-dark">Atur konsultasi</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#69736C]">Pilih mode bantuan yang tersedia untuk dokter ini.</p>

          <div className="my-5 h-px bg-[#E5EAE6]" />

          <div>
            <p className="mb-3 text-sm font-bold text-primary-dark">Spesies ditangani</p>
            <div className="flex flex-wrap gap-2">
              {doctor.species.map((item) => (
                <span key={item} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand-green">{item}</span>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F8FAF8] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8D978F]">Slot</p>
              <p className="mt-1 font-bold text-primary-dark">{doctor.nextSlot}</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAF8] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8D978F]">Biaya</p>
              <p className="mt-1 font-bold text-primary-dark">{doctor.visitFee}</p>
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 text-sm font-bold text-primary-dark">Jenis konsultasi</legend>
            <div className="grid gap-2">
              {doctor.mode.map((mode) => (
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

          <button
            type="button"
            onClick={() => alert(`Permintaan ${consultMode} demo dikirim ke ${doctor.name}.`)}
            className="mt-6 min-h-12 w-full rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark"
          >
            Atur {consultMode}
          </button>

          <p className="mt-4 text-xs leading-relaxed text-[#8D978F]">
            Profil ini menggunakan data demo. Jangan tampilkan data dokter nyata tanpa persetujuan.
          </p>
        </aside>
      </div>
    </section>
  );
}
