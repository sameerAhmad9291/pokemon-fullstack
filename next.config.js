/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Add support for Tailwind CSS
    if (!isServer) {
      config.resolve.alias["@emotion/core"] = "node_modules/@emotion/react";
      config.resolve.alias["@emotion/styled"] = "node_modules/@emotion/styled";
      config.resolve.alias["emotion-theming"] = "node_modules/@emotion/react";
    }

    return config;
  },
};

module.exports = nextConfig;
