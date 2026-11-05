import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import {
  storeToken,
  getToken,
  clearToken,
} from "../utils/tokenCrypto";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        let token = localStorage.getItem("token");
        if (
          !token ||
          token === "treasure_island_auth_token" ||
          token.startsWith("{")
        ) {
          try {
            token = await getToken();
          } catch {
            token = null;
          }
        }

        if (
          token &&
          typeof token === "string" &&
          token !== "treasure_island_auth_token" &&
          !token.startsWith("{") &&
          token.trim().length > 0
        ) {
          try {
            await api.post(
              "/logout",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch {}
        }
      }
    } catch {} finally {
      try {
        clearToken();
      } catch {}
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        sessionStorage.clear();
      }
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const token = await getToken();

        if (!token) return;

        const response = await api.get("/me");

        if (active && response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        if (error.response?.status === 401 ||
            error.response?.status === 403) {
          clearToken();
        }

        if (active) {
          setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (!response.data.success || !response.data.token) {
        throw new Error(
          response.data.message || "Login failed"
        );
      }

      await storeToken(response.data.token);

      const meResponse = await api.get("/me");

      if (!meResponse.data.success) {
        throw new Error("Unable to verify user session");
      }

      setUser(meResponse.data.user);

      return meResponse.data.user;
    } catch (error) {
      clearToken();
      setUser(null);
      throw error;
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
