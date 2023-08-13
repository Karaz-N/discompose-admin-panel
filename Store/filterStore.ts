import { create } from "zustand";

import { Event as BEvent, EventType, Place } from "@prisma/client";

type Event = BEvent & { place: Place };

type FilterStore = {
	events: Event[];
	iso: string;
	filteredEvents: Event[];
	temporaryFilteredEvents: Event[];
	fromYear: string;
	toYear: string;
	eventType: EventType | "";
	country: string;
	traceType: string;

	addEvents: (item: Event[]) => void;
	changeFromYear: (year: string) => void;
	changeToYear: (year: string) => void;
	changeEventType: (eventType: EventType) => void;
	setIso: (iso: string) => void;
	filterByCountry: (country: string) => void;
	filterByYear: (year: string) => void;
	filterByType: (type: EventType) => void;
	restoreEvents: () => void;
	restoreIso: () => void;
	setTraceType: (traceType: string) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
	events: [],
	iso: "",
	filteredEvents: [],
	temporaryFilteredEvents: [],
	fromYear: "1500",
	toYear: "1700",
	eventType: "",
	country: "",
	traceType: "",

	addEvents: (item) => set((state) => ({ events: item })),

	changeFromYear: (year) => set((state) => ({ fromYear: year })),
	changeToYear: (year) => set((state) => ({ toYear: year })),
	changeEventType: (eventType) => set((state) => ({ eventType: eventType })),

	setIso: (iso) => {
		set((state) => ({ iso: iso }));
		set({ country: iso });
	},

	filterByCountry: (country) => {
		set({ country: country });
		set((state) => ({
			filteredEvents: state.events.filter(
				(elemento) =>
					elemento.place.countryCode &&
					elemento.place.countryCode === country,
			),
		}));
		set((state) => ({
			temporaryFilteredEvents: state.filteredEvents,
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
				(evento) =>
					evento.type === type &&
					evento.place.countryCode &&
					evento.place.countryCode === state.country,
			),
		}));
	},

	restoreEvents: () => {
		set((state) => ({
			filteredEvents: state.events.filter(
				(elemento) =>
					elemento.place.countryCode &&
					elemento.place.countryCode === state.country,
			),
		}));
	},

	restoreIso: () => {
		set((state) => ({
			country: state.iso,
		}));
	},

	setTraceType: (traceType) => {
		set({ traceType: traceType });
	}
}));
