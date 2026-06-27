"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { PROJECTS } from "@/app/constants";
import { useDesign } from "../design-provider";
import { smoothScrollTo } from "../navigation/smooth-scroll";
import { useAchievements } from "./achievements";
import { emitFun, useFunEvent } from "./fun-events";
import { fireConfetti } from "./confetti";
import { BIO, EMAIL, RESUME_URL, SKILLS, SOCIALS } from "./fun-data";

type Line = { id: number; node: ReactNode };

const COMMANDS = [
    "help",
    "whoami",
    "about",
    "projects",
    "open",
    "skills",
    "socials",
    "contact",
    "email",
    "resume",
    "design",
    "goto",
    "emote",
    "confetti",
    "mystic",
    "date",
    "echo",
    "clear",
    "sudo",
    "ls",
    "exit",
];

const PROMPT = "visitor@jagajith:~$";

function Link({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
        >
            {children}
        </a>
    );
}

export default function Terminal() {
    const [open, setOpen] = useState(false);
    const [lines, setLines] = useState<Line[]>([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const lineId = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const { design, setDesign } = useDesign();
    const { unlock } = useAchievements();

    const push = (node: ReactNode) =>
        setLines((prev) => [...prev, { id: lineId.current++, node }]);

    const openTerminal = () => {
        setOpen(true);
        unlock("hacker");
    };

    useFunEvent("fun:open-terminal", openTerminal);

    // Greeting on first open.
    useEffect(() => {
        if (open && lines.length === 0) {
            push(
                <span className="text-zinc-400">
                    Welcome to Jagajith&apos;s shell. Type{" "}
                    <span className="text-emerald-400">help</span> to get
                    started.
                </span>,
            );
        }
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    // Backtick toggles the terminal (unless typing somewhere else).
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const typing =
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable);
            if (e.key === "`" && (!typing || open)) {
                e.preventDefault();
                setOpen((o) => {
                    const next = !o;
                    if (next) unlock("hacker");
                    return next;
                });
            } else if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, unlock]);

    useEffect(() => {
        if (open) {
            const id = setTimeout(() => inputRef.current?.focus(), 30);
            return () => clearTimeout(id);
        }
    }, [open]);

    useEffect(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
    }, [lines, open]);

    const runCommand = (raw: string) => {
        const trimmed = raw.trim();
        push(
            <div className="flex gap-2">
                <span className="shrink-0 text-emerald-500">{PROMPT}</span>
                <span className="text-zinc-200">{raw}</span>
            </div>,
        );

        if (!trimmed) return;
        setHistory((h) => [...h, trimmed]);

        const [cmd, ...args] = trimmed.split(/\s+/);
        const arg = args.join(" ");

        switch (cmd.toLowerCase()) {
            case "help":
                push(
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
                        {[
                            ["help", "this menu"],
                            ["whoami", "quick bio"],
                            ["projects", "list my work"],
                            ["open <id>", "open a project"],
                            ["skills", "my tech stack"],
                            ["socials", "find me online"],
                            ["resume", "open my résumé"],
                            ["email", "say hello"],
                            ["design <mode>", "refined / brutal"],
                            ["goto <section>", "scroll the page"],
                            ["emote", "clash royale emotes"],
                            ["confetti", "🎉"],
                            ["mystic", "my language"],
                            ["clear", "clear screen"],
                        ].map(([c, d]) => (
                            <Fragment key={c}>
                                <span>
                                    <span className="text-emerald-400">
                                        {c}
                                    </span>
                                    <span className="text-zinc-500">
                                        {" "}
                                        — {d}
                                    </span>
                                </span>
                            </Fragment>
                        ))}
                    </div>,
                );
                break;
            case "whoami":
            case "about":
                push(
                    <div className="flex flex-col text-zinc-300">
                        {BIO.map((line, i) => (
                            <span key={i}>{line}</span>
                        ))}
                    </div>,
                );
                break;
            case "projects":
                push(
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-500">
                            {PROJECTS.length} projects — type{" "}
                            <span className="text-emerald-400">open 4</span> to
                            open one.
                        </span>
                        {PROJECTS.map((p) => (
                            <span key={p.id} className="text-zinc-300">
                                <span className="text-emerald-500">
                                    [{p.id}]
                                </span>{" "}
                                {p.title}{" "}
                                <span className="text-zinc-600">· {p.tag}</span>
                            </span>
                        ))}
                    </div>,
                );
                break;
            case "open": {
                const id = Number(args[0]);
                const project = PROJECTS.find((p) => p.id === id);
                if (!project) {
                    push(
                        <span className="text-rose-400">
                            No project with id “{args[0] ?? ""}”. Try{" "}
                            <span className="text-emerald-400">projects</span>.
                        </span>,
                    );
                } else if (project.projectUrl) {
                    window.open(
                        project.projectUrl,
                        "_blank",
                        "noopener,noreferrer",
                    );
                    push(
                        <span className="text-zinc-300">
                            Opening{" "}
                            <Link href={project.projectUrl}>
                                {project.title}
                            </Link>{" "}
                            ↗
                        </span>,
                    );
                } else {
                    smoothScrollTo("#projects");
                    setOpen(false);
                    push(
                        <span className="text-zinc-300">
                            Scrolling to {project.title}…
                        </span>,
                    );
                }
                break;
            }
            case "skills":
                push(
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                        {SKILLS.map((s) => (
                            <span
                                key={s}
                                className="rounded bg-white/5 px-1.5 text-zinc-300"
                            >
                                {s}
                            </span>
                        ))}
                    </div>,
                );
                break;
            case "socials":
                push(
                    <div className="flex flex-col">
                        {SOCIALS.map((s) => (
                            <span key={s.name} className="text-zinc-300">
                                {s.name.padEnd(10, " ")}{" "}
                                <Link href={s.url}>{s.url}</Link>
                            </span>
                        ))}
                    </div>,
                );
                break;
            case "contact":
            case "email":
                push(
                    <span className="text-zinc-300">
                        Reach me at{" "}
                        <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link> — always
                        happy to chat.
                    </span>,
                );
                if (cmd.toLowerCase() === "email")
                    window.location.href = `mailto:${EMAIL}`;
                break;
            case "resume":
            case "cv":
                window.open(RESUME_URL, "_blank", "noopener,noreferrer");
                push(
                    <span className="text-zinc-300">
                        Opening résumé <Link href={RESUME_URL}>↗</Link>
                    </span>,
                );
                break;
            case "design":
            case "theme": {
                const mode = (args[0] ?? "").toLowerCase();
                if (mode === "brutal" || mode === "refined") {
                    setDesign(mode);
                    push(
                        <span className="text-zinc-300">
                            Switched to {mode} mode.
                        </span>,
                    );
                } else {
                    const nextMode = design === "brutal" ? "refined" : "brutal";
                    setDesign(nextMode);
                    push(
                        <span className="text-zinc-300">
                            Toggled to {nextMode} mode. (use{" "}
                            <span className="text-emerald-400">
                                design brutal
                            </span>
                            )
                        </span>,
                    );
                }
                break;
            }
            case "goto": {
                const map: Record<string, string> = {
                    top: "body",
                    home: "body",
                    about: "#about",
                    career: "#career",
                    projects: "#projects",
                    skills: "#skills",
                    contact: "footer",
                };
                const target = map[(args[0] ?? "").toLowerCase()];
                if (target) {
                    smoothScrollTo(target);
                    setOpen(false);
                } else {
                    push(
                        <span className="text-rose-400">
                            Unknown section. Try: about, career, projects,
                            skills, contact.
                        </span>,
                    );
                }
                break;
            }
            case "emote":
                emitFun("fun:toggle-emotes");
                push(
                    <span className="text-zinc-300">Emote tray ready 👑</span>,
                );
                break;
            case "confetti":
            case "party":
                fireConfetti();
                push(<span className="text-zinc-300">🎉🎉🎉</span>);
                break;
            case "mystic":
                push(
                    <div className="flex flex-col text-zinc-300">
                        <span className="text-zinc-500">
                            # Mystic — a language I built from scratch
                        </span>
                        <span>
                            <span className="text-purple-400">fun</span>{" "}
                            greet(name) {"->"} &quot;Hello, &quot; + name
                        </span>
                        <span>greet(&quot;world&quot;)</span>
                        <span className="text-emerald-400">
                            =&gt; &quot;Hello, world&quot;
                        </span>
                        <span className="text-zinc-500">
                            source:{" "}
                            <Link href="https://github.com/jagajith23/mystic">
                                github.com/jagajith23/mystic
                            </Link>
                        </span>
                    </div>,
                );
                break;
            case "date":
                push(
                    <span className="text-zinc-300">
                        {new Date().toString()}
                    </span>,
                );
                break;
            case "echo":
                push(<span className="text-zinc-300">{arg}</span>);
                break;
            case "ls":
                push(
                    <span className="text-zinc-300">
                        about projects skills socials resume{" "}
                        <span className="text-emerald-400">secrets/</span>
                    </span>,
                );
                break;
            case "sudo":
                push(
                    <span className="text-rose-400">
                        Permission denied: nice try 😏 (this incident has been
                        reported to the King 👑)
                    </span>,
                );
                break;
            case "clear":
                setLines([]);
                break;
            case "exit":
            case "close":
                setOpen(false);
                break;
            default:
                push(
                    <span className="text-rose-400">
                        command not found: {cmd}. Type{" "}
                        <span className="text-emerald-400">help</span>.
                    </span>,
                );
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            runCommand(input);
            setInput("");
            setHistoryIdx(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length === 0) return;
            const idx =
                historyIdx === -1
                    ? history.length - 1
                    : Math.max(0, historyIdx - 1);
            setHistoryIdx(idx);
            setInput(history[idx]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIdx === -1) return;
            const idx = historyIdx + 1;
            if (idx >= history.length) {
                setHistoryIdx(-1);
                setInput("");
            } else {
                setHistoryIdx(idx);
                setInput(history[idx]);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const match = COMMANDS.find(
                (c) => c.startsWith(input.toLowerCase()) && input.length > 0,
            );
            if (match) setInput(match + " ");
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[75] flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 30,
                        }}
                        onClick={() => inputRef.current?.focus()}
                        data-fun-surface
                        className="relative z-10 flex h-[70vh] max-h-[560px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
                    >
                        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                            <span className="ml-2 text-xs text-zinc-500">
                                jagajith — zsh — press ` or esc to close
                            </span>
                        </div>

                        <div
                            ref={bodyRef}
                            data-lenis-prevent
                            className="fun-scroll flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
                        >
                            {lines.map((line) => (
                                <div key={line.id} className="mb-1">
                                    {line.node}
                                </div>
                            ))}
                            <div className="flex gap-2">
                                <span className="shrink-0 text-emerald-500">
                                    {PROMPT}
                                </span>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    spellCheck={false}
                                    autoComplete="off"
                                    aria-label="terminal input"
                                    className="w-full bg-transparent text-zinc-100 caret-emerald-400 focus:outline-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
