"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import SectionHeading from "@/components/section-heading";

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
            visual: "/xome-logo.png",
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

const TechHighlight = React.memo(({ text }: { text: string }) => {
    const escapeRegex = (str: string) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(
        `(${HIGHLIGHT_WORDS.map(escapeRegex).join("|")})`,
        "g",
    );

    const parts = text.split(regex);

    return (
        <span className="leading-relaxed text-zinc-400">
            {parts.map((part, i) => {
                const isHighlight = HIGHLIGHT_WORDS.includes(part);

                if (!isHighlight) {
                    return (
                        <span
                            key={i}
                            className="text-zinc-200 font-medium tracking-wide"
                        >
                            {part}
                        </span>
                    );
                }

                return (
                    <span
                        key={i}
                        className={`
              tech-word
              inline-block relative mx-0.5
              tracking-wide
              transition-all duration-300 ease-out
            `}
                    >
                        {part}
                        <span
                            className={`
                tech-underline
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

TechHighlight.displayName = "TechHighlight";

function getDuration(period: string): string {
    const [startStr, endStr] = period.split(" - ");
    if (!startStr || !endStr) return "";

    const start = new Date(startStr);
    const end = /present/i.test(endStr) ? new Date() : new Date(endStr);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "";

    const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1;
    if (months <= 0) return "";

    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (remMonths > 0) parts.push(`${remMonths} mo${remMonths > 1 ? "s" : ""}`);
    return parts.join(" ");
}

const entryVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
    },
};

const bulletList: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const bulletItem: Variants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

type CareerItem = (typeof CAREER)[number];

const ChevronIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const CareerEntry = ({
    entry,
    index,
    isActive,
    onToggle,
}: {
    entry: CareerItem;
    index: number;
    isActive: boolean;
    onToggle: () => void;
}) => {
    const isPresent = /present\s*$/i.test(entry.period);
    const duration = getDuration(entry.period);

    return (
        <motion.div
            variants={entryVariants}
            className="relative pb-10 pl-16 last:pb-0 md:pl-24"
        >
            {/* Timeline node */}
            <motion.span
                className="absolute left-6 top-8 z-20 -translate-x-1/2 -translate-y-1/2 md:left-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.15,
                }}
            >
                <span className="relative flex h-4 w-4 items-center justify-center">
                    {isPresent && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
                    )}
                    <span
                        className={`relative h-3 w-3 rounded-full ring-4 ring-black transition-colors ${
                            isPresent || isActive
                                ? "bg-zinc-100"
                                : "bg-zinc-600"
                        }`}
                    />
                </span>
            </motion.span>

            {/* Connector from rail to card */}
            <span className="absolute left-6 top-8 h-px w-10 -translate-y-1/2 bg-linear-to-r from-zinc-700 to-transparent md:left-8 md:w-16" />

            {/* Card */}
            <div
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={onToggle}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onToggle();
                    }
                }}
                className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl border p-5 transition-colors duration-300 md:p-6 ${
                    isActive
                        ? "border-white/20 bg-white/[0.05]"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03]"
                }`}
            >
                {/* Decorative index watermark */}
                <span className="pointer-events-none absolute -right-1 top-1 select-none font-sans text-6xl font-bold leading-none text-white/[0.04] md:text-7xl">
                    0{index + 1}
                </span>

                <div className="relative flex items-start gap-4 md:gap-5">
                    {/* Logo */}
                    <div className="career-logo-tile relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/25 md:h-16 md:w-16">
                        <Image
                            src={entry.card.visual}
                            alt={`${entry.company} logo`}
                            fill
                            sizes="64px"
                            className="object-contain p-3.5 opacity-90"
                        />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1 pr-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="text-lg font-medium text-white md:text-2xl">
                                {entry.company}
                            </h3>
                            {isPresent && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-zinc-200 md:text-xs">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-200" />
                                    Present
                                </span>
                            )}
                        </div>
                        <p className="mt-1 text-sm text-zinc-200 md:text-base">
                            {entry.role}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-zinc-500 md:text-sm">
                            <span>{entry.period}</span>
                            {duration && (
                                <>
                                    <span className="text-zinc-700">•</span>
                                    <span className="font-medium text-zinc-400">
                                        {duration}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Chevron */}
                    <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`relative mt-1 shrink-0 transition-colors ${
                            isActive
                                ? "text-white"
                                : "text-zinc-500 group-hover:text-white"
                        }`}
                    >
                        <ChevronIcon />
                    </motion.span>
                </div>

                {/* Expandable bullets */}
                <AnimatePresence initial={false}>
                    {isActive && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative overflow-hidden"
                        >
                            <motion.div
                                variants={bulletList}
                                initial="hidden"
                                animate="show"
                                className="mt-5 flex flex-col gap-5 border-t border-white/[0.06] pt-5 text-neutral-300"
                            >
                                {entry.bullets.map((bullet, idx) => (
                                    <motion.div
                                        key={`${entry.company}-${idx}`}
                                        variants={bulletItem}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                                        <span className="text-sm leading-relaxed md:text-base">
                                            <TechHighlight text={bullet} />
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const Career = () => {
    const [activeId, setActiveId] = useState<number | null>(CAREER[0].id);

    return (
        <section
            id="career"
            className="relative min-h-screen w-full overflow-hidden bg-black font-aoboshi"
        >
            {/* Ambient depth (dark theme only) */}
            <div className="ambient-glow pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-white/[0.03] blur-[120px]" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32 md:px-12">
                <SectionHeading
                    index="02"
                    title="Career"
                    subtitle="The places I've worked and the problems I've helped solve."
                    className="mb-16"
                />

                <motion.div
                    className="relative"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {/* Timeline rail */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute bottom-8 left-6 top-8 w-px origin-top bg-linear-to-b from-zinc-500 via-zinc-700 to-transparent md:left-8"
                    />

                    {CAREER.map((item, index) => (
                        <CareerEntry
                            key={item.id}
                            entry={item}
                            index={index}
                            isActive={activeId === item.id}
                            onToggle={() =>
                                setActiveId(
                                    activeId === item.id ? null : item.id,
                                )
                            }
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Career;
