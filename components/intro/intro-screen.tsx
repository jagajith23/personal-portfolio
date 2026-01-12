// "use client";

// import { motion } from "framer-motion";
// import { useEffect } from "react";
// import Image from "next/image";

// export default function IntroScreen({
//   onComplete,
// }: {
//   onComplete: () => void;
// }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onComplete();
//     }, 3000); // 5 seconds

//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 1, ease: "easeInOut" }}
//     >
//       <motion.h1
//         initial={{ opacity: 0, y: 6 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
//         className="text-2xl md:text-4xl tracking-[0.15em] text-gray-200"
//         style={{ fontFamily: "var(--font-aoboshi), serif" }}
//       >
//         Hiya, Georgie!
//         <motion.span
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 1, ease: "easeOut" }}
//         >
//           <Image
//             src="/red-balloon.png"
//             alt="Red Balloon"
//             width={100}
//             height={100}
//             className="inline-block"
//             priority
//           />
//         </motion.span>
//       </motion.h1>
//     </motion.div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Start the exit animation after 2 seconds
    const timer = setTimeout(() => {
      setExit(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black"
      initial={{ y: 0 }}
      animate={exit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Custom bezier for smooth "curtain" feel
      onAnimationComplete={() => {
        if (exit) onComplete();
      }}
    >
      {/* --- Animated Noise Background --- */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] z-0">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* --- Text Content --- */}
      <div className="relative z-10 overflow-hidden">
        <motion.span
          initial={{ y: "110%" }}
          animate={exit ? { y: "-110%" } : { y: 0 }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1], // Matches curtain ease
            delay: 0.2,
          }}
          className="block font-aoboshi text-5xl text-gray-200 md:text-7xl lg:text-8xl tracking-tight"
        >
          Jagajith
        </motion.span>
      </div>

      {/* Optional: Simple decorative line or details */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={exit ? { opacity: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-12 h-[1px] w-24 bg-red-500/50"
      />
    </motion.div>
  );
}
