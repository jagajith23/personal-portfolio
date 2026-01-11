import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-assets.clashroyale.com",
      },
      {
        protocol: "https",
        hostname: "api.nuget.org",
      },
    ],
  },
};

export default nextConfig;
