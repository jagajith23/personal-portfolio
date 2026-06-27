"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAchievements } from "./achievements";
import { useFunEvent } from "./fun-events";

/**
 * Clash-Royale-style emotes — tap to spam them like an in-game opponent.
 *
 * Each emote renders Google's free **Noto Animated Emoji** (animated WebP from
 * the official gstatic CDN) via `src`, and falls back to the plain emoji if the
 * image can't load. To use your own art instead (e.g. real CR emote GIFs), drop
 * files in `public/emotes/` and point `src` there: src: "/emotes/king.gif".
 */
type Emote = { id: string; label: string; emoji: string; src?: string };

// Google Noto Animated Emoji — animated WebP served from the official CDN.
const noto = (codepoint: string) =>
    `https://fonts.gstatic.com/s/e/notoemoji/latest/${codepoint}/512.webp`;

const EMOTES: Emote[] = [
    { id: "king", label: "King", emoji: "👑", src: noto("1f451") },
    { id: "laugh", label: "Laugh", emoji: "😂", src: noto("1f602") },
    { id: "cry", label: "Cry", emoji: "😭", src: noto("1f62d") },
    { id: "rage", label: "Rage", emoji: "😡", src: noto("1f621") },
    { id: "gg", label: "GG", emoji: "👍", src: noto("1f44d") },
    { id: "party", label: "Party", emoji: "🎉", src: noto("1f389") },
    { id: "fire", label: "On Fire", emoji: "🔥", src: noto("1f525") },
    { id: "cool", label: "Cool", emoji: "😎", src: noto("1f60e") },
];

type Flying = { uid: number; emote: Emote; x: number };

let emoteCounter = 0;
function createFlyingEmote(emote: Emote): Flying {
    // Drift leftward into the viewport (anchored at the bottom-right corner).
    return { uid: emoteCounter++, emote, x: -(Math.random() * 80 + 5) };
}

/** Renders the real emote image when available, otherwise the emoji fallback. */
function EmoteGraphic({
    emote,
    variant,
}: {
    emote: Emote;
    variant: "tray" | "flying";
}) {
    const [failed, setFailed] = useState(false);
    const flying = variant === "flying";

    if (emote.src && !failed) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={emote.src}
                alt={emote.label}
                draggable={false}
                onError={() => setFailed(true)}
                className={
                    flying
                        ? "h-16 w-16 max-w-none object-contain"
                        : "h-9 w-9 max-w-none object-contain"
                }
            />
        );
    }

    return (
        <span className={flying ? "text-5xl" : "text-2xl"}>{emote.emoji}</span>
    );
}

export default function ClashRoyaleEmotes() {
    const [open, setOpen] = useState(false);
    const [flying, setFlying] = useState<Flying[]>([]);
    const { unlock } = useAchievements();
    const trayRef = useRef<HTMLDivElement>(null);

    useFunEvent("fun:toggle-emotes", () => setOpen((o) => !o));

    // Close on outside click (but not the dock toggle) or Escape.
    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                trayRef.current &&
                !trayRef.current.contains(target) &&
                !target.closest('[aria-label="Emotes"]')
            ) {
                setOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const sendEmote = (emote: Emote) => {
        const item = createFlyingEmote(emote);
        setFlying((f) => [...f, item]);
        unlock("emoter");
        setTimeout(() => {
            setFlying((f) => f.filter((i) => i.uid !== item.uid));
        }, 1700);
    };

    return (
        <>
            {/* Flying emotes erupt from the tray and arc up into the page */}
            <div className="pointer-events-none fixed bottom-32 right-16 z-[67] h-0 w-0">
                <AnimatePresence>
                    {flying.map((item) => (
                        <motion.span
                            key={item.uid}
                            initial={{
                                opacity: 0,
                                y: 0,
                                scale: 0.2,
                                rotate: 0,
                            }}
                            animate={{
                                opacity: [0, 1, 1, 1, 0],
                                y: [0, -70, -170, -270, -350],
                                x: [
                                    0,
                                    item.x * 0.5,
                                    item.x,
                                    item.x * 1.15,
                                    item.x * 1.25,
                                ],
                                scale: [0.2, 1.5, 1, 1.15, 0.9],
                                rotate: [0, -8, 5, -3, 0],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.6,
                                ease: "easeOut",
                                times: [0, 0.15, 0.45, 0.75, 1],
                            }}
                            className="absolute bottom-0 right-0 block select-none"
                        >
                            <EmoteGraphic emote={item.emote} variant="flying" />
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>

            {/* Emote tray */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 30,
                        }}
                        ref={trayRef}
                        data-fun-surface
                        className="fixed bottom-24 right-6 z-[66] flex max-w-[calc(100vw-3rem)] flex-wrap items-center justify-end gap-0.5 rounded-2xl border border-white/10 bg-zinc-950/70 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
                    >
                        {EMOTES.map((emote) => (
                            <button
                                key={emote.id}
                                title={emote.label}
                                aria-label={emote.label}
                                onClick={() => sendEmote(emote)}
                                className="group relative grid h-12 w-12 place-items-center rounded-xl transition-colors duration-200 hover:bg-white/10 active:scale-90"
                            >
                                <span
                                    data-fun-surface
                                    className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 scale-90 whitespace-nowrap rounded-md border border-white/10 bg-zinc-900/95 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300 opacity-0 shadow-lg transition-all duration-150 group-hover:scale-100 group-hover:opacity-100"
                                >
                                    {emote.label}
                                </span>
                                <span className="block transition-transform duration-200 will-change-transform group-hover:-translate-y-0.5 group-hover:scale-125">
                                    <EmoteGraphic
                                        emote={emote}
                                        variant="tray"
                                    />
                                </span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
