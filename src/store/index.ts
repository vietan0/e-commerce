import type React from 'react';
import { create } from 'zustand';

type Snackbar = {
  content: string;
  action?: React.ReactNode;
  severity?: 'success' | 'info' | 'warning' | 'error';
} | null;

interface SnackbarManager {
  snackbar: Snackbar;
  displaySnackbar: (snackbar: Snackbar) => void;
  removeSnackbar: () => void;
}

interface GlobalState extends SnackbarManager {}

const useGlobalStore = create<GlobalState>((set) => ({
  snackbar: null,
  displaySnackbar: (snackbar: Snackbar) => set(() => ({ snackbar })),
  removeSnackbar: () => set({ snackbar: null }),
}));

export default useGlobalStore;
