import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface CtaBannerProps {
    title?: string;
    description?: string;
}

export const CtaBanner: FC<CtaBannerProps> = ({
    title = 'Vereinbaren Sie Ihren persönlichen Termin',
    description = 'Wir beraten Sie gerne telefonisch oder per E-Mail – und kommen auf Wunsch auch zu Ihnen nach Hause.',
}) => (
    <Container maxW='7xl' px={{ base: 4, md: 6 }} mt={{ base: 16, md: 24 }}>
        <Flex
            position='relative'
            overflow='hidden'
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'center' }}
            justify='space-between'
            gap={8}
            bg='brand.500'
            color='white'
            rounded={{ base: '2xl', md: '3xl' }}
            px={{ base: 6, md: 12 }}
            py={{ base: 10, md: 12 }}>
            <Box
                position='absolute'
                right='-80px'
                top='-120px'
                w='320px'
                h='320px'
                rounded='full'
                bg='whiteAlpha.100'
                pointerEvents='none'
            />
            <Box position='relative' maxW='2xl'>
                <Heading as='h2' color='white' fontSize={{ base: '2xl', md: '3xl' }} fontWeight={800} mb={3}>
                    {title}
                </Heading>
                <Text color='whiteAlpha.900' fontSize={{ base: 'md', md: 'lg' }}>
                    {description}
                </Text>
            </Box>
            <Button
                as={NextLink}
                href='/kontakt'
                position='relative'
                size='lg'
                flexShrink={0}
                bg='white'
                color='brand.500'
                rightIcon={<FiArrowRight />}
                _hover={{ bg: 'brand.50', transform: 'translateY(-1px)' }}>
                Kontakt aufnehmen
            </Button>
        </Flex>
    </Container>
);
