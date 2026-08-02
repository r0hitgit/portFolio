import { motion } from 'framer-motion';
import FileSection from './FileSection';

export default function AchievementsSection({ items }) {
  return (
    <FileSection id="achievements" path="achievements.md" title="Milestones">
      <div className="space-y-7">
        {items.map((a, i) => (
          <motion.div
            key={a.id ?? i}
            className="flex gap-4 pb-7 border-b border-border last:border-b-0 last:pb-0 group"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-accent-dim text-lg group-hover:border-accent group-hover:shadow-[0_0_16px_-4px_rgba(57,255,143,0.4)] transition-all">
              {a.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-mono-display font-bold text-[16.5px]">
                  {a.link ? (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-accent hover:opacity-75 transition-opacity"
                    >
                      {a.title} ↗
                    </a>
                  ) : (
                    a.title
                  )}
                </h3>
                <span className="font-mono-body text-[12px] text-faint whitespace-nowrap">
                  {a.dateLabel}
                </span>
              </div>
              {a.organization && (
                <p className="font-mono-body text-[12px] text-faint mb-2">{a.organization}</p>
              )}
              <p className="text-[14px] text-muted font-light leading-relaxed">{a.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </FileSection>
  );
}
