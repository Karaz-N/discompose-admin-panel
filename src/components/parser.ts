import { exit } from "process";
import type {
    Manuscript,
    Image,
    Print,
    Event,
    Place,
} from "../db";
import { EventType, client } from "../db";
import Papa, { ParseResult } from "papaparse";
import * as fs from "fs";

import pkg from "nominatim-client";
const { createClient } = pkg;

const DocumentCategory = {
    MANUSCRIPT: 'MANUSCRIPT',
    PRINT: 'PRINT',
    IMAGE: 'IMAGE',
} as const;

interface RawManuscript {
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
}

interface RawImages {
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
}

interface RawPrinted {
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
}



const geocodeClient = createClient({
    useragent: "HELLO",
    referer: "https://example.com",
});


function todo<T>(): T {
    throw "PLEASE IMPLEMENT ME";
}

async function atodo<T>(): Promise<T> {
    throw "PLEASE IMPLEMENT ME";
}

type Never = never;
type RawContentType = RawImages | RawManuscript | RawPrinted;
type RefinedContent<T extends RawContentType> = T extends RawImages
    ? Image
    : T extends RawManuscript
    ? Manuscript
    : T extends RawPrinted
    ? Print
    : Never;

type RefinedContents = RefinedContent<RawContentType>;

type Prismas<T extends RefinedContents> = T extends Image
    ? typeof client.image
    : T extends Manuscript
    ? typeof client.manuscript
    : typeof client.print;

type DocumentRefinedType<T extends RefinedContents> = T extends Image
    ? typeof DocumentCategory.IMAGE
    : T extends Manuscript
    ? typeof DocumentCategory.MANUSCRIPT
    : typeof DocumentCategory.PRINT;

type Mapping<T extends RawContentType> = (
    value: T,
) => Promise<RefinedContent<T>>;

type OnlyImages = Omit<RawImages, keyof RawManuscript | keyof RawPrinted>;
type OnlyManuscript = Omit<RawManuscript, keyof RawImages | keyof RawPrinted>;
type OnlyPrinted = Omit<RawPrinted, keyof RawImages | keyof RawManuscript>;
type Shared = RawPrinted & RawManuscript & RawImages;

interface ParsedEvent {
    year: number;
    place: string;
    category: EventType;
}

function parseEvent(id: string): ParsedEvent {
    const [first, ...rest] = id.split(" ");
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
}

const geocode: (place: string) => Promise<pkg.SearchResultItem[]> = async (
    place,
) => {
    // remove non-alphanumeric characters
    // place = place.replace(/[^a-zA-Z0-9 ]/g, "")
    return await geocodeClient.search({ q: place });
};

async function addPlace(place: string): Promise<Place | null> {
    // check if place exists in db
    const dbPlace = await client.place.findUnique({
        where: {
            name: place,
        },
    });

    if (dbPlace === null) {
        const data = await geocode(place);

        try {
            const lat = data[0].lat;
            const lon = data[0].lon;

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
}

async function addEvent(eventString: string): Promise<Event> {
    // Take string and convert into a ParsedEvent
    const event = parseEvent(eventString);

    // Check if event place exists in db
    const place = await addPlace(event.place);

    if (place === null) {
        throw "Internal server error.\nDescription: Place could not be geocoded."
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
}

function isSameEvent(p1: ParsedEvent, p2: ParsedEvent): boolean {
    return (
        p1.year === p2.year && p1.place === p2.place && p1.category === p2.category
    );
}

const isManuscript = (value: RawContentType): value is RawManuscript => {
    return "Archive" in value;
};

const isImage = (value: RawContentType): value is RawImages => {
    return "Museum/Institution" in value;
};

const isPrint = (value: RawContentType): value is RawPrinted => {
    return "Identifier in USTC" in value;
};

const isRefinedManuscript = (value: RefinedContents): value is Manuscript => {
    return "archive" in value;
};

const isRefinedImage = (value: RefinedContents): value is Image => {
    return "museum" in value;
};

const isRefinedPrint = (value: RefinedContents): value is Print => {
    return "USTC" in value;
};

const prismasMapping = <T extends RefinedContents>(value: T): Prismas<T> => {
    if (isRefinedImage(value)) {
        return client.image as Prismas<T>;
    } else if (isRefinedManuscript(value)) {
        return client.manuscript as Prismas<T>;
    } else if (isRefinedPrint(value)) {
        return client.print as Prismas<T>;
    } else {
        throw "Invalid type";
    }
};

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
    }
};

const imageMapping: Mapping<RawImages> = async (
    value: RawImages,
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
    }
};

const printMapping: Mapping<RawPrinted> = async (
    value: RawPrinted,
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
    }
};

const getMapping = <T extends RawContentType>(els: T[]): Mapping<T> => {
    const first = els[0];

    if (isManuscript(first)) {
        return manuscriptMapping as Mapping<T>;
    } else if (isImage(first)) {
        return imageMapping as Mapping<T>;
    } else if (isPrint(first)) {
        return printMapping as Mapping<T>;
    } else {
        throw "Unknown type";
    }
};

async function parse<T extends RawContentType>(contents: string): Promise<T[]> {
    const result = Papa.parse<T>(contents, {
        header: true,
        delimiter: ";",
        skipEmptyLines: "greedy",
        dynamicTyping: false,
    });

    if (result.errors.length !== 0) {
        console.log("<! == [ E R R O R ] == !>");
        console.log(result.errors);

        exit(1);
    } else {
        console.log("<! == [ R E S U L T ] == !>");

        return result.data;
    }
}

async function loadAndParse<T extends RawContentType>(
    filename: string,
): Promise<T[]> {
    const file = fs.readFileSync(filename, "utf8");

    const result = parse<T>(file);

    return result;
}

async function normaliseForDb<T extends RawContentType>(
    items: T[],
): Promise<RefinedContent<T>[]> {
    const mapping = getMapping(items);

    const normalised = items.map(mapping);

    const awaited = await Promise.all(normalised);

    return awaited;
}

async function main(filename: string) {
    const t = await loadAndParse<RawImages>(filename);

    const normalised = await normaliseForDb(t);

    const normalisedForSubtable = normalised.map((value) => {
        const docType = DocumentCategory.IMAGE;
        const id = value.id;

        return {
            id: id,
            type: docType,
            imageId: id,
        }
    });

    const correctPrisma = prismasMapping<RefinedContent<RawImages>>(normalised[0]);

    const created = await correctPrisma.createMany({
        data: normalised,
        skipDuplicates: true,
    });

    const createdSubtable = await client.documentData.createMany({
        data: normalisedForSubtable,
        skipDuplicates: true,
    });
}

main("./images_.csv").then().catch().finally();

// const loadPlaces = async () => {
// 
//     const result = await client.documentData.findUnique({
//         where: {
//             id: "M-1538-MN-0370"
//         },
//         include: {
//             manuscript: true,
//         }
//     })
// 
//     console.log({ ...result } || "No result")
// }
// 
// loadPlaces().then().catch().finally();