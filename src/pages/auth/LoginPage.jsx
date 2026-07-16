import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import FormError from '../../components/ui/FormError'
import InputField from '../../components/ui/InputField'
import PasswordInput from '../../components/ui/PasswordInput'
import AuthLayout from '../../layouts/AuthLayout'

const initialValues = {
  phone: '',
  password: '',
}

function validateLogin(values) {
  const nextErrors = {}

  if (!values.phone.trim()) {
    nextErrors.phone = 'Nomor telepon wajib diisi.'
  } else if (values.phone.trim().length < 9) {
    nextErrors.phone = 'Nomor telepon terlalu pendek.'
  }

  if (!values.password) {
    nextErrors.password = 'Password wajib diisi.'
  } else if (values.password.length < 8) {
    nextErrors.password = 'Password minimal 8 karakter.'
  }

  return nextErrors
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
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

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateLogin(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setFormError('')

    window.setTimeout(() => {
      if (values.phone.trim().toLowerCase() === 'gagal') {
        setFormError('Akun demo tidak ditemukan. Periksa kembali nomor telepon.')
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      navigate('/peternak/dashboard')
    }, 700)
  }

  return (
    <AuthLayout
      footer={
        <>
          Belum punya akun?{' '}
          <Link className="font-bold text-brand-green hover:underline" to="/daftar">
            Daftar di sini
          </Link>
        </>
      }
      subtitle="Pantau laporan, konsultasi, dan riwayat ternak."
      title="Selamat datang"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <InputField
          autoComplete="tel"
          error={errors.phone}
          id="phone"
          inputMode="tel"
          label="Nomor telepon"
          leftIcon={
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.67 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.24a2 2 0 0 1 2.11-.45c.9.32 1.84.54 2.8.67A2 2 0 0 1 22 16.92Z" />
            </svg>
          }
          name="phone"
          onChange={handleChange}
          placeholder="Contoh: 08123456789"
          value={values.phone}
        />

        <div>
          <PasswordInput
            autoComplete="current-password"
            error={errors.password}
            id="password"
            label="Kata sandi"
            leftIcon={
              <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="11" rx="2" width="18" x="3" y="11" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            value={values.password}
          />
          <div className="mt-3 text-right">
            <Link
              className="text-sm font-bold text-brand-green hover:underline"
              to="/lupa-password"
            >
              Lupa password?
            </Link>
          </div>
        </div>

        <FormError>{formError}</FormError>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Memeriksa...' : 'Masuk →'}
        </Button>
      </form>
    </AuthLayout>
  )
}
