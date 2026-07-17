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
    { label: 'Ternak aktif', value: animals.length, tone: 'text-emerald-700 bg-emerald-50' },
    { label: 'Kasus aktif', value: 0, tone: 'text-amber-700 bg-amber-50' },
    { label: 'Perlu dokter', value: 0, tone: 'text-rose-700 bg-rose-50' },
  ], [animals.length]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      <section className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Beranda peternak</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-primary-dark md:text-4xl">
              Selamat datang, <span className="text-brand-green">{farmerName}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#69736C]">
              Pantau ternak, buat laporan kondisi, dan lanjutkan konsultasi dokter dari satu dashboard.
            </p>
          </div>
          <button
            type="button"
            onClick={onLapor}
            className="min-h-12 rounded-xl bg-brand-lime px-6 text-sm font-bold text-primary-dark"
          >
            Laporkan Gejala
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{item.label}</p>
            <p className={`mt-3 inline-flex min-w-14 justify-center rounded-xl px-4 py-2 text-2xl font-black ${item.tone}`}>
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary-dark">Ternak Saya</h2>
              <p className="mt-1 text-sm text-[#69736C]">Data diambil dari backend sesuai akun yang login.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/peternak/ternak/tambah')}
              className="min-h-11 rounded-xl bg-brand-green px-5 text-sm font-bold text-white"
            >
              Tambah Ternak
            </button>
          </div>

          {isLoading && <p className="rounded-2xl bg-[#F8FAF8] p-5 text-sm font-semibold text-[#69736C]">Memuat data ternak...</p>}
          {!isLoading && error && <p className="rounded-2xl bg-[#FDEBEC] p-5 text-sm font-semibold text-[#912525]">{error}</p>}
          {!isLoading && !error && animals.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D4DCD6] bg-[#F8FAF8] p-8 text-center">
              <h3 className="text-lg font-bold text-primary-dark">Belum ada ternak</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#69736C]">Tambahkan ternak pertama agar bisa dipakai saat membuat laporan kondisi.</p>
              <button
                type="button"
                onClick={() => navigate('/peternak/ternak/tambah')}
                className="mt-5 rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark"
              >
                Tambah Ternak Pertama
              </button>
            </div>
          )}
          {!isLoading && !error && animals.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {animals.slice(0, 4).map((animal) => (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => navigate(`/peternak/ternak/${animal.id}`)}
                  className="rounded-2xl border border-[#E5EAE6] bg-[#F8FAF8] p-5 text-left transition hover:border-brand-green hover:bg-white"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg font-bold text-brand-green shadow-sm">
                      {getSpeciesIcon(animal.species)}
                    </div>
                    <span className="rounded-full bg-[#E8F5EC] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1D5937]">Terdaftar</span>
                  </div>
                  <h3 className="font-bold text-primary-dark">{animal.name}</h3>
                  <p className="mt-1 text-sm text-[#69736C]">{animal.species} - {animal.age || 'Umur belum diisi'}</p>
                  <p className="mt-4 border-t border-[#E5EAE6] pt-3 text-xs font-bold text-[#8D978F]">{getAnimalCode(animal)}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-primary-dark">Aksi cepat</h2>
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={onLapor} className="min-h-12 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark">Buat Laporan</button>
            <button type="button" onClick={() => navigate('/peternak/konsultasi')} className="min-h-12 rounded-xl border border-[#D4DCD6] px-5 text-sm font-bold text-brand-green">Konsultasi</button>
            <button type="button" onClick={() => navigate('/peternak/marketplace')} className="min-h-12 rounded-xl border border-[#D4DCD6] px-5 text-sm font-bold text-brand-green">Toko</button>
          </div>
          <div className="mt-5 rounded-2xl bg-[#EAF3FB] p-4 text-sm text-[#205580]">
            <p className="font-bold">Catatan</p>
            <p className="mt-2 leading-relaxed">Data kasus aktif akan tampil setelah laporan berhasil dibuat dan dokter dipilih.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
