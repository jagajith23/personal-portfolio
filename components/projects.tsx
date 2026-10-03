import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import MagneticButton from "./magnetic-button";
import ProjectMedia from "./project-media";
import SectionHeading from "./section-heading";
import { Project, PROJECTS } from "@/app/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

// First project is featured full-width; the rest sit in a 2-column grid.
// Collapsed view = featured + one row (3 projects, as before).
const [FEATURED, ...REST] = PROJECTS;
const VISIBLE_REST = 2;

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
    }),
};

const ProjectSection = () => {
    const [showAll, setShowAll] = useState(false);
    const hidden = REST.slice(VISIBLE_REST);

    return (
        <section
            className="mx-auto w-full max-w-7xl bg-black px-6 py-16 font-aoboshi md:px-12 md:py-24"
            id="projects"
        >
            <SectionHeading title="Projects" />

            <motion.div
                variants={cardVariants}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >
                <ProjectCard project={FEATURED} featured />
            </motion.div>

            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
                {REST.slice(0, VISIBLE_REST).map((p, i) => (
                    <motion.div
                        key={p.id}
                        variants={cardVariants}
                        custom={i + 1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <ProjectCard project={p} />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence initial={false}>
                {showAll && (
                    <motion.div
                        key="more"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 gap-x-8 gap-y-14 pt-14 md:grid-cols-2">
                            {hidden.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    variants={cardVariants}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <ProjectCard project={p} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {hidden.length > 0 && !showAll && (
                    <motion.button
                        key="see-more"
                        type="button"
                        onClick={() => setShowAll(true)}
                        aria-expanded={showAll}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        whileTap={{ scale: 0.97 }}
                        className="group mx-auto mt-16 flex flex-col items-center gap-2 text-zinc-300 transition-colors hover:text-white"
                    >
                        <span className="text-sm tracking-tight">See more</span>
                        <ArrowDown
                            size={18}
                            weight="bold"
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-y-1"
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    );
};

const ProjectCard = ({
    project,
    featured = false,
}: {
    project: Project;
    featured?: boolean;
}) => {
    const { id, title, description, imageUrl, video, projectUrl, tag } = project;
    const href = `/project/${id}`;
    // The featured tile is wider, so ask Unsplash for a larger rendition.
    const src = featured ? imageUrl.replace("w=600", "w=1400") : imageUrl;

    const media = (
        <div
            className={`group/media relative w-full overflow-hidden rounded-xl bg-zinc-900 ${
                featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/10]"
            }`}
        >
            <Link href={href} tabIndex={-1} aria-hidden className="relative block h-full w-full">
                <ProjectMedia
                    imageUrl={src}
                    video={video}
                    sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="transition-transform duration-500 ease-out group-hover/media:scale-[1.03]"
                />
            </Link>
            {projectUrl && (
                // Magnetic "visit" button on hover for pointer devices only.
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover/media:opacity-100 [@media(hover:hover)]:flex">
                    <div className="pointer-events-auto">
                        <MagneticButton
                            ariaLabel={`Visit ${title}`}
                            onClick={() => window.open(projectUrl, "_blank", "noopener")}
                            arrowHoverDirection="north-east"
                        />
                    </div>
                </div>
            )}
        </div>
    );

    const body = (
        <div className="flex flex-col gap-3">
            <div
                className={
                    featured
                        ? "flex flex-col-reverse items-start gap-4"
                        : "flex items-center justify-between gap-4"
                }
            >
                <h3 className={featured ? "text-2xl font-semibold text-zinc-100 md:text-3xl" : "text-lg font-semibold text-zinc-100"}>
                    <Link href={href} className="transition-colors hover:text-signature">
                        {title}
                    </Link>
                </h3>
                <span className="w-fit shrink-0 rounded-full bg-white/[0.08] px-3 py-0.5 text-xs font-medium tracking-wide text-zinc-300 ring-1 ring-white/10">
                    {tag}
                </span>
            </div>

            <p className={featured ? "max-w-[50ch] text-base leading-relaxed text-zinc-400" : "text-sm text-zinc-400"}>
                {description}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <Link
                    href={href}
                    className="group inline-flex items-center gap-1 text-zinc-300 underline underline-offset-4 transition-colors hover:text-white"
                >
                    Read more
                    <ArrowRight
                        size={14}
                        weight="bold"
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
                {projectUrl && (
                    // Always-visible external link so touch users can reach it too.
                    <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-signature"
                    >
                        Visit
                        <ArrowUpRight
                            size={14}
                            weight="bold"
                            aria-hidden
                            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </a>
                )}
            </div>
        </div>
    );

    if (featured) {
        return (
            <article className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-stretch lg:gap-12">
                <div className="lg:min-h-[22rem]">{media}</div>
                <div className="flex flex-col justify-center">{body}</div>
            </article>
        );
    }

    return (
        <article className="flex flex-col gap-5">
            {media}
            {body}
        </article>
    );
};

export default ProjectSection;
