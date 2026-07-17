import { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import CasePriorityBadge from '../../components/doctor/CasePriorityBadge'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { getConsultationById, getChatHistory } from '../../services/doctorAuthService'
import { useChatSocket } from '../../services/socket'

export default function DoctorConsultationPage() {
  const { id } = useParams()
  const [caseDetail, setCaseDetail] = useState(null)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch case detail & chat history
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError('')

    Promise.all([
      getConsultationById(id),
      getChatHistory(id),
    ])
      .then(([caseRes, chatRes]) => {
        if (!isMounted) return
        setCaseDetail(caseRes?.data?.consultation || caseRes?.consultation || caseRes)
        setMessages(chatRes?.data?.messages || chatRes || [])
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || 'Gagal memuat konsultasi.')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id])

  // Handle incoming message from socket
  const handleIncomingMessage = useCallback((message) => {
    setMessages((current) => {
      // Avoid duplicate messages
      if (current.some((m) => m.id === message.id)) return current
      return [...current, message]
    })
  }, [])

  // Connect socket.io
  const { isConnected, sendMessage } = useChatSocket(id, handleIncomingMessage)

  const handleSend = (e) => {
    e.preventDefault()
    if (!draft.trim()) return

    sendMessage(draft.trim())
    setDraft('')
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2.5rem] bg-white border border-gray-100 p-8 text-center text-sm font-semibold text-gray-500 shadow-sm">
        Memuat ruang chat konsultasi...
      </section>
    )
  }

  if (error || !caseDetail) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2.5rem] bg-white border border-gray-100 p-8 text-center shadow-sm">
        <Link className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-brand-green" to="/dokter-app/kasus">
          ← Kembali ke antrean kasus
        </Link>
        <h1 className="text-2xl font-bold text-primary-dark">Konsultasi tidak ditemukan</h1>
        <p className="mt-3 text-sm text-gray-600">{error || 'Data konsultasi tidak dapat ditemukan.'}</p>
      </section>
    )
  }

  const urgencyLabel = caseDetail.urgencyLevel === 'HIGH' ? 'Darurat' : caseDetail.urgencyLevel === 'MEDIUM' ? 'Mendesak' : 'Ringan'
  const locationLabel = [caseDetail.farmer?.district, caseDetail.farmer?.regency].filter(Boolean).join(', ') || 'Lokasi'

  return (
    <div className="mx-auto grid max-w-6xl gap-6 xl:grid-cols-[1.45fr_0.85fr] animate-fade-in">
      <section className="rounded-[32px] border border-[#E7EFE4] bg-white p-5 shadow-[0_18px_48px_rgba(19,59,38,0.11),0_2px_8px_rgba(19,59,38,0.04)] md:p-6 flex flex-col min-h-[580px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <DoctorStatusBadge status={caseDetail.status === 'ACTIVE' ? 'IN_CONSULTATION' : caseDetail.status} />
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${
                isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isConnected ? 'Terhubung' : 'Terputus'}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">Konsultasi {caseDetail.animal?.name || 'Ternak'}</h1>
            <p className="mt-2 text-sm text-gray-600">Pesan Anda terkirim secara langsung dan real-time ke aplikasi Peternak.</p>
          </div>
          <CasePriorityBadge label={urgencyLabel} urgency={caseDetail.urgencyLevel} />
        </div>

        <div className="mt-5 rounded-2xl border border-[#F4DE8A] bg-[#FFF7D6] p-4 text-sm leading-6 text-[#725300]">
          Chat bukan kanal darurat terjamin. Bila kondisi memburuk, arahkan peternak ke bantuan dokter atau layanan terdekat.
        </div>

        {/* Chat message flow container */}
        <div className="mt-6 flex-1 space-y-4 rounded-[24px] bg-neutral-bg p-4 overflow-y-auto max-h-[360px]">
          {messages.length === 0 ? (
            <p className="text-center text-xs font-semibold text-gray-400 py-10">Belum ada percakapan. Tulis pesan pertama Anda di bawah.</p>
          ) : (
            messages.map((message) => {
              const isDoctor = message.senderRole === 'VET' || message.senderRole === 'VETERINARIAN'
              const isSystem = message.senderRole === 'SYSTEM'

              return (
                <div
                  className={[
                    'max-w-[85%] rounded-2xl p-4 text-sm leading-6 shadow-sm',
                    isDoctor ? 'ml-auto bg-brand-green text-white' : '',
                    isSystem ? 'mx-auto border border-standard-border bg-white text-primary-dark' : '',
                    !isDoctor && !isSystem ? 'bg-white text-primary-dark' : '',
                  ].join(' ')}
                  key={message.id}
                >
                  <p className="font-bold text-xs opacity-75">
                    {isDoctor ? 'Anda' : isSystem ? 'Sistem' : caseDetail.farmer?.name || 'Peternak'}
                  </p>
                  <p className="mt-1 font-semibold">{message.message || message.body}</p>
                  <p className="mt-2 text-[10px] opacity-70 text-right">
                    {new Date(message.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              )
            })
          )}
        </div>

        <form className="mt-5 flex flex-col gap-3 md:flex-row animate-slide-up" onSubmit={handleSend}>
          <label className="sr-only" htmlFor="chat-draft">Tulis pesan</label>
          <input
            className="doctor-input mt-0 flex-1"
            id="chat-draft"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Tulis pesan untuk peternak..."
            value={draft}
            disabled={!isConnected}
          />
          <button
            className="min-h-12 rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark shadow-sm hover:bg-[#78B916] transition-colors disabled:opacity-60"
            type="submit"
            disabled={!isConnected || !draft.trim()}
          >
            Kirim
          </button>
        </form>
      </section>

      <aside className="space-y-6">
        <DoctorSectionCard title="Panel kasus">
          <pre className="text-sm leading-6 text-gray-600 bg-neutral-bg p-3 rounded-xl whitespace-pre-wrap font-mono">
            {caseDetail.aiDiagnosisSummary || 'Tidak ada detail.'}
          </pre>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="rounded-xl bg-neutral-bg px-4 py-3">
              <dt className="font-bold text-gray-500">Peternak</dt>
              <dd className="mt-0.5 text-primary-dark font-semibold">{caseDetail.farmer?.name || 'Peternak'}</dd>
            </div>
            <div className="rounded-xl bg-neutral-bg px-4 py-3">
              <dt className="font-bold text-gray-500">Lokasi</dt>
              <dd className="mt-0.5 text-primary-dark font-semibold">{locationLabel}</dd>
            </div>
            <div className="rounded-xl bg-neutral-bg px-4 py-3">
              <dt className="font-bold text-gray-500">Status</dt>
              <dd className="mt-0.5 text-primary-dark font-semibold">Konsultasi Aktif</dd>
            </div>
          </dl>
        </DoctorSectionCard>

        <div className="grid gap-3">
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark shadow-sm hover:bg-[#78B916] transition-colors" to="/dokter-app/kunjungan">
            Kelola Kunjungan
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-standard-border bg-white px-5 py-3 text-sm font-bold text-primary-dark hover:bg-neutral-bg transition-colors" to={`/dokter-app/kasus/${caseDetail.id}`}>
            Isi Hasil Profesional
          </Link>
        </div>
      </aside>
    </div>
  )
}
