import {
    Box,
    Button, Container, Flex, Icon,
    IconProps, Image, Stack, useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC, ReactNode } from 'react';

interface WelcomeProps {
    heroImgURL: string;
    children?: ReactNode;
}

export const Welcome: FC<WelcomeProps> = ({ children, heroImgURL }) => {
    return (
        <Container maxW={'7xl'}>
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 5, md: 7 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    {children}
                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        display="flex"
                        justifyContent='center'
                        direction={{ base: 'column', sm: 'row' }}>
                        <Button
                            as={NextLink}
                            href='/aktuelles'
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'medium'}
                            px={8}
                            colorScheme={'red'}
                            bg={'var(--primary)'}
                            transition="all 0.3s ease-in-out"
                            boxShadow="md"
                            _hover={{
                                bg: 'var(--primary-hover)',
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            _active={{
                                transform: 'translateY(0)',
                                boxShadow: 'md'
                            }}>
                            Aktuelles
                        </Button>
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}
                    overflow={'hidden'}>
                    <Blob
                        w={'150%'}
                        h={'150%'}
                        position={'absolute'}
                        top={'-20%'}
                        left={0}
                        zIndex={-1}
                        color={useColorModeValue('red.50', 'red.400')}
                    />
                    <Box
                        position={'relative'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}
                        transition="all 0.3s ease-in-out"
                        _hover={{
                            transform: 'scale(1.02)',
                            boxShadow: '2xl',
                        }}>
                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            src={heroImgURL}
                        />
                    </Box>
                </Flex>
            </Stack>
        </Container >
    );
}

export const Blob = (props: IconProps) => {
    return (
        <Icon
            width={'100%'}
            viewBox="0 0 578 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    );
};