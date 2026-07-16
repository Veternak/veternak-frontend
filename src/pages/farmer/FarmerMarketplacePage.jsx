import { useMemo, useState } from "react";

const categories = ["Semua", "Obat & vitamin", "Pakan", "Alat kandang", "Aksesori"];

const products = [
  {
    id: "MED-001",
    name: "Vitamin Ruminansia Harian",
    category: "Obat & vitamin",
    price: "Rp48.000",
    unit: "botol 250 ml",
    stock: "Stok tersedia",
    tag: "Gunakan sesuai arahan",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400",
    description: "Suplemen pendukung kondisi umum sapi dan kambing. Bukan pengganti pemeriksaan dokter.",
  },
  {
    id: "MED-002",
    name: "Elektrolit Ternak",
    category: "Obat & vitamin",
    price: "Rp36.000",
    unit: "sachet 100 g",
    stock: "Stok terbatas",
    tag: "Konsultasikan dulu",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400",
    description: "Pendukung cairan tubuh saat ternak perlu pemantauan. Ikuti arahan tenaga kesehatan hewan.",
  },
  {
    id: "FEED-001",
    name: "Konsentrat Sapi Potong",
    category: "Pakan",
    price: "Rp128.000",
    unit: "karung 25 kg",
    stock: "Stok tersedia",
    tag: "Pakan",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=400",
    description: "Pakan tambahan untuk sapi potong dengan kebutuhan energi lebih tinggi.",
  },
  {
    id: "FEED-002",
    name: "Mineral Block Kambing",
    category: "Pakan",
    price: "Rp22.000",
    unit: "blok 1 kg",
    stock: "Stok tersedia",
    tag: "Mineral",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400",
    description: "Pendukung mineral harian untuk kambing dan domba.",
  },
  {
    id: "TOOL-001",
    name: "Termometer Digital Ternak",
    category: "Alat kandang",
    price: "Rp74.000",
    unit: "1 unit",
    stock: "Stok tersedia",
    tag: "Alat pemeriksaan",
    image: "https://images.unsplash.com/photo-1583912267550-d44c80b5916d?auto=format&fit=crop&q=80&w=400",
    description: "Membantu peternak mencatat suhu saat membuat laporan kondisi.",
  },
  {
    id: "TOOL-002",
    name: "Sprayer Disinfektan",
    category: "Alat kandang",
    price: "Rp95.000",
    unit: "kapasitas 2 liter",
    stock: "Stok tersedia",
    tag: "Biosecurity",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400",
    description: "Alat bantu sanitasi area kandang dan perlengkapan.",
  },
  {
    id: "ACC-001",
    name: "Kalung ID Ternak",
    category: "Aksesori",
    price: "Rp18.000",
    unit: "1 set",
    stock: "Stok tersedia",
    tag: "Identifikasi",
    image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=400",
    description: "Membantu membedakan ternak saat pencatatan profil dan laporan kondisi.",
  },
  {
    id: "ACC-002",
    name: "Sikat Perawatan Kandang",
    category: "Aksesori",
    price: "Rp32.000",
    unit: "1 buah",
    stock: "Stok tersedia",
    tag: "Kebersihan",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400",
    description: "Sikat kuat untuk membersihkan lantai kandang dan perlengkapan makan.",
  },
];

export default function FarmerMarketplacePage() {
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "Semua" || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
        || product.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section className="mx-auto max-w-7xl pb-10">
      <div className="mb-6 rounded-[2rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Marketplace ternak</p>
            <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">Kebutuhan kandang dan perawatan</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#69736C] md:text-base">
              Belanja pakan, alat, aksesori, dan produk pendukung kesehatan. Obat dan vitamin tetap harus digunakan sesuai arahan dokter hewan.
            </p>
          </div>
          <div className="rounded-2xl bg-brand-soft px-5 py-4 text-sm font-bold text-brand-green">
            Keranjang demo: {cartCount} item
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold ${
                category === item ? "border-brand-green bg-brand-green text-white" : "border-[#D4DCD6] bg-white text-[#505B53]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari produk..."
          className="h-11 rounded-full border border-[#D4DCD6] bg-white px-4 text-sm outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC]"
        />
      </div>

      <div className="mb-6 rounded-2xl border border-[#FFF1B3] bg-[#FFF9DA] p-4 text-sm leading-relaxed text-[#725300]">
        Produk kategori obat dan vitamin adalah data demo. Veternak tidak memberikan resep atau dosis obat otomatis.
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-[2rem] border border-[#E5EAE6] bg-white shadow-sm">
            <div className="aspect-[4/3] overflow-hidden bg-[#F1F4F1]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-green">{product.category}</span>
                <span className="rounded-full bg-[#F1F3F5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#505B53]">{product.tag}</span>
              </div>
              <h2 className="text-lg font-bold leading-tight text-primary-dark">{product.name}</h2>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-[#69736C]">{product.description}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xl font-bold text-primary-dark">{product.price}</p>
                  <p className="text-xs font-semibold text-[#8D978F]">{product.unit}</p>
                </div>
                <p className="text-xs font-bold text-brand-green">{product.stock}</p>
              </div>
              <button
                type="button"
                onClick={() => setCartCount((count) => count + 1)}
                className="mt-5 min-h-11 w-full rounded-xl bg-brand-lime px-4 text-sm font-bold text-primary-dark"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
