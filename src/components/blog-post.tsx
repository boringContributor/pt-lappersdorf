import { Box, Flex, Heading, Icon, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { URL } from '../types/url';

export interface BlogPostProps {
    title: string;
    date: string;
    description: {
        text: string;
    };
    backgroundURL: URL;
    slug: string;
}

export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

export const BlogPost: FC<BlogPostProps> = ({ title, date, description: { text }, backgroundURL: { url }, slug }) => {
    return (
        <LinkBox
            as='article'
            role='group'
            display='flex'
            flexDirection='column'
            h='full'
            bg='white'
            rounded='2xl'
            overflow='hidden'
            border='1px solid'
            borderColor='gray.100'
            transition='all 0.25s ease'
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 40px -20px rgba(134, 37, 37, 0.35)',
            }}>
            <Box position='relative' overflow='hidden' bg='gray.100' sx={{ aspectRatio: '16 / 10' }}>
                <Image
                    src={url}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px'
                    style={{ objectFit: 'cover' }}
                    alt={title}
                />
            </Box>
            <Flex direction='column' flex={1} p={{ base: 6, md: 7 }} gap={3}>
                <Text color='brand.500' fontWeight={600} fontSize='sm'>
                    {formatDate(date)}
                </Text>
                <Heading as='h2' fontSize='xl' fontWeight={700} lineHeight={1.3} noOfLines={2}>
                    <LinkOverlay as={NextLink} href={`/aktuelles/${slug}`}>
                        {title}
                    </LinkOverlay>
                </Heading>
                <Text color='gray.600' noOfLines={3} flex={1}>
                    {text.replace(/\\n/g, ' ').replace(/\n/g, ' ')}
                </Text>
                <Flex align='center' gap={2} mt={2} color='brand.500' fontWeight={600} fontSize='sm'>
                    Weiterlesen
                    <Icon as={FiArrowRight} transition='transform 0.2s ease' _groupHover={{ transform: 'translateX(4px)' }} />
                </Flex>
            </Flex>
        </LinkBox>
    );
}
