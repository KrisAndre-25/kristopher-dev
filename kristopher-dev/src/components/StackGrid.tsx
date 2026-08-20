import { useState } from "react";
import { stackGroups, levelLabel, type Tech } from "../data/content";
import "./StackGrid.css";

export default function StackGrid() {
  const [active, setActive] = useState<Tech>(stackGroups[0].items[0]);

  return (
    <div className="stk">
      <div className="stk__groups">
        {stackGroups.map((g) => (
          <div className="stk__group" key={g.group}>
            <p className="stk__groupName mono">{g.group}</p>
            <ul className="stk__list">
              {g.items.map((tech) => (
                <li key={tech.name}>
                  <button
                    className={`stk__chip stk__chip--${tech.level} ${
                      active.name === tech.name ? "is-active" : ""
                    }`}
                    onMouseEnter={() => setActive(tech)}
                    onFocus={() => setActive(tech)}
                    onClick={() => setActive(tech)}
                    aria-pressed={active.name === tech.name}
                  >
                    <span className="stk__led" aria-hidden="true" />
                    {tech.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <aside className="stk__detail card" aria-live="polite">
        <span className="eyebrow">Detalle</span>
        <h3 className="stk__name">{active.name}</h3>
        <span className={`stk__level stk__level--${active.level}`}>
          <span className="stk__led" aria-hidden="true" />
          {levelLabel[active.level]}
        </span>
        <p className="stk__note">{active.note}</p>
        <p className="stk__hint mono">
          Recorre las tecnologías para ver dónde apliqué cada una.
        </p>
      </aside>
    </div>
  );
}
