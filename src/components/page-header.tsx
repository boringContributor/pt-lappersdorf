import { FC } from 'react';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

interface PageHeaderProps {
    title: string;
    backgroundURL: string;
}
export const PageHeader: FC<PageHeaderProps> = ({ title, backgroundURL }) => {
    return (
        <Box position={'relative'} height="400px" width="100%" opacity={0.8}>
            <Image src={backgroundURL} objectFit='cover' layout='fill' />
        </Box>)
};

