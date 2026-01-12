"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { smoothScrollTo } from "./navigation/smooth-scroll";
import { useRef } from "react";
import { blurInVariants, buttonVariants } from "@/app/animations";
import MagneticButton from "./magnetic-button";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/jagajith23/",
    color: "#ffffff",
    viewBox: "0 0 24 24",
    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/jagajith23/",
    color: "#0A66C2",
    viewBox: "0 0 24 24",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/_jaga_jith_23/",
    color: "#E4405F",
    viewBox: "0 0 24 24",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/jagajith23/",
    color: "#FFA116",
    viewBox: "0 0 32 32",
    path: "M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z",
  },
  // {
  //   name: "Medium",
  //   url: "https://medium.com/@yourusername",
  //   color: "#00ab6c",
  //   viewBox: "0 0 24 24",
  //   path: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
  // },
];

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

  const handleDownloadResume = () => {
    // Assuming resume.pdf is in the public folder
    window.open("/Jagajith B Software Engineer Resume.pdf", "_blank");
  };

  return (
    <motion.section
      className="relative h-screen max-w-7xl w-full mx-auto overflow-hidden bg-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="relative flex h-full items-center justify-center px-6"
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

      <div className="absolute bottom-8 left-4 z-2 flex flex-col md:flex-row items-center gap-4 md:bottom-16 md:left-16 overflow-hidden">
        {SOCIAL_LINKS.map((link, idx) => (
          <MagneticSocialLink key={idx} {...link} idx={idx} />
        ))}
      </div>

      <motion.div
        variants={buttonVariants}
        className="absolute bottom-8 right-4 z-2 md:bottom-16 md:right-16 flex flex-col md:flex-row items-center gap-4"
      >
        <MagneticButton
          onClick={handleDownloadResume}
          title="Resume"
          arrowDirection="south-east"
          arrowHoverDirection="north"
        />
        <MagneticButton
          onClick={() => smoothScrollTo("#about")}
          title="Explore"
          arrowDirection="north-east"
          arrowHoverDirection="south-east"
        />
      </motion.div>
    </motion.section>
  );
}

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

function MagneticSocialLink({
  name,
  url,
  path,
  color,
  viewBox = "0 0 24 24",
  idx,
}: {
  name: string;
  url: string;
  path: string;
  color: string;
  viewBox?: string;
  idx: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 10, stiffness: 100, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="group relative flex items-center justify-center p-3"
      aria-label={name}
      initial={{ y: "100%", opacity: 0 }}
      animate={{
        y: "0",
        opacity: 1,
        transition: {
          duration: 0.75,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.2 * (idx + 1),
        },
      }}
    >
      <motion.svg
        viewBox={viewBox}
        fill="currentColor"
        className="h-6 w-6 md:h-8 md:w-8"
        initial={{ color: "#6B7280" }}
        whileHover={{
          color,
          scale: 1.15,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        <path d={path} />
      </motion.svg>
    </motion.a>
  );
}

function VerticalPortrait() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 400], [0, -80]);
  const opacity = useTransform(scrollY, [0, 200], [0.6, 0.9]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="
        absolute 
        right-[25%] 
        top-1/2 
        -translate-y-1/2
        h-[70vh]
        w-55
        overflow-hidden
        pointer-events-none
        hidden
        md:block
      "
    >
      <img
        src="/red-balloon.png"
        alt="Portrait"
        className="
          h-full 
          w-full 
          object-cover
          grayscale
          contrast-110
        "
      />
    </motion.div>
  );
}
