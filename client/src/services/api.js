import axios from "axios";
import { getToken } from "../utils/tokenCrypto";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000/api",
  // baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

export async function requestFreshToken() {
  return null;
}

export async function ensureAuthToken() {
  if (typeof window === "undefined") return null;

  let token = null;
  try {
    token = await getToken();
  } catch {
    token = null;
  }

  if (!token) {
    const raw = localStorage.getItem("token");
    if (
      raw &&
      raw !== "treasure_island_auth_token" &&
      typeof raw === "string" &&
      !raw.startsWith("{")
    ) {
      token = raw;
    }
  }

  if (
    token &&
    typeof token === "string" &&
    token !== "treasure_island_auth_token" &&
    !token.startsWith("{") &&
    token.trim().length > 0
  ) {
    return token;
  }

  return null;
}

api.interceptors.request.use(
  async (config) => {
    const token = await ensureAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
