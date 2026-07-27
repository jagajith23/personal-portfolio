"use client";

import {
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

export default function SkillsVelocity() {
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
      <div className="skills-edge-fade absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="skills-edge-fade absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="relative z-0 flex flex-col h-full gap-8 md:gap-16">
        <SectionHeading
          index="04"
          title="Skills"
          className="px-6 md:px-12 mb-4"
        />

        <ParallaxText baseVelocity={-0.7}>
          {ROW_1.map((skill, i) => (
            <SkillItem key={i} data={skill} />
          ))}
        </ParallaxText>

        <ParallaxText baseVelocity={0.7}>
          {ROW_2.map((skill, i) => (
            <SkillItem key={i} data={skill} />
          ))}
        </ParallaxText>

        <ParallaxText baseVelocity={-0.5}>
          {ROW_3.map((skill, i) => (
            <SkillItem key={i} data={skill} />
          ))}
        </ParallaxText>
      </div>
    </section>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
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
    if (shouldReduceMotion) return;
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

  return (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
      {content}
    </svg>
  );
};
