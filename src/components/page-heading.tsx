import { Container, Stack, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

interface PageHeadingProps {
    title: string;

    description?: string;
    underlinedTitle?: string;

}
export const PageHeading: FC<PageHeadingProps> = ({ title, description, underlinedTitle }) => {

    return (
        <Container maxW={'7xl'} display={'grid'} placeItems={'center'} px={{ base: 4, md: 8 }}>
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 5, md: 7 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.2}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}>
                        <Text as={'span'} color={'var(--primary)'}>
                            {title}
                        </Text>
                        <br />
                        {underlinedTitle && <Text
                            as={'span'}
                            position={'relative'}
                            fontWeight={400}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '12%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'var(--primary)',
                                zIndex: -1,
                            }}>
                            {underlinedTitle}
                        </Text>
                        }

                    </Heading>
                    {description && <Text
                        as='p'
                        fontSize={{ base: 'md', md: 'lg' }}
                        color='gray.600'
                        lineHeight={1.8}
                    >
                        {description}
                    </Text>}
                </Stack>
            </Stack>
        </Container>
    )
};