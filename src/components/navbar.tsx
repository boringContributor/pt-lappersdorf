import {
    Box, Collapse, Container, Flex, HStack, Icon, IconButton, Link, Stack, useDisclosure
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import Logo from '../../public/logo.png';
import { NavItem } from '../types/nav-item';
import { NAV_ITEMS } from '../utils/constants';

const isActive = (pathname: string, href?: string) =>
    href === '/' ? pathname === '/' : !!href && pathname.startsWith(href);

export const Navbar: FC = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const router = useRouter();

    // close the mobile menu after navigating
    useEffect(() => {
        router.events.on('routeChangeStart', onClose);
        return () => router.events.off('routeChangeStart', onClose);
    }, [router.events, onClose]);

    return (
        <Box
            as='header'
            position='sticky'
            top={0}
            zIndex='sticky'
            bg='rgba(255, 255, 255, 0.85)'
            backdropFilter='saturate(180%) blur(12px)'
            borderBottom='1px solid'
            borderColor='blackAlpha.100'>
            <Container maxW='7xl' px={{ base: 4, md: 6 }}>
                <Flex h={{ base: '64px', md: '76px' }} align='center' justify='space-between' gap={6}>
                    <Link as={NextLink} href='/' aria-label='Zur Startseite' flexShrink={0} display='flex'>
                        <Image src={Logo} alt='Physioteam Lappersdorf' width={168} height={42} priority />
                    </Link>

                    <HStack as='nav' spacing={1} display={{ base: 'none', xl: 'flex' }}>
                        {NAV_ITEMS.map((navItem) => (
                            <DesktopNavItem key={navItem.label} {...navItem} active={isActive(router.pathname, navItem.href)} />
                        ))}
                    </HStack>

                    <IconButton
                        display={{ base: 'inline-flex', xl: 'none' }}
                        onClick={onToggle}
                        icon={<Icon as={isOpen ? FiX : FiMenu} boxSize={5} />}
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='Navigation umschalten'
                        aria-expanded={isOpen}
                    />
                </Flex>
            </Container>

            <Collapse in={isOpen} animateOpacity>
                <Stack
                    as='nav'
                    display={{ xl: 'none' }}
                    px={4}
                    pt={2}
                    pb={6}
                    spacing={1}
                    borderTop='1px solid'
                    borderColor='blackAlpha.100'>
                    {NAV_ITEMS.map((navItem) => (
                        <MobileNavItem key={navItem.label} {...navItem} active={isActive(router.pathname, navItem.href)} />
                    ))}
                </Stack>
            </Collapse>
        </Box>
    );
}

type NavItemProps = NavItem & { active: boolean };

const DesktopNavItem = ({ label, href, external, active }: NavItemProps) => (
    <Link
        as={external ? undefined : NextLink}
        href={href ?? '#'}
        isExternal={external}
        px={3}
        py={2}
        rounded='full'
        fontSize='15px'
        fontWeight={500}
        whiteSpace='nowrap'
        display='inline-flex'
        alignItems='center'
        gap={1}
        color={active ? 'brand.500' : 'gray.600'}
        bg={active ? 'brand.50' : 'transparent'}
        transition='all 0.2s ease'
        _hover={{ textDecoration: 'none', color: 'brand.500', bg: 'brand.50' }}>
        {label}
        {external && <Icon as={FiArrowUpRight} boxSize={4} />}
    </Link>
);

const MobileNavItem = ({ label, href, external, active }: NavItemProps) => (
    <Link
        as={external ? undefined : NextLink}
        href={href ?? '#'}
        isExternal={external}
        px={4}
        py={3}
        rounded='xl'
        fontWeight={600}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        color={active ? 'brand.500' : 'gray.700'}
        bg={active ? 'brand.50' : 'transparent'}
        _hover={{ textDecoration: 'none', bg: 'brand.50' }}>
        {label}
        {external && <Icon as={FiArrowUpRight} boxSize={5} />}
    </Link>
);
