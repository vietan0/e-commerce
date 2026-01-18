'use client';
import { Icon } from '@iconify/react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { productCardWidth } from '@/app/constants/ui';
import theme from '@/app/theme';
import CarouselNavButton from '@/components/CarouselNavButton';
import ProductCard from '@/components/ProductCard';
import useProjects from '@/queries/useProducts';

export default function ProductCarousel() {
  const { data, error } = useProjects();
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

  if (data)
    return (
      <Box position="relative">
        <Stack
          direction="row"
          justifyContent="space-between"
          left={`-${btnW / 2}px`}
          position="absolute"
          spacing={2}
          sx={{
            transform: 'translateY(-50%)',
          }}
          top="50%"
          width={`calc(100% + ${btnW}px)`}
          zIndex={1}
        >
          <CarouselNavButton
            disabled={offset === 0}
            onClick={offsetRight}
            size="large"
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
          >
            <Icon
              aria-label="Offset Product Left"
              color="white"
              icon="material-symbols:chevron-right-rounded"
            />
          </CarouselNavButton>
        </Stack>
        <Box
          sx={{
            overflowX: 'clip', // because 'scroll' can make shadows cut off vertically
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

  if (error) return <Typography>Error fetching products.</Typography>;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}
