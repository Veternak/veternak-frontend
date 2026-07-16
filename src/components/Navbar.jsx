import { Link } from 'react-router-dom'
import logo from "../assets/logo-full.png";

export default function Navbar({ onHome }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
        
        {/* Real Brand Logo - Added onClick and cursor-pointer */}
        <div 
          onClick={onHome} 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img 
            src={logo} 
            alt="Veternak Logo" 
            className="h-14 md:h-20 w-auto object-contain" 
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-primary-dark">
          <a href="#produk" className="hover:text-brand-green transition-colors">Produk</a>
          <a href="#akademi" className="hover:text-brand-green transition-colors">Akademi</a>
          <a href="#tentang" className="hover:text-brand-green transition-colors">Tentang</a>
          <Link to="/masuk" className="hover:text-brand-green transition-colors">Masuk</Link>
          
          <Link
            to="/daftar"
            className="bg-brand-lime text-primary-dark px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Gabung Sekarang
          </Link>
        </div>

        {/* Mobile Auth Links */}
        <div className="md:hidden flex items-center gap-3 text-sm font-bold">
          <Link to="/masuk" className="text-primary-dark">
            Masuk
          </Link>
          <Link
            to="/daftar"
            className="rounded-full bg-brand-lime px-4 py-2 text-primary-dark"
          >
            Daftar
          </Link>
        </div>

      </div>
    </nav>
  );
}
