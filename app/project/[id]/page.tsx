"use client";

import { hoverColors, Project, PROJECTS } from "@/app/constants";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { use, useState } from "react";
import { TechIcon } from "@/components/skills";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);

  const currentIndex = PROJECTS.findIndex((p) => p.id === Number(id));
  const project: Project | undefined = PROJECTS[currentIndex];
  const prevProject = PROJECTS[currentIndex - 1];
  const nextProject = PROJECTS[currentIndex + 1];

  const [prevHoverColor, setPrevHoverColor] = useState("text-white");
  const [nextHoverColor, setNextHoverColor] = useState("text-white");
  const getRandomColor = (current: string) => {
    let next = current;
    while (next === current) {
      next = hoverColors[Math.floor(Math.random() * hoverColors.length)];
    }
    return next;
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-aoboshi">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-aoboshi selection:bg-zinc-800 selection:text-white overscroll-none">
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between">
          <Link
            href="/#projects"
            className="cursor-pointer pointer-events-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2 bg-black/60 backdrop-blur"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Back
            </motion.div>
          </Link>

          {project.projectUrl && (
            <motion.a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05 },
                tap: { scale: 0.95 },
              }}
              className="pointer-events-auto hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2 bg-black/60 backdrop-blur"
            >
              Visit
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  rest: { x: 0, y: 0 },
                  hover: { x: 2, y: -2 },
                }}
                transition={{ duration: 0.2 }}
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </motion.svg>
            </motion.a>
          )}
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* HEADER TEXT */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className={`inline-block mb-6 rounded-full px-4 py-1 text-xs tracking-wide
              ${
                project.tag === "Freelance"
                  ? "text-emerald-400 bg-emerald-500/10"
                  : project.tag === "Internal"
                  ? "text-purple-400 bg-purple-500/10"
                  : "text-blue-400 bg-blue-500/10"
              }`}
          >
            {project.tag}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-zinc-400 leading-relaxed max-w-2xl"
          >
            {project.description}
          </motion.p>
        </motion.header>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 h-100 lg:h-125 relative rounded-3xl overflow-hidden group"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-1 min-h-100 lg:h-125 rounded-3xl p-8 flex flex-col justify-center"
          >
            <div className="space-y-5">
              {project.details?.role && (
                <motion.div variants={fadeInUp}>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-medium">
                    Role
                  </p>
                  <p className="text-2xl text-zinc-100 font-semibold">
                    {project.details.role}
                  </p>
                </motion.div>
              )}

              {project.details?.techStack && (
                <motion.div variants={fadeInUp}>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4 font-medium">
                    Stack
                  </p>
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-2">
                    {project.details.techStack.map((tech, i) => (
                      <motion.li
                        key={i}
                        variants={fadeInUp}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-zinc-400 p-2 rounded-lg hover:bg-zinc-800/30 transition-colors cursor-default"
                      >
                        <span className="relative w-5 h-5 shrink-0 opacity-90 flex items-center justify-center text-black">
                          {!!tech.url ? (
                            <Image
                              src={tech.url}
                              alt={tech.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <TechIcon icon={tech.icon} />
                          )}
                        </span>
                        <span className="text-sm font-medium truncate">
                          {tech.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* OVERVIEW SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-zinc-800 flex-1" />
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          <div className="space-y-16">
            {project.details?.detailedDescription &&
              project.details.detailedDescription
                .split("## ")
                .filter(Boolean)
                .map((section, index) => {
                  const splitIndex = section.indexOf("\n");
                  const title =
                    splitIndex !== -1
                      ? section.slice(0, splitIndex).trim()
                      : section;
                  const content =
                    splitIndex !== -1 ? section.slice(splitIndex).trim() : "";

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-l border-zinc-800 pl-6 md:pl-0 md:border-l-0"
                    >
                      <div className="md:col-span-4 flex flex-col md:items-end md:text-right relative">
                        <div className="absolute -left-7.25 top-0 w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-500 transition-colors md:hidden" />

                        <span className="text-6xl font-bold text-zinc-900 group-hover:text-zinc-800 transition-colors select-none font-sans">
                          0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-zinc-100 mt-2 bg-linear-to-r from-white to-zinc-400 bg-clip-text">
                          {title}
                        </h3>
                      </div>

                      <div className="md:col-span-8">
                        <p className="text-zinc-400 leading-8 text-lg md:text-lg whitespace-pre-line">
                          {content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
          </div>
        </motion.section>

        {/* --- PROJECT NAVIGATION --- */}
        <section className="mt-32 pt-12 border-t border-zinc-800/50">
          <div className="flex justify-between items-center w-full">
            {/* PREVIOUS BUTTON */}
            {prevProject ? (
              <Link
                href={`/project/${prevProject.id}`}
                className="group"
                onMouseEnter={() =>
                  setPrevHoverColor(getRandomColor(prevHoverColor))
                }
                onMouseLeave={() => setPrevHoverColor("text-white")}
              >
                <motion.div
                  className="flex flex-col items-start gap-1"
                  whileHover="hover"
                  initial="rest"
                >
                  <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors text-sm uppercase tracking-wider font-medium">
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{
                        rest: { x: 0 },
                        hover: { x: -4 },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M19 12H5" />
                      <path d="M12 19l-7-7 7-7" />
                    </motion.svg>
                    Previous
                  </div>
                  <span
                    className={`text-lg md:text-xl font-bold transition-colors ${prevHoverColor}`}
                  >
                    {prevProject.title}
                  </span>
                </motion.div>
              </Link>
            ) : (
              <div /> /* Empty div to maintain spacing if no prev */
            )}

            {/* NEXT BUTTON */}
            {nextProject ? (
              <Link
                href={`/project/${nextProject.id}`}
                className="group text-right"
                onMouseEnter={() =>
                  setNextHoverColor(getRandomColor(nextHoverColor))
                }
                onMouseLeave={() => setNextHoverColor("text-white")}
              >
                <motion.div
                  className="flex flex-col items-end gap-1"
                  whileHover="hover"
                  initial="rest"
                >
                  <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors text-sm uppercase tracking-wider font-medium">
                    Next
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{
                        rest: { x: 0 },
                        hover: { x: 4 },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </motion.svg>
                  </div>
                  <span
                    className={`text-lg md:text-xl font-bold transition-colors ${nextHoverColor}`}
                  >
                    {nextProject.title}
                  </span>
                </motion.div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
