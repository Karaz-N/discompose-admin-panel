"use server";

import {
	Place,
	Event,
	EventType,
	ParsedEvent,
	RawManuscript,
	Manuscript,
	RawImage,
	Image,
	RawPrint,
	Print,
	Mapping,
	RawContentType,
	isRawImage,
	isRawManuscript,
	isRawPrint,
	RefinedContent,
	DocumentCategory,
} from "./models";
import formidable from "formidable";
import Papa from "papaparse";
import { geocode } from "./geo";
import { client } from ".";
import * as fs from "fs";

// Geocoding and Event parsing

/**
 * Parses a string representing an event into a ParsedEvent object.
 *
 * @param eventString A string representing an event.
 *
 * @returns A ParsedEvent object.
 *
 * @example
 * parseEvent("1707 Vesuvius Eruption") // { year: 1707, place: "Vesuvius", category: ERUPTION }
 */
const parseEvent = (eventString: string): ParsedEvent => {
	const [first, ...rest] = eventString.split(" ");
	const last = rest.pop();
	const territory = rest.join(" ");

	if (last === undefined) {
		throw "Invalid event";
	}

	return {
		year: parseInt(first),
		place: territory,
		category: last.toUpperCase() as EventType,
	};
};

/**
 * Adds a place to the database.
 *
 * @param place A string representing a place.
 *
 * @returns An optional Place object.
 */
const addPlace = async (place: string): Promise<Place | null> => {
	// check if place exists in db
	const dbPlace = await client.place.findUnique({
		where: {
			name: place,
		},
	});

	// Only perform geocode on new places
	// Important:
	// Add a setTimeout here to avoid getting blocked by Nominatim,
	// if too many new places are to be added
	if (dbPlace === null) {
		const data = await geocode(place);

		if (data.length === 0) {
			return null;
		}

		try {
			const { lat, lon } = data[0];

			const placeObj = {
				name: place,
				latitude: parseFloat(lat),
				longitude: parseFloat(lon),
			};

			return await client.place.create({
				data: placeObj,
			});
		} catch (e: unknown) {
			console.log(`${place} could not be geocoded`);

			return null;
		}
	} else {
		return dbPlace;
	}
};

/**
 * Adds an event to the database.
 * An event is provided as a string, which is parsed into a ParsedEvent object.
 * Duplicate events will not write to the database.
 *
 * @param eventString A string representing an event.
 * @returns An Promise of an Event object.
 */
const addEvent = async (eventString: string): Promise<Event> => {
	// Take string and convert into a ParsedEvent
	const event = parseEvent(eventString);

	// Check if event place exists in db
	const place = await addPlace(event.place);

	if (place === null) {
		throw "Internal server error.\nDescription: Place could not be geocoded.";
	}

	// Check if event exists in db, in any case you get it at the end
	const dbEvent = await client.event.upsert({
		create: {
			year: event.year,
			placeId: place.id,
			type: event.category,
		},
		update: {
			year: event.year,
			placeId: place.id,
			type: event.category,
		},
		where: {
			year_type_placeId: {
				year: event.year,
				placeId: place.id,
				type: event.category,
			},
		},
	});

	return dbEvent;
};

// Parsing logic

/**
 * Maps a RawManuscript object to a Manuscript object.
 *
 * While doing this, it will also fetch the corresponding Event and Place
 * objects from the database, and add them to the Manuscript object.
 *
 * @param value A RawManuscript object.
 * @returns A Promise of a Manuscript object.
 */
const manuscriptMapping: Mapping<RawManuscript> = async (
	value: RawManuscript,
): Promise<Manuscript> => {
	const fromPlace = await client.place.findUnique({
		where: {
			name: value["Start point"],
		},
	});

	const toPlace = await client.place.findUnique({
		where: {
			name: value["End point"],
		},
	});

	const event = await addEvent(value["Event"]);

	return {
		id: value["Record"],
		author: value["Author/sender"],
		recipient: value["Recipient"],
		language: value["Language"],
		summary: value["Summary"],
		link: value["Link"],
		archive: value["Archive"],
		writtenAt: value["Date of writing"],
		receivedAt: value["Date of receipt"],
		fromPlaceId: fromPlace?.id ?? null,
		toPlaceId: toPlace?.id ?? null,
		eventId: event.id,
	};
};

/**
 * Maps a RawImage object to an Image object.
 *
 * While doing this, it will also fetch the corresponding Event and Place
 * objects from the database, and add them to the Image object.
 *
 * @param value A RawImage object.
 * @returns A Promise of a Image object.
 */
const imageMapping: Mapping<RawImage> = async (
	value: RawImage,
): Promise<Image> => {
	const place = await client.place.findUnique({
		where: {
			name: value["Place"],
		},
	});

	const event = await addEvent(value["Event"]);

	return {
		id: value["Record"],
		artist: value["Artist"],
		author: value["Author"],
		title: value["Title"],
		museum: value["Museum/Institution"],
		content: value["Description"],
		date: value["Date"],
		summary: value["Inscriptions"],
		link: value["Link"],
		eventId: event.id,
		placeId: place?.id ?? null,
	};
};

/**
 * Maps a RawPrint object to an Print object.
 *
 * While doing this, it will also fetch the corresponding Event and Place
 * objects from the database, and add them to the Print object.
 *
 * @param value A RawPrint object.
 * @returns A Promise of a Print object.
 */
const printMapping: Mapping<RawPrint> = async (
	value: RawPrint,
): Promise<Print> => {
	let places = [value["Other places quoted by the printer"]];

	const place = await client.place.findUnique({
		where: {
			name: value["Place"],
		},
	});

	// remove null from places
	places = places.filter(function (el) {
		return el != null;
	});

	const event = await addEvent(value["Event"]);

	return {
		id: value["Record"],
		language: value["Language"],
		title: value["Title"],
		year: value["Year"],
		notes: value["Additional notes"],
		USTC: value["Identifier in USTC"],
		writer: value["Author"],
		information: value["Summary"],
		dedicatee: value["Recipient/dedicatee"],
		summary: value["Summary"],
		author: value["Author"],
		link: value["Digitised copy link"],
		placeId: place?.id ?? null,
		eventId: event.id,
		otherPlaces: places,
	};
};

/**
 * Given an array of RawContent objects, it will return a function that maps
 * each RawContent object to its corresponding type.
 *
 * @param els An array of RawContent objects.
 * @returns A function that maps each RawContent object to its corresponding type.
 *
 * NOTE: This is only _somewhat_ of an hack,
 * I wish we could rely on GATs to do this for us.
 */
const getMapping = <T extends RawContentType>(els: T[]): Mapping<T> => {
	const first = els[0];

	if (isRawManuscript(first)) {
		return manuscriptMapping as Mapping<T>;
	} else if (isRawImage(first)) {
		return imageMapping as Mapping<T>;
	} else if (isRawPrint(first)) {
		return printMapping as Mapping<T>;
	} else {
		throw "Unknown type";
	}
};

/**
 * Given a string representing a CSV file, it will return an array of objects
 * representing the contents of the CSV file.
 *
 * @param contents A string representing a CSV file.
 * @returns An array of objects representing the contents of the CSV file.
 */
const parse = <T extends RawContentType>(contents: string): T[] => {
	const result = Papa.parse<T>(contents, {
		header: true,
		delimiter: ";",
		skipEmptyLines: "greedy",
		dynamicTyping: false,
	});

	if (result.errors.length !== 0) {
		console.log(result.errors);

		throw "Error parsing CSV file";
	} else {
		return result.data;
	}
};

/**
 * Given a filename, it will load the file and parse it into the correct type.
 *
 * @param filename The name of the file to load.
 * @returns An array of objects representing the contents of the CSV file.
 */
const loadAndParse = <T extends RawContentType>(filename: string): T[] => {
	const file = fs.readFileSync(filename, "utf8");

	const result = parse<T>(file);

	return result;
};

/**
 * Given an array of RawContent objects, it will normalise them for the database.
 *
 * @param items An array of RawContent objects.
 * @returns An array of RefinedContent objects.
 */
const normaliseForDb = async <T extends RawContentType>(
	items: T[],
): Promise<RefinedContent<T>[]> => {
	const mapping = getMapping(items);

	const normalised = items.map(mapping);

	const awaited = await Promise.all(normalised);

	return awaited;
};

/**
 * Load manuscripts from a CSV file and add them to the database.
 *
 * @param filename
 */
export const uploadManuscripts = async (filename: string): Promise<void> => {
	const raw = loadAndParse<RawManuscript>(filename);

	const normalised = await normaliseForDb(raw);

	const docs = normalised.map((value) => {
		return {
			id: value.id,
			type: DocumentCategory.MANUSCRIPT,
			imageId: value.id,
		};
	});

	const created = await client.manuscript.createMany({
		data: normalised,
		skipDuplicates: true,
	});

	const createdSubtable = await client.documentData.createMany({
		data: docs,
		skipDuplicates: true,
	});
};

/**
 * Load images from a CSV file and add them to the database.
 *
 * @param filename
 */
export const uploadImages = async (filename: string): Promise<void> => {
	const raw = loadAndParse<RawImage>(filename);

	const normalised = await normaliseForDb(raw);

	const docs = normalised.map((value) => {
		return {
			id: value.id,
			type: DocumentCategory.IMAGE,
			imageId: value.id,
		};
	});

	const created = await client.image.createMany({
		data: normalised,
		skipDuplicates: true,
	});

	const createdSubtable = await client.documentData.createMany({
		data: docs,
		skipDuplicates: true,
	});
};

/**
 * Load prints from a CSV file and add them to the database.
 *
 * @param filename
 */
export const uploadPrints = async (filename: string): Promise<void> => {
	const raw = loadAndParse<RawPrint>(filename);

	const normalised = await normaliseForDb(raw);

	const docs = normalised.map((value) => {
		return {
			id: value.id,
			type: DocumentCategory.PRINT,
			imageId: value.id,
		};
	});

	const created = await client.print.createMany({
		data: normalised,
		skipDuplicates: true,
	});

	const createdSubtable = await client.documentData.createMany({
		data: docs,
		skipDuplicates: true,
	});
};
