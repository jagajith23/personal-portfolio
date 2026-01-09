"use client";

import About from "@/components/about";
import Hero from "@/components/hero";
import CareerSection from "@/components/intro/career/career-section";
import Navbar from "@/components/navigation/navbar";
import Skills from "@/components/skills";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useSpring } from "framer-motion";
import Intro from "@/components/intro/intro-screen";
import { opacity, perspective, slide } from "./animations";
// import CustomCursor from "@/components/custom-cursor";
import ProjectSection from "@/components/projects";
import Footer from "@/components/footer";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const visualProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    document.documentElement.style.setProperty(
      "--scroll-progress-raw",
      `${latest * 100}%`
    );
  });

  useMotionValueEvent(visualProgress, "change", (latest) => {
    document.documentElement.style.setProperty(
      "--scroll-progress",
      `${latest * 100}%`
    );
  });

  return null;
};

const anim = (variants: Variants) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

const Index = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-screen bg-black">
      {/* <CustomCursor /> */}
      <AnimatePresence>
        {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      <>
        <ScrollProgress />
        <div className="scroll-indicator" />
      </>

      {!showIntro && (
        <>
          <Navbar />
          <Hero />
          <About />
          <CareerSection />
          <ProjectSection />
          <Skills />
          <Footer />
          {/* <CareerSection />
    <CareerSection /> */}
        </>
      )}
    </div>
  );
};

export default Index;
