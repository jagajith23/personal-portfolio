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

export const metadata: Metadata = {
    title: {
        default: "Jagajith – Software Engineer & Web Developer",
        template: "%s | Jagajith",
    },
    description:
        "Personal portfolio of Jagajith, a software engineer specializing in full-stack web development.",
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
                {/* <Providers> */}
                <MotionProvider>{children}</MotionProvider>
                {/* </Providers> */}
            </body>
        </html>
    );
}
