"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useState } from "react";
import CompanyMark, { XOME } from "./company-mark";
import HeroDoodle from "./hero-doodle";

const RESUME_URL = "/Jagajith B Software Engineer Resume.pdf";

const EASE = [0.23, 1, 0.32, 1] as const;
const DRAW_EASE = [0.65, 0, 0.35, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-black px-6 font-aoboshi lg:px-12"
    >
      <div className="ambient-glow pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-signature/5 blur-[140px]" />

      <motion.div
        className="relative mx-auto grid w-full max-w-2xl items-center gap-x-16 pb-24 pt-24 lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_auto]"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="flex max-w-2xl flex-col gap-7">
          <motion.div variants={reveal} className="w-fit">
            <TiltAvatar />
          </motion.div>

          <motion.div variants={reveal} className="space-y-4">
            <p className="font-wind-song text-2xl font-semibold text-zinc-400 md:text-3xl">
              Hey, I am
            </p>
            <h1 className="text-4xl font-semibold tracking-[0.04em] text-zinc-100 md:text-6xl">
              Jagajith B
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-300 md:text-xl">
              Software engineer building <Scribble>systems that last</Scribble>.
              Currently at <CompanyMark {...XOME} />, modernizing the offer and
              auction platform.
            </p>
          </motion.div>

          <motion.div variants={reveal} className="pt-1 text-base md:text-lg">
            <ResumeLink />
          </motion.div>
        </div>

        {/* Desktop only: the single column stays as it was on small screens. */}
        <HeroDoodle className="hidden w-[26rem] lg:block xl:w-[30rem]" />
      </motion.div>
    </section>
  );
}

/**
 * Avatar that floats: a slow idle bob with a soft floor light that shrinks
 * and fades as it rises. On hover it tilts toward the cursor on a spring
 * (decorative mouse-tracking should carry momentum, not snap), lifts a little
 * higher and zooms a touch (4%, kept small on purpose). Everything holds
 * still for reduced motion.
 */
const FLOAT = { duration: 5, repeat: Infinity, ease: "easeInOut" } as const;

function TiltAvatar() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="group relative pb-3 [perspective:600px]">
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={FLOAT}
      >
        {/* Hover lifts it a little further off the "floor". */}
        <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
          <motion.div
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ rotateX, rotateY }}
            className="hero-avatar relative h-20 w-20 overflow-hidden rounded-xl shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10 md:h-24 md:w-24"
          >
            <Image
              src="/me-cropped.jpg"
              alt="Portrait of Jagajith"
              fill
              sizes="96px"
              loading="eager"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Floor light: on a black canvas a dark shadow is invisible, so a faint
          light pool sells the height instead. It tightens and dims as the
          avatar rises. Hidden in brutal (ambient-glow), which already has a
          hard offset shadow. */}
      <motion.span
        aria-hidden
        className="ambient-glow pointer-events-none absolute bottom-0 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-white/20 blur-lg md:w-20"
        animate={
          reduce
            ? undefined
            : { scaleX: [1, 0.82, 1], opacity: [0.7, 0.4, 0.7] }
        }
        transition={FLOAT}
      />
    </div>
  );
}

/**
 * Phrase with a hand-drawn underline. Draws in once on load; hovering
 * re-scribbles it (a fresh draw-on) and warms it from grey to the accent.
 */
function Scribble({ children }: { children: React.ReactNode }) {
  const [draws, setDraws] = useState(0);
  const firstDraw = draws === 0;

  return (
    <span
      className="group/sq relative inline-block pb-1"
      onMouseEnter={() => setDraws((n) => n + 1)}
    >
      {children}
      <svg
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-2 w-full text-zinc-700 transition-colors duration-300 ease-out group-hover/sq:text-signature"
      >
        <motion.path
          // A new key remounts the path so each hover replays the draw-on.
          key={draws}
          d="M1 5.5 C 25 1.5, 45 1.5, 67 4.5 S 110 7.5, 133 4 S 175 1, 199 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          // Slow, pen-like stroke: ease-in-out so it accelerates then settles.
          transition={
            firstDraw
              ? { delay: 1, duration: 1.6, ease: DRAW_EASE }
              : { duration: 1.2, ease: DRAW_EASE }
          }
        />
      </svg>
    </span>
  );
}

/** The one hero link. Grey underline at rest, signature colour on hover. */
function ResumeLink() {
  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-zinc-100"
    >
      <span className="relative">
        Resume
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full bg-zinc-600 transition-colors duration-200 ease-out group-hover:bg-signature"
        />
      </span>
      <ArrowUpRight
        aria-hidden
        weight="bold"
        className="h-[0.8em] w-[0.8em] self-center text-zinc-600 transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signature"
      />
    </a>
  );
}
