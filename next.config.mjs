/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better error detection
  reactStrictMode: true,
  
  // Configure image domains if needed
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
  },
  
  // Add experimental features if needed
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;

