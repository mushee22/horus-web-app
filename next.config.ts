import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  }
};

export default withNextVideo(nextConfig);