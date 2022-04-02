import { FC } from 'react';
import {
    Stack,
    Flex,
    Text,
    VStack,
    useBreakpointValue
} from '@chakra-ui/react';

interface PageHeaderImgProps {
    backgroundURL: string;

    title?: string;
}

export const PageHeaderImg: FC<PageHeaderImgProps> = ({ title, backgroundURL }) => {
    return (
        <Flex
            backgroundRepeat='no-repeat'
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
                        fontSize={'3xl'}>
                        {title}
                    </Text>
                </Stack>}
            </VStack>
        </Flex>
    );
}