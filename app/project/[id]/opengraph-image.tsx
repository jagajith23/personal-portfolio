import { PROJECTS } from "@/app/constants";
import { ogCard } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project preview";

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ id: String(p.id) }));
}

export default async function Image({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.id === Number(id));
    if (!project) return ogCard({ title: "Project not found" });

    return ogCard({
        title: project.title,
        kicker: project.tag,
        body: project.description,
        imageUrl: project.imageUrl,
    });
}
