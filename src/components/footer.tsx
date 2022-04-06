import {
    Box,
    Container,
    Divider,
    Link,
    Stack,
    useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import Logo from '../../public/logo.png';



export const Footer: FC = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={'footer'}
                role="contentinfo"
                maxW={'6xl'}
                py={4}>

                <Image src={Logo} alt='logo' width={200} height={50} />

                <Stack direction={'row'} spacing={6}>
                    <Link href={'/impressum'}>Datenschutz & Impressum</Link>
                    <Divider orientation='vertical' />
                    <Link href={'/kontakt'}>Kontakt</Link>
                </Stack>
            </Container>
        </Box>
    );
}