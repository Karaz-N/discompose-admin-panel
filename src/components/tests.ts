import { client } from "../db";
import type { Manuscript, Event } from "../db";

interface FullUser {
	name: string;
	age: number;
	subscription: string;
	password: string;
}

interface SafeUser {
	name: string;
	age: number;
	subscription: string;
}

type SenderAndReceiver = Pick<Manuscript, "author" | "recipient">;
type IDLessManuscipt = Omit<Manuscript, "id">;
type CataldoManuscript = Manuscript & { cataldo: boolean; event: Event };

const fetchData: () => Promise<CataldoManuscript[]> = async () => {
	return [
		{
			id: "123",
			author: "Geronimo",
			writtenAt: "soreta",
			receivedAt: "soreta",
			placeId: "Napoli",
			toPlaceId: null,
			recipient: null,
			language: null,
			cataldo: true,
			event: {
				id: "string",
				year: null,
				type: null,
				placeId: "string",
			},
		},
	];
};

interface ManuscriptField {
	author: string | null;
	writtenAt: string | null;
	language: string | null;
	event: Event;
}

const _fetch: () => Promise<void> = async () => {
	const manuscripts = await fetchData();

	let fields = new Array<ManuscriptField>();

	let collectedEvents = new Array<Event>();

	for (const manuscript of manuscripts) {
		const { author, writtenAt, language, event, ..._ } = manuscript;

		collectedEvents.push(event);

		fields.push({ author, writtenAt, language, event });
	}

	const createdEvents = await client.event.createMany({
		data: collectedEvents,
	});

	const createdManuscript = await client.manuscript.createMany({
		data: fields,
	});
};

// console.log(_fetch());

interface ParsedEvent {
	year: number;
	place: string;
	category: "Earthquake" | "Flood" | "Hurricane" | "Eruption";
}

const id = "1456 Central and Southern Italy Earthquake";

const [first, ...rest] = id.split(" ");
const last = rest.pop();
const territory = rest.join(" ");

const parsed: ParsedEvent = {
	year: parseInt(first),
	place: territory,
	category: last as "Earthquake" | "Flood" | "Hurricane" | "Eruption",
};

function parseEvent(id: string): ParsedEvent {
	const [first, ...rest] = id.split(" ");
	const last = rest.pop();
	const territory = rest.join(" ");

	return {
		year: parseInt(first),
		place: territory,
		category: last as "Earthquake" | "Flood" | "Hurricane" | "Eruption",
	};
}

console.log(parsed);
