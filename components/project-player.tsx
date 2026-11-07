"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "@/app/constants";

const clock = (s: number) => {
    const t = Math.max(0, Math.floor(s));
    return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};

/**
 * The project page's demo: the same muted loop as the cards, plus a play/pause
 * button and a scrubber so the whole tour can be watched at its own pace.
 * Fills its (positioned) parent. It autoplays only while on screen; once
 * someone pauses it, scrolling never restarts it behind their back.
 */
export default function ProjectPlayer({
    video,
    title,
}: {
    video: ProjectVideo;
    title: string;
}) {
    const reduce = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    const rangeRef = useRef<HTMLInputElement>(null);
    const scrubRef = useRef<HTMLDivElement>(null);
    const userPaused = useRef(false);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [second, setSecond] = useState(0);

    const paint = useCallback(() => {
        const el = videoRef.current;
        const range = rangeRef.current;
        const scrub = scrubRef.current;
        if (!el || !range || !scrub || !el.duration) return;
        range.value = String(el.currentTime);
        scrub.style.setProperty("--p", `${(el.currentTime / el.duration) * 100}%`);
        setSecond(Math.floor(el.currentTime));
    }, []);

    // The clip can finish loading its metadata before React hydrates, so the
    // onLoadedMetadata below would never fire; read it once after mount too.
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const el = videoRef.current;
            if (el && el.readyState >= 1) setDuration(el.duration);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    // Autoplay while visible, unless reduced motion or the viewer paused it.
    useEffect(() => {
        const el = videoRef.current;
        if (!el || reduce) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !userPaused.current) {
                    el.play().catch(() => {});
                } else if (!entry.isIntersecting) {
                    el.pause();
                }
            },
            { threshold: 0.25 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [reduce]);

    // timeupdate fires ~4x/s, which makes a scrubber stutter; ride rAF instead.
    useEffect(() => {
        if (!playing) return;
        let frame = requestAnimationFrame(function tick() {
            paint();
            frame = requestAnimationFrame(tick);
        });
        return () => cancelAnimationFrame(frame);
    }, [playing, paint]);

    const toggle = () => {
        const el = videoRef.current;
        if (!el) return;
        if (el.paused) {
            userPaused.current = false;
            el.play().catch(() => {});
        } else {
            userPaused.current = true;
            el.pause();
        }
    };

    const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const el = videoRef.current;
        if (!el) return;
        el.currentTime = Number(e.target.value);
        paint();
    };

    return (
        <div
            role="group"
            aria-label={`${title} demo video`}
            className="group/player absolute inset-0"
        >
            <video
                ref={videoRef}
                poster={video.poster}
                muted
                loop
                playsInline
                preload="metadata"
                onClick={toggle}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onLoadedMetadata={(e) => {
                    setDuration(e.currentTarget.duration);
                    paint();
                }}
                className="h-full w-full cursor-pointer object-cover object-top"
            >
                <source src={video.webm} type="video/webm" />
                <source src={video.mp4} type="video/mp4" />
            </video>

            {/* Play/pause and time. Always shown while paused and on touch
                screens; otherwise only on hover or keyboard focus. */}
            <div
                className={`player-bar absolute bottom-6 left-3 flex items-center gap-1 rounded-md py-1 pl-1 pr-3 transition-opacity duration-150 ease-out ${
                    playing
                        ? "pointer-events-none opacity-0 focus-within:pointer-events-auto focus-within:opacity-100 group-hover/player:pointer-events-auto group-hover/player:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
                        : "opacity-100"
                }`}
            >
                <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? "Pause demo" : "Play demo"}
                    className="player-btn grid h-8 w-8 shrink-0 place-items-center rounded transition-[transform,background-color] duration-150 ease-out hover:bg-white/10 active:scale-[0.94]"
                >
                    {playing ? (
                        <Pause size={16} weight="fill" aria-hidden />
                    ) : (
                        <Play size={16} weight="fill" aria-hidden />
                    )}
                </button>
                <span className="text-xs tabular-nums opacity-80">
                    {clock(second)} / {clock(duration)}
                </span>
            </div>

            {/* Scrubber flush on the bottom edge: a thin progress line while
                playing that thickens under the pointer or keyboard focus. */}
            <div
                ref={scrubRef}
                className="group/scrub absolute inset-x-0 bottom-0 h-5 has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-signature"
            >
                <div className="player-track pointer-events-none absolute inset-x-0 bottom-0 h-[3px] transition-[height] duration-150 ease-out group-hover/scrub:h-[7px] group-has-[:focus-visible]/scrub:h-[7px] group-active/scrub:h-[7px]">
                    <div
                        className="player-fill h-full"
                        style={{ width: "var(--p, 0%)" }}
                    />
                </div>
                <input
                    ref={rangeRef}
                    type="range"
                    min={0}
                    max={duration || 1}
                    step="any"
                    defaultValue={0}
                    onChange={seek}
                    aria-label="Seek"
                    aria-valuetext={`${clock(second)} of ${clock(duration)}`}
                    className="player-range absolute inset-0 h-full w-full opacity-0"
                />
            </div>
        </div>
    );
}
