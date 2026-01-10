import { useState } from "react";
import { LeetCodeBadge } from "./footer";

const OFFSET = 25;

export default function BadgeStack({ badges }: { badges: LeetCodeBadge[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative h-20 mt-4">
      {badges
        .filter(
          (item) => item.category !== "DCC" && item.category !== "STUDY_PLAN"
        )
        .toSorted(
          (a, b) =>
            new Date(a.creationDate).getTime() -
            new Date(b.creationDate).getTime()
        )
        .map((badge, index) => {
          const isHovered = hoveredId === badge.id;

          return (
            <img
              key={badge.id}
              src={isHovered ? badge.medal.config.iconGif : badge.icon}
              alt={badge.name}
              width={64}
              height={64}
              onMouseEnter={() => setHoveredId(badge.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute top-0 transition-all duration-200 ease-out cursor-pointer"
              style={{
                transform: `
                  translateX(${index * OFFSET}px)
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
