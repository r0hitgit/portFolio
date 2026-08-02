import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Generic list + create/edit form for one admin-managed resource.
 *
 * fields: [{ key, label, type: 'text'|'textarea'|'number'|'checkbox'|'date'|'list'|'bullets' }]
 *   - 'list'    -> comma-separated string  <-> array of strings
 *   - 'bullets' -> newline-separated string <-> array of strings
 *
 * fetchList(): Promise<Array<item>>            (public GET, no auth needed)
 * onCreate(payload), onUpdate(id, payload), onDelete(id) -> authed admin calls
 * columns: which field keys to show in the list table (defaults to all)
 */
export default function AdminResourceCRUD({
  title,
  path,
  fields,
  fetchList,
  onCreate,
  onUpdate,
  onDelete,
  columns,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...item} = editing
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setItems(await fetchList());
  }

  function handleAuthError(err) {
    if (err.message === 'SESSION_EXPIRED') {
      logout();
      navigate('/admin/login', { replace: true });
      return true;
    }
    return false;
  }

  function openNew() {
    const blank = {};
    fields.forEach((f) => {
      blank[f.key] = f.type === 'checkbox' ? false : '';
    });
    setForm(blank);
    setEditing({});
    setError('');
  }

  function openEdit(item) {
    const draft = {};
    fields.forEach((f) => {
      let v = item[f.key];
      if (f.type === 'list') v = (v || []).join(', ');
      if (f.type === 'bullets') v = (v || []).join('\n');
      if (v === undefined || v === null) v = f.type === 'checkbox' ? false : '';
      draft[f.key] = v;
    });
    setForm(draft);
    setEditing(item);
    setError('');
  }

  function closeForm() {
    setEditing(null);
    setError('');
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function serialize() {
    const payload = {};
    fields.forEach((f) => {
      let v = form[f.key];
      if (f.type === 'list') {
        v = v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [];
      } else if (f.type === 'bullets') {
        v = v ? v.split('\n').map((s) => s.trim()).filter(Boolean) : [];
      } else if (f.type === 'number') {
        v = v === '' ? null : Number(v);
      }
      payload[f.key] = v;
    });
    return payload;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = serialize();
      if (editing && editing.id) {
        await onUpdate(editing.id, payload);
      } else {
        await onCreate(payload);
      }
      closeForm();
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError(err.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      await onDelete(id);
      await load();
    } catch (err) {
      if (!handleAuthError(err)) alert(err.message || 'Delete failed');
    }
  }

  const displayCols = columns || fields.slice(0, 3).map((f) => f.key);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono-body text-xs text-faint">~/admin/{path}</p>
      </div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono-display font-bold text-2xl">{title}</h1>
        <button
          onClick={openNew}
          className="focus-ring px-4 py-2 border border-accent-dim text-accent hover:bg-accent hover:text-bg transition-colors font-mono-body text-[13px]"
        >
          + new
        </button>
      </div>

      {items === null && <p className="text-muted text-sm font-mono-body">loading...</p>}

      {items !== null && items.length === 0 && !editing && (
        <p className="text-muted text-sm font-mono-body">[ EMPTY ] nothing here yet.</p>
      )}

      {items !== null && items.length > 0 && (
        <div className="border border-border">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-b-0 hover:bg-white/[0.02]"
            >
              <div className="min-w-0 flex-1 font-mono-body text-[13px] text-muted flex flex-wrap gap-x-4 gap-y-1">
                {displayCols.map((key) => (
                  <span key={key} className="truncate max-w-xs">
                    {String(item[key] ?? '—')}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 shrink-0 font-mono-body text-[12px]">
                <button
                  onClick={() => openEdit(item)}
                  className="focus-ring text-faint hover:text-accent transition-colors"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="focus-ring text-faint hover:text-amber transition-colors"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <div className="fixed inset-0 bg-bg/90 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg border border-border bg-surface p-6 my-8 font-mono-body text-[13px] space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-mono-display font-bold text-lg">
                {editing.id ? 'edit' : 'new'} {title.toLowerCase()}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="focus-ring text-faint hover:text-accent"
              >
                ✕
              </button>
            </div>

            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-faint text-[12px] mb-1.5">{f.label}</label>
                {f.type === 'textarea' || f.type === 'bullets' ? (
                  <textarea
                    rows={f.type === 'bullets' ? 5 : 4}
                    value={form[f.key] ?? ''}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    className="focus-ring w-full bg-transparent border border-border px-3 py-2 text-text focus:border-accent-dim transition-colors resize-none"
                    placeholder={f.type === 'bullets' ? 'one point per line' : ''}
                  />
                ) : f.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={!!form[f.key]}
                    onChange={(e) => updateField(f.key, e.target.checked)}
                    className="w-4 h-4 accent-accent"
                  />
                ) : (
                  <input
                    type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                    value={form[f.key] ?? ''}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    className="focus-ring w-full bg-transparent border border-border px-3 py-2 text-text focus:border-accent-dim transition-colors"
                    placeholder={f.type === 'list' ? 'comma, separated, values' : ''}
                  />
                )}
              </div>
            ))}

            {error && <p className="text-amber text-[12px]">[ ERROR ] {error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="focus-ring px-5 py-2.5 border border-accent-dim text-accent hover:bg-accent hover:text-bg transition-colors disabled:opacity-50"
              >
                {saving ? 'saving...' : 'save'}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="focus-ring px-5 py-2.5 border border-border text-faint hover:text-text transition-colors"
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
