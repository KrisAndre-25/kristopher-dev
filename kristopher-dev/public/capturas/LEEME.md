# Capturas

Deja aquí tus imágenes (por ejemplo `playwright-suite.png`, `studymatch-home.png`)
y luego enlázalas desde `src/data/content.ts`, en el arreglo `slides`:

```ts
{
  id: "s-playwright",
  eyebrow: "Testing",
  title: "Suite E2E corriendo",
  body: "…",
  meta: "Speaknosis · 2026",
  tags: ["Playwright"],
  image: "capturas/playwright-suite.png",   // ← ruta relativa a public/
  imageAlt: "Reporte de Playwright con todas las pruebas en verde",
}
```

Recomendaciones:
- Formato **WebP** o **JPG** (no PNG) para fotos y capturas de pantalla: pesan mucho menos.
- Ancho máximo **1400 px**. Más que eso no aporta nitidez y sí retrasa la carga.
- Proporción cercana a **16:10**, que es la que usa la tarjeta.
- Si la captura tiene datos sensibles (nombres de pacientes, correos reales), difumínalos antes.
