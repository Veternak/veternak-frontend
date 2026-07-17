import { useEffect, useMemo, useState } from 'react';
import { getStoredFarmer, updateFarmerProfile } from '../../services/farmerAuthService';
import { getAnimals } from '../../services/farmerCoreService';

function getInitial(name) {
  return String(name || 'P').slice(0, 1).toUpperCase();
}

function displayValue(value) {
  return value || 'Belum diisi';
}

export default function FarmerProfilePage() {
  const [farmer, setFarmer] = useState(() => getStoredFarmer() || {});
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    province: '',
    regency: '',
    district: '',
    addressDetail: '',
  });

  const [notifications, setNotifications] = useState({
    consultation: true,
    visit: true,
    academy: false,
  });

  useEffect(() => {
    let isMounted = true;
    
    // Inisialisasi data form
    setForm({
      name: farmer.name || '',
      province: farmer.province || '',
      regency: farmer.regency || '',
      district: farmer.district || '',
      addressDetail: farmer.addressDetail || '',
    });

    getAnimals()
      .then((response) => {
        if (!isMounted) return;
        setAnimals(response?.data?.animals || []);
        setError('');
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || 'Gagal memuat ringkasan ternak.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [farmer]);

  const locationText = useMemo(
    () => [farmer.district, farmer.regency, farmer.province].filter(Boolean).join(', ') || 'Belum diisi',
    [farmer.district, farmer.regency, farmer.province],
  );

  const toggleNotification = (key) => {
    setNotifications((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Nama lengkap wajib diisi.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await updateFarmerProfile({
        name: form.name.trim(),
        province: form.province.trim() || null,
        regency: form.regency.trim() || null,
        district: form.district.trim() || null,
        addressDetail: form.addressDetail.trim() || null,
      });

      const updated = response?.data?.farmer || response?.farmer || response;
      setFarmer(updated);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(err?.message || 'Gagal memperbarui profil.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl pb-10 animate-fade-in">
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
                <p className="mt-3 text-sm leading-relaxed text-[#69736C]">Data utama peternak aktif terhubung ke database Veternak.</p>
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
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary-dark">Data akun</h2>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="min-h-10 rounded-xl border border-[#D4DCD6] px-4 text-xs font-bold text-brand-green hover:bg-brand-soft transition-colors"
                >
                  Edit Profil
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="mt-6 space-y-4 text-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="font-bold text-primary-dark">Nama Lengkap</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                    />
                  </label>
                  <label className="block">
                    <span className="font-bold text-primary-dark">Provinsi</span>
                    <input
                      type="text"
                      value={form.province}
                      onChange={(e) => setForm((c) => ({ ...c, province: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                    />
                  </label>
                  <label className="block">
                    <span className="font-bold text-primary-dark">Kabupaten</span>
                    <input
                      type="text"
                      value={form.regency}
                      onChange={(e) => setForm((c) => ({ ...c, regency: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                    />
                  </label>
                  <label className="block">
                    <span className="font-bold text-primary-dark">Kecamatan</span>
                    <input
                      type="text"
                      value={form.district}
                      onChange={(e) => setForm((c) => ({ ...c, district: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="font-bold text-primary-dark">Alamat Detail</span>
                    <textarea
                      value={form.addressDetail}
                      onChange={(e) => setForm((c) => ({ ...c, addressDetail: e.target.value }))}
                      rows={3}
                      className="mt-2 w-full rounded-xl border border-[#D4DCD6] bg-white p-3 outline-none focus:border-brand-green"
                    />
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setForm({
                        name: farmer.name || '',
                        province: farmer.province || '',
                        regency: farmer.regency || '',
                        district: farmer.district || '',
                        addressDetail: farmer.addressDetail || '',
                      });
                    }}
                    className="min-h-11 rounded-xl border border-[#D4DCD6] px-5 font-bold text-brand-green"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="min-h-11 rounded-xl bg-brand-lime px-5 font-bold text-primary-dark disabled:opacity-60"
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan Profil'}
                  </button>
                </div>
              </form>
            ) : (
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
                  <dd className="mt-1 text-[#69736C]">{displayValue(farmer.addressDetail)}</dd>
                </div>
              </dl>
            )}
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
            Semua perubahan profil disimpan langsung di database backend.
          </p>
        </aside>
      </div>
    </section>
  );
}
