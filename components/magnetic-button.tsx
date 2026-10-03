import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  motion,
} from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useRef } from "react";

type ArrowDirection =
  | "north-east"
  | "north-west"
  | "south-east"
  | "south-west"
  | "north"
  | "south";

interface MagneticButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  title?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
  arrowHoverDirection?: ArrowDirection;
  arrowDirection?: ArrowDirection;
}

export default function MagneticButton({
  onClick,
  title,
  ariaLabel,
  size = "md",
  arrowHoverDirection = "south-east",
  arrowDirection = "north-east",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
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

  const arrowSize = title ? 12 : 20;

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={`cursor-pointer group relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-500 hover:border-white/30 ${sizeClasses[size]}`}
    >
      <div className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:translate-y-0" />

      <motion.div className="relative z-2 flex flex-col items-center gap-1">
        {title && (
          <span className="font-aoboshi text-xs tracking-widest text-white transition-colors duration-500 group-hover:text-black md:text-sm">
            {title}
          </span>
        )}

        <motion.span
          className="inline-flex text-white transition-colors duration-500 group-hover:text-black"
          variants={{
            initial: { rotate: rotationMap[arrowDirection] },
            hover: { rotate: rotationMap[arrowHoverDirection] },
          }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          <ArrowUpRight size={arrowSize} weight="bold" aria-hidden />
        </motion.span>
      </motion.div>
    </motion.button>
  );
}
