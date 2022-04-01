import {
    Box,
    Container,
    Divider,
    Link,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Logo from '../../public/logo.png';



export const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>

                <Image src={Logo} alt='logo' width={200} height={50} />

                <Stack direction={'row'} spacing={6}>
                    <Link href={'#'}>Datenschutz & Impressum</Link>
                    <Divider orientation='vertical' />
                    <Link href={'#'}>Kontakt</Link>
                </Stack>
            </Container>
        </Box>
    );
}