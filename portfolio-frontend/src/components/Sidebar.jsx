import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const FILES = [
  { href: '#education', label: 'education.log' },
  { href: '#projects', label: 'projects/', indent: 0 },
  { href: '#nexhire', label: 'nexhire.md', indent: 1 },
  { href: '#genericmeds-ai', label: 'genericmeds-ai.md', indent: 1 },
  { href: '#skills', label: 'skills.json' },
  { href: '#achievements', label: 'achievements.md' },
  { href: '#interests', label: 'interests.yml' },
  { href: '#contact', label: 'contact.sh' },
];

/* Logo */
const Logo = ({ size = 30 }) => {
  const height = (size * 150) / 190;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 190 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Home"
    >
      <path
        d="
          M 16 25
          H 129

          C 134 25 137 30 134 35
          L 111 69

          C 108 73 104 75 98 75
          H 60

          C 54 75 51 81 54 86
          L 95 140

          C 99 146 106 146 110 140
          L 177 25
        "
        stroke="#41FF8F"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};



export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = [
      'education',
      'projects',
      'nexhire',
      'genericmeds-ai',
      'skills',
      'achievements',
      'interests',
      'contact',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const linkList = (
    <nav className="flex flex-col gap-0.5 font-mono-body text-[14px]">
      {FILES.map((f, i) => {
        const targetHref = isHome ? f.href : `/${f.href}`;
        const targetId = f.href.replace(/^#/, '');
        const isActive = isHome && activeSection === targetId;

        return (
          <a
            key={i}
            href={targetHref}
            onClick={() => setOpen(false)}
            className={`focus-ring px-2.5 py-1.5 border-l-2 transition-colors ${
              f.indent ? 'pl-6 text-[13px]' : ''
            } ${
              isActive
                ? 'text-accent border-accent bg-white/[0.04]'
                : 'text-muted border-transparent hover:text-accent hover:border-accent-dim hover:bg-white/[0.02]'
            }`}
          >
            {f.label}
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-border px-5 py-8">
        <Link
          to="/"
          className="focus-ring inline-flex items-center mb-2"
          aria-label="Home"
        >
          <Logo size={34} />
        </Link>

        <p className="font-mono-body text-[11px] text-faint mb-8">
          ~/rohit-verma
        </p>

        {linkList}

        <div className="mt-auto pt-6 space-y-3 font-mono-body text-[12px]">
          <a
            href="https://drive.google.com/file/d/12cmWu28HCIjOfpUJ3lKyZJnWudCkVLPW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center justify-between px-3 py-2 border border-accent/40 bg-accent/5 text-accent hover:bg-accent/15 hover:border-accent hover:shadow-[0_0_14px_-3px_rgba(57,255,143,0.35)] transition-all font-semibold group"
          >
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>resume.pdf</span>
            </span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[10px]">↗</span>
          </a>

          <Link
            to="/blog"
            className="focus-ring block text-faint hover:text-accent transition-colors"
          >
            blog/
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-bg/90 backdrop-blur px-5 py-4">
        <Link
          to="/"
          className="focus-ring inline-flex items-center"
          aria-label="Home"
        >
          <Logo size={30} />
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

      {/* Mobile navigation */}
      {open && (
        <div className="lg:hidden border-b border-border px-5 py-4 space-y-3">
          {linkList}

          <div className="pt-3 border-t border-border flex items-center justify-between font-mono-body text-[13px]">
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className="focus-ring text-faint hover:text-accent"
            >
              blog/
            </Link>

            <a
              href="https://drive.google.com/file/d/12cmWu28HCIjOfpUJ3lKyZJnWudCkVLPW/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-1.5 px-2.5 py-1 border border-accent bg-accent/10 text-accent font-semibold text-[12px]"
            >
              <span>resume.pdf ↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}