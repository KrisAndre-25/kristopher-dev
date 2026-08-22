/**
 * Fuente única de verdad del portafolio.
 * Edita este archivo para actualizar el sitio: los componentes no llevan texto quemado.
 */

export const profile = {
  name: "Kristopher Astudillo",
  fullName: "Kristopher André Astudillo Durán",
  role: "Desarrollador Full Stack",
  altRole: "Analista Programador",
  location: "Santiago, Chile",
  email: "kristopherastudillo@gmail.com",
  phone: "+56 9 5090 2425",
  phoneHref: "+56950902425",
  linkedin:
    "https://www.linkedin.com/in/kristopher-astudillo-dur%C3%A1n-b69083312/",
  github: "https://github.com/KrisAndre-25",
  photo: "kristopher.jpg",
  cv: "cv/CV_Kristopher_Andre_Astudillo.pdf",
  cvName: "CV-Kristopher-Astudillo.pdf",
  /** Número en formato internacional sin signos, para el enlace de WhatsApp. */
  whatsapp: "56950902425",
  intro:
    "Mi foco es el Frontend: construyo interfaces rápidas, accesibles y con una experiencia de usuario cuidada, en React y TypeScript. Vengo del QA automatizado, así que pienso en casos límite y mantenibilidad antes de escribir la primera línea. Código limpio, escalable y reutilizable, trabajado bajo Scrum y Kanban.",
  availability: "Disponible para nuevos proyectos",
};

/* ── Mensajes prellenados ─────────────────────────────── */

/** Texto con el que se abre el chat de WhatsApp. */
export const whatsappMessage =
  "Hola Kristopher, vi tu portafolio y me gustaría conversar contigo sobre una oportunidad laboral.";

export const mailSubject = "Oportunidad laboral — Desarrollador Full Stack";

export const mailBody =
  "Hola Kristopher,\n\nVi tu portafolio y me gustaría conversar contigo sobre una oportunidad.\n\nSaludos,";

/** wa.me abre la app o WhatsApp Web según el dispositivo. */
export const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  whatsappMessage
)}`;

/** mailto: usa el cliente de correo por defecto del sistema. */
export const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
  mailSubject
)}&body=${encodeURIComponent(mailBody)}`;

/** Redacta directamente en Gmail, útil si el correo se usa en el navegador. */
export const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(profile.email)}` +
  `&su=${encodeURIComponent(mailSubject)}` +
  `&body=${encodeURIComponent(mailBody)}`;

/* ── Navegación ───────────────────────────────────────── */
export const navLinks = [
  { id: "perfil", label: "Perfil" },
  { id: "proyecto", label: "Proyecto" },
  { id: "codigo", label: "Código" },
  { id: "experiencia", label: "Experiencia" },
  { id: "certificaciones", label: "Certificados" },
  { id: "stack", label: "Stack" },
  { id: "contacto", label: "Contacto" },
];

/* ── Métricas del hero ────────────────────────────────── */
export const heroStats = [
  { value: "100%", label: "suite E2E implementada" },
  { value: "13+", label: "endpoints REST integrados" },
  { value: "30+", label: "casos de prueba automatizados" },
];

/* ── Bento Grid ───────────────────────────────────────── */
export type BentoCard = {
  id: string;
  span: "wide" | "tall" | "normal" | "full";
  kind: "text" | "metric" | "list" | "status";
  eyebrow: string;
  title: string;
  body?: string;
  metric?: string;
  metricNote?: string;
  items?: string[];
};

export const bento: BentoCard[] = [
  {
    id: "quien",
    span: "wide",
    kind: "text",
    eyebrow: "Quién soy",
    title: "Full Stack con cabeza de QA",
    body: "Combino el desarrollo Full Stack con una rigurosa mentalidad orientada al Aseguramiento de Calidad (QA). Mi enfoque no solo busca escribir código funcional con React, Java y Spring Boot, sino también anticipar escenarios de fallo, garantizar pruebas sólidas y optimizar el rendimiento antes de cada despliegue.",
  },
  {
    id: "cobertura",
    span: "normal",
    kind: "metric",
    eyebrow: "Speaknosis",
    title: "Cobertura E2E",
    metric: "100%",
    metricNote: "de la suite de la aplicación, incluidos los flujos con clientes",
  },
  {
    id: "flaky",
    span: "normal",
    kind: "metric",
    eyebrow: "Estabilidad",
    title: "Flaky tests eliminados",
    metric: "15+",
    metricNote: "con aserciones dinámicas y mocking de datos",
  },
  {
    id: "formacion",
    span: "normal",
    kind: "list",
    eyebrow: "Formación",
    title: "DuocUC",
    items: [
      "Analista Programador — Desarrollador Full Stack (titulado)",
      "Ingeniería en Informática, mención Desarrollo de Software (en curso)",
    ],
  },
  {
    id: "certs",
    span: "normal",
    kind: "list",
    eyebrow: "Certificaciones",
    title: "Formación continua",
    items: [
      "Inmersión Inteligencia Artificial en la Práctica — Daxus Latam, 8 h",
      "Angular Basics — Simplilearn, 2026",
      "HTML y CSS Intensivo: camino hacia React — Udemy, 23 h",
    ],
  },
  {
    id: "disponible",
    span: "wide",
    kind: "status",
    eyebrow: "Disponibilidad",
    title: "Abierto a oportunidades",
    body: "Incorporación inmediata. Trabajo en modalidad remota, híbrida o presencial desde Santiago de Chile.",
  },
];

/* ── Proyecto destacado ───────────────────────────────── */
export const project = {
  name: "StudyMatch",
  kind: "Proyecto de título",
  tagline: "Plataforma de estudio entre pares",
  summary:
    "Plataforma web que conecta estudiantes para armar sesiones de estudio y tutorías entre pares, emparejando por curso, disponibilidad y forma de estudiar. La desarrollé en equipo de dos personas: construí la totalidad del frontend y participé activamente en el backend.",
  /** Nota: el repositorio es privado, por eso no se enlaza el código. */
  isPrivate: true,
  privateNote:
    "El repositorio se mantiene privado. Puedo mostrar el código y una demostración en una entrevista técnica.",
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
    { value: "13+", label: "endpoints REST integrados" },
    { value: "20+", label: "funcionalidades y bugs resueltos" },
    { value: "2", label: "personas en el equipo" },
  ],
  architecture: [
    {
      layer: "Frontend",
      detail:
        "SPA en React con TypeScript sobre Vite. Componentes tipados, enrutamiento del lado del cliente y estado manejado con hooks. Yo construí esta capa completa.",
    },
    {
      layer: "Backend",
      detail:
        "API REST en Java con Spring Boot: sesiones, postulaciones, valoraciones, reportes, chat y moderación. Autenticación con JWT.",
    },
    {
      layer: "Datos",
      detail:
        "PostgreSQL como motor relacional, con el modelo de datos diseñado para soportar el emparejamiento entre estudiantes.",
    },
    {
      layer: "Infraestructura",
      detail:
        "La infraestructura se definió con Terraform como Infrastructure as Code (IaC). El entorno se levantó sobre AWS mediante un laboratorio académico de DuocUC (AWS Academy), con fines educativos y de experimentación. Los contenedores se prepararon con Docker.",
    },
    {
      layer: "Calidad",
      detail:
        "Pruebas funcionales end-to-end con Playwright bajo un enfoque BDD, cubriendo los flujos críticos de la plataforma.",
    },
  ],
  challenges: [
    {
      title: "Emparejar sin resultados vacíos",
      detail:
        "El algoritmo tenía que devolver coincidencias útiles incluso con pocos usuarios registrados. Ajusté los criterios para relajar los filtros progresivamente en lugar de devolver una lista vacía.",
    },
    {
      title: "Estado consistente entre vistas",
      detail:
        "Postulaciones, notificaciones y contadores se tocaban entre varias pantallas. Centralicé la lógica para que un cambio se reflejara en toda la interfaz sin recargar.",
    },
    {
      title: "Pruebas E2E estables",
      detail:
        "Las primeras pruebas fallaban de forma intermitente. Reemplacé esperas fijas por aserciones dinámicas sobre el estado real de la aplicación.",
    },
  ],
  learnings: [
    "Definir infraestructura como código cambia la conversación: dejas de configurar servidores a mano y empiezas a versionar el entorno.",
    "Un backend bien delimitado ahorra trabajo en el frontend. Las decisiones de la API se sienten en cada pantalla.",
    "Escribir las pruebas mientras construyes es más barato que escribirlas después, y encuentra errores de diseño temprano.",
  ],
  howIBuiltIt:
    "Construí el frontend completo en React y TypeScript sobre Vite, consumiendo una API REST en Java con Spring Boot (autenticación JWT) que expone más de 13 endpoints. El modelo de datos vive en PostgreSQL, diseñado específicamente para el emparejamiento entre estudiantes. La infraestructura quedó definida como código con Terraform sobre un laboratorio de AWS Academy, con Docker para los contenedores, y validé los flujos críticos con una suite E2E en Playwright bajo un enfoque BDD.",
};

/* ── Carrusel ─────────────────────────────────────────── */
export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
  tags: string[];
  /**
   * Captura opcional. Deja el archivo en `public/capturas/` y pon aquí
   * la ruta, por ejemplo: "capturas/playwright-suite.png".
   * Si se omite, la tarjeta se muestra solo con texto.
   */
  image?: string;
  imageAlt?: string;
};

export const slides: Slide[] = [
  {
    id: "s-speaknosis",
    eyebrow: "Experiencia profesional",
    title: "Automatización de pruebas en salud digital",
    body: "En Speaknosis Chile implementé el 100% de la suite E2E de la aplicación, incluidos los flujos con clientes: más de 30 casos sobre autenticación, pacientes, reportes y notificaciones.",
    meta: "Marzo — Mayo 2026",
    tags: ["Playwright", "JavaScript", "Git Flow"],
  },
  {
    id: "s-studymatch",
    eyebrow: "Proyecto de título",
    title: "StudyMatch, de punta a punta",
    body: "Frontend completo en React y TypeScript, backend en Spring Boot con más de 13 endpoints REST, e infraestructura definida con Terraform sobre un laboratorio académico de AWS Academy.",
    meta: "2026",
    tags: ["React", "Spring Boot", "Terraform"],
  },
  {
    id: "s-angular",
    eyebrow: "Certificación",
    title: "Angular Basics",
    body: "Certificado en fundamentos de Angular. Actualmente estoy construyendo un proyecto propio con el framework para llevar la teoría a la práctica.",
    meta: "Simplilearn · 2026",
    tags: ["Angular", "TypeScript"],
  },
  {
    id: "s-udemy",
    eyebrow: "Certificación",
    title: "HTML y CSS Intensivo",
    body: "23 horas de fundamentos de maquetación y estilos como base hacia React. La disciplina de CSS puro se nota en este mismo portafolio: no usa ningún framework de estilos.",
    meta: "Udemy · 2026",
    tags: ["HTML", "CSS"],
  },
  {
    id: "s-titulo",
    eyebrow: "Formación",
    title: "Analista Programador — Desarrollador Full Stack",
    body: "Titulado en DuocUC. Continúo con Ingeniería en Informática, mención Desarrollo de Software.",
    meta: "DuocUC · 2024 — 2026",
    tags: ["Java", "Bases de datos", "Ingeniería de software"],
  },
];

/* ── Experiencia ──────────────────────────────────────── */
export const experience = [
  {
    role: "Practicante — QA Automation & Software Development",
    org: "Speaknosis Chile SpA",
    period: "Marzo — Mayo 2026",
    context:
      "Plataforma de salud digital que documenta consultas médicas con apoyo de inteligencia artificial.",
    points: [
      "Implementé el 100% de la suite de pruebas E2E de la aplicación, incluidos los flujos con clientes.",
      "Más de 30 casos de prueba sobre autenticación, pacientes, reportes y notificaciones.",
      "Identifiqué y eliminé más de 15 pruebas inestables con aserciones dinámicas y mocking de datos.",
      "Documenté la arquitectura de testing y coordiné el traspaso del repositorio con el Team Leader.",
    ],
    tools: ["Playwright", "JavaScript", "Git Flow", "Jira"],
    /** Métricas reales, mostradas como progreso animado al entrar en vista. */
    impact: [
      { label: "Cobertura de la suite E2E", value: 100, suffix: "%" },
      { label: "Casos de prueba construidos", value: 30, suffix: "+" },
      { label: "Pruebas inestables eliminadas", value: 15, suffix: "+" },
    ],
    howIBuiltIt:
      "Levanté la suite E2E completa con Playwright y JavaScript, cubriendo autenticación, pacientes, reportes y notificaciones. Las primeras pruebas eran inestables, así que reemplacé esperas fijas por aserciones dinámicas y mocking de datos, eliminando más de 15 flaky tests. Trabajé bajo Git Flow y dejé documentada la arquitectura de testing para el traspaso del repositorio.",
  },
];

/* ── Stack técnico ────────────────────────────────────── */
export type Level = "solido" | "practico" | "aprendiendo";

export type Tech = {
  name: string;
  level: Level;
  note: string;
};

export const levelLabel: Record<Level, string> = {
  solido: "Sólido",
  practico: "Práctico",
  aprendiendo: "Aprendiendo",
};

export const stackGroups: { group: string; items: Tech[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "React", level: "solido", note: "Hooks, enrutamiento y SPA. Construí el frontend completo de StudyMatch." },
      { name: "TypeScript", level: "solido", note: "Tipado estricto en todos mis proyectos, incluido este portafolio." },
      { name: "JavaScript", level: "solido", note: "ES6+. Base de la suite de pruebas que escribí en Speaknosis." },
      { name: "CSS", level: "solido", note: "Grid, Flexbox y diseño responsive sin frameworks." },
      { name: "Angular", level: "aprendiendo", note: "Certificado en fundamentos y un proyecto propio en construcción." },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Java", level: "solido", note: "Lenguaje principal de backend durante mi formación." },
      { name: "Spring Boot", level: "solido", note: "APIs REST, lógica de negocio y autenticación con JWT." },
      { name: "Node.js", level: "practico", note: "Express y servicios REST." },
      { name: "Kotlin", level: "practico", note: "Desarrollo de aplicaciones móviles." },
    ],
  },
  {
    group: "Datos",
    items: [
      { name: "PostgreSQL", level: "solido", note: "Motor relacional de StudyMatch." },
      { name: "MySQL", level: "solido", note: "Modelado y consultas a lo largo de tres ramos de base de datos." },
      { name: "MongoDB", level: "practico", note: "Modelo documental, colecciones y consultas." },
      { name: "MariaDB", level: "practico", note: "Entornos locales de desarrollo." },
    ],
  },
  {
    group: "Calidad e infraestructura",
    items: [
      { name: "Playwright", level: "solido", note: "Suite E2E completa en un producto real. Mi especialidad." },
      { name: "Docker", level: "practico", note: "Contenedores para desarrollo y despliegue." },
      { name: "Terraform", level: "practico", note: "Infraestructura como código, aplicada en StudyMatch." },
      { name: "AWS Academy", level: "practico", note: "Laboratorio académico de DuocUC para experimentar con la nube." },
      { name: "JUnit 5", level: "practico", note: "Pruebas unitarias en backend Java." },
    ],
  },
];

/* ── Asistente ────────────────────────────────────────── */
export type Intent = {
  id: string;
  /** Palabras clave que disparan esta respuesta (en minúsculas, sin tildes). */
  keys: string[];
  question: string;
  answer: string;
  /** Si es true, aparece como sugerencia inicial. */
  suggested?: boolean;
};

export const intents: Intent[] = [
  /* ── Saludos y cortesía ─────────────────────────────── */
  {
    id: "saludo",
    keys: ["hola", "holi", "buenas", "hey", "ey", "que tal", "qué tal", "como estas", "cómo estás", "buenos dias", "buenas tardes", "buenas noches", "saludos", "hello", "hi"],
    question: "Hola",
    answer:
      "¡Hola! Soy el asistente del portafolio de Kristopher. Puedo contarte sobre su stack, su experiencia, sus proyectos o cómo contactarlo. ¿Qué te interesa?",
  },
  {
    id: "gracias",
    keys: ["gracias", "grasias", "thanks", "genial", "perfecto", "buenisimo", "buenísimo", "excelente"],
    question: "Gracias",
    answer:
      "¡De nada! Si quieres seguir explorando, pregúntame por sus proyectos, su stack o cómo contactarlo directamente.",
  },
  {
    id: "despedida",
    keys: ["chao", "adios", "adiós", "hasta luego", "nos vemos", "bye"],
    question: "Chao",
    answer:
      "¡Hasta luego! Si quieres escribirle directo: kristopherastudillo@gmail.com o por WhatsApp al +56 9 5090 2425.",
  },

  /* ── Sobre él ───────────────────────────────────────── */
  {
    id: "quien",
    keys: ["quien eres", "quién eres", "hablame de ti", "háblame de ti", "cuentame", "cuéntame", "sobre ti", "sobre el", "sobre él", "presentate", "preséntate", "quien es", "quién es"],
    question: "¿Quién es Kristopher?",
    answer:
      "Kristopher Astudillo es Desarrollador Full Stack en Santiago de Chile, con foco en Frontend. Titulado como Analista Programador en DuocUC y cursando Ingeniería en Informática. Su sello: viene del QA automatizado, así que construye interfaces pensando desde el principio en casos límite y mantenibilidad.",
    suggested: true,
  },
  {
    id: "estudios",
    keys: ["estudio", "estudios", "estudias", "estudiaste", "carrera", "titulo", "título", "duoc", "universidad", "instituto", "formacion", "formación", "donde estudio", "dónde estudió", "que estudia", "qué estudia"],
    question: "¿Qué estudió?",
    answer:
      "Está titulado como Analista Programador — Desarrollador Full Stack en DuocUC (2024-2026), y continúa con Ingeniería en Informática, mención Desarrollo de Software. Además tiene certificaciones en Angular Basics (Simplilearn), HTML y CSS Intensivo (Udemy, 23 h) e Inmersión de IA en la Práctica (Daxus Latam, 8 h).",
  },
  {
    id: "que-hace",
    keys: ["que haces", "qué haces", "a que te dedicas", "a qué te dedicas", "trabajo actual", "cargo actual", "puesto actual", "a que se dedica", "a qué se dedica"],
    question: "¿A qué se dedica?",
    answer:
      "Desarrollo Full Stack con foco en Frontend: construye interfaces en React y TypeScript, y también trabaja el backend en Java con Spring Boot. Su especialidad diferenciadora es el testing automatizado con Playwright.",
  },
  {
    id: "edad-ubicacion",
    keys: ["donde vive", "dónde vive", "donde vives", "dónde vives", "ubicacion", "ubicación", "ciudad", "pais", "país", "chile", "santiago"],
    question: "¿Dónde está ubicado?",
    answer:
      "Está en Santiago de Chile. Trabaja en modalidad remota, híbrida o presencial, y tiene disponibilidad inmediata.",
  },

  /* ── Stack técnico ──────────────────────────────────── */
  {
    id: "stack",
    keys: ["stack", "tecnologia", "tecnologías", "tecnologias", "lenguaje", "lenguajes", "que tecnologias", "qué tecnologías", "herramientas", "skills", "habilidades", "framework", "frameworks"],
    question: "¿Qué tecnologías maneja?",
    answer:
      "Frontend: React, TypeScript, JavaScript (ES6+) y CSS puro (Grid, Flexbox). Backend: Java con Spring Boot, y también Node.js. Datos: PostgreSQL y MySQL. Calidad e infraestructura: Playwright, Docker, Terraform y JUnit 5. Está aprendiendo Angular.",
    suggested: true,
  },
  {
    id: "react",
    keys: ["react", "reactjs", "react.js", "hooks", "jsx", "spa"],
    question: "¿Qué sabe de React?",
    answer:
      "React es su herramienta principal y donde tiene nivel sólido. Construyó el frontend completo de StudyMatch con React y TypeScript: componentes tipados, enrutamiento del lado del cliente y estado con hooks. Este mismo portafolio también está hecho en React, sin frameworks de estilos.",
  },
  {
    id: "angular",
    keys: ["angular", "angularjs", "angualr", "anguar", "angular 17", "angular 18"],
    question: "¿Sabe Angular?",
    answer:
      "Está aprendiéndolo. Tiene el certificado Angular Basics de Simplilearn y desarrolla un proyecto propio para llevarlo a la práctica. Su base sólida en TypeScript y en arquitectura de componentes hace que la transición sea rápida, pero sería honesto decir que aún no es su fuerte.",
  },
  {
    id: "typescript",
    keys: ["typescript", "ts", "tipado", "tipos", "javascript", "js", "es6", "ecmascript"],
    question: "¿Trabaja con TypeScript?",
    answer:
      "Sí, en todos sus proyectos. TypeScript con tipado estricto es su estándar, tanto en StudyMatch como en este portafolio. En JavaScript también tiene nivel sólido: fue la base de la suite de pruebas que escribió en Speaknosis.",
  },
  {
    id: "java",
    keys: ["java", "spring", "spring boot", "springboot", "backend", "jvm", "kotlin"],
    question: "¿Sabe Java y Spring Boot?",
    answer:
      "Sí, es su stack principal de backend. En StudyMatch construyó la API REST en Spring Boot: sesiones, postulaciones, valoraciones, reportes, chat y moderación, con autenticación por JWT. También maneja Kotlin para desarrollo móvil.",
  },
  {
    id: "bd",
    keys: ["base de datos", "bases de datos", "bd", "sql", "postgres", "postgresql", "mysql", "mongodb", "mariadb", "nosql", "modelado"],
    question: "¿Conoce bases de datos?",
    answer:
      "Sí. PostgreSQL fue el motor de StudyMatch en producción, y MySQL lo trabajó a lo largo de tres ramos de la carrera: modelado, consultas y diseño de esquemas relacionales. También ha usado MongoDB (documental) y MariaDB en entornos locales.",
  },
  {
    id: "api",
    keys: ["api", "apis", "rest", "endpoint", "endpoints", "http", "jwt", "autenticacion", "autenticación", "postman"],
    question: "¿Ha trabajado con APIs?",
    answer:
      "Sí. En StudyMatch integró más de 13 endpoints REST de punta a punta: los definió en el backend con Spring Boot y los consumió desde el frontend en React. Trabaja con autenticación por JWT y prueba las APIs con Postman.",
  },
  {
    id: "css",
    keys: ["css", "html", "estilos", "diseño", "responsive", "grid", "flexbox", "tailwind", "bootstrap", "sass"],
    question: "¿Cómo trabaja los estilos?",
    answer:
      "Domina tanto CSS puro con Grid y Flexbox como Tailwind CSS. Este portafolio combina ambos: componentes de interfaz animados con Tailwind y Framer Motion, sobre una base de accesibilidad escrita a mano.",
  },

  /* ── Testing ────────────────────────────────────────── */
  {
    id: "testing",
    keys: ["testing", "test", "tests", "pruebas", "qa", "calidad", "automatizacion", "automatización", "e2e", "end to end"],
    question: "¿Qué sabe de testing?",
    answer:
      "Es su punto más fuerte y lo que lo diferencia. En Speaknosis implementó el 100% de la suite E2E de la aplicación: más de 30 casos cubriendo autenticación, pacientes, reportes y notificaciones. Trabaja con enfoque BDD y sabe estabilizar suites inestables.",
    suggested: true,
  },
  {
    id: "playwright",
    keys: ["playwright", "flaky", "flakiness", "aserciones", "mocking", "mock"],
    question: "¿Qué hace con Playwright?",
    answer:
      "Playwright es su herramienta de cabecera. Además de construir la suite completa en Speaknosis, eliminó más de 15 pruebas inestables reemplazando esperas fijas por aserciones dinámicas sobre el estado real de la aplicación, y usando mocking de datos. Eso hizo el pipeline mucho más confiable.",
  },
  {
    id: "otros-testing",
    keys: ["selenium", "cypress", "jest", "vitest", "junit", "mockito", "unitarias", "unit test"],
    question: "¿Selenium o Cypress?",
    answer:
      "Su experiencia real está en Playwright, no en Selenium ni Cypress — aunque los conceptos son transferibles y podría adaptarse rápido. En pruebas unitarias de backend trabaja con JUnit 5 y Mockito.",
  },

  /* ── Metodología ────────────────────────────────────── */
  {
    id: "metodologia",
    keys: ["metodologia", "metodología", "scrum", "kanban", "agil", "ágil", "agile", "sprint", "jira", "trello", "como organizas", "cómo organizas"],
    question: "¿Qué metodología usa?",
    answer:
      "Trabaja con metodologías ágiles: Scrum y Kanban, apoyándose en Jira para el seguimiento. En StudyMatch coordinó tareas entre frontend y backend en un equipo de dos, y en Speaknosis se integró a los ciclos del equipo con Git Flow y Conventional Commits.",
  },
  {
    id: "como-programa",
    keys: ["como escribes", "cómo escribes", "codigo limpio", "código limpio", "clean code", "buenas practicas", "buenas prácticas", "arquitectura", "mantenible", "escalable", "como desarrollas", "cómo desarrollas"],
    question: "¿Cómo escribe código?",
    answer:
      "Con foco en mantenibilidad: componentes reutilizables, tipado estricto y separación clara de responsabilidades. Su formación en QA lo lleva a pensar primero en qué puede fallar. En este portafolio, por ejemplo, todo el contenido vive en un solo archivo de datos, separado de los componentes.",
  },
  {
    id: "git",
    keys: ["git", "control de versiones", "commits", "branch", "ramas", "gitflow", "git flow", "versionado"],
    question: "¿Cómo trabaja con Git?",
    answer:
      "Git Flow con ramas por funcionalidad y Conventional Commits. En Speaknosis mantuvo un historial limpio y trazable, y documentó la arquitectura de testing para el traspaso del repositorio al Team Leader. Su GitHub es github.com/KrisAndre-25.",
  },

  /* ── Proyectos y experiencia ────────────────────────── */
  {
    id: "proyecto",
    keys: ["proyecto", "proyectos", "studymatch", "study match", "portafolio", "portfolio", "mejor proyecto", "muestrame", "muéstrame", "trabajos"],
    question: "¿Cuáles son sus proyectos?",
    answer:
      "Su proyecto destacado es StudyMatch, el de título: una plataforma web que conecta estudiantes para estudiar en pares. Construyó el frontend completo en React y TypeScript, participó en el backend con Spring Boot integrando más de 13 endpoints REST, y definió la infraestructura con Terraform. El otro proyecto visible es este mismo portafolio.",
    suggested: true,
  },
  {
    id: "experiencia",
    keys: ["experiencia", "experiencia laboral", "practica", "práctica", "speaknosis", "laboral", "empleo", "curriculum", "cv", "trayectoria"],
    question: "¿Qué experiencia tiene?",
    answer:
      "Hizo su práctica profesional en Speaknosis Chile, una plataforma de salud digital con IA, entre marzo y mayo de 2026. Ahí implementó el 100% de la suite E2E con Playwright, más de 30 casos de prueba, y eliminó más de 15 pruebas inestables. Puedes descargar su CV completo desde el botón del inicio.",
    suggested: true,
  },
  {
    id: "aws",
    keys: ["aws", "nube", "cloud", "terraform", "infraestructura", "despliegue", "deploy", "docker", "contenedores", "devops"],
    question: "¿Cómo trabajó la infraestructura?",
    answer:
      "Definió la infraestructura con Terraform siguiendo el enfoque de Infrastructure as Code. El entorno se levantó sobre AWS mediante un laboratorio académico de DuocUC (AWS Academy), con fines educativos. También prepara contenedores con Docker.",
  },

  /* ── Contacto y disponibilidad ──────────────────────── */
  {
    id: "contacto",
    keys: ["contacto", "contactar", "correo", "email", "mail", "gmail", "escribir", "hablar", "comunicar"],
    question: "¿Cómo lo contacto?",
    answer:
      "Por correo a kristopherastudillo@gmail.com, por WhatsApp al +56 9 5090 2425, o por LinkedIn. Los tres botones están en la sección de Contacto, al final de la página. Responde el mismo día.",
    suggested: true,
  },
  {
    id: "linkedin",
    keys: ["linkedin", "red social", "redes", "perfil profesional"],
    question: "¿Tiene LinkedIn?",
    answer:
      "Sí. Puedes encontrarlo como Kristopher Astudillo Durán; el enlace directo está en la sección de Contacto, con su experiencia, formación y recomendaciones.",
  },
  {
    id: "github",
    keys: ["github", "git hub", "repositorio", "repositorios", "codigo fuente", "código fuente", "repo"],
    question: "¿Dónde está su GitHub?",
    answer:
      "En github.com/KrisAndre-25. Ten en cuenta que el repositorio de StudyMatch se mantiene privado, pero puede mostrar el código y una demostración en una entrevista técnica.",
  },
  {
    id: "disponibilidad",
    keys: ["disponible", "disponibilidad", "contratar", "cuando", "cuándo", "empezar", "modalidad", "remoto", "presencial", "hibrido", "híbrido", "sueldo", "renta", "salario", "pretensiones"],
    question: "¿Está disponible?",
    answer:
      "Sí, con incorporación inmediata. Trabaja en modalidad remota, híbrida o presencial desde Santiago de Chile. Para hablar de condiciones concretas, lo mejor es escribirle directamente por correo o WhatsApp.",
    suggested: true,
  },
  {
    id: "certificados",
    keys: ["certificado", "certificados", "certificacion", "certificación", "certificaciones", "curso", "cursos", "diploma"],
    question: "¿Qué certificaciones tiene?",
    answer:
      "Tres: Inmersión Inteligencia Artificial en la Práctica (Daxus Latam, 8 h), Angular Basics (Simplilearn) y HTML y CSS Intensivo camino hacia React (Udemy, 23 h). En la sección de Certificaciones puedes verlos y descargar el PDF del primero.",
  },
  {
    id: "idiomas",
    keys: ["ingles", "inglés", "idioma", "idiomas", "english"],
    question: "¿Habla inglés?",
    answer:
      "Sobre su nivel de idiomas, lo mejor es que se lo preguntes directamente a él por correo o WhatsApp — prefiero no afirmar algo que no me consta.",
  },
];

export const assistantFallback =
  "No tengo una respuesta preparada para eso. Puedo contarte sobre su stack, su experiencia en Speaknosis, el proyecto StudyMatch, su formación o cómo contactarlo. También puedes escribirle directamente a kristopherastudillo@gmail.com.";

/* ── Certificaciones ──────────────────────────────────── */
export type Cert = {
  id: string;
  name: string;
  org: string;
  date: string;
  hours?: string;
  summary: string;
  skills: string[];
  /** Ruta al PDF dentro de public/. */
  pdf?: string;
  /** Ruta a la imagen del certificado, cuando no hay PDF. */
  image?: string;
  /** Miniatura para la tarjeta. */
  thumb?: string;
  /** Código o folio de verificación que aparece en el certificado. */
  code?: string;
  /** Enlace público para verificar el certificado. Debe funcionar sin
   *  iniciar sesión: un reclutador no tiene cuenta en la plataforma. */
  verifyUrl?: string;
  /** Texto del enlace, si "Verificar" no describe bien el destino. */
  verifyLabel?: string;
};

export const certifications: Cert[] = [
  {
    id: "daxus-ia",
    name: "Inmersión Inteligencia Artificial en la Práctica",
    org: "Daxus Latam",
    date: "Julio 2025",
    hours: "8 horas",
    summary:
      "Evento intensivo sobre aplicación práctica de inteligencia artificial: cómo integrarla en flujos de trabajo reales de desarrollo, en vez de quedarse en la teoría.",
    skills: ["Inteligencia Artificial", "Prompting", "Productividad"],
    pdf: "certificados/Certificado-IA-Practica-DaxusLatam.pdf",
    thumb: "certificados/cert-ia.jpg",
  },
  {
    id: "angular-basics",
    name: "Angular Basics",
    org: "Simplilearn · SkillUp",
    date: "18 de julio de 2026",
    summary:
      "Fundamentos del framework: componentes, plantillas, enrutamiento y estructura de una aplicación Angular con TypeScript.",
    skills: ["Angular", "TypeScript", "SPA"],
    image: "certificados/cert-simplilearn.jpg",
    thumb: "certificados/cert-simplilearn.jpg",
    code: "10484667",
    verifyUrl: "https://verify.simplilearn.com/",
    verifyLabel: "Verificar en Simplilearn",
  },
  {
    id: "html-css",
    name: "HTML y CSS Intensivo: camino hacia React",
    org: "Udemy",
    date: "13 de julio de 2026",
    hours: "23 horas",
    summary:
      "Maquetación y estilos desde la base hasta layouts complejos con Grid y Flexbox. La disciplina de CSS puro se nota en este mismo portafolio: no usa framework de estilos.",
    skills: ["HTML5", "CSS3", "Responsive"],
    image: "certificados/cert-udemy.jpg",
    thumb: "certificados/cert-udemy.jpg",
    code: "UC-f953825a-add8-499b-9a8b-f684f875d88b",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-f953825a-add8-499b-9a8b-f684f875d88b/",
    verifyLabel: "Ver en Udemy",
  },
];
