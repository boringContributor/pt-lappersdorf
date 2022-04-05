import {
    Box,
    Center,
    Heading, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
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

export const BlogPost: FC<BlogPostProps> = ({ title, date, description: { text }, backgroundURL: { url }, slug }) => {
    const router = useRouter();

    return (
        <Center py={6}>
            <Box
                _hover={{
                    boxShadow: 'dark-lg',
                    cursor: 'pointer'
                }}
                h={390}
                onClick={() => router.push(`/aktuelles/${slug}`)}
                maxW={'20rem'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                    h={'210px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <Image
                        src={url}
                        layout={'fill'}
                        alt={slug}
                    />
                </Box>
                <Stack>
                    <Text
                        color={'var(--primary)'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        Blog | {date}
                    </Text>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text color={'gray.500'} textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'}>
                        {text}
                    </Text>
                </Stack>
            </Box>
        </Center>
    );
}