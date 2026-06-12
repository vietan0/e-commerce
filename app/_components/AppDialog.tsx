'use client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import useGlobalStore from '@/src/store';

export default function AppDialog({
  title,
  children,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
}) {
  const popDialog = useGlobalStore((state) => state.popDialog);
  const [open, setOpen] = useState(true);
  const _handleOpen = () => setOpen(true);
  const handleClose = () => {
    popDialog(); // (!) unmount, not set state, so no exit animation
  };
  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{title || 'DialogTitle'}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
