import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-full.png';
import { clearFarmerSession, getFarmerDisplayName, getStoredFarmer } from '../services/farmerAuthService';

const icons = {
  home: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  list: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  plus: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  chat: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  store: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 1.5-5h15L21 9"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><path d="M9 20v-6h6v6"/><path d="M3 9h18"/></svg>,
  user: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  book: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
};

const menuItems = [
  { id: 'dashboard', label: 'Beranda', icon: 'home', path: '/peternak/dashboard' },
  { id: 'lapor', label: 'Lapor', icon: 'plus', isCta: true, path: '/peternak/lapor' },
  { id: 'konsultasi', label: 'Konsultasi', icon: 'chat', path: '/peternak/konsultasi' },
  { id: 'marketplace', label: 'Toko', icon: 'store', path: '/peternak/marketplace' },
  { id: 'akademi', label: 'Akademi', icon: 'book', path: '/peternak/akademi', desktopOnly: true },
  { id: 'profil', label: 'Profil', icon: 'user', path: '/peternak/profil', desktopOnly: true },
];


function isActive(pathname, path) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function DashboardShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const farmer = getStoredFarmer();
  const farmerName = getFarmerDisplayName();
  const farmerInitial = farmerName.charAt(0).toUpperCase();

  useEffect(() => {
    const token = window.localStorage.getItem('veternak_access_token');
    const storedFarmer = getStoredFarmer();
    if (!token || !storedFarmer) {
      navigate('/masuk');
    }
  }, [navigate]);

  if (!farmer) return null;

  const handleLogout = () => {
    clearFarmerSession();
    navigate('/');
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAF8] md:flex">
      <aside className="fixed hidden h-full w-64 flex-col border-r border-gray-100 bg-white md:flex overflow-y-auto">
        <div className="p-8 pb-4">

          <img src={logo} alt="Veternak Logo" className="h-16 w-auto -ml-2 cursor-pointer object-contain" onClick={() => navigate('/')} />
        </div>
        <nav className="flex-grow space-y-2 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 font-bold transition-all ${isActive(location.pathname, item.path) ? 'bg-brand-soft text-brand-green' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
            >
              {icons[item.icon]}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t border-gray-50 p-8">
          <button type="button" onClick={() => navigate('/peternak/profil')} className="flex items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-brand-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-green">{farmerInitial}</div>
            <div>
              <p className="text-xs font-bold text-primary-dark">{farmerName}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Peternak</p>
            </div>
          </button>
          <button type="button" onClick={handleLogout} className="text-left text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600">
            Keluar
          </button>
        </div>
      </aside>

      <main className="w-full max-w-full flex-grow p-4 pb-32 md:ml-64 md:p-10 md:pb-10">
        <div className="mb-6 flex items-center justify-between px-2 pt-4 md:hidden">
          <img src={logo} alt="Veternak Logo" className="h-10 w-auto object-contain" />
          <button type="button" onClick={() => navigate('/peternak/profil')} className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-green">
            {farmerInitial}
          </button>
        </div>
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 z-[100] flex h-20 w-full items-center border-t border-gray-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex w-full items-center justify-between px-2">
          {menuItems.filter((item) => !item.desktopOnly).map((item) => (
            <button key={item.id} type="button" onClick={() => navigate(item.path)} className="flex flex-1 flex-col items-center justify-center">
              {item.isCta ? (
                <div className="relative -top-7 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-white bg-brand-lime text-primary-dark shadow-xl shadow-brand-lime/40 active:scale-90">
                    {icons[item.icon]}
                  </div>
                  <span className="mt-1 text-[10px] font-black text-brand-green">LAPOR</span>
                </div>
              ) : (
                <div className={`flex flex-col items-center ${isActive(location.pathname, item.path) ? 'text-brand-green' : 'text-gray-300'}`}>
                  {icons[item.icon]}
                  <span className="mt-1 text-[10px] font-bold">{item.label}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
