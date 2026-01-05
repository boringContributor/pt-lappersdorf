import {
    Box, Center, Container, Flex, Heading, Image, Link, SimpleGrid, Stack, Text, useColorModeValue, VStack, Button, Divider
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from "react";
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft } from 'react-icons/fi';

interface BlogPostDetailProps {
    title: string;
    date: string;
    html: string;
    url: string;
}


export const BlogPostDetail: FC<BlogPostDetailProps> = ({ title, date, html, url }) => {
    return (
        <Container maxW={'7xl'} py={{ base: 8, md: 12 }}>
            <Button
                as={NextLink}
                href='/aktuelles'
                leftIcon={<FiArrowLeft />}
                variant="ghost"
                colorScheme="red"
                mb={6}
                _hover={{
                    bg: 'var(--primary-light)',
                    color: 'var(--primary)',
                }}>
                Zurück zu Aktuelles
            </Button>

            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 4, md: 8 }}>
                <Flex>
                    <Image
                        rounded={'xl'}
                        alt={title}
                        src={url}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '300px', sm: '400px', lg: '500px' }}
                        boxShadow={'xl'}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 8 }}>
                    <Box as={'header'}>
                        <Text
                            color={'var(--primary)'}
                            fontWeight={700}
                            fontSize={'sm'}
                            textTransform={'uppercase'}
                            letterSpacing={1.2}
                            mb={3}>
                            {new Date(date).toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Text>
                        <Heading
                            lineHeight={1.2}
                            fontWeight={700}
                            fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
                            color={useColorModeValue('gray.800', 'white')}>
                            {title}
                        </Heading>
                    </Box>

                    <Divider />

                    <VStack spacing={4} align="stretch" className="markdown-content">
                        <ReactMarkdown
                            components={{
                                a: ({ node, ...props }) => (
                                    <Link
                                        color={'var(--primary)'}
                                        textDecoration="underline"
                                        _hover={{ color: 'var(--primary-hover)' }}
                                        {...props}
                                    />
                                ),
                                p: ({ node, ...props }) => (
                                    <Text
                                        fontSize={{ base: 'md', md: 'lg' }}
                                        lineHeight={1.8}
                                        color={useColorModeValue('gray.700', 'gray.300')}
                                        mb={4}
                                        {...props}
                                    />
                                ),
                                h1: ({ node, ...props }) => (
                                    <Heading
                                        as="h1"
                                        size="xl"
                                        mt={6}
                                        mb={4}
                                        color={useColorModeValue('gray.800', 'white')}
                                        {...props}
                                    />
                                ),
                                h2: ({ node, ...props }) => (
                                    <Heading
                                        as="h2"
                                        size="lg"
                                        mt={6}
                                        mb={3}
                                        color={useColorModeValue('gray.800', 'white')}
                                        {...props}
                                    />
                                ),
                                h3: ({ node, ...props }) => (
                                    <Heading
                                        as="h3"
                                        size="md"
                                        mt={4}
                                        mb={2}
                                        color={useColorModeValue('gray.800', 'white')}
                                        {...props}
                                    />
                                ),
                                ul: ({ node, ...props }) => (
                                    <Box
                                        as="ul"
                                        pl={6}
                                        mb={4}
                                        sx={{
                                            '& li': {
                                                mb: 2,
                                                color: useColorModeValue('gray.700', 'gray.300'),
                                            }
                                        }}
                                        {...props}
                                    />
                                ),
                                ol: ({ node, ...props }) => (
                                    <Box
                                        as="ol"
                                        pl={6}
                                        mb={4}
                                        sx={{
                                            '& li': {
                                                mb: 2,
                                                color: useColorModeValue('gray.700', 'gray.300'),
                                            }
                                        }}
                                        {...props}
                                    />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <Box
                                        as="blockquote"
                                        borderLeft="4px solid"
                                        borderColor="var(--primary)"
                                        pl={4}
                                        py={2}
                                        my={4}
                                        bg={useColorModeValue('gray.50', 'gray.700')}
                                        fontStyle="italic"
                                        color={useColorModeValue('gray.600', 'gray.400')}
                                        {...props}
                                    />
                                ),
                                strong: ({ node, ...props }) => (
                                    <Text as="strong" fontWeight={700} color="var(--primary)" {...props} />
                                ),
                            }}>
                            {html}
                        </ReactMarkdown>
                    </VStack>
                </Stack>
            </SimpleGrid>
        </Container>
    )
};