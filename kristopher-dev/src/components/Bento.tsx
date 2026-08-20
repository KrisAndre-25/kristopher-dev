import { bento } from "../data/content";
import "./Bento.css";

export default function Bento() {
  return (
    <div className="bento">
      {bento.map((card, i) => (
        <article
          className={`bento__card card bento__card--${card.span}`}
          key={card.id}
          style={{ ["--i" as string]: i }}
        >
          <span className="eyebrow bento__eyebrow">{card.eyebrow}</span>

          {card.kind === "metric" ? (
            <>
              <p className="bento__metric">{card.metric}</p>
              <h3 className="bento__title bento__title--sm">{card.title}</h3>
              <p className="bento__note">{card.metricNote}</p>
            </>
          ) : (
            <h3 className="bento__title">{card.title}</h3>
          )}

          {card.body ? <p className="bento__body">{card.body}</p> : null}

          {card.items ? (
            <ul className="bento__list">
              {card.items.map((item) => (
                <li className="bento__item" key={item}>
                  <span className="bento__bullet" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {card.kind === "status" ? (
            <span className="pill bento__pill">
              <span className="pill__led" aria-hidden="true" />
              Incorporación inmediata
            </span>
          ) : null}

          <span className="bento__corner" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}
