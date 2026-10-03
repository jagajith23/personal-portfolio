"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import {
  ClaudeAI,
  CSharp,
  CSS,
  Dart,
  Docker,
  Ember,
  ExpressjsDark,
  FlaskDark,
  FlaskLight,
  Flutter,
  FramerDark,
  FramerLight,
  Git,
  GitHubCopilotDark,
  HTML5,
  Java,
  JavaScript,
  Kubernetes,
  Linux,
  MariaDB,
  MicrosoftAzure,
  MicrosoftNET,
  MicrosoftSQLServer,
  MongoDBDark,
  Nextjs,
  Nginx,
  Nodejs,
  PostgreSQL,
  Python,
  ReactDark,
  Redis,
  Sass,
  SocketIODark,
  SocketIOLight,
  TailwindCSS,
  TanStack,
  TypeScript,
} from "@ridemountainpig/svgl-react";

const ROW_1 = [
  { name: "Python", icon: "python", color: "#3776AB" },
  { name: "Flask", icon: "flask", color: "#092E20" },
  { name: "Node.js", icon: "nodejs", color: "#5FA04E" },
  { name: "Express", icon: "express", color: "#FFFFFF" },
  { name: "RabbitMQ", icon: "rabbitmq", color: "#FF6600" },
  { name: "PostgreSQL", icon: "postgres", color: "#4169E1" },
  { name: "SQL Server", icon: "sqlserver", color: "#CC2927" },
  { name: "Redis", icon: "redis", color: "#DC382D" },
  { name: "Azure", icon: "azure", color: "#0078D4" },
  { name: "Docker", icon: "docker", color: "#2496ED" },
  { name: "Kubernetes", icon: "kubernetes", color: "#326CE5" },
];

const ROW_2 = [
  { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  { name: "Next.js", icon: "nextjs", color: "#000000" },
  { name: "React", icon: "react", color: "#61DAFB" },
  { name: "Ember.js", icon: "ember", color: "#E04E39" },
  { name: "Tailwind", icon: "tailwind", color: "#06B6D4" },
  { name: "Framer", icon: "framer", color: "#0055FF" },
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
  { name: "HTML5", icon: "html", color: "#E34F26" },
  { name: "Sass", icon: "sass", color: "#1572B6" },
  { name: "TanStack", icon: "tanstack", color: "#1572B6" },
  { name: "Claude Code", icon: "claude", color: "#D97757" },
  { name: "GitHub Copilot", icon: "copilot", color: "#FFFFFF" },
];

const ROW_3 = [
  { name: "C#", icon: "csharp", color: "#512BD4" },
  { name: ".NET Core", icon: ".net", color: "#512BD4" },
  { name: "SignalR", icon: "signalr", color: "#0078D4" },
  { name: "Java", icon: "java", color: "#E76F00" },
  { name: "Flutter", icon: "flutter", color: "#02569B" },
  { name: "Dart", icon: "dart", color: "#0175C2" },
  { name: "MongoDB", icon: "mongo", color: "#47A248" },
  { name: "MariaDB", icon: "mariadb", color: "#47A248" },
  { name: "Git", icon: "git", color: "#F05032" },
  { name: "Linux", icon: "linux", color: "#FCC624" },
  { name: "Nginx", icon: "nginx", color: "#009639" },
  { name: "Socket.io", icon: "socket", color: "#010101" },
];

type Skill = (typeof ROW_1)[number];

// The static "see all" view regroups every marquee skill by area.
const ALL_SKILLS: Skill[] = [...ROW_1, ...ROW_2, ...ROW_3];
const byName = new Map(ALL_SKILLS.map((s) => [s.name, s]));
const GROUPS = [
  {
    label: "Languages",
    names: [
      "TypeScript",
      "JavaScript",
      "C#",
      "Python",
      "Java",
      "Dart",
      "HTML5",
      "Sass",
    ],
  },
  {
    label: "Backend",
    names: [
      ".NET Core",
      "Node.js",
      "Express",
      "Flask",
      "SignalR",
      "RabbitMQ",
      "Socket.io",
    ],
  },
  {
    label: "Frontend",
    names: [
      "React",
      "Next.js",
      "Ember.js",
      "TanStack",
      "Tailwind",
      "Framer",
      "Flutter",
    ],
  },
  {
    label: "Data",
    names: ["PostgreSQL", "SQL Server", "MongoDB", "MariaDB", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    names: ["Azure", "Docker", "Kubernetes", "Git", "Linux", "Nginx"],
  },
  {
    label: "AI tools",
    names: ["Claude Code", "GitHub Copilot"],
  },
].map((g) => ({
  label: g.label,
  skills: g.names.map((n) => byName.get(n)).filter((s): s is Skill => !!s),
}));

const EASE = [0.23, 1, 0.32, 1] as const;
// Emil's on-screen movement curve: used for the section-height morph.
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

// Both views stay mounted and cross-fade over each other. Nothing mounts or
// unmounts on toggle (no React commit hitch) and the paused marquee keeps its
// scroll position instead of snapping back to the start.
const CROSSFADE = { duration: 0.3, ease: EASE };

/** Tracks an element's rendered height so a wrapper can animate to it. */
function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setHeight(entry.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, height] as const;
}

export default function SkillsVelocity() {
  const [showAll, setShowAll] = useState(false);
  const [marqueeRef, marqueeHeight] = useMeasuredHeight<HTMLDivElement>();
  const [gridRef, gridHeight] = useMeasuredHeight<HTMLDivElement>();
  const height = showAll ? gridHeight : marqueeHeight;
  const label = showAll ? "Show less" : `See all ${ALL_SKILLS.length}`;

  return (
    <section
      id="skills"
      className="
        cursor-default
        relative
        max-w-7xl
        w-full
        py-24
        mb-32 md:mb-40
        bg-black
        overflow-hidden
        font-aoboshi
        items-center
        mx-auto
        justify-center
      "
    >
      <motion.div
        aria-hidden
        className="pointer-events-none"
        animate={{ opacity: showAll ? 0 : 1 }}
        transition={CROSSFADE}
      >
        <div className="skills-edge-fade absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="skills-edge-fade absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />
      </motion.div>

      <div className="relative z-0 flex flex-col h-full gap-8 md:gap-16">
        <div className="relative z-20 mb-4 flex items-end justify-between gap-6 px-6 md:px-12">
          <SectionHeading title="Skills" className="mb-0" />
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="skills-content"
            className="group mb-2 inline-flex shrink-0 items-baseline gap-1 text-sm text-zinc-300 md:text-base"
          >
            <span className="relative inline-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={label}
                  className="col-start-1 row-start-1 whitespace-nowrap"
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {label}
                </motion.span>
              </AnimatePresence>
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-px w-full bg-zinc-600 transition-colors duration-200 ease-out group-hover:bg-signature"
              />
            </span>
          </button>
        </div>

        {/* Both views live here permanently. The active one is in flow; the
            other is stacked on top (absolute), invisible and inert. The
            wrapper animates between their measured heights. */}
        <motion.div
          id="skills-content"
          className="relative overflow-hidden"
          animate={{ height }}
          transition={{ duration: 0.35, ease: EASE_IN_OUT }}
        >
          <motion.div
            ref={marqueeRef}
            aria-hidden={showAll}
            inert={showAll}
            className={`flex flex-col gap-8 py-3 md:gap-16 ${
              showAll
                ? "pointer-events-none absolute inset-x-0 top-0"
                : "relative"
            }`}
            initial={false}
            animate={showAll ? "hidden" : "show"}
            variants={{
              hidden: { opacity: 0, transition: CROSSFADE },
              show: {
                opacity: 1,
                transition: { ...CROSSFADE, staggerChildren: 0.05 },
              },
            }}
          >
            {[
              { row: ROW_1, velocity: -0.7 },
              { row: ROW_2, velocity: 0.7 },
              { row: ROW_3, velocity: -0.5 },
            ].map(({ row, velocity }) => (
              // Each row slides back in from the side it scrolls toward.
              // Full transform strings keep the slide on the GPU.
              <motion.div
                key={velocity + row[0].name}
                variants={{
                  hidden: {
                    transform: `translateX(${velocity < 0 ? 40 : -40}px)`,
                    transition: CROSSFADE,
                  },
                  show: {
                    transform: "translateX(0px)",
                    transition: { duration: 0.45, ease: EASE },
                  },
                }}
              >
                <ParallaxText baseVelocity={velocity} paused={showAll}>
                  {row.map((skill, i) => (
                    <SkillItem key={i} data={skill} />
                  ))}
                </ParallaxText>
              </motion.div>
            ))}
          </motion.div>

          <div
            ref={gridRef}
            aria-hidden={!showAll}
            inert={!showAll}
            className={`py-3 ${
              showAll
                ? "relative"
                : "pointer-events-none absolute inset-x-0 top-0"
            }`}
          >
            <SkillsGrid visible={showAll} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Opacity + GPU transform only (no filter), animated per group rather than
// per chip: 6 animated nodes instead of 40+ keeps the entrance smooth.
const gridGroup = {
  hidden: {
    opacity: 0,
    transform: "translateY(10px)",
    transition: { duration: 0.2, ease: EASE },
  },
  show: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.35, ease: EASE },
  },
};

/** Every skill at once, grouped by area. Groups cascade in 50ms apart. */
function SkillsGrid({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="grid gap-x-12 gap-y-12 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3"
      initial={false}
      animate={visible ? "show" : "hidden"}
      variants={{
        // Hide all at once (fast); reveal with a short cascade.
        hidden: { transition: { staggerChildren: 0 } },
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {GROUPS.map((group) => (
        <motion.div key={group.label} variants={gridGroup}>
          <h3 className="mb-5 text-sm text-zinc-500">
            {group.label}
          </h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-4">
            {group.skills.map((skill) => (
              // Same hover as the marquee items (icon grows, name brightens).
              // On pointer devices the logos rest in greyscale and take their
              // brand colour on hover; touch devices keep the colour.
              <li
                key={skill.name}
                className="group/skill flex items-center gap-2.5 text-base md:text-lg"
              >
                <span
                  className="skill-grid-icon h-5 w-5 shrink-0 transition-[filter,opacity,transform] duration-300 ease-out group-hover/skill:scale-110 md:h-6 md:w-6 [@media(hover:hover)]:opacity-60 [@media(hover:hover)]:grayscale group-hover/skill:opacity-100 group-hover/skill:grayscale-0"
                  style={{ color: skill.color }}
                >
                  <TechIcon icon={skill.icon} />
                </span>
                <span className="text-zinc-300 transition-colors duration-300 ease-out group-hover/skill:text-zinc-100">
                  {skill.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
  /** Stops the per-frame loop (and freezes position) while the row is hidden. */
  paused?: boolean;
}

function ParallaxText({
  children,
  baseVelocity = 100,
  paused = false,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    if (shouldReduceMotion || paused) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const DUPLICATES = 4;

  return (
    <div className="overflow-visible m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex flex-nowrap gap-12 md:gap-24" style={{ x }}>
        {Array.from({ length: DUPLICATES }).map((_, i) => (
          <Fragment key={i}>{children}</Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function SkillItem({
  data,
}: {
  data: { name: string; icon: string; color: string };
}) {
  return (
    <div
      className="flex items-center gap-4 group"
      style={{ "--hover-color": data.color } as React.CSSProperties}
    >
      <div className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-300 ease-out text-(--hover-color) group-hover:scale-110">
        <TechIcon icon={data.icon} />
      </div>

      <span className="text-xl md:text-2xl font-bold text-zinc-400 transition-[color] duration-300 ease-out group-hover:text-zinc-200">
        {data.name}
      </span>
    </div>
  );
}

// Detects brutalist mode from the <html data-design> attribute so it works even
// on pages without the DesignProvider (e.g. /project/[id]).
function useIsBrutal() {
  const [isBrutal, setIsBrutal] = useState(false);
  useEffect(() => {
    const read = () =>
      setIsBrutal(
        document.documentElement.getAttribute("data-design") === "brutal",
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-design"],
    });
    return () => observer.disconnect();
  }, []);
  return isBrutal;
}

const MONO_ICONS = new Set(["express", "copilot"]);

export const TechIcon = ({ icon }: { icon: string }) => {
  const isBrutal = useIsBrutal();
  const paths: Record<string, React.ReactNode> = {
    python: <Python />,
    azure: <MicrosoftAzure />,
    docker: <Docker />,
    tailwind: <TailwindCSS />,
    javascript: <JavaScript />,
    react: <ReactDark />,
    typescript: <TypeScript />,
    nextjs: <Nextjs />,
    csharp: <CSharp />,
    postgres: <PostgreSQL />,
    css: <CSS />,
    socket: isBrutal ? <SocketIOLight /> : <SocketIODark />,
    html: <HTML5 />,
    java: <Java />,
    git: <Git />,
    mongo: <MongoDBDark />,
    mariadb: <MariaDB />,
    tanstack: <TanStack />,
    linux: <Linux />,
    nginx: <Nginx />,
    flask: isBrutal ? <FlaskLight /> : <FlaskDark />,
    rabbitmq: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path
          fill="#ff6600"
          d="M119.517 51.188H79.291a3.641 3.641 0 0 1-3.64-3.642V5.62A5.605 5.605 0 0 0 70.028 0H55.66a5.606 5.606 0 0 0-5.627 5.62v41.646a3.913 3.913 0 0 1-3.92 3.925l-13.188.047c-2.176 0-3.972-1.75-3.926-3.926l.094-41.687A5.606 5.606 0 0 0 23.467 0H9.1a5.61 5.61 0 0 0-5.626 5.625V122.99c0 2.737 2.22 5.01 5.01 5.01h111.033a5.014 5.014 0 0 0 5.008-5.011V56.195a4.975 4.975 0 0 0-5.008-5.007zM100.66 95.242a6.545 6.545 0 0 1-6.525 6.524H82.791a6.545 6.545 0 0 1-6.523-6.524V83.9a6.545 6.545 0 0 1 6.523-6.524h11.343a6.545 6.545 0 0 1 6.525 6.523zm0 0"
        />
      </svg>
    ),
    redis: <Redis />,
    claude: <ClaudeAI />,
    copilot: <GitHubCopilotDark />,
    signalr: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <defs>
          <radialGradient
            id="signalr-gradient"
            cx="9"
            cy="9"
            r="8.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.18" stopColor="#5ea0ef" />
            <stop offset="1" stopColor="#0078d4" />
          </radialGradient>
          <clipPath id="signalr-clip">
            <path
              d="M14.21,15.72A8.5,8.5,0,0,1,3.79,2.28l.09-.06a8.5,8.5,0,0,1,10.33,13.5"
              fill="none"
            />
          </clipPath>
        </defs>
        <path
          d="M14.21,15.72A8.5,8.5,0,0,1,3.79,2.28l.09-.06a8.5,8.5,0,0,1,10.33,13.5"
          fill="url(#signalr-gradient)"
        />
        <g clipPath="url(#signalr-clip)">
          <path
            d="M4.13,7.05a.28.28,0,0,0,.2.48h6.12A1.55,1.55,0,0,1,11.6,8a1.61,1.61,0,0,1,.43.92,1.43,1.43,0,0,1-.36,1.15,1.41,1.41,0,0,1-1.12.54H8.44a.08.08,0,0,0-.09.06L7.81,12c-.12.29-.25.59-.37.89a.08.08,0,0,0,0,.09L9,14.48l2.59,2.59.46.49,2.14-1.19L13.72,16l-1.43-1.44L10.74,13l-.07,0,0,0,.52-.07A3.84,3.84,0,0,0,14,10.65a3.85,3.85,0,0,0,0-3.08,3.93,3.93,0,0,0-.73-1.12,3.67,3.67,0,0,0-1.24-.89,4,4,0,0,0-1.66-.34h-3V4.05A.14.14,0,0,0,7.18,4Z"
            fill="#f2f2f2"
          />
        </g>
      </svg>
    ),
    framer: isBrutal ? <FramerLight /> : <FramerDark />,
    ".net": <MicrosoftNET />,
    sass: <Sass />,
    nodejs: <Nodejs />,
    express: <ExpressjsDark />,
    flutter: <Flutter />,
    dart: <Dart />,
    sqlserver: <MicrosoftSQLServer />,
    kubernetes: <Kubernetes />,
    ember: <Ember />,
  };

  const content = paths[icon] || <circle cx="12" cy="12" r="10" />;
  // svgl's light/dark variant names aren't reliable for these single-colour
  // marks, so use the white version and invert it on the paper theme.
  const invert = isBrutal && MONO_ICONS.has(icon);

  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-full h-full fill-current ${invert ? "invert" : ""}`}
    >
      {content}
    </svg>
  );
};
