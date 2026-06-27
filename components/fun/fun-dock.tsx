"use client";

import { motion } from "framer-motion";
import { Command, Crown, TerminalSquare } from "lucide-react";
import { emitFun } from "./fun-events";
import { useModKey } from "./use-mod-key";

/** Small floating launcher for the fun overlays (also handy on touch devices). */
export default function FunDock() {
    const mod = useModKey();
    const buttons = [
        {
            label: "Emotes",
            icon: <Crown size={18} />,
            onClick: () => emitFun("fun:toggle-emotes"),
        },
        {
            label: "Terminal (`)",
            icon: <TerminalSquare size={18} />,
            onClick: () => emitFun("fun:open-terminal"),
        },
        {
            label: `Command palette (${mod === "⌘" ? "⌘K" : "Ctrl+K"})`,
            icon: <Command size={18} />,
            onClick: () => emitFun("fun:open-palette"),
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-[55] flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/50 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
            {buttons.map((b) => (
                <button
                    key={b.label}
                    type="button"
                    title={b.label}
                    aria-label={b.label}
                    onClick={b.onClick}
                    className="fun-dock-btn grid h-9 w-9 cursor-pointer place-items-center rounded-full text-zinc-300 transition-all duration-150 hover:translate-y-0.5 hover:bg-white/10 hover:text-white"
                >
                    {b.icon}
                </button>
            ))}
        </motion.div>
    );
}
