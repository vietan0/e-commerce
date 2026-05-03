import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import apiFetch from '@/src/queries/apiFetch';
import useGlobalStore from '@/src/store';
import type { UpsertCartItemBody } from '@/src/types/cart';

export default function useUpsertCartItem() {
  const queryClient = useQueryClient();
  const displaySnackbar = useGlobalStore((state) => state.displaySnackbar);
  const t = useTranslations();
  return useMutation({
    mutationKey: ['upsertCartItem'],
    mutationFn: (upsertCartItemBody: UpsertCartItemBody) =>
      upsertCartItem(upsertCartItemBody),
    onSuccess: () => {
      displaySnackbar({
        content: t('snackbar.Added product to cart'),
        action: (
          <Button component={NextLink} href="/cart" size="small">
            {t('cart.View cart')}
          </Button>
        ),
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

async function upsertCartItem(upsertCartItemBody: UpsertCartItemBody) {
  const res = await apiFetch('/cart', {
    method: 'POST',
    body: upsertCartItemBody,
  });

  return res;
}
