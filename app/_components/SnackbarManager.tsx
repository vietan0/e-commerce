'use client';
import { Alert } from '@mui/material';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import useGlobalStore from '@/src/store';
export default function SnackbarManager() {
  const snackbar = useGlobalStore((state) => state.snackbar);
  const removeSnackbar = useGlobalStore((state) => state.removeSnackbar);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') return;
    removeSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      onClose={handleClose}
      open={Boolean(snackbar)}
    >
      <Alert
        action={snackbar?.action}
        onClose={handleClose}
        severity={snackbar?.severity}
        sx={{ width: '100%' }}
        variant="standard"
      >
        {snackbar?.content}
      </Alert>
    </Snackbar>
  );
}
