import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // This will allow builds to succeed even with ESLint errors
  }
};
