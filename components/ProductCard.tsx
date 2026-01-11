import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Product } from '@/app/types';

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const width = 180;
  return (
    <Card
      sx={{ borderRadius: 2, flexBasis: width, flexShrink: 0, flexGrow: 0 }}
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
          variant="body2"
        >
          {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
