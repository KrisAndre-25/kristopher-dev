export type Lang = "ts" | "tsx" | "java";

export type Sample = {
  id: string;
  label: string;
  file: string;
  lang: Lang;
  caption: string;
  code: string;
};

export const samples: Sample[] = [
  {
    id: "playwright",
    label: "Playwright",
    file: "pacientes.spec.ts",
    lang: "ts",
    caption:
      "Así estabilicé las pruebas en Speaknosis: sin esperas fijas, la aserción espera al estado real de la aplicación.",
    code: `import { test, expect } from '@playwright/test';
import { login } from '../fixtures/auth';

test.describe('Módulo de pacientes', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/pacientes');
    // Esperar la red inactiva evita los flaky tests
    await page.waitForLoadState('networkidle');
  });

  test('registra un paciente y lo muestra en la tabla', async ({ page }) => {
    await page.getByRole('button', { name: 'Nuevo paciente' }).click();

    await page.getByLabel('Nombre').fill('Paciente de prueba');
    await page.getByLabel('RUT').fill('11.111.111-1');
    await page.getByRole('button', { name: 'Guardar' }).click();

    // La aserción espera al elemento, no al reloj
    const fila = page.getByRole('row', { name: /Paciente de prueba/ });
    await expect(fila).toBeVisible();
    await expect(page.getByText('Paciente creado')).toBeVisible();
  });
});`,
  },
  {
    id: "react",
    label: "React · StudyMatch",
    file: "useMatches.ts",
    lang: "ts",
    caption:
      "El emparejamiento nunca devuelve una lista vacía: si no hay coincidencias exactas, relaja los filtros por niveles.",
    code: `import { useEffect, useState } from 'react';
import type { Match, Filtros } from '../types';

const NIVELES: (keyof Filtros)[] = ['horario', 'modalidad', 'curso'];

export function useMatches(filtros: Filtros) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function buscar() {
      setCargando(true);
      let activos = { ...filtros };

      // Relaja un criterio a la vez antes de rendirse
      for (let i = 0; i <= NIVELES.length; i++) {
        const res = await fetch('/api/matches?' + new URLSearchParams(activos), {
          signal: controller.signal,
        });
        const data: Match[] = await res.json();

        if (data.length > 0 || i === NIVELES.length) {
          setMatches(data);
          break;
        }
        delete activos[NIVELES[i]];
      }

      setCargando(false);
    }

    buscar().catch(() => setCargando(false));
    return () => controller.abort();
  }, [filtros]);

  return { matches, cargando };
}`,
  },
  {
    id: "spring",
    label: "Spring Boot",
    file: "SesionController.java",
    lang: "java",
    caption:
      "Uno de los más de 13 endpoints REST de StudyMatch, con validación y el usuario resuelto desde el token JWT.",
    code: `@RestController
@RequestMapping("/api/sesiones")
public class SesionController {

    private final SesionService sesionService;

    public SesionController(SesionService sesionService) {
        this.sesionService = sesionService;
    }

    @PostMapping
    public ResponseEntity<SesionDTO> crear(
            @Valid @RequestBody CrearSesionRequest request,
            @AuthenticationPrincipal Usuario usuario) {

        SesionDTO creada = sesionService.crear(request, usuario.getId());
        URI ubicacion = URI.create("/api/sesiones/" + creada.id());

        return ResponseEntity.created(ubicacion).body(creada);
    }

    @GetMapping("/{id}/postulaciones")
    public List<PostulacionDTO> postulaciones(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario usuario) {

        return sesionService.postulacionesDe(id, usuario.getId());
    }
}`,
  },
];
