import { useMemo, useState } from 'react'

const academyModules = [
  {
    id: 'feed-basics',
    title: 'Dasar Nutrisi Pakan Harian',
    category: 'Nutrisi',
    format: 'Artikel',
    duration: '7 menit baca',
    summary: 'Kenali komposisi pakan sederhana untuk menjaga energi dan kondisi tubuh ternak.',
    recommendation: 'Direkomendasikan untuk peternak dengan sapi potong aktif.',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'barn-sanitation',
    title: 'Checklist Sanitasi Kandang Mingguan',
    category: 'Kandang',
    format: 'Checklist',
    duration: '5 menit',
    summary: 'Langkah praktis membersihkan area pakan, lantai, dan saluran air tanpa membuat ternak stres.',
    recommendation: 'Cocok untuk pencegahan masalah berulang di kandang padat.',
    thumbnail: 'https://images.unsplash.com/photo-1594140733592-2374662df94d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'warning-signs',
    title: 'Tanda Kondisi Ternak Perlu Dipantau',
    category: 'Kesehatan',
    format: 'Artikel',
    duration: '8 menit baca',
    summary: 'Pelajari perubahan makan, gerak, napas, dan perilaku yang perlu dicatat sebelum konsultasi.',
    recommendation: 'Relevan untuk kasus aktif yang sedang menunggu respons dokter.',
    thumbnail: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'consultation-prep',
    title: 'Persiapan Data Sebelum Konsultasi',
    category: 'Konsultasi',
    format: 'Checklist',
    duration: '4 menit',
    summary: 'Daftar informasi yang membantu dokter membaca kondisi ternak dengan lebih cepat.',
    recommendation: 'Berguna sebelum membuat laporan kondisi baru.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'water-intake',
    title: 'Memantau Minum dan Dehidrasi Ringan',
    category: 'Kesehatan',
    format: 'Video',
    duration: '6 menit tonton',
    summary: 'Panduan observasi aman untuk mengenali perubahan asupan minum tanpa menyimpulkan diagnosis.',
    recommendation: 'Disarankan saat ternak terlihat lemas atau nafsu makan turun.',
    thumbnail: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'record-keeping',
    title: 'Membuat Catatan Kesehatan Ternak',
    category: 'Manajemen',
    format: 'Artikel',
    duration: '6 menit baca',
    summary: 'Cara sederhana mencatat tanggal, gejala, foto, dan tindak lanjut agar riwayat tidak hilang.',
    recommendation: 'Cocok untuk membangun kebiasaan monitoring harian.',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
  },
]

const categories = ['Semua', 'Kesehatan', 'Nutrisi', 'Kandang', 'Konsultasi', 'Manajemen']

function AcademyCard({ module }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#EFE9D5] bg-[#FFFDF7] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden bg-[#EFE9D5]">
        <img
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          src={module.thumbnail}
        />
      </div>
      <div className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold text-brand-green">
            {module.category}
          </span>
          <span className="rounded-full bg-[#FBF9EE] px-3 py-1 text-[11px] font-bold text-[#8C704B]">
            {module.format}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-primary-dark">
          {module.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">{module.summary}</p>
        <div className="mt-5 border-t border-[#EFE9D5] pt-4">
          <p className="text-xs font-bold text-gray-400">{module.duration}</p>
          <p className="mt-2 text-xs leading-5 text-brand-green">
            {module.recommendation}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function FarmerAcademyPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [query, setQuery] = useState('')

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return academyModules.filter((module) => {
      const matchesCategory =
        activeCategory === 'Semua' || module.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        [module.title, module.category, module.format, module.summary]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const featuredModule = academyModules[0]

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-[#FBF9EE] shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-10">
            <p className="text-sm font-bold text-[#8C704B]">Akademi Ternak</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-primary-dark md:text-5xl">
              Belajar perawatan ternak dengan panduan yang mudah diikuti.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-700">
              Materi demo ini membantu peternak memahami pemantauan harian,
              persiapan konsultasi, dan kebiasaan kandang yang lebih aman.
            </p>
            <div className="mt-8 rounded-3xl border border-[#EFE9D5] bg-white/70 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Modul Unggulan
              </p>
              <h2 className="mt-3 text-2xl font-bold text-primary-dark">
                {featuredModule.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {featuredModule.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-brand-green">
                  {featuredModule.category}
                </span>
                <span className="rounded-full bg-[#EFE9D5] px-3 py-1 text-[#8C704B]">
                  {featuredModule.duration}
                </span>
              </div>
            </div>
          </div>
          <div className="min-h-[280px] bg-[#EFE9D5]">
            <img
              alt=""
              className="h-full w-full object-cover"
              src={featuredModule.thumbnail}
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold text-brand-green">Daftar Materi</p>
            <h2 className="mt-1 text-2xl font-bold text-primary-dark">
              Pilih materi sesuai kebutuhan kandang
            </h2>
          </div>
          <label className="w-full lg:max-w-sm">
            <span className="sr-only">Cari materi Akademi</span>
            <input
              className="min-h-12 w-full rounded-2xl border border-standard-border bg-neutral-bg px-4 py-3 text-sm outline-none transition focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/15"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nutrisi, kandang, konsultasi..."
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              className={[
                'whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition',
                activeCategory === category
                  ? 'bg-brand-green text-white'
                  : 'bg-brand-soft text-brand-green hover:bg-brand-green hover:text-white',
              ].join(' ')}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {filteredModules.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredModules.map((module) => (
            <AcademyCard key={module.id} module={module} />
          ))}
        </section>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-[#EFE9D5] bg-[#FFFDF7] p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-dark">
            Materi belum ditemukan
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
            Coba gunakan kata kunci lain atau pilih kategori Semua untuk melihat
            seluruh materi demo.
          </p>
        </section>
      )}
    </div>
  )
}
