import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const ACCENT = "#f2b33d";
const FONT = "Aoboshi One";

// Satori needs a TTF/OTF, so pull the glyphs this card uses from Google Fonts
// at render time. If that fails the card still renders in the default font.
async function loadFont(text: string): Promise<ArrayBuffer | null> {
    try {
        const css = await (
            await fetch(
                `https://fonts.googleapis.com/css2?family=${FONT.replace(" ", "+")}&text=${encodeURIComponent(text)}`,
            )
        ).text();
        const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
        if (!url) return null;
        return await (await fetch(url)).arrayBuffer();
    } catch {
        return null;
    }
}

// Local project posters become data URIs; remote (stock) covers are skipped.
async function posterDataUri(imageUrl: string): Promise<string | null> {
    if (!imageUrl.startsWith("/")) return null;
    try {
        const buf = await readFile(path.join(process.cwd(), "public", imageUrl));
        return `data:image/jpeg;base64,${buf.toString("base64")}`;
    } catch {
        return null;
    }
}

// Long titles drop a size so they wrap to two or three lines, never into the footer.
const titleSize = (title: string, hasPoster: boolean) => {
    const long = title.length > 14;
    if (hasPoster) return long ? 56 : 76;
    return long ? 72 : 112;
};

type CardProps = {
    title: string;
    kicker?: string;
    body?: string;
    imageUrl?: string;
};

export async function ogCard({ title, kicker, body, imageUrl }: CardProps) {
    const host = new URL(SITE_URL).host;
    const poster = imageUrl ? await posterDataUri(imageUrl) : null;
    const text = `${title}${kicker ?? ""}${body ?? ""}Jagajith B Software Engineer ${host}`;
    const font = await loadFont(text);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    background: "#000",
                    color: "#f4f4f5",
                    fontFamily: font ? FONT : "sans-serif",
                    padding: 72,
                    gap: 56,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                        gap: 24,
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {kicker && (
                            <div
                                style={{
                                    display: "flex",
                                    fontSize: 28,
                                    color: ACCENT,
                                    marginBottom: 24,
                                }}
                            >
                                {kicker}
                            </div>
                        )}
                        <div
                            style={{
                                display: "flex",
                                fontSize: titleSize(title, !!poster),
                                lineHeight: 1.05,
                                letterSpacing: "0.02em",
                            }}
                        >
                            {title}
                        </div>
                        {body && (
                            <div
                                style={{
                                    display: "flex",
                                    fontSize: 28,
                                    lineHeight: 1.35,
                                    lineClamp: 2,
                                    color: "#a1a1aa",
                                    marginTop: 28,
                                    maxWidth: poster ? 520 : 880,
                                }}
                            >
                                {body}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            fontSize: 28,
                            color: "#a1a1aa",
                        }}
                    >
                        <div style={{ width: 40, height: 3, background: ACCENT, display: "flex" }} />
                        Jagajith B · Software Engineer
                    </div>
                </div>

                {poster && (
                    <div
                        style={{
                            display: "flex",
                            alignSelf: "center",
                            width: 480,
                            height: 480,
                            borderRadius: 20,
                            overflow: "hidden",
                            border: "2px solid #27272a",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={poster}
                            alt=""
                            width={480}
                            height={480}
                            style={{ objectFit: "cover", objectPosition: "0% 0%" }}
                        />
                    </div>
                )}
            </div>
        ),
        {
            ...OG_SIZE,
            fonts: font
                ? [{ name: FONT, data: font, style: "normal", weight: 400 }]
                : undefined,
        },
    );
}
