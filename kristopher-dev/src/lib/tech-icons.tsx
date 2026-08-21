import {
  Atom,
  FileType,
  Braces,
  Palette,
  Triangle,
  Coffee,
  Leaf,
  Hexagon,
  Layers,
  Database,
  FlaskConical,
  Container,
  Mountain,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export const TECH_ICON: Record<string, { icon: LucideIcon; color: string }> = {
  React: { icon: Atom, color: "#61DAFB" },
  TypeScript: { icon: FileType, color: "#3178C6" },
  JavaScript: { icon: Braces, color: "#F7DF1E" },
  CSS: { icon: Palette, color: "#1572B6" },
  Angular: { icon: Triangle, color: "#DD0031" },
  Java: { icon: Coffee, color: "#ED8B00" },
  "Spring Boot": { icon: Leaf, color: "#6DB33F" },
  "Node.js": { icon: Hexagon, color: "#339933" },
  Kotlin: { icon: Layers, color: "#7F52FF" },
  PostgreSQL: { icon: Database, color: "#336791" },
  MySQL: { icon: Database, color: "#4479A1" },
  MongoDB: { icon: Database, color: "#47A248" },
  MariaDB: { icon: Database, color: "#003545" },
  Playwright: { icon: FlaskConical, color: "#2EAD33" },
  Docker: { icon: Container, color: "#2496ED" },
  Terraform: { icon: Mountain, color: "#7B42BC" },
  "AWS Academy": { icon: Cloud, color: "#FF9900" },
  "JUnit 5": { icon: FlaskConical, color: "#25A162" },
};

export function techIcon(name: string) {
  return TECH_ICON[name] ?? { icon: Braces, color: "#38bdf8" };
}
