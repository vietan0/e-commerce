'use client';

import {
  Box,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import QueryError from '@/app/_components/QueryError';
import useProduct from '@/src/queries/products/useProduct';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  const segments = pathname.split('/');
  const basePath = segments.slice(0, 4).join('/');
  const tab = segments[segments.length - 1];

  const { data: product, isPending, error } = useProduct(id);

  const [value, setValue] = useState(tab);
  useEffect(() => {
    // when redirect hasn't finished yet
    if (tab === id) setValue('colors');
  }, [id, tab]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <QueryError error={error} />;

  return (
    <Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography>{product.name}</Typography>
        <Typography>{product.id}</Typography>
        <Typography variant="body2">
          <span>{product.brand?.name}</span>
          <span> · </span>
          <span>{product.product_series?.name}</span>
          <span> · </span>
          <span>{product.os?.name}</span>
        </Typography>
        {product.product_category.map((pc) => (
          <p key={pc.id}>{pc.category.name}</p>
        ))}
      </Box>
      <Divider />
      <Tabs
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: 'grey.300' }}
        value={value}
      >
        <Tab
          component={NextLink}
          href={`${basePath}/colors`}
          label="Colors"
          value="colors"
        />
        <Tab
          component={NextLink}
          href={`${basePath}/variants`}
          label="Variants"
          value="variants"
        />
        <Tab
          component={NextLink}
          href={`${basePath}/serial-units`}
          label="Serial Units"
          value="serial-units"
        />
      </Tabs>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}
