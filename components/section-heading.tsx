"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionHeading({
    title,
    subtitle,
    className,
}: {
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
            <h2 className="section-title pb-1.5 text-4xl font-bold leading-[1.15] text-zinc-100 font-wind-song md:text-5xl">
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
