import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { techIcon } from "@/lib/tech-icons";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

export function FeaturesSectionDemo() {
  const t = useUiStrings();
  const [f0, f1, f2, f3] = t.panorama.features;

  const features = [
    {
      title: f0.title,
      description: f0.description,
      skeleton: <SkeletonStats />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-white/10",
    },
    {
      title: f1.title,
      description: f1.description,
      skeleton: <SkeletonStack />,
      className: "border-b col-span-1 lg:col-span-2 border-white/10",
    },
    {
      title: f2.title,
      description: f2.description,
      skeleton: <SkeletonCerts />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-white/10",
    },
    {
      title: f3.title,
      description: f3.description,
      skeleton: <SkeletonGlobe />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none border-white/10",
    },
  ];

  return (
    <div className="relative z-20 mx-auto max-w-6xl">
      <div className="px-4">
        <SectionHeading
          number="03"
          eyebrow={t.nav.panorama}
          title={`${t.panorama.title}${t.panorama.titleRest}`}
        />
        <p className="mx-auto -mt-6 mb-4 max-w-2xl text-center text-sm text-neutral-400 sm:text-base">
          {t.panorama.subtitle}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-6">
        {features.map((feature) => (
          <FeatureCard className={feature.className} key={feature.title}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <div className="h-full w-full">{feature.skeleton}</div>
          </FeatureCard>
        ))}
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <div className={cn("relative overflow-hidden bg-neutral-950 p-4 sm:p-8", className)}>
    {children}
  </div>
);

const FeatureTitle = ({ children }: { children?: ReactNode }) => (
  <p className="text-left text-lg font-semibold tracking-tight text-white md:text-xl">
    {children}
  </p>
);

const FeatureDescription = ({ children }: { children?: ReactNode }) => (
  <p className="my-2 max-w-sm text-left text-sm text-neutral-400">{children}</p>
);

function SkeletonStats() {
  const { experience } = useContent();
  const impact = experience[0]?.impact ?? [];
  return (
    <div className="mt-4 flex flex-col gap-4">
      {impact.map((stat, i) => (
        <div key={stat.label}>
          <div className="mb-1 flex items-end justify-between">
            <span className="text-xs text-neutral-400">{stat.label}</span>
            <span className="font-mono text-lg font-bold text-sky-400">
              {stat.value}
              {stat.suffix}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(stat.value, 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonStack() {
  const { stackGroups } = useContent();
  const names = stackGroups.flatMap((g) => g.items.map((t) => t.name)).slice(0, 8);
  return (
    <div className="relative mt-4 flex flex-wrap gap-3 overflow-hidden">
      {names.map((name, idx) => {
        const { icon: Icon, color } = techIcon(name);
        return (
          <motion.div
            key={name}
            style={{ rotate: (idx % 2 === 0 ? 1 : -1) * (4 + (idx % 3) * 3) }}
            whileHover={{ scale: 1.12, rotate: 0, zIndex: 10 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-neutral-900 shadow-md"
          >
            <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.75} />
          </motion.div>
        );
      })}
    </div>
  );
}

function SkeletonCerts() {
  const { certifications } = useContent();
  return (
    <div className="relative mt-4 flex h-40 items-center justify-center">
      {certifications.map((cert, idx) => (
        <motion.img
          key={cert.id}
          src={cert.thumb ?? cert.image}
          alt={cert.name}
          style={{
            rotate: (idx - 1) * 8,
            zIndex: idx,
            marginLeft: idx === 0 ? 0 : -28,
          }}
          whileHover={{ y: -10, rotate: 0, zIndex: 10 }}
          className="h-28 w-24 rounded-lg border border-white/15 object-cover shadow-xl"
        />
      ))}
    </div>
  );
}

function SkeletonGlobe() {
  const t = useUiStrings();
  return (
    <div className="relative mt-4 flex h-52 flex-col items-center justify-center gap-3">
      {t.panorama.locations.map((loc, i) => (
        <motion.div
          key={loc}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
          </span>
          <span className="font-mono text-xs text-neutral-300">{loc}</span>
        </motion.div>
      ))}
    </div>
  );
}
