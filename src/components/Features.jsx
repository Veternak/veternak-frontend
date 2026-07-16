const smartFeatures = [
  {
    badge: 'Unggulan',
    className: 'md:col-span-2 bg-brand-green text-white',
    desc: 'Asisten laporan membantu menyusun gejala, foto, dan catatan peternak menjadi ringkasan yang mudah ditinjau dokter.',
    icon: (
      <path d="M4 13h4l2-6 4 12 2-6h4" />
    ),
    title: 'Sistem Triage AI 24/7',
  },
  {
    className: 'bg-[#F2EEDB] text-primary-dark',
    desc: 'Materi edukasi ringkas untuk membantu peternak memahami perawatan harian.',
    icon: (
      <path d="M4 19.5V6a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2.5" />
    ),
    title: 'Veternak Academy',
  },
  {
    className: 'bg-[#F4FAF1] text-primary-dark',
    desc: 'Lihat riwayat kondisi, laporan, dan tindak lanjut ternak dalam satu tempat.',
    icon: (
      <path d="M12 21s7-4.4 7-11V5l-7-3-7 3v5c0 6.6 7 11 7 11Z" />
    ),
    title: 'Radar Klinik',
  },
  {
    className: 'md:col-span-2 bg-[#EAF4E6] text-primary-dark',
    desc: 'Bicara langsung dengan dokter hewan untuk konsultasi dan request kunjungan bila diperlukan.',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3dcf2d1f?auto=format&fit=crop&q=80&w=900',
    title: 'Konsultasi Virtual',
  },
]

const productFeatures = [
  'Profil ternak dan riwayat kondisi',
  'Laporan gejala dengan foto pendukung',
  'Penilaian awal tingkat urgensi',
  'Rekomendasi dokter sesuai kebutuhan',
  'Konsultasi dan request kunjungan',
  'Notifikasi status kasus dan tindak lanjut',
]

function CardIcon({ children }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-brand-green shadow-sm">
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
          {children}
        </g>
      </svg>
    </div>
  )
}

export default function Features() {
  return (
    <section className="relative z-20 overflow-hidden bg-white px-5 py-24 md:py-32">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-soft/80 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-brand-lime/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">Solusi inti kami</p>
            <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-primary-dark md:text-5xl">
              Fitur Cerdas untuk Peternak Modern
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-gray-600 lg:justify-self-end">
            Teknologi yang dirancang untuk mempermudah manajemen kesehatan ternak tanpa melepas sentuhan manusiawi dan keputusan profesional dokter.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {smartFeatures.map((item) => (
            <article
              className={[
                'group relative min-h-52 overflow-hidden rounded-[28px] border border-[#E7EFE4] p-6 shadow-[0_18px_48px_rgba(19,59,38,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_68px_rgba(19,59,38,0.13)]',
                item.className,
              ].join(' ')}
              key={item.title}
            >
              {item.image ? (
                <img alt="" aria-hidden="true" className="absolute bottom-0 right-0 h-full w-1/2 object-cover opacity-85 transition duration-700 group-hover:scale-105" src={item.image} />
              ) : null}
              <div className="relative z-10 max-w-sm">
                {item.badge ? (
                  <span className="inline-flex rounded-full bg-brand-lime px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary-dark">
                    {item.badge}
                  </span>
                ) : item.icon ? (
                  <CardIcon>{item.icon}</CardIcon>
                ) : null}
                <h3 className="mt-6 text-xl font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 opacity-80">{item.desc}</p>
                {item.title === 'Konsultasi Virtual' ? (
                  <button className="mt-5 rounded-full bg-brand-green px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(47,107,60,0.22)]" type="button">
                    Mulai Konsultasi
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[32px] border border-[#E7EFE4] bg-[#F8FAF8] p-6 shadow-[0_20px_54px_rgba(19,59,38,0.08)] md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">Fitur-fitur</p>
              <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-primary-dark">
                Alur kesehatan ternak yang lengkap dan tetap aman.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {productFeatures.map((item) => (
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(19,59,38,0.05)]" key={item}>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-lime text-primary-dark">
                    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                  </span>
                  <p className="text-sm font-bold leading-6 text-primary-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
