import { useLanguage } from "@/hooks/useLanguage";

export const uiStrings = {
  es: {
    nav: {
      inicio: "Inicio",
      stack: "Stack",
      habilidades: "Habilidades",
      panorama: "Panorama",
      proyectos: "Proyectos",
      certificaciones: "Certificaciones",
      trayectoria: "Trayectoria",
      disponibilidad: "Disponibilidad",
      contacto: "Contacto",
    },
    navbar: {
      searchOpen: "Buscar en el portafolio",
      searchClose: "Cerrar búsqueda",
      contactAria: "Contactar a Kristopher",
      hablemos: "Hablemos",
      contrastLabel: "Alto contraste",
      languageAria: "Cambiar idioma",
    },
    search: {
      placeholder: "Buscar...",
    },
    stickyBanner: {
      message: "Disponible para nuevos proyectos ahora mismo — contrátame, por favor jaja.",
      cta: "Hablemos",
    },
    hero: {
      welcomeTitle: "Bienvenido/a al Portafolio de Kristopher Astudillo",
      subtitle: "Analista Programador - Full Stack Jr - Desarrollo de Software",
    },
    stackSection: {
      eyebrow: "Stack técnico",
      title: "Con qué construyo",
    },
    perfil: {
      ubicacion: "Ubicación",
      disponibilidad: "Disponibilidad",
      metodologia: "Metodología",
      metodologiaValue: "Scrum y Kanban",
      heading: "Full Stack con mentalidad QA",
      techLine: "React & TypeScript • Java & Spring Boot",
      paragraph:
        "Unifico la creación de interfaces web dinámicas y accesibles con una arquitectura backend sólida. Mi experiencia en automatización de pruebas (QA Automation) me otorga una perspectiva preventiva única: diseño soluciones pensando en casos límite, mantenibilidad y cobertura E2E antes de escribir la primera línea de código. Desarrollo bajo estándares de código limpio, escalable y metodologías ágiles.",
      disponibilidadValue: "Inmediata (Remoto / Presencial)",
    },
    habilidades: {
      eyebrow: "Habilidades",
      title: "Técnicas duras y blandas",
      caption:
        "Lo técnico se aprende con práctica; lo humano se construye con equipo. Ambas cosas están en cada entrega.",
      hardTitle: "Hard skills",
      softTitle: "Soft skills",
      hard: [
        "React & TypeScript",
        "Java & Spring Boot",
        "Playwright (E2E)",
        "PostgreSQL / MySQL",
        "Docker",
        "Terraform (IaC)",
      ],
      soft: [
        "Trabajo en equipo",
        "Comunicación técnica",
        "Pensamiento crítico",
        "Adaptabilidad",
        "Organización ágil",
        "Autonomía",
      ],
      githubAria: "Ver GitHub de Kristopher",
      screenshotTitle: "hard_skills.dev — soft_skills.dev",
    },
    panorama: {
      title: "Un vistazo rápido",
      titleRest: " a mi trabajo",
      subtitle: "Cuatro capas de lo mismo: código que funciona, se prueba y se mantiene.",
      features: [
        {
          title: "Testing automatizado de punta a punta",
          description:
            "En Speaknosis implementé el 100% de la suite E2E de la aplicación, con más de 30 casos y 15 pruebas inestables eliminadas.",
        },
        {
          title: "Stack multicapa",
          description:
            "Frontend en React y TypeScript, backend en Java con Spring Boot, y calidad con Playwright de por medio.",
        },
        {
          title: "Formación continua",
          description:
            "Titulado en DuocUC y con certificaciones activas en Angular, IA aplicada y desarrollo web.",
        },
        {
          title: "Disponible en cualquier lugar",
          description:
            "Remoto, híbrido o presencial desde Santiago de Chile, con incorporación inmediata.",
        },
      ],
      locations: ["Santiago", "Remoto", "Híbrido"],
      bento: [
        {
          title: "Automatización de pruebas",
          description: "30+ casos E2E reales corriendo en cada entrega, no solo demos.",
          rows: ["auth.spec.ts ✓", "patients.spec.ts ✓", "reports.spec.ts ✓"],
        },
        {
          title: "Documentación técnica",
          description: "Documento lo que construyo para que otro pueda tomarlo sin fricción.",
          items: ["Arquitectura de testing", "Guía de traspaso", "Casos límite", "Convenciones de commits"],
        },
        {
          title: "Metodologías ágiles",
          description: "Scrum y Kanban aplicados de verdad, no solo en el CV.",
          caption: "Scrum · Kanban · sprints semanales",
        },
        {
          title: "Stack multicapa",
          description: "Cómodo moviéndome entre frontend, backend y testing en el mismo día.",
        },
        {
          title: "Comunicación y feedback",
          description: "Code review como conversación, no como trámite.",
          bubbles: [
            "¿Podemos revisar los casos borde antes del merge?",
            "Hecho, agregué 3 casos más.",
          ],
        },
      ],
    },
    proyectos: {
      eyebrow: "Proyectos",
      title: "Lo que he construido",
      verProyecto: "Ver detalles",
      cerrar: "Cerrar detalle del proyecto",
      speaknosisCategory: "Experiencia profesional",
      speaknosisTitlePrefix: "QA Automation — ",
      portfolioCategory: "Proyecto propio",
      portfolioTitle: "Este portafolio",
      portfolioBlurb: "React, TypeScript, Tailwind CSS y Framer Motion.",
      portfolioDetail:
        "El sitio que estás viendo: construido en React y TypeScript, con componentes de Aceternity UI animados con Framer Motion.",
      comoLoHiceHeading: "Cómo lo hice",
      portfolioHowIBuiltIt:
        "Reconstruí el portafolio de cero con React, TypeScript y Vite sobre Tailwind CSS, adaptando componentes de estilo Aceternity UI y animándolos con Framer Motion. Armé un sistema bilingüe completo (español/inglés) con una fuente de datos única por idioma, y cuidé la accesibilidad: navegación por teclado, foco gestionado en los modales y un modo de alto contraste. Las animaciones más pesadas (canvas, WebGL) se pausan con IntersectionObserver cuando salen de pantalla para que la página no pierda rendimiento.",
      portfolioFeatures: [
        "Sistema bilingüe completo (ES/EN) con una sola fuente de verdad por idioma.",
        "Accesibilidad: navegación por teclado, foco gestionado y modo de alto contraste.",
        "Animaciones pausadas fuera de pantalla para cuidar el rendimiento.",
      ],
      githubLinkLabel: "Ver código en GitHub",
      carouselImageLabel: "Imagen",
      carouselGoTo: "Ir a la imagen",
    },
    certificaciones: {
      eyebrow: "Certificaciones",
      title: "Certificados",
      verificable: "Verificable",
      verCertificado: "Ver certificado",
      verPdf: "Ver PDF",
      verificar: "Verificar",
      cerrar: "Cerrar",
    },
    trayectoria: {
      eyebrow: "Trayectoria",
      title: "Formación y experiencia",
      milestones: [
        {
          period: "2024 — 2026",
          title: "Analista Programador — Desarrollador Full Stack",
          org: "DuocUC",
          body: "Titulado. Base de Java, bases de datos e ingeniería de software.",
        },
        {
          org: "Frontend completo en React y TypeScript, backend en Spring Boot con más de 13 endpoints REST, infraestructura con Terraform.",
        },
        {},
        {
          period: "En curso",
          title: "Ingeniería en Informática",
          org: "DuocUC · mención Desarrollo de Software",
          body: "Continuidad de estudios sobre la base de la carrera técnica.",
        },
        {
          period: "Hoy",
          org: "Santiago de Chile · remoto, híbrido o presencial",
          body: "Incorporación inmediata.",
        },
      ],
    },
    trayectoriaTimeline: {
      items: [
        {
          period: "2026 — Presente",
          heading: "Ingeniería en Informática (Continuidad de Estudios) — DuocUC",
          badge: "En curso",
          paragraph:
            "Profundización en arquitectura de software, gestión de proyectos y desarrollo de sistemas avanzados.",
          subBlock: {
            title:
              "Proyecto Capstone (2026): StudyMatch — Plataforma de match para compañeros de estudio (proyecto de título)",
            stack: [
              "React",
              "TypeScript",
              "Vite",
              "Spring Boot",
              "PostgreSQL",
              "AWS (EC2/Terraform)",
              "Docker",
              "Playwright",
            ],
            bullets: [
              "Desarrollo de frontend completo.",
              "Integración de 13+ endpoints REST.",
              "Suite de pruebas E2E bajo enfoque BDD.",
              "Despliegue en nube.",
            ],
          },
        },
        {
          period: "Marzo 2026 — Mayo 2026",
          heading: "Práctica Profesional — Speaknosis Chile SpA",
          subtitle: "Practicante QA Automation & Software Development",
          bullets: [
            "Implementación del 100% de la suite de pruebas E2E (+30 casos) con Playwright y JavaScript.",
            "Eliminación de +15 flaky tests mediante aserciones dinámicas y data mocking.",
            "Trabajo bajo Git Flow y documentación arquitectónica de testing.",
          ],
        },
        {
          period: "2026",
          heading: "Egreso, titulación y certificación Full Stack",
          bullets: [
            "Titulación: Analista Programador — DuocUC (egresado y titulado).",
            "Salida intermedia: certificado oficial DuocUC de \"Desarrollador Full Stack\".",
          ],
        },
        {
          period: "2025 — 2026",
          heading: "Especialización y certificaciones complementarias",
          paragraph: "Cursos realizados para fortalecer el perfil técnico:",
          bullets: [
            "Angular Basics (Simplilearn).",
            "HTML y CSS Intensivo: camino hacia React (Udemy).",
            "Cursos y certificaciones en testing automatizado e integración continua.",
          ],
        },
        {
          period: "2024",
          heading: "Inicio de formación técnico-profesional",
          bullets: [
            "Inicio de la carrera Analista Programador en DuocUC.",
            "Adquisición de bases sólidas en lógica de programación, POO (Java, JavaScript), modelado de bases de datos relacionales y diseño de software.",
          ],
        },
      ],
      images: {
        studymatchHomeAlt: "Captura de la pantalla principal de StudyMatch",
        studymatchLoginAlt: "Captura del formulario de inicio de sesión de StudyMatch",
        studymatchRegisterAlt: "Captura del formulario de registro de StudyMatch",
        speaknosisImg1Alt: "Captura del trabajo de QA Automation en Speaknosis Chile (1)",
        speaknosisImg2Alt: "Captura del trabajo de QA Automation en Speaknosis Chile (2)",
      },
      tools: {
        heading: "Gestión, documentación y herramientas",
        groups: [
          {
            label: "Gestión de proyectos y Agile",
            items: ["Jira", "Trello", "Notion", "Scrum", "Kanban"],
          },
          {
            label: "Documentación y arquitectura",
            items: ["Draw.io", "Mermaid", "Postman", "Git", "GitHub"],
          },
        ],
      },
    },
    disponibilidad: {
      eyebrow: "Disponibilidad",
      title: "Lugares donde puedo trabajar",
      subtitle:
        "Spoiler: en todo el mundo — remoto sin problema, o presencial si eres de Santiago de Chile.",
    },
    contacto: {
      eyebrow: "Contacto",
      titlePrefix: "Hablemos de tu ",
      highlight: "próximo proyecto",
      card: {
        incorporacion: "Incorporación inmediata en Santiago de Chile, remoto o híbrido.",
        descargarCv: "Descargar CV",
      },
      extras: {
        locationLabel: "Ubicación:",
        shareButton: "Compartir",
        shareText: "Mira el portafolio de Kristopher Astudillo",
        instagramLabel: "Instagram",
        instagramCopiedLabel: "¡Enlace copiado! Pégalo en tu historia o DM",
        ratingHeading: "¿Qué te pareció este portafolio?",
        ratingThanks: "¡Gracias por tu calificación!",
        ratingLevels: ["Malo", "Regular", "Bueno", "Muy bueno", "Excelente"],
        torchMessage: "Para acompañarte en el camino",
      },
      form: {
        heading: "Escríbeme directo",
        subheading: "Se abrirá tu cliente de correo con el mensaje ya redactado.",
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        captchaLabel: "Verificación: ¿cuánto es",
        submit: "Enviar mensaje",
        sendingPrefix: "Enviando",
        sendingWords: ["tu mensaje", "los datos", "tu correo"],
        errorRequired: "Completa nombre, correo y mensaje.",
        errorCaptcha: "La respuesta de verificación no es correcta.",
        errorHoneypot: "No se pudo enviar el mensaje.",
        success: "Listo, revisa tu cliente de correo para enviarlo.",
      },
    },
    footer: {
      builtWith: "Construido con React · TypeScript · Tailwind CSS · Framer Motion",
      cta: "¿Construimos algo juntos?",
      madeWith: "Hecho con",
      backToTop: "Volver arriba",
    },
    devConsole: {
      triggerAria: "Abrir consola interactiva (Ctrl+K)",
      closeAria: "Cerrar consola",
      windowTitle: "kristopher@portfolio — consola",
      inputAria: "Escribir comando",
      hint: "Escribe 'help' para ver los comandos disponibles.",
      notFound: (name: string) => [
        `command not found: ${name}`,
        "Escribe 'help' para ver los comandos disponibles.",
      ],
      help: [
        "Comandos disponibles:",
        "  help        muestra esta lista",
        "  about       quién es Kristopher",
        "  skills      stack técnico",
        "  projects    proyectos destacados",
        "  experience  experiencia laboral",
        "  certs       certificaciones",
        "  contact     cómo contactarlo",
        "  clear       limpia la consola",
      ],
    },
    a11y: {
      contrastLabel: "Alternar contraste alto (fondo blanco)",
    },
    assistant: {
      greeting: (name: string) =>
        `Hola. Soy el asistente del portafolio de ${name}. Puedo responder sobre su stack, experiencia, proyectos y disponibilidad.`,
      openAria: "Abrir asistente",
      closeAria: "Cerrar asistente",
      panelAria: "Asistente del portafolio",
      name: "Asistente",
      online: "en línea",
      typingAria: "Escribiendo",
      placeholder: "Escribe tu pregunta…",
      inputAria: "Escribe tu pregunta",
      sendAria: "Enviar",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      stack: "Stack",
      habilidades: "Skills",
      panorama: "Overview",
      proyectos: "Projects",
      certificaciones: "Certifications",
      trayectoria: "Journey",
      disponibilidad: "Availability",
      contacto: "Contact",
    },
    navbar: {
      searchOpen: "Search the portfolio",
      searchClose: "Close search",
      contactAria: "Contact Kristopher",
      hablemos: "Let's talk",
      contrastLabel: "High contrast",
      languageAria: "Switch language",
    },
    search: {
      placeholder: "Search...",
    },
    stickyBanner: {
      message: "Available for new projects right now — hire me, please, haha.",
      cta: "Let's talk",
    },
    hero: {
      welcomeTitle: "Welcome to Kristopher Astudillo's Portfolio",
      subtitle: "Systems Analyst - Full Stack Jr - Software Development",
    },
    stackSection: {
      eyebrow: "Tech stack",
      title: "What I build with",
    },
    perfil: {
      ubicacion: "Location",
      disponibilidad: "Availability",
      metodologia: "Methodology",
      metodologiaValue: "Scrum & Kanban",
      heading: "Full Stack with a QA mindset",
      techLine: "React & TypeScript • Java & Spring Boot",
      paragraph:
        "I bring together dynamic, accessible web interfaces and a solid backend architecture. My background in test automation (QA Automation) gives me a unique preventive perspective: I design solutions thinking about edge cases, maintainability, and E2E coverage before writing the first line of code. I build to clean, scalable code standards and agile methodologies.",
      disponibilidadValue: "Immediate (Remote / On-site)",
    },
    habilidades: {
      eyebrow: "Skills",
      title: "Hard and soft skills",
      caption:
        "The technical side comes from practice; the human side comes from working with a team. Both show up in every delivery.",
      hardTitle: "Hard skills",
      softTitle: "Soft skills",
      hard: [
        "React & TypeScript",
        "Java & Spring Boot",
        "Playwright (E2E)",
        "PostgreSQL / MySQL",
        "Docker",
        "Terraform (IaC)",
      ],
      soft: [
        "Teamwork",
        "Technical communication",
        "Critical thinking",
        "Adaptability",
        "Agile organization",
        "Autonomy",
      ],
      githubAria: "View Kristopher's GitHub",
      screenshotTitle: "hard_skills.dev — soft_skills.dev",
    },
    panorama: {
      title: "A quick look",
      titleRest: " at my work",
      subtitle: "Four layers of the same thing: code that works, gets tested, and stays maintainable.",
      features: [
        {
          title: "Automated end-to-end testing",
          description:
            "At Speaknosis I implemented 100% of the application's E2E suite, with 30+ cases and 15 flaky tests removed.",
        },
        {
          title: "Multi-layer stack",
          description:
            "Frontend in React and TypeScript, backend in Java with Spring Boot, and quality backed by Playwright.",
        },
        {
          title: "Continuous learning",
          description:
            "Graduated from DuocUC, with active certifications in Angular, applied AI, and web development.",
        },
        {
          title: "Available anywhere",
          description:
            "Remote, hybrid, or on-site from Santiago, Chile, with an immediate start.",
        },
      ],
      locations: ["Santiago", "Remote", "Hybrid"],
      bento: [
        {
          title: "Test automation",
          description: "30+ real E2E cases running on every deploy, not just demos.",
          rows: ["auth.spec.ts ✓", "patients.spec.ts ✓", "reports.spec.ts ✓"],
        },
        {
          title: "Technical documentation",
          description: "I document what I build so someone else can pick it up without friction.",
          items: ["Testing architecture", "Handoff guide", "Edge cases", "Commit conventions"],
        },
        {
          title: "Agile methodologies",
          description: "Scrum and Kanban applied for real, not just on the résumé.",
          caption: "Scrum · Kanban · weekly sprints",
        },
        {
          title: "Multi-layer stack",
          description: "Comfortable moving between frontend, backend, and testing in the same day.",
        },
        {
          title: "Communication & feedback",
          description: "Code review as a conversation, not a checkbox.",
          bubbles: [
            "Can we review the edge cases before merging?",
            "Done, I added 3 more cases.",
          ],
        },
      ],
    },
    proyectos: {
      eyebrow: "Projects",
      title: "What I've built",
      verProyecto: "View details",
      cerrar: "Close project detail",
      speaknosisCategory: "Professional experience",
      speaknosisTitlePrefix: "QA Automation — ",
      portfolioCategory: "Personal project",
      portfolioTitle: "This portfolio",
      portfolioBlurb: "React, TypeScript, Tailwind CSS, and Framer Motion.",
      portfolioDetail:
        "The site you're looking at: built with React and TypeScript, with Aceternity UI components animated with Framer Motion.",
      comoLoHiceHeading: "How I built it",
      portfolioHowIBuiltIt:
        "I rebuilt the portfolio from scratch with React, TypeScript, and Vite on top of Tailwind CSS, adapting Aceternity-UI-style components and animating them with Framer Motion. I put together a full bilingual system (Spanish/English) with a single data source per language, and paid attention to accessibility: keyboard navigation, managed focus in modals, and a high-contrast mode. The heaviest animations (canvas, WebGL) pause via IntersectionObserver when off-screen so the page doesn't lose performance.",
      portfolioFeatures: [
        "Full bilingual system (ES/EN) with a single source of truth per language.",
        "Accessibility: keyboard navigation, managed focus, and a high-contrast mode.",
        "Animations pause off-screen to keep performance in check.",
      ],
      githubLinkLabel: "View code on GitHub",
      carouselImageLabel: "Image",
      carouselGoTo: "Go to image",
    },
    certificaciones: {
      eyebrow: "Certifications",
      title: "Certificates",
      verificable: "Verifiable",
      verCertificado: "View certificate",
      verPdf: "View PDF",
      verificar: "Verify",
      cerrar: "Close",
    },
    trayectoria: {
      eyebrow: "Journey",
      title: "Education & experience",
      milestones: [
        {
          period: "2024 — 2026",
          title: "Systems Analyst — Full Stack Developer",
          org: "DuocUC",
          body: "Graduated. Foundations in Java, databases, and software engineering.",
        },
        {
          org: "Full frontend in React and TypeScript, backend in Spring Boot with 13+ REST endpoints, infrastructure with Terraform.",
        },
        {},
        {
          period: "In progress",
          title: "B.Eng. in Computer Science",
          org: "DuocUC · Software Development track",
          body: "Continuing studies on top of the technical degree.",
        },
        {
          period: "Today",
          org: "Santiago, Chile · remote, hybrid, or on-site",
          body: "Immediate start.",
        },
      ],
    },
    trayectoriaTimeline: {
      items: [
        {
          period: "2026 — Present",
          heading: "B.Eng. in Computer Science (Continuing Studies) — DuocUC",
          badge: "In progress",
          paragraph:
            "Deepening expertise in software architecture, project management, and advanced systems development.",
          subBlock: {
            title:
              "Capstone project (2026): StudyMatch — a matching platform for study partners (thesis project)",
            stack: [
              "React",
              "TypeScript",
              "Vite",
              "Spring Boot",
              "PostgreSQL",
              "AWS (EC2/Terraform)",
              "Docker",
              "Playwright",
            ],
            bullets: [
              "Built the entire frontend.",
              "Integrated 13+ REST endpoints.",
              "E2E test suite under a BDD approach.",
              "Cloud deployment.",
            ],
          },
        },
        {
          period: "March 2026 — May 2026",
          heading: "Professional Internship — Speaknosis Chile SpA",
          subtitle: "QA Automation & Software Development Intern",
          bullets: [
            "Implemented 100% of the E2E test suite (30+ cases) with Playwright and JavaScript.",
            "Removed 15+ flaky tests through dynamic assertions and data mocking.",
            "Worked under Git Flow with documented testing architecture.",
          ],
        },
        {
          period: "2026",
          heading: "Graduation, degree, and Full Stack certification",
          bullets: [
            "Degree: Systems Analyst — DuocUC (graduated).",
            "Intermediate credential: official DuocUC \"Full Stack Developer\" certificate.",
          ],
        },
        {
          period: "2025 — 2026",
          heading: "Specialization and complementary certifications",
          paragraph: "Courses taken to strengthen the technical profile:",
          bullets: [
            "Angular Basics (Simplilearn).",
            "Intensive HTML & CSS: the road to React (Udemy).",
            "Courses and certifications in automated testing and continuous integration.",
          ],
        },
        {
          period: "2024",
          heading: "Start of technical/professional training",
          bullets: [
            "Started the Systems Analyst program at DuocUC.",
            "Built solid foundations in programming logic, OOP (Java, JavaScript), relational database modeling, and software design.",
          ],
        },
      ],
      images: {
        studymatchHomeAlt: "Screenshot of the StudyMatch home screen",
        studymatchLoginAlt: "Screenshot of the StudyMatch login form",
        studymatchRegisterAlt: "Screenshot of the StudyMatch registration form",
        speaknosisImg1Alt: "Screenshot of QA Automation work at Speaknosis Chile (1)",
        speaknosisImg2Alt: "Screenshot of QA Automation work at Speaknosis Chile (2)",
      },
      tools: {
        heading: "Management, documentation & tooling",
        groups: [
          {
            label: "Project management & Agile",
            items: ["Jira", "Trello", "Notion", "Scrum", "Kanban"],
          },
          {
            label: "Documentation & architecture",
            items: ["Draw.io", "Mermaid", "Postman", "Git", "GitHub"],
          },
        ],
      },
    },
    disponibilidad: {
      eyebrow: "Availability",
      title: "Places I can work from",
      subtitle: "Spoiler: anywhere in the world — remote, no problem, or on-site if you're in Santiago, Chile.",
    },
    contacto: {
      eyebrow: "Contact",
      titlePrefix: "Let's talk about your ",
      highlight: "next project",
      card: {
        incorporacion: "Immediate start in Santiago, Chile, remote or hybrid.",
        descargarCv: "Download CV",
      },
      extras: {
        locationLabel: "Location:",
        shareButton: "Share",
        shareText: "Check out Kristopher Astudillo's portfolio",
        instagramLabel: "Instagram",
        instagramCopiedLabel: "Link copied! Paste it in your story or DM",
        ratingHeading: "What did you think of this portfolio?",
        ratingThanks: "Thanks for your rating!",
        ratingLevels: ["Bad", "Okay", "Good", "Great", "Excellent"],
        torchMessage: "To light your way",
      },
      form: {
        heading: "Write to me directly",
        subheading: "This will open your email client with the message ready to send.",
        name: "Name",
        email: "Email",
        message: "Message",
        captchaLabel: "Verification: what is",
        submit: "Send message",
        sendingPrefix: "Sending",
        sendingWords: ["your message", "the details", "your email"],
        errorRequired: "Fill in your name, email, and message.",
        errorCaptcha: "The verification answer isn't correct.",
        errorHoneypot: "The message couldn't be sent.",
        success: "Done — check your email client to send it.",
      },
    },
    footer: {
      builtWith: "Built with React · TypeScript · Tailwind CSS · Framer Motion",
      cta: "Shall we build something together?",
      madeWith: "Made with",
      backToTop: "Back to top",
    },
    devConsole: {
      triggerAria: "Open interactive console (Ctrl+K)",
      closeAria: "Close console",
      windowTitle: "kristopher@portfolio — console",
      inputAria: "Type a command",
      hint: "Type 'help' to see the available commands.",
      notFound: (name: string) => [
        `command not found: ${name}`,
        "Type 'help' to see the available commands.",
      ],
      help: [
        "Available commands:",
        "  help        shows this list",
        "  about       who Kristopher is",
        "  skills      tech stack",
        "  projects    featured projects",
        "  experience  work experience",
        "  certs       certifications",
        "  contact     how to reach him",
        "  clear       clears the console",
      ],
    },
    a11y: {
      contrastLabel: "Toggle high contrast (white background)",
    },
    assistant: {
      greeting: (name: string) =>
        `Hi. I'm ${name}'s portfolio assistant. I can answer questions about his stack, experience, projects, and availability.`,
      openAria: "Open assistant",
      closeAria: "Close assistant",
      panelAria: "Portfolio assistant",
      name: "Assistant",
      online: "online",
      typingAria: "Typing",
      placeholder: "Type your question…",
      inputAria: "Type your question",
      sendAria: "Send",
    },
  },
} as const;

export function useUiStrings() {
  const { language } = useLanguage();
  return uiStrings[language];
}
