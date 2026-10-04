/**
 * Timeline for the "SIUUU" celebration. Pure maths, no DOM: siuFrame(t)
 * says which drawing is showing at a moment in time and where it stands, and
 * the stage just writes that to the SVG.
 *
 * The motion is a flipbook of the drawings in siu-art.ts, like hand-drawn
 * animation: the drawings carry the poses, and this only moves them (the run
 * across, the jump arc, the squash on landing).
 */

export const SIU_STAGE = 480;
export const SIU_DURATION = 4.3;
/** Feet hit the ground, back to the viewer: dust keys off this. */
export const SIU_LAND = 1.66;
/** The shout: lettering and confetti key off this. */
export const SIU_SHOUT = 2.3;
/** The lettering leaves just before the figure fades, still in the pose. */
export const SIU_QUIET = 3.95;
/** A still that reads as the celebration, for reduced motion. */
export const SIU_POSE_TIME = 2.8;
/** The drawing with its back turned, which wears the name and number. */
export const SIU_BACK_FRAME = 11;

const GROUND = 462;
// Art units to stage units: the figure stands about 390 tall.
const ART = 0.44;

const RUN_FROM = 0.32;
const JUMP_FROM = 1.08;
const JUMP_HEIGHT = 70;
// The run cycle is drawings 2 to 7, a new one every 0.08s.
const RUN_CYCLE = 6;
const RUN_STEP = 0.08;

// When each drawing comes up: [time, index into SIU_FRAMES].
const BEATS: readonly (readonly [number, number])[] = [
    [0, 0],
    // A first step, then the run cycle until take-off.
    [RUN_FROM, 1],
    ...Array.from(
        { length: Math.round((JUMP_FROM - RUN_FROM - 0.12) / RUN_STEP) },
        (_, i) =>
            [RUN_FROM + 0.12 + i * RUN_STEP, 2 + (i % RUN_CYCLE)] as const,
    ),
    // Take-off, hands up, then the turn in the air.
    [JUMP_FROM, 8],
    [1.24, 9],
    [1.46, 10],
    // Down, arms out, back to the viewer.
    [SIU_LAND, 11],
    [SIU_SHOUT, 12],
    [3.35, 13],
];

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const clamp01 = (p: number) => Math.min(1, Math.max(0, p));
const span = (t: number, from: number, to: number) =>
    clamp01((t - from) / (to - from));
// Overshoots a little, then settles.
const backOut = (p: number) => {
    const c = 2.2;
    return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2);
};

export type SiuFrame = {
    /** Index of the drawing to show. */
    drawing: number;
    /** Where it stands, with any squash applied. */
    transform: string;
    opacity: number;
    /** 0..1 progress of the landing dust, or -1 when there is none. */
    dust: number;
};

export function siuFrame(t: number): SiuFrame {
    let drawing = 0;
    for (const [at, index] of BEATS) if (t >= at) drawing = index;

    // Runs in from the left and takes off just short of centre stage.
    const x =
        t < JUMP_FROM
            ? lerp(70, 206, span(t, RUN_FROM, JUMP_FROM))
            : lerp(206, 240, span(t, JUMP_FROM, SIU_LAND));

    // One parabola for the jump (the run drawings carry their own bounce).
    const flight = span(t, JUMP_FROM, SIU_LAND) * 2 - 1;
    const air =
        t > JUMP_FROM && t < SIU_LAND ? JUMP_HEIGHT * (1 - flight * flight) : 0;

    // Squash on landing, and a small swell with the shout.
    const squash = lerp(0.9, 1, backOut(span(t, SIU_LAND, SIU_LAND + 0.3)));
    const swell = lerp(1.05, 1, backOut(span(t, SIU_SHOUT, SIU_SHOUT + 0.25)));
    const sy = (t >= SIU_LAND ? squash : 1) * (t >= SIU_SHOUT ? swell : 1);
    const sx =
        (2 - (t >= SIU_LAND ? squash : 1)) * (t >= SIU_SHOUT ? swell : 1);

    const fadeIn = span(t, 0, 0.15);
    const fadeOut = 1 - span(t, SIU_DURATION - 0.3, SIU_DURATION);

    return {
        drawing,
        transform:
            `translate(${x.toFixed(1)} ${(GROUND - air).toFixed(1)}) ` +
            `scale(${(sx * ART).toFixed(4)} ${(sy * ART).toFixed(4)})`,
        opacity: Math.min(fadeIn, fadeOut),
        dust:
            t >= SIU_LAND && t < SIU_LAND + 0.6
                ? span(t, SIU_LAND, SIU_LAND + 0.6)
                : -1,
    };
}
