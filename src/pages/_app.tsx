import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/next';
import type { AppProps } from 'next/app'
import Head from 'next/head'
// self-hosted fonts: next/font/google fetches from Google at build time, which breaks Turbopack builds on some networks
import '@fontsource-variable/inter'
import '@fontsource-variable/plus-jakarta-sans'
import '../../styles/globals.css'
import { Layout } from '../components/layout'
import { theme } from '../theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="description" content="Physioteam Lappersdorf" />
        <link rel="icon" href="/logo_ico.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <Analytics mode="production" />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default App
