import type React from 'react';
import { create } from 'zustand';

type Snackbar = {
  content: string;
  action?: React.ReactNode;
} | null;

type Dialog = {
  title?: React.ReactNode;
  content: React.ReactNode;
};

interface SnackbarManager {
  snackbar: Snackbar;
  displaySnackbar: (snackbar: Snackbar) => void;
  removeSnackbar: () => void;
}

interface DialogManager {
  dialogs: Dialog[];
  addDialog: (dialog: Dialog) => void;
  popDialog: () => void;
}

interface GlobalState extends SnackbarManager, DialogManager {}

const useGlobalStore = create<GlobalState>((set) => ({
  snackbar: null,
  displaySnackbar: (snackbar: Snackbar) => set(() => ({ snackbar })),
  removeSnackbar: () => set({ snackbar: null }),
  dialogs: [],
  addDialog: (dialog: Dialog) =>
    set((state) => {
      return {
        dialogs: [...state.dialogs, dialog],
      };
    }),
  popDialog: () =>
    set((state) => {
      return {
        dialogs: [...state.dialogs.slice(0, -1)],
      };
    }),
}));

export default useGlobalStore;
