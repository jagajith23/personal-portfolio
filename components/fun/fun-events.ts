"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight window-based event bus so distant components (navbar, dock,
 * keyboard shortcuts) can open the fun overlays without prop drilling.
 */
export type FunEventName =
    | "fun:open-terminal"
    | "fun:open-palette"
    | "fun:toggle-emotes"
    | "fun:confetti";

export function emitFun(name: FunEventName, detail?: unknown) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function useFunEvent(
    name: FunEventName,
    handler: (detail: unknown) => void,
) {
    const ref = useRef(handler);

    useEffect(() => {
        ref.current = handler;
    });

    useEffect(() => {
        const listener = (e: Event) => ref.current((e as CustomEvent).detail);
        window.addEventListener(name, listener);
        return () => window.removeEventListener(name, listener);
    }, [name]);
}
