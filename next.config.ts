import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/College-Discovery",
  images: {
    unoptimized: true,
  },
  turbopack: {},
};

export default nextConfig;

