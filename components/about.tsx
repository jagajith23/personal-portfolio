"use client";

import {
    motion,
    MotionValue,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./section-heading";
import { useDesign } from "./design-provider";

type RevealColors = [string, string];

// Computed once per page load, outside render.
const AGE =
    new Date(Date.now() - new Date("2003-04-23").getTime()).getUTCFullYear() -
    1970;

// One motion value per word (not per character): the same left-to-right ink
// reveal with roughly a fifth of the animated nodes.
const Word = ({
    children,
    progress,
    range,
    colors,
}: {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
    colors: RevealColors;
}) => {
    const color = useTransform(progress, range, colors);

    return (
        <motion.span
            style={{ color }}
            className="relative mr-3 inline-block leading-tight lg:mr-4"
        >
            {children}
        </motion.span>
    );
};

const About = () => {
    const { design } = useDesign();
    const reduce = useReducedMotion();
    const revealColors: RevealColors =
        design === "brutal" ? ["#c4c1b6", "#0a0a0a"] : ["#3f3f46", "#f4f4f5"];

    // The hero already covers who/what/where. This is the "why" and the person.
    const paragraph = `I care about the unglamorous parts that make software last: clean schemas, reliable pipelines, and interfaces that feel instant. Off the clock, it's LeetCode, Clash Royale, and far too many memes.`;

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = paragraph.split(" ");

    return (
        <section
            id="about"
            className="relative w-full overflow-hidden bg-black font-aoboshi selection:bg-white/20"
        >
            <div className="relative mx-auto flex max-w-7xl flex-col px-6 pb-8 pt-16 md:px-12 md:pb-12 md:pt-24">
                <SectionHeading title="About" />

                <div ref={containerRef} className="relative">
                    <p className="flex flex-wrap text-4xl font-bold tracking-tighter md:text-5xl 2xl:text-7xl">
                        {words.map((word, i) => {
                            const start = i / words.length;
                            const end = start + 1 / words.length;
                            return reduce ? (
                                <span
                                    key={i}
                                    className="mr-3 inline-block leading-tight text-zinc-100 lg:mr-4"
                                >
                                    {word}
                                </span>
                            ) : (
                                <Word
                                    key={i}
                                    progress={scrollYProgress}
                                    range={[start, end]}
                                    colors={revealColors}
                                >
                                    {word}
                                </Word>
                            );
                        })}
                    </p>
                </div>

                <p className="about-meta mt-12 text-base text-zinc-500 md:text-lg">
                    {AGE}, based in India, working full stack.
                </p>
            </div>
        </section>
    );
};

export default About;
