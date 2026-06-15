import { useState } from 'react';
import AppDialog from '@/app/_components/AppDialog';

export default function useDialog({
  title,
  content,
  width,
}: {
  title?: React.ReactNode;
  content: React.ReactNode;
  width?: React.CSSProperties['width'];
}) {
  const [open, setOpen] = useState(false);
  const dialog = open && (
    <AppDialog onClose={() => setOpen(false)} title={title} width={width}>
      {content}
    </AppDialog>
  );
  return { dialog, open, setOpen };
}
