import { create } from "zustand";

const useBear = create((set) => ({
  name: undefined,
  updateName: (newName) => set(() => ({ name: newName })),
}));

export default useBear;
