import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn2.cellphones.com.vn/insecure/**')],
  },
};

export default nextConfig;
