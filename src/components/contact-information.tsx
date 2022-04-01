import {
    Box,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Link
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, InfoOutlineIcon, ChevronDownIcon } from '@chakra-ui/icons'
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
            _hover={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)'
            }}>
            <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                shadow={'xl'}
                border={'1px solid'}
                rounded={'lg'}>
                <Flex justifyContent={'space-between'}>
                    <Box pl={{ base: 2, md: 4 }} >
                        <StatLabel fontWeight={'medium'} isTruncated>
                            {title}
                        </StatLabel>
                        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                            <Link _hover={{ textDecoration: 'none' }} href={href} isExternal>
                                {info}
                            </Link>
                        </StatNumber>
                    </Box>
                    <Box
                        my={'auto'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        alignContent={'center'}>
                        {icon}
                    </Box>
                </Flex>
            </Stat>
        </Box>
    );
}

export const ContactInformation: FC<ContactInformationProps> = ({ address, email, phone, fax }) => {
    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }} mb={10}>
                <InformationCard
                    title={'Adresse'}
                    info={address}
                    href={`https://www.google.com.au/maps/search/${encodeURI(
                        address
                    )}`}
                    icon={<ChevronDownIcon w={10} h={10} color="var(--primary)" />}
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