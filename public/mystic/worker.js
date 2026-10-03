// Runs the Mystic interpreter (the Python implementation, unmodified) inside
// Pyodide, off the main thread. The page talks to it with messages:
//   in:  { type: "run", source }
//   out: { type: "ready" } | { type: "out", text } | { type: "done" }
//        | { type: "error", text }
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

// Copied from https://github.com/jagajith23/mystic (PMystic/mystic).
const SOURCES = [
    "ast_printer.py",
    "environment.py",
    "expr.py",
    "mystic.py",
    "mystic_callable.py",
    "mystic_function.py",
    "mystic_interpreter.py",
    "mystic_parser.py",
    "mystic_return.py",
    "mystic_token.py",
    "resolver.py",
    "runtime_error.py",
    "scanner.py",
    "stmt.py",
    "token_type.py",
];

importScripts(PYODIDE_URL + "pyodide.js");

let runtime = null;

async function boot() {
    const pyodide = await loadPyodide({ indexURL: PYODIDE_URL });

    pyodide.FS.mkdir("/mystic");
    await Promise.all(
        SOURCES.map(async (name) => {
            const res = await fetch("./src/" + name);
            if (!res.ok) throw new Error("Could not load " + name);
            pyodide.FS.writeFile("/mystic/" + name, await res.text());
        }),
    );

    const emit = (text) => postMessage({ type: "out", text });
    pyodide.setStdout({ batched: emit });
    pyodide.setStderr({ batched: emit });

    pyodide.runPython(`
import sys
sys.path.insert(0, "/mystic")
from mystic import Mystic

def run_mystic(source):
    # A fresh interpreter per run, so programs never see each other's globals.
    Mystic().run_source(source)
`);

    return pyodide.globals.get("run_mystic");
}

onmessage = async (event) => {
    if (event.data.type !== "run") return;

    let run;
    try {
        if (!runtime) runtime = boot();
        run = await runtime;
    } catch {
        // A failed boot should be retried on the next run, not cached.
        runtime = null;
        postMessage({
            type: "error",
            text: "The interpreter could not start. Check your connection and try again.",
        });
        return;
    }

    postMessage({ type: "ready" });

    try {
        run(event.data.source);
        postMessage({ type: "done" });
    } catch (error) {
        const message = String((error && error.message) || error);
        const overflow =
            message.includes("RecursionError") ||
            message.includes("Maximum call stack");
        postMessage({
            type: "error",
            text: overflow
                ? "Stack overflow: the recursion went too deep."
                : "Mystic hit an internal error running this program.",
        });
    }
};
