import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HoverPreview = ({
  images,
  x,
  y,
  visible,
}: {
  images: string[];
  x: number;
  y: number;
  visible: boolean;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible || images.length <= 1) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      1000
    );

    return () => clearInterval(id);
  }, [visible, images]);

  return (
    <motion.div
      animate={{
        opacity: visible ? 1 : 0,
        x: x + 24,
        y: y + 24,
        scale: visible ? 1 : 0.96,
      }}
      transition={{ duration: 0.2 }}
      className="fixed pointer-events-none z-9999"
    >
      <div className="w-60 h-40 border border-zinc-700 bg-black">
        {images[0] && (
          <img
            src={images[index]}
            className="w-full h-full object-cover"
            draggable={false}
          />
        )}
      </div>
    </motion.div>
  );
};

export default HoverPreview;
