"use client";

import About from "@/components/about";
import Hero from "@/components/hero";
import CareerSection from "@/components/intro/career/career-section";
import Navbar from "@/components/navigation/navbar";
import Skills from "@/components/skills";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import ProjectSection from "@/components/projects";
import Footer from "@/components/footer";
import MemeTrail from "@/components/meme-trail";

const Index = () => {
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
      <Navbar />
      <Hero />
      <About />
      <CareerSection />
      <ProjectSection />
      <Skills />
      <MemeTrail />
      <Footer />
    </div>
  );
};

export default Index;
