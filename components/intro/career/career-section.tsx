"use client";

import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const CAREER = [
  {
    id: 1,
    company: "Xome",
    role: "Software Development Engineer - I",
    period: "Jul 2024 - Present",
    images: [
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    ],
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
    period: "Jan 2024 - Jun 2024",
    images: [
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    ],
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

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const TechHighlight = React.memo(({ text }: { text: string }) => {
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(
    `(${HIGHLIGHT_WORDS.map(escapeRegex).join("|")})`,
    "g"
  );

  const parts = text.split(regex);

  return (
    <span className="leading-relaxed text-zinc-400">
      {parts.map((part, i) => {
        const isHighlight = HIGHLIGHT_WORDS.includes(part);

        if (!isHighlight) {
          return (
            <span key={i} className="text-zinc-200 font-medium tracking-wide">
              {part}
            </span>
          );
        }

        return (
          <span
            key={i}
            className={`
              inline-block relative mx-0.5
              tracking-wide
              transition-all duration-300 ease-out
            `}
          >
            {part}
            <span
              className={`
                absolute left-0 -bottom-0.5 h-px w-full
                transition-all duration-300 ease-out
                bg-white
              `}
            />
          </span>
        );
      })}
    </span>
  );
});

const HoverImage = ({
  active,
  currentImage,
  mouseX,
  mouseY,
}: {
  active: boolean;
  currentImage: string | null;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) => {
  const springConfig = { stiffness: 100, damping: 15 };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
      }}
      transition={{
        opacity: { duration: 0.2, ease: "linear" },
        scale: { duration: 0.2, ease: "linear" },
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 w-75 h-45 overflow-hidden bg-zinc-900 shadow-2xl hidden md:block rounded-xl"
    >
      <AnimatePresence mode="popLayout">
        {active && currentImage && (
          <motion.img
            key={currentImage}
            src={currentImage}
            alt="Work preview"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.85,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Career = () => {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const activeImages = useMemo(
    () => CAREER.find((c) => c.id === hoveredCardId)?.images || [],
    [hoveredCardId]
  );

  useEffect(() => {
    if (!hoveredCardId || activeImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [hoveredCardId, activeImages]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [hoveredCardId]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cursorX.set(e.clientX + 10);
    cursorY.set(e.clientY + 10);
  }, []);

  return (
    <motion.section
      className="min-h-screen bg-black mx-auto w-full font-aoboshi"
      id="career"
      onMouseMove={handleMouseMove}
    >
      {/* <HoverImage
        active={hoveredCardId !== null}
        currentImage={activeImages[currentImageIndex] || null}
        mouseX={cursorX}
        mouseY={cursorY}
      /> */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col justify-between h-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-4"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
            Career
          </h2>
        </motion.div>

        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {CAREER.map((item) => (
            <CareerCard
              key={item.id}
              {...item}
              i={item.id}
              isActive={activeId === item.id}
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              onHoverStart={() => setHoveredCardId(item.id)}
              onHoverEnd={() => setHoveredCardId(null)}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

interface CardProps {
  readonly i: number;
  readonly company: string;
  readonly period: string;
  readonly role: string;
  readonly bullets: readonly string[];
  readonly isActive: boolean;
  readonly onClick: () => void;
  readonly onHoverStart: () => void;
  readonly onHoverEnd: () => void;
}

const SPRING_CONFIG = { damping: 50, stiffness: 100, mass: 0.1 };

const CareerCard = React.memo(
  ({
    company,
    period,
    role,
    bullets,
    isActive,
    onClick,
    onHoverStart,
    onHoverEnd,
  }: CardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, SPRING_CONFIG);
    const springY = useSpring(mouseY, SPRING_CONFIG);

    const textX = useTransform(springX, (x) => x * 0.15);
    const textY = useTransform(springY, (y) => y * 0.25);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isActive || !ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const displacementX = (e.clientX - centerX) / 10;
      const displacementY = (e.clientY - centerY) / 10;

      mouseX.set(displacementX);
      mouseY.set(displacementY);
    };

    const handleMouseEnter = () => {
      onHoverStart();
    };

    const handleMouseLeave = () => {
      onHoverEnd();
      mouseX.set(0);
      mouseY.set(0);
    };

    const handleClick = () => {
      mouseX.set(0);
      mouseY.set(0);
      onClick();
    };

    return (
      <motion.div
        ref={ref}
        layout
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={false}
        style={{ x: springX, y: springY }}
        className="w-full text-white relative group pointer-events-auto"
      >
        {/* Horizontal Top */}
        <div className="absolute top-0 -left-10 -right-10 h-px bg-neutral-800 transition-colors duration-300 group-hover:bg-neutral-600" />

        {/* Horizontal Bottom */}
        <div className="absolute bottom-0 -left-10 -right-10 h-px bg-neutral-800 transition-colors duration-300 group-hover:bg-neutral-600" />

        {/* Vertical Left */}
        <div className="absolute left-8 -top-5 -bottom-5 md:-top-10 md:-bottom-10 w-px bg-neutral-800 transition-colors duration-300 group-hover:bg-neutral-600 z-0" />

        {/* Vertical Right */}
        <div className="absolute right-8 -top-5 -bottom-5 md:-top-10 md:-bottom-10 w-px bg-neutral-800 transition-colors duration-300 group-hover:bg-neutral-600 z-0" />

        {/* Top Left */}
        <div className="absolute left-8 top-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-black text-neutral-800 transition-colors duration-300 group-hover:text-neutral-500">
          <PlusIcon className="w-4 h-4" />
        </div>
        {/* Top Right */}
        <div className="absolute right-8 top-0 translate-x-1/2 -translate-y-1/2 z-10 bg-black text-neutral-800 transition-colors duration-300 group-hover:text-neutral-500">
          <PlusIcon className="w-4 h-4" />
        </div>
        {/* Bottom Left */}
        <div className="absolute left-8 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 bg-black text-neutral-800 transition-colors duration-300 group-hover:text-neutral-500">
          <PlusIcon className="w-4 h-4" />
        </div>
        {/* Bottom Right */}
        <div className="absolute right-8 bottom-0 translate-x-1/2 translate-y-1/2 z-10 bg-black text-neutral-800 transition-colors duration-300 group-hover:text-neutral-500">
          <PlusIcon className="w-4 h-4" />
        </div>

        <div className="px-16 py-12 relative z-10">
          <motion.div
            layout="position"
            style={{ x: textX, y: textY }}
            className="flex flex-col md:flex-row justify-between gap-3 md:gap-6 md:items-center cursor-pointer"
          >
            <div className="flex flex-col gap-2 text-2xl md:text-3xl font-medium tracking-tight transition-colors">
              <motion.p
                layout="position"
                className="group-hover:text-white transition-colors"
              >
                {company}
              </motion.p>
              <motion.p
                layout="position"
                className="flex flex-row gap-2 items-center text-xs md:text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors"
              >
                {period.split(" - ")[0]}
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#9f9fa9"
                  className="mt-1"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <g id="Complete">
                      <g id="arrow-right">
                        <g>
                          <polyline
                            data-name="Right"
                            fill="none"
                            id="Right-2"
                            points="16.4 7 21.5 12 16.4 17"
                            stroke="#9f9fa9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="group-hover:stroke-white transition-colors duration-200"
                          ></polyline>
                          <line
                            fill="none"
                            stroke="#9f9fa9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            x1="2.5"
                            x2="19.2"
                            y1="12"
                            y2="12"
                            className="group-hover:stroke-white"
                          ></line>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>{" "}
                {period.split(" - ")[1]}
              </motion.p>
            </div>

            <motion.p
              layout="position"
              className="text-sm md:text-base text-zinc-300 leading-snug text-left md:text-right group-hover:text-zinc-100 transition-colors"
            >
              {role}
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="pt-8 pb-2 flex flex-col gap-3 text-neutral-300">
                  {bullets.map((bullet, idx) => (
                    <motion.div
                      key={`${company}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.1,
                        ease: "easeOut",
                      }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                      <span className="text-sm md:text-base leading-relaxed">
                        <TechHighlight text={bullet} />
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
);
export default Career;
