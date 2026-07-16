import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const speciesOptions = ["Sapi", "Kerbau", "Kambing", "Domba"];
const genderOptions = [
  { value: "MALE", label: "Jantan" },
  { value: "FEMALE", label: "Betina" },
  { value: "UNKNOWN", label: "Belum tahu" },
];

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AddAnimalPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    species: "Sapi",
    ageValue: "",
    ageUnit: "bulan",
    gender: "UNKNOWN",
    code: "",
    stall: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim() && !form.code.trim()) {
      nextErrors.name = "Isi nama atau kode ternak.";
    }
    if (!form.ageValue || Number(form.ageValue) <= 0) {
      nextErrors.ageValue = "Isi umur estimasi ternak.";
    }
    if (!form.species) {
      nextErrors.species = "Pilih jenis ternak.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-5xl pb-10">
      <Link to="/peternak/ternak" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand-green">
        <ArrowLeftIcon />
        Kembali ke daftar ternak
      </Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Profil ternak</p>
          <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">Tambah ternak baru</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#69736C]">
            Data dasar ini mengikuti tabel `Animal` pada rancangan backend: nama, jenis, umur, dan jenis kelamin.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="animalName">Nama ternak</label>
              <input
                id="animalName"
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Contoh: Si Putih"
                className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              />
              {errors.name && <p className="mt-2 text-sm font-semibold text-[#912525]">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="animalCode">Kode ternak</label>
              <input
                id="animalCode"
                type="text"
                value={form.code}
                onChange={(event) => updateField("code", event.target.value)}
                placeholder="Contoh: Spi-006"
                className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="species">Jenis ternak</label>
              <select
                id="species"
                value={form.species}
                onChange={(event) => updateField("species", event.target.value)}
                className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              >
                {speciesOptions.map((species) => (
                  <option key={species}>{species}</option>
                ))}
              </select>
              {errors.species && <p className="mt-2 text-sm font-semibold text-[#912525]">{errors.species}</p>}
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="ageValue">Umur estimasi</label>
              <input
                id="ageValue"
                type="number"
                min="1"
                value={form.ageValue}
                onChange={(event) => updateField("ageValue", event.target.value)}
                placeholder="18"
                className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              />
              {errors.ageValue && <p className="mt-2 text-sm font-semibold text-[#912525]">{errors.ageValue}</p>}
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="ageUnit">Satuan umur</label>
              <select
                id="ageUnit"
                value={form.ageUnit}
                onChange={(event) => updateField("ageUnit", event.target.value)}
                className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              >
                <option>bulan</option>
                <option>tahun</option>
              </select>
            </div>

            <fieldset className="md:col-span-2">
              <legend className="mb-3 text-sm font-bold text-primary-dark">Jenis kelamin</legend>
              <div className="grid gap-3 md:grid-cols-3">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("gender", option.value)}
                    className={`min-h-12 rounded-xl border px-4 text-sm font-bold ${
                      form.gender === option.value ? "border-brand-green bg-brand-soft text-brand-green" : "border-[#D4DCD6] text-[#505B53]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="stall">Lokasi kandang</label>
              <input
                id="stall"
                type="text"
                value={form.stall}
                onChange={(event) => updateField("stall", event.target.value)}
                placeholder="Contoh: Kandang Utara"
                className="h-[52px] w-full rounded-xl border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-bold text-primary-dark" htmlFor="notes">Catatan opsional</label>
              <textarea
                id="notes"
                rows={4}
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Contoh: baru dibeli, perlu vaksin ulang bulan depan."
                className="w-full rounded-2xl border border-[#D4DCD6] bg-white p-4 text-sm leading-relaxed outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
            <button
              type="button"
              onClick={() => navigate("/peternak/ternak")}
              className="min-h-12 rounded-xl border border-[#D4DCD6] px-5 text-sm font-bold text-brand-green"
            >
              Batal
            </button>
            <button
              type="submit"
              className="min-h-12 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark"
            >
              Simpan Ternak Demo
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">Ringkasan</p>
          <h2 className="text-xl font-bold text-primary-dark">Profil ternak baru</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#69736C]">
            Setelah disimpan, ternak ini akan muncul di daftar ternak dan bisa dipilih saat membuat laporan kondisi.
          </p>

          {submitted && (
            <div className="mt-5 rounded-2xl bg-brand-soft p-4 text-sm text-brand-green">
              <p className="font-bold">Ternak demo siap disimpan</p>
              <p className="mt-1 leading-relaxed">Integrasi penyimpanan ke backend bisa ditambahkan saat endpoint Animal sudah siap.</p>
              <button
                type="button"
                onClick={() => navigate("/peternak/ternak")}
                className="mt-4 min-h-11 w-full rounded-xl bg-brand-green px-4 text-sm font-bold text-white"
              >
                Kembali ke Daftar Ternak
              </button>
            </div>
          )}

          <p className="mt-5 text-xs leading-relaxed text-[#8D978F]">
            Field waktu pembuatan dan pembaruan sebaiknya dibuat oleh backend.
          </p>
        </aside>
      </div>
    </section>
  );
}
