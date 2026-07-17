import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { buildDiagnosisPayload, diagnoseAnimal } from "../services/aiDiagnosisService";
import { createAnimal, createConsultation, getAnimalById, getVets } from "../services/farmerCoreService";

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
  "Ceritakan kondisi",
  "Kondisi penting",
  "Foto",
  "Periksa laporan",
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
  const [searchParams] = useSearchParams();
  const animalIdFromQuery = searchParams.get("animalId");
  const [step, setStep] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState(animals[0].id);
  const [species, setSpecies] = useState("sapi");
  const [animalAge, setAnimalAge] = useState(18);
  const [animalCode, setAnimalCode] = useState("Spi-001");
  const [animalStatus, setAnimalStatus] = useState("baru_melahirkan");
  const [isProducingMilk, setIsProducingMilk] = useState("Ya");
  const [recentlyGaveBirth, setRecentlyGaveBirth] = useState("Ya");
  const [startedAt, setStartedAt] = useState("Sejak pagi");
  const [story, setStory] = useState("Sapi saya sejak pagi tidak mau makan, terlihat lemas, dan napasnya lebih cepat.");
  const [symptomAnswers, setSymptomAnswers] = useState({
    lemas: "Mungkin",
    nafsu_makan_turun: "Ya",
    produksi_susu_turun: "Ya",
    batuk_ingus: "Mungkin",
    sesak_napas: "Tidak",
    air_liur_berlebihan: "Ya",
    luka_mulut: "Mungkin",
    diare: "Mungkin",
    perut_kembung: "Ya",
    pincang_sulit_berdiri: "Ya",
    bengkak_luka_benjolan: "Ya",
    ternak_lain_sakit_mirip: "Tidak",
  });
  const [photoCount, setPhotoCount] = useState(1);
  const [backendVets, setBackendVets] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [consultationResult, setConsultationResult] = useState(null);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [diagnosisError, setDiagnosisError] = useState("");
  const [selectedBackendAnimal, setSelectedBackendAnimal] = useState(null);
  const [animalLoadError, setAnimalLoadError] = useState("");
  const lastPredictionKeyRef = useRef("");

  const doctors = useMemo(() => {
    if (!backendVets.length) return fallbackDoctors;

    return backendVets.map((vet) => ({
      id: vet.id,
      name: vet.name,
      expertise: `${vet.experienceYears || 0} tahun pengalaman`,
      area: [vet.district, vet.regency, vet.province].filter(Boolean).join(', ') || 'Area belum diisi',
      distance: vet.distanceKm ? `${vet.distanceKm} km` : 'Jarak belum tersedia',
      eta: vet.canVisit ? 'Kunjungan tersedia' : 'Chat tersedia',
      visit: vet.canVisit ? 'Kunjungan tersedia' : 'Chat dulu',
      photo: vet.profilePicture || 'https://i.pravatar.cc/160?img=47',
      reason: vet.isVerified ? 'Dokter terverifikasi di sistem Veternak.' : 'Data dokter dari backend Veternak.',
      source: 'backend',
    }));
  }, [backendVets]);

  const animal = useMemo(
    () => selectedBackendAnimal || animals.find((item) => item.id === selectedAnimal) || animals[0],
    [selectedAnimal, selectedBackendAnimal],
  );

  useEffect(() => {
    if (!animalIdFromQuery) return;

    let isMounted = true;
    setAnimalLoadError("");
    getAnimalById(animalIdFromQuery)
      .then((response) => {
        if (!isMounted) return;
        const backendAnimal = normalizeAnimal(response);
        setSelectedBackendAnimal(backendAnimal);
        setSpecies(speciesToModelValue(backendAnimal?.species));
        setAnimalAge(getAgeInMonths(backendAnimal?.age));
        setAnimalCode(backendAnimal?.name || getAnimalCode(backendAnimal));
      })
      .catch((error) => {
        if (isMounted) setAnimalLoadError(error?.message || "Gagal memuat data ternak terpilih.");
      });

    return () => {
      isMounted = false;
    };
  }, [animalIdFromQuery]);

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

  const canContinue = step !== 1 || story.trim().length > 12;
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
              Isi informasi utama dalam beberapa langkah. Hasilnya membantu menyusun penilaian awal dan ringkasan untuk dokter hewan.
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
          <div className="mt-3 hidden grid-cols-5 gap-2 text-xs font-bold text-[#69736C] md:grid">
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
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Lengkapi data awal ternak</h2>
              <p className="mb-6 text-sm text-[#69736C]">
                {selectedBackendAnimal
                  ? "Data ternak sudah diambil dari profil, jadi Anda tinggal melengkapi kondisi dan gejalanya."
                  : "Bagian ini mengikuti input model screening agar data penting tidak terlewat."}
              </p>
              {animalLoadError && (
                <div className="mb-5 rounded-2xl border border-[#F6CACA] bg-[#FDEBEC] p-4 text-sm font-semibold text-[#912525]">
                  {animalLoadError}
                </div>
              )}
              <div className="rounded-2xl border border-[#E5EAE6] bg-[#F8FAF8] p-4 text-sm leading-6 text-[#69736C]">
                {selectedBackendAnimal
                  ? `Ternak terpilih: ${selectedBackendAnimal.name} (${getAnimalCode(selectedBackendAnimal)}). Data profil tidak dibuat ulang saat laporan dikirim.`
                  : "Masukkan data ternak yang ingin dilaporkan. Data ini akan dibuat sebagai profil ternak saat laporan dikirim."}
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="species">Jenis ternak</label>
                  <select
                    id="species"
                    value={species}
                    disabled={Boolean(selectedBackendAnimal)}
                    onChange={(event) => setSpecies(event.target.value)}
                    className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none disabled:bg-[#F8FAF8] focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                  >
                    <option value="sapi">Sapi</option>
                    <option value="kerbau">Kerbau</option>
                    <option value="kambing">Kambing</option>
                    <option value="domba">Domba</option>
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="age">Umur ternak (bulan)</label>
                  <input
                    id="age"
                    type="number"
                    min="0"
                    value={animalAge}
                    disabled={Boolean(selectedBackendAnimal)}
                    onChange={(event) => setAnimalAge(event.target.value)}
                    className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none disabled:bg-[#F8FAF8] focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="animalCode">Nama ternak</label>
                  <input
                    id="animalCode"
                    type="text"
                    value={animalCode}
                    disabled={Boolean(selectedBackendAnimal)}
                    onChange={(event) => setAnimalCode(event.target.value)}
                    className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none disabled:bg-[#F8FAF8] focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="animalStatus">Status ternak</label>
                  <select
                    id="animalStatus"
                    value={animalStatus}
                    onChange={(event) => setAnimalStatus(event.target.value)}
                    className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                  >
                    {animalStatuses.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
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
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Ceritakan kondisi dengan bahasa sehari-hari</h2>
              <p className="mb-6 text-sm text-[#69736C]">Tulis apa yang Anda lihat. Informasi ini tidak akan diubah otomatis tanpa Anda periksa.</p>
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="startedAt">Kapan mulai terlihat?</label>
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
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="story">Catatan kondisi</label>
              <textarea
                id="story"
                value={story}
                onChange={(event) => setStory(event.target.value)}
                rows={7}
                className="min-h-40 w-full rounded-2xl border border-[#D4DCD6] bg-white p-4 text-base leading-relaxed outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                placeholder="Contoh: Sapi saya sejak pagi tidak mau makan, terlihat lemas, dan napasnya lebih cepat."
              />
              <div className="mt-3 flex justify-between text-xs text-[#8D978F]">
                <span>Anda tetap bisa melanjutkan meskipun belum tahu semua detail.</span>
                <span>{story.length}/500</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Jawab pertanyaan gejala utama</h2>
              <p className="mb-6 text-sm text-[#69736C]">Pertanyaan ini dibuat sama dengan form screening ML: Tidak, Mungkin, atau Ya.</p>
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

          {step === 3 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Tambahkan foto kondisi ternak</h2>
              <p className="mb-6 text-sm text-[#69736C]">Foto membantu dokter memahami kondisi. Foto tidak digunakan untuk diagnosis otomatis.</p>
              <div className="rounded-[2rem] border-2 border-dashed border-[#D4DCD6] bg-[#F8FAF8] p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">+</div>
                <h3 className="text-lg font-bold text-primary-dark">Upload foto demo</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#69736C]">Untuk MVP ini, tombol menambah jumlah foto demo. Pada backend nanti, area ini dapat diganti dengan upload asli.</p>
                <button
                  type="button"
                  onClick={() => setPhotoCount((count) => Math.min(count + 1, 3))}
                  className="mt-5 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white"
                >
                  Tambah Foto Demo
                </button>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {Array.from({ length: photoCount }).map((_, index) => (
                  <div key={index} className="aspect-square rounded-2xl border border-[#E5EAE6] bg-brand-soft p-3">
                    <div className="flex h-full items-center justify-center rounded-xl bg-white text-sm font-bold text-brand-green">Foto {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-primary-dark">Periksa laporan sebelum dikirim</h2>
              <p className="mb-6 text-sm text-[#69736C]">Ringkasan ini disusun dari jawaban Anda. Dokter tetap menjadi pihak yang menilai kondisi medis.</p>

              <div className="space-y-5">
                <section className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Prediksi penyakit ternak</p>
                  <h3 className="text-3xl font-bold text-primary-dark">
                    {isSubmittingReport ? "Memuat prediksi..." : diagnosisData?.diseaseName || "Belum ada prediksi"}
                  </h3>
                  {diagnosisData?.simpleDiseaseName && (
                    <p className="mt-2 text-base font-bold text-orange-700">{diagnosisData.simpleDiseaseName}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-[#505B53]">
                    {diagnosisData?.description || (isSubmittingReport ? "Backend sedang menghitung prediksi dari gejala yang Anda isi." : "Prediksi belum tersedia. Pastikan sudah login dan backend berjalan.")}
                  </p>
                  {diagnosisData?.urgencyLevel && (
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#505B53]">
                      <span className="rounded-full bg-white px-3 py-1.5">Urgensi: {diagnosisData.urgencyLevel}</span>
                      <span className="rounded-full bg-white px-3 py-1.5">Sumber: {diagnosisData.predictionSource}</span>
                    </div>
                  )}
                  <p className="mt-4 text-xs font-semibold text-orange-700">
                    Hasil ini adalah prediksi awal berdasarkan gejala, bukan diagnosis final dokter hewan.
                  </p>
                </section>

                {diagnosisData?.predictions?.length > 0 && (
                  <section className="rounded-2xl border border-[#E5EAE6] p-5">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Kemungkinan penyakit teratas</p>
                    <div className="grid gap-3">
                      {diagnosisData.predictions.slice(0, 3).map((item, index) => (
                        <div key={item.id || item.name} className="rounded-xl bg-[#F8FAF8] p-4">
                          <div className="flex items-start gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand-green">{index + 1}</span>
                            <div>
                              <h4 className="font-bold text-primary-dark">{item.name}</h4>
                              <p className="mt-1 text-sm leading-6 text-[#69736C]">{item.description}</p>
                              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-700">Urgensi {item.urgencyLevel}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="rounded-2xl border border-[#E5EAE6] p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Ringkasan kasus</p>
                  <dl className="grid gap-3 text-sm md:grid-cols-2">
                    <div><dt className="font-bold text-primary-dark">Ternak</dt><dd className="text-[#69736C]">{animal.name} - {animal.species}</dd></div>
                    <div><dt className="font-bold text-primary-dark">Kode ternak</dt><dd className="text-[#69736C]">{selectedBackendAnimal ? getAnimalCode(selectedBackendAnimal) : "Dibuat otomatis setelah laporan dikirim"}</dd></div>
                    <div><dt className="font-bold text-primary-dark">Input model</dt><dd className="text-[#69736C]">{species}, {animalAge} bulan, {animalStatus}</dd></div>
                    <div><dt className="font-bold text-primary-dark">Mulai terlihat</dt><dd className="text-[#69736C]">{startedAt}</dd></div>
                    <div><dt className="font-bold text-primary-dark">Foto</dt><dd className="text-[#69736C]">{photoCount} foto demo</dd></div>
                    <div><dt className="font-bold text-primary-dark">Risiko penularan awal</dt><dd className="text-[#69736C]">Sedang, perlu pemisahan sementara</dd></div>
                    <div><dt className="font-bold text-primary-dark">Gejala model</dt><dd className="text-[#69736C]">{positiveSymptomCount} Ya, {possibleSymptomCount} Mungkin</dd></div>
                  </dl>
                  <div className="mt-4">
                    <p className="font-bold text-primary-dark">Catatan asli</p>
                    <p className="mt-2 rounded-xl bg-[#F8FAF8] p-4 text-sm leading-relaxed text-[#505B53]">{story}</p>
                  </div>
                  <details className="mt-4 rounded-xl bg-[#F8FAF8] p-4">
                    <summary className="cursor-pointer text-sm font-bold text-brand-green">Data input yang dikirim ke model</summary>
                    <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed text-[#505B53]">
                      {JSON.stringify(diagnosisPayload, null, 2)}
                    </pre>
                  </details>
                </section>

                {diagnosisData?.aiDiagnosisSummary && (
                  <section className="rounded-2xl border border-[#E5EAE6] p-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Ringkasan penilaian awal</p>
                    <pre className="whitespace-pre-wrap text-sm leading-6 text-[#505B53]">{diagnosisData.aiDiagnosisSummary}</pre>
                  </section>
                )}

                {diagnosisError && (
                  <section className="rounded-2xl border border-[#F6CACA] bg-[#FDEBEC] p-5 text-sm font-semibold text-[#912525]">
                    {diagnosisError}
                  </section>
                )}

                <section className="rounded-2xl border border-[#E5EAE6] p-5">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Tindakan aman sementara</p>
                  <div className="grid gap-3">
                    {["Pisahkan dari kelompok sementara.", "Pastikan air bersih tersedia.", "Catat perubahan kondisi setiap 30-60 menit."].map((item) => (
                      <div key={item} className="flex gap-3 rounded-xl bg-brand-soft p-3 text-sm font-semibold text-primary-dark">
                        <span className="text-brand-green"><CheckIcon /></span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-[#FDEBEC] p-4 text-sm font-semibold text-[#912525]">
                    Jangan memberi obat, antibiotik, atau dosis apa pun tanpa arahan dokter hewan.
                  </div>
                </section>

                {consultationResult?.consultation && (
                  <section className="rounded-2xl border border-[#CFE8D4] bg-[#EEF8F0] p-5 text-sm font-semibold text-[#1D5937]">
                    Konsultasi berhasil dibuat. ID kasus: #{consultationResult.consultation.id}
                  </section>
                )}

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
              <p className="mt-1 text-[#69736C]">{species}, {animalAge} bulan, {animalStatus}</p>
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
