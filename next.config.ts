import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 1024, 1600],
    domains: ["picsum.photos", "api.dicebear.com"],
  },
  /* config options here */
};

export default nextConfig;
