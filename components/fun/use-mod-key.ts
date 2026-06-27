"use client";

import { useEffect, useState } from "react";

/**
 * Returns the platform's command-key label: "⌘" on macOS/iOS, otherwise "Ctrl".
 * Defaults to "Ctrl" for SSR so the first client render matches (no hydration
 * mismatch); upgrades to "⌘" after mount on Apple devices.
 */
export function useModKey() {
    const [mod, setMod] = useState<"⌘" | "Ctrl">("Ctrl");

    useEffect(() => {
        if (/mac|iphone|ipad|ipod/i.test(navigator.userAgent)) {
            setMod("⌘");
        }
    }, []);

    return mod;
}
