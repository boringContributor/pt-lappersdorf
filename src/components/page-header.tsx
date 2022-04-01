import { FC } from 'react';
import {
    Stack,
    Flex,
    Text,
    VStack,
    useBreakpointValue,
    Box
} from '@chakra-ui/react';

interface PageHeaderProps {
    backgroundURL: string;

    title?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, backgroundURL }) => {
    return (
        <Flex
            w={'full'}
            h={'40vh'}
            backgroundImage={
                `url(${backgroundURL})`
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                {title && <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        {title}
                    </Text>
                </Stack>}
            </VStack>
        </Flex>
    );
}