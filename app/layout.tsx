import type { Metadata } from "next";
import { Geist, Geist_Mono, Aoboshi_One, WindSong } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Jagajith – Software Engineer & Web Developer",
    template: "%s | Jagajith",
  },
  description:
    "Personal portfolio of Jagajith, a software engineer specializing in full-stack web development, React, Next.js, and modern web technologies.",
  keywords: [
    "Jagajith",
    "Software Engineer",
    "Web Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Jagajith" }],
  creator: "Jagajith",

  metadataBase: new URL("https://gorgeous-cheesecake-d96c45.netlify.app/"),

  openGraph: {
    title: "Jagajith – Software Engineer & Web Developer",
    description:
      "Explore projects, skills, and experience of Jagajith, a full-stack web developer.",
    url: "https://gorgeous-cheesecake-d96c45.netlify.app/",
    siteName: "Jagajith Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jagajith Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jagajith – Software Engineer",
    description: "Portfolio showcasing projects, skills, and experience.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const derry = localFont({
  src: [
    {
      path: "../public/fonts/Mollas-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-derry",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aoboshiOne.variable} ${windSong.variable} antialiased w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
