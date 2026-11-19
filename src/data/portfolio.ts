export interface StatMetric {
  id: string;
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface ProjectArchitectureNote {
  problem: string;
  solution: string;
  highlights: string[];
  stackRoles: {layer: string; technology: string}[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  techStack: string[];
  metrics: string[];
  liveUrl: string;
  githubUrl?: string;
  architecture: ProjectArchitectureNote;
}

export interface SkillGroup {
  id: string;
  category: string;
  iconKey: 'code' | 'layout' | 'server' | 'database' | 'cloud' | 'cpu';
  items: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  credentialCode?: string;
  domain: string;
}

export interface EducationItem {
  degree: string;
  specialization: string;
  institution: string;
  period: string;
  coursework: string[];
}

export const PROFILE = {
  name: 'Kundan Singh',
  headline: 'Full Stack Developer | Cloud & DevOps',
  pitch:
    'Builds fast, scalable web apps with React/Next.js, Node.js and Spring Boot, deployed on AWS and Azure.',
  location: 'Chandigarh, India · Open to Relocation & Remote',
  resumeUrl: '/resume.pdf',
  email: 'kundan55xi@gmail.com',
  phone: '+91 7727932990',
  phoneHref: 'tel:+917727932990',
  // Replace with your live GitHub & LinkedIn URLs before production deploy
  githubUrl: 'https://github.com/kundansingh',
  linkedinUrl: 'https://www.linkedin.com/in/kundansingh',
  heroImage: '/src/assets/images/hero_engineering_studio_1795083587836.jpg',
  heroImageAlt: 'Software engineering studio workstation with code architecture monitor',
  aboutParagraphs: [
    'Computer Science & Engineering (Cloud Computing) undergraduate at Chandigarh University with strong foundations in Data Structures, Algorithms, Object-Oriented Programming, and System Design.',
    'Experienced in building and shipping production full-stack applications using React, Next.js, Node.js, Express, and Spring Boot, backed by relational and document databases and deployed across AWS and Microsoft Azure using Docker, Kubernetes, and automated CI/CD pipelines.',
    'Focused on measurable engineering outcomes—cutting Largest Contentful Paint from 5s to under 1s, automating internal workflows to save staff hours, and sustaining 99.9% production uptime.',
  ],
};

export const STATS: StatMetric[] = [
  {
    id: 'bookings',
    target: 60,
    prefix: '+',
    suffix: '%',
    label: 'Online booking growth',
    context: 'Achieved within 2 months of launch',
  },
  {
    id: 'lcp',
    target: 1,
    prefix: '< ',
    suffix: 's',
    label: 'Largest Contentful Paint',
    context: 'Reduced from 5.0s baseline',
  },
  {
    id: 'uptime',
    target: 99.9,
    suffix: '%',
    label: 'Production uptime',
    context: 'Zero-downtime CI/CD releases',
  },
  {
    id: 'efficiency',
    target: 70,
    suffix: '%',
    label: 'Less manual processing',
    context: 'Saves ~10 staff hours weekly',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'rabtech-academy',
    role: 'Full Stack Developer',
    company: 'Rabtech Academy',
    location: 'Remote',
    period: 'Jun 2026 – Nov 2026',
    highlights: [
      'Built responsive layouts across mobile, tablet, and desktop using modern CSS, Grid, and Flexbox.',
      'Integrated RESTful APIs with asynchronous JavaScript (ES6+) to fetch live data and manage client state.',
      'Engineered a production-ready web application capstone and deployed it live via Vercel, Netlify, or GitHub Pages.',
      'Structured modular, reusable UI components and maintained clean Git workflows with cross-browser compatibility and accessibility checks.',
    ],
  },
  {
    id: 'rightway-auto',
    role: 'Full Stack Developer',
    company: 'Rightway Auto Delivery Ltd.',
    location: 'Remote',
    period: 'Oct 2025 – Apr 2026',
    highlights: [
      'Built and deployed a production Next.js and Tailwind CSS website with a custom scheduling system, increasing direct online bookings by 60% in two months.',
      'Optimized web architecture and technical SEO, reducing LCP from 5s to under 1s and driving 100+ new monthly organic clicks through top Google rankings.',
      'Engineered a React and Node.js admin dashboard over a relational database, cutting manual processing time by 70% (about 10 staff hours weekly).',
      'Automated CI/CD pipelines for zero-downtime deployments, sustaining 99.9% production uptime.',
    ],
  },
];

// Append new projects to this array to automatically render them in the Projects grid
export const PROJECTS: ProjectItem[] = [
  {
    id: 'rightway-auto-delivery',
    title: 'RightWay Auto Delivery',
    subtitle: 'Production Booking & Operations Platform',
    description:
      'Production e-commerce and delivery scheduling platform featuring a 99/100 Lighthouse score, sub-second Largest Contentful Paint, and a role-based admin dashboard for managing customer quotes and dispatch requests.',
    image: '/src/assets/images/project_rightway_auto_1795083589319.jpg',
    imageAlt: 'RightWay Auto Delivery web application and fleet scheduling dashboard on laptop display',
    techStack: ['Next.js', 'Tailwind CSS', 'React', 'Node.js', 'Relational DB', 'CI/CD'],
    metrics: ['99/100 Lighthouse', 'LCP 5s → <1s', '+60% Online Bookings'],
    // Replace with deployed RightWay Auto Delivery URL
    liveUrl: 'https://rightwayautodelivery.com',
    architecture: {
      problem:
        'Legacy pages suffered from 5s+ LCP, manual phone-based quote intake, and slow dispatch coordination costing ~10 staff hours every week.',
      solution:
        'Rebuilt the storefront with Next.js static/hybrid rendering, asset preloading, semantic schema markup, and a centralized Node.js + SQL operations console.',
      highlights: [
        'Custom multi-step quote & delivery slot scheduler persisted in a normalized relational schema.',
        'Bundle splitting, image optimization, and edge caching reduced LCP from 5s to under 1s (99/100 Lighthouse).',
        'Automated build-and-deploy pipeline ensuring zero-downtime releases and 99.9% availability.',
      ],
      stackRoles: [
        {layer: 'Frontend', technology: 'Next.js, Tailwind CSS, Semantic HTML'},
        {layer: 'Admin Console', technology: 'React, Node.js REST APIs'},
        {layer: 'Data & Ops', technology: 'Relational Database, Automated CI/CD'},
      ],
    },
  },
  {
    id: 'phoenix-compiler',
    title: 'Phoenix Compiler',
    subtitle: 'Multi-Language Sandboxed Online IDE',
    description:
      'Browser-based online IDE supporting 12+ programming languages inside isolated Docker execution environments, engineered for secure low-latency code evaluation and consistent global error handling.',
    image: '/src/assets/images/project_phoenix_compiler_1795083588884.jpg',
    imageAlt: 'Phoenix Compiler split-pane code editor and execution terminal interface',
    techStack: ['Spring Boot', 'Java', 'Maven', 'React', 'Docker', 'REST APIs'],
    metrics: ['12+ Languages', 'Isolated Containers', 'Low-Latency Execution'],
    // Replace with deployed Phoenix Compiler URL and GitHub repository URL
    liveUrl: 'https://phoenix-compiler.vercel.app',
    githubUrl: 'https://github.com/kundansingh/phoenix-compiler',
    architecture: {
      problem:
        'Executing untrusted user code across diverse compiler toolchains introduces security, resource-exhaustion, and inconsistent error-reporting risks.',
      solution:
        'Designed a Spring Boot orchestration backend that dispatches compilation requests into ephemeral, resource-capped Docker containers with deterministic timeouts.',
      highlights: [
        'Supports 12+ languages (Java, Python, C++, JavaScript, Go, and more) with standardized stdin/stdout capture.',
        'Container isolation with memory, CPU, and execution time limits prevents host interference.',
        'Centralized Spring Boot `@ControllerAdvice` global exception handler returns structured compiler vs. runtime diagnostics.',
      ],
      stackRoles: [
        {layer: 'Client IDE', technology: 'React, Responsive Split Terminal UI'},
        {layer: 'Orchestration API', technology: 'Java, Spring Boot, Maven'},
        {layer: 'Execution Sandbox', technology: 'Docker Isolated Containers'},
      ],
    },
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Languages',
    iconKey: 'code',
    items: ['Java', 'JavaScript (ES6+)', 'Python', 'SQL'],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    iconKey: 'layout',
    items: ['HTML5', 'CSS3', 'React', 'Next.js', 'Tailwind CSS', 'Shadcn UI'],
  },
  {
    id: 'backend',
    category: 'Backend',
    iconKey: 'server',
    items: [
      'Node.js',
      'Express.js',
      'Spring Boot',
      'REST APIs',
      'WebSockets',
      'JWT Authentication',
      'Bun',
    ],
  },
  {
    id: 'databases',
    category: 'Databases',
    iconKey: 'database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    id: 'cloud-devops',
    category: 'Cloud & DevOps',
    iconKey: 'cloud',
    items: [
      'AWS (EC2, S3)',
      'Azure',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'GitHub Actions',
      'CI/CD',
      'Linux',
    ],
  },
  {
    id: 'core-cs',
    category: 'Core CS & Practices',
    iconKey: 'cpu',
    items: ['DSA', 'OOP', 'System Design', 'Git', 'Agile', 'Scrum'],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'aws-aif-c01',
    title: 'AWS Certified AI Practitioner',
    credentialCode: 'AIF-C01',
    issuer: 'Amazon Web Services',
    domain: 'Cloud & Applied AI',
  },
  {
    id: 'azure-az-900',
    title: 'Microsoft Certified: Azure Fundamentals',
    credentialCode: 'AZ-900',
    issuer: 'Microsoft',
    domain: 'Cloud Infrastructure',
  },
  {
    id: 'oci-genai',
    title: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
    issuer: 'Oracle',
    domain: 'Cloud Architecture & GenAI',
  },
  {
    id: 'uiuc-cloud',
    title: 'Cloud Computing Concepts',
    issuer: 'University of Illinois',
    domain: 'Distributed Systems',
  },
  {
    id: 'fcc-python',
    title: 'Scientific Computing with Python',
    issuer: 'freeCodeCamp',
    domain: 'Python & Algorithms',
  },
];

export const EDUCATION: EducationItem = {
  degree: 'B.E. in Computer Science and Engineering',
  specialization: 'Cloud Computing',
  institution: 'Chandigarh University',
  period: 'Aug 2022 – May 2026',
  coursework: [
    'Data Structures & Algorithms',
    'System Design',
    'Operating Systems',
    'Database Management Systems',
    'Cloud Architecture & Virtualization',
    'Computer Networks',
  ],
};
