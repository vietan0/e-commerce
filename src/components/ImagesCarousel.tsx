'use client';
import { Icon } from '@iconify/react';
import { Box, Button, Stack, type SxProps, type Theme } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useMeasure, useSize } from 'react-use';
import CarouselNavButton from '@/src/components/CarouselNavButton';
import type { Prisma } from '@/src/generated/prisma/client';

export default function ImagesCarousel({
  images,
}: {
  images: Prisma.product_imageGetPayload<{
    include: {
      file: true;
    };
  }>[];
}) {
  const btnW = 30;

  const carouselNavBtnStyles: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    backgroundColor: 'white',
    border: 1,
    p: 0.25,
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 6,
      color: 'primary.main',
    },
  };

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [offset, setOffset] = useState(0);
  const [containerRef, { width: containerWidth }] = useMeasure();

  const [imgStack, { width: imgStackWidth }] = useSize(() => (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: 'fit-content',
        transition: 'all 0.2s ease-out',
        transform: `translateX(${-offset}px)`,
      }}
      useFlexGap
    >
      {images.map((img, i) => (
        <Button
          key={img.id}
          onClick={() => setActiveImageIdx(i)}
          sx={{
            p: 0,
            borderRadius: 2,
            overflow: 'hidden',
            flexShrink: 0,
            border: 1,
            borderColor: activeImageIdx === i ? 'inherit' : 'grey.400',
            '&:hover': {
              borderColor: 'inherit',
            },
          }}
          variant="outlined"
        >
          <Image
            alt=""
            height={80}
            src={img.file.url}
            style={{ objectFit: 'cover' }}
            width={80}
          />
        </Button>
      ))}
    </Stack>
  ));
  const minOffset = 0;
  const maxOffset =
    imgStackWidth - containerWidth >= 0 ? imgStackWidth - containerWidth : 0;
  function right() {
    setOffset((o) => {
      const pureResult = o + containerWidth / 2;
      return pureResult > maxOffset ? maxOffset : pureResult;
    });
  }
  function left() {
    setOffset((o) => {
      const pureResult = o - containerWidth / 2;
      return pureResult < minOffset ? minOffset : pureResult;
    });
  }

  if (images.length === 0) return;

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          borderRadius: 3,
          border: 1,
          borderColor: 'grey.400',
          overflow: 'hidden',
          backgroundColor: 'black',
        }}
      >
        <Image
          alt=""
          height={300}
          key={images[activeImageIdx].id}
          src={images[activeImageIdx].file.url}
          style={{ display: 'block', objectFit: 'contain', width: '100%' }}
          width={500}
        />
      </Box>
      <p>maxOffset: {maxOffset}</p>
      <p>offset: {offset}</p>
      <Box sx={{ position: 'relative' }}>
        <Box ref={containerRef} sx={{ overflowX: 'clip' }}>
          {imgStack}
        </Box>
        <CarouselNavButton
          disabled={offset === minOffset}
          onClick={left}
          size="small"
          sx={{
            left: -btnW / 2,
            ...carouselNavBtnStyles,
          }}
        >
          <Icon
            aria-label="Offset Image Right"
            fontSize={24}
            icon="material-symbols:chevron-left-rounded"
          />
        </CarouselNavButton>
        <CarouselNavButton
          disabled={offset === maxOffset}
          onClick={right}
          size="small"
          sx={{
            right: -btnW / 2,
            ...carouselNavBtnStyles,
          }}
        >
          <Icon
            aria-label="Offset Image Right"
            fontSize={24}
            icon="material-symbols:chevron-right-rounded"
          />
        </CarouselNavButton>
      </Box>
    </Stack>
  );
}
