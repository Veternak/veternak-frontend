import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo-full.png";

// Helper for SVGs - No library needed
const Icon = ({ name }) => {
  const icons = {
    home: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    list: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    book: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    chat: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    user: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    plus: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  };
  return icons[name] || null;
};

export default function DashboardShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Beranda", icon: "home", path: "/peternak/dashboard" },
    { id: "ternak", label: "Ternak", icon: "list", path: "/peternak/ternak" },
    { id: "lapor", label: "Lapor", icon: "plus", isCta: true, path: "/peternak/lapor" },
    { id: "konsultasi", label: "Konsultasi", icon: "chat", path: "/peternak/konsultasi" },
    { id: "akademi", label: "Akademi", icon: "book", path: "/peternak/akademi" },
  ];
  
  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col md:flex-row">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col fixed h-full z-50">
        <div className="p-8 pb-4">
          <img 
            src={logo} 
            alt="Veternak Logo" 
            className="h-16 w-auto object-contain -ml-2 cursor-pointer"
            onClick={() => navigate("/")} 
          />
        </div>
        <nav className="flex-grow px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all cursor-pointer ${
                location.pathname === item.path 
                ? "bg-brand-soft text-brand-green" 
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Profile & Logout Area */}
        <div className="p-8 border-t border-gray-50 flex flex-col gap-4">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-soft rounded-full flex items-center justify-center text-brand-green font-bold">M</div>
              <div>
                <p className="text-xs font-bold text-primary-dark">Masrukhi</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Peternak Sapi</p>
              </div>
          </div>
          <button 
            onClick={() => window.location.href = "/"} 
            className="text-left text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest cursor-pointer"
          >
            Keluar Ke Landing →
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow md:ml-64 p-4 md:p-10 pb-28 md:pb-10">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6 pt-4 px-2">
          <img src={logo} alt="Veternak Logo" className="h-10 w-auto object-contain" />
          <div className="w-10 h-10 bg-brand-soft rounded-full flex items-center justify-center text-brand-green font-bold">M</div>
        </div>
        
        {/* THIS IS WHERE THE SUB-PAGES APPEAR */}
        <Outlet />
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-2 py-3 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 relative ${
              item.isCta ? "-top-6" : ""
            }`}
          >
            {item.isCta ? (
              <div className="w-14 h-14 bg-brand-lime rounded-full flex items-center justify-center text-primary-dark shadow-lg shadow-brand-lime/40 border-4 border-white">
                <Icon name={item.icon} />
              </div>
            ) : (
              <div className={`transition-colors ${location.pathname === item.path ? "text-brand-green" : "text-gray-300"}`}>
                <div className="flex justify-center"><Icon name={item.icon} /></div>
                <span className="text-[10px] font-bold block mt-0.5">{item.label}</span>
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}