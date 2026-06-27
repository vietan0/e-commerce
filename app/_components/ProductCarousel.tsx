'use client';
import { Icon } from '@iconify/react';
import {
  alpha,
  Box,
  CircularProgress,
  Stack,
  type SxProps,
  type Theme,
} from '@mui/material';
import { useState } from 'react';
import CarouselNavButton from '@/app/_components/CarouselNavButton';
import ProductCard from '@/app/_components/ProductCard';
import QueryError from '@/app/_components/QueryError';
import theme from '@/app/theme';
import { productCardWidth } from '@/src/constants/ui';
import useResource from '@/src/queries/useResource';

export default function ProductCarousel() {
  const {
    data: products,
    isPending,
    error,
  } = useResource('products', { limit: 8 });
  const [offset, setOffset] = useState(0);
  const btnW = 52; // size of one CarouselNavButton, may change if "size" prop or child icon size changes
  const spacing = 2;
  const gap = spacing * 8; // 8px - MUI default
  const carouselNavBtnStyles: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    backgroundColor: alpha(theme.palette.common.black, 0.5),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.7),
    },
  };

  function offsetLeft() {
    setOffset((p) => p + 1);
  }
  function offsetRight() {
    setOffset((p) => p - 1);
  }

  if (isPending)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <QueryError error={error} />;

  return (
    <Box position="relative">
      <CarouselNavButton
        disabled={offset === 0}
        onClick={offsetRight}
        size="large"
        sx={{
          left: -btnW / 2,
          ...carouselNavBtnStyles,
        }}
      >
        <Icon
          aria-label="Offset Product Right"
          color="white"
          icon="material-symbols:chevron-left-rounded"
        />
      </CarouselNavButton>
      <CarouselNavButton
        disabled={offset === products.length - 1}
        onClick={offsetLeft}
        size="large"
        sx={{
          right: -btnW / 2,
          ...carouselNavBtnStyles,
        }}
      >
        <Icon
          aria-label="Offset Product Left"
          color="white"
          icon="material-symbols:chevron-right-rounded"
        />
      </CarouselNavButton>
      <Box
        sx={{
          overflowX: 'clip', // because 'overflowX: scroll' can make shadows cut off vertically
        }}
      >
        <Stack
          direction="row"
          spacing={theme.spacing(spacing)}
          sx={{
            transition: 'all 0.2s ease-out',
            transform: `translateX(${-offset * (productCardWidth + gap)}px)`,
          }}
        >
          {products.map((p) => (
            <ProductCard hasShadow={false} key={p.id} product={p} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
