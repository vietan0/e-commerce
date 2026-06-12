'use client';
import AppDialog from '@/app/_components/AppDialog';
import useGlobalStore from '@/src/store';

export default function DialogManager() {
  const dialogs = useGlobalStore((state) => state.dialogs);

  return (
    <div>
      {dialogs.map((dialog, i) => (
        <AppDialog key={i} title={dialog.title}>
          {dialog.content}
        </AppDialog>
      ))}
    </div>
  );
}
