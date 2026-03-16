import { create } from 'zustand';

interface GlobalState {
  snackbar: string | null;
  displaySnackbar: (content: string) => void;
  removeSnackbar: () => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  snackbar: null,
  displaySnackbar: (content: string) => set(() => ({ snackbar: content })),
  removeSnackbar: () => set({ snackbar: null }),
}));

export default useGlobalStore;
