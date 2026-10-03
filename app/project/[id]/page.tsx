import type { Metadata } from "next";
import { PROJECTS } from "@/app/constants";
import ProjectView from "./project-view";

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.id === Number(id));
    if (!project) return { title: "Project not found" };

    return {
        title: project.title,
        description: project.description,
        alternates: { canonical: `/project/${project.id}` },
        openGraph: {
            title: project.title,
            description: project.description,
            images: [{ url: project.imageUrl }],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <ProjectView id={id} />;
}
