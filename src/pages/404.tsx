import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear-gradient(90deg, rgba(79,76,136,1) 0%, rgba(134,37,37,1) 47%, rgba(79,76,136,1) 100%)"
                backgroundClip="text">
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Seite nicht gefunden.
            </Text>
            <Text color={'gray.500'} mb={6}>
                Weiterleitung auf Startseite in {timer} Sekunden ...
            </Text>

            <Button
                colorScheme="teal"
                bgGradient="linear-gradient(90deg, rgba(79,76,136,1) 0%, rgba(134,37,37,1) 47%, rgba(210,71,238,1) 100%)"
                color="white"
                variant="solid">
                Go to Home
            </Button>
        </Box>
    );
}
export default NotFound;