import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CasePriorityBadge from '../../components/doctor/CasePriorityBadge'
import ClinicalRecordForm from '../../components/doctor/ClinicalRecordForm'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { getConsultationById, updateCaseStatus } from '../../services/doctorAuthService'

export default function DoctorCaseDetailPage() {
  const { id } = useParams()
  const [caseDetail, setCaseDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [decision, setDecision] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadCase = () => {
    setIsLoading(true)
    setError('')
    getConsultationById(id)
      .then((res) => {
        const cons = res?.data?.consultation || res?.consultation || res
        setCaseDetail(cons)
        setDecision(cons.status === 'ACTIVE' ? 'accepted' : cons.status === 'REJECTED' ? 'rejected' : '')
      })
      .catch((err) => {
        setError(err?.message || 'Gagal memuat detail kasus.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    loadCase()
  }, [id])

  const handleAccept = async () => {
    setIsSubmitting(true)
    try {
      await updateCaseStatus(id, 'ACTIVE')
      setDecision('accepted')
      alert('Kasus konsultasi berhasil diterima!')
      loadCase()
    } catch (err) {
      alert(err?.message || 'Gagal menerima kasus.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!rejectReason) {
      alert('Pilih alasan penolakan terlebih dahulu.')
      return
    }
    setIsSubmitting(true)
    try {
      await updateCaseStatus(id, 'REJECTED')
      setDecision('rejected')
      alert('Kasus konsultasi ditolak.')
      loadCase()
    } catch (err) {
      alert(err?.message || 'Gagal menolak kasus.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2.5rem] bg-white border border-gray-100 p-8 text-center text-sm font-semibold text-gray-500 shadow-sm">
        Memuat detail kasus konsultasi dari database...
      </section>
    )
  }

  if (error || !caseDetail) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2.5rem] bg-white border border-gray-100 p-8 text-center shadow-sm">
        <Link className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green" to="/dokter-app/kasus">
          ← Kembali ke antrean kasus
        </Link>
        <h1 className="text-2xl font-bold text-primary-dark">Kasus tidak ditemukan</h1>
        <p className="mt-3 text-sm text-gray-600">{error || 'Data konsultasi tidak dapat ditemukan.'}</p>
      </section>
    )
  }

  const urgencyLabel = caseDetail.urgencyLevel === 'HIGH' ? 'Darurat' : caseDetail.urgencyLevel === 'MEDIUM' ? 'Mendesak' : 'Ringan';
  const locationLabel = [caseDetail.farmer?.district, caseDetail.farmer?.regency, caseDetail.farmer?.province].filter(Boolean).join(', ') || 'Lokasi tidak diisi';
  const reportedAt = new Date(caseDetail.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
      <header className="rounded-[32px] border border-[#E7EFE4] bg-gradient-to-br from-white via-white to-[#F8FCEF] p-6 shadow-[0_22px_58px_rgba(19,59,38,0.12),0_3px_10px_rgba(19,59,38,0.04)] md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <CasePriorityBadge label={urgencyLabel} urgency={caseDetail.urgencyLevel} />
              <DoctorStatusBadge status={caseDetail.status} />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">{caseDetail.animal?.name || 'Ternak'}</h1>
            <p className="mt-2 text-gray-600">
              Peternak: {caseDetail.farmer?.name || 'Anonim'} · {caseDetail.animal?.species || 'Hewan'} · {locationLabel}
            </p>
          </div>
          <p className="rounded-full bg-white px-3 py-1 text-sm font-bold text-gray-500 shadow-sm self-start">{reportedAt}</p>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-6">
          <DoctorSectionCard eyebrow="AI Diagnosis" title="Hasil analisis awal AI">
            <pre className="whitespace-pre-wrap rounded-2xl bg-neutral-bg p-4 leading-7 text-sm text-gray-700 font-mono">
              {caseDetail.aiDiagnosisSummary || 'Tidak ada detail laporan gejala dari peternak.'}
            </pre>
          </DoctorSectionCard>

          {caseDetail.visit && (
            <DoctorSectionCard title="Informasi kunjungan lapangan">
              <div className="rounded-2xl border border-[#E7EFE4] bg-brand-soft p-4 leading-7 text-gray-700 shadow-sm text-sm font-medium">
                <p>Status: <span className="font-bold text-brand-green">{caseDetail.visit.status}</span></p>
                <p className="mt-1">Jadwal Diminta: {new Date(caseDetail.visit.estimatedTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                {caseDetail.visit.notes && <p className="mt-1 text-gray-500">Catatan: {caseDetail.visit.notes}</p>}
                {caseDetail.visit.eta && <p className="mt-1 text-brand-green">ETA Dokter: {caseDetail.visit.eta}</p>}
              </div>
            </DoctorSectionCard>
          )}

          {decision === 'accepted' || caseDetail.status === 'ACTIVE' ? (
            <DoctorSectionCard description="Catat diagnosis riil dan anjuran penanganan klinis hewan." title="Pemberian rekam medis klinis">
              <ClinicalRecordForm caseId={caseDetail.id} />
            </DoctorSectionCard>
          ) : null}
        </div>

        <aside className="space-y-6">
          <DoctorSectionCard title="Data ternak">
            <dl className="grid gap-3 text-sm">
              {[
                ['Nama', caseDetail.animal?.name],
                ['Spesies', caseDetail.animal?.species],
                ['Umur estimasi', caseDetail.animal?.age || '-'],
                ['Jenis kelamin', caseDetail.animal?.gender === 'MALE' ? 'Jantan' : 'Betina'],
              ].map(([label, value]) => (
                <div className="rounded-xl bg-neutral-bg px-4 py-3" key={label}>
                  <dt className="font-bold text-gray-500">{label}</dt>
                  <dd className="mt-1 text-primary-dark font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </DoctorSectionCard>

          <DoctorSectionCard description="Pilih keputusan untuk menyetujui konsultasi chat atau menolak kasus." title="Keputusan kasus">
            {decision === 'accepted' || caseDetail.status === 'ACTIVE' ? (
              <div className="space-y-3">
                <p className="rounded-2xl bg-[#E8F5EC] p-4 text-sm font-bold text-[#1D5937]">Kasus diterima. Status: aktif.</p>
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark hover:bg-[#78B916] transition-colors"
                  to={`/dokter-app/konsultasi/${caseDetail.id}`}
                >
                  Buka Ruang Chat Konsultasi
                </Link>
              </div>
            ) : decision === 'rejected' || caseDetail.status === 'REJECTED' ? (
              <div className="space-y-3">
                <p className="rounded-2xl bg-[#FDEBEC] p-4 text-sm font-bold text-[#912525]">Kasus telah ditolak.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  className="min-h-12 w-full rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark hover:bg-[#78B916] transition-colors"
                  onClick={handleAccept}
                  type="button"
                  disabled={isSubmitting}
                >
                  Terima Kasus
                </button>
                <label className="block">
                  <span className="text-sm font-bold text-primary-dark">Alasan tolak</span>
                  <select
                    className="doctor-select"
                    onChange={(event) => setRejectReason(event.target.value)}
                    value={rejectReason}
                  >
                    <option value="">Pilih alasan sebelum menolak</option>
                    <option value="Di luar area layanan">Di luar area layanan</option>
                    <option value="Sedang tidak tersedia">Sedang tidak tersedia</option>
                    <option value="Butuh rujukan layanan terdekat">Butuh rujukan layanan terdekat</option>
                  </select>
                </label>
                <button
                  className="min-h-12 w-full rounded-xl border border-[#F5C2C2] bg-white px-5 py-3 text-sm font-bold text-[#912525] disabled:opacity-50 hover:bg-red-50 transition-colors"
                  disabled={!rejectReason || isSubmitting}
                  onClick={handleReject}
                  type="button"
                >
                  Tolak Kasus
                </button>
              </div>
            )}
          </DoctorSectionCard>
        </aside>
      </section>
    </div>
  )
}
