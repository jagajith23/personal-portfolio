import { ogCard, OG_SIZE, OG_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Jagajith B, Software Engineer";

export default function Image() {
    return ogCard({
        title: "Jagajith B",
        body: "Software engineer building systems that last.",
    });
}
