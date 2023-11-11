import { client } from "./src/db";
import * as crypto from "crypto";

const main = async () => {
    const secret = process.env.JWT_SECRET!;

	const encrypted1 = crypto
		.createHmac("sha256", secret)
		.update("DomeCecUnina")
		.digest("hex");

	const user1 = await client.user.create({
		data: {
			email: "dome.cec@gmail.com",
			name: "Domenico",
			password: encrypted1,
		},
	});

    const encrypted2 = crypto
		.createHmac("sha256", secret)
		.update("ManPittUnina")
		.digest("hex");

	const user2 = await client.user.create({
		data: {
			email: "manuela.pittera@unina.it",
			name: "Manuela",
			password: encrypted2,
		},
	});

    const encrypted3 = crypto
		.createHmac("sha256", secret)
		.update("AntMorUnina")
		.digest("hex");

	const user3 = await client.user.create({
		data: {
			email: "antonello.mori@gmail.com",
			name: "Antonello",
			password: encrypted3,
		},
	});
    
}


main().then(() => {
    console.log("done");
}).catch((err) => {
    console.log(err);
})
