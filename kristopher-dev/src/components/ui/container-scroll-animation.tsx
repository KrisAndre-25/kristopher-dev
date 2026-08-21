"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = (): [number, number] => (isMobile ? [0.85, 1] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center p-2 md:p-14"
    >
      <div className="relative w-full py-6 md:py-16" style={{ perspective: 1000 }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: ReactNode;
}) => (
  <motion.div
    style={{ translateY: translate }}
    className="mx-auto max-w-3xl text-center"
  >
    {titleComponent}
  </motion.div>
);

const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000024, 0 149px 60px #0000000a",
    }}
    className="mx-auto mt-8 h-[24rem] w-full max-w-4xl rounded-[30px] border-4 border-neutral-800 bg-neutral-900 p-2 shadow-2xl sm:h-[30rem] md:h-[38rem] md:p-4"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-neutral-950">
      {children}
    </div>
  </motion.div>
);
