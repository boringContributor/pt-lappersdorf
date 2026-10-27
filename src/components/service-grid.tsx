import { Box, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

export interface ItemProps {
    title: string;

    description?: string;
}

export const ServiceGrid: FC<{ services: ItemProps[] }> = ({ services }) => {
    return (
        // masonry columns, as descriptions vary a lot in length (or are missing)
        <Box sx={{ columnCount: { base: 1, md: 2, lg: 3 }, columnGap: { base: 4, md: 6 } }}>
            {services.map((service, index) => <ServiceCard key={service.title} index={index} {...service} />)}
        </Box>
    );
};

const ServiceCard: FC<ItemProps & { index: number }> = ({ title, description, index }) => {
    return (
        <Box
            role='group'
            mb={{ base: 4, md: 6 }}
            sx={{ breakInside: 'avoid' }}
            p={{ base: 6, md: 8 }}
            bg='white'
            rounded='2xl'
            border='1px solid'
            borderColor='gray.100'
            boxShadow='0 1px 2px rgba(16, 24, 40, 0.04)'
            transition='all 0.25s ease'
            _hover={{
                borderColor: 'brand.100',
                boxShadow: '0 12px 32px -12px rgba(134, 37, 37, 0.25)',
                transform: 'translateY(-2px)',
            }}>
            <Text
                display='inline-flex'
                alignItems='center'
                justifyContent='center'
                w={10}
                h={10}
                mb={5}
                rounded='xl'
                bg='brand.50'
                color='brand.500'
                fontWeight={700}
                fontSize='sm'
                transition='all 0.25s ease'
                _groupHover={{ bg: 'brand.500', color: 'white' }}>
                {String(index + 1).padStart(2, '0')}
            </Text>
            <Heading
                as='h3'
                fontSize='md'
                fontWeight={700}
                textTransform='uppercase'
                letterSpacing='0.04em'
                lineHeight={1.4}>
                {title}
            </Heading>
            {description && (
                <Text mt={3} color='gray.600' lineHeight={1.7}>
                    {description}
                </Text>
            )}
        </Box>
    );
};
