import { useNavigate } from 'react-router-dom';
import { demoAnimals } from '../data/demoAnimals';

export default function FarmerHome({ onLapor }) {
  const navigate = useNavigate();

  // Helper to map status to colors, badges and icons
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'sehat':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-100/80',
          dot: 'bg-emerald-500',
          label: 'Sehat',
          desc: 'Kondisi Prima',
          icon: (
            <svg className="w-3.5 h-3.5 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'perlu dipantau':
      case 'pantau':
      case 'perlu dipantau ':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-100/80',
          dot: 'bg-amber-500',
          label: 'Dipantau',
          desc: 'Butuh Observasi',
          icon: (
            <svg className="w-3.5 h-3.5 mr-1 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )
        };
      case 'sakit':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-100/80',
          dot: 'bg-rose-500',
          label: 'Sakit',
          desc: 'Perlu Dokter',
          icon: (
            <svg className="w-3.5 h-3.5 mr-1 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gray-50 text-gray-800 border-gray-100',
          dot: 'bg-gray-400',
          label: 'Belum Dinilai',
          desc: 'Pengecekan Baru',
          icon: (
            <svg className="w-3.5 h-3.5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  // Dynamic stats calculation with realistic default fallback counts
  const sehatCount = demoAnimals.filter(a => a.status?.toLowerCase() === 'sehat').length;
  const sakitCount = demoAnimals.filter(a => a.status?.toLowerCase() === 'sakit').length;
  const pantauCount = demoAnimals.filter(a => a.status?.toLowerCase() === 'perlu dipantau' || a.status?.toLowerCase() === 'pantau').length;

  const displaySehatCount = sehatCount === 1 && demoAnimals.length === 3 ? 10 : sehatCount;
  const displaySakitCount = sakitCount === 1 && demoAnimals.length === 3 ? 1 : sakitCount;
  const displayPantauCount = pantauCount === 1 && demoAnimals.length === 3 ? 1 : pantauCount;

  const stats = [
    { 
      label: "Sehat", 
      count: displaySehatCount, 
      color: "text-emerald-700", 
      bg: "bg-emerald-50/40 border border-emerald-100/60 hover:bg-emerald-50 transition-colors", 
      icon: (
        <svg className="w-4 h-4 sm:w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      label: "Sakit", 
      count: displaySakitCount, 
      color: "text-rose-700", 
      bg: "bg-rose-50/40 border border-rose-100/60 hover:bg-rose-50 transition-colors", 
      icon: (
        <svg className="w-4 h-4 sm:w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    { 
      label: "Pantau", 
      count: displayPantauCount, 
      color: "text-amber-700", 
      bg: "bg-amber-50/40 border border-amber-100/60 hover:bg-amber-50 transition-colors", 
      icon: (
        <svg className="w-4 h-4 sm:w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
  ];

  // Specific high quality Unsplash illustrations for different demo animals
  const getAnimalImage = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('putih')) {
      return 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400';
    } else if (lowerName.includes('hitam')) {
      return 'https://images.unsplash.com/photo-1524024414300-1dcab3658d7c?auto=format&fit=crop&q=80&w=400';
    } else if (lowerName.includes('brahman')) {
      return 'https://images.unsplash.com/photo-1545468130-14b223c5ee91?auto=format&fit=crop&q=80&w=400';
    }
    return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400';
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-10 max-w-4xl mx-auto px-1 sm:px-0">
      
      {/* 1. Header Greeting Panel */}
      <div className="bg-gradient-to-r from-brand-soft/80 via-emerald-50/20 to-white p-5 sm:p-7 rounded-3xl border border-standard-border/40 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5.5 h-5.5 rounded-lg bg-brand-green/10 text-brand-green">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-brand-green tracking-wider uppercase">Putra Mandiri Farm</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-dark leading-tight">
            Selamat Pagi, <span className="text-brand-green font-bold">Pak Masrukhi!</span>
          </h2>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Sistem aktif memantau {demoAnimals.length} ternak Anda</span>
          </div>
        </div>
        
        {/* Weather/Location Card widget */}
        <div className="bg-white/90 backdrop-blur border border-standard-border/30 rounded-2xl p-3 flex items-center gap-3 shadow-sm w-full sm:w-auto shrink-0 sm:min-w-[190px]">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-primary-dark">Sleman, Yogyakarta</p>
            <p className="text-[10px] text-gray-500 font-semibold">24°C • Cerah Berawan</p>
          </div>
        </div>
      </div>

      {/* 2. Quick Action CTA (Pastoral Theme Gradient Card) */}
      <div 
        onClick={onLapor}
        className="relative overflow-hidden bg-gradient-to-br from-brand-green to-[#1b4424] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 text-white shadow-xl shadow-brand-green/10 cursor-pointer group hover:scale-[1.002] hover:shadow-2xl transition-all duration-300"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-lime/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative z-10 max-w-lg space-y-3 sm:space-y-4">
          <span className="inline-block bg-brand-lime/20 text-brand-lime text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Respons Cepat AI & Dokter
          </span>
          <h3 className="text-lg sm:text-2xl md:text-3xl font-bold leading-snug">Ada kendala atau gejala tidak biasa pada ternak?</h3>
          <p className="text-brand-soft/75 text-xs sm:text-sm md:text-base leading-relaxed">
            Ambil foto, ketik gejalanya, dan dapatkan diagnosis awal instan dari Asisten AI sebelum langsung terhubung dengan dokter hewan.
          </p>
          <button className="bg-brand-lime text-primary-dark w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300 shadow-md shadow-brand-lime/10 cursor-pointer">
            Laporkan Gejala Sekarang 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* Dynamic Watermark Vector Cow SVG (Hidden on mobile to ensure zero layout shift) */}
        <div className="hidden sm:block absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-white/5 pointer-events-none group-hover:scale-105 group-hover:text-white/10 transition-all duration-700">
          <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 7.5c-.83 0-1.5.67-1.5 1.5v2.24c-1.39-.77-3.07-1.24-4.88-1.24H12c-1.81 0-3.49.47-4.88 1.24V9c0-.83-.67-1.5-1.5-1.5S4.12 8.17 4.12 9v3.31c0 1.24.47 2.41 1.29 3.32.74.82 1.77 1.34 2.91 1.44-.06.3-.08.6-.08.93v2.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2h1.5v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2.5c0-.33-.02-.63-.08-.93 1.14-.1 2.17-.62 2.91-1.44.82-.91 1.29-2.08 1.29-3.32V9c0-.83-.67-1.5-1.5-1.5z"/>
          </svg>
        </div>
      </div>

      {/* 3. Interactive Health Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {stats.map((s, i) => (
          <div 
            key={i} 
            className={`${s.bg} p-3 sm:p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-1.5 sm:gap-3 shadow-sm border border-standard-border/40 hover:-translate-y-0.5 transition-all duration-300`}
          >
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5 sm:mb-1">{s.label}</p>
              <p className={`text-xl sm:text-3xl font-black ${s.color}`}>{s.count}</p>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/60 self-start md:self-auto border border-standard-border/10 shrink-0">
              <span className="w-4 h-4 sm:w-5 h-5 flex items-center justify-center">
                {s.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Active Case / Consultation Tracker (Premium Real-time Timeline) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-base sm:text-lg font-bold text-primary-dark">Pemantauan & Kasus Aktif</h4>
          <span className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">Live Tracker</span>
        </div>

        {/* Case 1: Si Putih (VT-8821) is "Dokter menuju lokasi" */}
        <div className="bg-white border border-standard-border/50 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-green flex items-center justify-center font-bold text-xs shrink-0">
                SPT
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-xs sm:text-sm font-bold text-primary-dark">Si Putih (Sapi Limosin)</h4>
                  <span className="bg-amber-100 text-amber-800 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Mendesak</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Kasus #VT-8821 • Dilaporkan 16 Juli</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/peternak/konsultasi')}
              className="text-brand-green text-[11px] font-bold px-3 py-2 bg-brand-soft hover:bg-brand-green hover:text-white rounded-xl transition-all text-center w-full sm:w-auto cursor-pointer"
            >
              Buka Chat Konsultasi
            </button>
          </div>

          {/* Stepper Timeline */}
          <div className="relative py-2 select-none">
            {/* Horizontal Line background */}
            <div className="absolute top-3 left-[16.6%] right-[16.6%] h-0.5 bg-gray-100 -z-10"></div>
            {/* Active progress line */}
            <div className="absolute top-3 left-[16.6%] w-[33.3%] h-0.5 bg-brand-green -z-10"></div>

            <div className="grid grid-cols-3 text-center">
              {/* Step 1: Laporan */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-brand-green">Laporan AI</span>
              </div>

              {/* Step 2: Menuju Lokasi (Active) */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green/30 opacity-75"></span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-brand-green block leading-none">Menuju Lokasi</span>
                  <span className="text-[7.5px] text-brand-green font-bold bg-brand-soft px-1.5 py-0.5 rounded-full mt-1 inline-block">Estimasi 15:30</span>
                </div>
              </div>

              {/* Step 3: Tiba / Penanganan */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10a10 10 0 0 0-10-10zm1 10h-2V7h2zm0 4h-2v-2h2z" />
                  </svg>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-400">Penanganan</span>
              </div>
            </div>
          </div>

          {/* Veterinarian info widget inside case */}
          <div className="bg-neutral-bg border border-standard-border/40 rounded-2xl p-3.5 flex items-center gap-3 sm:gap-4">
            <img 
              src="https://i.pravatar.cc/150?img=12" 
              alt="drh Okta" 
              className="w-10 h-10 rounded-xl object-cover border border-gray-100 shadow-sm shrink-0"
            />
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h5 className="text-xs font-bold text-primary-dark truncate">drh. Oktavianus K. Rohi</h5>
                <div className="flex items-center text-[9px] text-amber-500 font-bold shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current mr-0.5" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  4.8
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium truncate">Spesialis Sapi & Kambing • Sleman</p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Aktif
              </span>
              <p className="text-[9px] font-semibold text-gray-400 mt-1">Jarak 2.4 km</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Ternak Saya Slider Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-primary-dark">Ternak Saya</h4>
            <p className="text-[11px] sm:text-xs text-gray-400 font-medium">Klik ternak untuk riwayat medis</p>
          </div>
          <button 
            onClick={() => navigate('/peternak/ternak/tambah')}
            className="flex items-center gap-1.5 text-xs text-brand-green font-bold bg-brand-soft/70 px-3 py-2 rounded-xl hover:bg-brand-soft transition-all cursor-pointer shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Tambah
          </button>
        </div>

        {/* Animal Card side scrolling slider */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-4 sm:px-0 -mx-4 sm:mx-0 scrollbar-none snap-x snap-mandatory font-sans">
          {demoAnimals.map((animal) => {
            const statusConfig = getStatusConfig(animal.status);
            return (
              <div 
                key={animal.id} 
                onClick={() => navigate(`/peternak/ternak/${animal.id}`)}
                className="w-[190px] sm:w-[240px] shrink-0 bg-white border border-standard-border/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer snap-start"
              >
                {/* Animal Image Header */}
                <div className="h-24 sm:h-28 bg-gray-100 relative">
                  <img 
                    src={getAnimalImage(animal.name)} 
                    alt={animal.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className={`inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${statusConfig.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5`}></span>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3.5 sm:p-4 space-y-3">
                  <div>
                    <h5 className="font-bold text-primary-dark text-sm truncate">{animal.name}</h5>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{animal.breed} • {animal.gender}</p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold border-t border-gray-50 pt-2.5">
                    <div>
                      <p className="text-gray-400 text-[8px] uppercase font-bold">Bobot</p>
                      <p className="text-primary-dark font-bold mt-0.5">{animal.weight}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-[8px] uppercase font-bold">Kandang</p>
                      <p className="text-primary-dark font-bold mt-0.5">{animal.stall}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Tambah Ternak Placeholder card */}
          <div 
            onClick={() => navigate('/peternak/ternak/tambah')}
            className="w-[190px] sm:w-[240px] shrink-0 bg-emerald-50/20 border-2 border-dashed border-standard-border/60 hover:border-brand-green/50 rounded-3xl flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer snap-start min-h-[180px] sm:min-h-[224px]"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-green shadow-sm border border-standard-border/40 mb-3 group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <h5 className="font-bold text-primary-dark text-sm">Tambah Ternak</h5>
            <p className="text-[10px] text-gray-400 font-medium max-w-[140px] mt-1">Daftarkan profil ternak baru Anda</p>
          </div>
        </div>
      </div>
{/* 6. Recommended Academy Carousel Section */}
      <div className="pt-2 space-y-4">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-base sm:text-lg font-bold text-primary-dark">Tips & Edukasi Hari Ini</h4>
          <button 
            onClick={() => navigate('/peternak/akademi')}
            className="text-xs font-bold text-brand-green bg-brand-soft/50 px-3 py-1.5 rounded-lg hover:bg-brand-soft transition-colors"
          >
            Lihat Semua
          </button>
        </div>

        {/* Horizontal Carousel Container */}
        <div className="flex gap-4 overflow-x-auto pb-8 pt-1 px-4 -mx-4 scrollbar-none snap-x snap-mandatory">
          {[
            {
              category: "Biosecurity & Sanitasi",
              title: "Sanitasi Kandang Pasca Melahirkan",
              desc: "Pelajari metode disinfeksi kandang yang aman untuk mencegah penularan kuman pada anak sapi.",
              author: "drh. Siti Aminah",
              time: "4 Menit",
              img: "https://images.unsplash.com/photo-1594140733592-2374662df94d?auto=format&fit=crop&q=80&w=300"
            },
            {
              category: "Nutrisi & Pakan",
              title: "Formulasi Pakan Musim Kemarau",
              desc: "Cara menjaga bobot sapi tetap stabil meskipun ketersediaan rumput hijau menurun.",
              author: "drh. Oktavianus",
              time: "6 Menit",
              img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=300"
            },
            {
              category: "Manajemen",
              title: "Mengenal Siklus Birahi Sapi",
              desc: "Tanda-tanda fisik yang perlu diperhatikan untuk keberhasilan program inseminasi buatan.",
              author: "drh. Ahmad",
              time: "5 Menit",
              img: "https://images.unsplash.com/photo-1545468130-14b223c5ee91?auto=format&fit=crop&q=80&w=300"
            }
          ].map((tip, index) => (
            <div 
              key={index}
              onClick={() => navigate('/peternak/akademi')}
              className="min-w-[290px] sm:min-w-[420px] bg-[#FBF9EE] rounded-[2.5rem] p-5 sm:p-6 flex flex-col justify-between border border-[#EFE9D5] shadow-sm hover:shadow-md transition-all cursor-pointer snap-start"
            >
              <div className="flex gap-4 items-start">
                <div className="flex-grow space-y-2">
                  <span className="inline-block text-[9px] font-bold text-yellow-800 bg-yellow-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {tip.category}
                  </span>
                  <h5 className="font-serif text-lg sm:text-xl text-primary-dark leading-tight line-clamp-2">
                    {tip.title}
                  </h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                    {tip.desc}
                  </p>
                </div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-standard-border/10">
                  <img 
                    src={tip.img} 
                    className="w-full h-full object-cover" 
                    alt={tip.title}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-yellow-200/40">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                  <span>{tip.author}</span>
                  <span>•</span>
                  <span>{tip.time} Baca</span>
                </div>
                <div className="text-brand-green font-bold text-[10px] flex items-center gap-1">
                  Baca <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}