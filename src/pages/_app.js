import Layout from "../components/layout";
import "../styles/globals.css";

import { Montserrat } from "next/font/google";

const mon = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }) {
	return (
		<main className={mon.className}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</main>
	);
}
