import { extendTheme } from '@chakra-ui/react';

// brand.500 is the practice's primary red (--primary in globals.css)
export const theme = extendTheme({
    colors: {
        brand: {
            50: '#fbf3f3',
            100: '#f4e0e0',
            200: '#e6b8b8',
            300: '#d08585',
            400: '#ae5050',
            500: '#862525',
            600: '#741f1f',
            700: '#5e1919',
            800: '#481313',
            900: '#2f0c0c',
        },
    },
    fonts: {
        heading: 'var(--font-heading), system-ui, sans-serif',
        body: 'var(--font-body), system-ui, sans-serif',
    },
    styles: {
        global: {
            body: {
                bg: 'white',
                color: 'gray.700',
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                rounded: 'full',
                fontWeight: 600,
            },
            defaultProps: {
                colorScheme: 'brand',
            },
        },
        Heading: {
            baseStyle: {
                color: 'gray.900',
                letterSpacing: '-0.02em',
                // long German compounds like "Gesundheitsmanagement" overflow narrow screens otherwise
                // only split long words, with at least 6 letters on each side ("Gesundheits-management")
                hyphens: 'auto',
                hyphenateLimitChars: '14 6 6',
                overflowWrap: 'break-word',
            },
        },
    },
});
