import { exit } from "process";
// import { client } from "../db";
import type { Manuscript, Image, Print, Event, Place } from "../db";
import Papa, { ParseResult } from "papaparse";
import * as fs from "fs";
import { parse } from 'csv-parse/sync';

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
//     provider: 'yandex',
//     // apiKey: "a@net.it",
// }
// 
// const client = node_geocoder(options);

const geocode: (place: string) => Promise<any[]> = async (place) => {
    // remove non-alphanumeric characters
    place = place.replace(/[^a-zA-Z0-9 ]/g, "")
    return await client.search({ q: place })
}

const file = fs.readFileSync('./place.csv', 'utf8')

let PLACES = new Array<Place>();

const _places = ["Naples"]

// iterate through lines
for (const line of _places) {
    geocode(line).then((data) => {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const place: Place = {
            id: '',
            name: line.replace("\r", ""),
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        }

        PLACES.push(place)

        console.log(PLACES)

        console.log(place)

        // sleep for 1 second
        setTimeout(() => { }, 2000)

        fs.writeFileSync('./places.json', JSON.stringify(PLACES, null, 2))

    }).catch((err) => {
        console.log(err)
    })
}



// write places to places.json


