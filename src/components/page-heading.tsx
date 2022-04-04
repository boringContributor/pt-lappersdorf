import { Container, Stack, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

interface PageHeadingProps {
    title: string;

    description?: string;
    underlinedTitle?: string;

}
export const PageHeading: FC<PageHeadingProps> = ({ title, description, underlinedTitle }) => {

    return (
        <Container maxW={'7xl'}>
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 5, md: 7 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={300}
                        fontSize={{ base: '4xl', sm: '4xl', lg: '6xl' }}>
                        <Text as={'span'} color={'var(--primary)'}>
                            {title}
                        </Text>
                        <br />
                        {underlinedTitle && <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '10%',
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
                    {description && <Text as='p' textAlign='justify'>
                        {description}
                    </Text>}
                </Stack>
            </Stack>
        </Container>
    )
};