// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axios';

interface User {
  id: number;
  name: string;
  email: string;
  disability: string;
  created_at: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, disability: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      api
        .get<User>('/users/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('jwt_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post<{ token: string }>('/auth/login', { email, password });
    localStorage.setItem('jwt_token', res.data.token);
    const profile = await api.get<User>('/users/me');
    setUser(profile.data);
  }

  async function register(name: string, email: string, password: string, disability: string) {
    await api.post('/auth/register', { name, email, password, disability });
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem('jwt_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}