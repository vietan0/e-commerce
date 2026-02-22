import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const CarouselNavButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  '&:disabled': {
    visibility: 'hidden',
  },
  /* debug */
  // borderWidth: 1,
  // borderColor: theme.palette.primary.main,
  // borderStyle: 'solid',
}));

export default CarouselNavButton;
