export default function Academy() {
  const courses = [
    { title: "Nutrisi & Pakan", count: "12 Pelajaran", img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=400" },
    { title: "Penyakit Umum", count: "15 Pelajaran", img: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400" },
    { title: "Sanitasi Kandang", count: "8 Pelajaran", img: "https://images.unsplash.com/photo-1594140733592-2374662df94d?auto=format&fit=crop&q=80&w=400" },
    { title: "Manajemen Bisnis", count: "10 Pelajaran", img: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <section className="py-20 px-4 bg-neutral-bg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* LEFT SIDE: Content */}
        <div className="lg:w-1/2">
          <h2 className="font-serif text-4xl md:text-5xl text-primary-dark mb-6">Akademi Ternak</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Tingkatkan pengetahuan Anda dengan modul pembelajaran eksklusif dari para ahli peternakan nasional. Mulai dari nutrisi hingga pencegahan penyakit.
          </p>

          <ul className="space-y-4 mb-10">
            {["Modul Nutrisi Pakan Mandiri", "Manajemen Sanitasi Kandang Modern", "Webinar Mingguan Gratis"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-semibold text-primary-dark">
                <div className="bg-brand-lime p-1 rounded-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                {item}
              </li>
            ))}
          </ul>

          <button className="bg-brand-green text-white px-10 py-4 rounded-xl font-bold hover:brightness-110 transition shadow-lg shadow-brand-green/20">
            Mulai Belajar
          </button>
        </div>

        {/* RIGHT SIDE: 4-Card Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6 w-full">
          {courses.map((course, i) => (
            <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-primary-dark mb-1">{course.title}</h4>
              <p className="text-xs text-gray-500 font-medium">{course.count}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}