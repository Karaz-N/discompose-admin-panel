import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useCountryStore = create(
  combine({ country: null } as { country: string | null }, (set) => ({
    changeFocus: (to: string | null) => set((state) => ({ country: to })),
  }))
)

const useAvailableEventsStore = create(
  combine(
    {
      events: [] as string[],
    }, (set) => ({
      addEvents: (item : string) => set((state) => ({ events: [...state.events, item] })),
    }))
  )



export const useFilterStore = create((set) => ({
  events: [],
  iso: [],
  filteredEvents: [],
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
      filteredEvents: state.events.filter((evento) => evento.luogo === country),
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
        (evento) => evento.tipo_evento === type && evento.luogo === state.country
      ),
    }));
  },

  restoreEvents: () => {
    set((state) => ({
        filteredEvents: state.events.filter((evento) => evento.luogo === state.country),
      }));
  },

  restoreIso: () => {
    set((state) => ({
      country : state.iso
    }));
  },
}));
