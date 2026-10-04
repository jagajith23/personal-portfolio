"use client";

import { AchievementsProvider } from "./achievements";
import ClashRoyaleEmotes from "./clash-royale-emotes";
import CommandPalette from "./command-palette";
import FunDock from "./fun-dock";
import KonamiCode from "./konami";
import Siu from "./siu";
import TabTitle from "./tab-title";
import Terminal from "./terminal";

/**
 * Single entry point for all the playful extras. Mount once near the page root,
 * inside <DesignProvider> so the overlays can read/toggle the design theme.
 */
export default function FunZone() {
    return (
        <AchievementsProvider>
            <FunDock />
            <CommandPalette />
            <Terminal />
            <ClashRoyaleEmotes />
            <KonamiCode />
            <TabTitle />
            <Siu />
        </AchievementsProvider>
    );
}
