export const personalInfo = {
  name: "Rishi Gurjar",
  title: "Full Stack Developer & SDE",
  tagline: "Building scalable solutions with clean code",
  bio: "A passionate Computer Science student with a strong foundation in full-stack web development and problem solving. I love turning complex problems into elegant, efficient solutions. Currently focused on building production-ready applications and mastering the art of software engineering.",
  email: "rishigurjar248@gmail.com",
  location: "India",
  github: "https://github.com/rishigurjar248",
  linkedin: "https://www.linkedin.com/in/rishi-gurjar-536634377/",
  leetcode: "https://leetcode.com/u/its_Gurjar/",
  twitter: "https://twitter.com/rishigurjar_dev",
  resume: "/resume.pdf",
  avatar: null,
};

export const typingStrings = [
  "Full Stack Developer",
  "React & Node.js Expert",
  "DSA Problem Solver",
  "Open Source Contributor",
  "Software Engineer",
  "UI/UX Enthusiast",
];

export const aboutStats = [
  { label: "Problems Solved", value: 500, suffix: "+" },
  { label: "Projects Built", value: 20, suffix: "+" },
  { label: "Technologies Explored", value: 15, suffix: "+" },
  { label: "Cups of Coffee", value: 1200, suffix: "+" },
];

export const skills = {
  frontend: [
    { name: "React.js", level: 92, icon: "⚛️" },
    { name: "Next.js", level: 85, icon: "▲" },
    { name: "TypeScript", level: 88, icon: "📘" },
    { name: "Tailwind CSS", level: 90, icon: "🎨" },
    { name: "JavaScript", level: 94, icon: "🟨" },
    { name: "HTML/CSS", level: 95, icon: "🌐" },
    { name: "Framer Motion", level: 75, icon: "✨" },
    { name: "Redux", level: 78, icon: "🔄" },
  ],
  backend: [
    { name: "Node.js", level: 88, icon: "🟢" },
    { name: "Express.js", level: 85, icon: "⚡" },
    { name: "Python", level: 78, icon: "🐍" },
    { name: "REST APIs", level: 90, icon: "🔗" },
    { name: "GraphQL", level: 70, icon: "◈" },
    { name: "WebSockets", level: 72, icon: "🔌" },
  ],
  databases: [
    { name: "PostgreSQL", level: 82, icon: "🐘" },
    { name: "MongoDB", level: 80, icon: "🍃" },
    { name: "Redis", level: 70, icon: "⚡" },
    { name: "MySQL", level: 78, icon: "💾" },
  ],
  tools: [
    { name: "Git & GitHub", level: 90, icon: "🔀" },
    { name: "Docker", level: 72, icon: "🐳" },
    { name: "Linux", level: 78, icon: "🐧" },
    { name: "VS Code", level: 95, icon: "💻" },
    { name: "Postman", level: 88, icon: "📬" },
    { name: "Figma", level: 68, icon: "🎭" },
  ],
  dsa: [
    { name: "Arrays & Strings", level: 92, icon: "📊" },
    { name: "Trees & Graphs", level: 85, icon: "🌳" },
    { name: "Dynamic Programming", level: 80, icon: "🧩" },
    { name: "Sorting & Searching", level: 90, icon: "🔍" },
    { name: "Linked Lists", level: 88, icon: "🔗" },
    { name: "Bit Manipulation", level: 75, icon: "⚙️" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "DevConnect",
    description:
      "A full-stack social platform for developers to connect, share projects, and collaborate. Features real-time messaging, code snippet sharing, and project discovery.",
    image: null,
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Redis", "JWT"],
    category: ["React", "Node.js", "MongoDB"],
    liveLink: "https://devconnect.demo.com",
    githubLink: "https://github.com/rishigurjar/devconnect",
    featured: true,
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "CodeQuest",
    description:
      "An interactive coding challenge platform with real-time code execution, leaderboards, and AI-powered hints. Built for competitive programmers to level up their skills.",
    image: null,
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "WebSocket"],
    category: ["Next.js", "TypeScript", "PostgreSQL"],
    liveLink: "https://codequest.demo.com",
    githubLink: "https://github.com/rishigurjar/codequest",
    featured: true,
    color: "from-green-500/20 to-teal-500/20",
  },
  {
    id: 3,
    title: "ShopStream",
    description:
      "A modern e-commerce platform with seamless UX, real-time inventory management, payment integration, and an AI-powered product recommendation engine.",
    image: null,
    techStack: ["React", "Redux", "Node.js", "MongoDB", "Stripe"],
    category: ["React", "Node.js", "MongoDB"],
    liveLink: "https://shopstream.demo.com",
    githubLink: "https://github.com/rishigurjar/shopstream",
    featured: false,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 4,
    title: "WeatherPulse",
    description:
      "A beautiful weather dashboard with real-time data, 7-day forecasts, interactive maps, and AI-powered weather anomaly detection for multiple locations.",
    image: null,
    techStack: ["React", "TypeScript", "OpenWeather API", "Recharts"],
    category: ["React", "TypeScript"],
    liveLink: "https://weatherpulse.demo.com",
    githubLink: "https://github.com/rishigurjar/weatherpulse",
    featured: false,
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 5,
    title: "TaskFlow",
    description:
      "A powerful project management tool inspired by Notion and Linear. Features kanban boards, time tracking, team collaboration, and smart task prioritization.",
    image: null,
    techStack: ["Next.js", "PostgreSQL", "Prisma", "TypeScript", "Tailwind"],
    category: ["Next.js", "TypeScript", "PostgreSQL"],
    liveLink: "https://taskflow.demo.com",
    githubLink: "https://github.com/rishigurjar/taskflow",
    featured: true,
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 6,
    title: "AIStudy",
    description:
      "An AI-powered study assistant that generates personalized quizzes, flashcards, and study plans. Integrates with GPT-4 to provide intelligent explanations.",
    image: null,
    techStack: ["React", "Python", "FastAPI", "OpenAI", "PostgreSQL"],
    category: ["React", "Python"],
    liveLink: "https://aistudy.demo.com",
    githubLink: "https://github.com/rishigurjar/aistudy",
    featured: false,
    color: "from-pink-500/20 to-rose-500/20",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Smart India Hackathon 2024",
    organization: "Government of India",
    date: "Dec 2024",
    type: "hackathon",
    description:
      "Finalist in the world's largest hackathon. Built an AI-powered disaster response coordination system that was selected among top 5 solutions nationally.",
    icon: "🏆",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 2,
    title: "LeetCode Top 5%",
    organization: "LeetCode",
    date: "2024",
    type: "competitive",
    description:
      "Achieved top 5% ranking on LeetCode with 500+ problems solved across all difficulty levels. Max rating: 1800+.",
    icon: "⚡",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: 3,
    title: "CodeChef 4-Star Coder",
    organization: "CodeChef",
    date: "2024",
    type: "competitive",
    description:
      "Earned 4-star rating on CodeChef through consistent participation in competitive programming contests and division upgrades.",
    icon: "⭐",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    title: "HackFest Winner",
    organization: "NIT Hackathon",
    date: "Sep 2024",
    type: "hackathon",
    description:
      "1st place winner at HackFest 2024. Built a decentralized voting system using blockchain technology in 24 hours.",
    icon: "🥇",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 5,
    title: "Google Kick Start",
    organization: "Google",
    date: "2023",
    type: "competitive",
    description:
      "Participated in Google Kick Start 2023, achieving top 15% ranking globally in the competitive programming challenge.",
    icon: "🌐",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 6,
    title: "Open Source Contributor",
    organization: "GitHub",
    date: "2023-Present",
    type: "contribution",
    description:
      "Active contributor to multiple open source projects with 50+ merged pull requests. Maintainer of a developer tools library with 200+ stars.",
    icon: "🔓",
    color: "from-purple-500 to-violet-600",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology",
    field: "Electronics & Communication Engineering",
    institution: "Indian Institute of Information Technology Nagpur",
    period: "2023 – 2027",
    grade: "8.82 CGPA",
    description:
      "Specializing in algorithms, data structures, system design, and full-stack development. Active member of the coding club and tech fest organizing committee.",
    icon: "🎓",
  },
];

export const codingStats = {
  leetcode: {
    totalSolved: 520,
    easy: 180,
    medium: 270,
    hard: 70,
    rating: 1847,
    streak: 45,
  },
  github: {
    repositories: 42,
    stars: 380,
    followers: 120,
    contributions: 847,
  },
  codeforces: {
    rating: 1650,
    rank: "Expert",
    solved: 300,
  },
};

export const blogPosts = [
  {
    id: 1,
    title: "Mastering React Performance: Techniques You Should Know",
    excerpt:
      "Dive deep into React's internals — useMemo, useCallback, code splitting, and the virtual DOM reconciliation algorithm that makes React fast.",
    date: "Mar 15, 2026",
    readTime: "8 min",
    tags: ["React", "Performance", "JavaScript"],
    link: "#",
    emoji: "⚛️",
  },
  {
    id: 2,
    title: "System Design Simplified: A Fresher's Guide",
    excerpt:
      "Breaking down complex system design concepts into digestible chunks. Load balancers, caching strategies, databases, and more — explained simply.",
    date: "Feb 28, 2026",
    readTime: "12 min",
    tags: ["System Design", "Backend", "Architecture"],
    link: "#",
    emoji: "🏗️",
  },
  {
    id: 3,
    title: "Dynamic Programming: From Zero to Hero",
    excerpt:
      "A comprehensive guide to DP patterns that will help you crack coding interviews. Includes 20+ problems with intuitive explanations.",
    date: "Feb 10, 2026",
    readTime: "15 min",
    tags: ["DSA", "Algorithms", "Competitive Programming"],
    link: "#",
    emoji: "🧩",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Stats", href: "#stats" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const projectFilters = [
  "All",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Python",
];
