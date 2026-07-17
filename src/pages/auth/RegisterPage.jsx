import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import FormError from '../../components/ui/FormError'
import InputField from '../../components/ui/InputField'
import PasswordInput from '../../components/ui/PasswordInput'
import AuthLayout from '../../layouts/AuthLayout'
import { registerFarmer } from '../../services/farmerAuthService'

const initialValues = {
  fullName: '',
  phone: '',
  province: '',
  regency: '',
  password: '',
  confirmPassword: '',
  consent: false,
}

const provinceOptions = [
  { label: 'Pilih Provinsi', value: '' },
  { label: 'Aceh', value: 'Aceh' },
  { label: 'Sumatera Utara', value: 'Sumatera Utara' },
  { label: 'Sumatera Barat', value: 'Sumatera Barat' },
  { label: 'Riau', value: 'Riau' },
  { label: 'Jawa Barat', value: 'Jawa Barat' },
  { label: 'Jawa Tengah', value: 'Jawa Tengah' },
  { label: 'DI Yogyakarta', value: 'DI Yogyakarta' },
  { label: 'Jawa Timur', value: 'Jawa Timur' },
  { label: 'Bali', value: 'Bali' },
  { label: 'Nusa Tenggara Barat', value: 'Nusa Tenggara Barat' },
  { label: 'Nusa Tenggara Timur', value: 'Nusa Tenggara Timur' },
  { label: 'Sulawesi Selatan', value: 'Sulawesi Selatan' },
  { label: 'Kalimantan Selatan', value: 'Kalimantan Selatan' },
]

function validateRegister(values) {
  const nextErrors = {}

  if (!values.fullName.trim()) {
    nextErrors.fullName = 'Nama lengkap wajib diisi.'
  }

  if (!values.phone.trim()) {
    nextErrors.phone = 'Nomor HP wajib diisi.'
  } else if (values.phone.trim().length < 9) {
    nextErrors.phone = 'Nomor HP terlalu pendek.'
  }

  if (!values.province) {
    nextErrors.province = 'Provinsi wajib dipilih.'
  }

  if (!values.regency.trim()) {
    nextErrors.regency = 'Kabupaten wajib diisi.'
  }

  if (!values.password) {
    nextErrors.password = 'Password wajib diisi.'
  } else if (values.password.length < 8) {
    nextErrors.password = 'Password minimal 8 karakter.'
  }

  if (!values.confirmPassword) {
    nextErrors.confirmPassword = 'Konfirmasi password wajib diisi.'
  } else if (values.confirmPassword !== values.password) {
    nextErrors.confirmPassword = 'Konfirmasi password belum sama.'
  }

  if (!values.consent) {
    nextErrors.consent = 'Persetujuan wajib dicentang untuk membuat akun.'
  }

  return nextErrors
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { checked, name, type, value } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((current) => ({
      ...current,
      [name]: nextValue,
    }))

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: '',
      }))
    }

    if (formError) {
      setFormError('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateRegister(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    const registerPayload = {
      name: values.fullName.trim(),
      phone: values.phone.trim(),
      province: values.province,
      regency: values.regency.trim(),
      password: values.password,
      consentAccepted: values.consent,
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      await registerFarmer({
        name: registerPayload.name,
        phone: registerPayload.phone,
        province: registerPayload.province,
        regency: registerPayload.regency,
        password: registerPayload.password,
      })
      navigate('/masuk')
    } catch (error) {
      setFormError(error?.message || 'Gagal membuat akun. Coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Daftar Sekarang"
      footer={
        <>
          Sudah punya akun?{' '}
          <Link className="font-bold text-brand-green hover:underline" to="/masuk">
            Masuk di sini
          </Link>
        </>
      }
      infoPanel={
        <div className="max-w-md">
          <span className="inline-flex rounded-full bg-brand-lime px-4 py-1 text-xs font-medium text-primary-dark">
            Gabung Komunitas
          </span>
          <h2 className="mt-7 font-serif text-3xl font-bold leading-snug text-brand-green">
            Mulai rapi dari laporan pertama.
          </h2>
          <p className="mt-5 text-base leading-8 text-gray-700">
            Buat akun, lengkapi profil, lalu pantau kondisi ternak dalam satu alur kerja.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-brand-green text-xs font-bold text-white">P</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#E9B44C] text-xs font-bold text-primary-dark">D</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#8FB996] text-xs font-bold text-primary-dark">V</span>
            </div>
            <p className="text-base leading-6 text-gray-700">
              Bergabung bersama peternak dan dokter di ekosistem Veternak.
            </p>
          </div>
        </div>
      }
      subtitle="Daftar singkat. Profil kandang bisa dilengkapi nanti."
      title="Buat akun peternak"
      variant="register"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <InputField
          autoComplete="name"
          error={errors.fullName}
          id="fullName"
          label="Nama lengkap"
          name="fullName"
          onChange={handleChange}
          placeholder="Contoh: Budi Santoso"
          value={values.fullName}
        />

        <InputField
          autoComplete="tel"
          error={errors.phone}
          id="phone"
          inputMode="tel"
          label="Nomor Telepon (WhatsApp)"
          leftAddon="+62"
          name="phone"
          onChange={handleChange}
          placeholder="812-3456-7890"
          value={values.phone}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-bold text-primary-dark" htmlFor="province">
              Provinsi
            </label>
            <select
              aria-describedby={errors.province ? 'province-error' : undefined}
              aria-invalid={Boolean(errors.province)}
              className={[
                'doctor-select',
                errors.province ? 'border-[#D92D20]' : '',
              ].join(' ')}
              id="province"
              name="province"
              onChange={handleChange}
              value={values.province}
            >
              {provinceOptions.map((option) => (
                <option key={option.value || 'empty'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FormError id="province-error">{errors.province}</FormError>
          </div>

          <InputField
            autoComplete="address-level2"
            error={errors.regency}
            id="regency"
            label="Kabupaten"
            name="regency"
            onChange={handleChange}
            placeholder="Nama Kabupaten"
            value={values.regency}
          />
        </div>

        <PasswordInput
          autoComplete="new-password"
          error={errors.password}
          id="password"
          label="Kata Sandi"
          name="password"
          onChange={handleChange}
          placeholder="Minimal 8 karakter"
          value={values.password}
        />

        <PasswordInput
          autoComplete="new-password"
          error={errors.confirmPassword}
          id="confirmPassword"
          label="Konfirmasi Kata Sandi"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Ulangi password"
          value={values.confirmPassword}
        />

        <div>
          <label className="flex gap-3 rounded-2xl border border-[#DCE8D6] bg-white/70 p-4 text-sm leading-6 text-gray-700 shadow-[0_10px_24px_rgba(19,59,38,0.04)]">
            <input
              checked={values.consent}
              className="mt-1 h-5 w-5 rounded border-[#DCE8D6] accent-brand-green"
              name="consent"
              onChange={handleChange}
              type="checkbox"
            />
            <span>
              Saya menyetujui syarat penggunaan dan memahami Veternak membantu
              penilaian awal serta konsultasi, bukan diagnosis otomatis.
            </span>
          </label>
          <FormError id="consent-error">{errors.consent}</FormError>
        </div>

        <FormError>{formError}</FormError>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Membuat akun...' : 'Daftar sebagai Peternak'}
        </Button>
      </form>
    </AuthLayout>
  )
}
