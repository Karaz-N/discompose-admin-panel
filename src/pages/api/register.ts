import { client } from "../../db";
import { User, Session } from "@prisma/client";
import { sign } from "jsonwebtoken";
import * as crypto from "crypto";
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ status: String; }>,
) {

	const { method } = req;

	if (method !== "POST") {
		return res.status(405).json({ status: "Method not allowed" });
	}

	const {
		email,
		name,
		password,
	}: { email?: string; name?: string; password?: string } = req.body;

	if (!email || !password || !name) {
		return res
			.status(422)
			.json({ status: "Email, username and password are required" });
	}

	const secret = process.env.JWT_SECRET || "SECRET NOT FOUND PLEASE UPDATE";

	const encrypted = crypto
		.createHmac("sha256", secret)
		.update(password)
		.digest("hex");

	const user = await client.user.create({
		data: {
			email,
			name,
			password: encrypted,
		},
	});

	const session = await client.session.create({
		data: {
			user: {
				connect: {
					id: user.id,
				},
			},
		},
	});

	const jwt = sign({ sessionId: session.id }, secret, {
		expiresIn: "24h",
		algorithm: "RS256",
	});

	setCookie("_session", jwt, {
		httpOnly: true,
		maxAge: 24 * 60 * 60,
	});

	return res.status(200).json({ status: "Logged in" });
}
