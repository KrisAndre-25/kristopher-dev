"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ElementType,
  type ReactNode,
} from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.9; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); }
  15%, 45% { transform: scale(1.25); }
  30% { transform: scale(1); }
}
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.footer-aurora {
  background: radial-gradient(circle at 50% 50%, rgba(56,189,248,0.18) 0%, rgba(139,92,246,0.15) 45%, transparent 70%);
}
.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 2px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
  border-color: rgba(56,189,248,0.35);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 1px rgba(56,189,248,0.25);
}
.footer-giant-bg-text {
  font-size: 22vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(255,255,255,0.12));
}
`;

export interface CinematicFooterLink {
  label: string;
  href: string;
  icon: ElementType;
  external?: boolean;
  download?: string;
}

type MagneticButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>) & {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
};

const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(function MagneticButton(
  { className, children, as: Component = "button", ...props },
  forwardedRef,
) {
  const localRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = localRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;
      gsap.to(element, {
        x: x * 0.4,
        y: y * 0.4,
        rotationX: -y * 0.15,
        rotationY: x * 0.15,
        scale: 1.05,
        ease: "power2.out",
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </Component>
  );
});

function MarqueeRow({ items }: { items: readonly string[] }) {
  return (
    <div className="flex items-center gap-12 px-6">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-12">
          {item}
          <span className={i % 2 === 0 ? "text-sky-400/60" : "text-violet-400/60"}>✦</span>
        </span>
      ))}
    </div>
  );
}

export function CinematicFooter({
  title,
  tagline,
  links,
  copyright,
  className,
}: {
  title: string;
  tagline?: string;
  links: CinematicFooterLink[];
  copyright: string;
  className?: string;
}) {
  const t = useUiStrings();
  const { profile } = useContent();
  const giantWord = title.split(" ")[0];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className={cn("relative h-screen w-full", className)}
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-neutral-950 font-sans text-white">
          <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div
            ref={giantTextRef}
            aria-hidden="true"
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            {giantWord}
          </div>

          <div className="absolute top-10 left-0 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-neutral-950/60 py-3 shadow-2xl backdrop-blur-md sm:top-12">
            <div
              aria-hidden="true"
              className="flex w-max animate-footer-scroll-marquee whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.3em] text-neutral-400 sm:text-xs md:text-sm"
            >
              <MarqueeRow items={t.habilidades.hard} />
              <MarqueeRow items={t.habilidades.hard} />
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-16 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 sm:mt-20 sm:px-6">
            <h2
              ref={headingRef}
              className="footer-text-glow mb-3 text-center text-3xl font-black tracking-tighter sm:text-5xl md:text-7xl"
            >
              {t.footer.cta}
            </h2>
            {tagline && (
              <p className="mb-10 max-w-lg text-center text-sm text-neutral-400 sm:text-base">
                {tagline}
              </p>
            )}

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-wrap justify-center gap-3 sm:gap-4">
                {links.map(({ label, href, icon: Icon, external, download }) => (
                  <MagneticButton
                    key={label}
                    as="a"
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    download={download}
                    className="footer-glass-pill group flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-bold text-neutral-200 sm:px-8 sm:py-4 sm:text-sm"
                  >
                    <Icon className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-sky-400" />
                    {label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-4 px-4 pb-6 sm:flex-row sm:px-8 sm:pb-8">
            <div className="order-2 text-center text-[0.6rem] font-semibold uppercase tracking-widest text-neutral-500 sm:order-1 sm:text-left sm:text-[0.65rem]">
              {copyright}
            </div>

            <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full border-white/5 px-5 py-2.5 sm:order-2">
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-500 sm:text-[0.65rem]">
                {t.footer.madeWith}
              </span>
              <span className="animate-footer-heartbeat text-sm text-rose-400 sm:text-base">♥</span>
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-500 sm:text-[0.65rem]">
                {profile.location}
              </span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label={t.footer.backToTop}
              className="footer-glass-pill group order-3 flex h-11 w-11 items-center justify-center rounded-full text-neutral-400 hover:text-white"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
