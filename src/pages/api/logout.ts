import { client } from "../../db";
import { User, Session } from "@prisma/client";
import { JwtPayload, verify } from "jsonwebtoken";
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ status: String }>,
) {
	const { method } = req;

	if (method !== "POST") {
		return res.status(405).json({ status: "Method not allowed" });
	}

	const { token }: { token?: string } = req.body;

	if (!token) {
		return res.status(422).json({ status: "Unauthorized access!" });
	}

	const secret = process.env.JWT_SECRET || "SECRET NOT FOUND PLEASE UPDATE";

	const verified = verify(token, secret, {
		algorithms: ["RS256"],
	});

	const { sessionId } = verified as JwtPayload & { sessionId: string };

	const session = await client.session.update({
		where: {
			id: sessionId,
		},
		data: {
			duration: 0,
		},
	});

	setCookie("_session", "", {
		httpOnly: true,
		maxAge: 0,
	});

	return res.status(200).json({ status: "Succesfully logged out" });
}
