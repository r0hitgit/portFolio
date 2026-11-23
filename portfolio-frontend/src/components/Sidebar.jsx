import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // True mobile (iOS Safari & Android) and desktop scroll lock
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [open]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleLinkClick = (e, f) => {
    const isAnchor = isHome && f.href.startsWith('#');
    const targetId = f.href.replace(/^#/, '');

    setOpen(false);

    if (isAnchor) {
      e.preventDefault();
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', f.href);
        }
      }, 50);
    }
  };

  const renderNavLinks = (isMobile = false) => (
    <nav className="flex flex-col gap-0.5 font-mono-body text-[14px]">
      {FILES.map((f, i) => {
        const targetHref = isHome ? f.href : `/${f.href}`;
        const targetId = f.href.replace(/^#/, '');
        const isActive = isHome && activeSection === targetId;

        return (
          <a
            key={i}
            href={targetHref}
            onClick={(e) => {
              if (isMobile) {
                handleLinkClick(e, f);
              }
            }}
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

        {renderNavLinks(false)}

        <div className="mt-auto pt-8 font-mono-body text-[11px] text-faint">
          <Link
            to="/blog"
            className="focus-ring hover:text-accent transition-colors"
          >
            blog/
          </Link>
        </div>
      </aside>

      {/* Mobile FIXED top bar: pinned so it never moves while scrolling */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between border-b border-border bg-bg/95 backdrop-blur px-5">
        <Link
          to="/"
          onClick={() => {
            setOpen(false);
            if (isHome) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="focus-ring inline-flex items-center"
          aria-label="Home"
        >
          <Logo size={30} />
        </Link>

        <button
          className="focus-ring font-mono-body text-xs text-muted border border-border px-3 py-1.5 hover:text-accent hover:border-accent-dim transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? 'close' : 'menu'}
        </button>
      </header>

      {/* Mobile top bar spacer to prevent content from hiding beneath fixed header */}
      <div className="lg:hidden h-16 w-full shrink-0" aria-hidden="true" />

      {/* Mobile horizontal drawer (opens from right to left) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay: blocks touches and locks scroll */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              onTouchMove={(e) => e.preventDefault()}
              className="lg:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-sm touch-none"
              aria-hidden="true"
            />

            {/* Slide-out drawer panel (right to left) */}
            <motion.aside
              key="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 max-w-[85vw] h-full bg-bg border-l border-border shadow-[-14px_0_35px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 overflow-y-auto overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div>
                {/* Drawer header */}
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <div>
                    <p className="font-mono-body text-[11px] text-faint">~/rohit-verma</p>
                    <p className="font-mono-display font-bold text-sm text-text">menu</p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="focus-ring font-mono-body text-xs text-muted hover:text-accent border border-border hover:border-accent px-2.5 py-1 transition-colors"
                    aria-label="Close menu"
                  >
                    [x] close
                  </button>
                </div>

                {/* Nav Links */}
                {renderNavLinks(true)}
              </div>

              {/* Drawer footer */}
              <div className="pt-6 border-t border-border mt-8 space-y-3 font-mono-body text-[12px]">
                <Link
                  to="/blog"
                  onClick={() => setOpen(false)}
                  className="focus-ring flex items-center justify-between text-muted hover:text-accent border border-border hover:border-accent-dim px-3 py-2 transition-colors"
                >
                  <span>blog/</span>
                  <span className="text-[11px] opacity-60">&rarr;</span>
                </Link>

                <div className="flex items-center justify-between text-[11px] text-faint pt-1">
                  <span>rohit verma</span>
                  <span className="text-accent">exit 0</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
