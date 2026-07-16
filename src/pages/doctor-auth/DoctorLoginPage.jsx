import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import FormError from '../../components/ui/FormError'
import InputField from '../../components/ui/InputField'
import PasswordInput from '../../components/ui/PasswordInput'
import AuthLayout from '../../layouts/AuthLayout'
import { loginDoctor } from '../../services/doctorAuthService'

const initialValues = {
  identifier: '',
  password: '',
}

function validateDoctorLogin(values) {
  const nextErrors = {}

  if (!values.identifier.trim()) {
    nextErrors.identifier = 'Nomor HP atau email wajib diisi.'
  } else if (values.identifier.trim().length < 6) {
    nextErrors.identifier = 'Masukkan nomor HP atau email yang valid.'
  }

  if (!values.password) {
    nextErrors.password = 'Password wajib diisi.'
  } else if (values.password.length < 8) {
    nextErrors.password = 'Password minimal 8 karakter.'
  }

  return nextErrors
}

export default function DoctorLoginPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
    if (formError) setFormError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateDoctorLogin(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setFormError('')

    try {
      await loginDoctor(values)
      navigate('/dokter-app/dashboard')
    } catch (error) {
      setFormError(error.message || 'Login demo gagal. Coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Akun Dokter"
      footer={
        <>
          Belum punya akun dokter?{' '}
          <Link className="font-bold text-brand-green hover:underline" to="/dokter/daftar">
            Daftar dokter
          </Link>
        </>
      }
      subtitle="Masuk untuk meninjau kasus, mengelola konsultasi, dan memperbarui status layanan Anda."
      title="Masuk Dokter Hewan"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-[#D8EDAC] bg-[#F8FCEF] px-4 py-3 text-sm text-primary-dark">
          <span className="font-bold">Data Demo.</span> Login ini masih simulasi dan belum terhubung ke layanan akun sungguhan.
        </div>

        <InputField
          autoComplete="username"
          error={errors.identifier}
          id="doctor-identifier"
          inputMode="email"
          label="Nomor HP atau Email"
          name="identifier"
          onChange={handleChange}
          placeholder="Contoh: dokter@veternak.id"
          value={values.identifier}
        />

        <div>
          <PasswordInput
            autoComplete="current-password"
            error={errors.password}
            id="doctor-password"
            label="Kata Sandi"
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            value={values.password}
          />
          <div className="mt-3 text-right">
            <Link className="text-sm font-bold text-brand-green hover:underline" to="/lupa-password">
              Lupa password?
            </Link>
          </div>
        </div>

        <FormError>{formError}</FormError>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Memeriksa akun dokter...' : 'Masuk ke Dashboard →'}
        </Button>
      </form>
    </AuthLayout>
  )
}
