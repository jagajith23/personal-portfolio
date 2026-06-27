"use client";

import { useDesign } from "./design-provider";

export default function DesignToggle() {
    const { design, toggle } = useDesign();
    const isBrutal = design === "brutal";

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isBrutal}
            aria-label="Toggle brutalist design"
            title={isBrutal ? "Switch to refined" : "Switch to brutalist"}
            onClick={toggle}
            className="design-toggle group relative h-7 w-12 shrink-0 cursor-pointer rounded-full border border-white/10 bg-white/5 transition-colors hover:border-white/25"
        >
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 text-[9px] font-bold"
            >
                <span className={isBrutal ? "text-zinc-500" : "text-zinc-900"}>
                    R
                </span>
                <span className={isBrutal ? "text-zinc-900" : "text-zinc-500"}>
                    B
                </span>
            </span>
            <span
                className={`design-toggle-knob pointer-events-none absolute left-1 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-zinc-200 transition-transform duration-300 ${
                    isBrutal ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    );
}
