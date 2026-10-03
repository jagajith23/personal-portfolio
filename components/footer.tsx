"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "./magnetic-button";
import { smoothScrollTo } from "./navigation/smooth-scroll";
import Image from "next/image";
import { ArrowUpRight, Copy } from "@phosphor-icons/react";
import BadgeStack from "./leetcode-badge-stack";
import MusicWidget from "./music-widget";

const SOCIALS = [
    {
        name: "GitHub",
        url: "https://github.com/jagajith23/",
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/jagajith23/",
    },
    {
        name: "Instagram",
        url: "https://instagram.com/_jaga_jith_23/",
    },
    {
        name: "LeetCode",
        url: "https://leetcode.com/u/jagajith23/",
    },
];

const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Career", href: "#career" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
];

export type LeetCodeBadge = {
    id: string;
    name: string;
    shortName: string;
    icon: string;
    hoverText: string;
    creationDate: number;
    category: string;
    medal: {
        slug: string;
        config: {
            iconGif: string;
        };
    };
};

export default function Footer() {
    const [badges, setBadges] = useState<LeetCodeBadge[]>([]);

    useEffect(() => {
        fetch("/api/leetcode-badges?username=jagajith23")
            .then((res) => res.json())
            .then((data) => {
                setBadges(data?.data?.matchedUser?.badges ?? []);
            })
            // Badges are decorative; on failure the stack just stays empty.
            .catch(() => setBadges([]));
    }, []);

    return (
        <footer
            id="contact"
            className="relative bg-black w-full pt-20 pb-10 font-aoboshi overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between min-h-150">
                {/* --- SECTION 1: THE HOOK (CTA & BUTTONS) --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
                    <div className="flex flex-col gap-4 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                        >
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                                Have an idea?
                            </h2>
                            <div className="flex items-center gap-3">
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-600 font-wind-song">
                                    Let’s build it.
                                </h2>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="mt-6"
                        >
                            <CopyEmail email="jagajith23.work@gmail.com" />
                        </motion.div>
                    </div>

                    {/* Back to Top */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <MagneticButton
                            onClick={() => smoothScrollTo("body")}
                            arrowDirection="north"
                            arrowHoverDirection="north"
                            ariaLabel="Back to top"
                        />
                    </motion.div>
                </div>

                {/* --- SECTION 2: FUNCTIONAL GRID (LINKS & INFO) --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-8 md:mb-12">
                    {/* Column 1: Time & Location */}
                    <div className="flex flex-col gap-4">

                        <p className="text-zinc-400 tracking-tighter text-sm">
                            LeetCode badges
                        </p>

                        <BadgeStack badges={badges} />
                        {/* Label hides itself while the widget renders nothing
                            (loading, or the preview lookup failed). */}
                        <div className="flex flex-col gap-2 [&:not(:has(>:nth-child(2)))]:hidden">
                            <p className="text-zinc-400 tracking-tighter text-sm">
                                On Repeat
                            </p>
                            <MusicWidget />
                        </div>
                    </div>

                    {/* Column 2: Sitemap */}
                    <div className="flex flex-col gap-4">
                        <span className="text-zinc-400 tracking-tighter text-sm">
                            Sitemap
                        </span>
                        <ul className="flex flex-col gap-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() =>
                                            smoothScrollTo(link.href)
                                        }
                                        className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Socials */}
                    <div className="flex flex-col gap-4">
                        <span className="text-zinc-400 tracking-tighter text-sm">
                            Socials
                        </span>
                        <ul className="flex flex-col gap-2">
                            {SOCIALS.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-zinc-400 hover:text-signature transition-colors duration-300 flex items-center gap-2 group w-fit text-sm`}
                                    >
                                        {link.name}
                                        <ArrowIcon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Info */}
                    <div className="flex flex-col justify-start md:items-start gap-3">
                        {/* Image Container */}
                        <div className="relative h-36 w-36 overflow-hidden rounded-lg border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                            <Image
                                src="/me-cropped.jpg"
                                alt="Jagajith"
                                fill
                                className="
                    object-cover
                    object-center
                    scale-105
                    hover:scale-115
                    transition-transform
                    duration-300
                    ease-out
                "
                            />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col md:items-start">
                            <h3 className="text-white font-bold text-lg leading-tight">
                                Jagajith
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                Software Engineer
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- SECTION 3: MASSIVE BRANDING --- */}
                <div className="relative h-[15vh]">
                    {/* The Huge Name - Visual Anchor */}
                    <div
                        aria-hidden
                        className="
                footer-watermark
                absolute
                left-1/2
                -translate-x-1/2
                -bottom-1/3
                md:-bottom-6/10
                text-[15vw]
                leading-[0.8]
                font-bold
                text-zinc-900
                select-none
                text-center
                tracking-tighter
                mix-blend-difference
                pointer-events-none
            "
                    >
                        JAGAJITH
                    </div>
                </div>
            </div>
        </footer>
    );
}

function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy email address ${email}`}
            className="cursor-pointer group relative flex items-center gap-3 text-lg md:text-2xl text-zinc-300 hover:text-white transition-colors duration-300 font-light"
        >
            <span className="border-b border-zinc-700 group-hover:border-white transition-colors pb-1">
                {email}
            </span>

            <div className="relative">
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span
                            key="copied"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-signature text-xs font-bold px-2 py-1 bg-signature/10 rounded-full"
                        >
                            Copied!
                        </motion.span>
                    ) : (
                        <motion.span
                            key="copy-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="inline-flex opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500 group-hover:text-white"
                        >
                            <Copy size={20} aria-hidden />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </button>
    );
}

function ArrowIcon() {
    return (
        <ArrowUpRight
            size={12}
            weight="bold"
            aria-hidden
            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        />
    );
}
