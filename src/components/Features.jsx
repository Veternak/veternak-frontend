import imgTriage from '../assets/feat-triage.png';
import imgRadar from '../assets/feat-radar.png';

const smartFeatures = [
  {
    badge: 'Unggulan',
    className: 'md:col-span-2 bg-brand-green text-white',
    desc: 'Asisten laporan membantu menyusun gejala, foto, dan catatan peternak menjadi ringkasan yang mudah ditinjau dokter.',
    icon: <path d="M4 13h4l2-6 4 12 2-6h4" />,
    title: 'Sistem Triage AI 24/7',
    image: imgTriage,
    // THE SECRET: The hex must match the card background exactly
    fadeColor: '#2F6B3C' 
  },
  {
    className: 'bg-[#FBF9EE] text-primary-dark border-[#EFE9D5]',
    desc: 'Belanja pakan, alat, aksesori, dan produk pendukung kesehatan.',
    icon: <path d="M4 19.5V6a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2.5" />,
    title: 'Kebutuhan Kandang dan Perawatan',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=500',
    fadeColor: '#FBF9EE'
  },
  {
    className: 'bg-[#F8FAF8] text-primary-dark border-[#E7EFE4]',
    desc: 'Lihat riwayat kondisi, laporan, dan tindak lanjut ternak dalam satu tempat.',
    icon: <path d="M12 21s7-4.4 7-11V5l-7-3-7 3v5c0 6.6 7 11 7 11Z" />,
    title: 'Radar Klinik',
    image: imgRadar,
    fadeColor: '#F8FAF8'
  },
  {
    className: 'md:col-span-2 bg-[#EAF4E6] text-primary-dark border-[#DCE8D6]',
    desc: 'Bicara langsung dengan dokter hewan untuk konsultasi dan request kunjungan bila diperlukan.',
    title: 'Konsultasi Virtual',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900',
    fadeColor: '#EAF4E6'
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
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-brand-green shadow-sm">
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
    <section className="relative z-20 overflow-hidden bg-white px-5 py-24 md:py-10" id="produk">
      {/* Background blobs */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-soft/80 blur-3xl opacity-50" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-brand-lime/15 blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start mb-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">Solusi inti kami</p>
            <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-primary-dark md:text-5xl">
              Fitur Cerdas untuk Peternak Modern
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-gray-600 lg:justify-self-end lg:mt-10">
            Teknologi yang dirancang untuk mempermudah manajemen kesehatan ternak tanpa melepas sentuhan manusiawi dan keputusan profesional dokter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {smartFeatures.map((item) => (
            <article
              className={[
                'group relative min-h-[320px] md:min-h-[280px] overflow-hidden rounded-[2.5rem] border p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-green/10',
                item.className,
              ].join(' ')}
              key={item.title}
            >
              {/* IMAGE LAYER */}
              {item.image && (
                <div className="absolute inset-0 z-0">
                  <img 
                    alt="" 
                    className="absolute bottom-0 right-0 h-full w-[70%] object-cover object-center opacity-50 transition-transform duration-700 group-hover:scale-110" 
                    src={item.image} 
                  />
                  
                  {/* THE FADE FIX: Using inline style for the gradient to ensure perfect color matching */}
                  <div 
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, ${item.fadeColor} 0%, ${item.fadeColor} 40%, transparent 85%)`
                    }}
                  />
                </div>
              )}

              {/* CONTENT LAYER */}
              <div className="relative z-20 max-w-[240px] md:max-w-[280px]">
                {item.badge ? (
                  <span className="inline-flex rounded-full bg-brand-lime px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary-dark mb-6">
                    {item.badge}
                  </span>
                ) : (
                  <div className="mb-6"><CardIcon>{item.icon}</CardIcon></div>
                )}
                
                <h3 className="text-2xl font-extrabold tracking-tight mb-3 leading-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-90 font-medium">{item.desc}</p>
                
                {item.title === 'Konsultasi Virtual' && (
                  <button className="mt-6 rounded-full bg-brand-green px-6 py-3 text-xs font-black text-white shadow-lg shadow-brand-green/20 cursor-pointer active:scale-95 transition-all hover:bg-[#255532]" type="button">
                    Mulai Konsultasi
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Feature Checklist */}
        <div className="mt-12 rounded-[2.5rem] border border-[#E7EFE4] bg-[#F8FAF8] p-8 md:p-12 shadow-sm">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-green mb-3">Workflow</p>
              <h3 className="text-3xl font-extrabold tracking-tight text-primary-dark leading-tight">
                Alur kesehatan ternak yang lengkap dan tetap aman.
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {productFeatures.map((item) => (
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-50" key={item}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-lime text-primary-dark">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <p className="text-xs font-bold leading-tight text-primary-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}