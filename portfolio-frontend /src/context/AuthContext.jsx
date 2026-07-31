import { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin } from '../api/client';

const AuthContext = createContext(null);
const STORAGE_KEY = 'portfolio_admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [username, setUsername] = useState(() => localStorage.getItem(`${STORAGE_KEY}_user`));

  const login = useCallback(async (user, pass) => {
    const res = await apiLogin(user, pass); // { token, username, role }
    localStorage.setItem(STORAGE_KEY, res.token);
    localStorage.setItem(`${STORAGE_KEY}_user`, res.username);
    setToken(res.token);
    setUsername(res.username);
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}_user`);
    setToken(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
