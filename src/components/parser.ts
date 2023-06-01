import { exit } from "process";
import { client } from "../db";
import type { Manuscript, Image, Print, Event } from "../db";
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

const parseData: () => Promise<Manuscript[]> = async () => {

    let data = new Array<Manuscript>();

    function preview_csv(e: any) {
        // if (!e.target.files.length) {
        //     alert("Please choose a csv file ... ")
        //     return
        // }

        // const file = e.target.files[0] as File;

        // read local `manuscripts.csv` file

        const file = fs.readFileSync('./manuscripts3.csv', 'utf8')

        let index = 2;

        Papa.parse<RawManuscript>(file, {
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



                    data.push({
                        id: results.data["Record"],
                        author: results.data["Author / sender"],
                        writtenAt: results.data["Date of writing"],
                        receivedAt: results.data["Date of receipt"],
                        placeId: results.data["Start point"],
                        toPlaceId: results.data["End point"],
                        recipient: results.data["Recipient"],
                        language: results.data["Language"],
                    })
                }
            }
        });

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

parseData().then((data) => {
    fs.writeFileSync('./manuscripts.json', JSON.stringify(data, null, 2))
}).catch((err) => {
    // console.log(err)
});

