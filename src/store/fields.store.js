import { create } from "zustand";

const formFieldStore = create((set) => ({
  type: null,
  label: null,

  setSelectedField: (data) =>
    set(() => ({
      type: data.type,
      label: data.label,
    })),
}));

export default formFieldStore;