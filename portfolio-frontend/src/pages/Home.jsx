import { useEffect, useState } from 'react';
import TerminalHero from '../components/TerminalHero';
import EducationSection from '../components/EducationSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import AchievementsSection from '../components/AchievementsSection';
import InterestsSection from '../components/InterestsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { getProjects, getAchievements, getEducation, getSkills, getResumeUrl, getCached } from '../api/client';
import {
  education as fallbackEducation,
  projects as fallbackProjects,
  achievements as fallbackAchievements,
  skills as fallbackSkills,
  interests,
  languages,
  contactLinks,
} from '../data/fallback';

const defaultResume = contactLinks.find((c) => c.key === 'resume')?.href || '';

export default function Home() {
  const [education, setEducation] = useState(() => getCached('education', fallbackEducation));
  const [projects, setProjects] = useState(() => getCached('projects', fallbackProjects));
  const [achievements, setAchievements] = useState(() => getCached('achievements', fallbackAchievements));
  const [skills, setSkills] = useState(() => getCached('skills', fallbackSkills));
  const [resumeUrl, setResumeUrl] = useState(() => getCached('resume', defaultResume));

  useEffect(() => {
    getEducation(fallbackEducation).then(setEducation);
    getProjects(fallbackProjects).then(setProjects);
    getAchievements(fallbackAchievements).then(setAchievements);
    getSkills(fallbackSkills).then(setSkills);
    getResumeUrl(defaultResume).then(setResumeUrl);

    if (window.location.hash) {
      const id = window.location.hash.replace(/^#/, '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
      }
    }
  }, []);

  return (
    <div className="crt-bg">
      <TerminalHero resumeUrl={resumeUrl} />
      <EducationSection items={education} />
      <ProjectsSection items={projects} />
      <SkillsSection groups={skills} />
      <AchievementsSection items={achievements} />
      <InterestsSection interests={interests} languages={languages} />
      <ContactSection />
      <Footer />
    </div>
  );
}
