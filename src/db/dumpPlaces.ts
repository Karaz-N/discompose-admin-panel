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

dumpPlaces()