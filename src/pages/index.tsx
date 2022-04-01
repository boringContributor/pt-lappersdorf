import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  Box, Heading, Text, Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { PageHeader } from '../components/page-header'

const Home: NextPage = () => {
  const { pathname = '', asPath } = useRouter();

  return (
    <>
      <Head>
        <title>{asPath} Physioteam Lappersdorf</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo_ico.png" />
      </Head>

      <main>
        <PageHeader title="test" backgroundURL="https://ucarecdn.com/121bb7ec-5e05-4e31-82f5-07293a92831a/-/progressive/yes/-/format/auto/-/resize/2000x/" />

        <Box py={10} px={6}>
          <Alert status='info'>
            <AlertIcon />
            <Box flex='1'>
              <AlertTitle>Wichtig!</AlertTitle>
              <AlertDescription display='block'>
                Die bayrische Staatsregierung hat beschlossen, dass für Patienten und Patientinnen von Physiotherapiepraxen das Tragen einer medizinischen Maske zur Pflicht zu machen. Bitte kommen Sie deshalb bei einem Praxisbesuchs mit einer medizinischen Maske oder FFP2 Maske. Besten Dank!
              </AlertDescription>
            </Box>
          </Alert>
          <Heading
            mt={8}
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear-gradient(90deg, rgba(79,76,136,1) 0%, rgba(134,37,37,1) 47%, rgba(79,76,136,1) 100%)"
            backgroundClip="text">
            Herzlich willkommen!
          </Heading>
          <Text fontSize="18px" mt={3} mb={2} as='p' textAlign='justify'>
            Ihre Gesundheit - Unsere Motivation. Erkrankungen, Unfälle oder einseitige Belastungen führen oft zu erheblichen Einschränkungen der Lebensqualität. Mit einem breiten Behandlungsspektrum von kassenzugelassenen Therapien und auch privaten Leistungen, begleitet Sie unser hoch qualifiziertes und motiviertes Team gerne auf Ihrem Weg zur Gesundheit. Viele Informationen über uns und unsere Angebote finden Sie hier auf unserer Website. Kontaktieren Sie uns und vereinbaren Ihren persönlichen Termin.
          </Text>
        </Box>
      </main>

    </>
  )
}

export default Home