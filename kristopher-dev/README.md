# kristopher-dev

Portafolio personal de **Kristopher Astudillo** — Desarrollador Full Stack.

Estética cyber/tech sobre fondo negro, con azul eléctrico como único acento.
React + TypeScript + CSS puro, sin frameworks de estilos.

---

## Correr en local

```bash
npm install
npm run dev
```

## Compilar

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/ para revisar
```

---

## Dónde editar cada cosa

**Todo el contenido está en un solo archivo: `src/data/content.ts`.**
No necesitas tocar los componentes para actualizar el sitio.

| Qué quieres cambiar | Dónde |
|---|---|
| Nombre, correo, teléfono, LinkedIn, intro | `profile` |
| Métricas del hero | `heroStats` |
| Tarjetas del Bento Grid | `bento` |
| Proyecto StudyMatch (arquitectura, desafíos, aprendizajes) | `project` |
| Diapositivas del carrusel | `slides` |
| Fragmentos de código | `src/data/code.ts` |
| Experiencia laboral | `experience` |
| Stack técnico y niveles | `stackGroups` |
| Respuestas del asistente | `intents` |
| Mensaje de WhatsApp, asunto y cuerpo del correo | `whatsappMessage`, `mailSubject`, `mailBody` |
| Velocidad de la figura caminante | `useWalkCycle(260)` en `WalkingFigure.tsx` (px de scroll por zancada) |
| Mensaje de WhatsApp, asunto del correo | `whatsappMessage`, `mailSubject`, `mailBody` |

**Colores y tipografía:** `src/styles/tokens.css`.
Cambia `--blue` y todo el sitio se recolorea.

**Tu foto:** reemplaza `public/kristopher.jpg` (cuadrada, idealmente 1000×1000).

**Tu CV:** reemplaza `public/cv/CV-Kristopher-Astudillo.pdf`. Si cambias el nombre
del archivo, actualiza `profile.cv` y `profile.cvName` en `content.ts`.

**Tu CV:** reemplaza `public/cv/CV-Kristopher-Astudillo.pdf`. El botón del hero y el
de la sección de contacto lo descargan directamente.

**Capturas de pantalla:** déjalas en `public/capturas/` y enlázalas desde `slides`
con el campo `image`. Lee `public/capturas/LEEME.md` para el detalle.

---

## El acompañante caminante (`WalkingFigure.tsx`)

Personaje geométrico en SVG puro (sin modelos 3D, sin librerías externas),
fijo en el borde izquierdo de la pantalla desde el Hero. Dos mecánicas
independientes, combinadas:

1. **Posición vertical** — sube y baja según el progreso total de scroll de
   toda la página (0% arriba, 100% abajo), acotado para no tapar la navbar
   ni cortarse en el borde inferior (`TOP_MARGIN` / `BOTTOM_MARGIN` en el
   propio componente).
2. **Ciclo de marcha** — cada articulación (muslo, rodilla, brazo) es una
   rotación calculada con funciones seno desfasadas, no un frame pre-dibujado.
   La fase avanza según el **delta de scroll acumulado**, no por tiempo ni
   por el mouse: si el usuario se detiene, la figura se detiene a mitad de
   zancada; si sube, camina hacia atrás.

Se congela en una pose de reposo con `prefers-reduced-motion`, y se oculta
por completo bajo los 880px de ancho (`WalkingFigure.css`) — a ese tamaño de
pantalla el gutter del layout es demasiado angosto para un elemento fijo al
borde sin taparle contenido a nadie.

**Brazos con codo articulado.** El brazo tiene dos segmentos (hombro→codo,
codo→mano), igual que la pierna (muslo→rodilla). Sin el codo, un brazo recto
balanceándose hacia adelante deja la mano justo a la altura de la cadera —
se leía como "manos juntas sobre la pelvis" en vez de caminar. El codo
siempre algo flectado (`elbowL`/`elbowR` en `gait()`) evita ese solape en
cualquier punto de la zancada (margen mínimo verificado: 3.3px en toda la
zancada completa).

**Geometría facetada tipo cristal.** Cada segmento (muslo, antebrazo, torso,
cabeza) es un par o trío de triángulos con tonos distintos (`.facet--hi`,
`.facet--mid`, `.facet--lo`) en vez de un bloque plano de un solo color —
se lee como un corte de gema, no como un stick-figure. Los pivotes de
articulación (`transform-origin`) no cambiaron respecto a la versión
anterior, así que toda la mecánica de marcha sigue intacta.

Se mantiene fija al borde izquierdo (sin el cruce horizontal que se probó
y se descartó por preferencia de diseño).

## Decisiones técnicas

**Sin Spline ni modelos 3D.** Un embed pesa entre 2 y 5 MB y bloquea el hilo
principal, lo que degrada el LCP en móvil. La profundidad se logra con
`perspective`, `translateZ` y capas de paralaje en CSS: 0 KB extra.

**El asistente usa una base de conocimiento local.** Un sitio estático no puede
guardar una clave de API sin exponerla en el bundle. Las respuestas viven en
`intents` dentro de `content.ts`. Si más adelante montas un backend, reemplaza el
cuerpo de la función `resolve()` en `src/components/Assistant.tsx` por una llamada
a tu endpoint — está marcado con un comentario.

**El repositorio de StudyMatch no se enlaza** porque es privado. En su lugar el
sitio muestra arquitectura, desafíos técnicos y aprendizajes.

**Infraestructura descrita con precisión:** Terraform como Infrastructure as Code
sobre un laboratorio académico de AWS Academy (DuocUC). No se afirma que el
proyecto siga desplegado, porque el laboratorio expira.

---

## Rendimiento y accesibilidad

- Bundle: ~58 KB JS + ~8 KB CSS (gzip)
- Sin overflow horizontal en 360, 390, 834, 1024 y 1440 px
- Contraste AA en todos los textos (mínimo 5.1:1 sobre negro)
- Un solo `<h1>`, jerarquía de encabezados correcta
- `prefers-reduced-motion` desactiva animaciones, paralaje y cursor personalizado
- El cursor magnético solo se activa con puntero fino (no en táctiles)
- Carrusel navegable con teclado (← →), con pausa al enfocar y swipe en móvil
- Foco visible en todos los elementos interactivos

---

## Desplegar

`vite.config.ts` usa `base: './'`, así que funciona en cualquier host estático.

**Vercel (recomendado):** importa el repositorio y detecta Vite automáticamente.

**GitHub Pages:** publica la carpeta `dist/`.
