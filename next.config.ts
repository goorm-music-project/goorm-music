import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "mosaic.scdn.co",
      "i.scdn.co",
      "image-cdn-ak.spotifycdn.com",
      "image-cdn-fa.spotifycdn.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'; unload 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
