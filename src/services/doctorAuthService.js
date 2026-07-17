import { apiRequest, getCoordinates } from './apiClient'

const TOKEN_KEY = 'veternak_access_token'
const DOCTOR_KEY = 'veternak_doctor'

export function storeDoctorSession({ token, vet }) {
  if (!token) return
  window.localStorage.setItem(TOKEN_KEY, token)
  if (vet) {
    window.localStorage.setItem(DOCTOR_KEY, JSON.stringify(vet))
  }
}

export function clearDoctorSession() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(DOCTOR_KEY)
}

export function getStoredDoctor() {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(DOCTOR_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getDoctorDisplayName() {
  return getStoredDoctor()?.name || 'Dokter Hewan'
}

export async function loginDoctor(payload) {
  if (!payload?.identifier || !payload?.password) {
    throw new Error('Nomor HP dan password wajib diisi.')
  }

  const coords = await getCoordinates();
  const response = await apiRequest('/auth/vet/login', {
    method: 'POST',
    body: JSON.stringify({
      phone: payload.identifier,
      password: payload.password,
      latitude: coords.latitude,
      longitude: coords.longitude,
    }),
  })

  storeDoctorSession(response.data)
  return response
}

export async function registerDoctor(payload) {
  const coords = await getCoordinates();
  const registerPayload = {
    name: payload.name,
    phone: payload.phone,
    password: payload.password,
    strNumber: payload.strNumber,
    province: payload.province || null,
    regency: payload.city || null,
    district: payload.district || null,
    addressDetail: payload.addressDetail || null,
    latitude: payload.latitude ?? coords.latitude,
    longitude: payload.longitude ?? coords.longitude,
  }

  return apiRequest('/auth/vet/register', {
    method: 'POST',
    body: JSON.stringify(registerPayload),
  })
}

export async function getDoctorVerificationStatus() {
  const doctor = getStoredDoctor()
  if (!doctor) {
    return {
      status: 'PENDING_VERIFICATION',
      isDemo: false,
    }
  }

  return {
    status: doctor.isVerified ? 'VERIFIED' : 'PENDING_VERIFICATION',
    isDemo: false,
  }
}
