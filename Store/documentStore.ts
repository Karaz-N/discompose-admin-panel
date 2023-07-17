import { create } from "zustand";

export const useDocumentStore = create((set) => ({
  allDocument: [],

  setAllDocument: (document) => {
    set({ allDocument: document });
  }

}));
