"use server";

import { client } from ".";
import { DocumentType } from ".";

export type Counts = {
    events: number;
    earthquakes: number;
    floods: number;
    hurricanes: number;
    eruptions: number;

    documents: number;
    prints: number;
    manuscripts: number;
    images: number;
}

export const loadAllEvents: () => Promise<Counts> = async () => {
    const events = await client.event.count();

    const earthquakes = await client.event.count({
        where: {
            type: {
                contains: "earthquake",
            },
        }
    });

    const floods = await client.event.count({
        where: {
            type: {
                contains: "flood",
            },
        }
    });

    const hurricanes = await client.event.count({
        where: {
            type: {
                contains: "hurricane",
            },
        }
    });

    const eruptions = await client.event.count({
        where: {
            type: {
                contains: "eruption",
            },
        }
    });

    const documents = await client.document.count();

    const prints = await client.document.count({
        where: {
            type: DocumentType.Print,
        }
    })

    const manuscripts = await client.document.count({
        where: {
            type: DocumentType.Manuscript,
        }
    })

    const images = await client.document.count({
        where: {
            type: DocumentType.Image,
        }
    })

    return {
        events,
        earthquakes,
        floods,
        hurricanes,
        eruptions,
        documents,
        prints,
        manuscripts,
        images,
    }
}