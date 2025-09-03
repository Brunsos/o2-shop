import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/o2-shop',
  assetPrefix: '/o2-shop/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
