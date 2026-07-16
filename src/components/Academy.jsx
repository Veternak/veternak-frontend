const courses = [
  {
    category: 'Manajemen',
    description: 'Langkah observasi dan pencatatan kondisi untuk membantu deteksi perubahan sejak dini.',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=900',
    title: 'Pencegahan Penyakit Mulut dan Kuku (PMK)',
  },
  {
    category: 'Nutrisi',
    description: 'Cara menghitung kebutuhan pakan dan menyusun nutrisi yang lebih stabil untuk ternak.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=900',
    title: 'Formulasi Pakan Ternak Berbasis Nutrisi Tinggi',
  },
  {
    category: 'Kesehatan',
    description: 'Panduan langkah awal yang aman sambil menunggu proses konsultasi dengan dokter.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=900',
    title: 'Pertolongan Pertama pada Kelahiran Ternak',
  },
]

export default function Academy() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">Akademi Ternak</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-primary-dark md:text-5xl">
              Belajar dari yang Terbaik
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Akses materi edukasi dari pakar dan praktisi peternakan Indonesia.
            </p>
          </div>
          <button className="w-fit rounded-full bg-brand-soft px-5 py-3 text-sm font-extrabold text-brand-green transition hover:bg-brand-green hover:text-white" type="button">
            Lihat Semua Modul →
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <article
              className="group overflow-hidden rounded-[28px] border border-[#E7EFE4] bg-white shadow-[0_18px_48px_rgba(19,59,38,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_68px_rgba(19,59,38,0.14)]"
              key={course.title}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img alt={course.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={course.image} />
                <span className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-extrabold text-brand-green shadow-sm backdrop-blur">
                  {course.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold leading-snug text-primary-dark">{course.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{course.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
