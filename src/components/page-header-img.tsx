import { FC } from 'react';
import {
    Stack,
    Flex,
    Text,
    VStack,
    useBreakpointValue,
    Image,
    AspectRatio,
    Box
} from '@chakra-ui/react';

interface PageHeaderImgProps {
    backgroundURL: string;
    size?: BackgroundImageSize
}

export enum BackgroundImageSize {
    SMALL = '30vh',
    MEDIUM = '40vh',
    BIG = '90vh'
}

export const PageHeaderImg: FC<PageHeaderImgProps> = ({ backgroundURL, size = BackgroundImageSize.MEDIUM }) => {
    return (
        <Image
            alt={'Hero Image'}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: BackgroundImageSize.SMALL, sm: BackgroundImageSize.SMALL, md: size, lg: size }}
            src={backgroundURL}
        />

    );
}


