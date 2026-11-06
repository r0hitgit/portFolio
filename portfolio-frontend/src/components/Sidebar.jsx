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

        <div className="mt-auto pt-8 font-mono-body text-[11px] text-faint">
          <Link
            to="/blog"
            className="focus-ring hover:text-accent transition-colors"
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