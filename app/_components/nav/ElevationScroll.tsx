'use client';
import { useScrollTrigger } from '@mui/material';
import { cloneElement } from 'react';

export default function ElevationScroll(props: {
  children?: React.ReactElement<{ elevation?: number }>;
}) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return children
    ? cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}
