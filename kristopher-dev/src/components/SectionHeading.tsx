import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  number,
  eyebrow,
  title,
  className,
}: {
  number?: string;
  eyebrow: ReactNode;
  title?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-12 max-w-3xl bg-transparent px-4 text-center md:mb-16", className)}>
      <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
        {number && <span className="font-mono text-teal-400">{number}. </span>}
        {eyebrow}
      </h2>
      {title && (
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-sky-300 sm:text-lg">
          {title}
        </p>
      )}
    </div>
  );
}
