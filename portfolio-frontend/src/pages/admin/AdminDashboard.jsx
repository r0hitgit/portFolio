import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CARDS = [
  { to: '/admin/projects', label: 'projects/', desc: 'manage project entries' },
  { to: '/admin/posts', label: 'posts/', desc: 'write and publish blog posts' },
  { to: '/admin/achievements', label: 'achievements.md', desc: 'manage milestones' },
  { to: '/admin/education', label: 'education.log', desc: 'manage education entries' },
];

export default function AdminDashboard() {
  const { username } = useAuth();

  return (
    <div>
      <p className="font-mono-body text-xs text-faint mb-1">~/admin</p>
      <h1 className="font-mono-display font-bold text-2xl mb-2">welcome, {username}</h1>
      <p className="text-muted text-sm font-light mb-10">
        Manage the content that feeds your public site.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="focus-ring block border border-border p-5 hover:border-accent-dim hover:shadow-[0_0_20px_-8px_rgba(57,255,143,0.3)] transition-all"
          >
            <p className="font-mono-display font-bold text-accent mb-1">{c.label}</p>
            <p className="text-muted text-[13px] font-light">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
