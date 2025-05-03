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
    serverActions: {
      // You can configure additional options here if needed
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb',
    },
  },
  
  // Add MongoDB to external packages to prevent bundling issues
  serverExternalPackages: ['mongoose', 'bcryptjs'],
};

export default nextConfig;