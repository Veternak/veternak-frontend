import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimals } from "../services/farmerCoreService";

export default function AnimalList() {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAnimals()
      .then((response) => {
        setAnimals(response?.data?.animals || []);
        setError("");
      })
      .catch((err) => {
        setError(err?.message || "Gagal memuat data ternak.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getStatusColor = () => "bg-green-100 text-green-700";
  const getSpeciesIcon = (species) => String(species || "").toLowerCase().includes("kambing") ? "K" : "S";
  const getAnimalCode = (animal) => animal?.id ? `TRN-${String(animal.id).slice(0, 8).toUpperCase()}` : "Kode otomatis";

  return (
    <div className="p-6 md:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary-dark">Ternak Saya</h2>
          <p className="text-sm text-gray-500">Total {animals.length} ekor ternak terdaftar</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/peternak/ternak/tambah")}
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
            onClick={() => navigate("/peternak/ternak/tambah")}
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
    </div>
  );
}
