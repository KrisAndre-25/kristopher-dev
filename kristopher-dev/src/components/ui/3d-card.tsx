"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";

const MouseEnterContext = createContext<
  [boolean, (v: boolean) => void] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 18;
    const y = (e.clientY - top - height / 2) / 18;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex items-center justify-center transition-transform duration-200 ease-linear",
            className,
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children?: ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
} & Record<string, unknown>) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(MouseEnterContext);
  const isMouseEntered = context ? context[0] : false;

  const style = {
    transform: isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : undefined,
    transition: "transform 200ms ease-linear",
  };

  return (
    <Tag ref={ref} className={cn("w-fit", className)} style={style} {...rest}>
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (!context) throw new Error("useMouseEnter must be used within CardContainer");
  return context;
};
