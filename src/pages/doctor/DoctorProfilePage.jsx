import { useState } from 'react'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { getStoredDoctor } from '../../services/doctorAuthService'

function maskStr(value) {
  if (!value) return '-'
  return `${value.slice(0, 8)}••••${value.slice(-3)}`
}

function displayValue(value) {
  return value || 'Belum diisi';
}

export default function DoctorProfilePage() {
  const doctor = getStoredDoctor() || {};

  const doctorInfo = {
    id: doctor.id || 'vet-doctor-001',
    name: doctor.name || 'drh. Anindya Putri',
    roleLabel: 'Dokter Hewan',
    strNumber: doctor.strNumber || 'STR-2026-001',
    verificationStatus: doctor.isVerified ? 'VERIFIED' : 'PENDING_VERIFICATION',
    availabilityStatus: doctor.availabilityStatus || 'AVAILABLE',
    specialties: doctor.specialties || ['Sapi', 'Kerbau'],
    services: doctor.services || ['Konsultasi Online', 'Kunjungan Lapangan'],
    serviceArea: [doctor.district, doctor.regency, doctor.province].filter(Boolean).join(', ') || 'Kabupaten Sleman, DI Yogyakarta',
    schedule: doctor.schedule || [
      { day: 'Senin - Jumat', time: '08.00 - 16.00 WIB' },
      { day: 'Sabtu', time: '09.00 - 13.00 WIB' },
    ],
  };

  const [profile, setProfile] = useState({
    services: Array.isArray(doctorInfo.services) ? doctorInfo.services.join(', ') : (doctorInfo.services || ''),
    serviceArea: doctorInfo.serviceArea,
    schedule: Array.isArray(doctorInfo.schedule) ? doctorInfo.schedule.map((item) => `${item.day}: ${item.time}`).join('\n') : (doctorInfo.schedule || ''),
    availabilityStatus: doctorInfo.availabilityStatus,
  })
  
  const [saved, setSaved] = useState(false)

  function updateField(name, value) {
    setProfile((current) => ({ ...current, [name]: value }))
    if (saved) setSaved(false)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="rounded-[32px] border border-[#E7EFE4] bg-gradient-to-br from-white to-[#F8FCEF] p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
                Profil dokter
              </span>
              <DoctorStatusBadge status={doctorInfo.verificationStatus} />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">{doctorInfo.name}</h1>
            <p className="mt-2 text-gray-600">{doctorInfo.roleLabel}</p>
          </div>
          <div className="rounded-2xl border border-[#E7EFE4] bg-white p-4 text-sm shadow-[0_10px_24px_rgba(19,59,38,0.06)]">
            <p className="font-bold text-primary-dark">Status layanan</p>
            <p className="mt-1 text-brand-green">{profile.availabilityStatus === 'AVAILABLE' ? 'Tersedia' : 'Tidak tersedia'}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.2fr]">
        <aside className="space-y-6">
          <DoctorSectionCard title="Kredensial">
            <dl className="grid gap-3 text-sm">
              {[
                ['Nomor STR', maskStr(doctorInfo.strNumber)],
                ['Spesialisasi', Array.isArray(doctorInfo.specialties) ? doctorInfo.specialties.join(', ') : displayValue(doctorInfo.specialties)],
                ['Dokumen STR', 'str-terverifikasi.pdf'],
              ].map(([label, value]) => (
                <div className="rounded-xl bg-neutral-bg px-4 py-3" key={label}>
                  <dt className="font-bold text-gray-500">{label}</dt>
                  <dd className="mt-1 text-primary-dark">{value}</dd>
                </div>
              ))}
              <div className="rounded-xl bg-neutral-bg px-4 py-3">
                <dt className="font-bold text-gray-500">Status verifikasi</dt>
                <dd className="mt-2"><DoctorStatusBadge status={doctorInfo.verificationStatus} /></dd>
              </div>
            </dl>
          </DoctorSectionCard>

          <DoctorSectionCard title="Catatan privasi">
            <p className="text-sm leading-6 text-gray-700">
              Nomor STR ditampilkan dalam bentuk masking. Detail dokumen asli hanya untuk verifikasi admin.
            </p>
          </DoctorSectionCard>
        </aside>

        <form className="rounded-[28px] border border-[#E7EFE4] bg-white p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)]" onSubmit={(event) => {
          event.preventDefault()
          setSaved(true)
        }}>
          <h2 className="text-xl font-bold text-primary-dark">Edit profil</h2>
          <p className="mt-1 text-sm text-gray-600">Perbarui layanan, area praktik, jadwal, dan status ketersediaan dokter.</p>
          <div className="mt-5 grid gap-5">
            <label>
              <span className="text-sm font-bold text-primary-dark">Layanan</span>
              <input className="doctor-input" onChange={(event) => updateField('services', event.target.value)} value={profile.services} />
            </label>
            <label>
              <span className="text-sm font-bold text-primary-dark">Area layanan</span>
              <input className="doctor-input" onChange={(event) => updateField('serviceArea', event.target.value)} value={profile.serviceArea} />
            </label>
            <label>
              <span className="text-sm font-bold text-primary-dark">Jadwal</span>
              <textarea className="mt-2 min-h-28 w-full rounded-xl border border-standard-border bg-white px-4 py-3 text-sm leading-6 focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/15" onChange={(event) => updateField('schedule', event.target.value)} value={profile.schedule} />
            </label>
            <label>
              <span className="text-sm font-bold text-primary-dark">Status ketersediaan</span>
              <select className="doctor-select" onChange={(event) => updateField('availabilityStatus', event.target.value)} value={profile.availabilityStatus}>
                <option value="AVAILABLE">Tersedia</option>
                <option value="UNAVAILABLE">Tidak tersedia</option>
              </select>
            </label>
          </div>

          {saved ? (
            <p className="mt-5 rounded-2xl bg-[#E8F5EC] p-4 text-sm font-bold text-[#1D5937]">
              Perubahan profil tersimpan.
            </p>
          ) : null}

          <button className="mt-5 min-h-12 w-full rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark shadow-sm" type="submit">
            Simpan perubahan
          </button>
        </form>
      </section>
    </div>
  )
}
