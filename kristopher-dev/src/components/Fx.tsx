import type { ReactNode } from "react";
import { useA11y, type Theme } from "../hooks/useA11y";
import { Laser } from "./canvasui/Laser";
import { Clouds } from "./canvasui/Clouds";
import { Glass } from "./canvasui/Glass";
import { Liquid } from "./canvasui/Liquid";
import { Bubble } from "./canvasui/Bubble";
import { Ripple } from "./canvasui/Ripple";

/**
 * Color de acento por tema, en RGB 0..1 (el formato que piden los shaders).
 * Se mantiene sincronizado a mano con themes.css porque leer variables CSS
 * desde JS en cada frame sería caro y provocaría reflows.
 */
const ACCENT: Record<Theme, [number, number, number]> = {
  cian: [0.184, 0.482, 1],
  contraste: [0.486, 0.722, 1],
  ambar: [1, 0.655, 0.149],
  claro: [0.082, 0.322, 0.816],
  violeta: [0.627, 0.42, 1],
};

type Props = { children: ReactNode };

/**
 * Cada efecto se monta solo si el usuario tiene el movimiento activado.
 * Cuando está apagado (por preferencia del sistema o por el panel de
 * accesibilidad), no se crea ningún contexto WebGL: la página queda
 * más liviana, no solo visualmente más quieta.
 */

export function FxLaser({ children }: Props) {
  const { motionEnabled, theme } = useA11y();
  if (!motionEnabled) return <>{children}</>;
  return (
    <Laser color={ACCENT[theme]} offset={90} thickness={1.6} glow={1.1} reveal={140} heat={0.5} speed={0.8}>
      {children}
    </Laser>
  );
}

export function FxClouds({ children }: Props) {
  const { motionEnabled, theme } = useA11y();
  if (!motionEnabled) return <>{children}</>;
  return (
    <Clouds color={ACCENT[theme]} opacity={0.28} cover={0.42} speed={0.35} refraction={0.15} shadow={0.2}>
      {children}
    </Clouds>
  );
}

export function FxGlass({ children }: Props) {
  const { motionEnabled } = useA11y();
  if (!motionEnabled) return <>{children}</>;
  return (
    <Glass shape="circle" size={130} ior={1.18} blur={0.4} aberration={0.6} reflection={0.9}>
      {children}
    </Glass>
  );
}

export function FxGrid({ children }: Props) {
  const { motionEnabled, theme } = useA11y();
  if (!motionEnabled) return <>{children}</>;
  // Amplitud baja a propósito: el código tiene que seguir siendo legible.
  return (
    <Liquid color={ACCENT[theme]} radius={0.22} force={4} intensity={0.5} distortion={0.35} curl={12} rainbow={false}>
      {children}
    </Liquid>
  );
}

export function FxMagnify({ children }: Props) {
  const { motionEnabled, theme } = useA11y();
  if (!motionEnabled) return <>{children}</>;
  return (
    <Bubble size={92} follow={0.14} refraction={0.5} dispersion={0.35} shine={0.9} rim={0.7} iridescence={0.35} tint={ACCENT[theme]} tintStrength={0.25}>
      {children}
    </Bubble>
  );
}

export function FxRipple({ children }: Props) {
  const { motionEnabled } = useA11y();
  if (!motionEnabled) return <>{children}</>;
  return (
    <Ripple amplitude={0.7} speed={1} rings={3} refraction={9} shine={0.8} trigger="click" interval={0}>
      {children}
    </Ripple>
  );
}
