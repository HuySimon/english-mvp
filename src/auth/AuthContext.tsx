import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, setAuth } from '../api';
type User = { id: number; email: string; name: string };
type Ctx = { user: User | null; token: string | null; login: (email: string, password: string) => Promise<void>; register: (name: string, email: string, password: string) => Promise<void>; logout: () => void; };
const AuthCtx = createContext<Ctx>(null as any);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => { const t = localStorage.getItem('token'); const u = localStorage.getItem('user'); if (t && u) { setToken(t); setAuth(t); setUser(JSON.parse(u)); } }, []);
  const login = async (email: string, password: string) => { const { data } = await api.post('/auth/login', { email, password }); setToken(data.token); setUser(data.user); setAuth(data.token); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); };
  const register = async (name: string, email: string, password: string) => { const { data } = await api.post('/auth/register', { name, email, password }); setToken(data.token); setUser(data.user); setAuth(data.token); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); };
  const logout = () => { setToken(null); setUser(null); setAuth(undefined); localStorage.removeItem('token'); localStorage.removeItem('user'); };
  return <AuthCtx.Provider value={{ user, token, login, register, logout }}>{children}</AuthCtx.Provider>;
};
export const useAuth = () => useContext(AuthCtx);