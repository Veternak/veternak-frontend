import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFarmerDisplayName } from '../services/farmerAuthService';
import { getAnimals, createAnimal } from '../services/farmerCoreService';

const speciesOptions = ["Sapi", "Kerbau", "Kambing", "Domba"];
const genderOptions = [
  { value: "MALE", label: "Jantan" },
  { value: "FEMALE", label: "Betina" },
];

function getAnimalCode(animal) {
  if (!animal?.id) return 'Kode otomatis';
  return `TRN-${String(animal.id).slice(0, 8).toUpperCase()}`;
}

function getSpeciesIcon(species) {
  const value = String(species || '').toLowerCase();
  if (value.includes('kambing')) return 'K';
  if (value.includes('domba')) return 'D';
  if (value.includes('kerbau')) return 'B';
  return 'S';
}

export default function FarmerHome({ onLapor }) {
  const navigate = useNavigate();
  const farmerName = getFarmerDisplayName();
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    species: "Sapi",
    age: "",
    gender: "MALE",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const loadAnimals = () => {
    setIsLoading(true);
    getAnimals()
      .then((response) => {
        setAnimals(response?.data?.animals || []);
        setError('');
      })
      .catch((err) => setError(err?.message || 'Gagal memuat data ternak.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  const stats = useMemo(() => [
    { label: 'Ternak', value: animals.length, tone: 'text-emerald-700 bg-emerald-50' },
    { label: 'Kasus', value: 0, tone: 'text-amber-700 bg-amber-50' },
    { label: 'Dokter', value: 0, tone: 'text-rose-700 bg-rose-50' },
  ], [animals.length]);

  const handleOpenModal = () => {
    setForm({ name: "", species: "Sapi", age: "", gender: "MALE" });
    setErrors({});
    setSubmitError("");
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleFieldChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Nama ternak wajib diisi.";
    }
    if (!form.species) {
      nextErrors.species = "Jenis ternak wajib diisi.";
    }
    if (!form.gender) {
      nextErrors.gender = "Jenis kelamin wajib diisi.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    setSubmitError("");

    try {
      await createAnimal({
        name: form.name.trim(),
        species: form.species,
        age: form.age.trim() || null,
        gender: form.gender,
      });
      setShowAddModal(false);
      loadAnimals();
    } catch (err) {
      setSubmitError(err?.message || "Gagal menyimpan data ternak.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10 relative">
      <section className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-green">Beranda</p>
            <h1 className="mt-1 text-2xl sm:text-4xl font-bold text-primary-dark">
              Selamat datang, <span className="text-brand-green">{farmerName}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C]">
              Pantau ternak, buat laporan kesehatan, dan lanjutkan konsultasi dokter dari satu dashboard.
            </p>
          </div>
          <button
            type="button"
            onClick={onLapor}
            className="min-h-12 rounded-xl bg-brand-lime px-6 text-sm font-bold text-primary-dark hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Laporkan Gejala
          </button>
        </div>
      </section>

      {/* 2. STATS - Fixed overflow by using w-full */}
      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#E5EAE6] bg-white p-3 sm:p-5 shadow-sm text-center">
            <p className="text-[9px] sm:text-xs font-bold uppercase text-[#8D978F]">{item.label}</p>
            <p className={`mt-2 inline-flex w-full justify-center rounded-lg py-1 text-lg sm:text-2xl font-black ${item.tone}`}>
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        
        {/* 3. TERNAK SAYA - The Slider Fix */}
        <div className="rounded-3xl border border-[#E5EAE6] bg-white p-5 sm:p-8 shadow-sm min-w-0">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary-dark">Ternak Saya</h2>
            <button
              type="button"
              onClick={handleOpenModal}
              className="min-h-11 rounded-xl bg-brand-green px-5 text-sm font-bold text-white hover:scale-105 active:scale-95 transition-all"
            >
              + Tambah
            </button>
          </div>

          {isLoading && <p className="rounded-2xl bg-[#F8FAF8] p-5 text-sm font-semibold text-[#69736C]">Memuat data ternak...</p>}
          {!isLoading && error && <p className="rounded-2xl bg-[#FDEBEC] p-5 text-sm font-semibold text-[#912525]">{error}</p>}
          {!isLoading && !error && animals.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D4DCD6] bg-[#F8FAF8] p-8 text-center animate-fade-in">
              <h3 className="text-lg font-bold text-primary-dark">Belum ada ternak</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#69736C]">Tambahkan ternak pertama agar bisa dipakai saat membuat laporan kondisi.</p>
              <button
                type="button"
                onClick={handleOpenModal}
                className="mt-5 rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark"
              >
                Tambah Ternak Pertama
              </button>
            </div>
          )}
          {!isLoading && !error && animals.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-[#F8FAF8] shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E5EAE6] bg-[#EEF2EE] text-primary-dark font-bold">
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider">No</th>
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider">Nama</th>
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider">Spesies</th>
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider">Jenis Kelamin</th>
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider">Umur</th>
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {animals.map((animal, index) => (
                    <tr key={animal.id} className="border-b border-[#E5EAE6] last:border-b-0 hover:bg-white transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-500">{index + 1}</td>
                      <td className="py-3.5 px-4 font-bold text-primary-dark">{animal.name}</td>
                      <td className="py-3.5 px-4 text-[#505B53]">{animal.species}</td>
                      <td className="py-3.5 px-4 text-[#505B53]">{animal.gender === 'MALE' ? 'Jantan' : 'Betina'}</td>
                      <td className="py-3.5 px-4 text-[#505B53]">{animal.age || 'Belum diisi'}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => navigate(`/peternak/ternak/${animal.id}`)}
                          className="rounded-xl bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand-green hover:bg-brand-green hover:text-white transition-colors cursor-pointer"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 4. AKSI CEPAT & CATATAN - Fixed with responsive grid */}
        <aside className="space-y-4 min-w-0">
          <div className="rounded-3xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-primary-dark mb-4">Aksi cepat</h2>
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-2">
              <button onClick={onLapor} className="h-10 rounded-xl bg-brand-lime text-[10px] sm:text-sm font-bold text-primary-dark">Lapor</button>
              <button onClick={() => navigate('/peternak/konsultasi')} className="h-10 rounded-xl border border-gray-100 text-[10px] sm:text-sm font-bold text-brand-green">Konsultasi</button>
              <button onClick={() => navigate('/peternak/marketplace')} className="h-10 rounded-xl border border-gray-100 text-[10px] sm:text-sm font-bold text-brand-green">Toko</button>
            </div>
          </div>
          
          <div className="rounded-3xl bg-[#EAF3FB] p-5 border border-blue-50">
            <p className="font-bold text-sm text-[#205580]">Catatan</p>
            <p className="mt-1 text-[10px] leading-relaxed text-[#205580]/70 truncate sm:whitespace-normal">
              Status kasus aktif akan tampil di sini.
            </p>
          </div>
        </aside>

      </section>

      {/* Tambah Ternak Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2.5rem] bg-white p-6 shadow-2xl border border-gray-100 md:p-8 animate-fade-in text-left">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Profil ternak</p>
                <h3 className="text-2xl font-extrabold text-primary-dark">Tambah Ternak Baru</h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 font-extrabold text-gray-500 hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="rounded-xl bg-[#FDEBEC] p-3 text-xs font-semibold text-[#912525]">
                  {submitError}
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs font-bold text-primary-dark" htmlFor="homeAnimalName">Nama Ternak</label>
                <input
                  id="homeAnimalName"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="Contoh: Si Putih"
                  className="h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green"
                />
                {errors.name && <p className="mt-1 text-xs font-semibold text-[#912525]">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-bold text-primary-dark" htmlFor="homeSpecies">Jenis Ternak</label>
                  <select
                    id="homeSpecies"
                    value={form.species}
                    onChange={(e) => handleFieldChange("species", e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green"
                  >
                    {speciesOptions.map((species) => (
                      <option key={species}>{species}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-primary-dark" htmlFor="homeAge">Umur Estimasi</label>
                  <input
                    id="homeAge"
                    type="text"
                    value={form.age}
                    onChange={(e) => handleFieldChange("age", e.target.value)}
                    placeholder="Contoh: 18 bulan"
                    className="h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold text-primary-dark">Jenis Kelamin</span>
                <div className="grid grid-cols-2 gap-3">
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange("gender", option.value)}
                      className={`h-11 rounded-xl border text-xs font-bold transition-all ${
                        form.gender === option.value
                          ? "border-brand-green bg-brand-soft text-brand-green"
                          : "border-[#D4DCD6] text-[#505B53] hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="min-h-11 rounded-xl border border-[#D4DCD6] px-5 text-sm font-bold text-brand-green"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="min-h-11 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark disabled:opacity-60"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Ternak"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}