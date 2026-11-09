"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  DOODLE_PUPILS,
  DOODLE_SIZE,
  DOODLE_STROKES,
} from "./hero-doodle-paths";

// Same drawing as the hero, sketched again as the footer scrolls into view.
const DRAW_START = 0.15;
const DRAW_SPAN = 1.7;
const TOTAL = DOODLE_STROKES.reduce((sum, [, len]) => sum + len, 0);

const STROKES = (() => {
  let drawn = 0;
  return DOODLE_STROKES.map(([d, len]) => {
    const delay = DRAW_START + (drawn / TOTAL) * DRAW_SPAN;
    drawn += len;
    const duration = Math.min(0.8, Math.max(0.22, len / 1000));
    return { d, delay, duration };
  });
})();
const PUPILS_IN = DRAW_START + DRAW_SPAN + 0.2;

/**
 * The hero portrait again, bleeding off the bottom of the footer. It sits
 * behind a clip, rises into place over the last stretch of scrolling (so it
 * peeks up from the page edge) and draws itself as it arrives. Decorative:
 * the hero already carries the portrait for assistive tech.
 */
export default function FooterDoodle({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.1 });

  // 0 when the clip's top edge reaches the bottom of the viewport, 1 when its
  // bottom edge does, i.e. when the page can scroll no further.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const rise = useSpring(useTransform(scrollYProgress, [0, 1], [74, 0]), {
    stiffness: 110,
    damping: 24,
    mass: 0.5,
  });
  const y = useTransform(rise, (v) => (reduce ? "0%" : `${v}%`));

  return (
    <div
      ref={ref}
      aria-hidden
      // The caller sets the width and a height shorter than the drawing, so
      // the shoulders run off the bottom (an explicit height: aspect-ratio
      // let the clip grow to its content in WebKit).
      className={`overflow-hidden ${className ?? ""}`}
    >
      <motion.div style={{ y }} className="will-change-transform">
        <svg
          viewBox={`0 0 ${DOODLE_SIZE} ${DOODLE_SIZE}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hero-doodle block w-full"
          // The hero fades its shoulders out; here the page edge crops them.
          style={{ maskImage: "none", WebkitMaskImage: "none" }}
        >
          {/* Mounted on arrival, so the CSS draw-on starts then and not at
              page load, long before anyone has scrolled this far. */}
          {seen &&
            STROKES.map(({ d, delay, duration }, i) => (
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
          {seen && (
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
          )}
        </svg>
      </motion.div>
    </div>
  );
}
