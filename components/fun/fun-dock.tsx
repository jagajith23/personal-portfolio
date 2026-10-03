"use client";

import { motion } from "framer-motion";
import { Command, Crown, TerminalWindow } from "@phosphor-icons/react";
import { emitFun } from "./fun-events";
import { useModKey } from "./use-mod-key";

/** Small floating launcher for the fun overlays (also handy on touch devices). */
export default function FunDock() {
    const mod = useModKey();
    const buttons = [
        {
            label: "Emotes",
            shortcut: null,
            icon: <Crown size={18} />,
            onClick: () => emitFun("fun:toggle-emotes"),
        },
        {
            label: "Terminal",
            shortcut: "`",
            icon: <TerminalWindow size={18} />,
            onClick: () => emitFun("fun:open-terminal"),
        },
        {
            label: "Commands",
            shortcut: mod === "⌘" ? "⌘K" : "Ctrl K",
            icon: <Command size={18} />,
            onClick: () => emitFun("fun:open-palette"),
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fun-dock fixed bottom-6 right-6 z-55 flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/60 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
            {buttons.map((b, i) => (
                <div key={b.label} className="group relative">
                    <button
                        type="button"
                        aria-label={
                            b.shortcut ? `${b.label} (${b.shortcut})` : b.label
                        }
                        onClick={b.onClick}
                        className="fun-dock-btn grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition-[background-color,color,transform] duration-150 ease-out hover:bg-white/10 hover:text-white active:scale-[0.94]"
                    >
                        {b.icon}
                    </button>

                    {/* Hover / focus label: what it is + its shortcut */}
                    <span
                        aria-hidden
                        className={`fun-dock-tip pointer-events-none absolute bottom-full mb-3 flex scale-[0.97] ${
                            // The dock hugs the right edge, so the last label anchors
                            // right to stay on screen; the others centre on their button.
                            i === buttons.length - 1
                                ? "right-0 origin-bottom-right"
                                : "left-1/2 origin-bottom -translate-x-1/2"
                        } items-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-zinc-900 py-1 pl-2.5 pr-1 font-aoboshi text-xs text-zinc-200 opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100`}
                    >
                        {b.label}
                        {b.shortcut ? (
                            <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] leading-none text-zinc-300">
                                {b.shortcut}
                            </kbd>
                        ) : (
                            <span className="pr-1.5" />
                        )}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}
