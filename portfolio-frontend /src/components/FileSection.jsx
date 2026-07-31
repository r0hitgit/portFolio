import { motion } from 'framer-motion';

/**
 * Every content section is framed as a "file" being viewed — a path header,
 * then content indented like a code block. Ties directly to the sidebar's
 * file-tree navigation instead of a decorative numbered eyebrow.
 */
export default function FileSection({ id, path, title, children }) {
  return (
    <motion.section
      id={id}
      className="max-w-3xl px-6 sm:px-12 py-20 border-t border-border"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3 mb-1.5 font-mono-body text-[13px] text-faint">
        <span className="text-accent-dim">~/rohit-verma/</span>
        <span>{path}</span>
      </div>
      <h2 className="font-mono-display font-bold text-3xl sm:text-4xl tracking-tight mb-10">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
