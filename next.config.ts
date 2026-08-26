import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  devIndicators: false,
  // For GitHub Pages repo deployment, uncomment and set:
  // basePath: '/your-repo-name',
};

export default nextConfig;
