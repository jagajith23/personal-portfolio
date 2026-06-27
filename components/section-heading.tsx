"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionHeading({
    index,
    title,
    subtitle,
    className,
}: {
    index: string;
    title: string;
    subtitle?: string;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={cn("section-heading mb-12 space-y-3", className)}
        >
            <div className="section-eyebrow flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                <span className="section-index font-sans tabular-nums text-zinc-400">
                    {index}
                </span>
                <span className="section-rule h-px w-8 bg-zinc-700" />
            </div>
            <h2 className="section-title pb-1.5 text-3xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
                {title}
            </h2>
            {subtitle && (
                <p className="max-w-md text-sm text-zinc-400 md:text-base">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
