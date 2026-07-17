import { apiRequest, getCoordinates } from './apiClient'

const TOKEN_KEY = 'veternak_access_token'
const FARMER_KEY = 'veternak_farmer'

export function storeFarmerSession({ token, farmer }) {
  if (!token) return
  window.localStorage.setItem(TOKEN_KEY, token)
  if (farmer) {
    window.localStorage.setItem(FARMER_KEY, JSON.stringify(farmer))
  }
}

export function clearFarmerSession() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(FARMER_KEY)
}

export function getStoredFarmer() {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(FARMER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getFarmerDisplayName() {
  return getStoredFarmer()?.name || 'Peternak'
}

export async function loginFarmer(payload) {
  const coords = await getCoordinates();
  const response = await apiRequest('/auth/farmer/login', {
    method: 'POST',
    body: JSON.stringify({
      phone: payload.phone,
      password: payload.password,
      latitude: coords.latitude,
      longitude: coords.longitude,
    }),
  })

  storeFarmerSession(response.data)
  return response
}

export async function registerFarmer(payload) {
  const coords = await getCoordinates();
  return apiRequest('/auth/farmer/register', {
    method: 'POST',
    body: JSON.stringify({
      phone: payload.phone,
      password: payload.password,
      name: payload.name,
      province: payload.province || null,
      regency: payload.regency || null,
      district: payload.district || null,
      addressDetail: payload.addressDetail || null,
      latitude: payload.latitude ?? coords.latitude,
      longitude: payload.longitude ?? coords.longitude,
    }),
  })
}

export async function getFarmerProfile() {
  return apiRequest('/farmer/profile', { method: 'GET' })
}

export async function updateFarmerProfile(payload) {
  const response = await apiRequest('/farmer/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  if (response?.data?.farmer) {
    window.localStorage.setItem(FARMER_KEY, JSON.stringify(response.data.farmer))
  }
  return response
}

