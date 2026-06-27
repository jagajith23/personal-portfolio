"use client";

import { useEffect } from "react";
import { useAchievements } from "./achievements";

const AWAY_TITLES = [
    "👀 come back!",
    "don't go :(",
    "i'm still here…",
    "🥺 hello?",
];

export default function TabTitle() {
    const { unlock } = useAchievements();

    useEffect(() => {
        let original = document.title;
        let left = false;
        let i = 0;

        const onVisibility = () => {
            if (document.hidden) {
                original = document.title;
                document.title = AWAY_TITLES[i++ % AWAY_TITLES.length];
                left = true;
            } else {
                document.title = original;
                if (left) {
                    unlock("loyal");
                    left = false;
                }
            }
        };

        document.addEventListener("visibilitychange", onVisibility);
        return () =>
            document.removeEventListener("visibilitychange", onVisibility);
    }, [unlock]);

    return null;
}
