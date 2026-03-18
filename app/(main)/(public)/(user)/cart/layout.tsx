import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Giỏ hàng',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
