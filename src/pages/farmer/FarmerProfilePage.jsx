import { useEffect, useMemo, useState } from 'react';
import { getStoredFarmer } from '../../services/farmerAuthService';
import { getAnimals } from '../../services/farmerCoreService';

function getInitial(name) {
  return String(name || 'P').slice(0, 1).toUpperCase();
}

function displayValue(value) {
  return value || 'Belum diisi';
}

export default function FarmerProfilePage() {
  const farmer = getStoredFarmer() || {};
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState({
    consultation: true,
    visit: true,
    academy: false,
  });

  useEffect(() => {
    getAnimals()
      .then((response) => {
        setAnimals(response?.data?.animals || []);
        setError('');
      })
      .catch((err) => setError(err?.message || 'Gagal memuat ringkasan ternak.'))
      .finally(() => setIsLoading(false));
  }, []);

  const locationText = useMemo(
    () => [farmer.district, farmer.regency, farmer.province].filter(Boolean).join(', ') || 'Belum diisi',
    [farmer.district, farmer.regency, farmer.province],
  );

  const toggleNotification = (key) => {
    setNotifications((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <section className="mx-auto max-w-6xl pb-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.5rem] bg-brand-soft text-3xl font-bold text-brand-green">
                {getInitial(farmer.name)}
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Profil peternak</p>
                <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">{displayValue(farmer.name)}</h1>
                <p className="mt-2 text-base font-semibold text-[#505B53]">{locationText}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#69736C]">Data ini berasal dari akun peternak yang sedang login.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Ternak aktif', isLoading ? '...' : `${animals.length} ekor`],
              ['Kasus aktif', '0 kasus'],
              ['Farmer ID', displayValue(farmer.id)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{label}</p>
                <p className="mt-2 text-xl font-bold text-primary-dark">{value}</p>
              </div>
            ))}
          </div>

          {error && <p className="rounded-2xl bg-[#FDEBEC] p-4 text-sm font-semibold text-[#912525]">{error}</p>}

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Data akun</h2>
            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="font-bold text-primary-dark">Nama</dt>
                <dd className="mt-1 text-[#69736C]">{displayValue(farmer.name)}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Nomor HP</dt>
                <dd className="mt-1 text-[#69736C]">{displayValue(farmer.phone)}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Provinsi</dt>
                <dd className="mt-1 text-[#69736C]">{displayValue(farmer.province)}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kabupaten</dt>
                <dd className="mt-1 text-[#69736C]">{displayValue(farmer.regency)}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kecamatan</dt>
                <dd className="mt-1 text-[#69736C]">{displayValue(farmer.district)}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Koordinat</dt>
                <dd className="mt-1 text-[#69736C]">
                  {farmer.latitude && farmer.longitude ? `${farmer.latitude}, ${farmer.longitude}` : 'Belum diisi'}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-bold text-primary-dark">Alamat detail</dt>
                <dd className="mt-1 text-[#69736C]">{displayValue(farmer.addressDetail || farmer.address)}</dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-primary-dark">Pengaturan</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#69736C]">Preferensi lokal untuk akun peternak ini.</p>

          <div className="my-5 h-px bg-[#E5EAE6]" />

          <div className="space-y-3">
            {[
              ['consultation', 'Notifikasi konsultasi', 'Balasan dokter dan status kasus.'],
              ['visit', 'Notifikasi kunjungan', 'Konfirmasi dan estimasi kedatangan.'],
              ['academy', 'Rekomendasi akademi', 'Materi edukasi sesuai ternak.'],
            ].map(([key, title, description]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleNotification(key)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#E5EAE6] p-4 text-left"
              >
                <div>
                  <p className="text-sm font-bold text-primary-dark">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#69736C]">{description}</p>
                </div>
                <span className={`h-6 w-11 rounded-full p-1 transition-colors ${notifications[key] ? 'bg-brand-green' : 'bg-[#D4DCD6]'}`}>
                  <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${notifications[key] ? 'translate-x-5' : ''}`} />
                </span>
              </button>
            ))}
          </div>

          <p className="mt-5 rounded-2xl bg-[#F8FAF8] p-4 text-xs leading-relaxed text-[#69736C]">
            Edit profil backend belum disambungkan. Data utama mengikuti akun yang dibuat saat registrasi.
          </p>
        </aside>
      </div>
    </section>
  );
}
