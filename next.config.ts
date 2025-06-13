import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'img.icons8.com',
      },
      {
        hostname: 'api.badgr.io',
      },
    ],
  },
};

export default nextConfig;
