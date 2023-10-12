/** @type {import('next').NextConfig} */
const nodeExternals = require("webpack-node-externals");

const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "cdn.jsdelivr.net"
    ],
  },
};

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
};
