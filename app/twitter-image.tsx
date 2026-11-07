import { ogCard } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jagajith B, Software Engineer";

export default function Image() {
    return ogCard({
        title: "Jagajith B",
        body: "Software engineer building systems that last.",
    });
}
