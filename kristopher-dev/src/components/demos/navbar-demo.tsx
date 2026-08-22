"use client";

import { useState } from "react";
import {
  IconHome,
  IconTerminal2,
  IconSparkles,
  IconLayoutGrid,
  IconFolderCode,
  IconCertificate,
  IconRoute,
  IconWorld,
  IconMail,
} from "@tabler/icons-react";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { FloatingDock, type FloatingDockItem } from "@/components/ui/floating-dock";
import { ContrastToggle } from "@/components/ui/contrast-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

const iconClass = "h-full w-full text-neutral-300";

function scrollToContact() {
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function NavbarDemo() {
  const { profile } = useContent();
  const t = useUiStrings();
  const [isOpen, setIsOpen] = useState(false);

  const items: FloatingDockItem[] = [
    { title: t.nav.inicio, href: "#inicio", icon: <IconHome className={iconClass} /> },
    { title: t.nav.stack, href: "#tecnologias", icon: <IconTerminal2 className={iconClass} /> },
    { title: t.nav.habilidades, href: "#habilidades", icon: <IconSparkles className={iconClass} /> },
    { title: t.nav.panorama, href: "#panorama", icon: <IconLayoutGrid className={iconClass} /> },
    { title: t.nav.proyectos, href: "#proyectos", icon: <IconFolderCode className={iconClass} /> },
    { title: t.nav.certificaciones, href: "#certificaciones", icon: <IconCertificate className={iconClass} /> },
    { title: t.nav.trayectoria, href: "#trayectoria", icon: <IconRoute className={iconClass} /> },
    { title: t.nav.disponibilidad, href: "#disponibilidad", icon: <IconWorld className={iconClass} /> },
    { title: t.nav.contacto, href: "#contacto", icon: <IconMail className={iconClass} /> },
  ];

  return (
    <Navbar className="top-12">
      <NavBody>
        <NavbarLogo>
          <img
            src="/favicon-16x16.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          {profile.name}
        </NavbarLogo>

        <FloatingDock
          items={items}
          className="border-none bg-transparent px-0 py-0 backdrop-blur-none"
        />

        <div className="relative z-20 hidden items-center gap-2 lg:flex">
          <ContrastToggle />
          <LanguageToggle />

          <button
            type="button"
            onClick={scrollToContact}
            aria-label={t.navbar.contactAria}
            className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 shadow-[0_2px_20px_-4px_rgba(255,255,255,0.3)] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            {t.navbar.hablemos}
          </button>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo>
          <img
            src="/favicon-16x16.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          {profile.name}
        </NavbarLogo>
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-3 py-2 text-base font-medium text-neutral-200 hover:text-white"
            >
              <span className="h-4 w-4">{item.icon}</span>
              {item.title}
            </a>
          ))}

          <div className="flex w-full items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs font-medium text-neutral-400">{t.navbar.contrastLabel}</span>
            <ContrastToggle />
          </div>

          <div className="flex w-full items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">{t.navbar.languageAria}</span>
            <LanguageToggle />
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              scrollToContact();
            }}
            aria-label={t.navbar.contactAria}
            className="mt-2 w-full rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            {t.navbar.hablemos}
          </button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
