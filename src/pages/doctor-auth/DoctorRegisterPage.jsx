import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import FormError from '../../components/ui/FormError'
import InputField from '../../components/ui/InputField'
import PasswordInput from '../../components/ui/PasswordInput'
import AuthLayout from '../../layouts/AuthLayout'
import { registerDoctor } from '../../services/doctorAuthService'

const initialValues = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  strNumber: '',
  province: '',
  city: '',
  species: '',
  services: [],
  schedule: '',
  strDocument: null,
  consent: false,
}

function validateRegister(values) {
  const nextErrors = {}

  if (!values.name.trim()) nextErrors.name = 'Nama lengkap wajib diisi.'
  if (!values.phone.trim()) nextErrors.phone = 'Nomor HP wajib diisi.'
  if (!values.password) nextErrors.password = 'Password wajib diisi.'
  else if (values.password.length < 8) nextErrors.password = 'Password minimal 8 karakter.'
  if (values.confirmPassword !== values.password) nextErrors.confirmPassword = 'Konfirmasi password belum sama.'
  if (!values.strNumber.trim()) nextErrors.strNumber = 'Nomor STR wajib diisi.'
  if (!values.province.trim()) nextErrors.province = 'Provinsi wajib diisi.'
  if (!values.city.trim()) nextErrors.city = 'Kabupaten/kota wajib diisi.'
  if (!values.species) nextErrors.species = 'Pilih spesialisasi spesies.'
  if (values.services.length === 0) nextErrors.services = 'Pilih minimal satu layanan.'
  if (!values.schedule.trim()) nextErrors.schedule = 'Jadwal praktik sederhana wajib diisi.'
  if (!values.strDocument) nextErrors.strDocument = 'Unggah dokumen STR demo.'
  if (!values.consent) nextErrors.consent = 'Persetujuan verifikasi wajib dicentang.'

  return nextErrors
}

function FormSection({ children, description, title }) {
  return (
    <section className="rounded-2xl border border-standard-border bg-white/75 p-4">
      <h2 className="text-sm font-bold text-primary-dark">{title}</h2>
      {description ? <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p> : null}
      <div className="mt-4 grid gap-5">{children}</div>
    </section>
  )
}

export default function DoctorRegisterPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateValue(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleChange(event) {
    const { name, type, checked, value, files } = event.target

    if (type === 'checkbox' && name === 'services') {
      setValues((current) => {
        const services = checked
          ? [...current.services, value]
          : current.services.filter((item) => item !== value)
        return { ...current, services }
      })
      if (errors.services) setErrors((current) => ({ ...current, services: '' }))
      return
    }

    if (type === 'checkbox') {
      updateValue(name, checked)
      return
    }

    if (type === 'file') {
      updateValue(name, files?.[0] || null)
      return
    }

    updateValue(name, value)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateRegister(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await registerDoctor(values)
      navigate('/dokter/verifikasi-pending', {
        state: {
          doctorName: values.name,
          strNumber: values.strNumber,
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const infoPanel = (
    <section className="max-w-md rounded-[28px] border border-white/70 bg-white/55 p-8 shadow-sm backdrop-blur">
      <span className="inline-flex rounded-full bg-brand-lime px-4 py-2 text-xs font-bold text-primary-dark">
        Verifikasi Dokter
      </span>
      <h2 className="mt-6 text-2xl font-bold leading-tight text-brand-green">
        Akun dokter perlu ditinjau sebelum menerima kasus.
      </h2>
      <p className="mt-4 leading-7 text-gray-700">
        Nomor STR dan dokumen pendukung dipakai untuk proses verifikasi. Pada fase ini,
        unggahan masih simulasi dan belum dikirim ke penyimpanan dokumen sungguhan.
      </p>
    </section>
  )

  return (
    <AuthLayout
      eyebrow="Daftar Dokter"
      footer={
        <>
          Sudah punya akun dokter?{' '}
          <Link className="font-bold text-brand-green hover:underline" to="/dokter/masuk">
            Masuk di sini
          </Link>
        </>
      }
      infoPanel={infoPanel}
      subtitle="Lengkapi data akun dan dokumen STR untuk proses verifikasi."
      title="Buat akun dokter hewan"
      variant="register"
    >
      <form className="space-y-6" noValidate onSubmit={handleSubmit}>
        <FormSection description="Data dasar untuk masuk ke akun dokter Veternak." title="Data akun">
          <InputField error={errors.name} id="doctor-name" label="Nama Lengkap" name="name" onChange={handleChange} placeholder="Contoh: drh. Anindya Putri" value={values.name} />
          <InputField error={errors.phone} id="doctor-phone" inputMode="tel" label="Nomor HP" name="phone" onChange={handleChange} placeholder="Contoh: 08123456789" value={values.phone} />
          <InputField error={errors.email} id="doctor-email" label="Email Opsional" name="email" onChange={handleChange} placeholder="dokter@veternak.id" type="email" value={values.email} />
          <div className="grid gap-5 md:grid-cols-2">
            <PasswordInput error={errors.password} id="doctor-register-password" label="Password" name="password" onChange={handleChange} placeholder="Min. 8 karakter" value={values.password} />
            <PasswordInput error={errors.confirmPassword} id="doctor-confirm-password" label="Konfirmasi Password" name="confirmPassword" onChange={handleChange} placeholder="Ulangi password" value={values.confirmPassword} />
          </div>
        </FormSection>

        <FormSection description="Data ini dipakai untuk proses verifikasi dokter dan area layanan demo." title="Data profesional">
          <InputField error={errors.strNumber} id="doctor-str" label="Nomor STR" name="strNumber" onChange={handleChange} placeholder="Contoh: STR-123456" value={values.strNumber} />
          <div className="grid gap-5 md:grid-cols-2">
            <InputField error={errors.province} id="doctor-province" label="Provinsi" name="province" onChange={handleChange} placeholder="DI Yogyakarta" value={values.province} />
            <InputField error={errors.city} id="doctor-city" label="Kabupaten/Kota" name="city" onChange={handleChange} placeholder="Sleman" value={values.city} />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary-dark" htmlFor="doctor-species">
              Spesialisasi Spesies
            </label>
            <select
              aria-describedby={errors.species ? 'doctor-species-error' : undefined}
              aria-invalid={Boolean(errors.species)}
              className="mt-2 min-h-12 w-full rounded-xl border border-standard-border bg-white/80 px-4 py-3 text-base text-main-text focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/15"
              id="doctor-species"
              name="species"
              onChange={handleChange}
              value={values.species}
            >
              <option value="">Pilih spesialisasi</option>
              <option value="Sapi">Sapi</option>
              <option value="Kerbau">Kerbau</option>
              <option value="Sapi dan Kerbau">Sapi dan Kerbau</option>
            </select>
            <FormError id="doctor-species-error">{errors.species}</FormError>
          </div>

          <fieldset>
            <legend className="text-sm font-bold text-primary-dark">Layanan Tersedia</legend>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {['Konsultasi Online', 'Kunjungan Lapangan'].map((service) => (
                <label key={service} className="flex min-h-12 items-center gap-3 rounded-xl border border-standard-border bg-white/80 px-4 py-3 text-sm font-semibold text-primary-dark">
                  <input name="services" type="checkbox" value={service} onChange={handleChange} />
                  {service}
                </label>
              ))}
            </div>
            <FormError>{errors.services}</FormError>
          </fieldset>

          <InputField helperText="Radius layanan akan dibuat dapat diatur saat sistem layanan tersedia." error={errors.schedule} id="doctor-schedule" label="Jadwal Praktik Sederhana" name="schedule" onChange={handleChange} placeholder="Senin-Jumat, 08.00-16.00 WIB" value={values.schedule} />
        </FormSection>

        <FormSection description="Upload ini masih demo; dokumen belum dikirim ke penyimpanan dokumen sungguhan." title="Dokumen STR dan persetujuan">
          <div>
            <label className="block text-sm font-bold text-primary-dark" htmlFor="doctor-str-document">
              Dokumen STR
            </label>
            <input
              accept=".pdf,.jpg,.jpeg,.png"
              aria-describedby={errors.strDocument ? 'doctor-str-document-error' : undefined}
              aria-invalid={Boolean(errors.strDocument)}
              className="mt-2 block w-full rounded-xl border border-dashed border-standard-border bg-white/80 px-4 py-4 text-sm text-gray-700 file:mr-4 file:rounded-full file:border-0 file:bg-brand-lime file:px-4 file:py-2 file:font-bold file:text-primary-dark"
              id="doctor-str-document"
              name="strDocument"
              onChange={handleChange}
              type="file"
            />
            <p className="mt-2 text-sm text-gray-500">
              Format demo: PDF, JPG, atau PNG. {values.strDocument ? `File dipilih: ${values.strDocument.name}` : 'Belum ada file dipilih.'}
            </p>
            <FormError id="doctor-str-document-error">{errors.strDocument}</FormError>
          </div>

          <label className="flex gap-3 rounded-2xl border border-standard-border bg-white/80 p-4 text-sm leading-6 text-gray-700">
            <input className="mt-1 h-4 w-4" name="consent" checked={values.consent} onChange={handleChange} type="checkbox" />
            <span>
              Saya menyetujui proses verifikasi STR dan memahami akun perlu diverifikasi sebelum tampil publik atau menerima kasus.
            </span>
          </label>
          <FormError>{errors.consent}</FormError>
        </FormSection>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Mengirim data demo...' : 'Daftar dan Ajukan Verifikasi'}
        </Button>
      </form>
    </AuthLayout>
  )
}
