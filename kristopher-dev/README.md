<div align="center">

# Kristopher Astudillo — Portfolio Web & QA Automation

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Portafolio profesional con foco en Frontend y QA Automation.**
Interfaces rápidas, accesibles y con una experiencia de usuario cuidada.

[**🚀 Ver sitio en vivo**](https://kristopher-astudillo-portfolio.netlify.app) · [Reportar un bug](https://github.com/KrisAndre-25/kristopher-dev/issues)

</div>

---

## 📖 Descripción

Portafolio personal construido como una single-page application, pensado para
comunicar en pocos segundos quién soy, qué construyo y cómo pienso el software.
Viene de QA automatizado, así que el sitio mismo funciona como muestra de ese
cuidado: casos límite considerados, accesibilidad AA, rendimiento medido y
código mantenible.

**Arquitectura de componentes:** todo el contenido editable vive centralizado
en `src/data/content.ts` (con su contraparte en inglés, `content.en.ts`), separado
por completo de la capa visual. Los componentes en `src/components/` son
presentacionales y reciben ese contenido como props, organizados en:

- `src/components/ui/` — librería de componentes reutilizables estilo Aceternity UI (cards, timeline, cursor magnético, efectos de scroll).
- `src/components/sections/` — ensamblaje de esas piezas en las secciones del sitio (Hero, Proyectos, Timeline, Contacto).
- `src/data/` — contenido bilingüe, snippets de código y strings de UI, desacoplados de la lógica de render.

## 🛠️ Tecnologías

| Core | UI & Componentes | Herramientas |
|---|---|---|
| React 18 | Tailwind CSS + `tailwindcss-animate` | Vite (bundler) |
| TypeScript | Framer Motion / Motion | ESLint / `tsc` |
| React Three Fiber + Three.js | Tabler Icons & Lucide Icons | Netlify (CI/CD) |
| — | GSAP | Git Flow + Conventional Commits |

## ✨ Funcionalidades destacadas

- 🔍 **Modal interactivo "Cómo lo hice"** — cada proyecto abre una vista con arquitectura, desafíos técnicos y aprendizajes reales, no solo capturas de pantalla.
- 📅 **Timeline responsivo** — recorrido de experiencia laboral y stack técnico que se adapta de escritorio a móvil sin perder legibilidad.
- 📄 **Descarga directa de CV** — botón en el Hero y en Contacto que descarga el PDF actualizado sin salir del sitio.
- 🌐 **Contenido bilingüe (ES/EN)** — sistema de i18n propio sobre un único archivo de contenido por idioma.
- ♿ **Accesibilidad cuidada** — contraste AA, foco visible, navegación por teclado y soporte de `prefers-reduced-motion` en todas las animaciones.

## 🚀 Guía de ejecución local

**Requisitos:** Node.js 20+ y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/KrisAndre-25/kristopher-dev.git
cd kristopher-dev/kristopher-dev

# 2. Instalar dependencias
npm install

# 3. Levantar el entorno de desarrollo
npm run dev
```

El sitio queda disponible en `http://localhost:5173`.

```bash
# Compilar para producción
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente para revisar el build
```

## 📬 Contacto

<div align="center">

**Kristopher Astudillo Durán**
Frontend Developer & QA Automation

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kristopher-astudillo-dur%C3%A1n-b69083312/)
[![GitHub](https://img.shields.io/badge/GitHub-KrisAndre--25-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KrisAndre-25)
[![Email](https://img.shields.io/badge/Email-Escribir-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kristopherastudillo@gmail.com)

</div>

---

<div align="center">

Distribuido bajo licencia MIT. Ver [`LICENSE`](./LICENSE) para más detalles.

</div>
