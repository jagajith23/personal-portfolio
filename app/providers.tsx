"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Curve from "./project/[id]/curve";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <Curve key={pathname} backgroundColor="#000">
        {children}
      </Curve>
    </AnimatePresence>
  );
}
