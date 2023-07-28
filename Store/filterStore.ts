import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  events: [],
  iso: [],
  filteredEvents: [],
  temporaryFilteredEvents: [],
  fromYear: "1500",
  toYear: "1700",
  eventType: "",
  country: "",

  addEvents: (item) => set((state) => ({ events: item })),

  changeFromYear: (year) => set((state) => ({ fromYear: year })),
  changeToYear: (year) => set((state) => ({ toYear: year })),
  changeEventType: (eventType) => set((state) => ({ eventType: eventType })),

  setIso: (iso) => {
    set((state) => ({ iso: iso }));
    set({country : iso});
  },

  filterByCountry: (country) => {
    set({ country: country });
    set((state) => ({
      filteredEvents: state.events.filter((elemento) => elemento.place.hasOwnProperty("countryCode") && elemento.place.countryCode === country),
    }));
    set((state) => ({
      temporaryFilteredEvents : state.filteredEvents
    }));
  },

  filterByYear: (year) => {
    set((state) => ({
      filteredEvents: state.events.filter((evento) => evento.luogo === year),
    }));
  },

  filterByType: (type) => {
    set({ eventType: type });
    set((state) => ({
      filteredEvents: state.events.filter(
        (evento) => evento.type === type && evento.place.hasOwnProperty("countryCode") && evento.place.countryCode === state.country
      ),
    }));
  },

  restoreEvents: () => {
    set((state) => ({
        filteredEvents: state.events.filter((elemento) => elemento.place.hasOwnProperty("countryCode") && elemento.place.countryCode === state.country),
      }));
  },

  restoreIso: () => {
    set((state) => ({
      country : state.iso
    }));
  },
}));
