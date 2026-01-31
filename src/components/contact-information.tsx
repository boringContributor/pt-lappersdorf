import {
    Box,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useColorModeValue,
    Link
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FC, ReactNode } from 'react';
import { GoogleMap } from "./google-map";

interface InformationCardProps {
    title: string;
    info: string;
    icon: ReactNode;
    href?: string;
}

export interface ContactInformationProps {
    email: string;
    address: string;
    fax: string;
    phone: string;
}

const InformationCard = ({ title, info, icon, href }: InformationCardProps) => {
    return (
        <Box
            transition="all 0.3s ease-in-out"
            _hover={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                transform: 'translateY(-4px)',
            }}>
            <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                shadow={'lg'}
                border={'1px solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                rounded={'lg'}
                transition="inherit">
                <Flex justifyContent={'space-between'}>
                    <Box pl={{ base: 2, md: 4 }} >
                        <StatLabel fontWeight={'semibold'} isTruncated color="gray.500">
                            {title}
                        </StatLabel>
                        <StatNumber fontSize={{ base: 'lg', md: 'xl' }} fontWeight={'medium'} mt={2}>
                            <Link
                                _hover={{ textDecoration: 'none', color: 'var(--primary)' }}
                                href={href}
                                isExternal
                                transition="color 0.2s ease-in-out"
                            >
                                {info}
                            </Link>
                        </StatNumber>
                    </Box>
                    <Box
                        my={'auto'}
                        color={useColorModeValue('var(--primary)', 'gray.200')}
                        alignContent={'center'}
                        transition="inherit">
                        {icon}
                    </Box>
                </Flex>
            </Stat>
        </Box>
    );
}

export const ContactInformation: FC<ContactInformationProps> = ({ address, email, phone, fax }) => {
    return (
        <Box maxW="7xl" mx={'auto'} pt={5} pb={10} px={{ base: 4, md: 8, lg: 12 }} >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} mb={10}>
                <InformationCard
                    title={'Adresse'}
                    info={address}
                    href={`https://www.google.com.au/maps/search/${encodeURI(
                        address
                    )}`}
                    icon={<FaMapMarkerAlt size={32} />}
                />
                <InformationCard
                    title={'Email'}
                    info={email}
                    href={`mailto:${email}`}
                    icon={<EmailIcon w={10} h={10} color="var(--primary)" />}
                />
                <InformationCard
                    title={'Telefon'}
                    info={phone}
                    href={`tel:${phone}`}
                    icon={<PhoneIcon w={10} h={10} color="var(--primary)" />}
                />
                <InformationCard
                    title={'Fax'}
                    info={fax}
                    icon={<InfoOutlineIcon w={10} h={10} color="var(--primary)" />}
                />
            </SimpleGrid>
            <GoogleMap />
        </Box>
    );
}