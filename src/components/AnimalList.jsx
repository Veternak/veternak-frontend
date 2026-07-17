import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimals, createAnimal } from "../services/farmerCoreService";

const speciesOptions = ["Sapi", "Kerbau", "Kambing", "Domba"];
const genderOptions = [
  { value: "MALE", label: "Jantan" },
  { value: "FEMALE", label: "Betina" },
];

export default function AnimalList() {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError("");
      })
      .catch((err) => {
        setError(err?.message || "Gagal memuat data ternak.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  const getStatusColor = () => "bg-green-100 text-green-700";
  const getSpeciesIcon = (species) => String(species || "").toLowerCase().includes("kambing") ? "K" : "S";
  const getAnimalCode = (animal) => animal?.id ? `TRN-${String(animal.id).slice(0, 8).toUpperCase()}` : "Kode otomatis";

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
    <div className="p-6 md:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative">
      <div className="flex justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary-dark">Ternak Saya</h2>
          <p className="text-sm text-gray-500">Total {animals.length} ekor ternak terdaftar</p>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="bg-brand-green text-white px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-green/20"
        >
          + Tambah Ternak
        </button>
      </div>

      {isLoading && <p className="rounded-2xl bg-neutral-bg p-6 text-sm font-semibold text-gray-500">Memuat data ternak...</p>}

      {!isLoading && error && (
        <p className="rounded-2xl bg-red-50 p-6 text-sm font-semibold text-red-700">{error}</p>
      )}

      {!isLoading && !error && animals.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-neutral-bg p-8 text-center">
          <h3 className="text-xl font-bold text-primary-dark">Belum ada ternak</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Data ternak akan kosong sampai Anda menambahkan ternak sendiri.
          </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <button
              key={animal.id}
              type="button"
              onClick={() => navigate(`/peternak/ternak/${animal.id}`)}
              className="p-6 bg-neutral-bg rounded-3xl border border-transparent hover:border-brand-green/20 hover:bg-white hover:shadow-xl transition-all group cursor-pointer text-left"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl font-bold text-brand-green shadow-sm">
                  {getSpeciesIcon(animal.species)}
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor()}`}>
                  Terdaftar
                </span>
              </div>

              <h3 className="text-lg font-bold text-primary-dark group-hover:text-brand-green transition-colors">{animal.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{animal.species} - {animal.age || "Umur belum diisi"}</p>

              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-[10px] text-gray-400">{getAnimalCode(animal)}</span>
                <span className="text-brand-green text-xs font-bold">Lihat Detail</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Tambah Ternak Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2.5rem] bg-white p-6 shadow-2xl border border-gray-100 md:p-8 animate-fade-in">
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
                <label className="mb-2 block text-xs font-bold text-primary-dark" htmlFor="modalAnimalName">Nama Ternak</label>
                <input
                  id="modalAnimalName"
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
                  <label className="mb-2 block text-xs font-bold text-primary-dark" htmlFor="modalSpecies">Jenis Ternak</label>
                  <select
                    id="modalSpecies"
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
                  <label className="mb-2 block text-xs font-bold text-primary-dark" htmlFor="modalAge">Umur Estimasi</label>
                  <input
                    id="modalAge"
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
