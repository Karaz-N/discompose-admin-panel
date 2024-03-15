import { client } from ".";
import { Place } from "@prisma/client";
import { promises as fs } from 'fs';

/**
 * Load all places from the database.
 */
export const dumpPlaces = async () => {
    const places = await client.place.findMany({});
    // console.log(places);


    //write to ./places.json

    const json = JSON.stringify(places, null, 2);
    console.log(json);
}

// await dumpPlaces()

export const uploadPlaces = async () => {
    const places = await fs.readFile('src/db/backup/places.json', 'utf-8');
    const parsedPlaces = JSON.parse(places) as Place[];

    await client.place.createMany({
        data: parsedPlaces
    })
}

// await uploadPlaces()

export const dumpManuscripts = async () => {
    console.log(await client.manuscript.count({}))

    const manuscripts = await client.manuscript.findMany({});
    // console.log(places);


    //write to ./places.json

    const json = JSON.stringify(manuscripts, null, 2);
    console.log(json);
}

// await dumpManuscripts()

export const uploadManuscripts = async () => {
    const manuscripts = await fs.readFile('src/db/backup/manuscripts.json', 'utf-8');
    const parsedManuscripts = JSON.parse(manuscripts);

    await client.manuscript.createMany({
        data: parsedManuscripts
    })
}

// await uploadManuscripts()

export const dumpImages = async () => {
    const images = await client.image.findMany({});
    // console.log(places);


    //write to ./places.json

    const json = JSON.stringify(images, null, 2);
    console.log(json);
}

// await dumpImages()

export const uploadImages = async () => {
    const images = await fs.readFile('src/db/backup/images.json', 'utf-8');
    const parsedImages = JSON.parse(images);

    await client.image.createMany({
        data: parsedImages
    })
}

// await uploadImages()

export const dumpPrints = async () => {
    const prints = await client.print.findMany({});
    // console.log(places);


    //write to ./places.json

    const json = JSON.stringify(prints, null, 2);
    console.log(json);
}

// await dumpPrints()

export const uploadPrints = async () => {
    const prints = await fs.readFile('src/db/backup/prints.json', 'utf-8');
    const parsedPrints = JSON.parse(prints);

    await client.print.createMany({
        data: parsedPrints
    })
}

// await uploadPrints()


export const dumpEvents = async () => {
    const events = await client.event.findMany({});
    // console.log(places);

    const json = JSON.stringify(events, null, 2);
    console.log(json);
}

// await dumpEvents()

export const uploadEvents = async () => {
    const events = await fs.readFile('src/db/backup/events.json', 'utf-8');
    const parsedEvents = JSON.parse(events);

    await client.event.createMany({
        data: parsedEvents
    })
}

// await uploadEvents()

export const dumpDocumentdata = async () => {
    const documentData = await client.documentData.findMany({});
    // console.log(places);

    const json = JSON.stringify(documentData, null, 2);
    console.log(json);
}

// await dumpDocumentdata()

export const uploadDocumentdata = async () => {
    const documentData = await fs.readFile('src/db/backup/data.json', 'utf-8');
    const parsedDocumentData = JSON.parse(documentData);

    await client.documentData.createMany({
        data: parsedDocumentData
    })
}

// await uploadDocumentdata()