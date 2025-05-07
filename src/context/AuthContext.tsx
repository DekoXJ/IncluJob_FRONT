import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import api from '../api/axios';

interface User {
  id: number;
  name: string;
  email: string;
  disability: string;
  role_id: number;
  created_at: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, disability: string, role_id?: number) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

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

  async function register(name: string, email: string, password: string, disability: string, role_id = 1) {
    await api.post('/auth/register', { name, email, password, disability, role_id });
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

export { AuthContext };
