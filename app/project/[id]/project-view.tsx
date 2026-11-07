"use client";

import { Project, PROJECTS } from "@/app/constants";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    CaretDown,
} from "@phosphor-icons/react";
import { TechIcon } from "@/components/skills";
import ProjectMedia from "@/components/project-media";
import ProjectPlayer from "@/components/project-player";

// Client-only and loaded on demand: only the Mystic page needs it.
const MysticPlayground = dynamic(
    () => import("@/components/mystic-playground"),
    { ssr: false },
);

// Stacks this size or smaller use the compact layout.
const COMPACT_STACK_MAX = 6;

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

export default function ProjectView({ id }: { id: string }) {
    const [writeUpOpen, setWriteUpOpen] = useState(false);

    const currentIndex = PROJECTS.findIndex((p) => p.id === Number(id));
    const project: Project | undefined = PROJECTS[currentIndex];
    const prevProject = PROJECTS[currentIndex - 1];
    const nextProject = PROJECTS[currentIndex + 1];
    // A short stack would sit in a tall, mostly empty side card, so those
    // projects give the media the full width and list role and stack below.
    const compact = (project?.details?.techStack.length ?? 0) <= COMPACT_STACK_MAX;


    if (!project) {
        return (
            <div className="min-h-[100dvh] bg-black flex items-center justify-center text-zinc-400 font-aoboshi">
                Project not found
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-black text-white font-aoboshi selection:bg-zinc-800 selection:text-white overscroll-none">
            {/* NAV */}
            <nav className="project-nav fixed top-0 left-0 w-full z-30 pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between">
                    <Link
                        href="/#projects"
                        className="cursor-pointer pointer-events-auto"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="project-nav-btn flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2 bg-black/60 backdrop-blur"
                        >
                            <ArrowLeft size={14} weight="bold" aria-hidden />
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
                            className="project-nav-btn pointer-events-auto flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2 bg-black/60 backdrop-blur"
                        >
                            Visit
                            <motion.span
                                className="inline-flex"
                                variants={{
                                    rest: { x: 0, y: 0 },
                                    hover: { x: 2, y: -2 },
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUpRight size={14} weight="bold" aria-hidden />
                            </motion.span>
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
                        className="inline-block mb-6 rounded-full px-4 py-1 text-xs tracking-wide bg-white/[0.08] text-zinc-300 ring-1 ring-white/10"
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
                        // A clip keeps its own 16:10 frame so nothing is
                        // cropped; a still image fills the fixed height.
                        className={`${compact ? "lg:col-span-3" : "lg:col-span-2"} relative rounded-xl overflow-hidden group ${
                            project.video ? "aspect-[16/10]" : "h-100 lg:h-125"
                        }`}
                    >
                        {project.video ? (
                            <ProjectPlayer
                                video={project.video}
                                title={project.title}
                            />
                        ) : (
                            <ProjectMedia
                                imageUrl={project.imageUrl}
                                sizes={compact ? "100vw" : "(min-width: 1024px) 66vw, 100vw"}
                                priority
                                className="group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        )}
                    </motion.div>

                    {!compact && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className={`lg:col-span-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 flex flex-col justify-center ${
                            project.video ? "" : "min-h-100 lg:h-125"
                        }`}
                    >
                        <div className="space-y-5">
                            {project.details?.role && (
                                <motion.div variants={fadeInUp}>
                                    <p className="text-xs uppercase tracking-wider text-zinc-400 mb-3 font-medium">
                                        Role
                                    </p>
                                    <p className="text-2xl text-zinc-100 font-semibold">
                                        {project.details.role}
                                    </p>
                                </motion.div>
                            )}

                            {project.details?.techStack && (
                                <motion.div variants={fadeInUp}>
                                    <p className="text-xs uppercase tracking-wider text-zinc-400 mb-4 font-medium">
                                        Stack
                                    </p>
                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                                        {project.details.techStack.map(
                                            (tech, i) => (
                                                <motion.li
                                                    key={i}
                                                    variants={fadeInUp}
                                                    whileHover={{ x: 5 }}
                                                    className="stack-item flex items-center gap-3 text-zinc-400 p-2 rounded-lg hover:bg-zinc-800/30 transition-colors cursor-default"
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
                                                            <TechIcon
                                                                icon={tech.icon}
                                                            />
                                                        )}
                                                    </span>
                                                    <span className="text-sm font-medium truncate">
                                                        {tech.name}
                                                    </span>
                                                </motion.li>
                                            ),
                                        )}
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                    )}
                </div>

                {compact && project.details && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6"
                    >
                        {project.details.role && (
                            <>
                                <h2 className="md:col-span-4 md:text-right text-xl font-bold text-zinc-100">
                                    Role
                                </h2>
                                <p className="md:col-span-8 text-lg text-zinc-300">
                                    {project.details.role}
                                </p>
                            </>
                        )}
                        <h2 className="md:col-span-4 md:text-right text-xl font-bold text-zinc-100">
                            Stack
                        </h2>
                        <ul className="md:col-span-8 flex flex-wrap gap-2">
                            {project.details.techStack.map((tech) => (
                                <li
                                    key={tech.name}
                                    className="stack-item flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/30 cursor-default"
                                >
                                    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-black">
                                        {tech.url ? (
                                            <Image
                                                src={tech.url}
                                                alt=""
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <TechIcon icon={tech.icon} />
                                        )}
                                    </span>
                                    {tech.name}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {project.playground === "mystic" && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-24"
                    >
                        <h2 className="mb-2 text-2xl font-bold text-zinc-100">
                            Try it
                        </h2>
                        <p className="mb-8 max-w-[65ch] text-zinc-400">
                            This runs the real Mystic interpreter in your
                            browser. Pick an example or write your own.
                        </p>
                        <MysticPlayground />
                    </motion.section>
                )}

                {/* HIGHLIGHTS */}
                {project.details?.highlights && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
                    >
                        <h2 className="md:col-span-4 md:text-right text-xl font-bold text-zinc-100">
                            Highlights
                        </h2>
                        <ul className="md:col-span-8 border-b border-zinc-800">
                            {project.details.highlights.map((line) => (
                                <li
                                    key={line}
                                    className="border-t border-zinc-800 py-4 text-lg leading-snug text-zinc-300"
                                >
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

                {/* FULL WRITE-UP: collapsed behind a toggle when highlights exist */}
                <section className="mt-10 max-w-5xl mx-auto">
                    {project.details?.highlights && (
                        <div className="md:grid md:grid-cols-12 md:gap-12">
                            <button
                                type="button"
                                onClick={() => setWriteUpOpen((v) => !v)}
                                aria-expanded={writeUpOpen}
                                aria-controls="write-up"
                                className="group md:col-start-5 md:col-span-8 inline-flex items-center gap-2 text-sm text-zinc-400 underline underline-offset-4 transition-colors hover:text-white active:scale-[0.97] transition-transform"
                            >
                                {writeUpOpen ? "Hide write-up" : "Read the full write-up"}
                                <CaretDown
                                    size={14}
                                    weight="bold"
                                    aria-hidden
                                    className={`transition-transform duration-300 ease-out ${
                                        writeUpOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    )}

                    <AnimatePresence initial={false}>
                        {(writeUpOpen || !project.details?.highlights) && (
                            <motion.div
                                id="write-up"
                                key="write-up"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="overflow-hidden"
                            >
                    <div className="space-y-16 pt-16">
                        {project.details?.detailedDescription &&
                            project.details.detailedDescription
                                .split("## ")
                                .filter(Boolean)
                                .map((section, index) => {
                                    const splitIndex = section.indexOf("\n");
                                    const title =
                                        splitIndex !== -1
                                            ? section
                                                  .slice(0, splitIndex)
                                                  .trim()
                                            : section;
                                    const content =
                                        splitIndex !== -1
                                            ? section.slice(splitIndex).trim()
                                            : "";

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.5,
                                            }}
                                            className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-l border-zinc-800 pl-6 md:pl-0 md:border-l-0"
                                        >
                                            <div className="md:col-span-4 flex flex-col md:items-end md:text-right relative">
                                                <h3 className="text-xl font-bold text-zinc-100">
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* --- PROJECT NAVIGATION --- */}
                <section className="mt-32 pt-12 border-t border-zinc-800/50">
                    <div className="flex justify-between items-center w-full">
                        {/* PREVIOUS BUTTON */}
                        {prevProject ? (
                            <Link
                                href={`/project/${prevProject.id}`}
                                className="group"
                            >
                                <motion.div
                                    className="flex flex-col items-start gap-1"
                                    whileHover="hover"
                                    initial="rest"
                                >
                                    <div className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-300 transition-colors text-sm font-medium">
                                        <motion.span
                                            className="inline-flex"
                                            variants={{
                                                rest: { x: 0 },
                                                hover: { x: -4 },
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowLeft size={16} weight="bold" aria-hidden />
                                        </motion.span>
                                        Previous
                                    </div>
                                    <span
                                        className={`text-lg md:text-xl font-bold transition-colors text-zinc-100 group-hover:text-signature`}
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
                            >
                                <motion.div
                                    className="flex flex-col items-end gap-1"
                                    whileHover="hover"
                                    initial="rest"
                                >
                                    <div className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-300 transition-colors text-sm font-medium">
                                        Next
                                        <motion.span
                                            className="inline-flex"
                                            variants={{
                                                rest: { x: 0 },
                                                hover: { x: 4 },
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowRight size={16} weight="bold" aria-hidden />
                                        </motion.span>
                                    </div>
                                    <span
                                        className={`text-lg md:text-xl font-bold transition-colors text-zinc-100 group-hover:text-signature`}
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
