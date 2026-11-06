// Static fallback content, mirrored from the resume, used whenever the
// backend API isn't reachable (e.g. local dev without the backend running).

export const education = [
  {
    id: 1,
    institution: 'Noida Institute of Engineering and Technology (NIET)',
    degree: 'B.Tech — Computer Science & Engineering (AI & ML)',
    location: 'Greater Noida',
    scoreLabel: '7.7 CGPA',
    startLabel: 'Oct 2023',
    endLabel: 'May 2027',
  },
  {
    id: 2,
    institution: 'Saraswati Shishu Mandir Sr Sec School',
    degree: 'CBSE Class XII (AISSCE)',
    location: 'Gorakhpur',
    scoreLabel: '',
    startLabel: '2021',
    endLabel: '2022',
  },
  {
    id: 3,
    institution: 'Saraswati Shishu Mandir Sr Sec School',
    degree: 'CBSE Class X (CCE)',
    location: 'Gorakhpur',
    scoreLabel: '',
    startLabel: '2019',
    endLabel: '2020',
  },
];

export const projects = [
  {
    id: 1,
    slug: 'nexhire',
    title: 'NexHire',
    projectDate: '2026-03-01',
    liveUrl: 'https://nexhire.me',
    repoUrl: 'https://github.com/r0hitgit/NexHire',
    bullets: [
      'Built and deployed a full-stack job portal at nexhire.me — Spring Boot REST API on Render, React/Vite frontend on Netlify, backed by Aiven-hosted MySQL.',
      'JWT authentication with Spring Security: OTP email verification, forgot/reset password flow, async mail delivery via Brevo API to eliminate registration timeouts.',
      'Resolved production challenges including CORS, SSL errors, and Dockerfile setup for containerised deployment. Integrated UptimeRobot for 99%+ uptime on free tier.',
      'Layered architecture (Controller → Service → Repository) with Spring Data JPA, role-based endpoint security using @PreAuthorize and custom authority mapping.',
    ],
    techStack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'React', 'Vite', 'MySQL', 'Render', 'Netlify', 'Docker'],
  },
  {
    id: 2,
    slug: 'genericmeds-ai',
    title: 'GenericMeds AI',
    projectDate: '2026-04-01',
    liveUrl: 'https://genericmeds-ai.vercel.app',
    repoUrl: 'https://github.com/r0hitgit/genericmeds-ai',
    bullets: [
      'Built and deployed an open-source platform for verified generic medicine discovery and price transparency at genericmeds-ai.vercel.app.',
      'Matches branded prescriptions to verified PMBI generic alternatives by active pharmaceutical ingredients (APIs), strength, and release type, benchmarked against PMBI & NPPA ceiling rates.',
      'Indexes 10,000+ PMBJP Kendras across India with distance-based locator tools, plus a bilingual (English/Hindi) assistant powered by Google Gemini 1.5 Flash with clinical guardrails.',
      'Architected serverless SQLite on Vercel via a FastAPI cold-start routine cloning into ephemeral /tmp partition, achieving sub-100ms queries without hosted DB costs; compliant with India\'s DPDP Act 2023.',
    ],
    techStack: ['React', 'Vite', 'Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Gemini API', 'Vercel'],
  },
];

export const skills = [
  { group: 'languages', label: 'languages', items: ['Java', 'Python', 'JavaScript', 'C/C++'] },
  { group: 'frameworks', label: 'frameworks_libraries', items: ['Spring Boot', 'Spring Security', 'FastAPI', 'React', 'Vite', 'Tailwind CSS', 'REST API'] },
  { group: 'databases', label: 'databases', items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB'] },
  { group: 'tools', label: 'developer_tools', items: ['VS Code', 'IntelliJ IDEA', 'Eclipse', 'Postman', 'Git', 'GitHub', 'Docker'] },
  { group: 'cloud', label: 'cloud_devops', items: ['Render', 'Netlify', 'Vercel', 'Neon'] },
];

export const achievements = [
  {
    id: 1,
    title: 'AI Hackathon — AURIX 2026',
    organization: 'IILM University, Greater Noida',
    description: 'Qualified for Round 2 (Rank 2 among the Top 15 teams) in the Software Track of a national-level AI hackathon.',
    dateLabel: 'Oct 2024',
    icon: '',
    link: '',
  },
  {
    id: 2,
    title: 'Dataverse Hackathon — Pre-Final Round',
    organization: 'NSUT, Delhi',
    description: 'Selected for the pre-final round of Dataverse Hackathon hosted at NSUT (Netaji Subhas University of Technology), Delhi — competing among multiple teams from various colleges.',
    dateLabel: 'Sep 2024',
    icon: '',
    link: 'https://drive.google.com/file/d/13S8eRMwndC9JlS7f89BdDJFvArALAm1x/view',
  },
  {
    id: 3,
    title: 'NCET Plus SDE (Java) Certification — Grade O (Outstanding)',
    organization: 'MyAnatomy',
    description: 'Secured 88.44% (Grade O - Outstanding) in the SDE (Java) - NIET College certification program by MyAnatomy, covering Java programming, OOP, data structures, algorithms, and software engineering best practices.',
    dateLabel: 'Aug 2024',
    icon: 'MyA',
    link: '',
  },
  {
    id: 4,
    title: 'LeetCode — 250+ DSA Problems Solved',
    organization: 'leetcode.com/u/lifeaura',
    description: 'Solved 250+ problems spanning arrays, strings, searching, sorting and linkedlist algorithms across Easy and Medium difficulty levels.',
    dateLabel: 'Ongoing',
    icon: '',
    link: 'https://leetcode.com/u/lifeaura/',
  },
];

export const interests = [
  { tag: 'FIT', name: 'Fitness & Gym', sub: 'Dedicated gym-goer — consistency, discipline, progressive overload' },
  { tag: 'DEV', name: 'Full-Stack Web Dev (Java)', sub: 'Building end-to-end apps with Spring Boot & React' },
  { tag: 'DSA', name: 'Problem Solving', sub: 'DSA grinding on LeetCode — algorithms & data structures' },
  { tag: 'AI', name: 'AI & Machine Learning', sub: 'Exploring ML through B.Tech specialisation in AI & ML' },
  { tag: 'HACK', name: 'Hackathons & Competitions', sub: 'Thrives in competitive problem-solving under time pressure' },
];

export const languages = [
  { name: 'English', level: 'proficient' },
  { name: 'Hindi', level: 'native' },
  { name: 'German', level: 'intermediate' },
];

export const contactLinks = [
  { label: '+91 74600 58606', href: 'tel:+917460058606', key: 'phone' },
  { label: 'r0hiitverma1095@gmail.com', href: 'mailto:r0hiitverma1095@gmail.com', key: 'mail' },
  { label: 'linkedin.com/in/r0hitin', href: 'https://linkedin.com/in/r0hitin', key: 'linkedin' },
  { label: 'github.com/r0hitgit', href: 'https://github.com/r0hitgit', key: 'github' },
  { label: 'resume.pdf', href: 'https://drive.google.com/file/d/12cmWu28HCIjOfpUJ3lKyZJnWudCkVLPW/view?usp=sharing', key: 'resume' },
  { label: 'nexhire.me', href: 'https://nexhire.me', key: 'site' },
];
