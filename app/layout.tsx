import type { Metadata } from "next";
import {
    Geist,
    Geist_Mono,
    Aoboshi_One,
    WindSong,
    Bricolage_Grotesque,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MotionProvider from "@/components/motion-provider";
import {
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_TITLE,
    SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: "%s | Jagajith",
    },
    description: SITE_DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "/",
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [{ url: "/me-cropped.jpg", alt: "Portrait of Jagajith" }],
    },
    twitter: {
        card: "summary",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: ["/me-cropped.jpg"],
    },
    manifest: "/favicon_io/site.webmanifest",
    icons: {
        icon: [
            {
                url: "/favicon_io/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/favicon_io/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
        ],
        apple: "/favicon_io/apple-touch-icon.png",
    },
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const aoboshiOne = Aoboshi_One({
    weight: "400",
    variable: "--font-aoboshi",
});

const windSong = WindSong({
    weight: "500",
    variable: "--font-wind-song",
});

// Person structured data for search results.
const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jagajith B",
    jobTitle: "Software Engineer",
    url: SITE_URL,
    image: `${SITE_URL}/me-cropped.jpg`,
    worksFor: { "@type": "Organization", name: "Xome", url: "https://www.xome.com/" },
    sameAs: [
        "https://github.com/jagajith23/",
        "https://linkedin.com/in/jagajith23/",
        "https://leetcode.com/u/jagajith23/",
    ],
};

const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${aoboshiOne.variable}
          ${windSong.variable}
          ${bricolage.variable}
          antialiased
          bg-black
        `}
            >
                <Script id="design-no-flash" strategy="beforeInteractive">
                    {`try{if(localStorage.getItem('design')==='brutal'){document.documentElement.setAttribute('data-design','brutal')}}catch(e){}`}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personJsonLd),
                    }}
                />
                <MotionProvider>{children}</MotionProvider>
            </body>
        </html>
    );
}
