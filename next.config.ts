import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Shown in the footer as "Updated <month year>".
    NEXT_PUBLIC_BUILT_AT: new Date().toISOString(),
  },
  async headers() {
    return [
      {
        // Self-hosted meme clips never change in place; rename to bust.
        source: "/memes/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
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
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
