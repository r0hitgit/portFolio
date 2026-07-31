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
    scoreLabel: '72.4%',
    startLabel: '2021',
    endLabel: '2022',
  },
  {
    id: 3,
    institution: 'Saraswati Shishu Mandir Sr Sec School',
    degree: 'CBSE Class X (CCE)',
    location: 'Gorakhpur',
    scoreLabel: '82.4%',
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
    slug: 'transaction-management-gui',
    title: 'Transaction Management GUI',
    projectDate: '2025-01-01',
    bullets: [
      'Designed a banking transaction system in Java simulating core account operations: create account, deposit, withdraw, and balance inquiry.',
      'Built an interactive GUI using JavaFX applying OOP principles — inheritance used to model different account types (savings, current).',
      'Fixed account-listing display bugs and ensured proper state management across multiple UI scenes.',
    ],
    techStack: ['Java', 'JavaFX', 'Eclipse IDE', 'OOP'],
  },
];

export const skills = [
  { group: 'languages', label: 'languages', items: ['Java', 'Python', 'JavaScript', 'C/C++'] },
  { group: 'frameworks', label: 'frameworks_libraries', items: ['Spring Boot', 'Spring Security', 'React', 'Vite', 'Tailwind CSS', 'REST API'] },
  { group: 'databases', label: 'databases', items: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { group: 'tools', label: 'developer_tools', items: ['VS Code', 'IntelliJ IDEA', 'Eclipse', 'Postman', 'Git', 'GitHub', 'Docker'] },
  { group: 'cloud', label: 'cloud_devops', items: ['Render', 'Netlify', 'Vercel', 'Neon'] },
];

export const achievements = [
  {
    id: 1,
    title: 'Dataverse Hackathon — Pre-Final Round',
    organization: 'NSUT, Delhi',
    description: 'Selected for the pre-final round of Dataverse Hackathon hosted at NSUT (Netaji Subhas University of Technology), Delhi — competing among multiple teams from various colleges.',
    dateLabel: 'Sep 2024',
    icon: '🏆',
    link: 'https://drive.google.com/file/d/13S8eRMwndC9JlS7f89BdDJFvArALAm1x/view',
  },
  {
    id: 2,
    title: 'LeetCode — 120+ DSA Problems Solved',
    organization: 'leetcode.com/u/lifeaura',
    description: 'Solved 120+ problems spanning arrays, strings, searching and sorting algorithms across Easy and Medium difficulty levels.',
    dateLabel: 'Ongoing',
    icon: '⚡',
    link: 'https://leetcode.com/u/lifeaura/',
  },
];

export const interests = [
  { emoji: '🏋️', name: 'Fitness & Gym', sub: 'Dedicated gym-goer — consistency, discipline, progressive overload' },
  { emoji: '☕', name: 'Full-Stack Web Dev (Java)', sub: 'Building end-to-end apps with Spring Boot & React' },
  { emoji: '🧩', name: 'Problem Solving', sub: 'DSA grinding on LeetCode — algorithms & data structures' },
  { emoji: '🤖', name: 'AI & Machine Learning', sub: 'Exploring ML through B.Tech specialisation in AI & ML' },
  { emoji: '🚀', name: 'Hackathons & Competitions', sub: 'Thrives in competitive problem-solving under time pressure' },
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
  { label: 'nexhire.me', href: 'https://nexhire.me', key: 'site' },
];
