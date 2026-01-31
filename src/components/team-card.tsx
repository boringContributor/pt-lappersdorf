import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box, Button, Center, Divider, Heading, List, ListIcon, ListItem, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC, useState } from 'react';

export interface TeamCardProps {
    name: string;
    picture: { url: string };
    position: string;

    description?: string[];
}
export const TeamCard: FC<TeamCardProps> = ({ name, picture, position, description }) => {
    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                h={390}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                transition="all 0.3s ease-in-out"
                _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: '2xl',
                }}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    boxShadow={'lg'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <NextImage style={{ borderRadius: '0.5rem', objectFit: 'cover' }} sizes="50vw" src={picture.url} fill alt={`Team Foto von ${name}`} />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                        {name}
                    </Heading>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            {position}
                        </Text>
                    <Divider />
                </Stack>
            </Box>
        </Center>
    );
};
