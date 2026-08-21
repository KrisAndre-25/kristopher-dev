"use client";

import { useTheme } from "next-themes";
import { LineShadowText } from "@/components/ui/line-shadow-text";

export function HeroTitle() {
  const { resolvedTheme } = useTheme();
  const shadowColor = resolvedTheme === "dark" ? "white" : "black";

  return (
    <h1 className="text-center text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-left lg:text-7xl">
      KRISTOPHER{" "}
      <LineShadowText as="span" className="italic" shadowColor={shadowColor}>
        ASTUDILLO
      </LineShadowText>
    </h1>
  );
}
