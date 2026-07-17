const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000/api/v1" : "/api/v1")
).replace(/\/$/, "");

export function formatPhone(phone) {
  let cleaned = phone.replace(/\D/g, ""); // hanya pertahankan angka
  if (cleaned.startsWith("62")) {
    cleaned = "0" + cleaned.slice(2);
  } else if (!cleaned.startsWith("0")) {
    cleaned = "0" + cleaned;
  }
  return cleaned;
}

export function getCoordinates() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ latitude: null, longitude: null });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        resolve({ latitude: null, longitude: null });
      },
      { timeout: 4000 }, // batas waktu respons geolocation 4 detik
    );
  });
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("vt_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const payload = await response.json();

  if (payload.status === "error" || !response.ok) {
    throw new Error(payload.message || "Terjadi kesalahan sistem.");
  }

  return payload.data;
}

export const authService = {
  async registerFarmer(payload) {
    const formattedPhone = formatPhone(payload.phone);
    const data = await request("/auth/farmer/register", {
      method: "POST",
      body: JSON.stringify({
        phone: formattedPhone,
        password: payload.password,
        name: payload.name,
        province: payload.province || null,
        regency: payload.regency || null,
        district: payload.district || null,
        addressDetail: payload.addressDetail || null,
        latitude: payload.latitude || null,
        longitude: payload.longitude || null,
      }),
    });
    return data;
  },

  async loginFarmer(phone, password) {
    const formattedPhone = formatPhone(phone);
    const coords = await getCoordinates();
    const data = await request("/auth/farmer/login", {
      method: "POST",
      body: JSON.stringify({
        phone: formattedPhone,
        password,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }),
    });

    if (data.token) {
      localStorage.setItem("vt_token", data.token);
      localStorage.setItem(
        "vt_user",
        JSON.stringify({ ...data.farmer, role: "farmer" }),
      );
    }
    return data;
  },

  async registerVet(payload) {
    const formattedPhone = formatPhone(payload.phone);
    const data = await request("/auth/vet/register", {
      method: "POST",
      body: JSON.stringify({
        phone: formattedPhone,
        password: payload.password,
        name: payload.name,
        strNumber: payload.strNumber,
        province: payload.province || null,
        regency: payload.regency || null,
        district: payload.district || null,
        addressDetail: payload.addressDetail || null,
        latitude: payload.latitude || null,
        longitude: payload.longitude || null,
      }),
    });
    return data;
  },

  async loginVet(phone, password) {
    const formattedPhone = formatPhone(phone);
    const coords = await getCoordinates();
    const data = await request("/auth/vet/login", {
      method: "POST",
      body: JSON.stringify({
        phone: formattedPhone,
        password,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }),
    });

    if (data.token) {
      localStorage.setItem("vt_token", data.token);
      localStorage.setItem(
        "vt_user",
        JSON.stringify({ ...data.vet, role: "vet" }),
      );
    }
    return data;
  },

  logout() {
    localStorage.removeItem("vt_token");
    localStorage.removeItem("vt_user");
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("vt_user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem("vt_token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
