import type { NextConfig } from "next";

const CMS_ORIGIN = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:8787';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow images served through the local proxy (same origin as Next.js dev server)
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/cms-files/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/cms-files/**',
      },
      // Allow any HTTPS image (Unsplash, Wikimedia, production CDN, etc.)
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Proxy /cms-files/* → CMS backend /files/*
  // This avoids Next.js's "private IP" SSRF protection when optimizing images
  // that are stored in the CMS (e.g. http://localhost:8787/files/uploads/...)
  async rewrites() {
    return [
      {
        source: '/cms-files/:path*',
        destination: `${CMS_ORIGIN}/files/:path*`,
      },
    ];
  },
};

export default nextConfig;


import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
