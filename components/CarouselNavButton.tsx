import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';

const CarouselNavButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.3),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.5),
  },
  '&:disabled': {
    visibility: 'hidden',
  },
  /* debug */
  // borderWidth: 1,
  // borderColor: theme.palette.primary.main,
  // borderStyle: 'solid',
}));

export default CarouselNavButton;
