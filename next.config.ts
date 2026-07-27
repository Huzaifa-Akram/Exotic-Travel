import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root. A stray package-lock.json in the user's home
  // folder was causing Next to infer the wrong root at build time.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Next 16 allowlists qualities (default [75]) so the optimiser can't
    // be driven at arbitrary settings from the URL. The hero photograph
    // asks for 85 — a dark image at 75 bands across the bonnet.
    qualities: [75, 85],
  },
};

export default nextConfig;
