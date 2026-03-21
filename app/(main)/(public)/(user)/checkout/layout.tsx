import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Thanh toán',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
