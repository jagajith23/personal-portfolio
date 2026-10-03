// Canonical origin for metadata, sitemap and robots. Set NEXT_PUBLIC_SITE_URL
// in production; Vercel's production hostname is the fallback.
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000");

export const SITE_NAME = "Jagajith B";
export const SITE_TITLE = "Jagajith B | Software Engineer";
export const SITE_DESCRIPTION =
    "Personal portfolio of Jagajith, a software engineer specializing in full-stack web development.";
