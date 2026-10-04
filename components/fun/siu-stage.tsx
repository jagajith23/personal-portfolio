"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fireConfetti } from "./confetti";
import { SIU_FRAMES } from "./siu-art";
import {
    SIU_BACK_FRAME,
    SIU_DURATION,
    SIU_POSE_TIME,
    SIU_QUIET,
    SIU_SHOUT,
    SIU_STAGE,
    siuFrame,
} from "./siu-rig";

const LETTERS = ["S", "I", "U", "U", "U", "U"];

/**
 * The performance itself: plays once, then calls onDone. With a host (the
 * hero portrait's wrapper) it fills that box; without one it stands at the
 * bottom of the screen.
 */
export default function SiuStage({
    host,
    onDone,
}: {
    host: HTMLElement | null;
    onDone: () => void;
}) {
    const svg = useRef<SVGSVGElement>(null);
    // Reduced motion: hold the pose, no run, jump or confetti.
    const [still] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    const [shout, setShout] = useState(still);
    const done = useRef(onDone);

    useEffect(() => {
        done.current = onDone;
    });

    useEffect(() => {
        const el = svg.current;
        if (!el) return;

        const pick = (name: string) =>
            el.querySelector<SVGGElement>(`[data-siu="${name}"]`)!;
        const scene = pick("scene");
        const root = pick("root");
        const dust = pick("dust");
        const drawings = [...root.children] as SVGGElement[];

        const draw = (t: number) => {
            const f = siuFrame(t);
            scene.style.opacity = String(f.opacity);
            root.setAttribute("transform", f.transform);
            drawings.forEach((g, i) => {
                g.style.display = i === f.drawing ? "" : "none";
            });
            dust.style.opacity = f.dust < 0 ? "0" : String(1 - f.dust);
            dust.style.setProperty("--puff", String(Math.max(0, f.dust)));
        };

        // The portrait steps aside while its full-body double performs.
        host?.setAttribute("data-siu-playing", "");
        const release = () => host?.removeAttribute("data-siu-playing");

        if (still) {
            draw(SIU_POSE_TIME);
            const timer = setTimeout(() => done.current(), 2400);
            return () => {
                clearTimeout(timer);
                release();
            };
        }

        let frame = 0;
        let shouted = false;
        const start = performance.now();
        const tick = (now: number) => {
            const t = (now - start) / 1000;
            if (t >= SIU_DURATION) {
                done.current();
                return;
            }
            draw(t);
            if (!shouted && t >= SIU_SHOUT) {
                shouted = true;
                setShout(true);
                fireConfetti(90);
            }
            if (shouted && t >= SIU_QUIET) setShout(false);
            if (t >= SIU_DURATION - 0.3) release();
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            release();
        };
    }, [host, still]);

    return (
        <div
            aria-hidden
            className={`siu-stage pointer-events-none text-zinc-100 ${
                host
                    ? "absolute inset-0"
                    : "fixed bottom-0 left-1/2 z-[90] aspect-square w-[min(24rem,88vw)] -translate-x-1/2"
            }`}
        >
            <svg
                ref={svg}
                viewBox={`0 0 ${SIU_STAGE} ${SIU_STAGE}`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 h-full w-full overflow-visible"
            >
                <g data-siu="scene" style={{ opacity: 0 }}>
                    <path
                        d="M40 473C140 470 270 475 404 471"
                        strokeWidth={2.25}
                        opacity={0.35}
                    />
                    <g data-siu="dust" className="siu-dust" strokeWidth={2.25}>
                        <path d="M126 460C114 450 102 454 98 464M104 442L95 431M86 458L72 454" />
                        <path d="M354 460C366 450 378 454 382 464M376 442L385 431M394 458L408 454" />
                    </g>

                    <g data-siu="root">
                        {SIU_FRAMES.map((drawing, i) => (
                            <g key={i} style={{ display: "none" }}>
                                {/* A page-coloured silhouette under the ink,
                                    so the figure hides what it stands on. */}
                                <path
                                    d={drawing.fill}
                                    className="siu-fill"
                                    stroke="none"
                                />
                                <path
                                    d={drawing.ink}
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    strokeWidth={1.4}
                                />
                                {i === SIU_BACK_FRAME && (
                                    <g
                                        textAnchor="middle"
                                        className="siu-number font-aoboshi"
                                    >
                                        <text
                                            x={-6}
                                            y={-578}
                                            fontSize={26}
                                            letterSpacing={2}
                                        >
                                            JAGAJITH
                                        </text>
                                        <text x={-6} y={-468} fontSize={110}>
                                            23
                                        </text>
                                    </g>
                                )}
                            </g>
                        ))}
                    </g>
                </g>
            </svg>

            <div className="siu-shout absolute inset-x-0 top-[3%] flex -rotate-3 justify-center font-aoboshi text-5xl tracking-[0.06em] text-signature sm:text-6xl">
                <AnimatePresence>
                    {shout &&
                        LETTERS.map((letter, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                initial={{ opacity: 0, y: 14, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 520,
                                        damping: 18,
                                        delay: i * 0.055,
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -8,
                                    transition: {
                                        duration: 0.18,
                                        ease: [0.23, 1, 0.32, 1],
                                    },
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
