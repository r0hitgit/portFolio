import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/client';

export default function Blog() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts([]).then(setPosts);
  }, []);

  return (
    <div className="max-w-3xl px-6 sm:px-12 py-20">
      <div className="font-mono-body text-xs text-faint mb-1">~/rohit-verma/</div>
      <h1 className="font-mono-display font-bold text-3xl mb-10">blog/</h1>

      {posts === null && <p className="text-muted text-sm font-mono-body">loading...</p>}
      {posts !== null && posts.length === 0 && (
        <p className="text-muted text-sm font-mono-body">
          [ EMPTY ] no posts published yet — check back soon.
        </p>
      )}

      <div className="space-y-0">
        {(posts || []).map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="focus-ring group block py-5 border-b border-border hover:border-accent-dim transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono-display font-bold text-base group-hover:text-accent transition-colors">
                {p.title}
              </h2>
              <span className="font-mono-body text-[11px] text-faint shrink-0">
                {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : ''}
              </span>
            </div>
            {p.excerpt && (
              <p className="text-[13px] text-muted font-light mt-1.5 leading-relaxed">{p.excerpt}</p>
            )}
          </Link>
        ))}
      </div>

      <Link
        to="/"
        className="focus-ring inline-block mt-10 font-mono-body text-[12px] text-faint hover:text-accent transition-colors"
      >
        ← back to ~/rohit-verma
      </Link>
    </div>
  );
}
