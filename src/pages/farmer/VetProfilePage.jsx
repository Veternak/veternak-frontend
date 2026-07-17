import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVetById, getAnimals, createConsultation, requestVisit } from "../../services/farmerCoreService";

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
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [consultMode, setConsultMode] = useState("Chat");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      setError("");
      try {
        const [vetResponse, animalResponse] = await Promise.all([
          getVetById(vetId),
          getAnimals(),
        ]);

        if (!isMounted) return;

        const fetchedVet = vetResponse?.data?.vet || vetResponse?.vet || vetResponse;
        setDoctor(fetchedVet);
        setConsultMode(fetchedVet?.canVisit ? "Chat" : "Chat");

        const fetchedAnimals = animalResponse?.data?.animals || [];
        setAnimals(fetchedAnimals);
        if (fetchedAnimals.length > 0) {
          setSelectedAnimalId(String(fetchedAnimals[0].id));
        }
      } catch (err) {
        if (isMounted) setError(err?.message || "Gagal memuat profil dokter.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [vetId]);

  const handleAction = async () => {
    if (!selectedAnimalId) {
      alert("Harap pilih ternak terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createConsultation({
        vetId: Number(vetId),
        animalId: Number(selectedAnimalId),
        urgencyLevel: "MEDIUM",
      });

      const cons = response?.data?.consultation || response?.consultation;
      if (!cons) throw new Error("Gagal membuat konsultasi.");

      if (consultMode === "Kunjungan") {
        await requestVisit(cons.id, {
          estimatedTime: new Date(Date.now() + 86400000).toISOString(),
          notes: "Permintaan kunjungan lapangan.",
        });
        alert("Konsultasi dan kunjungan lapangan berhasil dibuat!");
      } else {
        alert("Konsultasi chat berhasil dibuat!");
      }

      navigate("/peternak/konsultasi");
    } catch (err) {
      alert(err.message || "Gagal membuat konsultasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#E5EAE6] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-[#69736C]">Memuat profil dokter...</p>
      </section>
    );
  }

  if (error || !doctor) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#E5EAE6] bg-white p-8 shadow-sm">
        <Link to="/peternak/konsultasi" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
          <ArrowLeftIcon />
          Kembali ke daftar dokter
        </Link>
        <h1 className="text-3xl font-bold text-primary-dark">Profil dokter tidak ditemukan</h1>
        <p className="mt-3 text-[#69736C]">{error || "Data dokter tidak dapat dimuat."}</p>
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
              <img
                src={doctor.profilePicture || "https://i.pravatar.cc/180?img=47"}
                alt={`Foto ${doctor.name}`}
                className="h-32 w-32 rounded-[1.5rem] object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                    doctor.isVerified ? "bg-[#E8F5EC] text-[#1D5937]" : "bg-[#F1F3F5] text-[#6B7280]"
                  }`}>
                    {doctor.isVerified && <CheckIcon />}
                    {doctor.isVerified ? "Terverifikasi" : "Mitra Rujukan"}
                  </span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">{doctor.name}</h1>
                <p className="mt-2 text-base font-semibold text-[#505B53]">Spesialis Ruminansia</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C]">
                  Dokter hewan mitra aktif terdaftar di sistem Veternak. Siap melayani konsultasi klinis terakreditasi.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Pengalaman", `${doctor.experienceYears || 0} tahun`],
              ["Rating mitra", `★ ${doctor.rating || "4.8"}`],
              ["Status verifikasi", doctor.isVerified ? "Terverifikasi" : "Pending"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{label}</p>
                <p className="mt-2 text-xl font-bold text-primary-dark">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Data profil dokter</h2>
            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="font-bold text-primary-dark">ID Vet</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.id}</dd>
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
                <dt className="font-bold text-primary-dark">Provinsi</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.province || "-"}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kabupaten</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.regency || "-"}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kecamatan</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.district || "-"}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-bold text-primary-dark">Alamat detail</dt>
                <dd className="mt-1 text-[#69736C]">{doctor.addressDetail || "-"}</dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-primary-dark">Atur konsultasi</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#69736C]">Pilih mode bantuan yang tersedia untuk dokter ini.</p>

          <div className="my-5 h-px bg-[#E5EAE6]" />

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold text-primary-dark">Pilih Ternak Anda</p>
              {animals.length > 0 ? (
                <select
                  value={selectedAnimalId}
                  onChange={(e) => setSelectedAnimalId(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm font-bold text-primary-dark outline-none focus:border-brand-green"
                >
                  {animals.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.species})
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-2 rounded-xl bg-orange-50 p-3 text-xs font-semibold text-orange-700">
                  Belum ada ternak terdaftar. Silakan{" "}
                  <Link to="/peternak/ternak/tambah" className="underline font-black text-brand-green">
                    tambah ternak
                  </Link>{" "}
                  terlebih dahulu.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F8FAF8] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8D978F]">Biaya Chat</p>
                <p className="mt-1 font-bold text-primary-dark">
                  Rp{(doctor.chatPrice || 0).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="rounded-2xl bg-[#F8FAF8] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8D978F]">Biaya Kunjungan</p>
                <p className="mt-1 font-bold text-primary-dark">
                  {doctor.canVisit ? `Rp${(doctor.visitPrice || 0).toLocaleString("id-ID")}` : "Tidak Tersedia"}
                </p>
              </div>
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 text-sm font-bold text-primary-dark">Jenis konsultasi</legend>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => setConsultMode("Chat")}
                className={`min-h-12 rounded-xl border px-4 text-sm font-bold ${
                  consultMode === "Chat" ? "border-brand-green bg-brand-soft text-brand-green" : "border-[#D4DCD6] text-[#505B53]"
                }`}
              >
                Konsultasi Chat
              </button>
              {doctor.canVisit && (
                <button
                  type="button"
                  onClick={() => setConsultMode("Kunjungan")}
                  className={`min-h-12 rounded-xl border px-4 text-sm font-bold ${
                    consultMode === "Kunjungan" ? "border-brand-green bg-brand-soft text-brand-green" : "border-[#D4DCD6] text-[#505B53]"
                  }`}
                >
                  Kunjungan Fisik Kandang
                </button>
              )}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={handleAction}
            disabled={isSubmitting || !selectedAnimalId}
            className="mt-6 min-h-12 w-full rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark disabled:opacity-60"
          >
            {isSubmitting ? "Memproses..." : `Mulai ${consultMode}`}
          </button>
        </aside>
      </div>
    </section>
  );
}
