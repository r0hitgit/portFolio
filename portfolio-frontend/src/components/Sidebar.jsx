import { useState } from 'react';
import { Link } from 'react-router-dom';

const FILES = [
  { href: '#education', label: 'education.log' },
  { href: '#projects', label: 'projects/', indent: 0 },
  { href: '#projects', label: 'nexhire.md', indent: 1 },
  { href: '#projects', label: 'transaction-gui.md', indent: 1 },
  { href: '#skills', label: 'skills.json' },
  { href: '#achievements', label: 'achievements.md' },
  { href: '#interests', label: 'interests.yml' },
  { href: '#contact', label: 'contact.sh' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const linkList = (
    <nav className="flex flex-col gap-0.5 font-mono-body text-[14px]">
      {FILES.map((f, i) => (
        <a
          key={i}
          href={f.href}
          onClick={() => setOpen(false)}
          className={`focus-ring px-2.5 py-1.5 text-muted hover:text-accent hover:bg-white/[0.03] border-l-2 border-transparent hover:border-accent transition-colors ${
            f.indent ? 'pl-6 text-[13px] text-faint' : ''
          }`}
        >
          {f.label}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-border px-5 py-8">
        <Link to="/" className="focus-ring font-mono-display font-black text-accent text-lg mb-1">
          RV
        </Link>
        <p className="font-mono-body text-[11px] text-faint mb-8">~/rohit-verma</p>
        {linkList}
        <div className="mt-auto pt-8 font-mono-body text-[11px] text-faint">
          <Link to="/blog" className="focus-ring hover:text-accent transition-colors">
            blog/
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-bg/90 backdrop-blur px-5 py-4">
        <Link to="/" className="focus-ring font-mono-display font-black text-accent text-base">
          RV
        </Link>
        <button
          className="focus-ring font-mono-body text-xs text-muted border border-border px-3 py-1.5"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? 'close' : 'menu'}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-b border-border px-5 py-4">
          {linkList}
          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className="focus-ring block mt-3 font-mono-body text-[13px] text-faint hover:text-accent"
          >
            blog/
          </Link>
        </div>
      )}
    </>
  );
}
