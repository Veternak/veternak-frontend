import { apiRequest } from './apiClient'

export async function getAnimals() {
  return apiRequest('/animals', { method: 'GET' })
}

export async function createAnimal(payload) {
  return apiRequest('/animals', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getVets(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  })

  const query = search.toString()
  return apiRequest(`/vets${query ? `?${query}` : ''}`, { method: 'GET' })
}

export async function createConsultation(payload) {
  return apiRequest('/consultations', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
