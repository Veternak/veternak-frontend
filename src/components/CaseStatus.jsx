import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoredFarmer } from "../services/farmerAuthService";
import { getAnimals, getVets, createConsultation, requestVisit, getConsultations, cancelConsultation } from "../services/farmerCoreService";

const filters = ["Paling sesuai", "Terdekat", "Kunjungan"];

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

function ProfileAvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-brand-green" aria-hidden="true">
      <path
        d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 19.5c1.7-3.2 4.4-4.8 7.5-4.8s5.8 1.6 7.5 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.2" />
    </svg>
  );
}

export default function CaseStatus() {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [consultMode, setConsultMode] = useState("Chat");
  const [vets, setVets] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [activeConsultations, setActiveConsultations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const farmer = getStoredFarmer();

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      setIsLoading(true);
      setError("");
      try {
        const farmerData = getStoredFarmer();
        const params = farmerData?.latitude && farmerData?.longitude 
          ? { lat: farmerData.latitude, long: farmerData.longitude } 
          : {};
        
        if (selectedFilter === "Kunjungan") {
          params.canVisit = true;
        }

        const [vetResponse, animalResponse, consultationResponse] = await Promise.all([
          getVets(params),
          getAnimals(),
          getConsultations(),
        ]);

        if (!isMounted) return;

        let fetchedVets = vetResponse?.data?.vets || [];

        // Fallback: if geolocation search returns no doctors, retry without lat/long
        // This avoids empty lists when doctors were created without coordinates.
        if (fetchedVets.length === 0 && (params.lat !== undefined || params.long !== undefined)) {
          const fallbackVetResponse = await getVets({ canVisit: params.canVisit });
          fetchedVets = fallbackVetResponse?.data?.vets || [];
        }

        // If geosearch returned very few results, also fetch general list and merge
        // This helps surface more doctors if many lack coordinates but still exist in DB.
        if (fetchedVets.length < itemsPerPage) {
          const generalRes = await getVets({ canVisit: params.canVisit });
          const generalVets = generalRes?.data?.vets || [];
          const existingIds = new Set(fetchedVets.map((v) => v.id));
          generalVets.forEach((v) => {
            if (!existingIds.has(v.id)) {
              fetchedVets.push(v);
            }
          });
        }

        setVets(fetchedVets);
        if (fetchedVets.length > 0) {
          setSelectedDoctorId(String(fetchedVets[0].id));
          setConsultMode(fetchedVets[0].canVisit ? "Chat" : "Chat");
        }

        const fetchedAnimals = animalResponse?.data?.animals || [];
        setAnimals(fetchedAnimals);
        if (fetchedAnimals.length > 0) {
          setSelectedAnimalId(String(fetchedAnimals[0].id));
        }

        const fetchedConsultations = consultationResponse?.data?.consultations || [];
        // Filter hanya PENDING dan ACTIVE, tidak tampilkan COMPLETED/CLOSED
        const activeOnly = fetchedConsultations.filter(
          (c) => c.status === "PENDING" || c.status === "ACTIVE" || c.status === "IN_PROGRESS"
        );
        
        // Remove duplicates: keep only latest for each vet
        const vetMap = new Map();
        activeOnly.forEach((c) => {
          const vetId = c.vet?.id;
          if (vetId) {
            const existing = vetMap.get(vetId);
            if (!existing || new Date(c.createdAt) > new Date(existing.createdAt)) {
              vetMap.set(vetId, c);
            }
          }
        });
        
        const uniqueConsultations = Array.from(vetMap.values());
        setActiveConsultations(uniqueConsultations);
        setCurrentPage(1);
      } catch (err) {
        if (isMounted) setError(err?.message || "Gagal memuat data konsultasi.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [selectedFilter]);

  const selectedDoctor = useMemo(() => {
    return vets.find((doctor) => String(doctor.id) === String(selectedDoctorId));
  }, [vets, selectedDoctorId]);

  const locationText = useMemo(() => {
    if (!farmer) return "Lokasi belum diatur";
    return [farmer.district, farmer.regency].filter(Boolean).join(", ") || "Lokasi Peternak";
  }, [farmer]);

  const handleAction = async () => {
    if (!selectedAnimalId) {
      alert("Harap pilih ternak terlebih dahulu.");
      return;
    }
    if (!selectedDoctorId) {
      alert("Harap pilih dokter terlebih dahulu.");
      return;
    }

    setIsSubmitting(false);
    try {
      const response = await createConsultation({
        vetId: Number(selectedDoctorId),
        animalId: Number(selectedAnimalId),
        urgencyLevel: "MEDIUM",
      });

      const cons = response?.data?.consultation || response?.consultation;
      if (!cons) throw new Error("Gagal membuat konsultasi.");

      if (consultMode === "Kunjungan") {
        await requestVisit(cons.id, {
          estimatedTime: new Date(Date.now() + 86400000).toISOString(),
          notes: "Permintaan kunjungan fisik lapangan.",
        });
      }

      navigate(`/peternak/konsultasi/${cons.id}/pembayaran`);
    } catch (err) {
      alert(err.message || "Gagal mengatur konsultasi.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl pb-10">
      <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Konsultasi dokter hewan</p>
          <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">Pilih dokter di sekitar kandang Anda</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#69736C] md:text-base">
            Gunakan geolokasi akun Anda untuk mencari dokter hewan terdekat secara riil melalui database Veternak.
          </p>
          <Link
            to="/peternak/riwayat-konsultasi"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-brand-green/80"
          >
            📋 Lihat Riwayat Konsultasi
          </Link>
        </div>

        <div className="rounded-[2rem] border border-[#D8EDAC] bg-brand-soft p-6">
          <div className="flex items-start gap-3">
            <span className="mt-1 text-brand-green"><PinIcon /></span>
            <div>
              <p className="text-sm font-bold text-primary-dark">Lokasi kandang Anda</p>
              <p className="mt-1 text-sm leading-relaxed text-[#527C4D]">{locationText}</p>
              <p className="mt-3 text-xs font-semibold text-[#527C4D]">
                {farmer?.latitude ? `Koordinat aktif: ${farmer.latitude}, ${farmer.longitude}` : "Aktifkan GPS saat masuk untuk akurasi jarak."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE CONSULTATIONS LIST SECTION */}
      {!isLoading && activeConsultations.length > 0 && (
        <div className="mb-8 rounded-4xl border border-brand-green/20 bg-brand-soft/20 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green mb-4">Percakapan &amp; Konsultasi Aktif Anda</p>
          
          {/* Pagination info */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-600">
              Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, activeConsultations.length)} - {Math.min(currentPage * itemsPerPage, activeConsultations.length)} dari {activeConsultations.length} konsultasi
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeConsultations
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((c) => {
                const isPendingPayment = c.status === "PENDING";
                return (
                  <div key={c.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isPendingPayment ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {isPendingPayment ? "Menunggu Pembayaran" : "Konsultasi Aktif"}
                        </span>
                        <span className="text-[10px] text-gray-400 font-semibold">
                          {new Date(c.createdAt).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                      <h4 className="font-bold text-primary-dark text-base">{c.vet?.name || "Dokter Hewan"}</h4>
                      <p className="text-xs text-[#69736C] mt-0.5">Pasien: <span className="font-bold">{c.animal?.name || "Ternak"}</span></p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigate(isPendingPayment ? `/peternak/konsultasi/${c.id}/pembayaran` : `/peternak/konsultasi/${c.id}`)}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                          isPendingPayment 
                            ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                            : 'bg-brand-green hover:bg-brand-green/90 text-white'
                        }`}
                      >
                        {isPendingPayment ? "Bayar" : "Buka Chat"}
                      </button>
                      {isPendingPayment && (
                        <button
                          onClick={async () => {
                            if (window.confirm("Batalkan konsultasi ini?")) {
                              try {
                                await cancelConsultation(c.id);
                                alert("Berhasil dibatalkan");
                                window.location.reload();
                              } catch (err) {
                                alert(err.message || "Gagal membatalkan");
                              }
                            }
                          }}
                          className="px-3 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                        >
                          Batal
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Pagination controls */}
          {Math.ceil(activeConsultations.length / itemsPerPage) > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(activeConsultations.length / itemsPerPage) }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs ${
                      currentPage === i + 1
                        ? 'bg-brand-green text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(Math.ceil(activeConsultations.length / itemsPerPage), p + 1))}
                disabled={currentPage === Math.ceil(activeConsultations.length / itemsPerPage)}
                className="px-2 py-1 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <p className="rounded-[2rem] border border-gray-100 bg-white p-8 text-center text-sm font-semibold text-gray-500 shadow-sm">
          Memuat daftar dokter terdekat dari database...
        </p>
      )}

      {!isLoading && error && (
        <p className="rounded-[2rem] border border-red-100 bg-red-50 p-8 text-center text-sm font-semibold text-red-700 shadow-sm">
          {error}
        </p>
      )}

      {!isLoading && !error && vets.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
          <h3 className="text-xl font-bold text-primary-dark">Tidak ada dokter ditemukan</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Coba ganti filter pencarian atau pastikan koordinat profil terisi dengan benar.
          </p>
        </div>
      )}

      {!isLoading && !error && vets.length > 0 && (
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
              {vets.map((doctor) => {
                const selected = String(selectedDoctorId) === String(doctor.id);
                const specialties = "Spesialis Ruminansia";
                // Check if doctor is currently in active consultation
                const isInActiveChat = activeConsultations.some(
                  (c) => c.vet?.id === doctor.id && c.status !== "PENDING" && c.status !== "COMPLETED" && c.status !== "CLOSED"
                );
                return (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => {
                      if (!isInActiveChat) {
                        setSelectedDoctorId(String(doctor.id));
                        setConsultMode("Chat");
                      }
                    }}
                    disabled={isInActiveChat}
                    className={`w-full rounded-4xl border p-4 text-left transition-all md:p-5 ${
                      isInActiveChat
                        ? "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
                        : selected
                        ? "border-brand-green bg-brand-soft"
                        : "border-[#E5EAE6] bg-white hover:border-[#B7DC72]"
                    }`}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={doctor.profilePicture || undefined}
                        alt={`Foto ${doctor.name}`}
                        className={`h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl object-cover ${doctor.profilePicture ? '' : 'hidden'}`}
                      />
                      {!doctor.profilePicture && (
                        <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl bg-neutral-bg border border-[#E5EAE6] flex items-center justify-center">
                          <ProfileAvatarIcon />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="mb-1.5 inline-flex rounded-full bg-brand-soft px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-brand-green">
                              {doctor.isVerified ? "Terverifikasi" : "Mitra Rujukan"}
                            </span>
                            {isInActiveChat && (
                              <span className="ml-2 inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-red-700">
                                Sedang Chat
                              </span>
                            )}
                            <h2 className="text-base sm:text-lg font-bold text-primary-dark truncate">{doctor.name}</h2>
                            <p className="mt-0.5 text-xs sm:text-sm text-[#69736C] truncate">{specialties}</p>
                          </div>
                          {selected && <span className="text-brand-green shrink-0 mt-1"><CheckIcon /></span>}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] sm:text-xs font-bold text-[#505B53]">
                          <span className="rounded-full bg-white px-2.5 py-1 border border-standard-border/20">
                            {doctor.distanceKm !== null ? `${doctor.distanceKm} km` : "Jarak tidak tersedia"}
                          </span>
                          <span className="rounded-full bg-white px-2.5 py-1 border border-standard-border/20">
                            {doctor.experienceYears || 0} tahun pengalaman
                          </span>
                          <span className="rounded-full bg-white px-2.5 py-1 border border-standard-border/20">
                            ★ {doctor.rating || "4.8"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDoctor && (
            <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
              <div className="flex items-start gap-4">
                <img
                  src={selectedDoctor.profilePicture || undefined}
                  alt={`Foto ${selectedDoctor.name}`}
                  className={`h-20 w-20 rounded-2xl object-cover ${selectedDoctor.profilePicture ? '' : 'hidden'}`}
                />
                {!selectedDoctor.profilePicture && (
                  <div className="h-20 w-20 rounded-2xl bg-neutral-bg border border-[#E5EAE6] flex items-center justify-center">
                    <ProfileAvatarIcon />
                  </div>
                )}
                <div>
                  <span className="mb-2 inline-flex rounded-full bg-[#E8F5EC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1D5937]">
                    {selectedDoctor.isVerified ? "Terverifikasi" : "Mitra Rujukan"}
                  </span>
                  <h2 className="font-bold text-primary-dark">{selectedDoctor.name}</h2>
                  <p className="mt-1 text-sm text-[#69736C]">{[selectedDoctor.district, selectedDoctor.regency].filter(Boolean).join(", ")}</p>
                </div>
              </div>

              <div className="my-5 h-px bg-[#E5EAE6]" />

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-bold text-primary-dark">Pilih Ternak untuk Konsultasi</p>
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
                      Rp{(selectedDoctor.chatPrice || 0).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAF8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8D978F]">Biaya Kunjungan</p>
                    <p className="mt-1 font-bold text-primary-dark">
                      {selectedDoctor.canVisit
                        ? `Rp${(selectedDoctor.visitPrice || 0).toLocaleString("id-ID")}`
                        : "Tidak Tersedia"}
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
                      consultMode === "Chat"
                        ? "border-brand-green bg-brand-soft text-brand-green"
                        : "border-[#D4DCD6] text-[#505B53]"
                    }`}
                  >
                    Konsultasi Chat
                  </button>
                  {selectedDoctor.canVisit && (
                    <button
                      type="button"
                      onClick={() => setConsultMode("Kunjungan")}
                      className={`min-h-12 rounded-xl border px-4 text-sm font-bold ${
                        consultMode === "Kunjungan"
                          ? "border-brand-green bg-brand-soft text-brand-green"
                          : "border-[#D4DCD6] text-[#505B53]"
                      }`}
                    >
                      Kunjungan Fisik Kandang
                    </button>
                  )}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={handleAction}
                  disabled={isSubmitting || !selectedAnimalId}
                  className="min-h-12 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark disabled:opacity-60"
                >
                  {isSubmitting ? "Mengirim..." : `Mulai ${consultMode}`}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/peternak/konsultasi/dokter/${selectedDoctor.id}`)}
                  className="min-h-12 rounded-xl border border-[#D4DCD6] bg-white px-5 text-sm font-bold text-brand-green"
                >
                  Lihat Profil Lengkap
                </button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#8D978F]">
                Konsultasi ini bersifat resmi dan dilindungi privasi data pasien Anda.
              </p>
            </aside>
          )}
        </div>
      )}
    </section>
  );
}
