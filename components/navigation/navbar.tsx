"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { smoothScrollTo } from "./smooth-scroll";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>("about");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const currentTab = hoveredTab ?? activeTab;

  const links = [
    { id: "about", label: "About" },
    { id: "career", label: "Career" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id));

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;

      for (const section of sections) {
        if (!section) continue;

        const { top, bottom } = section.getBoundingClientRect();
        const offsetTop = top + window.scrollY;
        const offsetBottom = bottom + window.scrollY;

        if (scrollY >= offsetTop && scrollY < offsetBottom) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-6 left-0 right-0 z-30 flex items-center justify-center pointer-events-none"
    >
      <nav
        className="
          pointer-events-auto flex items-center 
          /* Mobile: Wide & Spread out */
          w-[95%] max-w-md justify-between gap-2 px-4
          /* Desktop: Compact & Centered */
          md:max-w-2xl md:w-auto md:justify-center md:gap-6 md:px-6 
          
          py-3 rounded-full border border-white/10 bg-zinc-950/50 
          backdrop-blur-xl shadow-2xl shadow-black/50
        "
      >
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("body");
          }}
          className="
            cursor-pointer
            pr-2 pb-1 text-lg 
            md:pr-6 md:pl-6 md:text-xl 
            text-zinc-200 transition-colors hover:text-white font-wind-song font-bold tracking-wide
          "
        >
          Jagajith
        </Link>

        <div className="h-4 w-px bg-white/10 shrink-0" />

        <ul className="relative flex items-center gap-px sm:gap-1 md:gap-2 font-aoboshi">
          {links.map((link) => {
            const isActive = currentTab === link.id;

            return (
              <li key={link.id} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                    }}
                  />
                )}

                <button
                  onClick={() => smoothScrollTo(`#${link.id}`)}
                  onMouseEnter={() => setHoveredTab(link.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="
                    relative z-10 cursor-pointer
                    px-2.5 py-1.5 text-xs
                    md:px-4 md:text-sm
                    font-medium transition-colors
                    text-zinc-400 hover:text-white
                  "
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navbar;
