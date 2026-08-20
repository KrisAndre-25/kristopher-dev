import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import "./Section.css";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
};

export default function Section({ id, index, eyebrow, title, lede, children }: Props) {
  const head = useReveal<HTMLDivElement>(0);
  const body = useReveal<HTMLDivElement>(120);

  return (
    <section className="sec" id={id}>
      <div className="shell">
        <div className="sec__head reveal" ref={head}>
          <div className="sec__meta">
            <span className="sec__index mono" aria-hidden="true">
              {index}
            </span>
            <span className="eyebrow">{eyebrow}</span>
            <span className="sec__rule" aria-hidden="true" />
          </div>

          <h2 className="sec__title">{title}</h2>
          {lede ? <p className="sec__lede">{lede}</p> : null}
        </div>

        <div className="reveal" ref={body}>
          {children}
        </div>
      </div>
    </section>
  );
}
