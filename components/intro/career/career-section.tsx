// "use client";

// import {
//   motion,
//   useInView,
//   useMotionValueEvent,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// const HIGHLIGHT_WORDS = [
//   "Python",
//   "RabbitMQ",
//   "Celery Beat",
//   "Celery",
//   "Ember js",
//   "JavaScript",
//   "TypeScript",
//   "Next js",
//   "PostgreSQL",
//   "WebSockets",
//   "Azure Service Bus",
//   "C#",
//   ".NET",
//   "Entity Framework Core",
//   "CLEAN",
//   "MongoDB",
// ];

// const highlightTech = (text: string, isActive: boolean) => {
//   const regex = new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "g");
//   const parts = text.split(regex);

//   return parts.map((part, i) => {
//     const isHighlight = HIGHLIGHT_WORDS.includes(part);

//     if (!isHighlight) return <span key={i}>{part}</span>;

//     return (
//       <motion.span
//         key={i}
//         initial={{ opacity: 0.4, color: "#9ca3af" }}
//         animate={
//           isActive
//             ? {
//                 opacity: 1,
//                 color: "#ffffff",
//                 textShadow: "0px 0px 8px rgba(255,255,255,0.35)",
//               }
//             : {
//                 opacity: 0.5,
//                 color: "#9ca3af",
//                 textShadow: "none",
//               }
//         }
//         transition={{ duration: 0.3, ease: "easeOut" }}
//         className="font-medium"
//       >
//         {part}
//       </motion.span>
//     );
//   });
// };

// export const CAREER = [
//   {
//     company: "Xome",
//     role: "Software Development Engineer - I",
//     period: "Jul 2024 - Now",
//     bullets: [
//       "Modernized legacy SFTP polling architecture by implementing Azure Service Bus–based services, transitioning from 15-minute batch retrieval to real-time, event-driven data processing.",
//       "Developed a responsive, mobile-friendly dashboard and enhanced website performance by optimizing load times and improving Core Web Vitals, including LCP, CLS, INP, and FID.",
//       "Implemented real-time updates through WebSockets, ensuring timely data reflection on the dashboard.",
//       "Worked with Python, RabbitMQ, Celery, Celery Beat, Ember js, JavaScript, TypeScript, Next js, PostgreSQL.",
//     ],
//     card: {
//       visual: "/xome-logo-white.webp",
//       color: "bg-white",
//     },
//   },
//   {
//     company: "Xome",
//     role: "Software Engineer Intern",
//     period: "Jan 2024 — Jun 2024",
//     bullets: [
//       "Revised and optimized existing MongoDB schema to improve data structure and query performance.",
//       "Added new features to the application, including CRUD operations, to enhance functionality and user experience.",
//       "Modernized legacy APIs, implementing CLEAN architecture to enhance performance.",
//       "Converted stored procedures with business logic to Entity Framework Core using the Code First approach, optimizing data access and CRUD operations.",
//       "Worked with C#, .NET, and Entity Framework Core.",
//     ],
//     card: {
//       visual: "/xome-logo.png",
//       color: "bg-[#fa5b37]",
//     },
//   },
// ];

// const CareerSection = () => {
//   const [idx, setIdx] = useState(0);
//   const leftRef = useRef<HTMLDivElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);

//   const [dist, setDist] = useState(200);

//   const { scrollYProgress } = useScroll({
//     target: leftRef,
//     offset: ["start 40%", "end center"],
//   });

//   const progressToIndex = (progress: number, length: number) =>
//     Math.min(Math.floor(progress * length), length - 1);

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const nextIdx = progressToIndex(latest, CAREER.length);
//     setIdx((prev) => (prev === nextIdx ? prev : nextIdx));
//   });

//   useEffect(() => {
//     const updateDist = () => {
//       if (!leftRef.current || !cardRef.current) return;

//       const leftHeight = leftRef.current.scrollHeight;
//       const cardHeight = (cardRef.current.clientHeight * 3) / 4;
//       const bottomPadding = 0;

//       setDist(Math.max(leftHeight - cardHeight - bottomPadding, 0));
//     };

//     updateDist();
//     window.addEventListener("resize", updateDist);
//     return () => window.removeEventListener("resize", updateDist);
//   }, [cardRef.current, leftRef.current]);

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 80,
//     damping: 10,
//     mass: 0.8,
//   });

//   const headingY = useSpring(useTransform(scrollYProgress, [0, 1], [150, 0]), {
//     stiffness: 100,
//     damping: 20,
//   });

//   const leftY = useSpring(useTransform(scrollYProgress, [0, 1], [250, 0]), {
//     stiffness: 100,
//     damping: 20,
//   });

//   const y = useTransform(smoothProgress, [0, 1], [0, dist]);

//   return (
//     <section
//       className="flex flex-col items-center font-aoboshi mx-auto pt-20 md:py-20 gap-10 bg-black"
//       id="career"
//     >
//       <motion.h1
//         className="text-3xl text-neutral-300"
//         style={{ y: headingY }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 3, ease: "easeInOut" }}
//       >
//         Career
//       </motion.h1>
//       <motion.div
//         className="flex flex-col py-10 px-10"
//         style={{ y: leftY }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1, ease: "easeInOut" }}
//       >
//         <h2 className="text-4xl md:text-6xl font-black leading-none text-neutral-100">
//           Let's dive in
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 py-16 gap-8 relative">
//           <div className="left flex flex-col gap-16" ref={leftRef}>
//             {CAREER.map((props, i) => (
//               <CareerItem {...props} key={i} isActive={idx === i} />
//             ))}
//           </div>
//           <motion.div
//             className="right absolute top-0 left-[55%] w-[50%] hidden md:block"
//             style={{ y }}
//           >
//             <CareerCard
//               ref={cardRef}
//               card={CAREER[idx].card}
//               company={CAREER[idx].company}
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// interface CareerItemProps {
//   company: string;
//   role: string;
//   period: string;
//   bullets: string[];
//   card: {
//     visual: string;
//     color: string;
//   };
//   isActive: boolean;
// }

// const CareerItem = ({
//   company,
//   role,
//   period,
//   bullets,
//   card,
//   isActive,
// }: CareerItemProps) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {
//     once: true,
//     margin: "-80px",
//   });

//   return (
//     <div className="flex flex-col gap-8 w-full h-full">
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0 }}
//         animate={isInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className={`max-w-xl md:pl-4 md:border-l-2 transition-transform duration-300 ${
//           isActive
//             ? "md:opacity-100 md:scale-[1.02] md:border-neutral-300"
//             : "md:opacity-50 md:border-transparent"
//         }`}
//       >
//         <h3 className="text-2xl md:text-3xl font-semibold text-gray-100">
//           {company}
//         </h3>
//         <div className="mt-1 text-sm text-gray-300">{role}</div>
//         <div className="mb-3 text-xs text-gray-400">{period}</div>
//         <ul className="space-y-2 text-sm text-gray-300">
//           {bullets.map((b, i) => (
//             <li key={i}>• {highlightTech(b, isActive)}</li>
//           ))}
//         </ul>
//       </motion.div>

//       <div className="w-full md:hidden">
//         <CareerCard card={card} company={company} />
//       </div>
//     </div>
//   );
// };

// interface CareerCardProps {
//   company: string;
//   card: {
//     visual: string;
//     color: string;
//   };
// }

// import { forwardRef } from "react";

// interface CareerCardProps {
//   company: string;
//   card: {
//     visual: string;
//     color: string;
//   };
// }

// const CareerCard = forwardRef<HTMLDivElement, CareerCardProps>(
//   ({ company, card }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={`flex justify-center w-full rounded-xl ${card.color} p-8 items-center min-h-150`}
//       >
//         <Image
//           src={card.visual}
//           alt={`${company} logo`}
//           width={300}
//           height={300}
//         />
//       </div>
//     );
//   }
// );

// CareerCard.displayName = "CareerCard";

// export default CareerSection;

"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// --- Constants ---

const HIGHLIGHT_WORDS = [
  "Python",
  "RabbitMQ",
  "Celery Beat",
  "Celery",
  "Ember js",
  "JavaScript",
  "TypeScript",
  "Next js",
  "PostgreSQL",
  "WebSockets",
  "Azure Service Bus",
  "C#",
  ".NET",
  "Entity Framework Core",
  "CLEAN",
  "MongoDB",
];

export const CAREER = [
  {
    id: 1,
    company: "Xome",
    role: "Software Development Engineer - I",
    period: "Jul 2024 - Now",
    bullets: [
      "Modernized legacy SFTP polling architecture by implementing Azure Service Bus–based services, transitioning from 15-minute batch retrieval to real-time, event-driven data processing.",
      "Developed a responsive, mobile-friendly dashboard and enhanced website performance by optimizing load times and improving Core Web Vitals, including LCP, CLS, INP, and FID.",
      "Implemented real-time updates through WebSockets, ensuring timely data reflection on the dashboard.",
      "Worked with Python, RabbitMQ, Celery, Celery Beat, Ember js, JavaScript, TypeScript, Next js, PostgreSQL.",
    ],
    card: {
      visual: "/xome-logo-white.webp",
      bg: "bg-white",
      accent: "from-blue-500/20 to-purple-500/20",
    },
  },
  {
    id: 2,
    company: "Xome",
    role: "Software Engineer Intern",
    period: "Jan 2024 — Jun 2024",
    bullets: [
      "Revised and optimized existing MongoDB schema to improve data structure and query performance.",
      "Added new features to the application, including CRUD operations, to enhance functionality and user experience.",
      "Modernized legacy APIs, implementing CLEAN architecture to enhance performance.",
      "Converted stored procedures with business logic to Entity Framework Core using the Code First approach, optimizing data access and CRUD operations.",
      "Worked with C#, .NET, and Entity Framework Core.",
    ],
    card: {
      visual: "/xome-logo.png",
      bg: "bg-[#fa5b37]",
      accent: "from-orange-500/20 to-red-500/20",
    },
  },
];

// --- Sub-Components ---

const TechHighlight = ({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) => {
  const regex = new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "g");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        const isHighlight = HIGHLIGHT_WORDS.includes(part);
        if (!isHighlight) return <span key={i}>{part}</span>;
        return (
          <span
            key={i}
            className={`inline-block font-mono text-xs font-semibold px-1.5 py-0.5 rounded transition-all duration-300 mx-0.5 ${
              isActive
                ? "bg-white/10 text-white border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                : "bg-transparent text-zinc-500 border border-transparent"
            }`}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
};

const CareerCard = ({ item }: { item: (typeof CAREER)[0] }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-8 shadow-2xl font-aoboshi">
      {/* 1. Background Gradient Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 ${item.card.accent} opacity-20 blur-3xl`}
          />
        </AnimatePresence>
      </div>

      {/* 2. Logo Container Animation */}
      <div className="relative z-10 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`p-6 rounded-2xl ${item.card.bg} shadow-lg`}
          >
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
              <Image
                src={item.card.visual}
                alt={item.company}
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Text Content Animation */}
      <div className="relative z-10 text-center h-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white tracking-tight">
              {item.company}
            </h3>
            <p className="text-sm text-zinc-400 mt-1">{item.period}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main Section ---

const CareerRedesign = () => {
  const [activeId, setActiveId] = useState(CAREER[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && cardRef.current) {
        const containerHeight = containerRef.current.scrollHeight;
        const cardHeight = cardRef.current.offsetHeight;
        setScrollRange(Math.max(0, containerHeight - cardHeight));
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, scrollRange]), {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const activeItem = CAREER.find((c) => c.id === activeId) || CAREER[0];

  return (
    <section
      className="bg-black min-h-screen text-zinc-200 py-24 selection:bg-white/20 font-aoboshi"
      id="career"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 space-y-4"
        >
          <h2 className="text-3xl text-zinc-200 font-wind-song font-medium">
            Career
          </h2>
          {/* <h2 className="text-xl text-zinc-200 font-wind-song">
            Professional Journey
          </h2> */}
          {/* <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-600">
            Building the Future.
          </h1> */}
        </motion.div>

        <div
          ref={containerRef}
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
        >
          <div className="flex flex-col gap-32 pb-24">
            {CAREER.map((job) => (
              <TimelineItem
                key={job.id}
                data={job}
                setActiveId={setActiveId}
                isActive={activeId === job.id}
              />
            ))}
          </div>

          <div className="hidden lg:block relative">
            <motion.div
              ref={cardRef}
              style={{ y }}
              className="w-full aspect-square max-w-125"
            >
              <CareerCard item={activeItem} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Timeline Item Component ---

const TimelineItem = ({
  data,
  setActiveId,
  isActive,
}: {
  data: (typeof CAREER)[0];
  setActiveId: (id: number) => void;
  isActive: boolean;
}) => {
  const ref = useRef(null);

  // FIXED: Changed margin to "-50%...".
  // This creates a 1px trigger line in the exact center of the viewport.
  // It ensures only one item can be "in view" at a time, eliminating overlap bugs when scrolling up.
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) setActiveId(data.id);
  }, [isInView, setActiveId, data.id]);

  return (
    <div ref={ref} className="relative pl-8 md:pl-12 group">
      <div
        className={`absolute left-0 top-0 bottom-0 w-px transition-colors duration-500 ${
          isActive ? "bg-white/50" : "bg-zinc-800"
        }`}
      />

      <div
        className={`absolute -left-1.25 top-2 h-2.5 w-2.5 rounded-full border transition-all duration-500 ${
          isActive
            ? "bg-white border-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            : "bg-black border-zinc-700"
        }`}
      />

      <motion.div
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div>
          <h3 className="text-2xl font-bold text-white">{data.role}</h3>
          <div className="flex items-center gap-3 mt-2 text-zinc-400 font-mono text-sm">
            <span>{data.company}</span>
            <span className="w-1 h-1 bg-zinc-600 rounded-full" />
            <span>{data.period}</span>
          </div>
        </div>

        <ul className="space-y-4 text-zinc-400 leading-relaxed">
          {data.bullets.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 min-w-1.5 rounded-full bg-zinc-600" />
              <p>
                <TechHighlight text={point} isActive={isActive} />
              </p>
            </li>
          ))}
        </ul>

        {/* Mobile-only Card */}
        <div className="lg:hidden mt-8">
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs">
              <Image
                src={data.card.visual}
                alt={data.company}
                width={48}
                height={48}
              />
            </div>
            <span className="font-bold text-white">{data.company}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerRedesign;
