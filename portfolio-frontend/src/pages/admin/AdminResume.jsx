import { useCallback, useEffect, useState } from 'react';
import { adminApi, getResumeUrl } from '../../api/client';
import { useAuth } from '../../context/useAuth';

const DEFAULT_FALLBACK = 'https://drive.google.com/file/d/12cmWu28HCIjOfpUJ3lKyZJnWudCkVLPW/view?usp=sharing';

export default function AdminResume() {
  const { logout } = useAuth();
  const [currentUrl, setCurrentUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loadResume = useCallback(async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const data = await adminApi.getSettings();
      const url = data?.resumeUrl || DEFAULT_FALLBACK;
      setCurrentUrl(url);
      setInputUrl(url);
    } catch (err) {
      if (err?.message === 'SESSION_EXPIRED') {
        logout();
        return;
      }
      // Fallback
      const fallback = await getResumeUrl(DEFAULT_FALLBACK);
      setCurrentUrl(fallback);
      setInputUrl(fallback);
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputUrl.trim()) {
      setStatus({ type: 'error', message: 'Resume URL cannot be empty.' });
      return;
    }

    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await adminApi.updateResumeUrl(inputUrl.trim());
      const updated = res?.resumeUrl || inputUrl.trim();
      setCurrentUrl(updated);
      setInputUrl(updated);
      setStatus({ type: 'success', message: 'Resume link updated successfully! It is now live across your portfolio.' });
    } catch (err) {
      if (err?.message === 'SESSION_EXPIRED') {
        logout();
        return;
      }
      setStatus({ type: 'error', message: err?.message || 'Failed to update resume link. Please check backend connection.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono-body text-xs text-faint">~/admin/resume.pdf</p>
      </div>
      <h1 className="font-mono-display font-bold text-2xl mb-2">Resume Settings</h1>
      <p className="text-muted text-sm font-light mb-8">
        Update your live resume link. Changing this automatically updates the{' '}
        <span className="text-accent font-mono-body text-[13px]">[resume.pdf ↗]</span> button on your homepage.
      </p>

      {/* Current Active Resume Card */}
      <div className="border border-border bg-card/40 p-5 mb-8 font-mono-body text-[13px] space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-accent font-bold">CURRENT ACTIVE LINK:</span>
          {currentUrl && (
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 px-3 py-1 border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-bg transition-all font-semibold text-[12px]"
            >
              <span>Test / View Current ↗</span>
            </a>
          )}
        </div>
        <p className="text-muted break-all text-[12.5px] bg-surface/60 p-3 border border-border">
          {loading ? 'loading current link...' : currentUrl || 'No link configured'}
        </p>
      </div>

      {/* Update Form */}
      <form onSubmit={handleSubmit} className="border border-border bg-surface p-6 font-mono-body text-[13px] space-y-5">
        <div>
          <label htmlFor="resumeUrlInput" className="block text-faint text-[12px] mb-2 font-mono-body">
            $ new_resume_url (Google Drive, Dropbox, or direct PDF link)
          </label>
          <input
            id="resumeUrlInput"
            type="url"
            required
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
            className="focus-ring w-full bg-transparent border border-border px-3.5 py-2.5 text-text placeholder:text-faint focus:border-accent-dim transition-colors text-[13.5px]"
          />
        </div>

        <div className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={saving || loading}
            className="focus-ring px-6 py-2.5 border border-accent text-accent hover:bg-accent hover:text-bg hover:shadow-[0_0_18px_-4px_rgba(57,255,143,0.45)] transition-all disabled:opacity-50 font-semibold"
          >
            {saving ? 'updating...' : './update_resume.sh'}
          </button>

          <button
            type="button"
            onClick={() => setInputUrl(DEFAULT_FALLBACK)}
            className="focus-ring text-faint hover:text-accent transition-colors text-[12px]"
          >
            reset to default
          </button>
        </div>

        {status.type === 'success' && (
          <p className="text-accent text-[13px] pt-2 border-t border-border">
            [ OK ] {status.message}
          </p>
        )}

        {status.type === 'error' && (
          <p className="text-amber text-[13px] pt-2 border-t border-border">
            [ ERROR ] {status.message}
          </p>
        )}
      </form>

      {/* Helper guide */}
      <div className="mt-8 border border-border/60 bg-surface/20 p-5 font-mono-body text-[12px] text-muted space-y-2">
        <p className="text-faint uppercase font-bold tracking-wider"># How to update your resume:</p>
        <ol className="list-decimal list-inside space-y-1 pl-1 font-light leading-relaxed">
          <li>Upload your updated PDF to <strong>Google Drive</strong>.</li>
          <li>Right-click the file &rarr; <strong>Share</strong> &rarr; Set General Access to <strong>&ldquo;Anyone with the link&rdquo;</strong> (Viewer).</li>
          <li>Click <strong>Copy link</strong> and paste it into the field above.</li>
          <li>Click <strong>./update_resume.sh</strong> &mdash; your site updates instantly without redeploying code.</li>
        </ol>
      </div>
    </div>
  );
}
