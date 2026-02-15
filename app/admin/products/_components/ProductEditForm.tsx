import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { Product } from '@/src/types';

export default function ProductEditForm({
  product,
  open,
  handleClose,
}: {
  product: Product;
  open: boolean;
  handleClose: () => void;
}) {
  const { name } = product;
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      slotProps={{
        paper: {
          sx: { minWidth: 300, maxWidth: 900 },
        },
      }}
    >
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <DialogContentText>Dialog Content Text</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
