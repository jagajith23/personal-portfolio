"use client";

import {
    createContext,
    useCallback,
    useContext,
    useSyncExternalStore,
} from "react";

type Design = "refined" | "brutal";

type DesignContextValue = {
    design: Design;
    toggle: () => void;
    setDesign: (d: Design) => void;
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

    const setDesign = useCallback((d: Design) => {
        try {
            localStorage.setItem("design", d);
        } catch {}
        applyAttribute(d);
        listeners.forEach((l) => l());
    }, []);

    const toggle = useCallback(() => {
        setDesign(readStoredDesign() === "brutal" ? "refined" : "brutal");
    }, [setDesign]);

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
