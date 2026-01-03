"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import FogLayer from "./fog-layer";
import LiquidEther from "./LiquidEther";
import { smoothScrollTo } from "./navigation/smooth-scroll";

export default function Hero() {
  const { scrollY } = useScroll();

  // Subtle parallax: moves text up ~40px as user scrolls
  const textY = useTransform(scrollY, [0, 400], [0, -200]);
  const y = useTransform(scrollY, [0, 400], [0, -100]);

  return (
    <motion.section
      className="relative h-screen overflow-hidden bg-black w-full"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      {/* Fog */}
      {/* <FogLayer /> */}
      {/* <AuroraBackground /> */}
      <div style={{ width: "100%", position: "absolute" }} className="h-screen">
        <LiquidEther colors={["#8a0000", "#ad4d4d", "#a64d79"]} isBounce />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
            style={{ y: textY }}
            className="mb-6 text-lg md:text-2xl text-gray-400 font-wind-song font-semibold"
          >
            Hey, I am Jagajith
          </motion.p>

          {/* SVG animated headline */}
          <HeroLines y={y} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-50"
        onClick={() => smoothScrollTo("#about")}
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.4, 1, 0.4],
            scale: [0.95, 1, 0.95],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col gap-1"
        >
          <span className="block h-2 w-2 rotate-45 border-b border-r border-gray-200" />
          <span className="block h-2 w-2 rotate-45 border-b border-r border-gray-200" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export function HeroLines({ y }: { y: MotionValue<number> }) {
  return (
    <div className="relative">
      {/* Line 1 */}
      <AnimatedLine delay={1.2} text="BUILDING SYSTEMS" y={y} />

      {/* Line 2 */}
      <AnimatedLine delay={1.5} text="THAT LASTS" accent y={y} />
    </div>
  );
}

function AnimatedLine({
  text,
  delay,
  accent = false,
  y,
}: {
  text: string;
  delay: number;
  accent?: boolean;
  y: MotionValue<number>;
}) {
  return (
    <motion.div className="relative mb-2 overflow-hidden" style={{ y }}>
      {/* Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className="relative z-10 text-3xl font-semibold tracking-[0.08em] text-gray-100 md:text-6xl"
        style={{ fontFamily: "var(--font-aoboshi), serif" }}
      >
        {text}
        {accent && (
          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
              textShadow: [
                "0 0 0px rgba(239,68,68,0)",
                "0 0 12px rgba(239,68,68,0.6)",
                "0 0 0px rgba(239,68,68,0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-red-500"
          >
            .
          </motion.span>
        )}
      </motion.h1>

      {/* SVG line */}
      <svg
        className="absolute left-0 top-1/2 w-full"
        height="2"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="#e5e7eb"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{
            delay,
            duration: 1.1,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      </svg>
    </motion.div>
  );
}

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// // Assuming these import paths are correct based on your snippet
// import LiquidEther from "./LiquidEther";

// export default function Hero() {
//   const containerRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Parallax Effects
//   const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
//   const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative h-screen w-full overflow-hidden bg-black text-white"
//     >
//       {/* --- Background Layer --- */}
//       <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0">
//         <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
//         <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

//         {/* Your Existing Background Component */}
//         <div className="h-full w-full opacity-60">
//           <LiquidEther colors={["#8a0000", "#ad4d4d", "#a64d79"]} />
//         </div>
//       </motion.div>

//       {/* --- Content Layer --- */}
//       <motion.div
//         style={{ y: yText, opacity: opacityText }}
//         className="relative z-20 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24"
//       >
//         <div className="flex flex-col items-center gap-2">
//           {/* Script Intro */}
//           <div className="overflow-hidden h-10">
//             <motion.p
//               initial={{ y: "100%" }}
//               animate={{ y: 0 }}
//               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//               className="font-wind-song text-3xl md:text-3xl"
//             >
//               Hey, I am Jagajith
//             </motion.p>
//           </div>

//           {/* Main Headline */}
//           {/* <div className="mt-4 flex flex-col font-aoboshi font-bold leading-[0.9] tracking-tighter">
//             <RevealText text="Building" delay={0.4} />
//             <RevealText text="Systems" delay={0.55} />

//             <div className="flex items-baseline gap-2 md:gap-4">
//               <RevealText text="That" delay={0.7} outline />
//               <RevealText text="Last" delay={0.85} />
//               <GlowingPeriod delay={1.1} />
//             </div>
//           </div> */}
//         </div>
//         {/* <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 1.4, duration: 1 }}
//           className="absolute bottom-12 right-6 max-w-xs text-right md:bottom-24 md:right-24 md:max-w-md"
//         >
//           <p className="font-aoboshi text-sm text-gray-400 md:text-base">
//             Crafting robust digital architecture with precision and artistic
//             intent.
//           </p>
//         </motion.div> */}
//       </motion.div>

//       {/* --- Scroll Indicator --- */}
//       <ScrollBadge />
//     </section>
//   );
// }

// // --- Sub-Components ---

// function RevealText({
//   text,
//   delay,
//   outline = false,
// }: {
//   text: string;
//   delay: number;
//   outline?: boolean;
// }) {
//   return (
//     <div className="overflow-hidden">
//       <motion.h1
//         initial={{ y: "110%" }}
//         animate={{ y: 0 }}
//         transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
//         className={`text-6xl md:text-8xl lg:text-[9rem] ${
//           outline
//             ? "text-transparent stroke-white stroke-2 bg-clip-text [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]"
//             : "text-gray-100"
//         }`}
//       >
//         {text}
//       </motion.h1>
//     </div>
//   );
// }

// function GlowingPeriod({ delay }: { delay: number }) {
//   return (
//     <motion.div
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.6, delay, type: "spring" }}
//       className="relative"
//     >
//       <div className="h-3 w-3 rounded-full bg-red-500 md:h-6 md:w-6" />
//       <motion.div
//         animate={{
//           boxShadow: [
//             "0 0 0px rgba(239,68,68,0)",
//             "0 0 20px rgba(239,68,68,0.6)",
//             "0 0 0px rgba(239,68,68,0)",
//           ],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="absolute inset-0 rounded-full"
//       />
//     </motion.div>
//   );
// }

// function ScrollBadge() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 2, duration: 1 }}
//       className="absolute bottom-8 left-1/2 -translate-x-1/2"
//     >
//       <div className="flex h-[60px] w-[30px] justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-sm">
//         <motion.div
//           animate={{ y: [0, 25, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//           className="mt-2 h-2 w-2 rounded-full bg-white"
//         />
//       </div>
//     </motion.div>
//   );
// }
