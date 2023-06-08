"use server";

import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "query",
		},
		{
			emit: "stdout",
			level: "info",
		},
		{
			emit: "stdout",
			level: "warn",
		},
		{
			emit: "stdout",
			level: "error",
		},
	],
});

export type Prisma = typeof client;
