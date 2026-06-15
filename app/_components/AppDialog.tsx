import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import type React from 'react';

export default function AppDialog({
  title,
  children,
  width = '80%',
  onClose,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: React.CSSProperties['width'];
  onClose: () => void;
}) {
  return (
    <Dialog
      container={document.getElementById('dialogs')!}
      onClose={onClose}
      open={true} // open/closed state is managed by useDialog
      slotProps={{
        paper: {
          sx: {
            minWidth: 300,
            maxWidth: 1000,
            width,
          },
        },
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
