"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type AchievementId =
  | "explorer"
  | "hacker"
  | "power_user"
  | "konami"
  | "emoter"
  | "night_owl"
  | "loyal"
  | "completionist";

type Achievement = {
  id: AchievementId;
  icon: string;
  title: string;
  desc: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "explorer",
    icon: "🧭",
    title: "Explorer",
    desc: "Visited every section",
  },
  { id: "hacker", icon: "💻", title: "Hacker", desc: "Opened the terminal" },
  {
    id: "power_user",
    icon: "⚡",
    title: "Power User",
    desc: "Used the ⌘K palette",
  },
  {
    id: "konami",
    icon: "🎮",
    title: "Cheat Code",
    desc: "Entered the Konami code",
  },
  {
    id: "emoter",
    icon: "👑",
    title: "GG EZ",
    desc: "Sent an emote",
  },
  {
    id: "night_owl",
    icon: "🦉",
    title: "Night Owl",
    desc: "Browsing past midnight",
  },
  {
    id: "loyal",
    icon: "🔁",
    title: "Loyal",
    desc: "Came back after leaving",
  },
  {
    id: "completionist",
    icon: "🏆",
    title: "Completionist",
    desc: "Unlocked everything!",
  },
];

const ACHIEVEMENT_MAP = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));
const STORAGE_KEY = "portfolio:achievements";

type AchievementsContextValue = {
  unlocked: Set<AchievementId>;
  unlock: (id: AchievementId) => void;
  total: number;
};

const AchievementsContext = createContext<AchievementsContextValue | null>(
  null,
);

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx)
    throw new Error("useAchievements must be used within AchievementsProvider");
  return ctx;
}

function loadUnlocked(): Set<AchievementId> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as AchievementId[]) : new Set();
  } catch {
    return new Set();
  }
}

type Toast = { uid: number; achievement: Achievement };

export function AchievementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState<Set<AchievementId>>(loadUnlocked);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const uid = useRef(0);
  const unlockedRef = useRef(unlocked);

  useEffect(() => {
    unlockedRef.current = unlocked;
  }, [unlocked]);

  const unlock = useCallback((id: AchievementId) => {
    const prev = unlockedRef.current;
    if (prev.has(id)) return;

    const next = new Set(prev);
    next.add(id);

    const others = ACHIEVEMENTS.filter((a) => a.id !== "completionist").map(
      (a) => a.id,
    );
    if (id !== "completionist" && others.every((o) => next.has(o))) {
      next.add("completionist");
    }

    unlockedRef.current = next;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {}

    const newToasts = [...next]
      .filter((x) => !prev.has(x))
      .map((aid) => ACHIEVEMENT_MAP.get(aid))
      .filter((a): a is Achievement => Boolean(a))
      .map((achievement) => ({ uid: uid.current++, achievement }));

    setUnlocked(next);
    if (newToasts.length) setToasts((t) => [...t, ...newToasts]);
  }, []);

  const dismiss = useCallback((target: number) => {
    setToasts((t) => t.filter((toast) => toast.uid !== target));
  }, []);

  // Night Owl — unlocked when browsing between midnight and 5am local time.
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlock("night_owl");
  }, [unlock]);

  // Explorer — unlocked once every main section has been seen.
  useEffect(() => {
    const ids = ["about", "career", "projects", "skills"];
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id);
        }
        if (ids.every((id) => seen.has(id))) {
          unlock("explorer");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [unlock]);

  return (
    <AchievementsContext.Provider
      value={{ unlocked, unlock, total: ACHIEVEMENTS.length }}
    >
      {children}
      <div className="pointer-events-none fixed right-4 top-24 z-[60] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <AchievementToast
              key={toast.uid}
              toast={toast}
              onDismiss={dismiss}
            />
          ))}
        </AnimatePresence>
      </div>
    </AchievementsContext.Provider>
  );
}

function AchievementToast({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (uid: number) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.uid), 4200);
    return () => clearTimeout(timer);
  }, [toast.uid, onDismiss]);

  const { achievement } = toast;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      onClick={() => onDismiss(toast.uid)}
      data-fun-surface
      className="pointer-events-auto flex w-64 cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/5 text-xl">
        {achievement.icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Achievement unlocked
        </span>
        <span className="text-sm font-semibold text-white">
          {achievement.title}
        </span>
        <span className="text-xs text-zinc-400">{achievement.desc}</span>
      </div>
    </motion.div>
  );
}
