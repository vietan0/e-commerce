'use client';
import { Link } from '@mui/material';
import NextLink from 'next/link';

export default function HomeLink() {
  return (
    <Link
      color="inherit"
      component={NextLink}
      fontWeight={700}
      href="/"
      underline="hover"
      variant="h6"
    >
      CellphoneS
    </Link>
  );
}
