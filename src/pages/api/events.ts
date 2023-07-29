import { client } from "../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { loadAllEvents } from "../../db/queries";
import { Event, Place } from "@prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{
		status: String;
		events: (Event & {
			place: Place;
		})[];
	}>,
) {
	const { method } = req;

	if (method !== "GET") {
		return res.status(405).json({ status: "Method not allowed", events: [] });
	}

	const events = await loadAllEvents();

	return res.status(200).json({ status: "Valid", events });
}
