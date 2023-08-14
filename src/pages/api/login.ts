import { client } from "../../db";
import { User, Session } from "@prisma/client";
import { sign } from "jsonwebtoken";
import * as crypto from "crypto";
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from "next";
import { panic } from "../../utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ status: string; token?: string; }>,
) {
	const { method } = req;

	const body = JSON.parse(req.body)

	if (method !== "POST") {
		return res.status(405).json({ status: "Method not allowed" });
	}

	const { email, password }: { email?: string; password?: string } = body;

	if (!email || !password) {
		return res.status(422).json({ status: "Email and password are required" });
	}

	const secret = process.env.JWT_SECRET || panic("SECRET NOT FOUND PLEASE UPDATE");

	const encrypted = crypto
		.createHmac("sha256", secret)
		.update(password)
		.digest("hex");


	const user = await client.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user) {
		return res.status(422).json({ status: "Invalid credentials" });
	}

	if (user.password !== encrypted) {
		return res.status(422).json({ status: "Password does not match" });
	}

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
		algorithm: "HS256",
	});

	// console.log("TOKEN", jwt)


	res.setHeader('Set-Cookie', jwt)

	return res.status(200).json({ status: "Logged in", token: jwt });
}
