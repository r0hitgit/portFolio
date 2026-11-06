import { motion } from 'framer-motion';
import FileSection from './FileSection';

// Detect if string contains an emoji (Unicode SMP or common BMP emoji ranges)
const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{203C}\u{2049}\u{2139}\u{2194}-\u{21AA}]/u;

function renderMilestoneIcon(item) {
  const iconRaw = (item.icon || '').trim();

  // If icon is a clean text badge (e.g. "MyA", "DSA", "AI", "CERT") without any emoji
  if (iconRaw && !EMOJI_REGEX.test(iconRaw) && iconRaw.length <= 5) {
    return (
      <span className="font-mono-display text-[12px] font-bold text-accent tracking-wider">
        {iconRaw}
      </span>
    );
  }

  const titleLower = (item.title || '').toLowerCase();
  const orgLower = (item.organization || '').toLowerCase();

  // Hackathons & Competitions -> Sleek Trophy SVG
  if (
    titleLower.includes('hackathon') ||
    titleLower.includes('aurix') ||
    titleLower.includes('dataverse') ||
    titleLower.includes('round') ||
    titleLower.includes('winner') ||
    titleLower.includes('rank')
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4 h-4 text-accent"
        aria-hidden="true"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    );
  }

  // DSA, LeetCode, Coding -> Sleek Code Brackets SVG
  if (
    titleLower.includes('leetcode') ||
    titleLower.includes('dsa') ||
    titleLower.includes('problem') ||
    titleLower.includes('algorithm') ||
    orgLower.includes('leetcode')
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4 h-4 text-accent"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  // Certifications & Exams -> Sleek Award Ribbon SVG
  if (
    titleLower.includes('cert') ||
    titleLower.includes('ncet') ||
    titleLower.includes('grade') ||
    titleLower.includes('course')
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4 h-4 text-accent"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }

  // Default terminal milestone star SVG
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-4 h-4 text-accent"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

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
            <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-accent-dim text-lg group-hover:border-accent group-hover:shadow-[0_0_16px_-4px_rgba(57,255,143,0.4)] transition-all bg-card/30">
              {renderMilestoneIcon(a)}
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
