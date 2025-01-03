import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.modules.push('node_modules');
    return config;
  },
};

export default nextConfig;
