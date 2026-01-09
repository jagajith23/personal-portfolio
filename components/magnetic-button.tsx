import { useMotionValue, useSpring, motion } from "framer-motion";
import { useRef } from "react";

type ArrowDirection =
  | "north-east"
  | "north-west"
  | "south-east"
  | "south-west"
  | "north"
  | "south";

interface MagneticButtonProps {
  onClick: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  arrowHoverDirection?: ArrowDirection;
  arrowDirection?: ArrowDirection;
}

export default function MagneticButton({
  onClick,
  title,
  size = "md",
  arrowHoverDirection = "south-east",
  arrowDirection = "north-east",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.5);
    y.set((clientY - (top + height / 2)) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = {
    sm: "h-20 w-20",
    md: "h-24 w-24 md:h-32 md:w-32",
    lg: "h-32 w-32 md:h-40 md:w-40",
  };

  const rotationMap = {
    "north-east": 0,
    "north-west": -90,
    "south-east": 90,
    "south-west": 180,
    north: -45,
    south: 135,
  };

  const arrowSize = title ? "w-3 h-3" : "w-5 h-5";

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      initial="initial"
      whileHover="hover"
      className={`cursor-pointer group relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-500 hover:border-white/30 ${sizeClasses[size]}`}
    >
      <div className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:translate-y-0" />

      <motion.div className="relative z-2 flex flex-col items-center gap-1">
        {title && (
          <span className="font-aoboshi text-xs tracking-widest text-white transition-colors duration-500 group-hover:text-black md:text-sm">
            {title}
          </span>
        )}

        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className={`stroke-white ${arrowSize} transition-colors duration-500 group-hover:stroke-black`}
          variants={{
            initial: { rotate: rotationMap[arrowDirection] },
            hover: { rotate: rotationMap[arrowHoverDirection] },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}
