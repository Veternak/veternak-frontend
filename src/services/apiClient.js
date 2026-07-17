const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/v1"
  : "/api/v1";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, "");

const AUTH_TOKEN_KEYS = [
  "veternak_access_token",
  "veternak_token",
  "accessToken",
  "token",
];

export function getStoredAuthToken() {
  if (typeof window === "undefined") return null;

  for (const key of AUTH_TOKEN_KEYS) {
    const value =
      window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
    if (value) return value;
  }

  return null;
}

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest(path, options = {}) {
  const token = options.token ?? getStoredAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, {
      status: response.status,
      data,
    });
  }

  return data;
}

export function getCoordinates() {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
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
      { timeout: 4000 },
    );
  });
}
