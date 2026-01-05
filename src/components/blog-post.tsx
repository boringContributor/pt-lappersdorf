import {
    Box,
    Button,
    Center,
    Heading, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
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

export const BlogPost: FC<BlogPostProps> = ({ title, date, description: { text }, backgroundURL: { url }, slug }) => {
    const router = useRouter();

    return (
        <Center py={6}>
            <Box
                h={'full'}
                maxW={'20rem'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'lg'}
                rounded={'lg'}
                overflow={'hidden'}
                transition="all 0.3s ease-in-out"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: '2xl',
                    borderColor: 'var(--primary)',
                }}
                display="flex"
                flexDirection="column">
                <Box
                    h={'200px'}
                    bg={'gray.100'}
                    pos={'relative'}
                    overflow={'hidden'}
                    cursor={'pointer'}
                    onClick={() => router.push(`/aktuelles/${slug}`)}>
                    <Image
                        src={url}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt={title}
                    />
                </Box>
                <Stack p={6} spacing={3} flex="1" display="flex" flexDirection="column">
                    <Text
                        color={'var(--primary)'}
                        textTransform={'uppercase'}
                        fontWeight={700}
                        fontSize={'xs'}
                        letterSpacing={1.2}>
                        {new Date(date).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'xl'}
                        fontFamily={'body'}
                        fontWeight={600}
                        lineHeight={1.3}
                        noOfLines={2}>
                        {title}
                    </Heading>
                    <Text
                        color={'gray.600'}
                        fontSize={'sm'}
                        noOfLines={3}
                        flex="1">
                        {text.replace(/\\n/g, ' ').replace(/\n/g, ' ')}
                    </Text>
                    <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        rightIcon={<FiArrowRight />}
                        onClick={() => router.push(`/aktuelles/${slug}`)}
                        alignSelf="flex-start"
                        mt={2}
                        fontWeight={600}
                        _hover={{
                            bg: 'var(--primary-light)',
                            color: 'var(--primary)',
                        }}>
                        Weiterlesen
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}