'use client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type React from 'react';

export default function AppDialog({
  title,
  children,
  onCloseAction,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  onCloseAction: () => void;
}) {
  // open/closed state is managed by useDialog
  return (
    <Dialog
      container={document.getElementById('dialogs')!}
      onClose={onCloseAction}
      open={true}
    >
      <DialogTitle>{title || 'DialogTitle'}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
