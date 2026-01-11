import { Box, Typography } from '@mui/material';
import ProductCarousel from '@/components/ProductCarousel';

export default function HotSale() {
  return (
    <Box>
      <Typography gutterBottom variant="h3">
        HotSale
      </Typography>
      <ProductCarousel />
    </Box>
  );
}
