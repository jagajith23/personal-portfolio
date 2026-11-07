"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";

const MEMES = [
    "/memes/meme-01.webp",
    "/memes/meme-06.webp",
    "/memes/meme-07.webp",
    "/memes/meme-08.webp",
    "/memes/meme-10.webp",
    "/memes/meme-13.webp",
    "/memes/meme-14.webp",
    "/memes/meme-15.webp",
    "/memes/meme-16.webp",
    "/memes/meme-17.webp",
    "/memes/meme-18.webp",
    "/memes/meme-19.webp",
    "/memes/meme-24.webp",
    "/memes/meme-28.webp",
    "/memes/meme-29.webp",
    "/memes/meme-30.webp",
];

interface TrailItem {
    id: number;
    x: number;
    y: number;
    rotation: number;
    img: string;
}

export default function MemeTrail() {
    const [trail, setTrail] = useState<TrailItem[]>([]);
    const lastPos = useRef({ x: 0, y: 0 });
    const trailIdCounter = useRef(0);

    const currentMemeIndex = useRef(0);
    const sectionRef = useRef<HTMLElement>(null);
    const SPAWN_THRESHOLD = 150;
    const MAX_ITEMS = 15;

    const pointFrom = (e: React.PointerEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        return { x: e.clientX - left, y: e.clientY - top };
    };

    // Warm the browser cache shortly before the section scrolls into view, so
    // the first memes appear instantly instead of popping in mid-animation.
    useEffect(() => {
        // Random start so repeat visitors don't always see the same first meme.
        currentMemeIndex.current = Math.floor(Math.random() * MEMES.length);
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                for (const src of MEMES) new window.Image().src = src;
                observer.disconnect();
            },
            { rootMargin: "800px 0px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const { x, y } = pointFrom(e);
        const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

        if (dist > SPAWN_THRESHOLD) {
            lastPos.current = { x, y };
            spawnItem(x, y);
        }
    };

    // Touch screens never "move" without scrolling, so a tap drops one too.
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const { x, y } = pointFrom(e);
        lastPos.current = { x, y };
        spawnItem(x, y);
    };

    const spawnItem = (x: number, y: number) => {
        const id = trailIdCounter.current++;
        const rotation = Math.random() * 40 - 20;
        const index = currentMemeIndex.current;
        const img = MEMES[index];
        currentMemeIndex.current = (index + 1) % MEMES.length;

        const newItem: TrailItem = { id, x, y, rotation, img };

        setTrail((prev) => {
            const newTrail = [...prev, newItem];
            if (newTrail.length > MAX_ITEMS) {
                return newTrail.slice(newTrail.length - MAX_ITEMS);
            }
            return newTrail;
        });

        setTimeout(() => {
            setTrail((prev) => prev.filter((item) => item.id !== id));
        }, 1500);
    };

    return (
        <section ref={sectionRef} id="after-hours" className="hidden md:block relative w-full bg-black py-16 md:py-24 overflow-hidden font-aoboshi">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 relative z-10">
                <SectionHeading
                    title="After Hours"
                    subtitle="Move your cursor around."
                    className="mb-0"
                />
            </div>

            {/* Interactive Area */}
            <div
                onPointerMove={handlePointerMove}
                onPointerDown={handlePointerDown}
                className="
            relative 
            w-full 
            h-[60vh] 
            cursor-crosshair
            flex
            items-center
            justify-center
            overflow-hidden
            z-0
        "
            >
                <div className="meme-edge-fade pointer-events-none absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black via-black/70 to-transparent z-30" />
                <div className="meme-edge-fade pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black via-black/70 to-transparent z-30" />
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb20_2px,transparent_1px)] bg-size-[48px_48px]" />
                </div>
                <p className="relative z-10 pointer-events-none text-zinc-500 font-bold text-6xl md:text-8xl opacity-30 select-none tracking-tighter mix-blend-color-dodge">
                    CHAOS
                </p>

                <AnimatePresence mode="popLayout">
                    {trail.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{
                                opacity: 0,
                                scale: 0.85,
                                x: item.x,
                                y: item.y,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: item.x,
                                y: item.y,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.85,
                                transition: { duration: 0.3 },
                            }}
                            transition={{
                                type: "spring",
                                damping: 15,
                                stiffness: 200,
                            }}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                rotate: item.rotation,
                                x: "-50%",
                                y: "-50%",
                            }}
                            className="pointer-events-none z-20 w-32 md:w-48 rounded-lg overflow-hidden shadow-2xl border-4 border-white/5 grayscale-[0.3] contrast-125"
                        >
                            <img
                                src={item.img}
                                alt=""
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
