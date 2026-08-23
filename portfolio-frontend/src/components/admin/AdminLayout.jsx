import { useState } from 'react';
import {
  Navigate,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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


const NAV = [
  { to: '/admin', label: 'dashboard', end: true },
  { to: '/admin/projects', label: 'projects' },
  { to: '/admin/posts', label: 'posts' },
  { to: '/admin/achievements', label: 'achievements' },
  { to: '/admin/education', label: 'education' },
  { to: '/admin/messages', label: 'messages' },
];

export default function AdminLayout() {
  const { isAuthenticated, username, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  const navLink = (item) => {
    const active = item.end
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

    return (
      <Link
        key={item.to}
        to={item.to}
        onClick={() => setMobileOpen(false)}
        className={`focus-ring px-2.5 py-1.5 border-l-2 transition-colors ${
          active
            ? 'text-accent border-accent bg-white/[0.03]'
            : 'text-muted border-transparent hover:text-accent hover:border-accent-dim'
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 h-screen sticky top-0 border-r border-border px-5 py-8">
        <Link
          to="/"
          className="focus-ring inline-flex items-center mb-2"
          aria-label="Home"
        >
          <Logo size={34} />
        </Link>

        <p className="font-mono-body text-[11px] text-faint mb-8">
          ~/admin
        </p>

        <nav className="flex flex-col gap-0.5 font-mono-body text-[14px]">
          {NAV.map(navLink)}
        </nav>

        <div className="mt-auto pt-8 font-mono-body text-[12px] text-faint space-y-3">
          <p className="break-words">logged in as {username}</p>

          <button
            onClick={handleLogout}
            className="focus-ring text-faint hover:text-amber transition-colors"
          >
            ./logout.sh
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-bg/90 backdrop-blur px-5 py-4">
        <Link
          to="/"
          className="focus-ring inline-flex items-center"
          aria-label="Home"
        >
          <Logo size={30} />
        </Link>

        <span className="font-mono-body text-[11px] text-faint">
          ~/admin
        </span>

        <button
          className="focus-ring font-mono-body text-xs text-muted border border-border px-3 py-1.5"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle admin navigation"
        >
          {mobileOpen ? 'close' : 'menu'}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border px-5 py-4">
          <nav className="flex flex-col gap-0.5 font-mono-body text-[14px] mb-4">
            {NAV.map(navLink)}
          </nav>

          <div className="font-mono-body text-[12px] text-faint space-y-2 pt-3 border-t border-border">
            <p className="break-words">logged in as {username}</p>

            <button
              onClick={handleLogout}
              className="focus-ring text-faint hover:text-amber transition-colors"
            >
              ./logout.sh
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 px-6 sm:px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
}