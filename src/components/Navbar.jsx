export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center text-brand-lime font-bold">V</div>
          <span className="text-xl font-bold text-primary-dark tracking-tight">Veternak</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-brand-green transition">Produk</a>
          <a href="#" className="hover:text-brand-green transition">Akademi</a>
          <a href="#" className="hover:text-brand-green transition">Tentang</a>
        </div>

        {/* CTA Button */}
        <button className="bg-brand-lime text-primary-dark px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
          Gabung Sekarang
        </button>
      </div>
    </nav>
  )
}