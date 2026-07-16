import { doctorDemoProfile } from '../data/doctorDemoData'

const wait = (ms = 400) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

export async function loginDoctor(payload) {
  await wait()

  if (!payload?.identifier || !payload?.password) {
    throw new Error('Nomor HP/email dan password wajib diisi.')
  }

  if (payload.identifier.trim().toLowerCase() === 'gagal') {
    throw new Error('Akun dokter demo tidak ditemukan.')
  }

  return {
    user: {
      id: doctorDemoProfile.id,
      name: doctorDemoProfile.name,
      role: 'VETERINARIAN',
      verificationStatus: doctorDemoProfile.verificationStatus,
      isDemo: true,
    },
    session: {
      type: 'MOCK_SESSION',
      token: null,
    },
  }
}

export async function registerDoctor(payload) {
  await wait()

  return {
    user: {
      id: 'vet-demo-pending',
      name: payload?.name || 'Dokter Veternak',
      role: 'VETERINARIAN',
      verificationStatus: 'PENDING_VERIFICATION',
      isDemo: true,
    },
  }
}

export async function logoutDoctor() {
  await wait(200)
  return { success: true }
}

export async function getDoctorVerificationStatus() {
  await wait(200)
  return {
    status: doctorDemoProfile.verificationStatus,
    isDemo: true,
  }
}
