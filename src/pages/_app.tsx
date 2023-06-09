import Layout from "../components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";

const mon = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={mon.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
