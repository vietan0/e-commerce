import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Product } from '@/app/types';
import formatPrice from '@/lib/formatPrice';

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const width = 200;
  return (
    <Card
      sx={{
        boxShadow: 4,
        borderRadius: 2,
        flexBasis: width,
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      <CardMedia
        image={product.thumbnail || ''}
        sx={{ height: width }}
        title={product.name}
      />
      <CardContent sx={{ p: 1.5 }}>
        <Typography gutterBottom sx={{ fontWeight: 700 }} variant="body2">
          {product.name}
        </Typography>
        <Typography
          align="right"
          sx={{ fontWeight: 700, color: 'primary.main' }}
        >
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
    </Card>
  );
}
