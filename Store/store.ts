import { create } from "zustand";

import { combine } from 'zustand/middleware'

export const useStore = create((set) => ({
  isSelectedCountry: false,
  isSelectedEvent: false,
  isSelectedDocument: false,

  setSelectedCountry: () => {
    set({ isSelectedCountry: true });
  },
  deselectCountry: () => {
    set({ isSelectedCountry: false });
  },
  setSelectedEvent: () => {
    set({ isSelectedEvent: true });
  },

  deselectEvent: () => {
    set({ isSelectedEvent: false });
  },

  setSelectedDocument: () => {
    set({ isSelectedDocument: true });
  },

  setDeselectedDocument: () => {
    set({ isSelectedDocument: false });
  }
}));


export const LayoutStore = create(combine({show: true}, (set) => ({
  setShow: (newsState: boolean) => {
    set({ show: newsState });
  }
}))
)