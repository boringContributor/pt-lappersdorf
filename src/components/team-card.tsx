import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box, Button, Center, Divider, Heading, Image, List, ListIcon, ListItem, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import NextImage from 'next/image'

export interface TeamCardProps {
    name: string;
    picture: { url: string };
    position: string;

    description?: string[];
}
export const TeamCard: FC<TeamCardProps> = ({ name, picture, position, description }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: !isFlipped ? `url(${picture.url})` : undefined,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    {!isFlipped &&
                        <NextImage style={{ borderRadius: '0.5rem' }} sizes="50vw" src={picture.url} layout='fill' objectFit={'cover'} alt={`Team Foto von ${name}`} />
                    }
                    {isFlipped && description && description.length > 0 &&
                        <List spacing={3} marginTop={10}>
                            {description.map(quali =>
                                <ListItem key={quali}>
                                    <ListIcon as={ChevronRightIcon} color='green.500' />
                                    {quali}
                                </ListItem>)}
                        </List>
                    }
                </Box>
                <Stack pt={10} align={'center'}>
                    {!isFlipped && (<><Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                        {name}
                    </Heading>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            {position}
                        </Text></>)}
                    <Divider />
                    {description && description.length > 0 && <Button
                        rounded={'full'}
                        size={'lg'}
                        fontWeight={'normal'}
                        px={6}
                        colorScheme={'red'}
                        bg={'var(--primary)'}
                        _hover={{ bg: 'red.500' }}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {isFlipped ? 'Zurück' : 'Qualifikationen'}
                    </Button>}
                </Stack>
            </Box>
        </Center>
    );
};
