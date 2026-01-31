import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { gql, request } from 'graphql-request';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import NextImage from 'next/image';
import { FC, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { PageHeading } from '../components/page-heading';
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
  telefon: string;
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
        description {
          raw
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

const SectionHeading: FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <Box textAlign="center" mb={8}>
      <Heading
        as="h2"
        fontSize={{ base: '2xl', md: '3xl' }}
        color="var(--primary)"
        mb={2}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
          {subtitle}
        </Text>
      )}
      <Divider mt={4} borderColor="var(--primary)" width="100px" mx="auto" borderWidth={2} />
    </Box>
  );
};

const ServiceCard: FC<{
  title: string;
  description?: { raw: any; text?: string };
  onClick?: () => void;
}> = ({ title, description, onClick }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={5}
      bg={bgColor}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="md"
      transition="all 0.3s ease-in-out"
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      _hover={{
        boxShadow: 'xl',
        borderColor: 'var(--primary)',
        transform: 'translateY(-4px)',
      }}
      height="100%"
    >
      <Flex align="flex-start" gap={3}>
        <Box color="var(--primary)" mt={1} flexShrink={0}>
          <FaCheckCircle size={18} />
        </Box>
        <Box>
          <Text fontWeight={600} fontSize="md" mb={description?.text ? 2 : 0}>
            {title}
          </Text>
          {description?.text && (
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {description.text.replace(/\\n/g, ' ').substring(0, 100)}...
            </Text>
          )}
          {onClick && (
            <Text fontSize="xs" color="var(--primary)" mt={2} fontWeight={500}>
              Mehr erfahren →
            </Text>
          )}
        </Box>
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent mx={{ base: 3, sm: 4, md: 6 }}>
        <ModalHeader color="var(--primary)" pr={10}>
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box
            fontSize="md"
            color="gray.700"
            lineHeight={1.8}
            wordBreak="break-word"
            overflowWrap="break-word"
            sx={{
              'p': { mb: 4 },
              'strong': { color: 'var(--primary)' },
            }}
          >
            <RichText content={description.raw} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const TeamMemberCard: FC<{ member: TeamMember; isReversed?: boolean }> = ({ member, isReversed }) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      bg={bgColor}
      boxShadow="xl"
      rounded="2xl"
      overflow="hidden"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '2xl',
      }}
    >
      <Flex
        direction={{ base: 'column', md: isReversed ? 'row-reverse' : 'row' }}
        align="stretch"
      >
        <Box
          position="relative"
          width={{ base: '100%', md: '280px' }}
          minH={{ base: '300px', md: '350px' }}
          flexShrink={0}
        >
          <NextImage
            src={member.portrait.url}
            fill
            style={{ objectFit: 'cover' }}
            alt={`Foto von ${member.name}`}
            sizes="(max-width: 768px) 100vw, 280px"
          />
        </Box>
        <Box p={{ base: 6, md: 8 }} flex={1}>
          <Heading
            as="h3"
            fontSize={{ base: 'xl', md: '2xl' }}
            color="var(--primary)"
            mb={4}
          >
            {member.name}
          </Heading>
          <Box
            fontSize="sm"
            color="gray.600"
            lineHeight={1.8}
            sx={{
              'ul': {
                listStyleType: 'none',
                pl: 0,
              },
              'li': {
                position: 'relative',
                pl: 5,
                mb: 2,
                _before: {
                  content: '"•"',
                  position: 'absolute',
                  left: 0,
                  color: 'var(--primary)',
                  fontWeight: 'bold',
                },
              },
              'p': {
                mb: 3,
              },
              'strong': {
                color: 'gray.800',
              },
            }}
          >
            <RichText content={member.description.raw} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const PartnerCard: FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <Box
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="lg"
      rounded="lg"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
    >
      {partner.logo && (
        <Center mb={4}>
          <Image
            src={partner.logo.url}
            alt={partner.name}
            maxH="80px"
            objectFit="contain"
          />
        </Center>
      )}
      <Heading fontSize="lg" mb={2} textAlign="center">
        {partner.name}
      </Heading>
      {partner.description && (
        <Text fontSize="sm" color="gray.600" textAlign="center" mb={3}>
          {partner.description}
        </Text>
      )}
      {partner.website && (
        <Center>
          <Link
            href={partner.website}
            isExternal
            color="var(--primary)"
            fontWeight={500}
            _hover={{ textDecoration: 'underline' }}
          >
            Website besuchen
          </Link>
        </Center>
      )}
    </Box>
  );
};

const ContactInfo: FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <Box
      p={8}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="lg"
      rounded="lg"
      textAlign="center"
    >
      <Stack spacing={4}>
        <Box>
          <Text fontWeight={600} color="var(--primary)" mb={1}>
            Adresse
          </Text>
          <Text color="gray.600" whiteSpace="pre-line">
            {contact.addresse}
          </Text>
        </Box>
        <Divider />
        <Box>
          <Text fontWeight={600} color="var(--primary)" mb={1}>
            Telefon
          </Text>
          <Link href={`tel:${contact.telefon}`} color="gray.600">
            {contact.telefon}
          </Link>
        </Box>
        <Divider />
        <Box>
          <Text fontWeight={600} color="var(--primary)" mb={1}>
            E-Mail
          </Text>
          <Link href={`mailto:${contact.email}`} color="gray.600">
            {contact.email}
          </Link>
        </Box>
      </Stack>
    </Box>
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
  const introBg = useColorModeValue('gray.50', 'gray.700');

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

      <PageHeading
        title="Betriebliches"
        underlinedTitle="Gesundheitsmanagement"
      />

      <Container maxW="7xl" pt={5} pb={10} px={{ base: 4, md: 8, lg: 12 }}>
        {/* Introduction */}
        {introductions && introductions.length > 0 && (
          <Box
            mb={16}
            p={{ base: 4, md: 8 }}
            bg={introBg}
            rounded="xl"
            boxShadow="md"
          >
            <Box
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              lineHeight={1.8}
              wordBreak="break-word"
              overflowWrap="break-word"
              sx={{
                'p': { mb: 4 },
                'strong': { color: 'var(--primary)' },
              }}
            >
              <RichText content={introductions[0].introduction.raw} />
            </Box>
          </Box>
        )}

        {/* Presentations / Vorträge */}
        {presentations && presentations.length > 0 && (
          <Box mb={16}>
            <SectionHeading title="Vorträge" subtitle="Impulse für Ihre Gesundheit" />
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
              {presentations.map((item: Presentation) => (
                <ServiceCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  onClick={() => handleOpenModal(item.title, item.description)}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Courses / Kurse */}
        {courses && courses.length > 0 && (
          <Box mb={16}>
            <SectionHeading title="Kurse" subtitle="Aktiv für Ihre Gesundheit" />
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
              {courses.map((item: Course, index: number) => (
                <ServiceCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  onClick={() => handleOpenModal(item.title, item.description)}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Team */}
        {teams && teams.length > 0 && (
          <Box mb={16}>
            <SectionHeading title="Unser Team" subtitle="Experten für Ihre Gesundheit" />
            <Stack spacing={8} mt={8}>
              {sortedTeams.map((member: TeamMember, index: number) => (
                <TeamMemberCard
                  key={member.name}
                  member={member}
                  isReversed={index % 2 === 1}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Partners */}
        {partners && partners.length > 0 && (
          <Box mb={16}>
            <SectionHeading title="Unsere Partner" />
            <SimpleGrid minChildWidth="250px" spacing={6}>
              {partners.map((partner: Partner) => (
                <PartnerCard key={partner.name} partner={partner} />
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Contact */}
        {contacts && contacts.length > 0 && (
          <Box>
            <SectionHeading title="Kontakt" subtitle="Wir freuen uns auf Ihre Anfrage" />
            <Center>
              <Box maxW="400px" w="full">
                <ContactInfo contact={contacts[0]} />
              </Box>
            </Center>
          </Box>
        )}
      </Container>

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
