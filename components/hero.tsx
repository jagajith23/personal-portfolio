"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import LiquidEther from "./LiquidEther";
import { smoothScrollTo } from "./navigation/smooth-scroll";
import { useRef } from "react";
import { blurInVariants, buttonVariants } from "@/app/animations";

export default function Hero() {
  const { scrollY } = useScroll();

  const contentY = useTransform(scrollY, [0, 400], [0, -150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <motion.section
      className="relative h-screen overflow-hidden bg-black w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* <div style={{ width: "100%", position: "absolute" }} className="h-screen">
        <LiquidEther colors={["#8a0000", "#ad4d4d", "#a64d79"]} isBounce />
      </div> */}

      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-4xl text-center">
          <motion.div
            variants={blurInVariants}
            className="mb-6 overflow-hidden py-2"
          >
            <p className="text-lg md:text-2xl text-gray-400 font-wind-song font-semibold">
              Hey, i am{" "}
              <span className="text-xl md:text-4xl ml-2 text-gray-200 inline-block origin-bottom">
                Jagajith
              </span>
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-1 md:gap-2">
            <MaskedReveal text="BUILDING SYSTEMS" />
            <MaskedReveal text="THAT LASTS" accent />
          </div>
        </div>
      </motion.div>

      {/* <motion.div
        variants={fadeInVariants}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 cursor-pointer group gap-1"
        onClick={() => smoothScrollTo("#about")}
      >
        <span className="text-lg font-wind-song font-bold text-gray-400 mb-1 transition-colors group-hover:text-gray-300">
          Explore
        </span>
        <svg
          width="20"
          height="30"
          viewBox="0 0 24 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-gray-500 group-hover:stroke-gray-300 transition-colors"
        >
          <motion.path
            d="M7 4L12 9L17 4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.path
            d="M7 12L12 17L17 12"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.path
            d="M7 20L12 25L17 20"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
        </svg>
      </motion.div> */}
      <motion.div
        variants={buttonVariants}
        className="absolute bottom-10 right-8 z-50 md:bottom-16 md:right-16"
      >
        <MagneticButton
          onClick={() => smoothScrollTo("#about")}
          title="Explore"
        />
      </motion.div>
    </motion.section>
  );
}

// const fadeInVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 1, ease: "easeIn" } },
// };

function MaskedReveal({
  text,
  accent = false,
}: {
  text: string;
  accent?: boolean;
}) {
  const words = text.split(" ");

  return (
    <h1
      className="overflow-hidden text-3xl font-semibold tracking-[0.08em] text-gray-100 md:text-6xl flex gap-3 md:gap-5"
      style={{ fontFamily: "var(--font-aoboshi), serif" }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-2">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 2 },
              visible: {
                y: "0%",
                rotate: 0,
                transition: {
                  duration: 0.9,
                  ease: [0.33, 1, 0.68, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}

      {accent && (
        <motion.span
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: { delay: 0.2, type: "spring" },
            },
          }}
          className="text-red-500 inline-block self-end mb-3 md:mb-5"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(239,68,68,0)",
                "0 0 15px rgba(239,68,68,0.8)",
                "0 0 0px rgba(239,68,68,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"
          />
        </motion.span>
      )}
    </h1>
  );
}

function MagneticButton({
  onClick,
  title,
}: {
  onClick: () => void;
  title: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Motion values for the magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  // stiffness: how "snappy" the return is
  // damping: reduces oscillation (bouncing)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    x.set(middleX * 0.5);
    y.set(middleY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="cursor-pointer group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-500 hover:border-white/30 md:h-32 md:w-32"
    >
      <div className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:translate-y-0" />
      <motion.div className="relative z-10 flex flex-col items-center gap-1">
        <span className="font-aoboshi text-xs tracking-widest text-white transition-colors duration-500 group-hover:text-black md:text-sm">
          {title}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-white transition-colors duration-500 group-hover:stroke-black group-hover:rotate-45"
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { smoothScrollTo } from "./navigation/smooth-scroll";

// export default function HeroHorizon() {
//   return (
//     <section className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-center px-6 md:px-24">
//       {/* Top Half: The Identity */}
//       <div className="flex justify-between items-end pb-6 overflow-hidden">
//         <motion.span
//           initial={{ y: "100%" }}
//           animate={{ y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="font-wind-song text-5xl md:text-7xl text-gray-300"
//         >
//           Jagajith
//         </motion.span>

//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="font-mono text-xs text-gray-600 uppercase tracking-widest hidden md:block"
//         >
//           ( EST. 2024 )
//         </motion.span>
//       </div>

//       {/* The Horizon Line */}
//       <motion.div
//         initial={{ scaleX: 0 }}
//         animate={{ scaleX: 1 }}
//         transition={{ duration: 1.5, ease: "easeInOut" }}
//         className="w-full h-[1px] bg-gradient-to-r from-gray-800 via-white to-gray-800 origin-left"
//       />

//       {/* Bottom Half: The Function */}
//       <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-start gap-8">
//         <h1 className="font-aoboshi text-4xl md:text-6xl leading-tight max-w-2xl text-gray-200">
//           <span className="block overflow-hidden">
//             <motion.span
//               initial={{ y: "-100%" }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="block"
//             >
//               Engineering
//             </motion.span>
//           </span>
//           <span className="block overflow-hidden">
//             <motion.span
//               initial={{ y: "-100%" }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="block text-gray-500"
//             >
//               resilient systems.
//             </motion.span>
//           </span>
//         </h1>

//         <motion.button
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           onClick={() => smoothScrollTo("#about")}
//           className="group flex items-center gap-2 mt-4 md:mt-2"
//         >
//           <div className="h-2 w-2 bg-red-600 rounded-full group-hover:scale-150 transition-transform" />
//           <span className="font-aoboshi text-sm tracking-widest text-gray-400 group-hover:text-white transition-colors">
//             ENTER
//           </span>
//         </motion.button>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import { smoothScrollTo } from "./navigation/smooth-scroll";

// export default function HeroCorners() {
//   return (
//     <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-white p-6 md:p-12">
//       {/* Top Left: Name */}
//       <motion.div
//         initial={{ opacity: 0, x: -20, y: -20 }}
//         animate={{ opacity: 1, x: 0, y: 0 }}
//         transition={{ duration: 1 }}
//         className="absolute top-6 left-6 md:top-12 md:left-12"
//       >
//         <span className="font-wind-song text-4xl md:text-5xl text-white block -rotate-3">
//           Jagajith
//         </span>
//       </motion.div>

//       {/* Top Right: Location/Status */}
//       <motion.div
//         initial={{ opacity: 0, x: 20, y: -20 }}
//         animate={{ opacity: 1, x: 0, y: 0 }}
//         transition={{ duration: 1, delay: 0.2 }}
//         className="absolute top-6 right-6 md:top-12 md:right-12 text-right"
//       >
//         <div className="flex items-center gap-2 justify-end">
//           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//           <span className="font-aoboshi text-xs text-gray-400 tracking-widest uppercase">
//             Available
//           </span>
//         </div>
//       </motion.div>

//       {/* Bottom Left: The Statement */}
//       <motion.div
//         initial={{ opacity: 0, x: -20, y: 20 }}
//         animate={{ opacity: 1, x: 0, y: 0 }}
//         transition={{ duration: 1, delay: 0.4 }}
//         className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-lg"
//       >
//         <h1 className="font-aoboshi text-3xl md:text-5xl leading-tight mb-4">
//           Building digital <span className="text-gray-600">systems</span> that
//           last.
//         </h1>
//       </motion.div>

//       {/* Bottom Right: Action */}
//       <motion.div
//         initial={{ opacity: 0, x: 20, y: 20 }}
//         animate={{ opacity: 1, x: 0, y: 0 }}
//         transition={{ duration: 1, delay: 0.6 }}
//         className="absolute bottom-6 right-6 md:bottom-12 md:right-12"
//       >
//         <button
//           onClick={() => smoothScrollTo("#about")}
//           className="h-20 w-20 md:h-32 md:w-32 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group"
//         >
//           <span className="font-aoboshi text-sm group-hover:scale-110 transition-transform">
//             Start
//           </span>
//         </button>
//       </motion.div>

//       {/* Center Decoration (Subtle) */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <motion.div
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 1.5, duration: 1 }}
//           className="w-[1px] h-[100px] bg-red-600/30"
//         />
//         <motion.div
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 1.5, duration: 1 }}
//           className="h-[1px] w-[100px] bg-red-600/30 absolute"
//         />
//       </div>
//     </section>
//   );
// }

// "use client";

// import { motion, useScroll, useTransform, Variants } from "framer-motion";
// // import LiquidEther from "./LiquidEther"; // Assuming you might use this later
// import { smoothScrollTo } from "./navigation/smooth-scroll";

// export default function Hero() {
//   const { scrollY } = useScroll();

//   const contentY = useTransform(scrollY, [0, 400], [0, -150]);
//   const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.25,
//         delayChildren: 0.5,
//       },
//     },
//   };

//   const buttonVariants: Variants = {
//     hidden: { scale: 0, opacity: 0, rotate: -45 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       rotate: 0,
//       transition: { duration: 0.8, ease: "backOut", delay: 1.2 },
//     },
//   };

//   return (
//     <motion.section
//       className="relative h-screen overflow-hidden bg-black w-full"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* Background Effect (Optional) */}
//       {/* <div style={{ width: "100%", position: "absolute" }} className="h-screen">
//         <LiquidEther colors={["#8a0000", "#ad4d4d", "#a64d79"]} isBounce />
//       </div> */}

//       {/* Main Center Content */}
//       <motion.div
//         className="relative z-10 flex h-full items-center justify-center px-6"
//         style={{ y: contentY, opacity: contentOpacity }}
//       >
//         <div className="max-w-4xl text-center">
//           <motion.div
//             variants={blurInVariants}
//             className="mb-6 overflow-hidden py-2"
//           >
//             <p className="text-lg md:text-2xl text-gray-400 font-wind-song font-semibold">
//               Hey, i am{" "}
//               <span className="text-xl md:text-4xl ml-2 text-gray-200 inline-block origin-bottom">
//                 Jagajith
//               </span>
//             </p>
//           </motion.div>

//           <div className="flex flex-col items-center gap-1 md:gap-2">
//             <MaskedReveal text="BUILDING SYSTEMS" />
//             <MaskedReveal text="THAT LASTS" accent />
//           </div>
//         </div>
//       </motion.div>

//       {/* --- OPTION 1: Center Arrow (Keep this subtle if using the button) --- */}
//       <motion.div
//         variants={fadeInVariants}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none opacity-50"
//       >
//         {/* I removed the 'Explore' text to reduce clutter, keeping just the arrows */}
//         <svg
//           width="20"
//           height="30"
//           viewBox="0 0 24 30"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="stroke-gray-600"
//         >
//           <motion.path
//             d="M7 12L12 17L17 12"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             animate={{ opacity: [0.2, 1, 0.2], y: [0, 2, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
//           />
//           <motion.path
//             d="M7 20L12 25L17 20"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             animate={{ opacity: [0.2, 1, 0.2], y: [0, 2, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
//           />
//         </svg>
//       </motion.div>

//       {/* --- OPTION 2: The New Circular Action Button --- */}
//       <motion.div
//         variants={buttonVariants}
//         className="absolute bottom-6 right-6 md:bottom-16 md:right-16 z-50"
//       >
//         <button
//           onClick={() => smoothScrollTo("#about")}
//           className="relative h-20 w-20 md:h-28 md:w-28 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm hover:bg-white text-gray-500 hover:text-black hover:scale-110 hover:border-transparent transition-all duration-500 group overflow-hidden"
//         >
//           <span className="font-aoboshi text-xs md:text-sm font-light tracking-widest uppercase group-hover:font-semibold relative z-10">
//             Start
//           </span>
//           <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
//         </button>
//       </motion.div>
//     </motion.section>
//   );
// }

// // --- Variants ---

// const blurInVariants: Variants = {
//   hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
//   visible: {
//     filter: "blur(0px)",
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// const fadeInVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 1, ease: "easeIn" } },
// };

// function MaskedReveal({
//   text,
//   accent = false,
// }: {
//   text: string;
//   accent?: boolean;
// }) {
//   const words = text.split(" ");

//   return (
//     <h1
//       className="overflow-hidden text-3xl font-semibold tracking-[0.08em] text-gray-100 md:text-6xl flex gap-3 md:gap-5"
//       style={{ fontFamily: "var(--font-aoboshi), serif" }}
//     >
//       {words.map((word, i) => (
//         <span key={i} className="inline-block overflow-hidden py-2">
//           <motion.span
//             className="inline-block"
//             variants={{
//               hidden: { y: "110%", rotate: 2 },
//               visible: {
//                 y: "0%",
//                 rotate: 0,
//                 transition: {
//                   duration: 0.9,
//                   ease: [0.33, 1, 0.68, 1],
//                 },
//               },
//             }}
//           >
//             {word}
//           </motion.span>
//         </span>
//       ))}

//       {accent && (
//         <motion.span
//           variants={{
//             hidden: { scale: 0, opacity: 0 },
//             visible: {
//               scale: 1,
//               opacity: 1,
//               transition: { delay: 0.2, type: "spring" },
//             },
//           }}
//           className="text-red-500 inline-block self-end mb-3 md:mb-5"
//         >
//           <motion.div
//             animate={{
//               boxShadow: [
//                 "0 0 0px rgba(239,68,68,0)",
//                 "0 0 15px rgba(239,68,68,0.8)",
//                 "0 0 0px rgba(239,68,68,0)",
//               ],
//             }}
//             transition={{ duration: 3, repeat: Infinity }}
//             className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"
//           />
//         </motion.span>
//       )}
//     </h1>
//   );
// }
