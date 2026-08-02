import FileSection from './FileSection';

export default function SkillsSection({ groups }) {
  return (
    <FileSection id="skills" path="skills.json" title="What I work with">
      <div className="font-mono-body text-[14px] leading-relaxed">
        <span className="text-faint">{'{'}</span>
        <div className="pl-4 sm:pl-6">
          {groups.map((g, i) => (
            <div key={g.group} className="py-2.5">
              <span className="text-accent">&quot;{g.label}&quot;</span>
              <span className="text-faint">: [</span>
              <div className="pl-4 sm:pl-6 flex flex-wrap gap-x-2.5 gap-y-1.5 py-1.5">
                {g.items.map((item, j) => (
                  <span
                    key={item}
                    className="text-muted font-light hover:text-accent transition-colors cursor-default"
                  >
                    &quot;{item}&quot;{j < g.items.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
              <span className="text-faint">]{i < groups.length - 1 ? ',' : ''}</span>
            </div>
          ))}
        </div>
        <span className="text-faint">{'}'}</span>
      </div>
    </FileSection>
  );
}
