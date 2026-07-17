import { useState } from 'react'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { getStoredDoctor, updateVetProfile } from '../../services/doctorAuthService'

function maskStr(value) {
  if (!value) return '-'
  return `${value.slice(0, 8)}••••${value.slice(-3)}`
}

function displayValue(value) {
  return value || 'Belum diisi';
}

export default function DoctorProfilePage() {
  const [doctor, setDoctor] = useState(() => getStoredDoctor() || {});
  const [form, setForm] = useState({
    experienceYears: doctor.experienceYears ?? 5,
    chatPrice: doctor.chatPrice ?? 15000,
    visitPrice: doctor.visitPrice ?? 100000,
    canVisit: doctor.canVisit ?? true,
    province: doctor.province || '',
    regency: doctor.regency || '',
    district: doctor.district || '',
    addressDetail: doctor.addressDetail || '',
  })
  
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setError('')
    setSaved(false)

    try {
      const response = await updateVetProfile({
        experienceYears: Number(form.experienceYears),
        chatPrice: Number(form.chatPrice),
        visitPrice: Number(form.visitPrice),
        canVisit: Boolean(form.canVisit),
        province: form.province.trim() || null,
        regency: form.regency.trim() || null,
        district: form.district.trim() || null,
        addressDetail: form.addressDetail.trim() || null,
      });

      const updated = response?.data?.vet || response?.vet || response;
      setDoctor(updated);
      setSaved(true);
    } catch (err) {
      setError(err?.message || 'Gagal menyimpan perubahan profil.');
    } finally {
      setIsSaving(false)
    }
  }

  const doctorInfo = {
    id: doctor.id || 'vet-doctor-001',
    name: doctor.name || 'drh. Anindya Putri',
    roleLabel: 'Dokter Hewan',
    strNumber: doctor.strNumber || 'STR-2026-001',
    verificationStatus: doctor.isVerified ? 'VERIFIED' : 'PENDING_VERIFICATION',
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
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
            <p className="font-bold text-primary-dark">Slot Konsultasi</p>
            <p className="mt-1 text-brand-green">Aktif & Menerima Kasus</p>
          </div>
        </div>
      </header>

      {error && (
        <div className="rounded-2xl bg-[#FDEBEC] p-4 text-sm font-semibold text-[#912525]">
          {error}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.2fr]">
        <aside className="space-y-6">
          <DoctorSectionCard title="Kredensial">
            <dl className="grid gap-3 text-sm">
              {[
                ['Nomor STR', maskStr(doctorInfo.strNumber)],
                ['Spesialisasi', 'Spesialis Ruminansia (Sapi/Kambing/Kerbau)'],
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

        <form className="rounded-[28px] border border-[#E7EFE4] bg-white p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)]" onSubmit={handleSave}>
          <h2 className="text-xl font-bold text-primary-dark">Edit profil</h2>
          <p className="mt-1 text-sm text-gray-600">Perbarui layanan, area praktik, jadwal, dan status ketersediaan dokter.</p>
          
          <div className="mt-5 grid gap-4 text-sm md:grid-cols-2">
            <label className="block">
              <span className="font-bold text-primary-dark">Pengalaman (Tahun)</span>
              <input
                type="number"
                min="0"
                className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                value={form.experienceYears}
                onChange={(e) => setForm((c) => ({ ...c, experienceYears: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="font-bold text-primary-dark">Biaya Chat (Rp)</span>
              <input
                type="number"
                min="0"
                className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                value={form.chatPrice}
                onChange={(e) => setForm((c) => ({ ...c, chatPrice: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="font-bold text-primary-dark">Biaya Kunjungan (Rp)</span>
              <input
                type="number"
                min="0"
                className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                value={form.visitPrice}
                onChange={(e) => setForm((c) => ({ ...c, visitPrice: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="font-bold text-primary-dark">Melayani Kunjungan Fisik</span>
              <select
                className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                value={String(form.canVisit)}
                onChange={(e) => setForm((c) => ({ ...c, canVisit: e.target.value === 'true' }))}
              >
                <option value="true">Ya</option>
                <option value="false">Tidak</option>
              </select>
            </label>
            <label className="block">
              <span className="font-bold text-primary-dark">Provinsi</span>
              <input
                type="text"
                className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                value={form.province}
                onChange={(e) => setForm((c) => ({ ...c, province: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="font-bold text-primary-dark">Kabupaten</span>
              <input
                type="text"
                className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                value={form.regency}
                onChange={(e) => setForm((c) => ({ ...c, regency: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="font-bold text-primary-dark">Kecamatan</span>
              <input
                type="text"
                className="mt-2 h-11 w-full rounded-xl border border-[#D4DCD6] bg-white px-4 outline-none focus:border-brand-green"
                value={form.district}
                onChange={(e) => setForm((c) => ({ ...c, district: e.target.value }))}
              />
            </label>
            <label className="block md:col-span-2">
              <span className="font-bold text-primary-dark">Alamat Detail Praktik</span>
              <textarea
                rows={3}
                className="mt-2 w-full rounded-xl border border-[#D4DCD6] bg-white p-3 outline-none focus:border-brand-green"
                value={form.addressDetail}
                onChange={(e) => setForm((c) => ({ ...c, addressDetail: e.target.value }))}
              />
            </label>
          </div>

          {saved ? (
            <p className="mt-5 rounded-2xl bg-[#E8F5EC] p-4 text-sm font-bold text-[#1D5937]">
              Perubahan profil berhasil disimpan ke database.
            </p>
          ) : null}

          <button
            className="mt-5 min-h-12 w-full rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark shadow-sm disabled:opacity-60"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </section>
    </div>
  )
}
