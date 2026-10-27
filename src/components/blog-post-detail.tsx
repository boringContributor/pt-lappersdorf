import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { FC } from "react";
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft } from 'react-icons/fi';
import { formatDate } from './blog-post';
import { Prose } from './prose';

interface BlogPostDetailProps {
    title: string;
    date: string;
    html: string;
    url: string;
}

export const BlogPostDetail: FC<BlogPostDetailProps> = ({ title, date, html, url }) => {
    return (
        <Box as='article'>
            <Container maxW='4xl' px={{ base: 4, md: 6 }} pt={{ base: 8, md: 14 }}>
                <Button
                    as={NextLink}
                    href='/aktuelles'
                    leftIcon={<FiArrowLeft />}
                    variant='ghost'
                    size='sm'
                    ml={-3}
                    mb={8}>
                    Zurück zu Aktuelles
                </Button>
                <Text color='brand.500' fontWeight={600} mb={3}>
                    {formatDate(date)}
                </Text>
                <Heading
                    as='h1'
                    fontWeight={800}
                    lineHeight={1.12}
                    fontSize={{ base: '3xl', md: '5xl' }}>
                    {title}
                </Heading>
            </Container>

            <Container maxW='5xl' px={{ base: 4, md: 6 }} mt={{ base: 8, md: 12 }}>
                <Box position='relative' overflow='hidden' rounded={{ base: '2xl', md: '3xl' }} bg='gray.100' sx={{ aspectRatio: '16 / 9' }}>
                    <NextImage src={url} alt={title} fill priority sizes='(max-width: 1024px) 100vw, 1024px' style={{ objectFit: 'cover' }} />
                </Box>
            </Container>

            <Container maxW='3xl' px={{ base: 4, md: 6 }} mt={{ base: 10, md: 14 }}>
                <Prose>
                    <ReactMarkdown>{html}</ReactMarkdown>
                </Prose>
            </Container>
        </Box>
    )
};
