import { useNavigate } from "react-router-dom";
import { demoAnimals } from "../data/demoAnimals";

export default function AnimalList() {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === "Sehat") return "bg-green-100 text-green-700";
    if (status === "Perlu Dipantau") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="p-6 md:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary-dark">Ternak Saya</h2>
          <p className="text-sm text-gray-500">Total 12 ekor ternak terdaftar</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/peternak/ternak/tambah")}
          className="bg-brand-green text-white px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-green/20"
        >
          + Tambah Ternak
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoAnimals.map((animal) => (
          <button
            key={animal.id}
            type="button"
            onClick={() => navigate(`/peternak/ternak/${animal.id}`)}
            className="p-6 bg-neutral-bg rounded-3xl border border-transparent hover:border-brand-green/20 hover:bg-white hover:shadow-xl transition-all group cursor-pointer text-left"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                {animal.species === "Kambing" ? "🐐" : "🐄"}
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor(animal.status)}`}>
                {animal.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-primary-dark group-hover:text-brand-green transition-colors">{animal.name}</h3>
            <p className="text-xs text-gray-500 mb-4">{animal.breed} • {animal.id}</p>
            
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-[10px] text-gray-400">Update: {animal.lastUpdate}</span>
              <span className="text-brand-green text-xs font-bold">Lihat Detail →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
