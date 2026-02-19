import { Icon } from '@iconify/react';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import theme from '@/app/theme';
import type { product_imageGetPayload } from '@/src/generated/prisma/models';
import formatFileSize from '@/src/lib/formatFileSize';

export default function ProductImage({
  image,
}: {
  image: product_imageGetPayload<{ include: { file: true } }>;
}) {
  const [copied, setCopied] = useState(false);

  function copyUrl(str: string) {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <Card
      sx={{
        boxShadow: 0,
        border: 2,
        borderRadius: 2,
        borderColor: 'grey.400',
      }}
    >
      <CardActionArea component="div" onClick={() => copyUrl(image.file.url)}>
        <CardContent sx={{ p: 1.5, pt: 0 }}>
          <Stack alignItems="center" sx={{ mb: 0.5 }}>
            <Image
              alt={image.file.name!}
              height={100}
              src={image.file.url}
              style={{ objectFit: 'contain' }}
              width={200}
            />
          </Stack>
          <Typography noWrap title={image.file.name!} variant="body2">
            {image.file.name}
          </Typography>
          <Stack direction="row" spacing={0.25} sx={{ alignItems: 'center' }}>
            <IconButton
              aria-label="Copy URL"
              disabled={copied}
              onClick={() => copyUrl(image.file.url)}
              size="small"
              sx={{ width: 26, height: 26 }}
            >
              <Icon
                color={
                  copied
                    ? theme.palette.success.light
                    : theme.palette.primary.main
                }
                fontSize={16}
                icon={
                  copied
                    ? 'material-symbols:check-rounded'
                    : 'material-symbols:content-copy-outline-rounded'
                }
              />
            </IconButton>
            <Typography
              noWrap
              sx={{ color: 'text.secondary' }}
              title={image.file.url}
              variant="body2"
            >
              {image.file.url}
            </Typography>
          </Stack>
          <Typography sx={{ color: 'text.secondary' }} variant="body2">
            {formatFileSize(image.file.size!)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
