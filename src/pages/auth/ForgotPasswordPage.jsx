import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import FormError from '../../components/ui/FormError'
import InputField from '../../components/ui/InputField'
import AuthLayout from '../../layouts/AuthLayout'

const initialValues = {
  phone: '',
}

function validateForgotPassword(values) {
  const nextErrors = {}

  if (!values.phone.trim()) {
    nextErrors.phone = 'Nomor telepon wajib diisi.'
  } else if (values.phone.trim().length < 9) {
    nextErrors.phone = 'Nomor telepon terlalu pendek.'
  }

  return nextErrors
}

export default function ForgotPasswordPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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

    if (formError) setFormError('')
    if (isSuccess) setIsSuccess(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateForgotPassword(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setFormError('')

    window.setTimeout(() => {
      if (values.phone.trim() === '000000000') {
        setFormError('Nomor demo ini tidak terdaftar. Periksa kembali nomor telepon.')
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setIsSuccess(true)
    }, 700)
  }

  return (
    <AuthLayout
      footer={
        <>
          Ingat kata sandi?{' '}
          <Link className="font-bold text-brand-green hover:underline" to="/masuk">
            Masuk di sini
          </Link>
        </>
      }
      subtitle="Masukkan nomor telepon akun Anda. Kami akan menyiapkan instruksi pemulihan kata sandi."
      title="Lupa Kata Sandi"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <InputField
          autoComplete="tel"
          error={errors.phone}
          id="phone"
          inputMode="tel"
          label="Nomor Telepon"
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

        {isSuccess ? (
          <div className="rounded-xl border border-brand-green/20 bg-brand-soft p-4 text-sm leading-6 text-brand-green">
            Instruksi pemulihan sudah disiapkan untuk nomor tersebut. Pada versi backend nanti, tautan atau kode OTP akan dikirim melalui kanal yang dipilih.
          </div>
        ) : null}

        <FormError>{formError}</FormError>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Memproses...' : 'Kirim Instruksi'}
        </Button>
      </form>
    </AuthLayout>
  )
}
