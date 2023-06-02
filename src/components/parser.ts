import { exit } from "process";
import { client as prisma } from "../db";
import type { Manuscript, Image, Print, Event, Place } from "../db";
import { DocumentType } from "../db";
import Papa, { ParseResult } from "papaparse";
import * as fs from "fs";

interface RawManuscript {
    "Record": string;
    "Event": string;
    "Archive": string;
    "Author / sender": string;
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

const parseData: () => Promise<Print[]> = async () => {

    let data = new Array<Print>();

    function preview_csv(e: any) {
        // if (!e.target.files.length) {
        //     alert("Please choose a csv file ... ")
        //     return
        // }

        // const file = e.target.files[0] as File;

        // read local `manuscripts.csv` file

        const file = fs.readFileSync('./printed_.csv', 'utf8')

        let index = 2;

        Papa.parse<RawPrinted>(file, {
            header: true,
            delimiter: ";",
            skipEmptyLines: true,
            dynamicTyping: false,
            step: function (results, parser) {
                if (results.errors.length !== 0) {
                    console.log("<! == [ E R R O R ] == !>")
                    console.log(results.errors)

                    console.log("LAST SUCCESSFULL LINE: " + index)

                    exit(1)
                }

                if (results) {
                    console.log("<! == [ R E S U L T ] == !>")
                    // console.log(results.data)

                    index++;



                    // data.push({
                    //     id: results.data["Record"],
                    //     author: results.data["Author / sender"],
                    //     writtenAt: results.data["Date of writing"],
                    //     receivedAt: results.data["Date of receipt"],
                    //     placeId: results.data["Start point"],
                    //     toPlaceId: results.data["End point"],
                    //     recipient: results.data["Recipient"],
                    //     language: results.data["Language"],
                    // })

                    // data.push({
                    //     id: results.data["Record"],
                    //     artist: results.data["Artist"],
                    //     author: results.data["Author"],
                    //     title: results.data["Title"],
                    //     museum: results.data["Museum/Institution"],
                    //     content: results.data["Description"],
                    //     date: results.data["Date"],
                    //     placeId: results.data["Place"],
                    // })

                    let places = [results.data["Other places quoted by the printer"]]

                    // remove null from places
                    places = places.filter(function (el) {
                        return el != null;
                    });

                    data.push({
                        id: results.data["Record"],
                        otherPlaces: places,
                        language: results.data["Language"],
                        title: results.data["Title"],
                        year: results.data["Year"],
                        notes: results.data["Additional notes"],
                        USTC: results.data["Identifier in USTC"],
                        writer: results.data["Author"],
                        information: results.data["Summary"],
                        dedicatee: results.data["Recipient/dedicatee"],
                        placeId: results.data["Place"],
                    })
                }
            }
        })

        // Papa.parse(file, {
        //     header: true,
        //     complete: function (results: ParseResult<Record<Manuscript, unknown>>[], undefined) {
        //         if (results && results.length > 0) {
        //             console.log(typeof (results))
        //             console.log(results)
        //         }
        //     }
        // });
    }

    preview_csv("cataldo")

    return (data)
}

// parseData().then((data) => {
//     fs.writeFileSync('./manuscripts.json', JSON.stringify(data, null, 2))
// }).catch((err) => {
//     // console.log(err)
// });

import pkg from "nominatim-client";
const { createClient } = pkg;

const client = createClient({
    useragent: "HELLO",
    referer: "https://example.com"
})


// import node_geocoder from "node-geocoder";
// const options: node_geocoder.Options = {
// //     provider: 'yandex',
// //     // apiKey: "a@net.it",
// // }
// // 
// // const _client = node_geocoder(options);
// 
// const geocode: (place: string) => Promise<any[]> = async (place) => {
//     // remove non-alphanumeric characters
//     // place = place.replace(/[^a-zA-Z0-9 ]/g, "")
//     return await client.search({ q: place })
// }
// 
// const file = fs.readFileSync('./place.csv', 'utf8')
// 
// let PLACES = new Array<Place>();
// 
// const _places = [
//     'Bilbao', 'Lecce',
//     'Genoa', 'Rimini',
//     'Zaragoza', 'Cadiz',
//     'Todi'
// ]
// 
// // iterate through lines
// for (const line of _places) {
//     geocode(line).then((data) => {
//         const lat = data[0].lat;
//         const lon = data[0].lon;
// 
//         const place: Place = {
//             id: '',
//             name: line.replace("\r", ""),
//             latitude: parseFloat(lat),
//             longitude: parseFloat(lon),
//         }
// 
//         PLACES.push(place)
// 
//         console.log(PLACES)
// 
//         console.log(place)
// 
//         // sleep for 1 second
//         setTimeout(() => { }, 5000)
// 
//         fs.writeFileSync('./places_strange.json', JSON.stringify(PLACES, null, 2))
// 
//     }).catch((err) => {
//         console.log(err)
//     })
// }


// let loadedPlaces = JSON.parse(fs.readFileSync('./places_strange.json', 'utf8'))
// // exclude the `id` field
// loadedPlaces = loadedPlaces.map(({ id, ...keepAttrs }) => keepAttrs)
// 
// // Only keep the first instance of each `name`
// loadedPlaces = loadedPlaces.filter((place, index, self) =>
//     index === self.findIndex((t) => (
//         t.name === place.name
//     ))
// )
// 
// 
// console.log(loadedPlaces)
// 
// const addProc = async () => {
//     await prisma.place.createMany({
//         data: loadedPlaces
//     })
// }
// 
// addProc().then(() => {
//     console.log("DONE")
// }).catch((err) => {
//     console.log(err)
// })

// 

// const placeNames = async () => {
//     const places = await prisma.place.findMany({
//         select: {
//             name: true
//         }
//     })
// 
//     const names = places.map((place) => place.name)
// 
//     const namesFromCsv = fs.readFileSync('./place.csv', 'utf8').split("\r\n")
// 
//     const diff = namesFromCsv.filter((name) => !names.includes(name))
// 
//     console.log(diff)
// 
//     // fs.writeFileSync('./place_names.json', JSON.stringify(names, null, 2))
// }
// 
// placeNames().then(() => {
//     console.log("DONE")
// }).catch((err) => {
//     console.log(err)
// })

/**
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

type RawContentType = RawImages | RawManuscript | RawPrinted;
type RefinedContent<T extends RawContentType> = T extends RawImages ? Image : T extends RawManuscript ? Manuscript : Print;
type Mapping<T extends RawContentType> = (value: T) => RefinedContent<T>

const isManuscript = (value: RawContentType): value is RawManuscript => {
    return "End point" in value
}

const isImage = (value: RawContentType): value is RawImages => {
    return "Museum/Institution" in value
}

const isPrint = (value: RawContentType): value is RawPrinted => {
    return "Identifier in USTC" in value
}

const manuscriptMapping: Mapping<RawManuscript> = (value: RawManuscript): Manuscript => {
    return {
        id: value["Record"],
        author: value["Author / sender"],
        writtenAt: value["Date of writing"],
        receivedAt: value["Date of receipt"],
        placeId: value["Start point"],
        toPlaceId: value["End point"],
        recipient: value["Recipient"],
        language: value["Language"],
    }
}

const imageMapping: Mapping<RawImages> = (value: RawImages): Image => {
    return {
        id: value["Record"],
        artist: value["Artist"],
        author: value["Author"],
        title: value["Title"],
        museum: value["Museum/Institution"],
        content: value["Description"],
        date: value["Date"],
        placeId: value["Place"],
    }
}

const printMapping: Mapping<RawPrinted> = (value: RawPrinted): Print => {
    let places = [value["Other places quoted by the printer"]]

    // remove null from places
    places = places.filter(function (el) {
        return el != null;
    });

    return {
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
        placeId: value["Place"],
    }
}

const getMapping = <T extends RawContentType>(els: T[]): Mapping<T> => {
    const first = els[0]

    if (isManuscript(first)) {
        return manuscriptMapping as Mapping<T>
    } else if (isImage(first)) {
        return imageMapping as Mapping<T>
    } else if (isPrint(first)) {
        return printMapping as Mapping<T>
    } else {
        throw "Unknown type"
    }
}

async function parse<T extends RawContentType>(contents: string): Promise<T[]> { return todo() }

async function loadAndParse<T extends RawContentType>(filename: string): Promise<T[]> {
    const file = fs.readFileSync(filename, 'utf8')

    const result = parse<T>(file)

    return result
}

async function normaliseForDb<T extends RawContentType>(items: T[]): Promise<RefinedContent<T>[]> {
    const mapping = getMapping(items)

    const normalised = items.map(mapping)

    return normalised
}

async function main() {
    const t = await loadAndParse<RawManuscript>("tiscatuscamadonna.etrusca")

    const normalised = await normaliseForDb(t)
}

main().then().catch().finally()