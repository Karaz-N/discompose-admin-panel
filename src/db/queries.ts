"use server";

import { client } from ".";
import {
	EventType,
	Event,
	DocumentCategory,
	DocumentData,
	CategoryToDoc,
	Place,
} from "./models";

/**
 * Load the number of events in the database.
 *
 * @returns The number of events in the database
 */
export const loadAllEventsCount = async (): Promise<number> => {
	return await client.event.count();
};

/**
 * Load every event in the database.
 *
 * @returns Every event in the database
 */
export const loadAllEvents = async () => {
	return await client.event.findMany({ include: { place: true } });
};

/**
 * Load the number of events of a given type.
 *
 * @param type The type of event
 * @returns The number of events of the given type
 */
export const loadEventCount = async (type: EventType): Promise<number> => {
	return await client.event.count({
		where: {
			type,
		},
	});
};

/**
 * Load all events of a given type.
 *
 * @param type The type of event
 * @returns All events of the given type
 */
export const loadEvents = async (type: EventType): Promise<Event[]> => {
	return await client.event.findMany({
		where: {
			type,
		},
	});
};

/**
 * Load every document in the database.
 *
 * @returns Every document in the database
 */
export const loadAllDocuments = async (): Promise<DocumentData[]> => {
	return await client.documentData.findMany();
};

/**
 * Load the number of documents in the database.
 *
 * @returns The number of documents in the database
 */
export const loadAllDocumentsCount = async (): Promise<number> => {
	return await client.documentData.count();
};

/**
 * Load the number of documents of a given type.
 *
 * @param type The type of document
 * @returns The number of documents of the given type
 */
export const loadDocumentCount = async (
	type: DocumentCategory,
): Promise<number> => {
	return await client.documentData.count({
		where: {
			type,
		},
	});
};

/**
 * Load all documents of a given type.
 *
 * @param type The type of document
 * @returns All documents of the given type
 */
export const loadDocuments = async (
	type: DocumentCategory,
): Promise<DocumentData[]> => {
	return await client.documentData.findMany({
		where: {
			type,
		},
	});
};

/**
 * Load the number of documents of a given type (with full details).
 *
 * @param type The type of document
 */
export const loadFullDocumentCount = async <T extends DocumentCategory>(
	type: T,
): Promise<number> => {
	if (type === DocumentCategory.MANUSCRIPT) {
		return await client.manuscript.count();
	} else if (type === DocumentCategory.PRINT) {
		return await client.print.count();
	} else if (type === DocumentCategory.IMAGE) {
		return await client.image.count();
	}
	return 0;
};

/**
 * Load all documents of a given type (with full details).
 *
 * @param type The type of document
 * @returns All documents of the given type
 */
export const loadFullDocuments = async <T extends DocumentCategory>(
	type: T,
) => {
	if (type === DocumentCategory.MANUSCRIPT) {
		const manuscripts = await client.manuscript.findMany({
			include: { from: true, to: true, event: true },
		});
		return manuscripts;
	} else if (type === DocumentCategory.PRINT) {
		const prints = await client.print.findMany({
			include: { place: true, event: true },
		});
		return prints;
	} else if (type === DocumentCategory.IMAGE) {
		const images = await client.image.findMany({
			include: { place: true, event: true },
		});
		return images;
	}
	return [];
};

/**
 * : Promise<CategoryToDoc<T>[]>
 * as CategoryToDoc<T>[];
 */

/** Possible filters */
type Filter = {
	types: EventType[];
	fromYear: number | undefined;
	toYear: number | undefined;
};

/**
 * Load all events with the given filters.
 *
 * @param filter The filters to apply
 * @returns All events with the given filters
 */
export const loadEventsWithFilters = async (filter: Filter) => {
	const { types, fromYear, toYear } = filter;

	return await client.event.findMany({
		where: {
			type: {
				in: types,
			},
			year: {
				gte: fromYear ?? 1400,
				lte: toYear ?? 1800,
			},
		},
	});
};
