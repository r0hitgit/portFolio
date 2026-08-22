import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/client';

export default function AdminMessages() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setMessages(await adminApi.listMessages());
    } catch (err) {
      if (err.message === 'SESSION_EXPIRED') {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      setError(err.message || 'Failed to load messages');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this message? This cannot be undone.')) return;
    try {
      await adminApi.deleteMessage(id);
      await load();
    } catch (err) {
      if (err.message === 'SESSION_EXPIRED') {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      alert(err.message || 'Delete failed');
    }
  }

  return (
    <div>
      <p className="font-mono-body text-xs text-faint mb-1">~/admin/messages</p>
      <h1 className="font-mono-display font-bold text-2xl mb-8">Contact messages</h1>

      {error && <p className="text-amber text-[13px] font-mono-body mb-4">[ ERROR ] {error}</p>}

      {messages === null && !error && (
        <p className="text-muted text-sm font-mono-body">loading...</p>
      )}

      {messages !== null && messages.length === 0 && (
        <p className="text-muted text-sm font-mono-body">
          [ EMPTY ] no messages yet.
        </p>
      )}

      <div className="space-y-4">
        {(messages || []).map((m) => (
          <div key={m.id} className="border border-border p-5 hover:border-accent-dim transition-colors">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
              <div>
                <span className="font-mono-display font-bold">{m.name}</span>
                <span className="font-mono-body text-[12px] text-faint ml-2">{m.email}</span>
              </div>
              <span className="font-mono-body text-[11px] text-faint whitespace-nowrap">
                {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}
              </span>
            </div>

            <p className="text-[14px] text-muted font-light leading-relaxed mb-3 whitespace-pre-wrap">
              {m.message}
            </p>

            <div className="flex items-center justify-between font-mono-body text-[11px]">
              <span className={m.emailSent ? 'text-accent' : 'text-faint'}>
                {m.emailSent ? '[ email sent ]' : '[ email not sent \u2014 check via DB only ]'}
              </span>
              <button
                onClick={() => handleDelete(m.id)}
                className="focus-ring text-faint hover:text-amber transition-colors"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}