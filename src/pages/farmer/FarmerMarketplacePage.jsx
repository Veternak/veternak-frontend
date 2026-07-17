import { useMemo, useState } from "react";
import { marketplaceCategories, marketplaceProducts } from "../../data/marketplaceProducts";

export default function FarmerMarketplacePage() {
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    return marketplaceProducts.filter((product) => {
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
          {marketplaceCategories.map((item) => (
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
