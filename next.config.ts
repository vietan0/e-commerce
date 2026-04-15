import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://cdn2.cellphones.com.vn/**'),
      new URL('https://siaezlhlmwbpqhmm.public.blob.vercel-storage.com/**'),
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
