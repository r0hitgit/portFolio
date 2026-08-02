import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../api/client';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    getPostBySlug(slug, null).then(setPost);
  }, [slug]);

  return (
    <div className="max-w-3xl px-6 sm:px-12 py-20">
      {post === undefined && <p className="text-muted text-sm font-mono-body">loading...</p>}
      {post === null && (
        <p className="text-amber text-sm font-mono-body">[ 404 ] post not found.</p>
      )}
      {post && (
        <article>
          <div className="font-mono-body text-xs text-faint mb-1">~/rohit-verma/blog/</div>
          <h1 className="font-mono-display font-bold text-3xl mb-2">{post.title}</h1>
          {post.publishedAt && (
            <p className="font-mono-body text-[11px] text-faint mb-10">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          )}
          <div className="prose-terminal text-[14px] text-muted font-light leading-relaxed space-y-4">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      )}

      <Link
        to="/blog"
        className="focus-ring inline-block mt-12 font-mono-body text-[12px] text-faint hover:text-accent transition-colors"
      >
        ← back to blog/
      </Link>
    </div>
  );
}
