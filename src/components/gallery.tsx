import {
    Box, Flex, Grid, IconButton, Modal, ModalContent, ModalOverlay, Text, useDisclosure
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi';

interface GalleryProps {
    images: string[];
}

// bento layout: every 8 images form a full 4 column block
const tileSpan = (index: number) => {
    switch (index % 8) {
        case 0: return { gridColumn: 'span 2', gridRow: 'span 2' };
        case 5: return { gridColumn: 'span 2' };
        default: return {};
    }
};

export const Gallery: FC<GalleryProps> = ({ images }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [current, setCurrent] = useState(0);
    const touchX = useRef<number | null>(null);

    const show = (index: number) => {
        setCurrent(index);
        onOpen();
    };
    const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') prev();
            if (event.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, prev, next]);

    return (
        <>
            <Grid
                templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
                autoRows={{ base: '150px', md: '220px' }}
                gridAutoFlow='dense'
                gap={{ base: 3, md: 4 }}>
                {images.map((src, index) => (
                    <Box
                        key={src}
                        as='button'
                        type='button'
                        aria-label={`Bild ${index + 1} vergrößern`}
                        role='group'
                        position='relative'
                        overflow='hidden'
                        rounded='2xl'
                        bg='gray.100'
                        onClick={() => show(index)}
                        {...tileSpan(index)}>
                        <NextImage
                            src={src}
                            alt={`Praxis Bild ${index + 1}`}
                            fill
                            // tiles crop the photos, so they render wider than the tile itself
                            sizes={index % 8 === 0 ? '(max-width: 768px) 150vw, 50vw' : '(max-width: 768px) 100vw, 50vw'}
                            style={{ objectFit: 'cover' }}
                            className='gallery-image'
                        />
                        <Flex
                            position='absolute'
                            inset={0}
                            align='flex-end'
                            justify='flex-end'
                            p={4}
                            bg='blackAlpha.300'
                            opacity={0}
                            transition='opacity 0.25s ease'
                            _groupHover={{ opacity: 1 }}
                            color='white'>
                            <FiMaximize2 size={20} />
                        </Flex>
                    </Box>
                ))}
            </Grid>

            <Modal isOpen={isOpen} onClose={onClose} size='full' motionPreset='scale'>
                <ModalOverlay bg='rgb(14, 9, 9)' />
                <ModalContent bg='transparent' boxShadow='none' m={0}>
                    <Flex
                        h='100dvh'
                        direction='column'
                        align='center'
                        justify='center'
                        px={{ base: 2, md: 24 }}
                        pt={16}
                        pb={{ base: 24, md: 16 }}
                        onTouchStart={(event) => { touchX.current = event.touches[0].clientX; }}
                        onTouchEnd={(event) => {
                            if (touchX.current === null) return;
                            const distance = event.changedTouches[0].clientX - touchX.current;
                            if (Math.abs(distance) > 50) (distance > 0 ? prev : next)();
                            touchX.current = null;
                        }}>
                        <Box position='relative' w='full' h='full'>
                            <NextImage
                                src={images[current]}
                                alt={`Praxis Bild ${current + 1}`}
                                fill
                                sizes='100vw'
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    </Flex>
                    <Text position='fixed' top={5} left='50%' transform='translateX(-50%)' color='whiteAlpha.800' fontWeight={600} fontSize='sm'>
                        {current + 1} / {images.length}
                    </Text>
                    <IconButton
                        aria-label='Schließen'
                        icon={<FiX />}
                        onClick={onClose}
                        position='fixed'
                        top={4}
                        right={4}
                        colorScheme='whiteAlpha'
                        variant='ghost'
                        color='white'
                        size='lg'
                    />
                    <IconButton
                        aria-label='Vorheriges Bild'
                        icon={<FiChevronLeft />}
                        onClick={prev}
                        // phones: controls sit in a bar below the photo instead of covering it
                        position='fixed'
                        left={{ base: 'calc(50% - 64px)', md: 6 }}
                        top={{ md: '50%' }}
                        bottom={{ base: 8, md: 'auto' }}
                        transform={{ md: 'translateY(-50%)' }}
                        rounded='full'
                        bg='whiteAlpha.200'
                        _hover={{ bg: 'whiteAlpha.300' }}
                        color='white'
                        size='lg'
                    />
                    <IconButton
                        aria-label='Nächstes Bild'
                        icon={<FiChevronRight />}
                        onClick={next}
                        position='fixed'
                        right={{ base: 'calc(50% - 64px)', md: 6 }}
                        top={{ md: '50%' }}
                        bottom={{ base: 8, md: 'auto' }}
                        transform={{ md: 'translateY(-50%)' }}
                        rounded='full'
                        bg='whiteAlpha.200'
                        _hover={{ bg: 'whiteAlpha.300' }}
                        color='white'
                        size='lg'
                    />
                </ModalContent>
            </Modal>
        </>
    )
};
