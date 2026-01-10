"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// --- Types ---
type ClashCard = {
  id: number;
  name: string;
  iconUrls: {
    medium: string;
  };
};

type ClashData = {
  trophies: number;
  arena: { name: string };
  currentDeck: ClashCard[];
  currentFavouriteCard: ClashCard;
};

export default function ClashRoyaleWidget() {
  const [data, setData] = useState<ClashData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/clash-royale?playerTag=${encodeURIComponent("#2QQ00CY8")}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch Clash data", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <SkeletonLoader />;
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-3 w-full max-w-[280px]"
    >
      {/* Text Header - Clean & Minimal */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span className="font-medium text-zinc-200">Clash Royale</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400 font-bold">{data.trophies} 🏆</span>
      </div>

      {/* The Stacked Deck (Bigger & Overlapping) */}
      <div className="flex items-center -space-x-3 pl-1">
        {data.currentDeck.map((card, index) => (
          <div
            key={card.id}
            className="
                relative
                w-10 h-12
                shrink-0
                hover:scale-110
                hover:-translate-y-2
                hover:-translate-x-3
                hover:z-20
                transition-all
                duration-300
                shadow-sm
            "
            style={{ zIndex: index }}
            title={card.name}
          >
            <Image
              src={card.iconUrls.medium}
              alt={card.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <p className="text-[10px] text-zinc-500 flex items-center ml-1 justify-between">
        <div className="flex gap-1.5 items-center">
          <span className="text-zinc-600">Arena:</span>
          <span className="text-zinc-400 font-medium">{data.arena.name}</span>
        </div>
        <div className="flex gap-1.5 items-center">
          <span className="text-zinc-600">Player Tag:</span>
          <span className="text-zinc-400 font-medium">#2QQ00CY8</span>
        </div>
      </p>
      <span className="ml-1 text-xs text-zinc-500">Let's clash!</span>
    </motion.div>
  );
}

// --- Loading State ---
function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[250px]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
        <div className="w-24 h-3 bg-zinc-900 rounded animate-pulse" />
      </div>
      <div className="flex items-center -space-x-3 pl-1">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-12 bg-zinc-900 border border-zinc-800 rounded-md animate-pulse"
            style={{ zIndex: i }}
          />
        ))}
      </div>
    </div>
  );
}
