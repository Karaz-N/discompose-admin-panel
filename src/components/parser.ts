import { exit } from "process";
import { client as prisma } from "../db";
import type { Manuscript, Image, Print, Event, Place, Document, EventType } from "../db";
import { DocumentType } from "../db";
import Papa, { ParseResult } from "papaparse";
import * as fs from "fs";

interface RawManuscript {
    "Record": string;
    "Event": string;
    "Archive": string;
    "Author/sender": string;
    "Recipient": string;
    "Date of writing": string;
    "Start point": string;
    "Date of receipt": string;
    "End point": string;
    "Summary": string;
    "Language": string;
    "Related images or documents": string;
    "Other Events": string;
    "Link": string;
    "Analytic tags": string;
    "Private notes": string;
}

interface RawImages {
    "Record": string;
    "Event": string;
    "Artist": string;
    "Description": string;
    "Date": string;
    "Museum/Institution": string;
    "Medium and support": string;
    "Dimensions": string;
    "Related images or documents": string;
    "Author": string;
    "Recipient/dedicatee": string;
    "Title": string;
    "Printer": string;
    "Place": string;
    "Reference copy-ies": string;
    "Inscriptions": string;
    "Link": string;
    "Analytic tags": string;
    "Private notes": string;
}

interface RawPrinted {
    "Record": string;
    "Event": string;
    "Author": string;
    "Recipient/dedicatee information": string;
    "Recipient/dedicatee": string;
    "Title": string;
    "Printer": string;
    "Printer information": string;
    "Place": string;
    "Summary": string;
    "Other places quoted by the printer": string;
    "Year": string;
    "Language": string;
    "Form (prose/verses/mixed)": string;
    "Identifier in USTC": string;
    "Reference copy-ies": string;
    "Digitised copy link": string;
    "Related images and documents": string;
    "Additional notes": string;
    "Analaytic tags": string;
    "Private notes": string;
}


import pkg from "nominatim-client";
const { createClient } = pkg;

const client = createClient({
    useragent: "HELLO",
    referer: "https://example.com"
})

/*
 * 1 - User loads a csv containing `manuscripts`, `images` or `prints`
 * 2 - Such .csv file is parsed into its primitive database type and `document` type
 * 3 - From the parsing, we extrapolate the `event` fields
 * 4 - If a place is present, retrieve all places from db
 * 4.1 - Otherwise, reverse look up the place coordinates and create a new entry
 * 
 * Resolution Order:
 * # 0 Place
 * # 1 Event
 * # 2 Document
 * # 3 DocumentType (manuscript, image or print)
 */

function todo<T>(): T {
    throw "PLEASE IMPLEMENT ME"
}

async function atodo<T>(): Promise<T> {
    throw "PLEASE IMPLEMENT ME"
}

type Never = never;
type RawContentType = RawImages | RawManuscript | RawPrinted;
type RefinedContent<T extends RawContentType> = T extends RawImages ? Image : T extends RawManuscript ? Manuscript : T extends RawPrinted ? Print : Never;
type Mapping<T extends RawContentType> = (value: T) => Promise<[RefinedContent<T>, T]>

type OnlyImages = Omit<RawImages, keyof RawManuscript | keyof RawPrinted>
type OnlyManuscript = Omit<RawManuscript, keyof RawImages | keyof RawPrinted>
type OnlyPrinted = Omit<RawPrinted, keyof RawImages | keyof RawManuscript>

type EventTypes = "EARTHQUAKE" | "FLOOD" | "HURRICANE" | "ERUPTION"

interface ParsedEvent {
    year: number,
    place: string,
    category: EventTypes
}

function parseEvent(id: string): ParsedEvent {
    const [first, ...rest] = id.split(" ")
    const last = rest.pop()
    const territory = rest.join(" ")

    if (last === undefined) {
        throw "Invalid event"
    }

    return {
        year: parseInt(first),
        place: territory,
        category: last.toUpperCase() as EventTypes
    }
}

const geocode: (place: string) => Promise<any[]> = async (place) => {
    // remove non-alphanumeric characters
    // place = place.replace(/[^a-zA-Z0-9 ]/g, "")
    return await client.search({ q: place })
}

async function addPlace(place: string) {
    // check if place exists in db
    const exists = await prisma.place.findUnique({
        where: {
            name: place
        }
    })

    if (exists === null) {
        const data = await geocode(place)

        try {
            const lat = data[0].lat;
            const lon = data[0].lon;

            const placeObj = {
                name: place,
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
            }

            await prisma.place.create(
                {
                    data: placeObj
                }
            )
        } catch (e: unknown) {
            console.log(`${place} could not be geocoded`)
        }
    }
}

function isSameEvent(p1: ParsedEvent, p2: ParsedEvent): boolean {
    return p1.year === p2.year && p1.place === p2.place && p1.category === p2.category
}

const isManuscript = (value: RawContentType): value is RawManuscript => {
    return 'Archive' in value
}

const isImage = (value: RawContentType): value is RawImages => {
    return "Museum/Institution" in value
}

const isPrint = (value: RawContentType): value is RawPrinted => {
    return "Identifier in USTC" in value
}

const manuscriptMapping: Mapping<RawManuscript> = async (value: RawManuscript): Promise<[Manuscript, RawManuscript]> => {

    const fromPlace = await prisma.place.findUnique({
        where: {
            name: value["Start point"]
        },
    })

    const toPlace = await prisma.place.findUnique({
        where: {
            name: value["End point"]
        },
    })

    return [{
        id: value["Record"],
        author: value["Author/sender"],
        writtenAt: value["Date of writing"],
        receivedAt: value["Date of receipt"],
        placeId: fromPlace?.id ?? null,
        toPlaceId: toPlace?.id ?? null,
        recipient: value["Recipient"],
        language: value["Language"],
    }, value]
}

const imageMapping: Mapping<RawImages> = async (value: RawImages): Promise<[RefinedContent<RawImages>, RawImages]> => {
    const place = await prisma.place.findUnique({
        where: {
            name: value["Place"]
        },
    })

    return [{
        id: value["Record"],
        artist: value["Artist"],
        author: value["Author"],
        title: value["Title"],
        museum: value["Museum/Institution"],
        content: value["Description"],
        date: value["Date"],
        placeId: place?.id ?? null,
    }, value]
}

const printMapping: Mapping<RawPrinted> = async (value: RawPrinted): Promise<[Print, RawPrinted]> => {
    let places = [value["Other places quoted by the printer"]]

    const place = await prisma.place.findUnique({
        where: {
            name: value["Place"]
        },
    })

    // remove null from places
    places = places.filter(function (el) {
        return el != null;
    });

    return [{
        id: value["Record"],
        otherPlaces: places,
        language: value["Language"],
        title: value["Title"],
        year: value["Year"],
        notes: value["Additional notes"],
        USTC: value["Identifier in USTC"],
        writer: value["Author"],
        information: value["Summary"],
        dedicatee: value["Recipient/dedicatee"],
        placeId: place?.id ?? null,
    }, value]
}

const getMapping = <T extends RawContentType>(els: T[]): Mapping<T> => {
    const first = els[0]

    if (isManuscript(first)) {
        return manuscriptMapping as unknown as Mapping<T>
    } else if (isImage(first)) {
        return imageMapping as unknown as Mapping<T>
    } else if (isPrint(first)) {
        return printMapping as unknown as Mapping<T>
    } else {
        throw "Unknown type"
    }
}

async function parse<T extends RawContentType>(contents: string): Promise<T[]> {
    const result = Papa.parse<T>(contents, {
        header: true,
        delimiter: ";",
        skipEmptyLines: "greedy",
        dynamicTyping: false,
    })

    console.log("!! | REMOVE DUPLICATES | !!")

    // remove duplicates
    const events = result.data.map((value) => parseEvent(value["Event"]))

    console.log("!! | FIND UNIQUE EVENTS | !!")

    const uniqueEvents = events.filter((value, index, self) => {
        return index === self.findIndex((t) => (
            isSameEvent(t, value)
        ))
    })

    console.log("!! | GET PLACE NAMES | !!")

    const places = uniqueEvents.map((value) => value.place)

    console.log("!! | LOAD PLACES TO DB | !!")

    // add places to db
    for (const place of places) {
        await addPlace(place)
    }

    console.log("!! | MAKE UNGODLY ABOMINATION | !!")


    const dbEvents = uniqueEvents.map((value) => {
        return {
            year: value.year,
            place: {
                connect: {
                    name: value.place
                }
            },
            type: value.category
        }
    })

    console.log("!! | ADD EVENTS TO DB | !!")

    let erCount = 0;

    // add events to db
    for (const event of dbEvents) {
        try {

            await prisma.event.create({
                data: event
            });
            // console.log("Managed to add event")
        } catch (e: unknown) {
            erCount++;
            // console.log(e)
            // console.log("Failed to add event")
        }
    }

    console.log(`Encountered ${erCount} errors while adding events to db`)

    if (result.errors.length !== 0) {
        console.log("<! == [ E R R O R ] == !>")
        console.log(result.errors)

        exit(1)
    } else {
        console.log("<! == [ R E S U L T ] == !>")

        return result.data
    }
    // return todo()
}

async function loadAndParse<T extends RawContentType>(filename: string): Promise<T[]> {
    const file = fs.readFileSync(filename, 'utf8')

    const result = parse<T>(file)

    return result
}

async function normaliseForDb<T extends RawContentType>(items: T[]): Promise<[RefinedContent<T>, T][]> {
    const mapping = getMapping(items)

    const normalised = items.map(mapping)

    const awaited = await Promise.all(normalised)

    return awaited
}

async function main() {
    const t = await loadAndParse<RawImages>("images_.csv")
    // 
    // // console.log(t)
    // 
    const normalised = await normaliseForDb(t)
    //

    for (const [transformed, raw] of normalised) {
        const inserted = await prisma.image.upsert({
            where: {
                id: transformed.id
            },
            create: transformed,
            update: transformed
        })

        const event = parseEvent(raw["Event"])

        const place = await prisma.place.findUnique({
            where: {
                name: event.place
            },
        })

        if (place === null) {
            console.log(`>>> Failed to find place ${event.place}`)
            continue
        }

        const eventId = await prisma.event.findUnique({
            where: {
                year_type_placeId: {
                    year: event.year,
                    placeId: place.id,
                    type: event.category
                }
            }
        })

        const document: Document = {
            record: raw["Record"],
            imageId: inserted.id,
            type: DocumentType.Image,
            summary: null,
            author: raw["Author"],
            link: raw["Link"],
            eventId: raw["Event"],
            documentRecord: null,
            archive: null,
            manuscriptId: null,
            printId: null,
            manuscriptEvent: null,
        }

        try {
            await prisma.document.create({
                data: document
            })

            console.log(
                `>>> Managed to add document for image ${inserted.id} with record ${document.record}`
            )
        } catch (e) {
            console.log(
                `>>> Failed to add document for image ${inserted.id} with record ${document.record}`
            )
        }
    }



    // const results = await prisma.image.createMany({
    //     data: normalised
    // })

    // const bug = await prisma.event.findMany({
    //     where: {
    //         place: {
    //             name: "Earthquake"
    //         }
    //     }
    // })

    //console.log(bug)
    // const _ = await prisma.manuscript.create(
    //     {
    //         data: normalised[0]
    //     }
    // )
}

main().then().catch().finally()