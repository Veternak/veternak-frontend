import { Link, useNavigate, useParams } from "react-router-dom";
import { demoAnimals } from "../../data/demoAnimals";

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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

function getStatusClass(status) {
  if (status === "Sehat") return "bg-[#E8F5EC] text-[#1D5937]";
  if (status === "Perlu Dipantau") return "bg-[#FFF7D6] text-[#725300]";
  return "bg-[#FDEBEC] text-[#912525]";
}

function getUrgencyClass(urgency) {
  if (urgency === "Mendesak") return "bg-[#FFF0E5] text-[#9A3F0F]";
  if (urgency === "Perlu diperiksa") return "bg-[#FFF7D6] text-[#725300]";
  return "bg-[#E6F5F1] text-[#2E7D6B]";
}

export default function AnimalProfilePage() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const animal = demoAnimals.find((item) => item.id === animalId);

  if (!animal) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#E5EAE6] bg-white p-8 shadow-sm">
        <Link to="/peternak/ternak" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
          <ArrowLeftIcon />
          Kembali ke daftar ternak
        </Link>
        <h1 className="text-3xl font-bold text-primary-dark">Profil ternak tidak ditemukan</h1>
        <p className="mt-3 text-[#69736C]">Data ternak demo ini belum tersedia di daftar ternak.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl pb-10">
      <Link to="/peternak/ternak" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
        <ArrowLeftIcon />
        Kembali ke daftar ternak
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[1.5rem] bg-brand-soft text-5xl">
                {animal.species.includes("Kambing") ? "K" : "S"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${getStatusClass(animal.status)}`}>
                    {animal.status}
                  </span>
                  <span className="inline-flex rounded-full bg-[#F1F3F5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
                    ID Animal #{animal.numericId}
                  </span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">{animal.name}</h1>
                <p className="mt-2 text-base font-semibold text-[#505B53]">{animal.breed} | {animal.species}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C]">{animal.notes}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Umur", animal.age],
              ["Kelamin", animal.gender],
              ["Bobot", animal.weight],
              ["Update", animal.lastUpdate],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{label}</p>
                <p className="mt-2 text-xl font-bold text-primary-dark">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Informasi ternak</h2>
            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="font-bold text-primary-dark">ID ternak</dt>
                <dd className="mt-1 text-[#69736C]">{animal.id}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Farmer ID</dt>
                <dd className="mt-1 text-[#69736C]">{animal.farmerId}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Jenis</dt>
                <dd className="mt-1 text-[#69736C]">{animal.species}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Lokasi kandang</dt>
                <dd className="mt-1 text-[#69736C]">{animal.stall}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Dibuat</dt>
                <dd className="mt-1 text-[#69736C]">{animal.createdAt}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Diperbarui</dt>
                <dd className="mt-1 text-[#69736C]">{animal.updatedAt}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-primary-dark">Riwayat konsultasi</h2>
                <p className="mt-1 text-sm text-[#69736C]">Mengacu ke tabel Consultation dan ringkasan chat terakhir.</p>
              </div>
              <span className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand-green">{animal.consultations.length} sesi</span>
            </div>

            <div className="space-y-4">
              {animal.consultations.map((consultation) => (
                <article key={consultation.id} className="rounded-2xl border border-[#E5EAE6] p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">Kasus {consultation.id}</p>
                      <h3 className="mt-1 font-bold text-primary-dark">{consultation.vetName}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#69736C]">{consultation.aiSummary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${getUrgencyClass(consultation.urgency)}`}>{consultation.urgency}</span>
                      <span className="rounded-full bg-[#F1F3F5] px-3 py-1.5 text-xs font-bold text-[#505B53]">{consultation.status}</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-[#F8FAF8] p-4 text-sm text-[#505B53]">
                    <span className="font-bold text-primary-dark">Pesan terakhir:</span> {consultation.lastMessage}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-[#8D978F]">{consultation.date}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Rekam medis</h2>
            <p className="mt-1 text-sm text-[#69736C]">Catatan diagnosis dan rekomendasi berasal dari dokter hewan, bukan penilaian otomatis.</p>

            {animal.medicalRecords.length ? (
              <div className="mt-5 space-y-4">
                {animal.medicalRecords.map((record) => (
                  <article key={record.id} className="rounded-2xl border border-[#E5EAE6] p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{record.id} | {record.consultationId}</p>
                        <h3 className="mt-1 font-bold text-primary-dark">{record.diagnosis}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#69736C]">{record.notes}</p>
                      </div>
                      <span className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand-green">{record.date}</span>
                    </div>
                    <div className="mt-4 rounded-xl bg-[#FFFDF7] p-4 text-sm text-[#594631]">
                      <span className="font-bold">Resep/catatan obat:</span> {record.prescription}
                    </div>
                    <p className="mt-3 text-xs font-semibold text-[#8D978F]">Dicatat oleh {record.vetName}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-[#F8FAF8] p-5 text-sm text-[#69736C]">
                Belum ada rekam medis selesai untuk ternak ini.
              </div>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-primary-dark">Aksi cepat</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#69736C]">Gunakan profil ini sebagai konteks saat membuat laporan kondisi baru.</p>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => navigate("/peternak/lapor")}
              className="min-h-12 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark"
            >
              Laporkan Kondisi Ternak Ini
            </button>
            <button
              type="button"
              onClick={() => navigate("/peternak/konsultasi")}
              className="min-h-12 rounded-xl border border-[#D4DCD6] bg-white px-5 text-sm font-bold text-brand-green"
            >
              Cari Dokter Hewan
            </button>
          </div>

          <div className="my-5 h-px bg-[#E5EAE6]" />

          <h3 className="font-bold text-primary-dark">Kunjungan lapangan</h3>
          {animal.visits.length ? (
            <div className="mt-3 space-y-3">
              {animal.visits.map((visit) => (
                <div key={visit.id} className="rounded-2xl bg-[#F8FAF8] p-4 text-sm">
                  <p className="font-bold text-primary-dark">{visit.status}</p>
                  <p className="mt-1 text-[#69736C]">{visit.estimatedTime}</p>
                  <p className="mt-1 text-xs font-semibold text-[#8D978F]">{visit.distanceKm} | {visit.consultationId}</p>
                  <p className="mt-3 leading-relaxed text-[#505B53]">{visit.notes}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 rounded-2xl bg-[#F8FAF8] p-4 text-sm text-[#69736C]">Belum ada kunjungan lapangan aktif.</p>
          )}

          <div className="mt-5 rounded-2xl bg-[#EAF3FB] p-4 text-sm text-[#205580]">
            <p className="flex items-center gap-2 font-bold"><CheckIcon /> Catatan keamanan</p>
            <p className="mt-2 leading-relaxed">Diagnosis dan resep hanya dicatat dari dokter hewan. Veternak menyimpan riwayat agar konsultasi berikutnya lebih cepat.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
