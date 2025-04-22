/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['images.pexels.com', 'res.cloudinary.com'],
    // You can remove `domains` if you only want to use remotePatterns,
    // but having both is okay—remotePatterns takes priority.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },

      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],


  },

  async rewrites() {
    if (process.env.NODE_ENV === 'production') {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.warn(
          '⚠️  NEXT_PUBLIC_API_URL is not defined—skipping /api rewrites'
        );
        return [];
      }
      return [
        {
          source: '/api/:path*',
          // Note the leading slash before :path*
          destination: `${apiUrl}/:path*`,
        },
      ];
    }

    // dev fallback
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
