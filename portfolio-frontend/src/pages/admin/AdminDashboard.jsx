import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { getProjects, getAchievements, getEducation, getSkills, adminApi } from '../../api/client';

const CARDS = [
  { to: '/admin/projects', label: 'projects/', countKey: 'projects', desc: 'manage project entries' },
  { to: '/admin/skills', label: 'skills.json', countKey: 'skills', desc: 'manage what I work with' },
  { to: '/admin/posts', label: 'posts/', countKey: 'posts', desc: 'write and publish blog posts' },
  { to: '/admin/achievements', label: 'achievements.md', countKey: 'achievements', desc: 'manage milestones' },
  { to: '/admin/education', label: 'education.log', countKey: 'education', desc: 'manage education entries' },
  { to: '/admin/messages', label: 'messages/', countKey: 'messages', desc: 'view contact form submissions' },
];

export default function AdminDashboard() {
  const { username } = useAuth();
  const [counts, setCounts] = useState({
    projects: null,
    skills: null,
    posts: null,
    achievements: null,
    education: null,
    messages: null,
  });

  useEffect(() => {
    Promise.allSettled([
      getProjects([]),
      getSkills([]),
      adminApi.listPosts(),
      getAchievements([]),
      getEducation([]),
      adminApi.listMessages(),
    ]).then(([proj, sk, posts, ach, edu, msg]) => {
      setCounts({
        projects: proj.status === 'fulfilled' && Array.isArray(proj.value) ? proj.value.length : 0,
        skills: sk.status === 'fulfilled' && Array.isArray(sk.value) ? sk.value.length : 0,
        posts: posts.status === 'fulfilled' && Array.isArray(posts.value) ? posts.value.length : 0,
        achievements: ach.status === 'fulfilled' && Array.isArray(ach.value) ? ach.value.length : 0,
        education: edu.status === 'fulfilled' && Array.isArray(edu.value) ? edu.value.length : 0,
        messages: msg.status === 'fulfilled' && Array.isArray(msg.value) ? msg.value.length : 0,
      });
    });
  }, []);

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
            <div className="flex items-center justify-between mb-1">
              <p className="font-mono-display font-bold text-accent">{c.label}</p>
              {counts[c.countKey] !== null && (
                <span className="font-mono-body text-[11px] text-faint border border-border px-2 py-0.5">
                  {counts[c.countKey]} {counts[c.countKey] === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
            <p className="text-muted text-[13px] font-light">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
