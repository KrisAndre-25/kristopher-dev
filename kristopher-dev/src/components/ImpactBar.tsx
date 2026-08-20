import { useCountUp } from "../hooks/useCountUp";
import "./ImpactBar.css";

type Props = {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
};

/** Barra de progreso que se llena y cuenta hacia arriba al entrar en vista. */
export default function ImpactBar({ label, value, suffix = "", delay = 0 }: Props) {
  const { ref, value: shown } = useCountUp<HTMLDivElement>(value);
  const pct = Math.min(100, (shown / value) * 100);

  return (
    <div className="ib" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="ib__head">
        <span className="ib__label">{label}</span>
        <span className="ib__value mono">
          {shown}
          {suffix}
        </span>
      </div>
      <div className="ib__track">
        <div className="ib__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
