"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAchievements } from "./achievements";
import { useFunEvent } from "./fun-events";

// The stage carries the traced drawings, so it only loads on demand.
const SiuStage = dynamic(() => import("./siu-stage"), { ssr: false });

/** The hero portrait's wrapper, when it is on screen to perform in. */
function findHeroStage() {
    const el = document.querySelector<HTMLElement>("[data-siu-stage]");
    if (!el || el.offsetParent === null) return null;
    const r = el.getBoundingClientRect();
    const slack = r.height * 0.25;
    const visible = r.top > -slack && r.bottom < window.innerHeight + slack;
    return visible && window.scrollY < 120 ? el : null;
}

/**
 * The "SIUUU": a full-body doodle runs in, jumps, turns in the air, lands
 * arms out with its back (and the 23) to the viewer, then turns to shout.
 * Plays over the hero portrait when that is in view, otherwise from the
 * bottom of the screen.
 */
export default function Siu() {
    const { unlock } = useAchievements();
    const [run, setRun] = useState<{
        id: number;
        host: HTMLElement | null;
    } | null>(null);
    const runs = useRef(0);

    useFunEvent("fun:siu", () => {
        if (run) return;
        unlock("siu");
        setRun({ id: runs.current++, host: findHeroStage() });
    });

    if (!run) return null;

    return createPortal(
        <SiuStage key={run.id} host={run.host} onDone={() => setRun(null)} />,
        run.host ?? document.body,
    );
}
