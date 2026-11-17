/** Capturas de StudyMatch (versiones WebP livianas de public/studymatch/*.png).
 *  El orden coincide con `trayectoriaTimeline.images.studymatchShots` en ui-strings. */
export const STUDYMATCH_SHOTS = [
  "studymatch/web/01_panel_principal_propuesta_match.webp",
  "studymatch/web/02_nuevo_match.webp",
  "studymatch/web/03_mis_matches.webp",
  "studymatch/web/04_chat_match.webp",
  "studymatch/web/05_sesiones_de_estudio.webp",
  "studymatch/web/06_editar_perfil.webp",
  "studymatch/web/07_admin_centro_de_mando.webp",
  "studymatch/web/08_admin_estructura_academica.webp",
  "studymatch/web/09_admin_gestion_espacios.webp",
  "studymatch/web/10_docente_solicitudes_tutoria.webp",
] as const;

export function studymatchImages(alts: readonly string[]) {
  return STUDYMATCH_SHOTS.map((src, i) => ({ src, alt: alts[i] ?? "StudyMatch" }));
}
