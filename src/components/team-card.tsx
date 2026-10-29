import { Box, Center, Heading, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

export interface TeamCardProps {
    name: string;
    picture?: { url: string };
    position: string;

    description?: string[];
}

const initials = (name: string) =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('');

export const TeamCard: FC<TeamCardProps> = ({ name, picture, position }) => {
    return (
        <Box role='group'>
            <Box
                position='relative'
                overflow='hidden'
                rounded='2xl'
                bg='gray.100'
                sx={{ aspectRatio: '4 / 5' }}>
                {picture?.url ? (
                    <NextImage
                        src={picture.url}
                        fill
                        // the photos are 3:2 landscape cropped into a 4:5 box, so they render ~1.9x the card width
                        sizes='(max-width: 768px) 95vw, (max-width: 992px) 63vw, (max-width: 1280px) 48vw, 560px'
                        alt={`Team Foto von ${name}`}
                        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className='team-card-image'
                    />
                ) : (
                    <Center h='full' bg='brand.50' color='brand.300' fontFamily='heading' fontWeight={800} fontSize='5xl'>
                        {initials(name)}
                    </Center>
                )}
            </Box>
            <Box pt={4}>
                <Heading as='h3' fontSize={{ base: 'md', md: 'lg' }} fontWeight={700}>
                    {name}
                </Heading>
                <Text color='brand.500' fontSize='sm' fontWeight={600} mt={1}>
                    {position}
                </Text>
            </Box>
        </Box>
    );
};
