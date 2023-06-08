import {
	DocumentCategory,
	Place,
	Event,
	Image,
	Manuscript,
	Print,
	EventType,
	DocumentData,
} from "@prisma/client";

import { Never } from "../utils";

// Export Prisma-derived types
export { DocumentCategory, EventType };
export type { Place, Event, Image, Manuscript, Print, DocumentData };

// CSV-bound types

/**
 * Raw manuscript
 *
 * This is the type of the raw data from the CSV file.
 * I wish they learned to write some actual models instead.
 */
export type RawManuscript = {
	Record: string;
	Event: string;
	Archive: string;
	"Author/sender": string;
	Recipient: string;
	"Date of writing": string;
	"Start point": string;
	"Date of receipt": string;
	"End point": string;
	Summary: string;
	Language: string;
	"Related images or documents": string;
	"Other Events": string;
	Link: string;
	"Analytic tags": string;
	"Private notes": string;
};

/**
 * Raw image
 *
 * This is the type of the raw data from the CSV file.
 * I wish they learned to write some actual models instead.
 */
export type RawImage = {
	Record: string;
	Event: string;
	Artist: string;
	Description: string;
	Date: string;
	"Museum/Institution": string;
	"Medium and support": string;
	Dimensions: string;
	"Related images or documents": string;
	Author: string;
	"Recipient/dedicatee": string;
	Title: string;
	Printer: string;
	Place: string;
	"Reference copy-ies": string;
	Inscriptions: string;
	Link: string;
	"Analytic tags": string;
	"Private notes": string;
};

/**
 * Raw print
 *
 * This is the type of the raw data from the CSV file.
 * I wish they learned to write some actual models instead.
 */
export type RawPrint = {
	Record: string;
	Event: string;
	Author: string;
	"Recipient/dedicatee information": string;
	"Recipient/dedicatee": string;
	Title: string;
	Printer: string;
	"Printer information": string;
	Place: string;
	Summary: string;
	"Other places quoted by the printer": string;
	Year: string;
	Language: string;
	"Form (prose/verses/mixed)": string;
	"Identifier in USTC": string;
	"Reference copy-ies": string;
	"Digitised copy link": string;
	"Related images and documents": string;
	"Additional notes": string;
	"Analaytic tags": string;
	"Private notes": string;
};

// Generic magic

/** Possible types that can appear inside a CSV. */
export type RawContentType = RawImage | RawManuscript | RawPrint;

/** Transform a raw type into the respective database entity. */
export type RefinedContent<T extends RawContentType> = T extends RawImage
	? Image
	: T extends RawManuscript
	? Manuscript
	: T extends RawPrint
	? Print
	: Never;

/** Possible types that can appear inside the database. */
export type RefinedContents = RefinedContent<RawContentType>;

/** All available document categories. */
type DocumentCategories = typeof DocumentCategory;

/** Transform document type into document category type. */
export type DocToCategory<T extends RefinedContents> = T extends Image
	? DocumentCategories["IMAGE"]
	: T extends Manuscript
	? DocumentCategories["MANUSCRIPT"]
	: T extends Print
	? DocumentCategories["PRINT"]
	: Never;

/** Transform document category type into document type. */
export type CategoryToDoc<T extends DocumentCategory> =
	T extends DocumentCategories["IMAGE"]
		? Image
		: T extends DocumentCategories["MANUSCRIPT"]
		? Manuscript
		: T extends DocumentCategories["PRINT"]
		? Print
		: Never;

/** A callable that transforms an object of the `Raw` type into its `Refined` version. */
export type Mapping<T extends RawContentType> = (
	value: T,
) => Promise<RefinedContent<T>>;

/** An event as parsed from a CSV. */
export type ParsedEvent = {
	year: number;
	place: string;
	category: EventType;
};

// Type guards

/**
 * Check if two events are the same.
 *
 * Hopefully, we get `__eq__` in Typescript as well.
 *
 * @param p1 First event
 * @param p2 Second event
 *
 * @returns `true` if the events are the same, `false` otherwise.
 */
export const isSameEvent = (p1: ParsedEvent, p2: ParsedEvent): boolean =>
	p1.year === p2.year && p1.place === p2.place && p1.category === p2.category;

/** Restrict `RawContentType` to `RawManuscript`. */
export const isRawManuscript = (
	value: RawContentType,
): value is RawManuscript => {
	return "Archive" in value;
};

/**
 * Restrict `RawContentType` to `RawImage`.
 *
 * @param value The value to check
 *
 * @returns `true` if the value is a `RawImage`, `false` otherwise.
 */
export const isRawImage = (value: RawContentType): value is RawImage => {
	return "Museum/Institution" in value;
};

/**
 * Restrict `RawContentType` to `RawPrint`.
 *
 * @param value The value to check
 *
 * @returns `true` if the value is a `RawPrint`, `false` otherwise.
 */
export const isRawPrint = (value: RawContentType): value is RawPrint => {
	return "Identifier in USTC" in value;
};

/**
 * Restrict `RefinedContents` to `Manuscript`.
 *
 * @param value The value to check
 *
 * @returns `true` if the value is a `Manuscript`, `false` otherwise.
 */
export const isManuscript = (value: RefinedContents): value is Manuscript => {
	return "archive" in value;
};

/**
 * Restrict `RefinedContents` to `Image`.
 *
 * @param value The value to check
 *
 * @returns `true` if the value is a `Image`, `false` otherwise.
 */
export const isImage = (value: RefinedContents): value is Image => {
	return "museum" in value;
};

/**
 * Restrict `RefinedContents` to `Print`.
 *
 * @param value The value to check
 *
 * @returns `true` if the value is a `Print`, `false` otherwise.
 */
export const isPrint = (value: RefinedContents): value is Print => {
	return "USTC" in value;
};
