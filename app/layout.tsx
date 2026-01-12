import type { Metadata } from "next";
import { Geist, Geist_Mono, Aoboshi_One, WindSong } from "next/font/google";
import localFont from "next/font/local";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
