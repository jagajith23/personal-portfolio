"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { translate, curve, text } from "@/app/animations";
import { PROJECTS } from "@/app/constants";

const routes: Record<string, string> = {
  "/": "Home",
};

const anim = (variants: Variants) => ({
  variants,
  initial: "initial",
  animate: "enter",
  exit: "exit",
});

export default function Curve({
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}) {
  const pathname = usePathname();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getLabel = () => {
    const pathParts = pathname.split("/");

    if (pathParts.length > 2 && PROJECTS) {
      const index = Number(pathParts[2]) - 1;
      return PROJECTS[index]?.title || "Project";
    }

    return routes[pathname] || "Portfolio";
  };

  return (
    <div className="relative font-aoboshi" style={{ backgroundColor }}>
      <div
        className="
          fixed left-0 top-0
          w-screen
          h-[calc(100vh+600px)]
          bg-zinc-900
          pointer-events-none
          transition-opacity
          duration-0
          delay-100
          ease-linear
          z-59 
        "
        style={{ opacity: dimensions.width === 0 ? 1 : 0 }}
      />

      <motion.p
        className="route fixed left-1/2 top-[40%] text-white text-[46px] z-60 -translate-x-1/2 text-center pointer-events-none"
        {...anim(text)}
      >
        {getLabel()}
      </motion.p>

      {dimensions.width > 0 && <SVG {...dimensions} />}

      {children}
    </div>
  );
}

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg
      className="
        fixed
        left-0
        top-0
        w-screen
        h-[calc(100vh+600px)]
        pointer-events-none
        fill-zinc-900
        z-50
      "
      {...anim(translate)}
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
