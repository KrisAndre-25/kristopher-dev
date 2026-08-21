"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  IconClipboardCheck,
  IconFileText,
  IconRefresh,
  IconStack2,
  IconMessageCircle,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { techIcon } from "@/lib/tech-icons";
import { useUiStrings } from "@/data/ui-strings";

const SkeletonTests = ({ rows }: { rows: readonly string[] }) => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 2, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -2, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col justify-center space-y-2"
    >
      {rows.map((row, i) => (
        <motion.div
          key={row}
          variants={i % 2 === 0 ? variants : variantsSecond}
          className={cn(
            "flex flex-row items-center space-x-2 rounded-full border border-white/10 bg-neutral-950 p-2",
            i % 2 !== 0 && "ml-auto w-3/4",
          )}
        >
          <div className="h-5 w-5 shrink-0 rounded-full bg-emerald-500/80" />
          <span className="font-mono text-xs text-neutral-300">{row}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonDocs = ({ items }: { items: readonly string[] }) => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["30%", "100%"], transition: { duration: 1.2 } },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col justify-center space-y-2.5"
    >
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2">
          <motion.div
            variants={variants}
            style={{ maxWidth: `${70 - i * 10}%` }}
            className="h-4 w-full rounded-full bg-neutral-800"
          />
          <span className="shrink-0 font-mono text-[0.6rem] text-neutral-500">{item}</span>
        </div>
      ))}
    </motion.div>
  );
};

const SkeletonAgile = ({ caption }: { caption: string }) => {
  return (
    <motion.div
      initial={{ backgroundPosition: "0 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      style={{
        background: "linear-gradient(-45deg, #0284c7, #7c3aed, #0ea5e9, #a855f7)",
        backgroundSize: "400% 400%",
      }}
      className="flex h-full min-h-[6rem] w-full flex-1 items-end rounded-lg p-4"
    >
      <p className="font-mono text-xs text-white/90">{caption}</p>
    </motion.div>
  );
};

const SkeletonStack = () => {
  const names = ["React", "Java", "Playwright"];
  const first = { initial: { x: 15, rotate: -4 }, hover: { x: 0, rotate: 0 } };
  const second = { initial: { x: -15, rotate: 4 }, hover: { x: 0, rotate: 0 } };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-row gap-2"
    >
      {names.map((name, i) => {
        const { icon: Icon, color } = techIcon(name);
        return (
          <motion.div
            key={name}
            variants={i === 0 ? first : i === 2 ? second : undefined}
            className="flex h-full w-1/3 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-neutral-950 p-3"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg border"
              style={{ color, borderColor: `${color}55`, backgroundColor: `${color}1a` }}
            >
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-center text-[0.65rem] font-semibold text-neutral-300">{name}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const SkeletonFeedback = ({ bubbles }: { bubbles: readonly string[] }) => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 2, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -2, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col justify-center space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex max-w-[85%] flex-row items-start gap-2 rounded-2xl border border-white/10 bg-neutral-950 p-2.5"
      >
        <p className="text-xs text-neutral-300">"{bubbles[0]}"</p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex max-w-[85%] flex-row items-start justify-end gap-2 rounded-2xl border border-white/10 bg-neutral-950 p-2.5"
      >
        <p className="text-xs text-neutral-300">"{bubbles[1]}"</p>
      </motion.div>
    </motion.div>
  );
};

export function BentoGridThirdDemo() {
  const t = useUiStrings();
  const [b0, b1, b2, b3, b4] = t.panorama.bento;

  const items = [
    {
      title: b0.title,
      description: b0.description,
      header: <SkeletonTests rows={b0.rows ?? []} />,
      className: "md:col-span-1",
      icon: <IconClipboardCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: b1.title,
      description: b1.description,
      header: <SkeletonDocs items={b1.items ?? []} />,
      className: "md:col-span-1",
      icon: <IconFileText className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: b2.title,
      description: b2.description,
      header: <SkeletonAgile caption={b2.caption ?? ""} />,
      className: "md:col-span-1",
      icon: <IconRefresh className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: b3.title,
      description: b3.description,
      header: <SkeletonStack />,
      className: "md:col-span-2",
      icon: <IconStack2 className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: b4.title,
      description: b4.description,
      header: <SkeletonFeedback bubbles={b4.bubbles ?? []} />,
      className: "md:col-span-1",
      icon: <IconMessageCircle className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[16rem]">
      {items.map((item) => (
        <BentoGridItem
          key={item.title}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
