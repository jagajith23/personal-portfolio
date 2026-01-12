"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { Fragment, useRef } from "react";
import {
  CSharp,
  CSS,
  Dart,
  Docker,
  ExpressjsDark,
  FlaskDark,
  Flutter,
  FramerDark,
  Git,
  HTML5,
  Java,
  JavaScript,
  Linux,
  MariaDB,
  MicrosoftAzure,
  MicrosoftNET,
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
  TailwindCSS,
  TanStack,
  TypeScript,
} from "@ridemountainpig/svgl-react";

const ROW_1 = [
  { name: "Python", icon: "python", color: "#3776AB" },
  { name: "Flask", icon: "flask", color: "#092E20" },
  { name: "RabbitMQ", icon: "rabbitmq", color: "#FF6600" },
  { name: "PostgreSQL", icon: "postgres", color: "#4169E1" },
  { name: "Redis", icon: "redis", color: "#DC382D" },
  { name: "Azure", icon: "azure", color: "#0078D4" },
  { name: "Docker", icon: "docker", color: "#2496ED" },
];

const ROW_2 = [
  { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  { name: "Next.js", icon: "nextjs", color: "#000000" },
  { name: "React", icon: "react", color: "#61DAFB" },
  { name: "Tailwind", icon: "tailwind", color: "#06B6D4" },
  { name: "Framer", icon: "framer", color: "#0055FF" },
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
  { name: "HTML5", icon: "html", color: "#E34F26" },
  { name: "CSS3", icon: "css", color: "#1572B6" },
  { name: "TanStack", icon: "tanstack", color: "#1572B6" },
];

const ROW_3 = [
  { name: "C#", icon: "csharp", color: "#512BD4" },
  { name: ".NET Core", icon: ".net", color: "#512BD4" },
  { name: "Java", icon: "java", color: "#E76F00" },
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
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="relative z-0 flex flex-col h-full gap-8 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-12 mb-4"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
            Skills
          </h2>
          {/* <p className="text-s text-zinc-500">
            Backend, frontend, and cloud technologies I use to design, build,
            and ship production-ready applications.
          </p> */}
        </motion.div>

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
      <div className="w-8 h-8 md:w-12 md:h-12 transition-all duration-300 text-(--hover-color) group-hover:scale-110">
        <TechIcon icon={data.icon} />
      </div>

      <span className="text-xl md:text-2xl font-bold text-zinc-600 transition-colors duration-300 group-hover:text-zinc-200">
        {data.name}
      </span>
    </div>
  );
}

export const TechIcon = ({ icon }: { icon: string }) => {
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
    socket: <SocketIODark />,
    html: <HTML5 />,
    java: <Java />,
    git: <Git />,
    mongo: <MongoDBDark />,
    mariadb: <MariaDB />,
    tanstack: <TanStack />,
    linux: <Linux />,
    nginx: <Nginx />,
    flask: <FlaskDark />,
    rabbitmq: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path
          fill="#ff6600"
          d="M119.517 51.188H79.291a3.641 3.641 0 0 1-3.64-3.642V5.62A5.605 5.605 0 0 0 70.028 0H55.66a5.606 5.606 0 0 0-5.627 5.62v41.646a3.913 3.913 0 0 1-3.92 3.925l-13.188.047c-2.176 0-3.972-1.75-3.926-3.926l.094-41.687A5.606 5.606 0 0 0 23.467 0H9.1a5.61 5.61 0 0 0-5.626 5.625V122.99c0 2.737 2.22 5.01 5.01 5.01h111.033a5.014 5.014 0 0 0 5.008-5.011V56.195a4.975 4.975 0 0 0-5.008-5.007zM100.66 95.242a6.545 6.545 0 0 1-6.525 6.524H82.791a6.545 6.545 0 0 1-6.523-6.524V83.9a6.545 6.545 0 0 1 6.523-6.524h11.343a6.545 6.545 0 0 1 6.525 6.523zm0 0"
        />
      </svg>
    ),
    redis: <Redis />,
    framer: <FramerDark />,
    ".net": <MicrosoftNET />,
    sass: <Sass />,
    nodejs: <Nodejs />,
    express: <ExpressjsDark />,
    flutter: <Flutter />,
    dart: <Dart />,
  };

  const content = paths[icon] || <circle cx="12" cy="12" r="10" />;

  return (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
      {content}
    </svg>
  );
};
