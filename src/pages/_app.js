import Layout from '@/components/layout';
import '@/styles/globals.css'

import { Lato } from 'next/font/google';

const lato = Lato({subsets: ['latin'], weight: ['400', '700'],});

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}