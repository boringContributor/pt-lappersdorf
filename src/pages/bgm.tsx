import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { gql, request } from 'graphql-request';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import NextImage from 'next/image';
import { FC, ReactNode, useState } from 'react';
import { FiArrowRight, FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { PageHero } from '../components/page-hero';
import { Prose } from '../components/prose';
import { SectionHeading } from '../components/section-heading';
import { CommonSEO } from '../components/seo';

interface Presentation {
  id: string;
  title: string;
  description: { raw: any; text: string };
}

interface Introduction {
  introduction: { raw: any };
}

interface Course {
  title: string;
  description: { raw: any };
}

interface TeamMember {
  name: string;
  portrait: { url: string };
  description: { raw: any };
  order: number;
}

interface Contact {
  addresse: string;
  telefon: string | null;
  email: string;
}

interface Partner {
  name: string;
  description: string;
  website: string;
  logo: { url: string };
}

interface BgmData {
  presentations: Presentation[];
  introductions: Introduction[];
  courses: Course[];
  teams: TeamMember[];
  contacts: Contact[];
  partners: Partner[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
    query {
      presentations(first: 50) {
        id
        title
        description {
          raw
          text
        }
      }
      introductions {
        introduction {
          raw
        }
      }
      courses(first: 50) {
        title
        description {
          raw
        }
      }
      teams(first: 50) {
        name
        portrait {
          url
        }
        order
      }
      contacts {
        addresse
        telefon
        email
      }
      partners(first: 50) {
        name
        description
        website
        logo {
          url
        }
      }
    }
  `;

  const data = await request<BgmData>(process.env.aio as string, query);

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};

const Section: FC<{ children: ReactNode; muted?: boolean }> = ({ children, muted }) => (
  <Box bg={muted ? 'gray.50' : undefined} py={{ base: 14, md: 20 }}>
    <Container maxW="7xl" px={{ base: 4, md: 6 }}>
      {children}
    </Container>
  </Box>
);

const ServiceCard: FC<{
  title: string;
  description?: { raw: any; text?: string };
  onClick?: () => void;
}> = ({ title, description, onClick }) => {
  return (
    <Box
      as="button"
      type="button"
      role="group"
      onClick={onClick}
      textAlign="left"
      w="full"
      h="full"
      p={6}
      bg="white"
      rounded="2xl"
      border="1px solid"
      borderColor="gray.100"
      display="flex"
      flexDirection="column"
      transition="all 0.25s ease"
      _hover={{
        borderColor: 'brand.100',
        boxShadow: '0 16px 36px -20px rgba(134, 37, 37, 0.4)',
        transform: 'translateY(-2px)',
      }}
    >
      <Heading as="h3" fontSize="lg" fontWeight={700} mb={2}>
        {title}
      </Heading>
      {description?.text && (
        <Text fontSize="sm" color="gray.600" noOfLines={2} mb={4}>
          {description.text.replace(/\\n/g, ' ')}
        </Text>
      )}
      <Flex align="center" gap={2} mt="auto" color="brand.500" fontWeight={600} fontSize="sm">
        Mehr erfahren
        <Icon as={FiArrowRight} transition="transform 0.2s ease" _groupHover={{ transform: 'translateX(4px)' }} />
      </Flex>
    </Box>
  );
};

const ServiceModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: { raw: any };
}> = ({ isOpen, onClose, title, description }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent mx={{ base: 3, sm: 4, md: 6 }} rounded="2xl">
        <ModalHeader fontFamily="heading" fontSize="2xl" fontWeight={800} pt={8} px={8} pr={14}>
          {title}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} rounded="full" />
        <ModalBody px={8} pb={8}>
          <Prose fontSize="md">
            <RichText content={description.raw} />
          </Prose>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const TeamMemberCard: FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <Box>
      <Box position="relative" overflow="hidden" rounded="2xl" bg="gray.100" sx={{ aspectRatio: '4 / 5' }}>
        <NextImage
          src={member.portrait.url}
          fill
          style={{ objectFit: 'cover' }}
          alt={`Foto von ${member.name}`}
          sizes="(max-width: 768px) 50vw, 300px"
        />
      </Box>
      <Heading as="h3" fontSize={{ base: 'md', md: 'lg' }} fontWeight={700} pt={4}>
        {member.name}
      </Heading>
    </Box>
  );
};

const PartnerCard: FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <LinkBox
      role="group"
      h="full"
      p={6}
      bg="white"
      rounded="2xl"
      border="1px solid"
      borderColor="gray.100"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      transition="all 0.25s ease"
      _hover={{ borderColor: 'brand.100', boxShadow: '0 16px 36px -20px rgba(134, 37, 37, 0.4)' }}
    >
      {partner.logo && (
        <Center h="72px" w="full" mb={5}>
          <Image
            src={partner.logo.url}
            alt={partner.name}
            maxH="72px"
            maxW="80%"
            objectFit="contain"
            filter="grayscale(1)"
            opacity={0.75}
            transition="all 0.25s ease"
            _groupHover={{ filter: 'none', opacity: 1 }}
          />
        </Center>
      )}
      <Heading as="h3" fontSize="md" fontWeight={700}>
        {partner.website ? (
          <LinkOverlay href={partner.website} isExternal>
            {partner.name}
          </LinkOverlay>
        ) : partner.name}
      </Heading>
      {partner.description && (
        <Text fontSize="sm" color="gray.600" mt={2}>
          {partner.description}
        </Text>
      )}
      {partner.website && (
        <Flex align="center" gap={1} mt="auto" pt={3} fontSize="sm" fontWeight={600} color="brand.500">
          Website <Icon as={FiArrowUpRight} />
        </Flex>
      )}
    </LinkBox>
  );
};

const ContactInfo: FC<{ contact: Contact }> = ({ contact }) => {
  const items = [
    { icon: FiMapPin, label: 'Adresse', value: contact.addresse },
    contact.telefon && { icon: FiPhone, label: 'Telefon', value: contact.telefon, href: `tel:${contact.telefon.replace(/\s/g, '')}` },
    contact.email && { icon: FiMail, label: 'E-Mail', value: contact.email, href: `mailto:${contact.email}` },
  ].filter(Boolean) as { icon: typeof FiMail; label: string; value: string; href?: string }[];

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      gap={{ base: 8, lg: 12 }}
      align={{ base: 'flex-start', lg: 'center' }}
      justify="space-between"
      bg="brand.500"
      color="white"
      rounded={{ base: '2xl', md: '3xl' }}
      px={{ base: 6, md: 12 }}
      py={{ base: 10, md: 12 }}
    >
      <Box maxW="md">
        <Text fontWeight={700} fontSize="sm" textTransform="uppercase" letterSpacing="0.1em" color="brand.100" mb={3}>
          Kontakt
        </Text>
        <Heading as="h2" color="white" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={800}>
          Wir freuen uns auf Ihre Anfrage
        </Heading>
      </Box>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 6, md: 10 }}>
        {items.map((item) => (
          <Flex key={item.label} gap={3} align="flex-start">
            <Center w={10} h={10} rounded="xl" bg="whiteAlpha.200" flexShrink={0}>
              <Icon as={item.icon} />
            </Center>
            <Box>
              <Text fontSize="sm" color="brand.100">{item.label}</Text>
              {item.href ? (
                <Text as="a" href={item.href} fontWeight={600} _hover={{ textDecoration: 'underline' }}>
                  {item.value}
                </Text>
              ) : (
                <Text fontWeight={600} whiteSpace="pre-line">{item.value}</Text>
              )}
            </Box>
          </Flex>
        ))}
      </Stack>
    </Flex>
  );
};

const Bgm: NextPage = ({
  presentations,
  introductions,
  courses,
  teams,
  contacts,
  partners,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const sortedTeams = [...teams].sort((a: TeamMember, b: TeamMember) => a.order - b.order);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<{ title: string; description: { raw: any } } | null>(null);
  const contactEmail = contacts?.[0]?.email;

  const handleOpenModal = (title: string, description: { raw: any }) => {
    setSelectedItem({ title, description });
    onOpen();
  };

  return (
    <Box>
      <CommonSEO
        title="Gesundheitsmanagement (BGM) | all in one"
        description="Betriebliches Gesundheitsmanagement - Vorträge, Kurse und Coaching für Ihre Gesundheit"
      />

      <PageHero
        title="Betriebliches"
        highlight={"Gesundheits\u00ADmanagement"}
        description="Vorträge, Kurse und Coaching für Ihre Gesundheit – für Ihre Firma, Ihren Verein oder für Sie selbst."
      >
        {contactEmail && (
          <Box pt={2}>
            <Button
              as="a"
              href={`mailto:${contactEmail}`}
              size="lg"
              bg="white"
              color="brand.500"
              leftIcon={<FiMail />}
              _hover={{ bg: 'brand.50' }}
            >
              Anfrage senden
            </Button>
          </Box>
        )}
      </PageHero>

      {/* Introduction */}
      {introductions && introductions.length > 0 && (
        <Section>
          <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={{ base: 6, lg: 12 }}>
            <Box gridColumn={{ lg: 'span 4' }}>
              <SectionHeading eyebrow="Über das Angebot" title="Gesundheit mit all ihren Facetten" />
            </Box>
            <Prose gridColumn={{ lg: 'span 8' }}>
              <RichText content={introductions[0].introduction.raw} />
            </Prose>
          </SimpleGrid>
        </Section>
      )}

      {/* Presentations / Vorträge */}
      {presentations && presentations.length > 0 && (
        <Section muted>
          <SectionHeading eyebrow="Vorträge" title="Impulse für Ihre Gesundheit" />
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 4, md: 5 }}>
            {presentations.map((item: Presentation) => (
              <ServiceCard
                key={item.id}
                title={item.title}
                description={item.description}
                onClick={() => handleOpenModal(item.title, item.description)}
              />
            ))}
          </SimpleGrid>
        </Section>
      )}

      {/* Courses / Kurse */}
      {courses && courses.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Kurse" title="Aktiv für Ihre Gesundheit" />
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 4, md: 5 }}>
            {courses.map((item: Course, index: number) => (
              <ServiceCard
                key={index}
                title={item.title}
                description={item.description}
                onClick={() => handleOpenModal(item.title, item.description)}
              />
            ))}
          </SimpleGrid>
        </Section>
      )}

      {/* Team */}
      {teams && teams.length > 0 && (
        <Section muted>
          <SectionHeading eyebrow="Unser Team" title="Experten für Ihre Gesundheit" />
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 4, md: 6 }}>
            {sortedTeams.map((member: TeamMember) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </SimpleGrid>
        </Section>
      )}

      {/* Partners */}
      {partners && partners.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Netzwerk" title="Unsere Partner" />
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 4, md: 5 }}>
            {partners.map((partner: Partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </SimpleGrid>
        </Section>
      )}

      {/* Contact */}
      {contacts && contacts.length > 0 && (
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <ContactInfo contact={contacts[0]} />
        </Container>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <ServiceModal
          isOpen={isOpen}
          onClose={onClose}
          title={selectedItem.title}
          description={selectedItem.description}
        />
      )}
    </Box>
  );
};

export default Bgm;
