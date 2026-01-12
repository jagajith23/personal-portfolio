"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

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

const About = () => {
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
      {/* <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" /> */}
      {/* <div className="absolute inset-0 h-full w-full bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.175]" /> */}
      <div className="absolute inset-0 h-full w-full bg-black">
        <div
          className="
            absolute inset-0 h-full w-full 
            bg-[linear-gradient(to_right,#e5e7eb10_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb10_1px,transparent_1px)] bg-size-[64px_64px] 
            mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col justify-between h-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-4"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
            About
          </h2>
          {/* <h2 className="text-xl text-zinc-200 font-wind-song">Profile</h2> */}
          {/* <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-600">
            About Me.
          </h1> */}
        </motion.div>

        <div ref={containerRef} className="flex-1 flex items-center">
          <p className="text-4xl md:text-5xl 2xl:text-7xl font-bold flex flex-wrap tracking-tighter">
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

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-6
            pt-8 mt-20
            text-center
            "
        >
          {/* border-t border-zinc-800 */}
          <StatItem label="Age" value={age.toString()} />
          <StatItem label="Experience" value={`${experience} Years`} />
          <StatItem label="Based In" value="India" />
          <StatItem label="Focus" value="Full Stack" />
          <StatItem
            label="Role"
            value="SDE I"
            colSpan="col-span-2 sm:col-span-1 md:col-span-4 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({
  label,
  value,
  colSpan = "1",
}: {
  label: string;
  value: string;
  colSpan?: string;
}) => (
  <div className={`flex flex-col items-center justify-end ${colSpan}`}>
    <span className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-500">
      {value}
    </span>
    <span className="mt-2 text-xs font-medium text-zinc-600 uppercase border-t border-zinc-800 pt-2 px-2">
      {label}
    </span>
  </div>
);

export default About;
