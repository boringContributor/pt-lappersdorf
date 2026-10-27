import { Heading, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface SectionHeadingProps {
    title: string;
    eyebrow?: string;
    description?: string;
    align?: 'left' | 'center';
}

export const SectionHeading: FC<SectionHeadingProps> = ({ title, eyebrow, description, align = 'left' }) => {
    return (
        <Stack
            spacing={3}
            mb={{ base: 8, md: 10 }}
            textAlign={align}
            align={align === 'center' ? 'center' : 'flex-start'}
            maxW={align === 'center' ? '2xl' : undefined}
            mx={align === 'center' ? 'auto' : undefined}>
            {eyebrow && (
                <Text color='brand.500' fontWeight={700} fontSize='sm' textTransform='uppercase' letterSpacing='0.1em'>
                    {eyebrow}
                </Text>
            )}
            <Heading as='h2' fontSize={{ base: '2xl', md: '4xl' }} fontWeight={800} lineHeight={1.15}>
                {title}
            </Heading>
            {description && (
                <Text color='gray.600' fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.7}>
                    {description}
                </Text>
            )}
        </Stack>
    );
};
