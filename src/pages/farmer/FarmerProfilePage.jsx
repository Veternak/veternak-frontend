import { useState } from "react";

const farmer = {
  id: 1,
  name: "Masrukhi",
  phone: "0812-3456-7890",
  farmName: "Putra Mandiri Farm",
  mainLivestock: "Sapi potong",
  province: "Daerah Istimewa Yogyakarta",
  regency: "Sleman",
  district: "Sleman Barat",
  address: "Kandang utama dekat area persawahan",
  latitude: -7.7324,
  longitude: 110.3557,
  joinedAt: "12 Mei 2026",
};

export default function FarmerProfilePage() {
  const [notifications, setNotifications] = useState({
    consultation: true,
    visit: true,
    academy: false,
  });

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
                M
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Profil peternak</p>
                <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">{farmer.name}</h1>
                <p className="mt-2 text-base font-semibold text-[#505B53]">{farmer.farmName}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#69736C]">Akun peternak untuk mengelola ternak, laporan kondisi, konsultasi, dan riwayat kesehatan.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Ternak aktif", "12 ekor"],
              ["Kasus aktif", "2 kasus"],
              ["Bergabung", farmer.joinedAt],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8D978F]">{label}</p>
                <p className="mt-2 text-xl font-bold text-primary-dark">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Data akun</h2>
            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="font-bold text-primary-dark">Farmer ID</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.id}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Nomor HP</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.phone}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Nama kandang</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.farmName}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Ternak utama</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.mainLivestock}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-primary-dark">Lokasi kandang</h2>
            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="font-bold text-primary-dark">Provinsi</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.province}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kabupaten</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.regency}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Kecamatan</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.district}</dd>
              </div>
              <div>
                <dt className="font-bold text-primary-dark">Koordinat demo</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.latitude}, {farmer.longitude}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-bold text-primary-dark">Alamat detail</dt>
                <dd className="mt-1 text-[#69736C]">{farmer.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-[#E5EAE6] bg-white p-5 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-xl font-bold text-primary-dark">Pengaturan</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#69736C]">Atur preferensi akun demo peternak.</p>

          <div className="my-5 h-px bg-[#E5EAE6]" />

          <div className="space-y-3">
            {[
              ["consultation", "Notifikasi konsultasi", "Balasan dokter dan status kasus."],
              ["visit", "Notifikasi kunjungan", "Konfirmasi dan estimasi kedatangan."],
              ["academy", "Rekomendasi akademi", "Materi edukasi sesuai ternak."],
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
                <span className={`h-6 w-11 rounded-full p-1 transition-colors ${notifications[key] ? "bg-brand-green" : "bg-[#D4DCD6]"}`}>
                  <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${notifications[key] ? "translate-x-5" : ""}`} />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            <button type="button" className="min-h-12 rounded-xl bg-brand-lime px-5 text-sm font-bold text-primary-dark">
              Simpan Pengaturan Demo
            </button>
            <button type="button" className="min-h-12 rounded-xl border border-[#D4DCD6] bg-white px-5 text-sm font-bold text-brand-green">
              Edit Profil
            </button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#8D978F]">
            Data lokasi kandang bersifat sensitif dan tidak ditampilkan publik.
          </p>
        </aside>
      </div>
    </section>
  );
}
