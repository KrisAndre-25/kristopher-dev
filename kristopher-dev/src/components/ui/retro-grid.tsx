import { cn } from "@/lib/utils";

export function RetroGrid({
  className,
  angle = 62,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 size-full overflow-hidden opacity-40 [perspective:250px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-retro-grid",
            "[background-image:linear-gradient(to_right,rgba(56,189,248,0.35)_1px,transparent_0),linear-gradient(to_bottom,rgba(56,189,248,0.35)_1px,transparent_0)]",
            "[background-repeat:repeat] [background-size:64px_64px]",
            "[height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
    </div>
  );
}
