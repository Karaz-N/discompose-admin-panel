"use server";

import { PrismaClient } from "@prisma/client";
import {
	DocumentCategory,
	Place,
	Event,
	Image,
	Manuscript,
	Print,
	EventType,
} from "@prisma/client";

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

export { DocumentCategory, EventType };
export type { Place, Event, Image, Manuscript, Print };
