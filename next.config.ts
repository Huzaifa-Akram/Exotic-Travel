import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root. A stray package-lock.json in the user's home
  // folder was causing Next to infer the wrong root at build time.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
