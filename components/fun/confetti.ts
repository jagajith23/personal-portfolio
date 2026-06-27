/**
 * Dependency-free celebration effects (canvas confetti + balloon rain).
 * All effects are no-ops when the user prefers reduced motion.
 */

function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

const COLORS = [
    "#10b981",
    "#2b5fff",
    "#ffd400",
    "#f43f5e",
    "#a855f7",
    "#e5e0d8",
];

export function fireConfetti(count = 140) {
    if (typeof document === "undefined" || prefersReducedMotion()) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
        "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:100;";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        canvas.remove();
        return;
    }

    const cx = window.innerWidth / 2;
    const particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 6 + Math.random() * 9;
        return {
            x: cx,
            y: window.innerHeight * 0.32,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 6,
            size: 5 + Math.random() * 7,
            rot: Math.random() * Math.PI,
            vrot: (Math.random() - 0.5) * 0.4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            life: 1,
        };
    });

    const gravity = 0.28;
    let frame = 0;

    const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        for (const p of particles) {
            p.vy += gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vrot;
            if (frame > 60) p.life -= 0.015;

            if (p.life > 0 && p.y < canvas.height + 40) {
                alive = true;
                ctx.save();
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
                ctx.restore();
            }
        }

        frame++;
        if (alive && frame < 280) {
            requestAnimationFrame(tick);
        } else {
            canvas.remove();
        }
    };

    requestAnimationFrame(tick);
}

export function fireBalloons(count = 14) {
    if (typeof document === "undefined" || prefersReducedMotion()) return;

    const layer = document.createElement("div");
    layer.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:99;overflow:hidden;";
    document.body.appendChild(layer);

    let remaining = count;
    const cleanup = () => {
        remaining--;
        if (remaining <= 0) layer.remove();
    };

    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = "/red-balloon.png";
        img.alt = "";
        const size = 36 + Math.random() * 40;
        const left = Math.random() * 100;
        img.style.cssText = `position:absolute;left:${left}vw;bottom:-120px;width:${size}px;height:auto;will-change:transform,opacity;`;
        layer.appendChild(img);

        const drift = (Math.random() - 0.5) * 160;
        const duration = 4200 + Math.random() * 2600;
        const anim = img.animate(
            [
                { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
                {
                    transform: `translate(${drift}px, -${
                        window.innerHeight + 200
                    }px) rotate(${drift / 8}deg)`,
                    opacity: 0.9,
                },
            ],
            {
                duration,
                delay: Math.random() * 700,
                easing: "ease-in",
                fill: "forwards",
            },
        );
        anim.onfinish = cleanup;
        anim.oncancel = cleanup;
    }
}
