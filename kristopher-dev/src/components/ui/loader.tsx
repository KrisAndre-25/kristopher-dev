import "./loader.css";

const DEFAULT_WORDS = [
  "Cargando",
  "React",
  "TypeScript",
  "Java",
  "Spring Boot",
  "Playwright",
  "QA Automation",
  "Node.js",
  "Kristopher",
];

export function LoaderComponent({
  label = "Preparando",
  words = DEFAULT_WORDS,
}: {
  label?: string;
  words?: string[];
}) {
  const list = words.length >= 9 ? words.slice(0, 9) : words;

  return (
    <div className="loader" role="status" aria-label={`${label}...`}>
      <span className="loader__label">{label}</span>
      <span className="loader__window">
        <span className="loader__track">
          {list.map((word, i) => (
            <span key={word + i}>{word}</span>
          ))}
        </span>
      </span>
    </div>
  );
}
