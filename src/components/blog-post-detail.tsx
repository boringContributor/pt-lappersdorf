import {
    Box, Center, Container, Flex, Heading, Image, Link, SimpleGrid, Stack, StackDivider, Text, useColorModeValue, VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from "react";

interface BlogPostDetailProps {
    title: string;
    date: string;
    html: string;
    url: string;
}


export const BlogPostDetail: FC<BlogPostDetailProps> = ({ title, date, html, url }) => {
    return (
        <Container maxW={'7xl'}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'blog image'}
                        src={url}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {title}
                        </Heading>
                        <Text
                            color={'var(--primary)'}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            {date}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                            />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text
                                color={useColorModeValue('gray.600', 'gray.400')}
                                fontSize={'2xl'}
                                fontWeight={'300'}>
                                {html}
                            </Text>

                        </VStack>


                    </Stack>

                </Stack>

            </SimpleGrid>
            <Center mb={10}>
                <NextLink href='/aktuelles' passHref>
                    <Link fontSize={'2xl'} color={'var(--primary)'}>Zurück</Link>
                </NextLink>
            </Center>
        </Container>
    )
};