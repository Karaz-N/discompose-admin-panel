"use server";

import { client } from ".";
import type { Place } from ".";

const addPlace = async (name: string, lat: number | undefined, long: number | undefined) => {
    await client.place.create({
        data: {
            name: name,
            latitude: lat,
            longitude: long,
        },
    });
};
