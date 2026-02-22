import { Icon } from '@iconify/react';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import type { ListBlobResultBlob } from '@vercel/blob';
import Image from 'next/image';
import theme from '@/app/theme';
import useCopy from '@/src/hooks/useCopy';
import formatFileSize from '@/src/lib/formatFileSize';

export default function Blob({ blob }: { blob: ListBlobResultBlob }) {
  const { copied, copy } = useCopy();

  return (
    <Card
      sx={{
        boxShadow: 0,
        border: 2,
        borderRadius: 2,
        borderColor: 'grey.400',
      }}
    >
      <CardActionArea component="div" onClick={() => copy(blob.url)}>
        <CardContent>
          <Stack alignItems="center" sx={{ mb: 0.5 }}>
            <Image
              alt={blob.pathname}
              height={80}
              src={blob.url}
              style={{ objectFit: 'contain' }}
              width={120}
            />
          </Stack>
          <Typography noWrap title={blob.pathname} variant="body2">
            {blob.pathname}
          </Typography>
          <Stack direction="row" spacing={0.25} sx={{ alignItems: 'center' }}>
            <IconButton
              aria-label="Copy URL"
              disabled={copied}
              onClick={() => copy(blob.url)}
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
              title={blob.url}
              variant="body2"
            >
              {blob.url}
            </Typography>
          </Stack>
          <Typography sx={{ color: 'text.secondary' }} variant="body2">
            {formatFileSize(blob.size)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
