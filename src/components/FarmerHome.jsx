import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFarmerDisplayName } from '../services/farmerAuthService';
import { getAnimals } from '../services/farmerCoreService';

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

  useEffect(() => {
    getAnimals()
      .then((response) => {
        setAnimals(response?.data?.animals || []);
        setError('');
      })
      .catch((err) => setError(err?.message || 'Gagal memuat data ternak.'))
      .finally(() => setIsLoading(false));
  }, []);

  const stats = useMemo(() => [
    { label: 'Ternak', value: animals.length, tone: 'text-emerald-700 bg-emerald-50' },
    { label: 'Kasus', value: 0, tone: 'text-amber-700 bg-amber-50' },
    { label: 'Dokter', value: 0, tone: 'text-rose-700 bg-rose-50' },
  ], [animals.length]);

  return (
    // Added overflow-x-hidden to the main container to stop the whole page from wiggling
    <div className="mx-auto max-w-6xl space-y-5 pb-24 sm:pb-10 px-4 sm:px-0 overflow-x-hidden">
      
      {/* 1. GREETING */}
      <section className="rounded-3xl border border-[#E5EAE6] bg-white p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-green">Beranda</p>
            <h1 className="mt-1 text-2xl sm:text-4xl font-bold text-primary-dark">
              Selamat datang, <span className="text-brand-green">{farmerName}</span>
            </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C]">
              Pantau ternak, buat laporan kondisi, dan lanjutkan konsultasi dokter dari satu dashboard.
            </p>
          </div>
          <button
            type="button"
            onClick={onLapor}
            className="h-12 rounded-xl bg-brand-lime px-6 text-sm font-bold text-primary-dark shadow-md"
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
              onClick={() => navigate('/peternak/ternak/tambah')}
              className="text-[10px] font-bold text-brand-green bg-brand-soft px-3 py-1.5 rounded-lg"
            >
              + Tambah
            </button>
          </div>

          {!isLoading && animals.length > 0 && (
            <div className="flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory">
              {animals.map((animal) => (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => navigate(`/peternak/ternak/${animal.id}`)}
                  // Added shrink-0 so the card doesn't squish, and reduced width to 220px for mobile
                  className="min-w-[220px] sm:min-w-0 shrink-0 snap-start rounded-2xl border border-[#E5EAE6] bg-[#F8FAF8] p-4 text-left transition hover:border-brand-green"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-brand-green shadow-sm border border-gray-100">
                      {getSpeciesIcon(animal.species)}
                    </div>
                    <span className="rounded-full bg-[#E8F5EC] px-2 py-0.5 text-[8px] font-bold uppercase text-[#1D5937]">Aktif</span>
                  </div>
                  <h3 className="font-bold text-sm text-primary-dark truncate">{animal.name}</h3>
                  <p className="text-[10px] text-[#69736C]">{animal.species}</p>
                  <p className="mt-4 border-t border-[#E5EAE6]/60 pt-2 text-[9px] font-bold text-[#8D978F]">{getAnimalCode(animal)}</p>
                </button>
              ))}
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
    </div>
  );
}