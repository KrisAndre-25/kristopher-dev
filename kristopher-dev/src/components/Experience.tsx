import { experience } from "../data/content";
import ImpactBar from "./ImpactBar";
import "./Experience.css";

export default function Experience() {
  return (
    <ol className="exp">
      {experience.map((job) => (
        <li className="exp__item" key={job.org}>
          <span className="exp__marker" aria-hidden="true" />

          <div className="exp__card card">
            <div className="exp__head">
              <div>
                <h3 className="exp__role">{job.role}</h3>
                <p className="exp__org">{job.org}</p>
              </div>
              <span className="exp__period mono">{job.period}</span>
            </div>

            <p className="exp__context">{job.context}</p>

            {job.impact ? (
              <div className="exp__impact">
                {job.impact.map((m, i) => (
                  <ImpactBar
                    key={m.label}
                    label={m.label}
                    value={m.value}
                    suffix={m.suffix}
                    delay={i * 140}
                  />
                ))}
              </div>
            ) : null}

            <ul className="exp__points">
              {job.points.map((p) => (
                <li className="exp__point" key={p}>
                  <span className="exp__check" aria-hidden="true">
                    <svg viewBox="0 0 12 12">
                      <path d="M2.5 6.2l2.3 2.3 4.7-5" />
                    </svg>
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <ul className="exp__tools">
              {job.tools.map((t) => (
                <li className="chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
