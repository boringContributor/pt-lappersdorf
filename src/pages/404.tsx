import { Box, Heading, Text, Button, VStack, Container, Stack } from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiHome, FiPhone, FiCalendar } from 'react-icons/fi';

const timeToRedirect = 5;

const NotFound: NextPage = () => {
    const router = useRouter();
    const [timer, setTimer] = useState(timeToRedirect);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/')
        }, 5000)

        const timer = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        return () => {
            clearTimeout(timeout)
            clearInterval(timer);
        }
    }, [router]);


    return (
        <Container maxW="7xl" py={{ base: 20, md: 32 }}>
            <VStack spacing={8} textAlign="center">
                <Box>
                    <Heading
                        as="h1"
                        size="4xl"
                        fontWeight={800}
                        color="var(--primary)"
                        mb={4}>
                        404
                    </Heading>
                    <Heading
                        as="h2"
                        size="xl"
                        fontWeight={600}
                        mb={4}>
                        Seite nicht gefunden
                    </Heading>
                    <Text fontSize="lg" color="gray.600" maxW="md" mx="auto" lineHeight={1.8}>
                        Die gesuchte Seite existiert leider nicht. Möglicherweise wurde sie verschoben oder gelöscht.
                    </Text>
                </Box>

                <Box
                    bg="var(--primary-light)"
                    px={6}
                    py={4}
                    borderRadius="lg"
                    borderLeft="4px solid"
                    borderColor="var(--primary)">
                    <Text color="gray.700" fontWeight={500}>
                        Automatische Weiterleitung zur Startseite in <Text as="span" color="var(--primary)" fontWeight={700}>{timer}</Text> Sekunden...
                    </Text>
                </Box>

                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing={4}
                    pt={4}>
                    <Button
                        as={NextLink}
                        href="/"
                        leftIcon={<FiHome />}
                        size="lg"
                        bg="var(--primary)"
                        color="white"
                        fontWeight={600}
                        px={8}
                        transition="all 0.3s ease-in-out"
                        boxShadow="md"
                        _hover={{
                            bg: 'var(--primary-hover)',
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                        _active={{
                            transform: 'translateY(0)',
                        }}>
                        Zur Startseite
                    </Button>
                    <Button
                        as={NextLink}
                        href="/kontakt"
                        leftIcon={<FiPhone />}
                        size="lg"
                        variant="outline"
                        borderColor="var(--primary)"
                        color="var(--primary)"
                        fontWeight={600}
                        px={8}
                        transition="all 0.3s ease-in-out"
                        _hover={{
                            bg: 'var(--primary-light)',
                            transform: 'translateY(-2px)',
                        }}>
                        Kontakt
                    </Button>
                    <Button
                        as={NextLink}
                        href="/aktuelles"
                        leftIcon={<FiCalendar />}
                        size="lg"
                        variant="outline"
                        borderColor="var(--primary)"
                        color="var(--primary)"
                        fontWeight={600}
                        px={8}
                        transition="all 0.3s ease-in-out"
                        _hover={{
                            bg: 'var(--primary-light)',
                            transform: 'translateY(-2px)',
                        }}>
                        Aktuelles
                    </Button>
                </Stack>

                <Box pt={8}>
                    <Text fontSize="sm" color="gray.500">
                        Häufig besuchte Seiten:
                    </Text>
                    <Stack
                        direction="row"
                        spacing={4}
                        pt={2}
                        flexWrap="wrap"
                        justifyContent="center">
                        <Text
                            as={NextLink}
                            href="/leistungen"
                            color="var(--primary)"
                            fontSize="sm"
                            fontWeight={500}
                            _hover={{
                                textDecoration: 'underline',
                                color: 'var(--primary-hover)'
                            }}>
                            Leistungen
                        </Text>
                        <Text color="gray.300">•</Text>
                        <Text
                            as={NextLink}
                            href="/team"
                            color="var(--primary)"
                            fontSize="sm"
                            fontWeight={500}
                            _hover={{
                                textDecoration: 'underline',
                                color: 'var(--primary-hover)'
                            }}>
                            Team
                        </Text>
                        <Text color="gray.300">•</Text>
                        <Text
                            as={NextLink}
                            href="/praxis"
                            color="var(--primary)"
                            fontSize="sm"
                            fontWeight={500}
                            _hover={{
                                textDecoration: 'underline',
                                color: 'var(--primary-hover)'
                            }}>
                            Praxis
                        </Text>
                    </Stack>
                </Box>
            </VStack>
        </Container>
    );
}
export default NotFound;