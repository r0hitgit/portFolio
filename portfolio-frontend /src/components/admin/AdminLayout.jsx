import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/admin', label: 'dashboard', end: true },
  { to: '/admin/projects', label: 'projects' },
  { to: '/admin/posts', label: 'posts' },
  { to: '/admin/achievements', label: 'achievements' },
  { to: '/admin/education', label: 'education' },
];

export default function AdminLayout() {
  const { isAuthenticated, username, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex flex-col w-56 shrink-0 h-screen sticky top-0 border-r border-border px-5 py-8">
        <Link to="/" className="focus-ring font-mono-display font-black text-accent text-lg mb-1">
          RV
        </Link>
        <p className="font-mono-body text-[11px] text-faint mb-8">~/admin</p>

        <nav className="flex flex-col gap-0.5 font-mono-body text-[14px]">
          {NAV.map((item) => {
            const active = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`focus-ring px-2.5 py-1.5 border-l-2 transition-colors ${
                  active
                    ? 'text-accent border-accent bg-white/[0.03]'
                    : 'text-muted border-transparent hover:text-accent hover:border-accent-dim'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 font-mono-body text-[12px] text-faint space-y-3">
          <p>logged in as {username}</p>
          <button
            onClick={handleLogout}
            className="focus-ring text-faint hover:text-amber transition-colors"
          >
            ./logout.sh
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-6 sm:px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
}
