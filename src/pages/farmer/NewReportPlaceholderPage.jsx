import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/apiClient'
import { symptomKeyMap } from '../../services/aiDiagnosisService'

function humanLabel(key) {
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(' ')
}

export default function NewReportPlaceholderPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const symptomList = Object.entries(symptomKeyMap).map(([formKey, apiKey]) => ({
    formKey,
    apiKey,
    label: humanLabel(formKey),
  }))

  function toggle(symptom) {
    setSelected((prev) => {
      if (prev.includes(symptom)) return prev.filter((s) => s !== symptom)
      return [...prev, symptom]
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (selected.length === 0) {
      setError('Pilih minimal satu gejala')
      return
    }

    const payload = { symptoms: selected }

    try {
      setLoading(true)
      const data = await apiRequest('/ai/diagnose', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setResult(data)
    } catch (err) {
      setError(err.message || 'Gagal mengirim laporan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-bg px-4 py-8 sm:py-10">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-standard-border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-brand-green">Laporan Gejala</p>
        <h1 className="mt-4 text-2xl font-bold leading-tight text-primary-dark">
          Pilih gejala yang muncul pada ternak Anda
        </h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptomList.map((s) => (
              <label
                key={s.apiKey}
                className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${selected.includes(s.apiKey) ? 'border-brand-lime bg-brand-lime/10' : 'border-standard-border'}`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selected.includes(s.apiKey)}
                  onChange={() => toggle(s.apiKey)}
                />
                <div>
                  <div className="font-medium text-sm">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.apiKey}</div>
                </div>
              </label>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark disabled:opacity-60"
            >
              {loading ? 'Mengirim...' : 'Kirim Laporan'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/peternak/dashboard')}
              className="inline-flex items-center rounded-xl border px-4 py-2 text-sm"
            >
              Batal
            </button>
          </div>
        </form>

        {result && (
          <section className="mt-6 rounded-md border border-standard-border bg-slate-50 p-4">
            <h2 className="font-bold">Hasil Diagnosa</h2>
            <p className="mt-2 text-sm">Nama Penyakit: <strong>{result?.diseaseName ?? result?.data?.diseaseName}</strong></p>
            <p className="mt-1 text-sm">Tingkat: <strong>{result?.urgencyLevel ?? result?.data?.urgencyLevel}</strong></p>
            <p className="mt-2 text-sm text-gray-700">{result?.description ?? result?.data?.description}</p>
          </section>
        )}
      </section>
    </main>
  )
}
