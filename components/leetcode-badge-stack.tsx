import { useEffect, useRef, useState } from "react";
import { LeetCodeBadge } from "./footer";

const BADGE_SIZE = 64;
const MAX_OFFSET = 25;

export default function BadgeStack({ badges }: { badges: LeetCodeBadge[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

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

  return (
    <div ref={containerRef} className="relative mt-4 h-20 w-full">
      {visible.map((badge, index) => {
        const isHovered = hoveredId === badge.id;

        return (
          <img
            key={badge.id}
            src={isHovered ? badge.medal.config.iconGif : badge.icon}
            alt={badge.name}
            width={BADGE_SIZE}
            height={BADGE_SIZE}
            onMouseEnter={() => setHoveredId(badge.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute top-0 cursor-pointer transition-transform duration-200 ease-out"
            style={{
              transform: `
                  translateX(${index * offset}px)
                  translateY(${isHovered ? "-12px" : "0px"})
                  scale(${isHovered ? 1.15 : 1})
                `,
              zIndex: isHovered ? 50 : index + 1,
            }}
          />
        );
      })}
    </div>
  );
}
