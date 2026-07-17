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

export async function getAnimalById(id) {
  return apiRequest(`/animals/${id}`, { method: 'GET' })
}

export async function updateAnimal(id, payload) {
  return apiRequest(`/animals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deleteAnimal(id) {
  return apiRequest(`/animals/${id}`, { method: 'DELETE' })
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

export async function requestVisit(consultationId, payload) {
  return apiRequest(`/consultations/${consultationId}/visit`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getVetById(id) {
  return apiRequest(`/vets/${id}`, { method: 'GET' })
}

export async function getFarmerDashboard() {
  return apiRequest('/farmer/dashboard', { method: 'GET' })
}

export async function getChatHistory(consultationId) {
  return apiRequest(`/consultations/${consultationId}/messages`, { method: 'GET' })
}




