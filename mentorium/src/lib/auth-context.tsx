'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, ApiError, type ApiUser } from './api';

interface AuthContextValue {
  user: ApiUser | null;
  isLoading: boolean; // true only during the initial "restore session" check
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'mentorium_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, try to restore the session from a saved token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    api
      .me(token)
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY)) // token expired/invalid
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const { accessToken, user } = await api.login({ email, password });
    localStorage.setItem(TOKEN_KEY, accessToken);
    setUser(user);
  }

  async function register(name: string, email: string, password: string) {
    const { accessToken, user } = await api.register({ name, email, password });
    localStorage.setItem(TOKEN_KEY, accessToken);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { ApiError };
