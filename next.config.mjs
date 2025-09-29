/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Configure allowed origins for Replit proxy
  allowedDevOrigins: [
    '*.replit.dev',
    '*.repl.co',
    '*.sisko.replit.dev',
    'localhost',
    '127.0.0.1'
  ],
  images: {
    unoptimized: true,
    domains: [
      'admin.glst.in',
      'api.glst.in'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add trailing slashes for consistent URLs
  trailingSlash: true,
  // Configure redirects for product URLs
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
