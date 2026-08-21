import { DevConsole, type ConsoleCommand } from "@/components/ui/dev-console";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

export function DevConsoleDemo() {
  const { profile, project, experience, stackGroups, certifications } = useContent();
  const t = useUiStrings();
  const speaknosis = experience[0];

  const commands: ConsoleCommand[] = [
    {
      name: "help",
      description: "help",
      run: () => t.devConsole.help,
    },
    {
      name: "about",
      description: "about",
      run: () => [profile.intro],
    },
    {
      name: "skills",
      description: "skills",
      run: () =>
        stackGroups.map(
          (g) => `${g.group}: ${g.items.map((i) => i.name).join(", ")}`,
        ),
    },
    {
      name: "projects",
      description: "projects",
      run: () => [
        `${project.name} — ${project.tagline}`,
        `Stack: ${project.stack.join(", ")}`,
        `${t.proyectos.portfolioTitle} — React, TypeScript, Tailwind CSS, Framer Motion`,
      ],
    },
    {
      name: "experience",
      description: "experience",
      run: () => [
        `${speaknosis.role} — ${speaknosis.org} (${speaknosis.period})`,
        speaknosis.context,
      ],
    },
    {
      name: "certs",
      description: "certs",
      run: () => certifications.map((c) => `${c.name} — ${c.org} (${c.date})`),
    },
    {
      name: "contact",
      description: "contact",
      run: () => [
        `email: ${profile.email}`,
        `linkedin: ${profile.linkedin}`,
        `github: ${profile.github}`,
      ],
    },
  ];

  return <DevConsole commands={commands} />;
}
