import { Box, Button, Center, Container, Flex, Heading, Icon, LinkBox, LinkOverlay, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { IconType } from 'react-icons';
import { FiActivity, FiArrowRight, FiBriefcase, FiHome, FiUsers } from 'react-icons/fi';
import { CtaBanner } from '../components/cta-banner';
import { PageHero } from '../components/page-hero';
import { SectionHeading } from '../components/section-heading';
import { CommonSEO } from '../components/seo';
import { siteMetadata } from '../data/site-metadata';
import { PageMeta } from '../types/page-meta';
import { URL } from '../types/url';


type Pagedata = PageMeta & { backgroundURL: URL, heroImg: URL }

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
  query {
    pagedata(where: { slug: "start"}) {
      title
      description
      backgroundURL {
        url
      }
      heroImg {
        url
      }
    }
  }
`;

  const data = await request<{ pagedata: Pagedata }>(process.env.graphql as string, query);

  if (!data.pagedata) {
    return {
      notFound: true
    }
  }
  return {
    props: data
  };
};

const HIGHLIGHTS: { title: string; description: string; href: string; icon: IconType }[] = [
  { title: 'Leistungen', description: 'Unser Behandlungsspektrum im Überblick.', href: '/leistungen', icon: FiActivity },
  { title: 'Team', description: 'Lernen Sie unsere Therapeutinnen und Therapeuten kennen.', href: '/team', icon: FiUsers },
  { title: 'Praxis', description: 'Einblicke in unsere barrierefreien Räumlichkeiten.', href: '/praxis', icon: FiHome },
  { title: 'Gesundheitsmanagement', description: 'Vorträge und Kurse für Unternehmen.', href: '/bgm', icon: FiBriefcase },
];

// "Ihre Gesundheit - Unsere Motivation. Erkrankungen ..." -> use the short first sentence as headline
const splitLead = (text: string, fallback: string) => {
  const [lead, ...rest] = text.split(/(?<=\.)\s+/);
  return lead.length <= 60 && rest.length
    ? { headline: lead.replace(/\.$/, '').replace(' - ', ' – '), body: rest.join(' ') }
    : { headline: fallback, body: text };
};

const Home: NextPage = ({ pagedata: { title, description, backgroundURL: { url }, heroImg: { url: heroImgURL } } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { headline, body } = splitLead(description, title);

  return (
    <Box>
      <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
      <PageHero
        size='lg'
        eyebrow='Physiotherapie in Lappersdorf'
        title='Herzlich Willkommen'
        highlight='beim Physioteam in Lappersdorf'
        backgroundURL={url}>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} pt={2}>
          <Button
            as={NextLink}
            href='/leistungen'
            size='lg'
            bg='white'
            color='brand.500'
            rightIcon={<FiArrowRight />}
            _hover={{ bg: 'brand.50' }}>
            Unsere Leistungen
          </Button>
          <Button
            as={NextLink}
            href='/kontakt'
            size='lg'
            variant='outline'
            color='white'
            borderColor='whiteAlpha.600'
            _hover={{ bg: 'whiteAlpha.200' }}>
            Kontakt aufnehmen
          </Button>
        </Stack>
      </PageHero>

      <Container maxW='7xl' px={{ base: 4, md: 6 }} pt={{ base: 16, md: 28 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 12, lg: 20 }} alignItems='center'>
          <Box>
            <SectionHeading eyebrow='Über uns' title={headline} />
            <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.8} color='gray.600'>
              {body}
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} mt={8}>
              <Button as={NextLink} href='/aktuelles' size='lg'>
                Aktuelles
              </Button>
              <Button as={NextLink} href='/team' size='lg' variant='ghost' rightIcon={<FiArrowRight />}>
                Unser Team
              </Button>
            </Stack>
          </Box>
          <Box position='relative' pr={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
            <Box position='absolute' right={0} bottom={0} top={{ base: 8, md: 12 }} left={{ base: 8, md: 12 }} rounded='3xl' bg='brand.50' />
            <Box position='relative' overflow='hidden' rounded='3xl' boxShadow='0 30px 60px -30px rgba(47, 12, 12, 0.45)' sx={{ aspectRatio: '3 / 2' }}>
              <NextImage src={heroImgURL} alt='Das Team vom Physioteam Lappersdorf' fill sizes='(max-width: 992px) 100vw, 600px' style={{ objectFit: 'cover' }} />
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      <Container maxW='7xl' px={{ base: 4, md: 6 }} pt={{ base: 16, md: 28 }}>
        <SectionHeading eyebrow='Entdecken' title='Alles rund um Ihre Behandlung' />
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
          {HIGHLIGHTS.map((item) => (
            <LinkBox
              key={item.href}
              role='group'
              p={{ base: 6, md: 7 }}
              rounded='2xl'
              bg='gray.50'
              border='1px solid'
              borderColor='gray.100'
              transition='all 0.25s ease'
              _hover={{ bg: 'white', borderColor: 'brand.100', boxShadow: '0 20px 40px -24px rgba(134, 37, 37, 0.4)', transform: 'translateY(-2px)' }}>
              <Center w={12} h={12} mb={6} rounded='xl' bg='white' color='brand.500' boxShadow='sm' transition='all 0.25s ease' _groupHover={{ bg: 'brand.500', color: 'white' }}>
                <Icon as={item.icon} boxSize={5} />
              </Center>
              <Heading as='h3' fontSize='lg' fontWeight={700} mb={2}>
                <LinkOverlay as={NextLink} href={item.href}>{item.title}</LinkOverlay>
              </Heading>
              <Text color='gray.600' mb={5}>{item.description}</Text>
              <Flex align='center' gap={2} color='brand.500' fontWeight={600} fontSize='sm'>
                Mehr erfahren
                <Icon as={FiArrowRight} transition='transform 0.2s ease' _groupHover={{ transform: 'translateX(4px)' }} />
              </Flex>
            </LinkBox>
          ))}
        </SimpleGrid>
      </Container>

      <CtaBanner />
    </Box>
  )
}

export default Home
