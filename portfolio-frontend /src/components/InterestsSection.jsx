import FileSection from './FileSection';

export default function InterestsSection({ interests, languages }) {
  return (
    <FileSection id="interests" path="interests.yml" title="Beyond code">
      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <p className="font-mono-body text-[12px] text-accent uppercase tracking-wider mb-5">interests:</p>
          <div className="space-y-4">
            {interests.map((it, i) => (
              <div key={i} className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <span className="text-lg leading-none mt-0.5">{it.emoji}</span>
                <div>
                  <p className="text-[14.5px] font-medium">{it.name}</p>
                  <p className="text-[13px] text-muted font-light">{it.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono-body text-[12px] text-accent uppercase tracking-wider mb-5">languages:</p>
          <div className="space-y-3">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center justify-between border-b border-border pb-3 hover:border-accent-dim transition-colors">
                <span className="text-[14.5px] font-medium">{l.name}</span>
                <span className="font-mono-body text-[11.5px] text-accent border border-accent-dim px-2.5 py-1">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FileSection>
  );
}
