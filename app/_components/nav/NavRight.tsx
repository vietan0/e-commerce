import { Stack } from '@mui/material';
import CartBtn from '@/app/_components/nav/cart/CartBtn';
import LanguageMenu from '@/app/_components/nav/LanguageMenu';
import UserBtns from '@/app/_components/nav/UserBtns';

export default function NavRight() {
  return (
    <Stack direction="row" spacing={1}>
      <LanguageMenu />
      <CartBtn />
      <UserBtns />
    </Stack>
  );
}
