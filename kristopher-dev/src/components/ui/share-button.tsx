"use client";

import { useState } from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ShareButton({
  shareTitle,
  buttonLabel,
  instagramLabel,
  instagramCopiedLabel,
  className,
}: {
  shareTitle: string;
  buttonLabel: string;
  instagramLabel?: string;
  instagramCopiedLabel?: string;
  className?: string;
}) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const [instagramCopied, setInstagramCopied] = useState(false);

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setInstagramCopied(true);
      window.setTimeout(() => setInstagramCopied(false), 2000);
    } catch {
      /* si el portapapeles falla, igual lo llevamos a Instagram */
    }
    window.open("https://www.instagram.com/", "_blank", "noreferrer");
  };

  const links = [
    {
      key: "x",
      label: "X (Twitter)",
      icon: IconBrandX,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareTitle)}`,
      hover: "group-hover/link:bg-black",
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: IconBrandFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      hover: "group-hover/link:bg-[#1877f2]",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: IconBrandLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      hover: "group-hover/link:bg-[#0077b5]",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: IconBrandWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${url}`)}`,
      hover: "group-hover/link:bg-[#25D366]",
    },
  ];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">{buttonLabel}</p>
      <ul className="flex items-center gap-3 rounded-full bg-black px-5 py-3">
        {links.map(({ key, label, icon: Icon, href, hover }) => (
          <li key={key} className="group/link relative">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 hover:-translate-y-0.5",
                hover,
              )}
            >
              <Icon className="h-5 w-5" />
            </a>
            <span className="pointer-events-none absolute left-1/2 top-[-38px] -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-neutral-950 opacity-0 shadow-lg transition-all duration-300 group-hover/link:top-[-46px] group-hover/link:opacity-100">
              {label}
            </span>
          </li>
        ))}

        <li className="group/link relative">
          <button
            type="button"
            onClick={handleInstagramShare}
            aria-label={instagramLabel ?? "Instagram"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 hover:-translate-y-0.5 group-hover/link:bg-gradient-to-tr group-hover/link:from-amber-400 group-hover/link:via-pink-600 group-hover/link:to-purple-600"
          >
            <IconBrandInstagram className="h-5 w-5" />
          </button>
          <span className="pointer-events-none absolute left-1/2 top-[-38px] -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-neutral-950 opacity-0 shadow-lg transition-all duration-300 group-hover/link:top-[-46px] group-hover/link:opacity-100">
            {instagramCopied ? (instagramCopiedLabel ?? "¡Copiado!") : (instagramLabel ?? "Instagram")}
          </span>
        </li>
      </ul>
    </div>
  );
}
