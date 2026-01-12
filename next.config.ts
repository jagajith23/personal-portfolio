import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api-assets.clashroyale.com",
      },
      {
        protocol: "https",
        hostname: "api.nuget.org",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "slickgrid.net",
      },
      {
        protocol: "https",
        hostname: "zustand-demo.pmnd.rs",
      },
      {
        protocol: "https",
        hostname: "docs.k8slens.dev",
      },
    ],
  },
};

export default nextConfig;
