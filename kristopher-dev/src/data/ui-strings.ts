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
      subtitle: "Desarrollador Full Stack · Pensamiento QA · Soluciones con IA",
    },
    stackSection: {
      eyebrow: "Stack técnico",
      title: "Con qué construyo",
    },
    perfil: {
      ubicacion: "Ubicación",
      disponibilidad: "Disponibilidad",
      metodologia: "Metodología",
      metodologiaValue: "Ágil · tableros Kanban",
      heading: "Full Stack con pensamiento QA que construye con IA",
      techLine: "React & TypeScript • Java & Spring Boot • Claude Code, Codex y agentes",
      paragraph:
        "Construyo productos de punta a punta: interfaces en React y TypeScript, backend en Java con Spring Boot e IA integrada donde aporta valor real (modelos vía API, agentes y automatizaciones), que es el trabajo de un AI Engineer. Uso Claude Code y Codex a diario y creo agentes, skills y plugins para desarrollar más rápido sin perder calidad. Mi pensamiento QA, que se formó en mi práctica en Speaknosis, me hace diseñar pensando en casos límite y en cómo probarlo desde el inicio. Me organizo con metodología ágil en tableros Kanban.",
      disponibilidadValue: "Inmediata (Remoto / Presencial)",
    },
    habilidades: {
      eyebrow: "Habilidades",
      title: "Lo humano también se programa",
      caption:
        "El stack se actualiza cada año; comunicar, colaborar y mejorar procesos es lo que hace que ese stack entregue valor.",
      hardTitle: "Hard skills",
      softTitle: "Soft skills",
      hard: [
        "React & TypeScript",
        "Java & Spring Boot",
        "Claude Code, Codex y agentes IA",
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
      transferTitle: "Habilidades transferibles",
      transferLead:
        "Desde 2017 trabajando con personas: eso hoy se nota en cómo comunico, colaboro y diseño procesos.",
      transferable: [
        {
          title: "Comunicación clara",
          description:
            "Desde 2017 trabajo de cara al público: eso me enseñó a escuchar y a explicar sin tecnicismos. Hoy traduzco lo técnico para equipos no técnicos, presento en vivo (como en la EXPO APS 2026) y documento la arquitectura para que cualquiera pueda continuar el trabajo sin fricción.",
        },
        {
          title: "Trabajo multidisciplinario",
          description:
            "He construido software junto a ingenieros industriales, equipos de salud y líderes técnicos. Escucho primero, entiendo el problema desde su disciplina y después propongo: así el resultado resuelve la necesidad real y no solo la técnica.",
        },
        {
          title: "Metodología ágil · Kanban",
          description:
            "Organizo mi trabajo con metodología ágil en tableros Kanban: tareas visibles, prioridades claras, poco trabajo en curso y entregas continuas. En DMAIX, mi dupla (Ing. Civil Industrial) propuso Lean Six Sigma para la operación de la planta; yo traduje esos procesos a software y gestioné el desarrollo con Kanban.",
        },
        {
          title: "Calma bajo presión",
          description:
            "Turnos de alta demanda en caja y atención, y eventos en vivo como la transcripción de más de 177.000 palabras en la EXPO APS, me enseñaron a priorizar, mantener el foco y resolver problemas sin perder el trato con las personas.",
        },
        {
          title: "Enseñar y acompañar",
          description:
            "Capacité a compañeros nuevos en cada trabajo y, en el programa Duplas Intergeneracionales, acompañé a mi dupla en el uso de herramientas digitales e IA. Compartir conocimiento acelera al equipo completo, no solo a mí.",
        },
        {
          title: "Mejora continua",
          description:
            "Itero con feedback real: DMAIX pasó de V1 a V2 según lo que pedía el taller, y en Speaknosis estabilicé más de 15 pruebas inestables. Propongo mejoras cuando veo una oportunidad y mido el impacto antes de dar algo por cerrado.",
        },
      ],
      portrait: {
        role: "Desarrollador Full Stack · pensamiento QA",
        quote:
          "Me apasiona transformar ideas en software funcional, cuidando cada detalle: desde una interfaz limpia hasta la lógica que la sostiene.",
        location: "Santiago, Chile",
        availability: "Incorporación inmediata",
        stats: [
          { value: "2017", label: "trabajando con personas" },
          { value: "30+", label: "casos E2E en producción" },
          { value: "177K", label: "palabras transcritas en vivo" },
        ],
      },
      stackTitle: "Stack técnico",
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
      prevLabel: "Proyecto anterior",
      nextLabel: "Proyecto siguiente",
      dmaix: {
        category: "Duplas Intergeneracionales · Entel × Desafío Latam",
        blurb: "Trazabilidad digital en tiempo real para plantas metalúrgicas, impulsada por IA.",
        highlightsHeading: "Lo que hace",
        title: "DMAIX",
        link: "https://dmaix.netlify.app",
        linkLabel: "Visitar dmaix.netlify.app",
        description:
          "Plataforma nacida del programa Duplas Intergeneracionales de Entel y Desafío Latam. Construida en equipo junto a un Ing. Civil Industrial. DMAIX elimina el traspapeleo y la ceguera operativa llevando todo a una trazabilidad digital en tiempo real impulsada por IA. Mi dupla aportó Lean Six Sigma para la operación de planta y yo desarrollé el software con metodología ágil (Kanban). Software 100% modular probado en plantas metalúrgicas (Cerrado con nota 7.0).",
        cards: [
          { title: "DMAIX", alt: "Portada del proyecto DMAIX" },
          {
            title: "De los procesos de planta al software",
            alt: "Ciclo DMAIC de Lean Six Sigma usado en la operación de planta",
            body: "Mi dupla aportó Lean Six Sigma (DMAIC, OEE/OTD) para la operación de la planta; yo lo traduje a modelo de datos y dashboards, y gestioné el desarrollo con metodología ágil en tableros Kanban.",
          },
          {
            title: "Trazabilidad en tiempo real",
            alt: "Línea de tiempo de una orden de trabajo en DMAIX",
            body: "Órdenes de trabajo digitales con accesos por rol, alertas automáticas a Slack ante paradas y analítica con la API de Gemini Flash.",
          },
          {
            title: "Probado en planta · Nota 7.0",
            alt: "DMAIX: probado en planta metalúrgica, nota final 7.0",
            body: "Software 100% modular, iterado de V1 a V2 con feedback real del taller: dashboards táctiles, responsivos y con modo de alto contraste.",
          },
        ],
        stack: ["React", "Vite", "Supabase", "Resend", "Slack", "Gemini Flash"],
      },
    },
    certificaciones: {
      eyebrow: "Certificaciones",
      title: "Certificados",
      verificable: "Verificable",
      verCertificado: "Ver certificado",
      listLabel: "Todos los certificados",
      gridHint: "Haz clic en un certificado para verlo · pasa el cursor para pausar",
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
          period: "2026 · EXPO APS",
          heading: "EXPO APS 2026 junto a Speaknosis",
          badge: "177.000+ palabras",
          gallery: "aps2026",
          paragraph:
            "Despliegue presencial en la EXPO APS 2026 transcribiendo la data de todas las charlas. Trabajo junto a un equipo multidisciplinario logrando un procesamiento masivo de más de 177.000 palabras transcritas. Una experiencia increíble comprobando el potencial de la tecnología aplicada a eventos de gran envergadura.",
        },
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
          gallery: "speaknosis",
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
        aps1Alt: "Equipo de Speaknosis en el escenario de la EXPO APS 2026",
        aps2Alt: "Stand de Speaknosis en la EXPO APS 2026",
        aps3Alt: "Puesto de transcripción en vivo durante una charla de la EXPO APS 2026",
        studymatchShots: [
          "StudyMatch: panel principal con una propuesta de match",
          "StudyMatch: aviso de nueva coincidencia académica",
          "StudyMatch: mis conexiones de estudio",
          "StudyMatch: chat entre compañeros que hicieron match",
          "StudyMatch: salas y sesiones de estudio",
          "StudyMatch: edición del perfil estudiantil",
          "StudyMatch: centro de mando del administrador",
          "StudyMatch: gestión de la estructura académica",
          "StudyMatch: gestión de espacios del campus",
          "StudyMatch: panel docente de solicitudes de tutoría",
        ],
      },
      tools: {
        heading: "Gestión, documentación y herramientas",
        groups: [
          {
            label: "Gestión de proyectos y Agile",
            items: ["Metodología ágil", "Tableros Kanban", "Trello", "Jira", "Notion"],
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
        whatsapp: "Escríbeme por WhatsApp",
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
      blurb:
        "Desarrollador Full Stack con pensamiento QA que construye con IA. Santiago de Chile · remoto, híbrido o presencial.",
      navTitle: "Navegación",
      projectsTitle: "Proyectos",
      contactTitle: "Contacto",
      repoLabel: "Código del portafolio",
      emailLabel: "Correo",
      localTime: "Santiago",
      localTimeAria: "Mi hora local",
      socialsAria: "Redes y contacto",
    },
    aiChat: {
      triggerLabel: "Pregúntale a la IA",
      title: "Asistente de Kristopher",
      subtitle: "Respuestas sobre su perfil, proyectos y disponibilidad",
      disclaimer: "Respuestas generadas por IA (Gemini) con la información de este portafolio. Pueden contener errores; para algo importante, escríbele directo.",
      placeholder: "Escribe tu pregunta…",
      inputLabel: "Tu pregunta",
      send: "Enviar pregunta",
      stop: "Detener respuesta",
      close: "Cerrar chat",
      greeting: "¡Hola! Soy el asistente de Kristopher. Pregúntame por su experiencia, sus proyectos, su stack o su disponibilidad.",
      suggestionsLabel: "Prueba con",
      suggestions: [
        "¿Qué experiencia tiene Kristopher?",
        "Cuéntame sobre DMAIX",
        "¿Cómo usa la IA en su trabajo?",
        "¿Está disponible para trabajar?",
      ],
      thinking: "Escribiendo respuesta",
      localNote: "Respuesta preparada del portafolio (sin IA)",
      errors: {
        not_configured: "El chat todavía no está configurado. Mientras tanto, puedes escribirle por correo o WhatsApp.",
        rate_limited: "Alcanzaste el límite de preguntas por ahora. Intenta de nuevo en unos minutos.",
        upstream_busy: "El servicio de IA está ocupado en este momento. Intenta de nuevo en un rato.",
        generic: "No pude responder en este momento. Intenta de nuevo o escríbele directo por correo o WhatsApp.",
      },
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
      subtitle: "Full Stack Developer · QA mindset · AI-powered solutions",
    },
    stackSection: {
      eyebrow: "Tech stack",
      title: "What I build with",
    },
    perfil: {
      ubicacion: "Location",
      disponibilidad: "Availability",
      metodologia: "Methodology",
      metodologiaValue: "Agile · Kanban boards",
      heading: "Full Stack with a QA mindset, building with AI",
      techLine: "React & TypeScript • Java & Spring Boot • Claude Code, Codex & agents",
      paragraph:
        "I build products end to end: React and TypeScript interfaces, a Java and Spring Boot backend, and AI integrated where it adds real value (models via API, agents and automations), which is the work of an AI Engineer. I use Claude Code and Codex every day and build agents, skills and plugins to ship faster without losing quality. My QA mindset, formed during my internship at Speaknosis, makes me design around edge cases and how to test from day one. I organize my work with agile methodology on Kanban boards.",
      disponibilidadValue: "Immediate (Remote / On-site)",
    },
    habilidades: {
      eyebrow: "Skills",
      title: "The human side ships too",
      caption:
        "Stacks change every year; communicating, collaborating and improving processes is what makes that stack deliver value.",
      hardTitle: "Hard skills",
      softTitle: "Soft skills",
      hard: [
        "React & TypeScript",
        "Java & Spring Boot",
        "Claude Code, Codex & AI agents",
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
      transferTitle: "Transferable skills",
      transferLead:
        "Working with people since 2017: it shows in how I communicate, collaborate and design processes.",
      transferable: [
        {
          title: "Clear communication",
          description:
            "I've worked face-to-face with the public since 2017: it taught me to listen and to explain without jargon. Today I translate technical topics for non-technical teams, present live (like at APS EXPO 2026) and document architecture so anyone can pick up the work without friction.",
        },
        {
          title: "Multidisciplinary teamwork",
          description:
            "I've built software alongside industrial engineers, healthcare teams and tech leads. I listen first, understand the problem from their discipline, and then propose: that way the result solves the real need, not just the technical one.",
        },
        {
          title: "Agile methodology · Kanban",
          description:
            "I organize my work with agile methodology on Kanban boards: visible tasks, clear priorities, limited work in progress and continuous delivery. In DMAIX, my teammate (an Industrial Civil Engineer) proposed Lean Six Sigma for plant operations; I translated those processes into software and managed development with Kanban.",
        },
        {
          title: "Calm under pressure",
          description:
            "High-demand shifts in retail and service, plus live events like transcribing 177,000+ words at APS EXPO, taught me to prioritize, stay focused and solve problems without losing the human touch.",
        },
        {
          title: "Teaching & mentoring",
          description:
            "I trained new coworkers at every job and, in the Intergenerational Duos program, coached my teammate on digital and AI tools. Sharing knowledge speeds up the whole team, not just me.",
        },
        {
          title: "Continuous improvement",
          description:
            "I iterate on real feedback: DMAIX went from V1 to V2 based on what the shop floor needed, and at Speaknosis I stabilized 15+ flaky tests. I suggest improvements when I spot them and measure impact before calling it done.",
        },
      ],
      portrait: {
        role: "Full Stack Developer · QA mindset",
        quote:
          "I love turning ideas into working software, caring about every detail: from a clean interface to the logic that powers it.",
        location: "Santiago, Chile",
        availability: "Available immediately",
        stats: [
          { value: "2017", label: "working with people" },
          { value: "30+", label: "E2E cases in production" },
          { value: "177K", label: "words transcribed live" },
        ],
      },
      stackTitle: "Tech stack",
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
      prevLabel: "Previous project",
      nextLabel: "Next project",
      dmaix: {
        category: "Intergenerational Duos · Entel × Desafío Latam",
        blurb: "Real-time digital traceability for metalworking plants, powered by AI.",
        highlightsHeading: "What it does",
        title: "DMAIX",
        link: "https://dmaix.netlify.app",
        linkLabel: "Visit dmaix.netlify.app",
        description:
          "A platform born from Entel and Desafío Latam's Intergenerational Duos program, built as a team alongside an Industrial Civil Engineer. DMAIX eliminates paper shuffling and operational blindness by moving everything to real-time, AI-powered digital traceability. My teammate brought Lean Six Sigma for plant operations and I built the software with agile methodology (Kanban). 100% modular software tested in metalworking plants (closed with a perfect 7.0 grade).",
        cards: [
          { title: "DMAIX", alt: "DMAIX project cover" },
          {
            title: "From plant processes to software",
            alt: "Lean Six Sigma DMAIC cycle used for plant operations",
            body: "My teammate brought Lean Six Sigma (DMAIC, OEE/OTD) for plant operations; I translated it into the data model and dashboards, and managed development with agile methodology on Kanban boards.",
          },
          {
            title: "Real-time traceability",
            alt: "Timeline of a DMAIX work order",
            body: "Digital work orders with role-based access, automatic Slack alerts on downtime and analytics powered by the Gemini Flash API.",
          },
          {
            title: "Plant-tested · Grade 7.0",
            alt: "DMAIX: tested in a metalworking plant, final grade 7.0",
            body: "100% modular software, iterated from V1 to V2 with real shop-floor feedback: touch-friendly, responsive dashboards with a high-contrast mode.",
          },
        ],
        stack: ["React", "Vite", "Supabase", "Resend", "Slack", "Gemini Flash"],
      },
    },
    certificaciones: {
      eyebrow: "Certifications",
      title: "Certificates",
      verificable: "Verifiable",
      verCertificado: "View certificate",
      listLabel: "All certificates",
      gridHint: "Click a certificate to open it · hover to pause",
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
          period: "2026 · APS EXPO",
          heading: "APS EXPO 2026 with Speaknosis",
          badge: "177,000+ words",
          gallery: "aps2026",
          paragraph:
            "On-site deployment at APS EXPO 2026, transcribing the data from every talk. Working alongside a multidisciplinary team, we processed more than 177,000 transcribed words at scale. An incredible experience proving the potential of technology applied to large-scale events.",
        },
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
          gallery: "speaknosis",
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
        aps1Alt: "Speaknosis team on stage at APS EXPO 2026",
        aps2Alt: "Speaknosis booth at APS EXPO 2026",
        aps3Alt: "Live transcription station during a talk at APS EXPO 2026",
        studymatchShots: [
          "StudyMatch: main dashboard with a match proposal",
          "StudyMatch: new academic match notice",
          "StudyMatch: my study connections",
          "StudyMatch: chat between matched classmates",
          "StudyMatch: study rooms and sessions",
          "StudyMatch: editing the student profile",
          "StudyMatch: admin command center",
          "StudyMatch: academic structure management",
          "StudyMatch: campus space management",
          "StudyMatch: teacher panel for tutoring requests",
        ],
      },
      tools: {
        heading: "Management, documentation & tooling",
        groups: [
          {
            label: "Project management & Agile",
            items: ["Agile methodology", "Kanban boards", "Trello", "Jira", "Notion"],
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
        whatsapp: "Message me on WhatsApp",
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
      blurb:
        "Full Stack Developer with a QA mindset, building with AI. Santiago, Chile · remote, hybrid or on-site.",
      navTitle: "Navigation",
      projectsTitle: "Projects",
      contactTitle: "Contact",
      repoLabel: "Portfolio source code",
      emailLabel: "Email",
      localTime: "Santiago",
      localTimeAria: "My local time",
      socialsAria: "Social and contact links",
    },
    aiChat: {
      triggerLabel: "Ask the AI",
      title: "Kristopher's assistant",
      subtitle: "Answers about his profile, projects and availability",
      disclaimer: "AI-generated answers (Gemini) based on this portfolio. They may contain mistakes; for anything important, contact him directly.",
      placeholder: "Type your question…",
      inputLabel: "Your question",
      send: "Send question",
      stop: "Stop answer",
      close: "Close chat",
      greeting: "Hi! I'm Kristopher's assistant. Ask me about his experience, projects, stack or availability.",
      suggestionsLabel: "Try asking",
      suggestions: [
        "What experience does Kristopher have?",
        "Tell me about DMAIX",
        "How does he use AI in his work?",
        "Is he available to work?",
      ],
      thinking: "Writing answer",
      localNote: "Prepared answer from the portfolio (no AI)",
      errors: {
        not_configured: "The chat isn't set up yet. Meanwhile, you can reach him by email or WhatsApp.",
        rate_limited: "You've reached the question limit for now. Please try again in a few minutes.",
        upstream_busy: "The AI service is busy right now. Please try again shortly.",
        generic: "I couldn't answer right now. Please try again or contact him directly by email or WhatsApp.",
      },
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
