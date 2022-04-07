import { ChakraProvider } from '@chakra-ui/react'
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
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default App
