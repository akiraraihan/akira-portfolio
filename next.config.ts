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
  // Make sure environment variables are available to the API
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_TO: process.env.EMAIL_TO,
  },
};

export default nextConfig;
