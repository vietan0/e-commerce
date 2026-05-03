import { create } from 'zustand';

type Snackbar = {
  content: string;
  action?: React.ReactNode;
} | null;

interface GlobalState {
  snackbar: Snackbar;
  displaySnackbar: (snackbar: Snackbar) => void;
  removeSnackbar: () => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  snackbar: null,
  displaySnackbar: (snackbar: Snackbar) => set(() => ({ snackbar })),
  removeSnackbar: () => set({ snackbar: null }),
}));

export default useGlobalStore;
