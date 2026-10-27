import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/next';
import type { AppProps } from 'next/app'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Head from 'next/head'
import '../../styles/globals.css'
import { Layout } from '../components/layout'
import { theme } from '../theme'

const headingFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'] })
const bodyFont = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="description" content="Physioteam Lappersdorf" />
        <link rel="icon" href="/logo_ico.png" />
      </Head>
      <style jsx global>{`
        :root {
          --font-heading: ${headingFont.style.fontFamily};
          --font-body: ${bodyFont.style.fontFamily};
        }
      `}</style>
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
