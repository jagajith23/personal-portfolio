"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { smoothScrollTo } from "./smooth-scroll";

const Navbar = () => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const links = [
    { id: "about", label: "About" },
    { id: "career", label: "Career" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
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

        <ul className="flex items-center gap-px sm:gap-1 md:gap-2 font-aoboshi">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => smoothScrollTo(`#${link.id}`)}
                onMouseEnter={() => setHoveredTab(link.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className="
                  relative cursor-pointer
                  px-2.5 py-1.5 text-xs 
                  md:px-4 md:text-sm 
                  
                  font-medium text-zinc-400 transition-colors hover:text-white
                "
              >
                {hoveredTab === link.id && (
                  <motion.div
                    layoutId="nav-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navbar;
