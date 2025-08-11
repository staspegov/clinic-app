/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // ✅ inside object
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
