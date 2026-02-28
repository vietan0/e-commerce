'use client';
import { Link, type TypographyVariant } from '@mui/material';
import NextLink from 'next/link';

export default function HomeLink({ variant }: { variant?: TypographyVariant }) {
  return (
    <Link
      color="inherit"
      component={NextLink}
      fontWeight={700}
      href="/"
      underline="hover"
      variant={variant || 'h6'}
    >
      CellphoneS
    </Link>
  );
}
