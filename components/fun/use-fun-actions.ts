"use client";

import { useMemo } from "react";
import { PROJECTS } from "@/app/constants";
import { useDesign } from "../design-provider";
import { smoothScrollTo } from "../navigation/smooth-scroll";
import { useAchievements } from "./achievements";
import { emitFun } from "./fun-events";
import { fireConfetti } from "./confetti";
import { EMAIL, RESUME_URL, SECTIONS, SOCIALS } from "./fun-data";

export type FunAction = {
    id: string;
    label: string;
    group: "Navigate" | "Projects" | "Theme" | "Social" | "Fun";
    keywords?: string;
    hint?: string;
    perform: () => void;
};

/** Actions shared by the command palette (and reused by the terminal). */
export function useFunActions(): FunAction[] {
    const { setDesign } = useDesign();
    const { unlock } = useAchievements();

    return useMemo<FunAction[]>(() => {
        const actions: FunAction[] = [];

        for (const section of SECTIONS) {
            actions.push({
                id: `nav-${section.label}`,
                label: `Go to ${section.label}`,
                group: "Navigate",
                keywords: "scroll jump section",
                perform: () => smoothScrollTo(section.selector),
            });
        }

        for (const project of PROJECTS) {
            actions.push({
                id: `project-${project.id}`,
                label: `Project — ${project.title}`,
                group: "Projects",
                keywords: `${project.tag} work ${project.description}`,
                hint: project.projectUrl ? "Open ↗" : "View",
                perform: () => {
                    if (project.projectUrl) {
                        window.open(
                            project.projectUrl,
                            "_blank",
                            "noopener,noreferrer",
                        );
                    } else {
                        smoothScrollTo("#projects");
                    }
                },
            });
        }

        actions.push(
            {
                id: "theme-brutal",
                label: "Theme — Brutalist mode",
                group: "Theme",
                keywords: "design switch toggle brutal",
                perform: () => setDesign("brutal"),
            },
            {
                id: "theme-refined",
                label: "Theme — Refined mode",
                group: "Theme",
                keywords: "design switch toggle refined default",
                perform: () => setDesign("refined"),
            },
        );

        for (const social of SOCIALS) {
            actions.push({
                id: `social-${social.name}`,
                label: social.name,
                group: "Social",
                keywords: "link profile contact",
                hint: "Open ↗",
                perform: () =>
                    window.open(social.url, "_blank", "noopener,noreferrer"),
            });
        }

        actions.push(
            {
                id: "copy-email",
                label: "Copy email address",
                group: "Social",
                keywords: "contact mail clipboard",
                perform: () => {
                    navigator.clipboard?.writeText(EMAIL).catch(() => {});
                },
            },
            {
                id: "email-me",
                label: "Email me",
                group: "Social",
                keywords: "contact mailto hire",
                hint: "Open ↗",
                perform: () => {
                    window.location.href = `mailto:${EMAIL}`;
                },
            },
            {
                id: "resume",
                label: "Open résumé (PDF)",
                group: "Social",
                keywords: "cv hire download",
                hint: "Open ↗",
                perform: () =>
                    window.open(RESUME_URL, "_blank", "noopener,noreferrer"),
            },
            {
                id: "open-terminal",
                label: "Open the terminal",
                group: "Fun",
                keywords: "shell console command line",
                hint: "`",
                perform: () => emitFun("fun:open-terminal"),
            },
            {
                id: "open-emotes",
                label: "Send a Clash Royale emote",
                group: "Fun",
                keywords: "emoji react clash royale gg",
                perform: () => emitFun("fun:toggle-emotes"),
            },
            {
                id: "confetti",
                label: "Throw some confetti",
                group: "Fun",
                keywords: "celebrate party",
                perform: () => fireConfetti(),
            },
            {
                id: "unlock-power-user",
                label: "Surprise me",
                group: "Fun",
                keywords: "random fun",
                perform: () => {
                    fireConfetti(80);
                    unlock("power_user");
                },
            },
        );

        return actions;
    }, [setDesign, unlock]);
}
