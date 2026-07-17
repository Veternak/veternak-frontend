import { apiRequest } from './apiClient'

const ANSWER_SCORE = {
  Tidak: 0,
  Mungkin: 0.5,
  Ya: 1,
}

const SYMPTOM_KEY_MAP = {
  lemas: 'weak',
  nafsu_makan_turun: 'appetite_down',
  produksi_susu_turun: 'milk_down',
  batuk_ingus: 'cough_nasal',
  sesak_napas: 'breathing',
  air_liur_berlebihan: 'saliva',
  luka_mulut: 'mouth_lesions',
  diare: 'diarrhea',
  perut_kembung: 'bloat',
  pincang_sulit_berdiri: 'lameness',
  bengkak_luka_benjolan: 'skin_swelling',
  ternak_lain_sakit_mirip: 'herd_sick',
}

export function answerToScore(answer) {
  return ANSWER_SCORE[answer] ?? 0
}

export function buildDiagnosisPayload({
  species,
  animalAge,
  isProducingMilk,
  recentlyGaveBirth,
  symptomAnswers,
}) {
  const symptoms = Object.entries(SYMPTOM_KEY_MAP).reduce((result, [formKey, apiKey]) => {
    result[apiKey] = answerToScore(symptomAnswers?.[formKey])
    return result
  }, {})

  return {
    animalData: {
      jenisTernak: species || 'sapi',
      umurBulan: Number(animalAge) || 0,
      isProducingMilk: isProducingMilk === 'Ya' || isProducingMilk === true,
      isNewlyGivenBirth: recentlyGaveBirth === 'Ya' || recentlyGaveBirth === true,
    },
    symptoms,
  }
}

export async function diagnoseAnimal(input, options = {}) {
  const payload = buildDiagnosisPayload(input)

  return apiRequest('/ai/diagnose', {
    method: 'POST',
    body: JSON.stringify(payload),
    token: options.token,
  })
}

export async function getAiHealth() {
  return apiRequest('/ai/health', {
    method: 'GET',
  })
}

export const symptomKeyMap = SYMPTOM_KEY_MAP
