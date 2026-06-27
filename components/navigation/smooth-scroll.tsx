export const smoothScrollTo = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (!element) return;

    const NAV_OFFSET = 100;
    const isTop = targetId === "body";
    const bodyTop = document.body.getBoundingClientRect().top;
    const rect = element.getBoundingClientRect();
    const sectionTop = rect.top - bodyTop;

    let offsetPosition: number;
    if (isTop) {
        offsetPosition = 0;
    } else {
        const heading = element.querySelector("h1, h2, h3") ?? element;
        const headingTop = heading.getBoundingClientRect().top - bodyTop;
        // Pin the heading just below the navbar for tall sections...
        const headingScroll = headingTop - NAV_OFFSET;
        // ...but center sections shorter than the viewport so they don't over-scroll
        // into the next section ("stop early"). min() naturally picks centering for
        // short sections and heading-pinning for tall ones.
        const centerScroll =
            sectionTop - (window.innerHeight - rect.height) / 2;
        offsetPosition = Math.min(headingScroll, centerScroll);
    }
    offsetPosition = Math.max(0, offsetPosition);

    const duration = 1500;
    const start = window.scrollY;
    const distance = offsetPosition - start;
    let startTime: number | null = null;

    function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t * t + b;
        t -= 2;
        return (-c / 2) * (t * t * t * t - 2) + b;
    }

    requestAnimationFrame(animation);
};
