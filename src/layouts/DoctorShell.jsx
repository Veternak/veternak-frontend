import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import logoFull from '../assets/logo-full.png'
import { doctorDemoCases, doctorDemoNotifications } from '../data/doctorDemoData'
import { clearDoctorSession, getStoredDoctor, getDoctorDisplayName } from '../services/doctorAuthService'

const navItems = [
  { icon: 'grid', label: 'Dashboard', to: '/dokter-app/dashboard' },
  { count: doctorDemoCases.length, icon: 'case', label: 'Kasus', to: '/dokter-app/kasus' },
  { icon: 'route', label: 'Kunjungan', to: '/dokter-app/kunjungan' },
  { icon: 'history', label: 'Riwayat', to: '/dokter-app/riwayat' },
  { count: doctorDemoNotifications.filter((item) => !item.read).length, icon: 'bell', label: 'Notifikasi', to: '/dokter-app/notifikasi' },
  { icon: 'user', label: 'Profil', to: '/dokter-app/profil' },
]

function NavIcon({ name }) {
  const icons = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    case: (
      <>
        <path d="M8 6h8" />
        <path d="M9 4h6l1 2H8l1-2Z" />
        <path d="M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
      </>
    ),
    grid: (
      <>
        <path d="M4 4h6v6H4z" />
        <path d="M14 4h6v6h-6z" />
        <path d="M4 14h6v6H4z" />
        <path d="M14 14h6v6h-6z" />
      </>
    ),
    history: (
      <>
        <path d="M4 12a8 8 0 1 0 2.3-5.7" />
        <path d="M4 5v5h5" />
        <path d="M12 8v5l3 2" />
      </>
    ),
    route: (
      <>
        <path d="M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M8 16h4a4 4 0 0 0 0-8h4" />
      </>
    ),
    user: (
      <>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4 20a8 8 0 0 1 16 0" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {icons[name] || icons.grid}
      </g>
    </svg>
  )
}

export default function DoctorShell() {
  const navigate = useNavigate()
  const doctor = getStoredDoctor()
  const doctorName = getDoctorDisplayName()
  const doctorInitial = doctorName.slice(0, 2).toUpperCase()

  const [isAvailable, setIsAvailable] = useState(true)

  useEffect(() => {
    const token = window.localStorage.getItem('veternak_access_token')
    const storedDoctor = getStoredDoctor()
    if (!token || !storedDoctor) {
      navigate('/dokter/masuk')
    }
  }, [navigate])

  if (!doctor) return null

  const handleLogout = () => {
    clearDoctorSession()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F3F8F1] text-main-text">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[280px] border-r border-[#E1EBDD] bg-white/92 px-5 py-6 shadow-[20px_0_60px_rgba(19,59,38,0.08)] backdrop-blur-xl lg:flex lg:flex-col overflow-y-auto">
        <Link

          aria-label="Kembali ke dashboard dokter"
          className="inline-flex w-fit rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
          to="/dokter-app/dashboard"
        >
          <img alt="Veternak" className="h-12 w-auto object-contain" src={logoFull} />
        </Link>

        <div className="mt-7 rounded-[26px] border border-[#E3EFDE] bg-gradient-to-br from-[#FBFDF6] to-white p-4 shadow-[0_16px_36px_rgba(19,59,38,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-sm font-extrabold text-white">
              {doctorInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate font-extrabold leading-tight text-primary-dark">{doctorName}</p>
              <p className="mt-1 text-xs font-semibold text-gray-600">Dokter Hewan</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EC] px-3 py-1 text-xs font-bold text-[#1D5937]">
              <span className="h-2 w-2 rounded-full bg-[#22A06B]" />
              Online
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1D5937] shadow-sm">
              {doctor.isVerified ? 'Terverifikasi' : 'Belum Verifikasi'}
            </span>
          </div>

          <button
            className={[
              'mt-4 w-full rounded-2xl border px-3 py-2.5 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20',
              isAvailable
                ? 'border-[#C7E8D1] bg-[#E8F5EC] text-[#1D5937] hover:bg-[#DDF0E4]'
                : 'border-[#E1EBDD] bg-white text-gray-700 hover:bg-brand-soft',
            ].join(' ')}
            onClick={() => setIsAvailable((current) => !current)}
            type="button"
          >
            {isAvailable ? 'Tersedia menerima kasus' : 'Tidak tersedia'}
          </button>
        </div>

        <nav className="mt-7 grid gap-2">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => [
                'flex items-center justify-between rounded-2xl px-3.5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20',
                isActive
                  ? 'bg-primary-dark text-white shadow-[0_14px_28px_rgba(16,42,27,0.18)]'
                  : 'text-primary-dark hover:bg-[#EFF8E3]',
              ].join(' ')}
              key={item.to}
              to={item.to}
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-3">
                    <span className={[
                      'inline-flex h-9 w-9 items-center justify-center rounded-xl shadow-sm',
                      isActive ? 'bg-white/15 text-white' : 'bg-white/85 text-brand-green',
                    ].join(' ')}>
                      <NavIcon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </span>
                  {item.count ? (
                    <span className={[
                      'rounded-full px-2 py-0.5 text-xs font-extrabold',
                      isActive ? 'bg-brand-lime text-primary-dark' : 'bg-brand-soft text-brand-green',
                    ].join(' ')}>
                      {item.count}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 mb-4 text-left text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest cursor-pointer"
        >
          Keluar
        </button>

        <p className="mt-auto rounded-[22px] border border-[#E3EFDE] bg-[#F8FAF8] p-4 text-xs leading-5 text-gray-600 shadow-[0_10px_24px_rgba(19,59,38,0.05)]">
          Chat bukan kanal darurat terjamin. Jika kondisi memburuk, arahkan peternak ke bantuan dokter atau layanan terdekat.
        </p>
      </aside>

      <header className="sticky top-0 z-20 border-b border-[#E1EBDD] bg-white/90 px-5 py-4 shadow-[0_10px_30px_rgba(19,59,38,0.06)] backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <Link to="/dokter-app/dashboard">
            <img alt="Veternak" className="h-10 w-auto object-contain" src={logoFull} />
          </Link>
          <span className={[
            'rounded-full px-3 py-1 text-xs font-bold',
            isAvailable ? 'bg-[#E8F5EC] text-[#1D5937]' : 'bg-[#F1F3F5] text-gray-700',
          ].join(' ')}>
            {isAvailable ? 'Tersedia' : 'Tidak tersedia'}
          </span>
        </div>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => [
                'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold',
                isActive ? 'bg-primary-dark text-white' : 'border border-[#E1EBDD] bg-white text-primary-dark',
              ].join(' ')}
              key={item.to}
              to={item.to}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="px-5 py-6 lg:ml-[280px] lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}
