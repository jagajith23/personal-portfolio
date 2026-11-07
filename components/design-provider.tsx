"use client";

import { flushSync } from "react-dom";
import {
    createContext,
    useCallback,
    useContext,
    useSyncExternalStore,
} from "react";

type Design = "refined" | "brutal";

/** Viewport point the theme change should grow out of (the clicked toggle). */
type Origin = { x: number; y: number };

type DesignContextValue = {
    design: Design;
    toggle: (origin?: Origin) => void;
    setDesign: (d: Design, origin?: Origin) => void;
};

const DesignContext = createContext<DesignContextValue | null>(null);

const listeners = new Set<() => void>();

function readStoredDesign(): Design {
    try {
        return localStorage.getItem("design") === "brutal"
            ? "brutal"
            : "refined";
    } catch {
        return "refined";
    }
}

function applyAttribute(d: Design) {
    if (typeof document === "undefined") return;
    if (d === "brutal") {
        document.documentElement.setAttribute("data-design", "brutal");
    } else {
        document.documentElement.removeAttribute("data-design");
    }
}

function subscribe(callback: () => void) {
    listeners.add(callback);
    return () => {
        listeners.delete(callback);
    };
}

export function DesignProvider({ children }: { children: React.ReactNode }) {
    // useSyncExternalStore reads the persisted value without a setState-in-effect
    // and stays hydration-safe (server snapshot is always "refined", matching the
    // initial HTML; the no-flash script applies the attribute before paint).
    const design = useSyncExternalStore(
        subscribe,
        readStoredDesign,
        () => "refined" as Design,
    );

    const setDesign = useCallback((d: Design, origin?: Origin) => {
        const commit = () => {
            try {
                localStorage.setItem("design", d);
            } catch {}
            applyAttribute(d);
            listeners.forEach((l) => l());
        };

        // Only a pointer click on the toggle passes an origin. Keyboard and
        // command-palette changes are repeated, deliberate actions: no motion.
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (!origin || reduce || !document.startViewTransition) {
            commit();
            return;
        }

        // The browser snapshots the old page, runs this (React must commit
        // inside it, hence flushSync), snapshots the new page, then we reveal
        // the new snapshot through a circle growing from the toggle.
        const { x, y } = origin;
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
        );
        const transition = document.startViewTransition(() => {
            flushSync(commit);
        });
        transition.ready
            .then(() => {
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${radius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration: 500,
                        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                        pseudoElement: "::view-transition-new(root)",
                    },
                );
            })
            .catch(() => {});
    }, []);

    const toggle = useCallback(
        (origin?: Origin) => {
            setDesign(
                readStoredDesign() === "brutal" ? "refined" : "brutal",
                origin,
            );
        },
        [setDesign],
    );

    return (
        <DesignContext.Provider value={{ design, toggle, setDesign }}>
            {children}
        </DesignContext.Provider>
    );
}

export function useDesign() {
    const ctx = useContext(DesignContext);
    if (!ctx) throw new Error("useDesign must be used within a DesignProvider");
    return ctx;
}
