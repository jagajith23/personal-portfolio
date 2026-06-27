"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAchievements } from "./achievements";
import { useFunEvent } from "./fun-events";
import { useModKey } from "./use-mod-key";
import { type FunAction, useFunActions } from "./use-fun-actions";

const GROUP_ORDER: FunAction["group"][] = [
    "Navigate",
    "Projects",
    "Theme",
    "Social",
    "Fun",
];

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const { unlock } = useAchievements();
    const actions = useFunActions();
    const mod = useModKey();

    const openPalette = () => {
        setOpen(true);
        unlock("power_user");
    };

    useFunEvent("fun:open-palette", openPalette);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((o) => {
                    const next = !o;
                    if (next) unlock("power_user");
                    return next;
                });
            } else if (e.key === "Escape") {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [unlock]);

    useEffect(() => {
        if (open) {
            setQuery("");
            setActive(0);
            const id = setTimeout(() => inputRef.current?.focus(), 20);
            return () => clearTimeout(id);
        }
    }, [open]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return actions;
        return actions.filter((a) =>
            `${a.label} ${a.keywords ?? ""} ${a.group}`
                .toLowerCase()
                .includes(q),
        );
    }, [query, actions]);

    useEffect(() => {
        setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
    }, [filtered.length]);

    const run = (action?: FunAction) => {
        if (!action) return;
        action.perform();
        setOpen(false);
    };

    const onInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            run(filtered[active]);
        }
    };

    useEffect(() => {
        listRef.current
            ?.querySelector(`[data-index="${active}"]`)
            ?.scrollIntoView({ block: "nearest" });
    }, [active]);

    const grouped = useMemo(() => {
        const map = new Map<FunAction["group"], FunAction[]>();
        filtered.forEach((a) => {
            const list = map.get(a.group) ?? [];
            list.push(a);
            map.set(a.group, list);
        });
        return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
            group: g,
            items: map.get(g)!,
        }));
    }, [filtered]);

    const flatIndex = (() => {
        let i = 0;
        const indices = new Map<string, number>();
        grouped.forEach(({ items }) =>
            items.forEach((item) => indices.set(item.id, i++)),
        );
        return indices;
    })();

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[18vh]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                        }}
                        data-fun-surface
                        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-2xl shadow-black/60 backdrop-blur-xl"
                    >
                        <div className="flex items-center gap-3 border-b border-white/10 px-4">
                            <span className="shrink-0 text-zinc-500">
                                {mod === "⌘" ? "⌘K" : "Ctrl K"}
                            </span>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onInputKeyDown}
                                placeholder="Type a command or search…"
                                className="w-full bg-transparent py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                            />
                        </div>

                        <div
                            ref={listRef}
                            data-lenis-prevent
                            className="fun-scroll max-h-[50vh] overflow-y-auto p-2"
                        >
                            {grouped.length === 0 && (
                                <p className="px-3 py-6 text-center text-sm text-zinc-500">
                                    No matches. Try “projects”, “brutal” or
                                    “email”.
                                </p>
                            )}
                            {grouped.map(({ group, items }) => (
                                <div key={group} className="mb-1">
                                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                                        {group}
                                    </p>
                                    {items.map((item) => {
                                        const idx = flatIndex.get(item.id) ?? 0;
                                        const isActive = idx === active;
                                        return (
                                            <button
                                                key={item.id}
                                                data-index={idx}
                                                data-active={isActive}
                                                onMouseMove={() =>
                                                    setActive(idx)
                                                }
                                                onClick={() => run(item)}
                                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                                    isActive
                                                        ? "bg-white/10 text-white"
                                                        : "text-zinc-300 hover:bg-white/5"
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                                {item.hint && (
                                                    <span className="text-xs text-zinc-500">
                                                        {item.hint}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2 text-[11px] text-zinc-500">
                            <span>↑↓ navigate</span>
                            <span>↵ select</span>
                            <span>esc close</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
