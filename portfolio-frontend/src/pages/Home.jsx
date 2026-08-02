import { useEffect, useState } from 'react';
import TerminalHero from '../components/TerminalHero';
import EducationSection from '../components/EducationSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import AchievementsSection from '../components/AchievementsSection';
import InterestsSection from '../components/InterestsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { getProjects, getAchievements, getEducation } from '../api/client';
import {
  education as fallbackEducation,
  projects as fallbackProjects,
  achievements as fallbackAchievements,
  skills,
  interests,
  languages,
} from '../data/fallback';

export default function Home() {
  const [education, setEducation] = useState(fallbackEducation);
  const [projects, setProjects] = useState(fallbackProjects);
  const [achievements, setAchievements] = useState(fallbackAchievements);

  useEffect(() => {
    getEducation(fallbackEducation).then(setEducation);
    getProjects(fallbackProjects).then(setProjects);
    getAchievements(fallbackAchievements).then(setAchievements);
  }, []);

  return (
    <div className="crt-bg">
      <TerminalHero />
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
