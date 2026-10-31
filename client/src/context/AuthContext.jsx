
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
      if (await getToken()) {
        await api.post("/logout");
      }
    } catch (error) {
      console.error(
        "Backend logout failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      clearToken();
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

      // Save the backend's plain token in encrypted form.
      await storeToken(response.data.token);

      // Verify the token and fetch the authenticated user.
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
