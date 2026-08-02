import { useEffect, useState } from 'react';
import { contactLinks } from '../data/fallback';

const BOOT_LINES = [
  { text: 'booting profile.sys...', delay: 0 },
  { text: '[ OK ] loading identity', delay: 260 },
  { text: '[ OK ] mounting /skills, /projects, /achievements', delay: 460 },
  { text: '[ OK ] spring-boot-starter-web ......... ready', delay: 640 },
  { text: '[ OK ] react + vite ..................... ready', delay: 800 },
  { text: '$ whoami', delay: 1050 },
];

const iconFor = (key) => {
  switch (key) {
    case 'phone':
      return (
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      );
    case 'mail':
      return (
        <>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      );
    case 'linkedin':
      return (
        <>
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      );
    case 'github':
      return (
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      );
    default:
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </>
      );
  }
};

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showHero, setShowHero] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSkip(true);
      setShowHero(true);
      return;
    }

    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    const finalTimer = setTimeout(() => setShowHero(true), 1500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 sm:px-12 py-32 max-w-3xl relative">
      {!skip && (
        <div
          className={`font-mono-body text-[13px] sm:text-sm text-faint space-y-1 mb-8 transition-opacity duration-500 ${
            showHero ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'
          }`}
          aria-hidden={showHero}
        >
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i}>
              <span className="text-accent-dim mr-2">&gt;</span>
              {line.text}
            </div>
          ))}
        </div>
      )}

      <div
        className={`transition-all duration-700 ${
          showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none h-0'
        }`}
      >
        <p className="font-mono-body text-xs tracking-widest text-accent uppercase mb-4 flex items-center gap-2">
          <span className="text-faint">$</span> whoami
        </p>
        <h1 className="font-mono-display font-black leading-[0.95] tracking-tight text-6xl sm:text-7xl md:text-8xl mb-6 break-words">
          Rohit
          <br />
          <span className="text-accent">Verma</span>
          <span className="text-faint">_</span>
        </h1>
        <p className="text-muted text-[16px] sm:text-lg max-w-lg leading-relaxed mb-3 font-light">
          Full-stack developer building production-grade Java &amp; Spring Boot
          backends and React frontends — from JWT auth to containerised
          deployments.
        </p>
        <p className="font-mono-body text-[13px] text-faint mb-8">
          NIET · Greater Noida &nbsp;·&nbsp; B.Tech CSE (AI &amp; ML) &nbsp;·&nbsp; Class of 2027
        </p>

        <div className="font-mono-body text-[13px] border border-border bg-card/40 px-4 py-3.5 mb-8 max-w-lg space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
            <span className="text-accent">open to SDE internship opportunities</span>
          </div>
          <div className="text-muted">
            <span className="text-faint">focus:</span> DSA (Java) + exploring System Design
          </div>
          <div className="text-muted">
            <span className="text-faint">approach:</span> end-to-end — APIs, UI, deployment pipelines
          </div>
          <div className="text-muted pt-1 border-t border-border mt-2 italic">
            # fun fact: when I start building, the world disappears — I don't stop until it works
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="focus-ring group flex items-center gap-2 px-4 py-2.5 border border-border text-[14px] text-muted hover:text-accent hover:border-accent-dim hover:shadow-[0_0_16px_-4px_rgba(57,255,143,0.35)] transition-all font-mono-body max-w-full break-all sm:break-normal"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
              >
                {iconFor(link.key)}
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-6 sm:left-12 font-mono-body text-[13px] text-muted flex items-center gap-2 transition-opacity duration-700 ${
          showHero ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="animate-bounce text-accent">↓</span>
        <span className="tracking-widest">SCROLL</span>
      </div>
    </div>
  );
}
