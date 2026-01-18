import { CardMedia, type SxProps, type Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { productCardWidth } from '@/app/constants/ui';
import type { Product } from '@/app/types';
import formatPrice from '@/lib/formatPrice';

interface Props {
  product: Product;
  hasShadow: boolean;
}
export default function ProductCard({ product, hasShadow }: Props) {
  const propBasedStyles: SxProps<Theme> = hasShadow
    ? { boxShadow: 4 }
    : {
        boxShadow: 0,
        border: 1,
        borderRadius: 3,
        borderColor: 'grey.400',
      };
  return (
    <Card
      sx={{
        borderRadius: 2,
        flexBasis: productCardWidth,
        flexShrink: 0,
        flexGrow: 0,
        ...propBasedStyles,
      }}
    >
      <CardMedia
        image={product.thumbnail || ''}
        sx={{ height: productCardWidth }}
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
