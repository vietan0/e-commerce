import {
  CardActionArea,
  CardMedia,
  type SxProps,
  type Theme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { placeholderImg, productCardWidth } from '@/src/constants/ui';
import { formatPrice } from '@/src/lib/price';
import type { ProductFull } from '@/src/types';

interface Props {
  product: ProductFull;
  hasShadow: boolean;
}
export default function ProductCard({ product, hasShadow }: Props) {
  const { id, base_price, final_price, name, thumbnail } = product;
  const propBasedStyles: SxProps<Theme> = hasShadow
    ? { boxShadow: 4 }
    : {
        boxShadow: 0,
        border: 3,
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
      <CardActionArea
        component={Link}
        href={`/product/${id}`}
        key={id}
        prefetch={false}
        sx={{ height: 1 }}
      >
        <CardMedia title={name || undefined}>
          <Image
            alt={`Thumbnail for ${name}`}
            height={productCardWidth}
            src={thumbnail?.url || placeholderImg}
            width={productCardWidth}
          />
        </CardMedia>
        <CardContent sx={{ p: 1.5 }}>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 700,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            variant="body2"
          >
            {name}
          </Typography>
          {(base_price as unknown as string) !== final_price && (
            <Typography
              align="right"
              color="grey.500"
              sx={{ textDecorationLine: 'line-through' }}
              variant="body2"
            >
              {formatPrice(base_price as unknown as string)}
            </Typography>
          )}
          <Typography
            align="right"
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            {formatPrice(final_price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
