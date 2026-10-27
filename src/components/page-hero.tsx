import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC, ReactNode } from 'react';
import { Breadcrumbs } from './breadcrumbs';

interface PageHeroProps {
    title: string;

    /** second part of the title, rendered in the light brand tone */
    highlight?: string;
    eyebrow?: string;
    description?: string;
    backgroundURL?: string;
    size?: 'md' | 'lg';
    children?: ReactNode;
}

export const PageHero: FC<PageHeroProps> = ({ title, highlight, eyebrow, description, backgroundURL, size = 'md', children }) => {
    return (
        <Container maxW='7xl' px={{ base: 3, md: 6 }} pt={{ base: 3, md: 6 }}>
            <Box
                position='relative'
                overflow='hidden'
                rounded={{ base: '2xl', md: '3xl' }}
                bg='brand.700'
                display='flex'
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems={{ md: 'flex-end' }}
                minH={size === 'lg'
                    ? { md: '480px', lg: '640px' }
                    : { base: backgroundURL ? undefined : '260px', md: backgroundURL ? '440px' : '320px' }}>
                {backgroundURL ? (
                    // phones: the photo keeps its landscape shape with the text below, so group photos aren't cropped
                    // larger screens: the text is laid over the photo
                    <Box
                        position={{ base: 'relative', md: 'absolute' }}
                        inset={{ md: 0 }}
                        w='full'
                        flexShrink={0}
                        sx={{ aspectRatio: { base: '3 / 2', md: 'auto' } }}>
                        <NextImage
                            src={backgroundURL}
                            alt=''
                            fill
                            priority
                            sizes='(max-width: 768px) 125vw, (max-width: 1280px) 100vw, 1232px'
                            style={{ objectFit: 'cover' }}
                        />
                        <Box
                            position='absolute'
                            inset={0}
                            bg={{
                                base: 'linear-gradient(to top, var(--chakra-colors-brand-700), transparent 30%)',
                                md: 'linear-gradient(to top, rgba(20, 8, 8, 0.85), rgba(20, 8, 8, 0.3) 60%, rgba(20, 8, 8, 0.1)), linear-gradient(to right, rgba(20, 8, 8, 0.45), transparent 65%)',
                            }}
                        />
                    </Box>
                ) : (
                    <Box
                        position='absolute'
                        inset={0}
                        bg='radial-gradient(circle at 85% 15%, rgba(255,255,255,0.14), transparent 45%), radial-gradient(circle at 10% 110%, rgba(0,0,0,0.35), transparent 50%)'
                    />
                )}

                <Stack
                    position='relative'
                    spacing={{ base: 4, md: 5 }}
                    p={{ base: 6, md: 12, lg: 14 }}
                    pt={{ base: backgroundURL ? 2 : 6, md: 12, lg: 14 }}
                    maxW='4xl'
                    color='white'>
                    <Breadcrumbs />
                    {eyebrow && (
                        <Text
                            alignSelf='flex-start'
                            px={3}
                            py={1}
                            rounded='full'
                            fontSize='sm'
                            fontWeight={600}
                            bg='whiteAlpha.200'
                            backdropFilter='blur(6px)'
                            border='1px solid'
                            borderColor='whiteAlpha.300'>
                            {eyebrow}
                        </Text>
                    )}
                    <Heading
                        as='h1'
                        color='white'
                        fontWeight={800}
                        lineHeight={1.08}
                        fontSize={size === 'lg' ? { base: '3xl', sm: '4xl', md: '6xl' } : { base: '3xl', md: '5xl' }}>
                        {title}
                        {highlight && <> <Text as='span' color='brand.200'>{highlight}</Text></>}
                    </Heading>
                    {description && (
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            lineHeight={1.7}
                            color='whiteAlpha.900'
                            maxW='2xl'
                            whiteSpace='pre-line'>
                            {description}
                        </Text>
                    )}
                    {children}
                </Stack>
            </Box>
        </Container>
    );
}
