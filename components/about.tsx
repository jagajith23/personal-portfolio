// import {
//   motion,
//   MotionValue,
//   TransformInputRange,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { useMemo, useRef } from "react";
// import { useReducedMotion } from "framer-motion";

// const Word = ({
//   children,
//   progress,
//   range,
// }: {
//   children: string;
//   progress: MotionValue<number>;
//   range: TransformInputRange;
// }) => {
//   const amount = range[1] - range[0];
//   const step = amount / children.length;
//   return (
//     <span className="word relative mr-3 mt-3 inline-block">
//       {children.split("").map((char, i) => {
//         const start = range[0] + i * step;
//         const end = range[0] + (i + 1) * step;
//         return (
//           <Char key={`c_${i}`} progress={progress} range={[start, end]}>
//             {char}
//           </Char>
//         );
//       })}
//     </span>
//   );
// };

// const Char = ({
//   children,
//   progress,
//   range,
// }: {
//   children: string;
//   progress: MotionValue<number>;
//   range: TransformInputRange;
// }) => {
//   const shouldReduceMotion = useReducedMotion();
//   const opacity = shouldReduceMotion
//     ? 1
//     : useTransform(progress, range, [0, 1]);

//   return (
//     <span className="relative inline-block">
//       <span className="absolute inset-0 opacity-20">{children}</span>
//       <motion.span style={{ opacity }}>{children}</motion.span>
//     </span>
//   );
// };

// const About = () => {
//   const age = useMemo(() => {
//     const birthDate = new Date("2003-04-23");
//     return new Date(Date.now() - birthDate.getTime()).getUTCFullYear() - 1970;
//   }, []);

//   const experience = useMemo(() => {
//     const joiningDate = new Date("2024-01-01");
//     return new Date(Date.now() - joiningDate.getTime()).getUTCFullYear() - 1970;
//   }, []);

//   const paragraph = `Hi Jagajith here. ${age} yo software engineer from India with ${experience} yrs of experience. I enjoy building responsive UI and scalable backend services.`;

//   const container = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start 0.8", "start 0.3"],
//   });

//   const y = useSpring(useTransform(scrollYProgress, [0, 1], [250, 0]), {
//     stiffness: 100,
//     damping: 20,
//   });

//   const headingY = useSpring(useTransform(scrollYProgress, [0, 1], [150, 0]), {
//     stiffness: 100,
//     damping: 20,
//   });

//   const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   const words = paragraph.split(" ");

//   return (
//     <section
//       className="h-screen mx-auto py-20 flex justify-center items-center flex-col relative font-aoboshi bg-black"
//       id="about"
//     >
//       <motion.h1
//         className="absolute top-20 text-3xl text-neutral-300"
//         style={{ y: headingY }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 3, ease: "easeInOut" }}
//       >
//         About
//       </motion.h1>
//       <motion.p
//         ref={container}
//         className="flex flex-wrap text-3xl md:text-6xl leading-none p-10 max-w-7xl text-white mx-auto"
//         style={{ y, opacity }}
//         aria-hidden="true"
//       >
//         {words.map((word, i) => {
//           const start = i / words.length;
//           const end = start + 1 / words.length;
//           return (
//             <Word key={i} progress={scrollYProgress} range={[start, end]}>
//               {word}
//             </Word>
//           );
//         })}
//       </motion.p>
//     </section>
//   );
// };

// export default About;

"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

// --- Utility Components ---

const Char = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const color = useTransform(progress, range, ["#3f3f46", "#ffffff"]);

  return (
    <motion.span style={{ color }} className="relative inline-block">
      {children}
    </motion.span>
  );
};

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative mr-3 lg:mr-4 inline-block leading-tight">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

// --- Main Component ---

const About = () => {
  // --- Logic ---
  const age = useMemo(() => {
    const birthDate = new Date("2003-04-23");
    return new Date(Date.now() - birthDate.getTime()).getUTCFullYear() - 1970;
  }, []);

  const experience = useMemo(() => {
    const joiningDate = new Date("2024-01-01");
    return new Date(Date.now() - joiningDate.getTime()).getUTCFullYear() - 1970;
  }, []);

  const paragraph = `Hi, I'm Jagajith. A ${age} y.o. software engineer from India. I build scalable backend services and craft responsive UIs. Currently solving problems with code.`;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-black selection:bg-white/20 overflow-hidden font-aoboshi"
    >
      {/* Background Grid Pattern - Fixed syntax */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col justify-between h-full min-h-screen">
        {/* Updated Header to match Career Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-4"
        >
          <h2 className="text-3xl  font-bold bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
            About
          </h2>
          {/* <h2 className="text-xl text-zinc-200 font-wind-song">Profile</h2> */}
          {/* <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-600">
            About Me.
          </h1> */}
        </motion.div>

        {/* Main Text Content */}
        <div ref={containerRef} className="flex-1 flex items-center">
          <p className="text-4xl md:text-6xl 2xl:text-8xl font-bold flex flex-wrap tracking-tighter">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-800 pt-8 mt-20">
          <StatItem label="Age" value={age.toString()} />
          <StatItem label="Experience" value={`0${experience} Years`} />
          <StatItem label="Location" value="India" />
          <StatItem label="Focus" value="Full Stack" />
        </div>
      </div>
    </section>
  );
};

// --- Sub-Component for Footer Stats ---
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 font-aoboshi">
    <span className="text-xs text-zinc-600 uppercase tracking-wider">
      {label}
    </span>
    <span className="text-xl md:text-2xl font-semibold text-zinc-200">
      {value}
    </span>
  </div>
);

export default About;
