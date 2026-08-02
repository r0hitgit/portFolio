import FileSection from './FileSection';

export default function EducationSection({ items }) {
  return (
    <FileSection id="education" path="education.log" title="Academic background">
      <div className="space-y-0">
        {items.map((e, i) => (
          <div
            key={e.id ?? i}
            className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-4 py-5 border-b border-border last:border-b-0 hover:pl-2 transition-all"
          >
            <div>
              <p className="text-[16px] font-medium">{e.institution}</p>
              <p className="text-[14px] text-muted font-light">
                {e.degree}
                {e.location ? ` · ${e.location}` : ''}
              </p>
            </div>
            <div className="text-right shrink-0 font-mono-body">
              {e.scoreLabel && <p className="text-accent text-[15px]">{e.scoreLabel}</p>}
              <p className="text-[12.5px] text-faint">
                {e.startLabel} – {e.endLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FileSection>
  );
}
