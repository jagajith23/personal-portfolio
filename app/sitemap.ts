import type { MetadataRoute } from "next";
import { PROJECTS } from "./constants";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
        ...PROJECTS.map((p) => ({
            url: `${SITE_URL}/project/${p.id}`,
            changeFrequency: "yearly" as const,
            priority: 0.7,
        })),
    ];
}
