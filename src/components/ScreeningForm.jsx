import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { buildDiagnosisPayload, diagnoseAnimal } from "../services/aiDiagnosisService";
import { createAnimal, createConsultation, getAnimalById, getAnimals, getVets } from "../services/farmerCoreService";

const animals = [
  {
    id: "Spi-001",
    name: "Si Putih",
    species: "Sapi Potong",
    age: "18 bulan",
    stall: "Kandang Utara",
    status: "Perlu dipantau",
  },
  {
    id: "Kmb-042",
    name: "Si Hitam",
    species: "Kambing Etawa",
    age: "11 bulan",
    stall: "Kandang Timur",
    status: "Sehat",
  },
  {
    id: "Spi-005",
    name: "Brahman Jr.",
    species: "Sapi Potong",
    age: "24 bulan",
    stall: "Kandang Barat",
    status: "Sehat",
  },
];

const animalStatuses = [
  { value: "normal", label: "Normal" },
  { value: "baru_melahirkan", label: "Baru melahirkan" },
  { value: "bunting", label: "Bunting" },
  { value: "pemulihan", label: "Masa pemulihan" },
  { value: "tidak_tahu", label: "Tidak tahu" },
];

const symptomQuestions = [
  { key: "lemas", label: "Apakah ternak terlihat lemas?" },
  { key: "nafsu_makan_turun", label: "Apakah nafsu makan ternak menurun?" },
  { key: "produksi_susu_turun", label: "Apakah produksi susu menurun?" },
  { key: "batuk_ingus", label: "Apakah ternak batuk atau keluar ingus?" },
  { key: "sesak_napas", label: "Apakah ternak terlihat sesak napas?" },
  { key: "air_liur_berlebihan", label: "Apakah ternak mengeluarkan air liur berlebihan?" },
  { key: "luka_mulut", label: "Apakah ada luka di mulut?" },
  { key: "diare", label: "Apakah ternak diare?" },
  { key: "perut_kembung", label: "Apakah perut ternak kembung?" },
  { key: "pincang_sulit_berdiri", label: "Apakah ternak pincang atau sulit berdiri?" },
  { key: "bengkak_luka_benjolan", label: "Apakah ada bengkak, luka, atau benjolan di tubuh?" },
  { key: "ternak_lain_sakit_mirip", label: "Apakah ada ternak lain yang sakit dengan gejala mirip?" },
];

const answerOptions = ["Tidak", "Mungkin", "Ya"];

function normalizeAnimal(data) {
  return data?.data?.animal || data?.animal || data;
}

function speciesToModelValue(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("kerbau")) return "kerbau";
  if (normalized.includes("kambing")) return "kambing";
  if (normalized.includes("domba")) return "domba";
  return "sapi";
}

function getAgeInMonths(value) {
  const text = String(value || "").toLowerCase();
  const number = Number.parseInt(text, 10);
  if (!Number.isFinite(number)) return 0;
  return text.includes("tahun") ? number * 12 : number;
}

function getAnimalCode(animal) {
  if (!animal?.id) return "Otomatis";
  return `TRN-${String(animal.id).slice(0, 8).toUpperCase()}`;
}

const fallbackDoctors = [
  {
    name: "drh. Oktavianus K. Rohi",
    expertise: "Ruminansia dan kasus kambing",
    area: "Sleman Barat",
    distance: "2,4 km",
    eta: "25 menit",
    visit: "Kunjungan tersedia",
    photo: "https://i.pravatar.cc/160?img=12",
    reason: "Cocok untuk gejala lemas, napas berat, dan risiko penularan awal.",
  },
  {
    name: "drh. Siti Aminah",
    expertise: "Kesehatan sapi potong",
    area: "Mlati, Sleman",
    distance: "4,8 km",
    eta: "40 menit",
    visit: "Chat dulu",
    photo: "https://i.pravatar.cc/160?img=47",
    reason: "Berpengalaman menangani laporan penurunan nafsu makan pada sapi.",
  },
  {
    name: "Puskeswan Demo Sleman",
    expertise: "Layanan kesehatan hewan wilayah",
    area: "Kabupaten Sleman",
    distance: "6,1 km",
    eta: "60 menit",
    visit: "Rujukan lapangan",
    photo: "https://i.pravatar.cc/160?img=68",
    reason: "Fallback demo bila dokter pribadi belum tersedia.",
  },
];

const steps = [
  "Pilih ternak",
  "Gejala ternak",
  "Catatan tambahan",
  "Hasil & Kirim Laporan",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="m20 6-11 11-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ScreeningForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const animalIdFromQuery = searchParams.get("animalId");
  const [step, setStep] = useState(0);
  
  // States for actual animal list from backend
  const [myAnimals, setMyAnimals] = useState([]);
  const [isLoadingAnimals, setIsLoadingAnimals] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedBackendAnimal, setSelectedBackendAnimal] = useState(null);
  
  const [species, setSpecies] = useState("sapi");
  const [animalAge, setAnimalAge] = useState(18);
  const [animalCode, setAnimalCode] = useState("");
  const [animalStatus, setAnimalStatus] = useState("baru_melahirkan");
  const [isProducingMilk, setIsProducingMilk] = useState("Ya");
  const [recentlyGaveBirth, setRecentlyGaveBirth] = useState("Ya");
  const [startedAt, setStartedAt] = useState("Sejak pagi");
  const [story, setStory] = useState("");
  const [symptomAnswers, setSymptomAnswers] = useState({
    lemas: "Tidak",
    nafsu_makan_turun: "Tidak",
    produksi_susu_turun: "Tidak",
    batuk_ingus: "Tidak",
    sesak_napas: "Tidak",
    air_liur_berlebihan: "Tidak",
    luka_mulut: "Tidak",
    diare: "Tidak",
    perut_kembung: "Tidak",
    pincang_sulit_berdiri: "Tidak",
    bengkak_luka_benjolan: "Tidak",
    ternak_lain_sakit_mirip: "Tidak",
  });
  const [photoCount, setPhotoCount] = useState(1);
  const [backendVets, setBackendVets] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [consultationResult, setConsultationResult] = useState(null);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [diagnosisError, setDiagnosisError] = useState("");
  const [animalLoadError, setAnimalLoadError] = useState("");
  const lastPredictionKeyRef = useRef("");

  const doctors = useMemo(() => {
    const list = backendVets.length ? backendVets : [];
    
    // FILTER: only include veterinarians with distance < 20.0 km
    const filtered = list.filter((vet) => {
      return vet.distanceKm !== null && vet.distanceKm !== undefined && Number(vet.distanceKm) < 20.0;
    });

    // SORT: by distance ascending (closest first)
    const sorted = [...filtered].sort((a, b) => Number(a.distanceKm) - Number(b.distanceKm));

    return sorted.map((vet) => ({
      id: vet.id,
      name: vet.name,
      expertise: `${vet.experienceYears || 0} tahun pengalaman`,
      area: [vet.district, vet.regency, vet.province].filter(Boolean).join(', ') || 'Area belum diisi',
      distance: `${Number(vet.distanceKm).toFixed(1)} km`,
      eta: vet.canVisit ? 'Kunjungan tersedia' : 'Chat tersedia',
      visit: vet.canVisit ? 'Kunjungan tersedia' : 'Chat dulu',
      photo: vet.profilePicture || 'https://i.pravatar.cc/160?img=47',
      reason: vet.isVerified ? 'Dokter terverifikasi di sistem Veternak.' : 'Data dokter dari backend Veternak.',
      source: 'backend',
    }));
  }, [backendVets]);

  const animal = useMemo(
    () => selectedBackendAnimal || { id: "new", name: animalCode || "Ternak Baru", species: species || "Sapi" },
    [selectedAnimal, selectedBackendAnimal, animalCode, species],
  );

  // Fetch list of livestock owned by the farmer
  useEffect(() => {
    setIsLoadingAnimals(true);
    getAnimals()
      .then((res) => {
        const list = res?.data?.animals || [];
        setMyAnimals(list);
        
        if (animalIdFromQuery) {
          const found = list.find(a => String(a.id) === String(animalIdFromQuery));
          if (found) {
            setSelectedBackendAnimal(found);
            setSelectedAnimal(String(found.id));
            setSpecies(speciesToModelValue(found.species));
            setAnimalAge(getAgeInMonths(found.age));
            setAnimalCode(found.name || getAnimalCode(found));
          }
        } else if (list.length > 0) {
          setSelectedBackendAnimal(list[0]);
          setSelectedAnimal(String(list[0].id));
          setSpecies(speciesToModelValue(list[0].species));
          setAnimalAge(getAgeInMonths(list[0].age));
          setAnimalCode(list[0].name || getAnimalCode(list[0]));
        }
      })
      .catch((error) => {
        setAnimalLoadError("Gagal memuat daftar ternak Anda dari backend.");
      })
      .finally(() => {
        setIsLoadingAnimals(false);
      });
  }, [animalIdFromQuery]);

  const handleAnimalChange = (animalId) => {
    setSelectedAnimal(animalId);
    const found = myAnimals.find(a => String(a.id) === String(animalId));
    if (found) {
      setSelectedBackendAnimal(found);
      setSpecies(speciesToModelValue(found.species));
      setAnimalAge(getAgeInMonths(found.age));
      setAnimalCode(found.name || getAnimalCode(found));
    }
  };

  useEffect(() => {
    getVets()
      .then((response) => {
        const vets = response?.data?.vets || [];
        setBackendVets(vets);
        if (vets[0]) setSelectedDoctor(String(vets[0].id));
      })
      .catch(() => {
        setSelectedDoctor(fallbackDoctors[0].name);
      });
  }, []);

  const progress = ((step + 1) / steps.length) * 100;

  const updateSymptomAnswer = (key, value) => {
    setSymptomAnswers((current) => ({ ...current, [key]: value }));
  };

  const canContinue = true;
  const positiveSymptomCount = Object.values(symptomAnswers).filter((value) => value === "Ya").length;
  const possibleSymptomCount = Object.values(symptomAnswers).filter((value) => value === "Mungkin").length;
  
  const diagnosisPayload = buildDiagnosisPayload({
    species,
    animalAge,
    isProducingMilk,
    recentlyGaveBirth,
    symptomAnswers,
  });
  
  const diagnosisData = diagnosisResult?.data ?? null;

  const requestDiagnosis = async () => {
    setIsSubmittingReport(true);
    setDiagnosisError("");

    try {
      const result = await diagnoseAnimal({
        species,
        animalAge,
        isProducingMilk,
        recentlyGaveBirth,
        symptomAnswers,
      });
      setDiagnosisResult(result);
      return result;
    } catch (error) {
      setDiagnosisError(
        error?.status === 401 || error?.status === 403
          ? "Sesi login belum valid. Masuk sebagai peternak dulu sebelum melihat prediksi."
          : error?.message || "Gagal memuat prediksi penyakit. Coba lagi."
      );
      return null;
    } finally {
      setIsSubmittingReport(false);
    }
  };

  useEffect(() => {
    if (step !== steps.length - 1) return;

    const predictionKey = JSON.stringify(diagnosisPayload);
    if (lastPredictionKeyRef.current === predictionKey) return;

    lastPredictionKeyRef.current = predictionKey;
    requestDiagnosis();
  }, [step, diagnosisPayload]);

  const normalizeUrgency = (value) => {
    if (["LOW", "MEDIUM", "HIGH"].includes(value)) return value;
    return "MEDIUM";
  };

  const ensureAnimalRecord = async () => {
    if (selectedBackendAnimal?.id) return selectedBackendAnimal;

    const response = await createAnimal({
      name: animalCode || animal.name,
      species,
      age: `${Number(animalAge) || 0} bulan`,
      gender: "FEMALE",
    });

    return response?.data?.animal || response;
  };

  const submitDiagnosis = async () => {
    if (!diagnosisResult) {
      const result = await requestDiagnosis();
      if (!result) return;
    }

    const selectedBackendVet = doctors.find((doctor) => String(doctor.id) === String(selectedDoctor) && doctor.source === "backend");
    if (!selectedBackendVet) {
      setDiagnosisError("Pilih dokter dari data backend terlebih dahulu untuk membuat konsultasi.");
      return;
    }

    setIsSubmittingReport(true);
    setDiagnosisError("");

    try {
      const createdAnimal = await ensureAnimalRecord();
      const consultation = await createConsultation({
        vetId: selectedBackendVet.id,
        animalId: createdAnimal.id,
        aiDiagnosisSummary: diagnosisResult.data.aiDiagnosisSummary,
        urgencyLevel: normalizeUrgency(diagnosisResult.data.urgencyLevel),
      });
      setConsultationResult(consultation.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        navigate("/peternak/konsultasi");
      }, 2500);
    } catch (error) {
      setDiagnosisError(error?.message || "Gagal membuat konsultasi. Coba lagi.");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl pb-24">
      <div className="mb-8 rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Laporan kondisi</p>
            <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">Laporkan gejala ternak</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C] md:text-base">
              Lengkapi rincian kondisi ternak Anda untuk dianalisis oleh asisten AI Veternak dan dikirimkan ke dokter hewan.
            </p>
          </div>
          <div className="rounded-2xl bg-brand-soft px-4 py-3 text-sm font-bold text-brand-green">
            Langkah {step + 1} dari {steps.length}
          </div>
        </div>

        <div className="mt-6">
          <div className="h-2 overflow-hidden rounded-full bg-[#E5EAE6]">
            <div className="h-full rounded-full bg-brand-lime transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 hidden grid-cols-4 gap-2 text-xs font-bold text-[#69736C] md:grid text-center">
            {steps.map((item, index) => (
              <span key={item} className={index <= step ? "text-brand-green" : ""}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm md:p-8">
          {step === 0 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Pilih ternak yang ingin dilaporkan</h2>
              <p className="mb-6 text-sm text-[#69736C]">
                Silakan pilih hewan ternak Anda yang menunjukkan gejala sakit dari menu dropdown di bawah.
              </p>
              {animalLoadError && (
                <div className="mb-5 rounded-2xl border border-[#F6CACA] bg-[#FDEBEC] p-4 text-sm font-semibold text-[#912525]">
                  {animalLoadError}
                </div>
              )}

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="animalDropdown">
                    Pilih Ternak Anda
                  </label>
                  {isLoadingAnimals ? (
                    <p className="text-sm text-gray-500 font-semibold">Memuat daftar hewan...</p>
                  ) : myAnimals.length === 0 ? (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                      Anda belum memiliki hewan ternak di sistem. Silakan tambahkan data hewan ternak terlebih dahulu di Beranda.
                    </div>
                  ) : (
                    <select
                      id="animalDropdown"
                      value={selectedAnimal}
                      onChange={(e) => handleAnimalChange(e.target.value)}
                      className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                    >
                      {myAnimals.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} - {a.species} ({a.age || "Umur tidak diset"})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="species">Jenis ternak</label>
                  <input
                    id="species"
                    type="text"
                    value={species.toUpperCase()}
                    disabled
                    className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-[#F8FAF8] px-4 text-sm font-bold text-[#505B53] outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="age">Umur ternak (bulan)</label>
                  <input
                    id="age"
                    type="number"
                    value={animalAge}
                    disabled
                    className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-[#F8FAF8] px-4 text-sm font-bold text-[#505B53] outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["Sedang menghasilkan susu?", isProducingMilk, setIsProducingMilk],
                  ["Baru melahirkan?", recentlyGaveBirth, setRecentlyGaveBirth],
                ].map(([label, value, setter]) => (
                  <fieldset key={label} className="rounded-2xl border border-[#E5EAE6] p-4">
                    <legend className="px-1 text-sm font-bold text-primary-dark">{label}</legend>
                    <div className="mt-3 flex gap-3">
                      {["Tidak", "Ya"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setter(option)}
                          className={`min-h-11 flex-1 rounded-xl border px-4 text-sm font-bold ${
                            value === option ? "border-brand-green bg-brand-soft text-brand-green" : "border-[#D4DCD6] text-[#505B53]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Pilih gejala yang dialami ternak</h2>
              <p className="mb-6 text-sm text-[#69736C]">Pilihlah kondisi yang sesuai berdasarkan pengamatan Anda pada hewan ternak saat ini.</p>
              <div className="grid gap-4 md:grid-cols-2">
                {symptomQuestions.map((item) => {
                  const selected = symptomAnswers[item.key];
                  return (
                    <fieldset
                      key={item.key}
                      className="rounded-2xl border border-[#E5EAE6] bg-white p-4"
                    >
                      <legend className="px-1 text-sm font-bold leading-relaxed text-primary-dark">{item.label}</legend>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {answerOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateSymptomAnswer(item.key, option)}
                            className={`min-h-11 rounded-xl border px-2 text-sm font-bold ${
                              selected === option ? "border-brand-green bg-brand-soft text-brand-green" : "border-[#D4DCD6] text-[#505B53]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Catatan kondisi tambahan & Foto</h2>
              <p className="mb-6 text-sm text-[#69736C]">Tuliskan catatan tambahan mengenai kondisi hewan secara detail untuk melengkapi laporan.</p>
              
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="startedAt">Kapan gejala mulai terlihat?</label>
              <select
                id="startedAt"
                value={startedAt}
                onChange={(event) => setStartedAt(event.target.value)}
                className="mb-6 h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              >
                <option>Baru saja</option>
                <option>Sejak pagi</option>
                <option>Sejak kemarin</option>
                <option>Lebih dari 2 hari</option>
                <option>Tidak tahu pasti</option>
              </select>

              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="story">Catatan tambahan</label>
              <textarea
                id="story"
                value={story}
                onChange={(event) => setStory(event.target.value)}
                rows={5}
                className="min-h-32 w-full rounded-2xl border border-[#D4DCD6] bg-white p-4 text-base leading-relaxed outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                placeholder="Masukkan catatan klinis atau kelakuan aneh ternak di sini..."
              />
              <div className="mt-2 mb-6 flex justify-between text-xs text-[#8D978F]">
                <span>Tuliskan catatan klinis tambahan bila diperlukan.</span>
                <span>{story.length}/500</span>
              </div>

              <h3 className="mb-3 text-lg font-bold text-primary-dark">Foto Pendukung (Opsional)</h3>
              <div className="rounded-[2rem] border-2 border-dashed border-[#D4DCD6] bg-[#F8FAF8] p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm cursor-pointer">+</div>
                <h4 className="text-sm font-bold text-primary-dark">Simulasi Upload Foto</h4>
                <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-[#69736C]">Klik untuk menambah jumlah demo foto yang dilampirkan.</p>
                <button
                  type="button"
                  onClick={() => setPhotoCount((count) => Math.min(count + 1, 3))}
                  className="mt-4 rounded-xl bg-brand-green px-4 py-2 text-xs font-bold text-white"
                >
                  Tambah Foto Demo
                </button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: photoCount }).map((_, index) => (
                  <div key={index} className="aspect-square rounded-2xl border border-[#E5EAE6] bg-brand-soft p-3">
                    <div className="flex h-full items-center justify-center rounded-xl bg-white text-xs font-bold text-brand-green">Foto {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Hasil Prediksi & Kirim Laporan</h2>
              <p className="mb-6 text-sm text-[#69736C]">Hasil diagnosis prediksi AI siap ditampilkan. Pilih dokter hewan untuk mengirim konsultasi resmi.</p>

              <div className="space-y-6">
                {diagnosisData ? (() => {
                  const isHealthy = diagnosisData.diseaseId === 0 || 
                                    String(diagnosisData.diseaseName || "").toLowerCase().includes("tidak ada indikasi") || 
                                    String(diagnosisData.simpleDiseaseName || "").toLowerCase() === "sehat" ||
                                    diagnosisData.urgencyLevel === "LOW";
                  return (
                    <>
                      {/* DYNAMIC DESCRIPTIVE SUMMARY DEPENDING ON THE CONDITION */}
                      <section className="rounded-3xl border border-brand-green/20 bg-brand-soft/20 p-6 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green mb-2">Penilaian Kondisi Utama</p>
                        <h3 className="text-xl font-extrabold text-primary-dark mb-3">
                          Diagnosis Teratas: {diagnosisData.diseaseName}
                        </h3>
                        <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-xs">
                          <p className="text-sm font-semibold leading-relaxed text-[#505B53]">
                            {isHealthy 
                              ? `✅ Informasi: Hewan ternak Anda berada dalam kondisi stabil atau hanya menunjukkan indikasi gangguan kesehatan ringan (${diagnosisData.diseaseName}). Pastikan kebersihan kandang terjaga dan pakan bergizi tetap diberikan.`
                              : diagnosisData.urgencyLevel === 'HIGH' 
                                ? `⚠️ Peringatan Penting: Hewan ternak Anda terindikasi mengalami penyakit dengan tingkat urgensi TINGGI (${diagnosisData.diseaseName}). Disarankan untuk segera melakukan isolasi mandiri pada hewan ini agar tidak menulari kelompok ternak lainnya, terapkan langkah penanganan darurat, dan pilih dokter hewan terdekat di bawah untuk kunjungan lapangan.`
                                : `🔔 Perhatian: Hewan ternak Anda menunjukkan gejala penyakit tingkat urgensi SEDANG (${diagnosisData.diseaseName}). Tetap pantau secara berkala kondisi fisik dan nafsu makannya, pisahkan sementara jika perlu, dan konsultasikan secara daring dengan dokter hewan.`
                            }
                          </p>
                        </div>
                      </section>

                      {/* TOP 3 DISEASES BY PROBABILITY */}
                      {diagnosisData.predictions && diagnosisData.predictions.length > 0 && (
                        <section className="rounded-3xl border border-[#E5EAE6] bg-white p-6 shadow-sm">
                          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Top 3 Kemungkinan Penyakit Terbesar</p>
                          <div className="grid gap-4">
                            {diagnosisData.predictions.slice(0, 3).map((item, index) => (
                              <div key={item.id || item.name} className="rounded-2xl bg-[#F8FAF8] border border-gray-100 p-5 hover:border-brand-green/30 transition-all">
                                <div className="flex items-start gap-4">
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-base font-extrabold text-brand-green">
                                    {index + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-extrabold text-lg text-primary-dark">{item.name}</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-[#505B53]">{item.description}</p>
                                    
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                                      <span className={`rounded-full px-3 py-1 uppercase tracking-wider ${
                                        item.urgencyLevel === 'HIGH' 
                                          ? 'bg-rose-100 text-rose-800' 
                                          : item.urgencyLevel === 'MEDIUM' 
                                            ? 'bg-amber-100 text-amber-800' 
                                            : 'bg-emerald-100 text-emerald-800'
                                      }`}>
                                        Urgensi: {item.urgencyLevel === 'HIGH' ? 'TINGGI' : item.urgencyLevel === 'MEDIUM' ? 'SEDANG' : 'RENDAH'}
                                      </span>
                                    </div>

                                    <p className="mt-3 text-xs leading-relaxed text-brand-green font-bold">
                                      <span className="text-[#69736C] font-semibold">Penanganan Pertama:</span> {item.handling}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </>
                  );
                })() : isSubmittingReport ? (
                  <div className="rounded-2xl bg-brand-soft p-8 text-center text-sm font-semibold text-brand-green">
                    Menghitung hasil prediksi berdasarkan model screening AI...
                  </div>
                ) : (
                  <div className="rounded-2xl bg-[#FDEBEC] p-5 text-center text-sm font-semibold text-[#912525]">
                    Prediksi tidak dapat dimuat. Silakan periksa koneksi Anda atau coba lagi.
                  </div>
                )}

                {diagnosisError && (
                  <section className="rounded-2xl border border-[#F6CACA] bg-[#FDEBEC] p-5 text-sm font-semibold text-[#912525]">
                    {diagnosisError}
                  </section>
                )}

                <section className="rounded-2xl border border-[#E5EAE6] p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Ringkasan kasus</p>
                  <dl className="grid gap-3 text-sm md:grid-cols-2">
                    <div><dt className="font-bold text-primary-dark">Ternak</dt><dd className="text-[#69736C]">{animal.name} - {animal.species}</dd></div>
                    <div><dt className="font-bold text-primary-dark">Kode ternak</dt><dd className="text-[#69736C]">{selectedBackendAnimal ? getAnimalCode(selectedBackendAnimal) : "Dibuat otomatis setelah laporan"}</dd></div>
                    <div><dt className="font-bold text-primary-dark">Input model</dt><dd className="text-[#69736C]">{species}, {animalAge} bulan</dd></div>
                    <div><dt className="font-bold text-primary-dark">Mulai terlihat</dt><dd className="text-[#69736C]">{startedAt}</dd></div>
                    <div><dt className="font-bold text-primary-dark">Gejala positif</dt><dd className="text-[#69736C]">{positiveSymptomCount} Ya, {possibleSymptomCount} Mungkin</dd></div>
                  </dl>
                  {story && (
                    <div className="mt-4">
                      <p className="font-bold text-primary-dark">Catatan tambahan</p>
                      <p className="mt-2 rounded-xl bg-[#F8FAF8] p-4 text-sm leading-relaxed text-[#505B53]">{story}</p>
                    </div>
                  )}
                </section>

                <section>
                  <h3 className="mb-4 text-xl font-bold text-primary-dark">Pilih dokter hewan</h3>
                  <div className="grid gap-4">
                    {doctors.map((doctor) => {
                      const selected = String(doctor.id || doctor.name) === String(selectedDoctor);
                      return (
                        <button
                          key={doctor.name}
                          type="button"
                          onClick={() => setSelectedDoctor(String(doctor.id || doctor.name))}
                          className={`rounded-2xl border p-5 text-left transition-all ${selected ? "border-brand-green bg-brand-soft" : "border-[#E5EAE6] bg-white hover:border-[#B7DC72]"}`}
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={doctor.photo}
                              alt={`Foto demo ${doctor.name}`}
                              className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <span className="mb-2 inline-flex rounded-full bg-[#FFF7D6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#725300]">{doctor.source === "backend" ? "Data Backend" : "Data Demo"}</span>
                                  <h4 className="font-bold text-primary-dark">{doctor.name}</h4>
                                  <p className="mt-1 text-sm text-[#69736C]">{doctor.expertise}</p>
                                </div>
                                {selected && <span className="text-brand-green"><CheckIcon /></span>}
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#505B53]">
                                <span className="rounded-full bg-white px-3 py-1.5">{doctor.area}</span>
                                <span className="rounded-full bg-white px-3 py-1.5">{doctor.distance}</span>
                                <span className="rounded-full bg-white px-3 py-1.5">{doctor.eta}</span>
                                <span className="rounded-full bg-white px-3 py-1.5">{doctor.visit}</span>
                              </div>
                              <p className="mt-3 text-sm leading-relaxed text-[#69736C]">{doctor.reason}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Draft laporan</p>
          <h2 className="text-xl font-bold text-primary-dark">{animal.name}</h2>
          <p className="mt-1 text-sm text-[#69736C]">{animal.species} | {selectedBackendAnimal ? getAnimalCode(selectedBackendAnimal) : "Kode otomatis"}</p>
          <div className="my-5 h-px bg-[#E5EAE6]" />
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold text-primary-dark">Kondisi terpilih</p>
              <p className="mt-1 text-[#69736C]">{positiveSymptomCount} Ya, {possibleSymptomCount} Mungkin</p>
            </div>
            <div>
              <p className="font-bold text-primary-dark">Data model</p>
              <p className="mt-1 text-[#69736C]">{species}, {animalAge} bulan</p>
            </div>
            <div>
              <p className="font-bold text-primary-dark">Foto</p>
              <p className="mt-1 text-[#69736C]">{photoCount} dari maksimal 3 foto demo</p>
            </div>
            <div className="rounded-xl bg-[#EAF3FB] p-4 text-[#205580]">
              <p className="font-bold">Dibantu Asisten Veternak</p>
              <p className="mt-1 text-xs leading-relaxed">Sistem membantu menyusun laporan, bukan memberi diagnosis.</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5EAE6] bg-white/95 px-4 py-3 backdrop-blur md:left-64">
        <div className="mx-auto flex max-w-6xl gap-3">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
            className="h-12 rounded-xl border border-[#D4DCD6] px-5 text-sm font-bold text-brand-green disabled:cursor-not-allowed disabled:text-[#B6BFB8]"
          >
            Kembali
          </button>
          <button
            type="button"
            disabled={!canContinue || isSubmittingReport}
            onClick={() => {
              if (step < steps.length - 1) {
                setStep((current) => current + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
              }
              submitDiagnosis();
            }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark disabled:cursor-not-allowed disabled:bg-[#F1F3F2] disabled:text-[#8D978F]"
          >
            {step === steps.length - 1 ? (isSubmittingReport ? "Mengirim..." : "Kirim Laporan") : "Lanjutkan"}
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
