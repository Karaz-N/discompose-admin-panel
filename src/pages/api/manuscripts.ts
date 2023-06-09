import { uploadManuscripts } from "../../db/parser";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

// Because NextJS is a modern framework and no weird stuff is going on!
export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ status: String }>,
) {
	const { method } = req;

	// Only allow POST requests
	if (method !== "POST") {
		return res.status(405).json({ status: "Method not allowed" });
	}

	// Form builder
	const form = new formidable.IncomingForm();

	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(500).json({ status: "Could not parse file." });
		}

		try {
			const file = files.file as formidable.File;

			await uploadManuscripts(file.filepath);

			return res.status(200).json({ status: "Files uploaded succesfully" });
		} catch (e) {
			return res.status(422).json({ status: "Could not parse file." });
		}
	});
}
