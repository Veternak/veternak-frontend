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

const registerSteps = [
  {
    description: 'Akun dasar',
    fields: ['name', 'phone', 'email', 'password', 'confirmPassword'],
    title: 'Daftar akun',
  },
  {
    description: 'Profil layanan',
    fields: ['strNumber', 'province', 'city', 'species', 'services', 'schedule'],
    title: 'Data profesional',
  },
  {
    description: 'Verifikasi STR',
    fields: ['strDocument', 'consent'],
    title: 'Dokumen & persetujuan',
  },
]

function getRegisterErrors(values) {
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
  if (!values.strDocument) nextErrors.strDocument = 'Unggah dokumen STR.'
  if (!values.consent) nextErrors.consent = 'Persetujuan verifikasi wajib dicentang.'

  return nextErrors
}

function validateRegister(values, fields) {
  const allErrors = getRegisterErrors(values)
  if (!fields) return allErrors

  return fields.reduce((filteredErrors, field) => {
    if (allErrors[field]) filteredErrors[field] = allErrors[field]
    return filteredErrors
  }, {})
}

function FormSection({ children, description, title }) {
  return (
    <section className="rounded-[26px] border border-standard-border bg-white/90 p-5 shadow-[0_18px_48px_rgba(19,59,38,0.09)] sm:p-6">
      <div className="max-w-xl">
        <h2 className="text-base font-extrabold text-primary-dark">{title}</h2>
        {description ? <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p> : null}
      </div>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  )
}

function StepIndicator({ currentStep }) {
  return (
    <div className="mb-7 rounded-[26px] border border-standard-border bg-white/90 p-2 shadow-[0_16px_42px_rgba(19,59,38,0.08)]">
      <div className="grid gap-2 sm:grid-cols-3">
        {registerSteps.map((step, index) => {
          const isActive = index === currentStep
          const isDone = index < currentStep

          return (
            <div
              className={[
                'rounded-2xl px-3 py-3 transition sm:px-4',
                isActive ? 'bg-brand-green text-white shadow-[0_12px_28px_rgba(19,59,38,0.22)]' : '',
                isDone ? 'bg-brand-lime/25 text-primary-dark' : '',
                !isActive && !isDone ? 'bg-white text-gray-500' : '',
              ].join(' ')}
              key={step.title}
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold',
                    isActive ? 'bg-white text-brand-green' : '',
                    isDone ? 'bg-brand-lime text-primary-dark' : '',
                    !isActive && !isDone ? 'bg-brand-soft text-gray-500' : '',
                  ].join(' ')}
                >
                  {isDone ? '✓' : index + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold">{step.title}</p>
                  <p className={['mt-0.5 text-xs', isActive ? 'text-white/75' : 'text-gray-500'].join(' ')}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function DoctorRegisterPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
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

  function handleNextStep() {
    const currentFields = registerSteps[currentStep].fields
    const nextErrors = validateRegister(values, currentFields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setCurrentStep((step) => Math.min(step + 1, registerSteps.length - 1))
    setErrors({})
  }

  function handlePreviousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0))
    setErrors({})
  }

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
      subtitle="Lengkapi data dokter dalam tiga langkah singkat."
      title="Daftar dokter hewan"
      variant="register"
    >
      <form className="space-y-6" noValidate onSubmit={handleSubmit}>
        <StepIndicator currentStep={currentStep} />

        {currentStep === 0 ? (
          <FormSection description="Buat akses masuk untuk dashboard dokter." title="Daftar akun">
            <InputField error={errors.name} id="doctor-name" label="Nama lengkap" name="name" onChange={handleChange} placeholder="Contoh: drh. Anindya Putri" value={values.name} />
            <InputField error={errors.phone} id="doctor-phone" inputMode="tel" label="Nomor HP" name="phone" onChange={handleChange} placeholder="Contoh: 08123456789" value={values.phone} />
            <InputField error={errors.email} id="doctor-email" label="Email opsional" name="email" onChange={handleChange} placeholder="dokter@veternak.id" type="email" value={values.email} />
            <div className="grid gap-5 md:grid-cols-2">
              <PasswordInput error={errors.password} id="doctor-register-password" label="Password" name="password" onChange={handleChange} placeholder="Min. 8 karakter" value={values.password} />
              <PasswordInput error={errors.confirmPassword} id="doctor-confirm-password" label="Konfirmasi password" name="confirmPassword" onChange={handleChange} placeholder="Ulangi password" value={values.confirmPassword} />
            </div>
          </FormSection>
        ) : null}

        {currentStep === 1 ? (
          <FormSection description="Tentukan area praktik dan jenis layanan dokter." title="Data profesional">
            <InputField error={errors.strNumber} id="doctor-str" label="Nomor STR" name="strNumber" onChange={handleChange} placeholder="Contoh: STR-123456" value={values.strNumber} />
            <div className="grid gap-5 md:grid-cols-2">
              <InputField error={errors.province} id="doctor-province" label="Provinsi" name="province" onChange={handleChange} placeholder="DI Yogyakarta" value={values.province} />
              <InputField error={errors.city} id="doctor-city" label="Kabupaten/Kota" name="city" onChange={handleChange} placeholder="Sleman" value={values.city} />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary-dark" htmlFor="doctor-species">
                Spesialisasi spesies
              </label>
              <select
                aria-describedby={errors.species ? 'doctor-species-error' : undefined}
                aria-invalid={Boolean(errors.species)}
                className={[
                  'mt-2 min-h-12 w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm font-semibold text-main-text shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition',
                  'focus:border-brand-green focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-green/15',
                  errors.species ? 'border-[#D92D20]' : 'border-standard-border',
                ].join(' ')}
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
              <legend className="text-sm font-bold text-primary-dark">Layanan tersedia</legend>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {['Konsultasi Online', 'Kunjungan Lapangan'].map((service) => (
                  <label
                    className="flex min-h-12 items-center gap-3 rounded-2xl border border-standard-border bg-white/90 px-4 py-3 text-sm font-semibold text-primary-dark shadow-[0_10px_24px_rgba(19,59,38,0.06)] transition hover:border-brand-green/50"
                    key={service}
                  >
                    <input checked={values.services.includes(service)} className="h-4 w-4 accent-brand-green" name="services" onChange={handleChange} type="checkbox" value={service} />
                    {service}
                  </label>
                ))}
              </div>
              <FormError>{errors.services}</FormError>
            </fieldset>

            <InputField helperText="Contoh singkat saja. Detail jadwal bisa disesuaikan nanti." error={errors.schedule} id="doctor-schedule" label="Jadwal praktik" name="schedule" onChange={handleChange} placeholder="Senin-Jumat, 08.00-16.00 WIB" value={values.schedule} />
          </FormSection>
        ) : null}

        {currentStep === 2 ? (
          <FormSection description="Unggah STR dan setujui proses verifikasi akun dokter." title="Dokumen STR dan persetujuan">
            <div>
              <label className="block text-sm font-bold text-primary-dark" htmlFor="doctor-str-document">
                Dokumen STR
              </label>
              <input
                accept=".pdf,.jpg,.jpeg,.png"
                aria-describedby={errors.strDocument ? 'doctor-str-document-error' : undefined}
                aria-invalid={Boolean(errors.strDocument)}
                className={[
                  'mt-2 block w-full rounded-2xl border border-dashed bg-white/90 px-4 py-4 text-sm font-semibold text-gray-700 shadow-[0_14px_32px_rgba(19,59,38,0.07)] transition',
                  'file:mr-4 file:rounded-full file:border-0 file:bg-brand-lime file:px-4 file:py-2 file:font-extrabold file:text-primary-dark',
                  'focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/15',
                  errors.strDocument ? 'border-[#D92D20]' : 'border-standard-border',
                ].join(' ')}
                id="doctor-str-document"
                name="strDocument"
                onChange={handleChange}
                type="file"
              />
              <p className="mt-2 text-sm text-gray-500">
                PDF, JPG, atau PNG. {values.strDocument ? `File dipilih: ${values.strDocument.name}` : 'Belum ada file dipilih.'}
              </p>
              <FormError id="doctor-str-document-error">{errors.strDocument}</FormError>
            </div>

            <label className="flex gap-3 rounded-2xl border border-standard-border bg-white/90 p-4 text-sm leading-6 text-gray-700 shadow-[0_14px_32px_rgba(19,59,38,0.07)]">
              <input className="mt-1 h-4 w-4 accent-brand-green" name="consent" checked={values.consent} onChange={handleChange} type="checkbox" />
              <span>
                Saya menyetujui verifikasi STR sebelum akun dokter dapat menerima kasus.
              </span>
            </label>
            <FormError>{errors.consent}</FormError>
          </FormSection>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {currentStep > 0 ? (
            <button
              className="min-h-12 rounded-2xl border border-standard-border bg-white px-5 text-sm font-extrabold text-brand-green shadow-[0_12px_28px_rgba(19,59,38,0.08)] transition hover:-translate-y-0.5 hover:border-brand-green/50"
              onClick={handlePreviousStep}
              type="button"
            >
              Kembali
            </button>
          ) : (
            <span />
          )}

          {currentStep < registerSteps.length - 1 ? (
            <button
              className="min-h-12 rounded-2xl bg-brand-lime px-6 text-sm font-extrabold text-primary-dark shadow-[0_14px_32px_rgba(150,231,29,0.28)] transition hover:-translate-y-0.5 hover:bg-[#8fe115] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
              onClick={handleNextStep}
              type="button"
            >
              Lanjut
            </button>
          ) : (
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Mengirim...' : 'Ajukan verifikasi'}
            </Button>
          )}
        </div>
      </form>
    </AuthLayout>
  )
}
