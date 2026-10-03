"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ProjectVideo } from "@/app/constants";

/**
 * A project's cover: a muted looping clip when the project has one, otherwise
 * its image. Fills its (positioned) parent. The clip downloads and plays only
 * while it is on screen, and stays on its poster for reduced motion.
 */
export default function ProjectMedia({
    imageUrl,
    video,
    sizes,
    priority = false,
    className = "",
}: {
    imageUrl: string;
    video?: ProjectVideo;
    sizes: string;
    priority?: boolean;
    className?: string;
}) {
    const ref = useRef<HTMLVideoElement>(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el || reduce) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Autoplay can be refused (e.g. low-power mode); the
                    // poster then simply stays up.
                    el.play().catch(() => {});
                } else {
                    el.pause();
                }
            },
            { threshold: 0.25 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [reduce]);

    if (!video) {
        return (
            <Image
                src={imageUrl}
                alt=""
                fill
                sizes={sizes}
                priority={priority}
                className={`object-cover ${className}`}
            />
        );
    }

    return (
        <video
            ref={ref}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            // Screen recordings keep their headings at the top edge, so a
            // wider frame crops (and hover-scales) from the bottom instead.
            className={`absolute inset-0 h-full w-full origin-top object-cover object-top ${className}`}
        >
            <source src={video.webm} type="video/webm" />
            <source src={video.mp4} type="video/mp4" />
        </video>
    );
}
