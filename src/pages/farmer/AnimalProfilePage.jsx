import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAnimal, getAnimalById, updateAnimal } from "../../services/farmerCoreService";

const speciesOptions = ["Sapi", "Kerbau", "Kambing", "Domba"];
const genderOptions = [
  { value: "MALE", label: "Jantan" },
  { value: "FEMALE", label: "Betina" },
];

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

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function getGenderLabel(value) {
  return genderOptions.find((option) => option.value === value)?.label || value || "-";
}

function getAnimalCode(animal) {
  if (!animal?.id) return "-";
  return `TRN-${String(animal.id).slice(0, 8).toUpperCase()}`;
}

function normalizeAnimal(data) {
  return data?.data?.animal || data?.animal || data;
}

export default function AnimalProfilePage() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [form, setForm] = useState({ name: "", species: "Sapi", age: "", gender: "MALE" });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAnimal() {
      setIsLoading(true);
      setError("");
      try {
        const response = await getAnimalById(animalId);
        const data = normalizeAnimal(response);
        if (!isMounted) return;
        setAnimal(data);
        setForm({
          name: data?.name || "",
          species: data?.species || "Sapi",
          age: data?.age || "",
          gender: ["MALE", "FEMALE"].includes(data?.gender) ? data.gender : "MALE",
        });
      } catch (err) {
        if (isMounted) setError(err?.message || "Gagal memuat profil ternak.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadAnimal();
    return () => {
      isMounted = false;
    };
  }, [animalId]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.age.trim()) {
      setError("Nama dan umur ternak wajib diisi.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const response = await updateAnimal(animalId, {
        name: form.name.trim(),
        species: form.species,
        age: form.age.trim(),
        gender: form.gender,
      });
      const updated = normalizeAnimal(response);
      setAnimal(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err?.message || "Gagal memperbarui data ternak.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Hapus ternak ini dari data Anda?");
    if (!confirmed) return;

    setIsDeleting(true);
    setError("");
    try {
      await deleteAnimal(animalId);
      navigate("/peternak/dashboard");
    } catch (err) {
      setError(err?.message || "Gagal menghapus data ternak.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#E5EAE6] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-[#69736C]">Memuat profil ternak...</p>
      </section>
    );
  }

  if (error && !animal) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#E5EAE6] bg-white p-8 shadow-sm">
        <Link to="/peternak" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
          <ArrowLeftIcon />
          Kembali ke daftar ternak
        </Link>
        <h1 className="text-3xl font-bold text-primary-dark">Profil ternak tidak ditemukan</h1>
        <p className="mt-3 text-[#69736C]">{error}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl pb-10">
      <Link to="/peternak" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
        <ArrowLeftIcon />
        Kembali ke daftar ternak
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[1.5rem] bg-brand-soft text-5xl font-bold text-brand-green">
                {(animal?.species || "T").slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-[#E8F5EC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1D5937]">
                    Terdaftar
                  </span>
                  <span className="inline-flex rounded-full bg-[#F1F3F5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
                    {getAnimalCode(animal)}
                  </span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">{animal?.name}</h1>
                <p className="mt-2 text-base font-semibold text-[#505B53]">{animal?.species} | {getGenderLabel(animal?.gender)}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C]">
                  Profil ini memakai data dari backend. Riwayat konsultasi dan rekam medis akan muncul saat endpoint terkait sudah tersedia untuk ternak ini.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl bg-[#FDEBEC] p-4 text-sm font-semibold text-[#912525]">
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Umur", animal?.age],
              ["Kelamin", getGenderLabel(animal?.gender)],
              ["Update", formatDate(animal?.updatedAt)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{label}</p>
                <p className="mt-2 text-xl font-bold text-primary-dark">{value || "-"}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSave} className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary-dark">Informasi ternak</h2>
                <p className="mt-1 text-sm text-[#69736C]">Edit data dasar yang tersimpan di backend.</p>
              </div>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="min-h-11 rounded-xl border border-[#D4DCD6] px-5 text-sm font-bold text-brand-green"
                >
                  Edit Data
                </button>
              )}
            </div>

            <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <label className="block">
                <span className="font-bold text-primary-dark">Nama</span>
                <input
                  type="text"
                  value={form.name}
                  disabled={!isEditing}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="mt-2 h-[48px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none disabled:bg-[#F8FAF8] focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                />
              </label>
              <label className="block">
                <span className="font-bold text-primary-dark">Jenis</span>
                <select
                  value={form.species}
                  disabled={!isEditing}
                  onChange={(event) => updateField("species", event.target.value)}
                  className="mt-2 h-[48px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none disabled:bg-[#F8FAF8] focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                >
                  {speciesOptions.map((species) => (
                    <option key={species}>{species}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="font-bold text-primary-dark">Umur</span>
                <input
                  type="text"
                  value={form.age}
                  disabled={!isEditing}
                  onChange={(event) => updateField("age", event.target.value)}
                  placeholder="Contoh: 18 bulan"
                  className="mt-2 h-[48px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none disabled:bg-[#F8FAF8] focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                />
              </label>
              <label className="block">
                <span className="font-bold text-primary-dark">Jenis kelamin</span>
                <select
                  value={form.gender}
                  disabled={!isEditing}
                  onChange={(event) => updateField("gender", event.target.value)}
                  className="mt-2 h-[48px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none disabled:bg-[#F8FAF8] focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <div>
                <p className="font-bold text-primary-dark">Dibuat</p>
                <p className="mt-2 text-[#69736C]">{formatDate(animal?.createdAt)}</p>
              </div>
              <div>
                <p className="font-bold text-primary-dark">Diperbarui</p>
                <p className="mt-2 text-[#69736C]">{formatDate(animal?.updatedAt)}</p>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ name: animal?.name || "", species: animal?.species || "Sapi", age: animal?.age || "", gender: animal?.gender || "MALE" });
                  }}
                  className="min-h-11 rounded-xl border border-[#D4DCD6] px-5 text-sm font-bold text-brand-green"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="min-h-11 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            )}
          </form>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Riwayat kesehatan</h2>
            <p className="mt-2 rounded-2xl bg-[#F8FAF8] p-5 text-sm text-[#69736C]">
              Belum ada riwayat konsultasi atau rekam medis dari backend untuk ternak ini.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-primary-dark">Aksi cepat</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#69736C]">Gunakan profil ini sebagai konteks saat membuat laporan kondisi baru.</p>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={() => navigate(`/peternak/lapor?animalId=${animal?.id}`)}
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
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="min-h-12 rounded-xl border border-[#F0C7C7] bg-white px-5 text-sm font-bold text-[#912525] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Menghapus..." : "Hapus Ternak"}
            </button>
          </div>

          <div className="mt-5 rounded-2xl bg-[#EAF3FB] p-4 text-sm text-[#205580]">
            <p className="flex items-center gap-2 font-bold"><CheckIcon /> Catatan keamanan</p>
            <p className="mt-2 leading-relaxed">Diagnosis dan resep hanya dicatat dari dokter hewan. Prediksi awal tetap perlu ditinjau oleh dokter.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
