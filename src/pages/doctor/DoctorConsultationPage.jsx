import { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import CasePriorityBadge from '../../components/doctor/CasePriorityBadge'
import DoctorSectionCard from '../../components/doctor/DoctorSectionCard'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import { marketplaceProducts } from '../../data/marketplaceProducts'
import { getConsultationById, getChatHistory } from '../../services/doctorAuthService'
import { useChatSocket } from '../../services/socket'

const productRecommendationPrefix = '[REKOMENDASI_PRODUK]'

const demoCaseDetail = {
  id: 'demo',
  status: 'ACTIVE',
  urgencyLevel: 'MEDIUM',
  animal: {
    name: 'Sapi Demo',
    species: 'Sapi',
  },
  farmer: {
    name: 'Peternak Demo',
    district: 'Sleman',
    regency: 'Yogyakarta',
  },
  aiDiagnosisSummary: 'Ringkasan gejala demo:\n- Ternak terlihat lemas\n- Nafsu makan turun\n- Perlu observasi dan konsultasi lanjutan',
}

const demoMessages = [
  {
    id: 'demo-1',
    senderRole: 'FARMER',
    message: 'Dok, sapi saya sejak pagi terlihat lemas dan tidak mau makan.',
    createdAt: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
  },
  {
    id: 'demo-2',
    senderRole: 'VET',
    message: 'Baik, pisahkan dulu dari ternak lain dan pastikan air bersih tersedia. Saya akan bantu pantau dari gejalanya.',
    createdAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
  },
  {
    id: 'demo-3',
    senderRole: 'VET',
    message: buildProductRecommendation(marketplaceProducts[1]),
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
]

function buildProductRecommendation(product) {
  return [
    productRecommendationPrefix,
    `Nama: ${product.name}`,
    `Kategori: ${product.category}`,
    `Harga: ${product.price}`,
    `Unit: ${product.unit}`,
    `Catatan: ${product.description}`,
    'Gunakan sesuai arahan dokter hewan. Ini bukan pengganti pemeriksaan langsung.',
  ].join('\n')
}

function parseProductRecommendation(text) {
  if (!text?.startsWith(productRecommendationPrefix)) return null

  return text
    .split('\n')
    .slice(1)
    .reduce((acc, line) => {
      const [key, ...value] = line.split(':')
      if (!key || value.length === 0) return acc
      acc[key.trim().toLowerCase()] = value.join(':').trim()
      return acc
    }, {})
}

function MessageBody({ text }) {
  const product = parseProductRecommendation(text)

  if (!product) {
    return <p className="mt-1 font-semibold whitespace-pre-wrap">{text}</p>
  }

  return (
    <div className="mt-2 rounded-2xl border border-white/20 bg-white/95 p-4 text-primary-dark shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-green">Rekomendasi marketplace</p>
      <h3 className="mt-2 text-base font-bold leading-tight">{product.nama}</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-[#505B53]">
        <span className="rounded-full bg-brand-soft px-3 py-1">{product.kategori}</span>
        <span className="rounded-full bg-[#F1F3F5] px-3 py-1">{product.harga}</span>
        <span className="rounded-full bg-[#F1F3F5] px-3 py-1">{product.unit}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#505B53]">{product.catatan}</p>
      <p className="mt-3 rounded-xl bg-[#FFF7D6] p-3 text-xs font-semibold leading-5 text-[#725300]">
        Gunakan sesuai arahan dokter hewan. Ini bukan pengganti pemeriksaan langsung.
      </p>
    </div>
  )
}

export default function DoctorConsultationPage() {
  const { id } = useParams()
  const isDemo = id === 'demo'
  const [caseDetail, setCaseDetail] = useState(null)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [productQuery, setProductQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const chatBottomRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Fetch case detail & chat history
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError('')

    if (isDemo) {
      setCaseDetail(demoCaseDetail)
      setMessages(demoMessages)
      setIsLoading(false)
      return () => {
        isMounted = false
      }
    }

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
  }, [id, isDemo])

  // Handle incoming message from socket
  const handleIncomingMessage = useCallback((message) => {
    setMessages((current) => {
      // Avoid duplicate messages
      if (current.some((m) => m.id === message.id)) return current
      return [...current, message]
    })
  }, [])

  // Connect socket.io
  const { isConnected, sendMessage } = useChatSocket(isDemo ? null : id, handleIncomingMessage)

  const appendDemoMessage = (text) => {
    setMessages((current) => [
      ...current,
      {
        id: `demo-${Date.now()}`,
        senderRole: 'VET',
        message: text,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!draft.trim()) return

    if (isDemo) {
      appendDemoMessage(draft.trim())
    } else {
      sendMessage(draft.trim())
    }
    setDraft('')
  }

  const recommendedProducts = marketplaceProducts.filter((product) => {
    const query = productQuery.toLowerCase()
    const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase()
    return product.category === 'Obat & vitamin' && searchable.includes(query)
  })

  const handleSendProduct = (product) => {
    const message = buildProductRecommendation(product)
    if (isDemo) {
      appendDemoMessage(message)
      return
    }
    if (isConnected) {
      sendMessage(message)
      return
    }
    setDraft(message)
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
                {isDemo ? 'Mode Demo' : isConnected ? 'Terhubung' : 'Terputus'}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-dark">Konsultasi {caseDetail.animal?.name || 'Ternak'}</h1>
            <p className="mt-2 text-sm text-gray-600">{isDemo ? 'Tampilan demo chat dokter tanpa backend.' : 'Pesan Anda terkirim secara langsung dan real-time ke aplikasi Peternak.'}</p>
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
                  <MessageBody text={message.message || message.body} />
                  <p className="mt-2 text-[10px] opacity-70 text-right">
                    {new Date(message.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              )
            })
          )}
          <div ref={chatBottomRef} />
        </div>

        <form className="mt-5 flex flex-col gap-3 md:flex-row animate-slide-up" onSubmit={handleSend}>
          <label className="sr-only" htmlFor="chat-draft">Tulis pesan</label>
          <input
            className="doctor-input mt-0 flex-1"
            id="chat-draft"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Tulis pesan untuk peternak..."
            value={draft}
            disabled={!isDemo && !isConnected}
          />
          <button
            className="min-h-12 rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark shadow-sm hover:bg-[#78B916] transition-colors disabled:opacity-60"
            type="submit"
            disabled={(!isDemo && !isConnected) || !draft.trim()}
          >
            Kirim
          </button>
        </form>
      </section>

      <aside className="space-y-6">
        <DoctorSectionCard title="Panel kasus">
          <div className="max-h-[220px] overflow-y-auto pr-1 bg-neutral-bg p-3 rounded-xl border border-gray-100/50">
            <pre className="text-xs leading-relaxed text-gray-600 whitespace-pre-wrap font-sans font-semibold">
              {caseDetail.aiDiagnosisSummary || 'Tidak ada detail.'}
            </pre>
          </div>
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

        <DoctorSectionCard title="Rekomendasi obat marketplace">
          <p className="text-sm leading-6 text-gray-600">
            Pilih produk kategori obat dan vitamin untuk dikirim sebagai rekomendasi chat. Dosis tetap harus Anda jelaskan sendiri bila diperlukan.
          </p>
          <input
            className="doctor-input mt-4"
            onChange={(event) => setProductQuery(event.target.value)}
            placeholder="Cari vitamin, elektrolit..."
            type="search"
            value={productQuery}
          />
          <div className="mt-4 max-h-[320px] space-y-3 overflow-y-auto pr-1">
            {recommendedProducts.map((product) => (
              <article key={product.id} className="rounded-2xl border border-standard-border bg-white p-4 shadow-sm">
                <div className="flex gap-3">
                  <img src={product.image} alt={product.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-tight text-primary-dark">{product.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-gray-500">{product.price} / {product.unit}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600">{product.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSendProduct(product)}
                  className="mt-3 min-h-10 w-full rounded-xl bg-brand-lime px-4 text-xs font-bold text-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDemo || isConnected ? 'Kirim ke chat' : 'Masukkan ke draft'}
                </button>
              </article>
            ))}
          </div>
          {recommendedProducts.length === 0 && (
            <p className="mt-4 rounded-xl bg-neutral-bg p-4 text-sm font-semibold text-gray-500">Produk tidak ditemukan.</p>
          )}
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
