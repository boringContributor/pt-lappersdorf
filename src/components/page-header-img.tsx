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
    size?: BackgroundImageSize
}

export enum BackgroundImageSize {
    SMALL = '21vh',
    MEDIUM = '30vh',
    BIG = '60vh'
}

export const PageHeaderImg: FC<PageHeaderImgProps> = ({ title, backgroundURL, size = BackgroundImageSize.MEDIUM }) => {
    return (
        <Flex
            backgroundRepeat='no-repeat'
            height={{ base: BackgroundImageSize.SMALL, sm: BackgroundImageSize.SMALL, md: size, lg: BackgroundImageSize.BIG }}
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