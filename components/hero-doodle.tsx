"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { emitFun } from "./fun/fun-events";
import {
  DOODLE_PUPILS,
  DOODLE_SIZE,
  DOODLE_STROKES,
} from "./hero-doodle-paths";

// The portrait starts once the hero copy has settled, then takes ~2.4s to
// sketch itself top to bottom. Several strokes are on the page at once, like
// a fast hand, so no single line has to rush.
const DRAW_START = 1.1;
const DRAW_SPAN = 2.2;
const TOTAL = DOODLE_STROKES.reduce((sum, [, len]) => sum + len, 0);

const STROKES = (() => {
  let drawn = 0;
  return DOODLE_STROKES.map(([d, len]) => {
    const delay = DRAW_START + (drawn / TOTAL) * DRAW_SPAN;
    drawn += len;
    // Long lines get more time, short ticks stay quick.
    const duration = Math.min(0.9, Math.max(0.25, len / 900));
    return { d, delay, duration };
  });
})();

const PUPILS_IN = DRAW_START + DRAW_SPAN + 0.3;
// How far the pupils can travel (viewBox units) before leaving the eyelids.
const LOOK = 5;

// Spider-sense: wavy lines fanned around the curls. They start just outside
// the hair (an ellipse around it) and alternate long and short, trimmed where
// the drawing's edge is close.
const SENSE = [-168, -150, -131, -112, -90, -68, -49, -30, -12].map(
  (deg, i) => {
    const a = (deg * Math.PI) / 180;
    const [ux, uy] = [Math.cos(a), Math.sin(a)];
    const from = 1 / Math.hypot(ux / 345, uy / 190) + 28;
    const [x, y] = [598 + ux * from, 265 + uy * from];
    const room = uy < 0 ? (y - 16) / -uy : Infinity;
    const len = Math.min(i % 2 ? 64 : 108, room);
    const waves = Math.max(2, Math.round(len / 24));
    const at = (k: number, off: number) =>
      `${(x + ux * len * k - uy * off).toFixed(0)} ${(y + uy * len * k + ux * off).toFixed(0)}`;
    // One quadratic bump, then smooth mirrored ones to the tip.
    let d = `M${at(0, 0)}Q${at(0.5 / waves, 15)} ${at(1 / waves, 0)}`;
    for (let w = 2; w <= waves; w++) d += `T${at(w / waves, 0)}`;
    return d;
  },
);
// The cursor wakes the lines inside this radius (in drawing widths, from the
// middle of the curls) and they rest again a little further out.
const SENSE_ON = 0.6;
const SENSE_OFF = 0.68;

/**
 * Line-doodle self portrait for the hero's right column. It draws itself on
 * load (CSS keyframes, so it stays smooth while the page hydrates), its eyes
 * follow the cursor on a spring, and it warms to the accent on hover. A
 * cursor coming close sets off its spider-sense, and a click sends in the
 * full-body double for a "SIUUU" (see fun/siu.tsx, which performs in this
 * wrapper).
 */
export default function HeroDoodle({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const spring = { stiffness: 120, damping: 16, mass: 0.5 };
  const lookX = useSpring(useMotionValue(0), spring);
  const lookY = useSpring(useMotionValue(0), spring);
  const [sense, setSense] = useState(false);

  useEffect(() => {
    if (
      reduce ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r || r.width === 0) return;
      // Eyes sit at ~48% across, ~41% down the drawing.
      const dx = e.clientX - (r.left + r.width * 0.48);
      const dy = e.clientY - (r.top + r.height * 0.41);
      const dist = Math.hypot(dx, dy) || 1;
      // Ease toward full deflection as the cursor moves away.
      const reach = Math.min(1, dist / (r.width * 0.6));
      lookX.set((dx / dist) * reach * LOOK);
      lookY.set((dy / dist) * reach * LOOK);

      // Curls are centred ~48% across, ~24% down.
      const near =
        Math.hypot(
          e.clientX - (r.left + r.width * 0.48),
          e.clientY - (r.top + r.height * 0.24),
        ) / r.width;
      setSense((on) => (on ? near < SENSE_OFF : near < SENSE_ON));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, lookX, lookY]);

  return (
    <div
      data-siu-stage
      className={`relative cursor-pointer ${className ?? ""}`}
      onClick={() => emitFun("fun:siu")}
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${DOODLE_SIZE} ${DOODLE_SIZE}`}
        role="img"
        aria-label="Hand-drawn doodle portrait of Jagajith"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hero-doodle w-full"
      >
        {STROKES.map(({ d, delay, duration }, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            style={{
              animationDelay: `${delay.toFixed(2)}s`,
              animationDuration: `${duration.toFixed(2)}s`,
            }}
          />
        ))}
        <g className="hero-doodle-sense" data-on={sense} aria-hidden>
          {SENSE.map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </g>
        <motion.g style={{ x: lookX, y: lookY }}>
          <g
            className="hero-doodle-pupils"
            style={{ animationDelay: `${PUPILS_IN}s, ${PUPILS_IN + 2}s` }}
          >
            {DOODLE_PUPILS.map(([cx, cy, r]) => (
              <circle
                key={cx}
                cx={cx}
                cy={cy}
                r={r}
                fill="currentColor"
                stroke="none"
              />
            ))}
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
