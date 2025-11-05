/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();


module.exports = withNextIntl(nextConfig);