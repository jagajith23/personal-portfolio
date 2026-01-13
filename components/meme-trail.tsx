"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

const MEMES = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExam92YXc3ejBoenkxeTdveDJ5NnNyZDZud2NwMzh0YzRicnVrbXVxNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LdrZAPftAWx4HY0Rma/200.webp",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V1OWw2eXl3bnR4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LdOyjZ7io5Msw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4Z2Z4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13CoXDiaCcCoyk/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4Z2Z4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QMHoU66sBXqqLqYvGO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4Z2Z4a2t5cWF4Z2Z4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KeepabbpXWzPq/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDl2dTVmOTNsNHhhMmw2MzNtdW50OXJiNm5zYjMzNTViMXRxbjdrMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bhoRGJHLkcNUz7aKSn/200w.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDl2dTVmOTNsNHhhMmw2MzNtdW50OXJiNm5zYjMzNTViMXRxbjdrMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/s5wFafpHxqKbIEERl9/200.webp",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzBxa2wyandha2pmY25kNnQ0eGxzZGRyd3dsd3p3MXpic2d2a3duZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bOIezML3PZwsHaDjcf/200.webp",
  "https://media2.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ODFqenY0OTA0anQwM2w4d3Njemw3cHg4a2V0MThpbm1xNDN5b2FkMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8qCPBhbVs7jtufZB1J/giphy.webp",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dmaHdzY3R0NzJldzN1ZXZxbDA5amdpeG9vZHo0cDBnN3FkamJzbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cvKiHnCupBCS9mq9go/200.webp",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnA5ZGRzaTQ0ODdmcGVwdmQzN3prMW1tZjNnMng4ZG10ODdhMW1qdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xBI67bRulv8pxZpYaZ/giphy.webp",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dmaHdzY3R0NzJldzN1ZXZxbDA5amdpeG9vZHo0cDBnN3FkamJzbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2fRdDrRR4bSS9KE70R/giphy.webp",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGpzOTdkYWMwaG41bmVnY2pscXZiYzJ2MjlseHR0YnUyNHZ3MzllYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gWXLu6Lv9YJJfOBjPr/200.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3d1djR5c3I5d3g5bHhseTIxMTdmcXBpZmJiYng4cnBvZnB1NXNhaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XN8YOV0H6YfVFFGxth/200.webp",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGUzcXoxM2RxOTFnbWtobjd0YWYzczhpMWc1cTFkNDBlaDQ1cWoweiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MKUOUJrFldIyi2hJyT/giphy.webp",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDhnMWlicWUwaWk5Y3N4eWJieDNoN2w2MGp1bjdkdnBteG9iMGgyMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/n5iPVLeA1fvb0IYU5W/200.webp",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmhkcGt5dHV5MGZ1YXo5cnZtcWc2N2VrejU3bzVwZ3I0azZqejF2MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ywGp4PMJdeLyuRq7vJ/giphy.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmhkcGt5dHV5MGZ1YXo5cnZtcWc2N2VrejU3bzVwZ3I0azZqejF2MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G0gQWdeRxefSJgBalK/giphy.webp",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJkbG93dDE0aWRtYTV0bm5hZXkyOHN3bXhpdmIwNG4ydzE1YjJ6cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/12s2PXFPfJXUcHHjWR/200.webp",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXN0YXJ4aXZvdnNvd3F3NmRwY2Q4NndsdjNlcGFlZjJ3N2pjanJieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kYFluNGNP7bMN0WTEH/giphy.webp",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJkbG93dDE0aWRtYTV0bm5hZXkyOHN3bXhpdmIwNG4ydzE1YjJ6cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8BvDeob89F69frIy1j/giphy.webp",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGoxNHF4djFiM2N0Ym96aHduNWxzanlwemNyNTE3ajhmbjljcnN0dyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/GCO5WNzFmlc0vjK8cA/giphy.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3d1djR5c3I5d3g5bHhseTIxMTdmcXBpZmJiYng4cnBvZnB1NXNhaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cbDSTyWpoUWzyolJL9/200.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGUzcXoxM2RxOTFnbWtobjd0YWYzczhpMWc1cTFkNDBlaDQ1cWoweiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XMMUWcz4XtDTNgZj22/200.webp",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3d1djR5c3I5d3g5bHhseTIxMTdmcXBpZmJiYng4cnBvZnB1NXNhaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xdBCeanNvjJZsSpAIR/giphy.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGpzOTdkYWMwaG41bmVnY2pscXZiYzJ2MjlseHR0YnUyNHZ3MzllYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/In0Lpu4FVivjISX9HT/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExenF4bG5rZmdkZ2RhdWxueG05enVsd3l2c2tjbTdxMXh4bWE4Mnl2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/meJN6qdG74lUKAJTQl/giphy.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dmaHdzY3R0NzJldzN1ZXZxbDA5amdpeG9vZHo0cDBnN3FkamJzbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/J6mgm2K7HozKSuE1wH/200.webp",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dmaHdzY3R0NzJldzN1ZXZxbDA5amdpeG9vZHo0cDBnN3FkamJzbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/julC6kCaZ4Jpspvdw5/giphy.webp",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGt0a2JibjZjZXR4YXlrZ2MyeDhwZHhpYWs2aDQxMjFjY3YxNWV3MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/o0hfuAuQHYDhd0ujh8/giphy.webp",
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  img: string;
}

export default function MemeTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const trailIdCounter = useRef(0);

  const currentMemeIndex = useRef(Math.floor(Math.random() * MEMES.length));
  const SPAWN_THRESHOLD = 150;
  const MAX_ITEMS = 15;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top } = e.currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

    if (dist > SPAWN_THRESHOLD) {
      lastPos.current = { x, y };
      spawnItem(x, y);
    }
  };

  const spawnItem = (x: number, y: number) => {
    const id = trailIdCounter.current++;
    const rotation = Math.random() * 40 - 20;
    const index = currentMemeIndex.current;
    const img = MEMES[index];
    currentMemeIndex.current = (index + 1) % MEMES.length;

    const newItem: TrailItem = { id, x, y, rotation, img };

    setTrail((prev) => {
      const newTrail = [...prev, newItem];
      if (newTrail.length > MAX_ITEMS) {
        return newTrail.slice(newTrail.length - MAX_ITEMS);
      }
      return newTrail;
    });

    setTimeout(() => {
      setTrail((prev) => prev.filter((item) => item.id !== id));
    }, 1500);
  };

  return (
    <section className="hidden md:block relative w-full bg-black py-32 overflow-hidden font-aoboshi">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
            After Hours
          </h2>
        </motion.div>
      </div>

      {/* Interactive Area */}
      <div
        onMouseMove={handleMouseMove}
        className="
            relative 
            w-full 
            h-[60vh] 
            cursor-crosshair
            flex
            items-center
            justify-center
            overflow-hidden
            z-0
        "
      >
        <div className="pointer-events-none absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black via-black/70 to-transparent z-30" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black via-black/70 to-transparent z-30" />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb20_2px,transparent_1px)] bg-size-[48px_48px]" />
        </div>
        <p className="relative z-10 pointer-events-none text-zinc-500 font-bold text-6xl md:text-8xl opacity-30 select-none tracking-tighter mix-blend-color-dodge">
          CHAOS
        </p>

        <AnimatePresence mode="popLayout">
          {trail.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.5, x: item.x, y: item.y }}
              animate={{ opacity: 1, scale: 1, x: item.x, y: item.y }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                rotate: item.rotation,
                x: "-50%",
                y: "-50%",
              }}
              className="pointer-events-none z-20 w-32 md:w-48 rounded-lg overflow-hidden shadow-2xl border-4 border-white/5 grayscale-[0.3] contrast-125"
            >
              <img
                src={item.img}
                alt="meme"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
