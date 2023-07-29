import { set } from "react-hook-form";
import { create } from "zustand";

import { combine } from "zustand/middleware";

type Store = {
  isSelectedCountry: boolean;
  isSelectedEvent: boolean;
  isSelectedDocument: boolean;
  selectedCountry: string;
  sidebarVisible: boolean;
  sidebarOpen: boolean;

  setSelectedCountry: () => void;
  deselectCountry: () => void;
  setSelectedEvent: () => void;
  deselectEvent: () => void;
  setSelectedDocument: () => void;
  setDeselectedDocument: () => void;
  setSidebarVisible: (state: boolean) => void;
  setSidebarOpen: (state: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  isSelectedCountry: false,
  isSelectedEvent: false,
  isSelectedDocument: false,
  selectedCountry: "",
  sidebarVisible: false,
  sidebarOpen: false,

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
  },

  setSidebarVisible: (state) => {
    set({ sidebarVisible: state });
  },

  setSidebarOpen: (state) => {
    set({ sidebarOpen: state });
  },
}));

export const LayoutStore = create(
  combine({ show: true }, (set) => ({
    setShow: (newsState: boolean) => {
      set({ show: newsState });
    },
  })),
);
