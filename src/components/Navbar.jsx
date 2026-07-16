import logo from "../assets/logo-full.png";

export default function Navbar({ onStart, onHome }) {
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
          <a href="#" className="hover:text-brand-green transition-colors">Produk</a>
          <a href="#" className="hover:text-brand-green transition-colors">Akademi</a>
          <a href="#" className="hover:text-brand-green transition-colors">Tentang</a>
          
          {/* Added onClick={onStart} here */}
          <button 
            onClick={onStart}
            className="bg-brand-lime text-primary-dark px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Gabung Sekarang
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-primary-dark cursor-pointer" onClick={onStart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </div>

      </div>
    </nav>
  );
}