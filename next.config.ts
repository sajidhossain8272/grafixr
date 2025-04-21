// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow next/image to optimize from Pexels
  images: {
    domains: ['images.pexels.com'],
    // —OR— for path‑level control:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },

  // Proxy /api/* to your backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
            : 'http://localhost:5000/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
