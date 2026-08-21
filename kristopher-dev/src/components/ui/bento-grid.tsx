import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/10 bg-neutral-950 p-4 shadow-sm transition duration-200 hover:shadow-xl hover:shadow-sky-500/[0.06]",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-1">
        {icon}
        <div className="mt-2 mb-1 font-sans font-semibold text-neutral-100">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-400">
          {description}
        </div>
      </div>
    </div>
  );
};
