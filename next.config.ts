import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/College-Discovery",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {},
};

export default nextConfig;

