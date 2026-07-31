import { useState } from 'react';
import FileSection from './FileSection';
import { submitContact } from '../api/client';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitContact(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <FileSection id="contact" path="contact.sh" title="Get in touch">
      <form onSubmit={handleSubmit} className="max-w-md space-y-6 font-mono-body text-[14px]">
        <div>
          <label htmlFor="name" className="block text-faint text-[12px] mb-2">
            $ name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="focus-ring w-full bg-transparent border border-border px-3.5 py-2.5 text-text placeholder:text-faint focus:border-accent-dim transition-colors"
            placeholder="your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-faint text-[12px] mb-2">
            $ email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="focus-ring w-full bg-transparent border border-border px-3.5 py-2.5 text-text placeholder:text-faint focus:border-accent-dim transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-faint text-[12px] mb-2">
            $ message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="focus-ring w-full bg-transparent border border-border px-3.5 py-2.5 text-text placeholder:text-faint focus:border-accent-dim transition-colors resize-none"
            placeholder="what's up?"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="focus-ring px-6 py-3 border border-accent-dim text-accent hover:bg-accent hover:text-bg hover:shadow-[0_0_20px_-4px_rgba(57,255,143,0.5)] transition-all disabled:opacity-50"
        >
          {status === 'sending' ? 'sending...' : './send.sh'}
        </button>

        {status === 'sent' && (
          <p className="text-accent text-[13px]">[ OK ] message sent — I'll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="text-amber text-[13px]">[ ERROR ] couldn't send that — try emailing directly instead.</p>
        )}
      </form>
    </FileSection>
  );
}
