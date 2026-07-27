import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "false" ? undefined : "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
