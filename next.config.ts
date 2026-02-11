import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        hostname: "**",
        pathname: "/api/files/**",
      },
    ],
  },
};

export default nextConfig;