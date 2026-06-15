import { type JSX, useState } from 'react';
import AppDialog from '@/app/_components/AppDialog';

export default function useDialog(content: JSX.Element) {
  const [open, setOpen] = useState(false);
  const dialog = open && (
    <AppDialog onCloseAction={() => setOpen(false)}>{content}</AppDialog>
  );
  return { open, setOpen, dialog };
}
