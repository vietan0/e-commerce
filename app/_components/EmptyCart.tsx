import { Icon } from '@iconify/react';
import { Button, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';

export default function EmptyCart({ inMenu }: { inMenu: boolean }) {
  const t = useTranslations('cart');

  return (
    <Stack
      spacing={1}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: inMenu ? '20vh' : '40vh',
      }}
    >
      <Icon
        color="lightgrey"
        fontSize={inMenu ? 40 : 60}
        icon="mingcute:empty-box-line"
      />
      <Typography variant={inMenu ? 'body1' : 'h6'}>
        {t('Your cart is empty')}
      </Typography>
      {!inMenu && (
        <Button component={NextLink} href="/">
          {t('Shop now')}
        </Button>
      )}
    </Stack>
  );
}
