import type { Metadata } from "next";
import { Geist, Geist_Mono, Aoboshi_One, WindSong } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Jagajith – Software Engineer & Web Developer",
    template: "%s | Jagajith",
  },
  description:
    "Personal portfolio of Jagajith, a software engineer specializing in full-stack web development.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon_io/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon_io/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon_io/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon_io/site.webmanifest" />
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${aoboshiOne.variable}
          ${windSong.variable}
          antialiased
          bg-black
        `}
      >
        {/* <Providers> */}
        {children}
        {/* </Providers> */}
      </body>
    </html>
  );
}
