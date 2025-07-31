import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'horuslearn.s3.amazonaws.com'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        // port: '8000',
        pathname: '/**',
      }
    ],
  }
};

export default withNextVideo(nextConfig);