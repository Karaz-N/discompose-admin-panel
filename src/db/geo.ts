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

/**
 * Get the ISO 3166-1 alpha-2 country code from coordinates
 *
 * @param lat The latitude
 * @param lon The longitude
 * @returns A promise that resolves to the ISO 3166-1 alpha-2 country code
 */
export const isoFromCoordinates: (
	lat: number,
	lon: number,
) => Promise<string | null> = async (lat, lon) => {
	try {
		const result = await geocodeClient.reverse({
			lat,
			lon,
			// addressdetails: true,
		});

		// sleep per 0.5 seconds to avoid rate limiting
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const address = result.address;

		return address.country_code;
	} catch (e) {
		return null;
	}
};
