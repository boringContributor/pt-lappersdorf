import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/next';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../../styles/globals.css'
import { Layout } from '../components/layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="description" content="Physioteam Lappersdorf" />
        <link rel="icon" href="/logo_ico.png" />
      </Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics mode="production" />;
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default App
