import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.badgr.io',
        pathname: '/**',
      },
    ],
  },
  // Make sure environment variables are available to the API
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_TO: process.env.EMAIL_TO,
  },
};

export default nextConfig;
