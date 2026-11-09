import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LeetCodeBadge } from "./footer";

const BADGE_SIZE = 64;
const MAX_OFFSET = 25;
const LIFT = 12;
const GROW = 0.15;
// Pointer x that is far from every badge, so nothing is influenced.
const AWAY = -10_000;
// The GIF only starts once the cursor has rested on a badge this long, so
// sweeping across the row never flashes half-faded GIFs over the stills.
const GIF_DWELL_MS = 140;
const HOT_SPRING = { stiffness: 520, damping: 38, mass: 0.6 };
const SPRING = { stiffness: 260, damping: 26, mass: 0.7 };

/**
 * Badges are driven by the pointer's x position rather than discrete hover
 * states. Each one rises and grows by how close the pointer is to its centre
 * (a soft bump that travels with the cursor, like a dock), through a spring,
 * so sweeping across the row is one continuous wave and nothing is handed off
 * between badges or left behind.
 */
function Badge({
  badge,
  index,
  offset,
  pointerX,
  active,
  gif,
  reduce,
}: {
  badge: LeetCodeBadge;
  index: number;
  offset: number;
  pointerX: MotionValue<number>;
  active: boolean;
  gif: boolean;
  reduce: boolean;
}) {
  // useTransform(fn) captures fn once, so read the live values through a ref
  // (the fan-out offset changes when the column resizes).
  const current = {
    center: index * offset + BADGE_SIZE / 2,
    sigma: offset * 1.8,
    reduce,
  };
  const params = useRef(current);
  useEffect(() => {
    params.current = current;
  });

  const influence = useSpring(
    useTransform(() => {
      const { center, sigma, reduce } = params.current;
      if (reduce) return 0;
      const d = pointerX.get() - center;
      return Math.exp(-(d * d) / (2 * sigma * sigma));
    }),
    SPRING,
  );
  const y = useTransform(influence, (v) => -LIFT * v);
  const scale = useTransform(influence, (v) => 1 + GROW * v);
  // Layering keeps the resting order (later badges in front). Only the badge
  // under the cursor comes forward, on its own spring, so as the cursor moves
  // on, the old one sinks back while the new one rises: they trade places
  // part-way, never in a jump, and the badges around them never reshuffle.
  const hot = useSpring(0, HOT_SPRING);
  useEffect(() => {
    // Rise on a spring, but drop straight back to the resting order: a badge
    // that is sinking must not linger in front of the ones that sit above it.
    if (active) hot.set(1);
    else hot.jump(0);
  }, [active, hot]);
  // A step at the halfway point, not a ramp: a ramp would keep a sinking badge
  // in front of its right-hand neighbour until it had fully settled.
  const zIndex = useTransform(hot, (v) => (v > 0.5 ? 1000 : 0) + index);

  return (
    <motion.div
      className="pointer-events-none absolute top-0 will-change-transform"
      style={{ width: BADGE_SIZE, height: BADGE_SIZE, x: index * offset, y, scale, zIndex }}
    >
      {/* A plain swap, no fade: the GIF has transparent regions, so layering
          it over the still would show a doubled badge. It is preloaded, so the
          change is instant in both directions. */}
      <img
        src={gif ? badge.medal.config.iconGif : badge.icon}
        alt={badge.name}
        width={BADGE_SIZE}
        height={BADGE_SIZE}
        draggable={false}
        className="absolute inset-0"
      />
    </motion.div>
  );
}

export default function BadgeStack({ badges }: { badges: LeetCodeBadge[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gifIndex, setGifIndex] = useState<number | null>(null);
  const pointerX = useMotionValue(AWAY);
  const reduce = !!useReducedMotion();

  // Fan the badges out to fit the column instead of spilling into the next one.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visible = badges
    .filter((item) => item.category !== "DCC" && item.category !== "STUDY_PLAN")
    .toSorted(
      (a, b) =>
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime(),
    );

  const offset =
    visible.length > 1 && width > 0
      ? Math.min(MAX_OFFSET, (width - BADGE_SIZE) / (visible.length - 1))
      : MAX_OFFSET;

  // Hovering swaps in the animated GIF. Fetch them up front so the swap is
  // instant instead of stalling mid-lift on the first hover.
  useEffect(() => {
    for (const badge of badges) {
      new window.Image().src = badge.medal.config.iconGif;
    }
  }, [badges]);

  // Promote the active badge to "GIF on" only after the cursor has rested.
  useEffect(() => {
    if (activeIndex === null) return;
    const timer = setTimeout(() => setGifIndex(activeIndex), GIF_DWELL_MS);
    return () => {
      clearTimeout(timer);
      setGifIndex(null);
    };
  }, [activeIndex]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    pointerX.set(x);
    // The GIF plays on the badge nearest the pointer, while it is over the row.
    const nearest = Math.round((x - BADGE_SIZE / 2) / offset);
    const index = Math.min(Math.max(nearest, 0), visible.length - 1);
    const inside = Math.abs(x - (index * offset + BADGE_SIZE / 2)) <= BADGE_SIZE / 2;
    setActiveIndex(inside ? index : null);
  };

  const onLeave = () => {
    pointerX.set(AWAY);
    setActiveIndex(null);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative isolate mt-4 h-20 w-full ${
        activeIndex !== null ? "cursor-pointer" : ""
      }`}
    >
      {visible.map((badge, index) => (
        <Badge
          key={badge.id}
          badge={badge}
          index={index}
          offset={offset}
          pointerX={pointerX}
          active={activeIndex === index}
          gif={gifIndex === index && activeIndex === index}
          reduce={reduce}
        />
      ))}
    </div>
  );
}
