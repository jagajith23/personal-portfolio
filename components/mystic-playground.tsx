"use client";

import { Play, Stop } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";

const EXAMPLES = [
    {
        label: "Closures",
        code: `// Functions are first-class and capture the scope they were defined in.
fun makeCounter() {
  store i = 0;
  fun count() {
    i = i + 1;
    return i;
  }
  return count;
}

store a = makeCounter();
store b = makeCounter();

print a(); // 1
print a(); // 2
print b(); // 1, b has its own i`,
    },
    {
        label: "Fibonacci",
        code: `// Recursion and a classic for loop.
fun fib(n) {
  if (n <= 1) return n;
  return fib(n - 2) + fib(n - 1);
}

for (store i = 0; i < 10; i = i + 1) {
  print fib(i);
}`,
    },
    {
        label: "Scope",
        code: `// Block scoping: inner declarations shadow outer ones.
store a = "global a";
store b = "global b";
{
  store a = "outer a";
  {
    store a = "inner a";
    print a;
    print b;
  }
  print a;
}
print a;`,
    },
    {
        label: "Loops",
        code: `// break and continue work in both for and while loops.
for (store i = 1; i <= 10; i = i + 1) {
  if (i == 4) break;
  print "for " + i;
}

store n = 0;
while (n < 5) {
  n = n + 1;
  if (n == 3) continue;
  print "while " + n;
}`,
    },
    {
        label: "Ternary",
        code: `// The ternary operator, plus equality across types.
store age = 23;
print age >= 18 ? "adult" : "minor";

fun max(a, b) {
  return a > b ? a : b;
}
print max(3, 9);

print "a" == "a";
print 1 == "1";`,
    },
    {
        label: "Errors",
        code: `// Runtime errors report the line they happened on and stop the program.
print "before";
print 1 + true;
print "never printed";`,
    },
];

type Status = "idle" | "loading" | "running" | "done" | "stopped";

// A program gets this long once the interpreter is ready; the first download
// of the interpreter itself (about 10 MB) gets longer.
const RUN_LIMIT_MS = 5000;
const BOOT_LIMIT_MS = 60000;
const MAX_LINES = 300;

/**
 * Edit and run Mystic programs in the browser. The code runs on the real
 * Python implementation of the interpreter, loaded into a web worker through
 * Pyodide the first time Run is pressed, so nothing heavy loads up front and
 * an infinite loop can be stopped without freezing the page.
 */
export default function MysticPlayground() {
    const [example, setExample] = useState(0);
    const [code, setCode] = useState(EXAMPLES[0].code);
    const [status, setStatus] = useState<Status>("idle");
    const [lines, setLines] = useState<string[]>([]);
    const [notice, setNotice] = useState<string | null>(null);

    const worker = useRef<Worker | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = () => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
    };

    const killWorker = useCallback(() => {
        clearTimer();
        worker.current?.terminate();
        worker.current = null;
    }, []);

    useEffect(() => killWorker, [killWorker]);

    const stop = useCallback(
        (message: string) => {
            killWorker();
            setNotice(message);
            setStatus("stopped");
        },
        [killWorker],
    );

    const run = useCallback(() => {
        setLines([]);
        setNotice(null);
        // A live worker already has the interpreter; only a new one loads it.
        setStatus(worker.current ? "running" : "loading");
        clearTimer();

        if (!worker.current) {
            const w = new Worker("/mystic/worker.js");
            w.onmessage = (event: MessageEvent) => {
                const msg = event.data as { type: string; text?: string };
                if (msg.type === "ready") {
                    setStatus("running");
                    clearTimer();
                    timer.current = setTimeout(
                        () =>
                            stop(
                                "Stopped: the program ran for more than 5 seconds.",
                            ),
                        RUN_LIMIT_MS,
                    );
                } else if (msg.type === "out") {
                    setLines((prev) =>
                        prev.length >= MAX_LINES
                            ? prev
                            : [...prev, msg.text ?? ""],
                    );
                } else if (msg.type === "done") {
                    clearTimer();
                    setStatus("done");
                } else if (msg.type === "error") {
                    clearTimer();
                    setNotice(msg.text ?? "Something went wrong.");
                    setStatus("stopped");
                }
            };
            w.onerror = () =>
                stop(
                    "The interpreter could not start. Check your connection and try again.",
                );
            worker.current = w;
        }

        timer.current = setTimeout(
            () => stop("The interpreter took too long to load. Try again."),
            BOOT_LIMIT_MS,
        );
        worker.current.postMessage({ type: "run", source: code });
    }, [code, stop]);

    const busy = status === "loading" || status === "running";

    const pick = (i: number) => {
        setExample(i);
        setCode(EXAMPLES[i].code);
        setLines([]);
        setNotice(null);
        if (busy) killWorker();
        setStatus("idle");
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !busy) {
            e.preventDefault();
            run();
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                role="tablist"
                aria-label="Example programs"
                className="flex flex-wrap gap-2"
            >
                {EXAMPLES.map((ex, i) => (
                    <button
                        key={ex.label}
                        type="button"
                        role="tab"
                        aria-selected={i === example}
                        onClick={() => pick(i)}
                        className={`rounded-full px-3 py-1 text-sm transition-colors duration-200 ${
                            i === example
                                ? "bg-white/10 text-zinc-100"
                                : "text-zinc-400 hover:text-zinc-100"
                        }`}
                    >
                        {ex.label}
                    </button>
                ))}
            </div>

            <div className="grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                <div className="flex flex-col">
                    {/* Header rows carry a divider so scrolled code clips
                        against a line instead of sliding under the label. */}
                    <label
                        htmlFor="mystic-code"
                        className="border-b border-white/10 px-5 py-3 text-sm text-zinc-500"
                    >
                        Code
                    </label>
                    <textarea
                        id="mystic-code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={onKeyDown}
                        spellCheck={false}
                        autoCapitalize="off"
                        autoCorrect="off"
                        rows={16}
                        className="min-h-80 w-full flex-1 resize-y bg-transparent px-5 py-4 font-mono text-sm leading-relaxed text-zinc-200 caret-signature focus-visible:outline-none"
                    />
                    <div className="flex items-center gap-4 border-t border-white/10 px-5 py-3">
                        {busy ? (
                            <button
                                type="button"
                                onClick={() => stop("Stopped.")}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm text-zinc-200 transition-[color,transform] duration-150 hover:text-white active:scale-[0.97]"
                            >
                                <Stop size={14} weight="fill" aria-hidden />
                                Stop
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={run}
                                className="inline-flex items-center gap-2 rounded-full bg-signature px-4 py-1.5 text-sm font-medium text-black transition-transform duration-150 active:scale-[0.97]"
                            >
                                <Play size={14} weight="fill" aria-hidden />
                                Run
                            </button>
                        )}
                        <span className="hidden text-xs text-zinc-500 sm:inline">
                            or press Ctrl / Cmd + Enter
                        </span>
                    </div>
                </div>

                {/* A real element, not a border, so brutal mode can ink it. */}
                <div
                    aria-hidden
                    className="playground-divider h-px bg-white/10 lg:h-auto lg:w-px"
                />

                <div className="flex min-h-48 flex-col">
                    <p className="border-b border-white/10 px-5 py-3 text-sm text-zinc-500">
                        Output
                    </p>
                    <div
                        role="status"
                        aria-live="polite"
                        className="max-h-[28rem] flex-1 overflow-auto px-5 py-4 font-mono text-sm leading-relaxed"
                    >
                        {status === "idle" && (
                            <p className="text-zinc-500">
                                Press Run to execute the program.
                            </p>
                        )}
                        {status === "loading" && (
                            <p className="animate-pulse text-zinc-500">
                                Loading the interpreter. The first run
                                downloads about 10 MB.
                            </p>
                        )}
                        {lines.map((line, i) => (
                            <p
                                key={i}
                                className="whitespace-pre-wrap break-words text-zinc-200"
                            >
                                {line}
                            </p>
                        ))}
                        {lines.length >= MAX_LINES && (
                            <p className="text-zinc-500">
                                Output trimmed after {MAX_LINES} lines.
                            </p>
                        )}
                        {status === "done" && lines.length === 0 && (
                            <p className="text-zinc-500">
                                The program finished without printing
                                anything.
                            </p>
                        )}
                        {notice && (
                            <p className="mt-1 text-rose-400">{notice}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
