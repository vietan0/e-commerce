import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://cdn2.cellphones.com.vn/**'),
      new URL('https://siaezlhlmwbpqhmm.public.blob.vercel-storage.com/**'),
    ],
  },
};

export default nextConfig;
