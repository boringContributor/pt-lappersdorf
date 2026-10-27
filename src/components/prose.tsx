import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

/** Typography for rich text and markdown coming from Hygraph */
export const Prose: FC<BoxProps> = ({ sx, ...props }) => (
    <Box
        fontSize={{ base: 'md', md: 'lg' }}
        lineHeight={1.8}
        color='gray.700'
        wordBreak='break-word'
        sx={{
            'p, ul, ol, blockquote': { mb: 5 },
            'h1, h2, h3, h4': {
                fontFamily: 'heading',
                fontWeight: 700,
                color: 'gray.900',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                mt: 10,
                mb: 4,
            },
            'h1': { fontSize: { base: '2xl', md: '3xl' } },
            'h2': { fontSize: { base: 'xl', md: '2xl' } },
            'h3, h4': { fontSize: { base: 'lg', md: 'xl' } },
            '& > :first-child': { mt: 0 },
            '& > :last-child': { mb: 0 },
            'ul, ol': { pl: 6 },
            'li': { mb: 2, pl: 1 },
            'li::marker': { color: 'brand.500' },
            'a': {
                color: 'brand.500',
                fontWeight: 500,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                _hover: { color: 'brand.600' },
            },
            'strong': { color: 'gray.900', fontWeight: 700 },
            'blockquote': {
                borderLeft: '3px solid',
                borderColor: 'brand.500',
                bg: 'brand.50',
                roundedRight: 'lg',
                px: 5,
                py: 3,
                fontStyle: 'italic',
                color: 'gray.600',
            },
            ...sx,
        }}
        {...props}
    />
);
