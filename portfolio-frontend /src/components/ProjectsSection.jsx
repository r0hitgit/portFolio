import { motion } from 'framer-motion';
import FileSection from './FileSection';

function formatDate(d) {
  if (!d) return null;
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function ProjectsSection({ items }) {
  return (
    <FileSection id="projects" path="projects/" title="What I've built">
      <div className="space-y-12">
        {items.map((p, i) => (
          <motion.article
            key={p.id ?? i}
            className="relative pl-5 border-l border-border hover:border-accent transition-colors duration-300 group"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
              <h3 className="font-mono-display font-bold text-xl">
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group-hover:text-accent transition-colors"
                  >
                    {p.title} ↗
                  </a>
                ) : (
                  p.title
                )}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring ml-3 text-[12px] font-mono-body text-faint hover:text-accent align-middle"
                  >
                    [source]
                  </a>
                )}
              </h3>
              <span className="font-mono-body text-[12px] text-faint">{formatDate(p.projectDate)}</span>
            </div>

            <ul className="space-y-2.5 mb-5">
              {(p.bullets || []).map((b, j) => (
                <li key={j} className="text-[14.5px] text-muted font-light leading-relaxed flex gap-3">
                  <span className="text-accent shrink-0 font-mono-body">+</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {(p.techStack || []).map((t) => (
                <span
                  key={t}
                  className="font-mono-body text-[11.5px] px-2.5 py-1 border border-border text-faint tracking-wide hover:border-accent-dim hover:text-accent transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </FileSection>
  );
}
