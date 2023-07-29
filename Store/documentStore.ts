import { create } from "zustand";

import {
	Manuscript as BManuscript,
	Print as BPrint,
	Image as BImage,
	Event,
	Place,
} from "@prisma/client";

type Manuscript = BManuscript & { from: Place; to?: Place };
type Print = BPrint & { place: Place };
type Image = BImage & { place: Place };

export type DocumentStore = {
	allDocument: (Manuscript | Print | Image)[];
	allManuscript: Manuscript[];
	allPrint: Print[];
	allImage: Image[];

	eventId: string;
	event: Event[];
	filteredManuscript: Manuscript[];
	filteredPrint: Print[];
	filteredImage: Image[];

	filteredManuscriptCount: number;
	filteredPrintCount: number;
	filteredImageCount: number;

	selectedEventData: Event[];

	selectedManuscriptFilter: boolean;
	selectedPrintFilter: boolean;
	selectedImageFilter: boolean;

	filteredManuscriptFromMap: Manuscript[];
	filteredPrintFromMap: Print[];
	filteredImageFromMap: Image[];

	setAllDocument: (document: (Manuscript | Print | Image)[]) => void;
	setAllManuscript: (manuscript: Manuscript[]) => void;
	setAllPrint: (print: Print[]) => void;
	setAllImage: (image: Image[]) => void;
	setFilter: (event: string, eventData: Event[]) => void;
	setFilterFromMap: (lat: number, lng: number) => void;
	selectedManuscript: () => void;
	selectedImage: () => void;
	selectedPrint: () => void;
	deselectFilter: () => void;
	setSelectedEventData: (event: Event[]) => void;
};

export const useDocumentStore = create<DocumentStore>((set) => ({
	allDocument: [],

	allManuscript: [],
	allPrint: [],
	allImage: [],

	eventId: "",
	event: [],
	filteredManuscript: [],
	filteredPrint: [],
	filteredImage: [],

	filteredManuscriptCount: 0,
	filteredPrintCount: 0,
	filteredImageCount: 0,

	selectedEventData: [],

	selectedManuscriptFilter: true,
	selectedPrintFilter: true,
	selectedImageFilter: true,

	filteredManuscriptFromMap: [],
	filteredPrintFromMap: [],
	filteredImageFromMap: [],

	setAllDocument: (document) => {
		set({ allDocument: document });
	},

	setAllManuscript: (manuscript) => {
		set({ allManuscript: manuscript });
	},

	setAllPrint: (print) => {
		set({ allPrint: print });
	},

	setAllImage: (image) => {
		set({ allImage: image });
	},

	setFilter: (event, eventData) => {
		set({ eventId: event });
		set({ event: eventData });
		set((state) => ({
			filteredManuscript: state.allManuscript.filter(
				(manuscript) => manuscript.from && manuscript.eventId === state.eventId,
			),
		}));
		set((state) => ({
			filteredPrint: state.allPrint.filter(
				(print) => print.place && print.eventId === state.eventId,
			),
		}));
		set((state) => ({
			filteredImage: state.allImage.filter(
				(image) => image.place && image.eventId === state.eventId,
			),
		}));

		set((state) => ({
			filteredManuscriptCount: state.filteredManuscript.length,
		}));
		set((state) => ({ filteredPrintCount: state.filteredPrint.length }));
		set((state) => ({ filteredImageCount: state.filteredImage.length }));
	},

	setFilterFromMap: (lat, lng) => {
		set((state) => ({
			filteredManuscriptFromMap: state.filteredManuscript.filter(
				(manuscript) =>
					manuscript.from.latitude === lat && manuscript.from.longitude === lng,
			),
		}));
		set((state) => ({
			filteredPrintFromMap: state.filteredPrint.filter(
				(print) =>
					print.place.latitude === lat && print.place.longitude === lng,
			),
		}));
		set((state) => ({
			filteredImageFromMap: state.filteredImage.filter(
				(image) =>
					image.place.latitude === lat && image.place.longitude === lng,
			),
		}));
	},

	selectedManuscript: () => {
		set({ selectedManuscriptFilter: true });
		set({ selectedPrintFilter: false });
		set({ selectedImageFilter: false });
	},

	selectedImage: () => {
		set({ selectedImageFilter: true });
		set({ selectedManuscriptFilter: false });
		set({ selectedPrintFilter: false });
	},

	selectedPrint: () => {
		set({ selectedPrintFilter: true });
		set({ selectedManuscriptFilter: false });
		set({ selectedImageFilter: false });
	},

	deselectFilter: () => {
		set({ selectedManuscriptFilter: true });
		set({ selectedPrintFilter: true });
		set({ selectedImageFilter: true });
	},

	setSelectedEventData: (event) => {
		set({ selectedEventData: event });
	},
}));
