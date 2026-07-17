import { useState } from 'react'
import Button from '../ui/Button'
import FormError from '../ui/FormError'
import { createMedicalRecord } from '../../services/doctorAuthService'

const initialValues = {
  finalDiagnosis: '',
  recommendation: '',
  prescription: '',
  followUp: '',
  internalNote: '',
}

const fields = [
  {
    helper: 'Wajib. Isi berdasarkan pemeriksaan dan keputusan klinis dokter.',
    label: 'Diagnosis Final',
    name: 'finalDiagnosis',
    placeholder: 'Contoh: tuliskan diagnosis final setelah pemeriksaan dokter.',
    required: true,
  },
  {
    helper: 'Wajib. Gunakan bahasa yang dapat dipahami peternak.',
    label: 'Rekomendasi',
    name: 'recommendation',
    placeholder: 'Tuliskan rekomendasi penanganan, pemantauan, dan tanda yang perlu diperhatikan.',
    required: true,
  },
  {
    helper: 'Opsional. Isi hanya bila sesuai kewenangan, pemeriksaan, dan aturan praktik.',
    label: 'Resep Opsional',
    name: 'prescription',
    placeholder: 'Kosongkan bila tidak ada resep.',
  },
  {
    helper: 'Opsional. Jadwal kontrol atau tindak lanjut.',
    label: 'Follow-up',
    name: 'followUp',
    placeholder: 'Contoh: kontrol ulang 2 hari lagi bila kondisi belum membaik.',
  },
  {
    helper: 'Opsional. Catatan internal untuk konteks dokter.',
    label: 'Catatan Internal',
    name: 'internalNote',
    placeholder: 'Catatan internal untuk konteks dokter.',
  },
]

export default function ClinicalRecordForm({ caseId }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSaved, setIsSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
    if (isSaved) setIsSaved(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}

    if (!values.finalDiagnosis.trim()) nextErrors.finalDiagnosis = 'Diagnosis final wajib diisi oleh dokter.'
    if (!values.recommendation.trim()) nextErrors.recommendation = 'Rekomendasi wajib diisi.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const notesCombined = [
        values.recommendation.trim(),
        values.followUp.trim() ? `Follow-up: ${values.followUp.trim()}` : "",
        values.internalNote.trim() ? `Catatan Internal: ${values.internalNote.trim()}` : ""
      ].filter(Boolean).join("\n\n");

      await createMedicalRecord(Number(caseId), {
        diagnosis: values.finalDiagnosis.trim(),
        prescription: values.prescription.trim() || null,
        notes: notesCombined || null,
      });

      setIsSaved(true)
      alert('Rekam medis klinis berhasil disimpan dan kasus dinyatakan selesai!')
    } catch (err) {
      setSubmitError(err?.message || 'Gagal menyimpan rekam medis.');
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="rounded-2xl border border-[#D8EDAC] bg-[#F8FCEF] p-4 text-sm leading-6 text-primary-dark">
        <p className="font-bold">Catatan dokter berwenang</p>
        <p className="mt-1">
          Hasil profesional hanya diisi oleh dokter. Kasus #{caseId} ini akan tercatat sebagai rekam kasus saat tersimpan ke sistem utama.
        </p>
      </div>

      {submitError && (
        <p className="rounded-2xl bg-[#FDEBEC] p-4 text-sm font-semibold text-[#912525]">
          {submitError}
        </p>
      )}

      <div className="grid gap-5">
        {fields.map((field) => (
          <div key={field.name}>
            <div className="flex items-center justify-between gap-3">
              <label className="block text-sm font-bold text-primary-dark" htmlFor={field.name}>
                {field.label}
              </label>
              {field.required ? <span className="text-xs font-bold text-[#912525]">Wajib</span> : <span className="text-xs font-bold text-gray-500">Opsional</span>}
            </div>
            <textarea
              className="mt-2 min-h-24 w-full rounded-xl border border-standard-border bg-white px-4 py-3 text-sm leading-6 text-main-text transition focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/15"
              id={field.name}
              name={field.name}
              onChange={handleChange}
              placeholder={field.placeholder}
              value={values[field.name]}
              disabled={isSaved || isSubmitting}
            />
            <p className="mt-2 text-xs leading-5 text-gray-500">{field.helper}</p>
            <FormError>{errors[field.name]}</FormError>
          </div>
        ))}
      </div>

      {isSaved ? (
        <p className="rounded-2xl bg-[#E8F5EC] p-4 text-sm font-bold text-[#1D5937]">
          Hasil profesional telah berhasil tersimpan ke database. Status kasus ditutup (COMPLETED).
        </p>
      ) : null}

      {!isSaved && (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : 'Simpan Hasil Profesional'}
        </Button>
      )}
    </form>
  )
}
