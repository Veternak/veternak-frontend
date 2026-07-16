export const demoLabel = 'Live Queue'

export const doctorDemoProfile = {
  id: 'vet-doctor-001',
  isDemo: false,
  demoLabel,
  name: 'drh. Anindya Putri',
  roleLabel: 'Dokter Hewan',
  strNumber: 'STR-2026-001',
  verificationStatus: 'VERIFIED',
  availabilityStatus: 'AVAILABLE',
  specialties: ['Sapi', 'Kerbau'],
  services: ['Konsultasi Online', 'Kunjungan Lapangan'],
  serviceArea: 'Kabupaten Sleman, DI Yogyakarta',
  serviceRadiusLabel: 'Area layanan aktif',
  schedule: [
    { day: 'Senin - Jumat', time: '08.00 - 16.00 WIB' },
    { day: 'Sabtu', time: '09.00 - 13.00 WIB' },
  ],
  lastUpdated: '16 Juli 2026, 09.00 WIB',
}

export const doctorDemoCases = [
  {
    id: 'case-001',
    isDemo: false,
    demoLabel,
    farmerName: 'Pak Bima',
    animalName: 'Sapi Lestari 04',
    species: 'Sapi',
    locationLabel: 'Sleman, DI Yogyakarta',
    urgency: 'EMERGENCY',
    urgencyLabel: 'Darurat',
    reportedAt: '10 menit lalu',
    status: 'NEW',
    symptomSummary:
      'Ternak tampak sangat lemas, sulit berdiri, dan napas terlihat lebih cepat dari biasanya.',
    originalNote:
      'Sejak pagi sapi saya tidak mau makan, terlihat lemas sekali, dan beberapa kali mencoba berdiri tapi jatuh lagi.',
    triggeredRules: ['Sulit berdiri', 'Nafsu makan turun drastis', 'Napas cepat'],
    aiSummaryLabel: 'Ringkasan awal',
    safetyNote:
      'Ringkasan ini adalah penilaian awal dari laporan peternak, bukan diagnosis final.',
  },
  {
    id: 'case-002',
    isDemo: false,
    demoLabel,
    farmerName: 'Ibu Wulan',
    animalName: 'Kerbau Rawa 02',
    species: 'Kerbau',
    locationLabel: 'Bantul, DI Yogyakarta',
    urgency: 'URGENT',
    urgencyLabel: 'Mendesak',
    reportedAt: '32 menit lalu',
    status: 'NEW',
    symptomSummary:
      'Ternak tidak mau makan dan terlihat lebih sering berbaring sejak kemarin sore.',
    originalNote:
      'Kerbau mulai tidak mau makan dari kemarin sore. Pagi ini masih minum sedikit tapi lebih banyak tidur.',
    triggeredRules: ['Tidak mau makan lebih dari 12 jam', 'Perubahan aktivitas'],
    aiSummaryLabel: 'Ringkasan awal',
    safetyNote:
      'Dokter perlu meninjau kondisi dan menanyakan data tambahan sebelum keputusan klinis.',
  },
  {
    id: 'case-003',
    isDemo: false,
    demoLabel,
    farmerName: 'Pak Surya',
    animalName: 'Sapi Pagi 11',
    species: 'Sapi',
    locationLabel: 'Kulon Progo, DI Yogyakarta',
    urgency: 'URGENT',
    urgencyLabel: 'Mendesak',
    reportedAt: '1 jam lalu',
    status: 'IN_REVIEW',
    symptomSummary:
      'Ada pembengkakan pada kaki depan dan ternak tampak pincang saat berjalan.',
    originalNote:
      'Kaki depan sapi membengkak sejak tadi malam. Masih mau makan, tapi jalannya pincang.',
    triggeredRules: ['Pembengkakan terlihat', 'Gangguan berjalan'],
    aiSummaryLabel: 'Ringkasan awal',
    safetyNote:
      'Belum ada diagnosis. Perlu pemeriksaan dokter bila memburuk atau bengkak meluas.',
  },
  {
    id: 'case-004',
    isDemo: false,
    demoLabel,
    farmerName: 'Ibu Rani',
    animalName: 'Sapi Melati 07',
    species: 'Sapi',
    locationLabel: 'Magelang, Jawa Tengah',
    urgency: 'NEEDS_EXAM',
    urgencyLabel: 'Perlu diperiksa',
    reportedAt: '2 jam lalu',
    status: 'WAITING_DOCTOR',
    symptomSummary:
      'Ternak batuk ringan berulang, makan masih normal, suhu belum diukur.',
    originalNote:
      'Batuknya terdengar beberapa kali hari ini. Sapi masih mau makan dan minum.',
    triggeredRules: ['Gejala berulang', 'Suhu belum diketahui'],
    aiSummaryLabel: 'Ringkasan awal',
    safetyNote:
      'Data suhu belum tersedia sehingga dokter dapat meminta konfirmasi tambahan.',
  },
  {
    id: 'case-005',
    isDemo: false,
    demoLabel,
    farmerName: 'Pak Arif',
    animalName: 'Kerbau Sore 01',
    species: 'Kerbau',
    locationLabel: 'Klaten, Jawa Tengah',
    urgency: 'MONITORING',
    urgencyLabel: 'Pemantauan',
    reportedAt: '4 jam lalu',
    status: 'MONITORING',
    symptomSummary:
      'Perubahan nafsu makan ringan setelah perpindahan kandang, tanpa tanda bahaya lain.',
    originalNote:
      'Setelah pindah kandang, kerbau makan lebih sedikit tapi masih aktif dan minum biasa.',
    triggeredRules: ['Perubahan lingkungan', 'Tidak ada red flag dilaporkan'],
    aiSummaryLabel: 'Ringkasan awal',
    safetyNote:
      'Peternak diarahkan memantau kondisi dan melapor bila muncul tanda memburuk.',
  },
]

export const doctorDemoMessages = {
  'case-001': [
    {
      id: 'msg-case-001-a',
      isDemo: false,
      senderRole: 'FARMER',
      senderName: 'Pak Bima',
      body: 'Dok, sapi saya sejak pagi sulit berdiri dan napasnya cepat.',
      sentAt: '09.12 WIB',
    },
    {
      id: 'msg-case-001-b',
      isDemo: false,
      senderRole: 'SYSTEM',
      senderName: 'Veternak',
      body: 'Laporan ditandai Darurat berdasarkan aturan awal. Ini bukan diagnosis final.',
      sentAt: '09.13 WIB',
    },
    {
      id: 'msg-case-001-c',
      isDemo: false,
      senderRole: 'VETERINARIAN',
      senderName: doctorDemoProfile.name,
      body: 'Saya akan cek detail laporannya. Apakah sapi masih merespons saat dipanggil?',
      sentAt: '09.15 WIB',
    },
  ],
  'case-004': [
    {
      id: 'msg-case-004-a',
      isDemo: false,
      senderRole: 'FARMER',
      senderName: 'Ibu Rani',
      body: 'Batuknya belum sering, tapi saya khawatir karena baru muncul hari ini.',
      sentAt: '08.40 WIB',
    },
  ],
}

export const doctorDemoVisitRequests = [
  {
    id: 'visit-001',
    isDemo: false,
    demoLabel,
    caseId: 'case-001',
    farmerName: 'Pak Bima',
    animalName: 'Sapi Lestari 04',
    locationLabel: 'Sleman, DI Yogyakarta',
    requestedSchedule: 'Hari ini, 11.00 - 13.00 WIB',
    status: 'REQUESTED',
    distanceLabel: 'Dalam area layanan',
    updatedAt: '16 Juli 2026, 09.18 WIB',
  },
]

export const doctorDemoHistory = [
  {
    id: 'history-001',
    isDemo: false,
    demoLabel,
    caseId: 'closed-case-001',
    farmerName: 'Pak Joko',
    animalName: 'Sapi Kenanga 03',
    species: 'Sapi',
    locationLabel: 'Sleman, DI Yogyakarta',
    completedAt: '15 Juli 2026, 15.20 WIB',
    finalDiagnosisSource: 'Diisi oleh dokter',
    finalDiagnosis: 'Gangguan pencernaan ringan berdasarkan pemeriksaan dokter.',
    recommendation:
      'Pantau makan dan minum, pisahkan sementara bila kondisi menurun, dan lakukan kontrol ulang sesuai arahan dokter.',
    status: 'RESOLVED',
  },
]

export const doctorDemoNotifications = [
  {
    id: 'notif-001',
    isDemo: false,
    demoLabel,
    type: 'CASE_NEW',
    title: 'Kasus darurat baru',
    body: 'Sapi Lestari 04 membutuhkan tinjauan dokter.',
    timestamp: '10 menit lalu',
    read: false,
    to: '/dokter-app/kasus/case-001',
  },
  {
    id: 'notif-002',
    isDemo: false,
    demoLabel,
    type: 'MESSAGE_NEW',
    title: 'Pesan baru dari peternak',
    body: 'Ada balasan pada konsultasi case-001.',
    timestamp: '8 menit lalu',
    read: false,
    to: '/dokter-app/konsultasi/case-001',
  },
  {
    id: 'notif-003',
    isDemo: false,
    demoLabel,
    type: 'VISIT_REQUEST',
    title: 'Request kunjungan lapangan',
    body: 'Peternak meminta jadwal kunjungan hari ini.',
    timestamp: '5 menit lalu',
    read: true,
    to: '/dokter-app/kunjungan',
  },
  {
    id: 'notif-004',
    isDemo: false,
    demoLabel,
    type: 'SCHEDULE_UPDATED',
    title: 'Perubahan jadwal kunjungan',
    body: 'Status kunjungan diperbarui.',
    timestamp: 'Baru saja',
    read: true,
    to: '/dokter-app/kunjungan',
  },
  {
    id: 'notif-005',
    isDemo: false,
    demoLabel,
    type: 'VERIFICATION_STATUS',
    title: 'Akun dokter terverifikasi',
    body: 'Status verifikasi dokter: terverifikasi.',
    timestamp: 'Kemarin',
    read: true,
    to: '/dokter-app/profil',
  },
]
