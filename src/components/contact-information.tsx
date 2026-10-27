import { Box, Center, Container, Flex, Icon, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { FiMail, FiMapPin, FiPhone, FiPrinter } from 'react-icons/fi';
import { GoogleMap } from './google-map';

interface InformationCardProps {
    title: string;
    info: string;
    icon: IconType;
    href?: string;
}

export interface ContactInformationProps {
    email: string;
    address: string;
    fax: string;
    phone: string;
}

const InformationCard = ({ title, info, icon, href }: InformationCardProps) => {
    const content = (
        <Flex
            align='center'
            gap={4}
            p={5}
            h='full'
            bg='white'
            rounded='2xl'
            border='1px solid'
            borderColor='gray.100'
            transition='all 0.2s ease'
            _hover={href ? { borderColor: 'brand.200', boxShadow: '0 8px 24px -12px rgba(134, 37, 37, 0.3)' } : undefined}>
            <Center w={12} h={12} rounded='xl' bg='brand.50' color='brand.500' flexShrink={0}>
                <Icon as={icon} boxSize={5} />
            </Center>
            <Box minW={0}>
                <Text fontSize='sm' color='gray.500' fontWeight={500}>
                    {title}
                </Text>
                <Text fontWeight={600} color='gray.900' fontSize={{ base: 'md', md: 'lg' }} wordBreak='break-word'>
                    {info}
                </Text>
            </Box>
        </Flex>
    );

    return href
        ? <Link href={href} isExternal _hover={{ textDecoration: 'none' }}>{content}</Link>
        : content;
}

export const ContactInformation: FC<ContactInformationProps> = ({ address, email, phone, fax }) => {
    return (
        <Container maxW='7xl' px={{ base: 4, md: 6 }} pt={{ base: 10, md: 16 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 10 }} alignItems='stretch'>
                <Stack spacing={4}>
                    <InformationCard
                        title='Telefon'
                        info={phone}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        icon={FiPhone}
                    />
                    <InformationCard
                        title='E-Mail'
                        info={email}
                        href={`mailto:${email}`}
                        icon={FiMail}
                    />
                    <InformationCard
                        title='Adresse'
                        info={address}
                        href={`https://www.google.com/maps/search/${encodeURI(address)}`}
                        icon={FiMapPin}
                    />
                    <InformationCard title='Fax' info={fax} icon={FiPrinter} />
                </Stack>
                <Box rounded='2xl' overflow='hidden' border='1px solid' borderColor='gray.100' minH='360px'>
                    <GoogleMap />
                </Box>
            </SimpleGrid>
        </Container>
    );
}
