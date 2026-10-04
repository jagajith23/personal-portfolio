import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Lost in the multiverse",
};

/**
 * 404. The number slips between universes: two off-register copies sit
 * behind it and jolt now and then (see .multiverse in globals.css).
 */
export default function NotFound() {
    return (
        <main className="flex min-h-[100dvh] w-full items-center bg-black px-6 font-aoboshi lg:px-12">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 lg:max-w-6xl">
                <p
                    aria-hidden
                    className="multiverse relative w-fit select-none text-[clamp(7rem,26vw,18rem)] leading-none tracking-[0.02em] text-zinc-100"
                >
                    <span className="multiverse-a absolute inset-0">404</span>
                    <span className="multiverse-b absolute inset-0">404</span>
                    <span className="relative">404</span>
                </p>

                <div className="space-y-3">
                    <p className="font-wind-song text-2xl font-semibold text-zinc-400 md:text-3xl">
                        Wrong universe
                    </p>
                    <h1 className="text-3xl font-semibold tracking-[0.04em] text-zinc-100 md:text-5xl">
                        Lost in the multiverse
                    </h1>
                    <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-300">
                        This page exists somewhere, just not in this one.
                    </p>
                </div>

                <Link
                    href="/"
                    className="group relative w-fit text-base text-zinc-100 md:text-lg"
                >
                    Swing back home
                    <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-zinc-600 transition-colors duration-200 ease-out group-hover:bg-signature"
                    />
                </Link>
            </div>
        </main>
    );
}
