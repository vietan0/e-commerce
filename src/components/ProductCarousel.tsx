'use client';
import { Icon } from '@iconify/react';
import {
  alpha,
  Box,
  CircularProgress,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import theme from '@/app/theme';
import CarouselNavButton from '@/src/components/CarouselNavButton';
import ProductCard from '@/src/components/ProductCard';
import { productCardWidth } from '@/src/constants/ui';
import useProducts from '@/src/queries/useProducts';

export default function ProductCarousel() {
  const { data, isPending, error } = useProducts();
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

  if (error) return <Typography>Error fetching products.</Typography>;

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
        disabled={offset === data.products.length - 1}
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
          {data.products.map((p) => (
            <ProductCard hasShadow={false} key={p.id} product={p} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
