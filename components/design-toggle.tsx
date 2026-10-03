"use client";

import { useDesign } from "./design-provider";

// Each swatch previews the theme you'd switch TO, split on the diagonal.
const SWATCH = {
    toBrutal: "linear-gradient(135deg, #f3f1e9 50%, #ffd400 50%)",
    toRefined: "linear-gradient(135deg, #0a0a0a 50%, #f2b33d 50%)",
};

export default function DesignToggle() {
    const { design, toggle } = useDesign();
    const isBrutal = design === "brutal";
    const label = isBrutal ? "Refined mode" : "Brutalist mode";

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isBrutal}
            aria-label={`Switch to ${label.toLowerCase()}`}
            onClick={toggle}
            className="design-toggle group relative grid h-8 w-8 shrink-0 cursor-pointer place-items-center transition-transform duration-150 ease-out active:scale-[0.94]"
        >
            <span
                aria-hidden
                style={{
                    backgroundImage: isBrutal
                        ? SWATCH.toRefined
                        : SWATCH.toBrutal,
                }}
                className="design-toggle-swatch block h-5 w-5 rounded-full ring-1 ring-white/25 transition-transform duration-300 ease-out group-hover:rotate-180"
            />

            {/* Hover / focus label, anchored under the button */}
            <span
                aria-hidden
                className="design-toggle-label pointer-events-none absolute left-1/2 top-full mt-3 origin-top -translate-x-1/2 scale-[0.97] whitespace-nowrap rounded-lg border border-white/10 bg-zinc-900 px-2.5 py-1 font-aoboshi text-xs text-zinc-300 opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
            >
                {label}
            </span>
        </button>
    );
}
