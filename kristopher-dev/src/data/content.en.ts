/**
 * English mirror of content.ts. Same shape, same keys — only the copy
 * changes. Keep both files in sync when you edit content.
 */

import type {
  BentoCard,
  Slide,
  Level,
  Tech,
  Intent,
  Cert,
} from "./content";

export const profile = {
  name: "Kristopher Astudillo",
  fullName: "Kristopher André Astudillo Durán",
  role: "Full Stack Developer",
  altRole: "Systems Analyst",
  location: "Santiago, Chile",
  email: "kristopherastudillo@gmail.com",
  phone: "+56 9 5090 2425",
  phoneHref: "+56950902425",
  linkedin:
    "https://www.linkedin.com/in/kristopher-astudillo-dur%C3%A1n-b69083312/",
  github: "https://github.com/KrisAndre-25",
  photo: "kristopher.jpg",
  cv: "cv/CV-Kristopher-Astudillo.pdf",
  cvName: "CV-Kristopher-Astudillo.pdf",
  whatsapp: "56950902425",
  intro:
    "My focus is the frontend: I build fast, accessible interfaces with a polished user experience, in React and TypeScript. I come from automated QA, so I think about edge cases and maintainability before writing the first line. Clean, scalable, reusable code, built under Scrum and Kanban.",
  availability: "Available for new projects",
};

/* ── Pre-filled messages ───────────────────────────────── */

export const whatsappMessage =
  "Hi Kristopher, I saw your portfolio and I'd like to talk about a job opportunity.";

export const mailSubject = "Job opportunity — Full Stack Developer";

export const mailBody =
  "Hi Kristopher,\n\nI saw your portfolio and I'd like to talk about an opportunity.\n\nBest,";

export const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  whatsappMessage
)}`;

export const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
  mailSubject
)}&body=${encodeURIComponent(mailBody)}`;

export const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(profile.email)}` +
  `&su=${encodeURIComponent(mailSubject)}` +
  `&body=${encodeURIComponent(mailBody)}`;

/* ── Navigation ───────────────────────────────────────── */
export const navLinks = [
  { id: "perfil", label: "Profile" },
  { id: "proyecto", label: "Project" },
  { id: "codigo", label: "Code" },
  { id: "experiencia", label: "Experience" },
  { id: "certificaciones", label: "Certificates" },
  { id: "stack", label: "Stack" },
  { id: "contacto", label: "Contact" },
];

/* ── Hero metrics ─────────────────────────────────────── */
export const heroStats = [
  { value: "100%", label: "E2E suite implemented" },
  { value: "13+", label: "REST endpoints integrated" },
  { value: "30+", label: "automated test cases" },
];

/* ── Bento Grid ───────────────────────────────────────── */
export const bento: BentoCard[] = [
  {
    id: "quien",
    span: "wide",
    kind: "text",
    eyebrow: "Who I am",
    title: "Full Stack with a QA mindset",
    body: "I combine Full Stack development with a rigorous Quality Assurance (QA) mindset. My approach doesn't just aim to write functional code with React, Java, and Spring Boot — it also anticipates failure scenarios, ensures solid test coverage, and optimizes performance before every deploy.",
  },
  {
    id: "cobertura",
    span: "normal",
    kind: "metric",
    eyebrow: "Speaknosis",
    title: "E2E coverage",
    metric: "100%",
    metricNote: "of the application's suite, including client-facing flows",
  },
  {
    id: "flaky",
    span: "normal",
    kind: "metric",
    eyebrow: "Stability",
    title: "Flaky tests removed",
    metric: "15+",
    metricNote: "with dynamic assertions and data mocking",
  },
  {
    id: "formacion",
    span: "normal",
    kind: "list",
    eyebrow: "Education",
    title: "DuocUC",
    items: [
      "Systems Analyst — Full Stack Developer (graduated)",
      "B.Eng. in Computer Science, Software Development track (in progress)",
    ],
  },
  {
    id: "certs",
    span: "normal",
    kind: "list",
    eyebrow: "Certifications",
    title: "Continuous learning",
    items: [
      "AI in Practice Immersion — Daxus Latam, 8 h",
      "Angular Basics — Simplilearn, 2026",
      "Intensive HTML & CSS: the road to React — Udemy, 23 h",
    ],
  },
  {
    id: "disponible",
    span: "wide",
    kind: "status",
    eyebrow: "Availability",
    title: "Open to opportunities",
    body: "Immediate start. I work remote, hybrid, or on-site from Santiago, Chile.",
  },
];

/* ── Featured project ─────────────────────────────────── */
export const project = {
  name: "StudyMatch",
  kind: "Capstone project",
  tagline: "Peer-to-peer study platform",
  summary:
    "A web platform that connects students to set up study sessions and peer tutoring, matching by course, availability, and study style. Built with a two-person team: I built the entire frontend and actively contributed to the backend.",
  isPrivate: true,
  privateNote:
    "The repository stays private. I can walk through the code and a live demo in a technical interview.",
  stack: [
    "React",
    "TypeScript",
    "Vite",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Docker",
    "Terraform",
    "Playwright",
  ],
  metrics: [
    { value: "13+", label: "REST endpoints integrated" },
    { value: "20+", label: "features and bugs shipped" },
    { value: "2", label: "people on the team" },
  ],
  architecture: [
    {
      layer: "Frontend",
      detail:
        "React SPA with TypeScript on Vite. Typed components, client-side routing, and state managed with hooks. I built this entire layer.",
    },
    {
      layer: "Backend",
      detail:
        "REST API in Java with Spring Boot: sessions, applications, ratings, reports, chat, and moderation. JWT authentication.",
    },
    {
      layer: "Data",
      detail:
        "PostgreSQL as the relational engine, with the data model designed to support matching between students.",
    },
    {
      layer: "Infrastructure",
      detail:
        "Infrastructure defined with Terraform as Infrastructure as Code (IaC). The environment ran on AWS through a DuocUC academic lab (AWS Academy), for educational and experimentation purposes. Containers were built with Docker.",
    },
    {
      layer: "Quality",
      detail:
        "End-to-end functional tests with Playwright under a BDD approach, covering the platform's critical flows.",
    },
  ],
  challenges: [
    {
      title: "Matching without empty results",
      detail:
        "The algorithm had to return useful matches even with few registered users. I adjusted the criteria to progressively relax filters instead of returning an empty list.",
    },
    {
      title: "Consistent state across views",
      detail:
        "Applications, notifications, and counters touched several screens. I centralized the logic so a change reflected across the whole interface without a reload.",
    },
    {
      title: "Stable E2E tests",
      detail:
        "The first tests failed intermittently. I replaced fixed waits with dynamic assertions on the app's real state.",
    },
  ],
  learnings: [
    "Defining infrastructure as code changes the conversation: you stop hand-configuring servers and start versioning the environment.",
    "A well-scoped backend saves frontend work. API decisions are felt on every screen.",
    "Writing tests while you build is cheaper than writing them after, and it catches design mistakes early.",
  ],
  howIBuiltIt:
    "I built the entire frontend in React and TypeScript on top of Vite, consuming a Java REST API with Spring Boot (JWT auth) exposing 13+ endpoints. The data model lives in PostgreSQL, designed specifically for matching students. Infrastructure was defined as code with Terraform on an AWS Academy lab, Docker for containers, and I validated the critical flows with a Playwright E2E suite under a BDD approach.",
};

/* ── Carousel ─────────────────────────────────────────── */
export const slides: Slide[] = [
  {
    id: "s-speaknosis",
    eyebrow: "Professional experience",
    title: "Test automation in digital health",
    body: "At Speaknosis Chile I implemented 100% of the application's E2E suite, including client-facing flows: 30+ cases covering auth, patients, reports, and notifications.",
    meta: "March — May 2026",
    tags: ["Playwright", "JavaScript", "Git Flow"],
  },
  {
    id: "s-studymatch",
    eyebrow: "Capstone project",
    title: "StudyMatch, end to end",
    body: "Full frontend in React and TypeScript, backend in Spring Boot with 13+ REST endpoints, and infrastructure defined with Terraform on an AWS Academy academic lab.",
    meta: "2026",
    tags: ["React", "Spring Boot", "Terraform"],
  },
  {
    id: "s-angular",
    eyebrow: "Certification",
    title: "Angular Basics",
    body: "Certified in Angular fundamentals. Currently building my own project with the framework to put the theory into practice.",
    meta: "Simplilearn · 2026",
    tags: ["Angular", "TypeScript"],
  },
  {
    id: "s-udemy",
    eyebrow: "Certification",
    title: "Intensive HTML & CSS",
    body: "23 hours of layout and styling fundamentals as a foundation toward React. That plain-CSS discipline shows in this very portfolio: no styling framework.",
    meta: "Udemy · 2026",
    tags: ["HTML", "CSS"],
  },
  {
    id: "s-titulo",
    eyebrow: "Education",
    title: "Systems Analyst — Full Stack Developer",
    body: "Graduated from DuocUC. Continuing with a B.Eng. in Computer Science, Software Development track.",
    meta: "DuocUC · 2024 — 2026",
    tags: ["Java", "Databases", "Software engineering"],
  },
];

/* ── Experience ───────────────────────────────────────── */
export const experience = [
  {
    role: "Intern — QA Automation & Software Development",
    org: "Speaknosis Chile SpA",
    period: "March — May 2026",
    context:
      "Digital health platform that documents medical consultations with AI support.",
    points: [
      "Implemented 100% of the application's E2E test suite, including client-facing flows.",
      "30+ test cases covering authentication, patients, reports, and notifications.",
      "Identified and removed 15+ flaky tests with dynamic assertions and data mocking.",
      "Documented the testing architecture and coordinated the repository handoff with the Team Leader.",
    ],
    tools: ["Playwright", "JavaScript", "Git Flow", "Jira"],
    impact: [
      { label: "E2E suite coverage", value: 100, suffix: "%" },
      { label: "Test cases built", value: 30, suffix: "+" },
      { label: "Flaky tests removed", value: 15, suffix: "+" },
    ],
    howIBuiltIt:
      "I built the full E2E suite with Playwright and JavaScript, covering authentication, patients, reports, and notifications. The first tests were flaky, so I replaced fixed waits with dynamic assertions and data mocking, removing 15+ flaky tests. I worked under Git Flow and documented the testing architecture for the repository handoff.",
  },
];

/* ── Tech stack ───────────────────────────────────────── */
export const levelLabel: Record<Level, string> = {
  solido: "Solid",
  practico: "Working",
  aprendiendo: "Learning",
};

export const stackGroups: { group: string; items: Tech[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "React", level: "solido", note: "Hooks, routing, and SPAs. Built the entire StudyMatch frontend." },
      { name: "TypeScript", level: "solido", note: "Strict typing across every project, including this portfolio." },
      { name: "JavaScript", level: "solido", note: "ES6+. The base of the test suite I wrote at Speaknosis." },
      { name: "CSS", level: "solido", note: "Grid, Flexbox, and responsive design without frameworks." },
      { name: "Angular", level: "aprendiendo", note: "Certified in the fundamentals, building a project of my own." },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Java", level: "solido", note: "Main backend language throughout my studies." },
      { name: "Spring Boot", level: "solido", note: "REST APIs, business logic, and JWT authentication." },
      { name: "Node.js", level: "practico", note: "Express and REST services." },
      { name: "Kotlin", level: "practico", note: "Mobile app development." },
    ],
  },
  {
    group: "Data",
    items: [
      { name: "PostgreSQL", level: "solido", note: "StudyMatch's relational engine." },
      { name: "MySQL", level: "solido", note: "Modeling and queries across three database courses." },
      { name: "MongoDB", level: "practico", note: "Document model, collections, and queries." },
      { name: "MariaDB", level: "practico", note: "Local development environments." },
    ],
  },
  {
    group: "Quality & infrastructure",
    items: [
      { name: "Playwright", level: "solido", note: "Full E2E suite on a real product. My specialty." },
      { name: "Docker", level: "practico", note: "Containers for development and deployment." },
      { name: "Terraform", level: "practico", note: "Infrastructure as code, applied on StudyMatch." },
      { name: "AWS Academy", level: "practico", note: "DuocUC academic lab for experimenting with the cloud." },
      { name: "JUnit 5", level: "practico", note: "Unit testing on the Java backend." },
    ],
  },
];

/* ── Assistant ────────────────────────────────────────── */
export const intents: Intent[] = [
  {
    id: "saludo",
    keys: ["hola", "holi", "buenas", "hey", "ey", "que tal", "como estas", "hello", "hi", "hey there"],
    question: "Hi",
    answer:
      "Hi! I'm Kristopher's portfolio assistant. I can tell you about his stack, his experience, his projects, or how to reach him. What are you curious about?",
  },
  {
    id: "gracias",
    keys: ["thanks", "thank you", "great", "perfect", "awesome", "nice"],
    question: "Thanks",
    answer:
      "You're welcome! Feel free to keep exploring — ask me about his projects, his stack, or how to reach him directly.",
  },
  {
    id: "despedida",
    keys: ["bye", "goodbye", "see you", "later"],
    question: "Bye",
    answer:
      "See you! If you want to write him directly: kristopherastudillo@gmail.com or WhatsApp at +56 9 5090 2425.",
  },
  {
    id: "quien",
    keys: ["who are you", "tell me about yourself", "about you", "about him", "who is he", "introduce yourself"],
    question: "Who is Kristopher?",
    answer:
      "Kristopher Astudillo is a Full Stack Developer in Santiago, Chile, focused on frontend. Certified as a Systems Analyst at DuocUC and pursuing a B.Eng. in Computer Science. His edge: he comes from automated QA, so he builds interfaces thinking about edge cases and maintainability from the start.",
    suggested: true,
  },
  {
    id: "estudios",
    keys: ["studies", "study", "studied", "degree", "career", "duoc", "university", "institute", "education", "where did he study", "what did he study"],
    question: "What did he study?",
    answer:
      "He's a certified Systems Analyst — Full Stack Developer from DuocUC (2024-2026), and is continuing with a B.Eng. in Computer Science, Software Development track. He also holds certifications in Angular Basics (Simplilearn), Intensive HTML & CSS (Udemy, 23 h), and AI in Practice Immersion (Daxus Latam, 8 h).",
  },
  {
    id: "que-hace",
    keys: ["what do you do", "what does he do", "current job", "current role", "current position"],
    question: "What does he do?",
    answer:
      "Full Stack development with a frontend focus: he builds interfaces in React and TypeScript, and also works the backend in Java with Spring Boot. His differentiating specialty is automated testing with Playwright.",
  },
  {
    id: "edad-ubicacion",
    keys: ["where does he live", "where do you live", "location", "city", "country", "chile", "santiago"],
    question: "Where is he located?",
    answer:
      "He's in Santiago, Chile. He works remote, hybrid, or on-site, and is available immediately.",
  },
  {
    id: "stack",
    keys: ["stack", "technology", "technologies", "language", "languages", "what technologies", "tools", "skills", "framework", "frameworks"],
    question: "What technologies does he use?",
    answer:
      "Frontend: React, TypeScript, JavaScript (ES6+), and plain CSS (Grid, Flexbox). Backend: Java with Spring Boot, and also Node.js. Data: PostgreSQL and MySQL. Quality & infrastructure: Playwright, Docker, Terraform, and JUnit 5. He's currently learning Angular.",
    suggested: true,
  },
  {
    id: "react",
    keys: ["react", "reactjs", "react.js", "hooks", "jsx", "spa"],
    question: "What does he know about React?",
    answer:
      "React is his main tool and where he's solid. He built the entire StudyMatch frontend with React and TypeScript: typed components, client-side routing, and state with hooks. This portfolio is also built in React, with no styling framework.",
  },
  {
    id: "angular",
    keys: ["angular", "angularjs", "angular 17", "angular 18"],
    question: "Does he know Angular?",
    answer:
      "He's learning it. He holds the Angular Basics certificate from Simplilearn and is building his own project to put it into practice. His solid TypeScript and component-architecture background make the transition fast, but honestly it's not his strongest area yet.",
  },
  {
    id: "typescript",
    keys: ["typescript", "ts", "typing", "types", "javascript", "js", "es6", "ecmascript"],
    question: "Does he work with TypeScript?",
    answer:
      "Yes, on every project. Strict TypeScript is his standard, both on StudyMatch and on this portfolio. His JavaScript is also solid: it was the base of the test suite he wrote at Speaknosis.",
  },
  {
    id: "java",
    keys: ["java", "spring", "spring boot", "springboot", "backend", "jvm", "kotlin"],
    question: "Does he know Java and Spring Boot?",
    answer:
      "Yes, it's his main backend stack. On StudyMatch he built the REST API in Spring Boot: sessions, applications, ratings, reports, chat, and moderation, with JWT authentication. He also works with Kotlin for mobile development.",
  },
  {
    id: "bd",
    keys: ["database", "databases", "db", "sql", "postgres", "postgresql", "mysql", "mongodb", "mariadb", "nosql", "modeling"],
    question: "Does he know databases?",
    answer:
      "Yes. PostgreSQL was StudyMatch's engine in production, and he worked with MySQL across three courses in his degree: modeling, queries, and relational schema design. He's also used MongoDB (document-based) and MariaDB locally.",
  },
  {
    id: "api",
    keys: ["api", "apis", "rest", "endpoint", "endpoints", "http", "jwt", "authentication", "postman"],
    question: "Has he worked with APIs?",
    answer:
      "Yes. On StudyMatch he integrated 13+ REST endpoints end to end: defined them on the backend with Spring Boot and consumed them from the React frontend. He works with JWT authentication and tests APIs with Postman.",
  },
  {
    id: "css",
    keys: ["css", "html", "styling", "styles", "design", "responsive", "grid", "flexbox", "tailwind", "bootstrap", "sass"],
    question: "How does he handle styling?",
    answer:
      "He's comfortable with both plain CSS (Grid, Flexbox) and Tailwind CSS. This portfolio uses both: UI components animated with Tailwind and Framer Motion, on top of a hand-built accessibility layer.",
  },
  {
    id: "testing",
    keys: ["testing", "test", "tests", "qa", "quality", "automation", "e2e", "end to end"],
    question: "What does he know about testing?",
    answer:
      "It's his strongest point and what sets him apart. At Speaknosis he implemented 100% of the application's E2E suite: 30+ cases covering auth, patients, reports, and notifications. He works with a BDD approach and knows how to stabilize flaky suites.",
    suggested: true,
  },
  {
    id: "playwright",
    keys: ["playwright", "flaky", "flakiness", "assertions", "mocking", "mock"],
    question: "What does he do with Playwright?",
    answer:
      "Playwright is his go-to tool. Besides building the full suite at Speaknosis, he removed 15+ flaky tests by replacing fixed waits with dynamic assertions on the app's real state, plus data mocking. That made the pipeline far more reliable.",
  },
  {
    id: "otros-testing",
    keys: ["selenium", "cypress", "jest", "vitest", "junit", "mockito", "unit tests", "unit testing"],
    question: "Selenium or Cypress?",
    answer:
      "His real-world experience is in Playwright, not Selenium or Cypress — though the concepts transfer and he could adapt quickly. For backend unit tests he works with JUnit 5 and Mockito.",
  },
  {
    id: "metodologia",
    keys: ["methodology", "scrum", "kanban", "agile", "sprint", "jira", "trello", "how do you organize"],
    question: "What methodology does he use?",
    answer:
      "He works with agile methodologies: Scrum and Kanban, tracked in Jira. On StudyMatch he coordinated frontend and backend work in a two-person team, and at Speaknosis he fit into the team's cycles with Git Flow and Conventional Commits.",
  },
  {
    id: "como-programa",
    keys: ["how do you write code", "clean code", "best practices", "architecture", "maintainable", "scalable", "how do you develop"],
    question: "How does he write code?",
    answer:
      "With maintainability in mind: reusable components, strict typing, and clear separation of concerns. His QA background leads him to think first about what could break. This portfolio, for example, keeps all content in a single data file, separate from the components.",
  },
  {
    id: "git",
    keys: ["git", "version control", "commits", "branch", "branches", "gitflow", "git flow", "versioning"],
    question: "How does he work with Git?",
    answer:
      "Git Flow with feature branches and Conventional Commits. At Speaknosis he kept a clean, traceable history and documented the testing architecture for the repository handoff to the Team Leader. His GitHub is github.com/KrisAndre-25.",
  },
  {
    id: "proyecto",
    keys: ["project", "projects", "studymatch", "study match", "portfolio", "best project", "show me", "work"],
    question: "What are his projects?",
    answer:
      "His flagship project is StudyMatch, his capstone: a web platform that connects students to study in pairs. He built the entire frontend in React and TypeScript, contributed to the backend with Spring Boot integrating 13+ REST endpoints, and defined the infrastructure with Terraform. The other visible project is this very portfolio.",
    suggested: true,
  },
  {
    id: "experiencia",
    keys: ["experience", "work experience", "internship", "speaknosis", "job", "employment", "resume", "cv", "background"],
    question: "What experience does he have?",
    answer:
      "He did his professional internship at Speaknosis Chile, an AI-powered digital health platform, between March and May 2026. There he implemented 100% of the E2E suite with Playwright, 30+ test cases, and removed 15+ flaky tests. You can download his full CV from the button at the top.",
    suggested: true,
  },
  {
    id: "aws",
    keys: ["aws", "cloud", "terraform", "infrastructure", "deployment", "deploy", "docker", "containers", "devops"],
    question: "How did he handle infrastructure?",
    answer:
      "He defined the infrastructure with Terraform following an Infrastructure as Code approach. The environment ran on AWS through a DuocUC academic lab (AWS Academy), for educational purposes. He also builds containers with Docker.",
  },
  {
    id: "contacto",
    keys: ["contact", "reach", "email", "mail", "gmail", "write", "talk", "get in touch"],
    question: "How do I contact him?",
    answer:
      "By email at kristopherastudillo@gmail.com, by WhatsApp at +56 9 5090 2425, or via LinkedIn. All three buttons are in the Contact section, at the bottom of the page. He replies the same day.",
    suggested: true,
  },
  {
    id: "linkedin",
    keys: ["linkedin", "social", "social media", "professional profile"],
    question: "Does he have LinkedIn?",
    answer:
      "Yes. You can find him as Kristopher Astudillo Durán; the direct link is in the Contact section, with his experience, education, and recommendations.",
  },
  {
    id: "github",
    keys: ["github", "repository", "repositories", "source code", "repo"],
    question: "Where's his GitHub?",
    answer:
      "At github.com/KrisAndre-25. Note that the StudyMatch repository stays private, but he can walk through the code and a demo in a technical interview.",
  },
  {
    id: "disponibilidad",
    keys: ["available", "availability", "hire", "when", "start", "remote", "on-site", "hybrid", "salary", "compensation"],
    question: "Is he available?",
    answer:
      "Yes, with an immediate start. He works remote, hybrid, or on-site from Santiago, Chile. To talk specifics, it's best to reach him directly by email or WhatsApp.",
    suggested: true,
  },
  {
    id: "certificados",
    keys: ["certificate", "certificates", "certification", "certifications", "course", "courses", "diploma"],
    question: "What certifications does he have?",
    answer:
      "Three: AI in Practice Immersion (Daxus Latam, 8 h), Angular Basics (Simplilearn), and Intensive HTML & CSS toward React (Udemy, 23 h). You can view them in the Certifications section and download the PDF of the first one.",
  },
  {
    id: "idiomas",
    keys: ["english", "language", "languages"],
    question: "Does he speak English?",
    answer:
      "For his exact language level, it's best to ask him directly by email or WhatsApp — I'd rather not claim something I can't confirm.",
  },
];

export const assistantFallback =
  "I don't have a prepared answer for that. I can tell you about his stack, his experience at Speaknosis, the StudyMatch project, his education, or how to reach him. You can also write him directly at kristopherastudillo@gmail.com.";

/* ── Certifications ───────────────────────────────────── */
export const certifications: Cert[] = [
  {
    id: "daxus-ia",
    name: "AI in Practice Immersion",
    org: "Daxus Latam",
    date: "July 2025",
    hours: "8 hours",
    summary:
      "An intensive event on the practical application of AI: how to integrate it into real development workflows, instead of staying in theory.",
    skills: ["Artificial Intelligence", "Prompting", "Productivity"],
    pdf: "certificados/Certificado-IA-Practica-DaxusLatam.pdf",
    thumb: "certificados/cert-ia.jpg",
  },
  {
    id: "angular-basics",
    name: "Angular Basics",
    org: "Simplilearn · SkillUp",
    date: "July 18, 2026",
    summary:
      "Framework fundamentals: components, templates, routing, and the structure of an Angular application with TypeScript.",
    skills: ["Angular", "TypeScript", "SPA"],
    image: "certificados/cert-simplilearn.jpg",
    thumb: "certificados/cert-simplilearn.jpg",
    code: "10484667",
    verifyUrl: "https://verify.simplilearn.com/",
    verifyLabel: "Verify on Simplilearn",
  },
  {
    id: "html-css",
    name: "Intensive HTML & CSS: the road to React",
    org: "Udemy",
    date: "July 13, 2026",
    hours: "23 hours",
    summary:
      "Layout and styling from the ground up to complex layouts with Grid and Flexbox. That plain-CSS discipline shows in this very portfolio: no styling framework.",
    skills: ["HTML5", "CSS3", "Responsive"],
    image: "certificados/cert-udemy.jpg",
    thumb: "certificados/cert-udemy.jpg",
    code: "UC-f953825a-add8-499b-9a8b-f684f875d88b",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-f953825a-add8-499b-9a8b-f684f875d88b/",
    verifyLabel: "View on Udemy",
  },
];
