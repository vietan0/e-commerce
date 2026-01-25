'use client';
import { Icon } from '@iconify/react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { productCardWidth } from '@/app/constants/ui';
import theme from '@/app/theme';
import CarouselNavButton from '@/components/CarouselNavButton';
import ProductCard from '@/components/ProductCard';
import useProducts from '@/queries/useProducts';

export default function ProductCarousel() {
  const { data, isPending, error } = useProducts();
  const [offset, setOffset] = useState(0);
  const btnW = 52; // size of one CarouselNavButton, may change if "size" prop or child icon size changes
  const spacing = 2;
  const gap = spacing * 8; // 8px - MUI default

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

  if (error) return <Typography>Error fetching products.</Typography>;

  return (
    <Box position="relative">
      <CarouselNavButton
        disabled={offset === 0}
        onClick={offsetRight}
        size="large"
        sx={{
          position: 'absolute',
          left: `-${btnW / 2}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <Icon
          aria-label="Offset Product Right"
          color="white"
          icon="material-symbols:chevron-left-rounded"
        />
      </CarouselNavButton>
      <CarouselNavButton
        disabled={offset === data.products.length - 1}
        onClick={offsetLeft}
        size="large"
        sx={{
          position: 'absolute',
          right: `-${btnW / 2}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
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
          {data.products.map((p) => (
            <ProductCard hasShadow={false} key={p.id} product={p} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
