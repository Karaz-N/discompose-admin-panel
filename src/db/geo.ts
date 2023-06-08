import pkg from "nominatim-client";
const { createClient } = pkg;

/**
 * Nominating client for geocoding
 *
 * `[⚠️]` This is a temporary solution, as the Nominatim API is not meant to be used
 * in production. We should switch to a more robust solution, such as
 * Mapbox or Google Maps.
 */
const geocodeClient = createClient({
	useragent: "Discompose",
	referer: "https://example.com",
});

/**
 * Geocode a place
 *
 * @param place A place name
 * @returns A promise that resolves to a list of search results
 */
export const geocode: (place: string) => Promise<pkg.SearchResultItem[]> =
	async (place) => {
		// remove non-alphanumeric characters
		// place = place.replace(/[^a-zA-Z0-9 ]/g, "")
		return await geocodeClient.search({ q: place });
	};
