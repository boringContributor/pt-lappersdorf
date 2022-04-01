import { FC } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

interface ImageItem {
    src: string;
    title: string;
    w: number;
    h: number;
}
interface GalleryProps {
    sliderImages: ImageItem[]
}

export const Gallery: FC<GalleryProps> = ({ sliderImages }) => {
    return (
        <Carousel images={sliderImages} style={{ height: 600 }} />
    )
};