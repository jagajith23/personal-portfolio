"use client";

import { useEffect } from "react";
import { useDesign } from "../design-provider";
import { useAchievements } from "./achievements";
import { fireBalloons, fireConfetti } from "./confetti";

const SEQUENCE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export default function KonamiCode() {
    const { unlock } = useAchievements();
    const { toggle } = useDesign();

    useEffect(() => {
        let index = 0;

        const onKey = (e: KeyboardEvent) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            if (key === SEQUENCE[index]) {
                index++;
                if (index === SEQUENCE.length) {
                    index = 0;
                    fireConfetti();
                    fireBalloons();
                    toggle();
                    unlock("konami");
                }
            } else {
                index = key === SEQUENCE[0] ? 1 : 0;
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [unlock, toggle]);

    return null;
}
