import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from || '/admin';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate(redirectTo, { replace: true });
    } catch {
      setError('invalid username or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono-body text-xs text-faint mb-1">~/rohit-verma/admin</p>
        <h1 className="font-mono-display font-bold text-2xl mb-8">$ login</h1>

        <form onSubmit={handleSubmit} className="space-y-5 font-mono-body text-[14px]">
          <div>
            <label htmlFor="username" className="block text-faint text-[12px] mb-2">
              username
            </label>
            <input
              id="username"
              autoFocus
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus-ring w-full bg-transparent border border-border px-3.5 py-2.5 text-text focus:border-accent-dim transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-faint text-[12px] mb-2">
              password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring w-full bg-transparent border border-border px-3.5 py-2.5 text-text focus:border-accent-dim transition-colors"
            />
          </div>

          {error && <p className="text-amber text-[13px]">[ ERROR ] {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring w-full px-6 py-3 border border-accent-dim text-accent hover:bg-accent hover:text-bg transition-colors disabled:opacity-50"
          >
            {loading ? 'authenticating...' : './login.sh'}
          </button>
        </form>
      </div>
    </div>
  );
}
