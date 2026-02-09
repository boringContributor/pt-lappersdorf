import {
    ChevronDownIcon, CloseIcon, ExternalLinkIcon, HamburgerIcon
} from '@chakra-ui/icons';
import {
    Box, Collapse, Flex, Icon, IconButton, Link, Stack, Text, useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Logo from '../../public/logo.png';
import { NavItem } from '../types/nav-item';
import { NAV_ITEMS } from '../utils/constants';

export const Navbar: FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const router = useRouter()

    return (
        <Box sx={{ position: 'sticky', top: '0', zIndex: 2 }}>
            <Flex
                as='header'
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Box
                        ml={5}
                        mr={5}
                        transition="all 0.2s ease-in-out"
                        _hover={{ cursor: 'pointer', transform: 'scale(1.02)' }}
                        onClick={() => router.push('/')}
                    >
                        <Image src={Logo} alt='logo' width={200} height={50} />
                    </Box>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box >
    );
}

const DesktopNav = () => {
    const router = useRouter();

    const navLinkStyle = {
        textDecoration: 'underline',
        textUnderlineOffset: '10px',
        textDecorationThickness: '2px',
        color: 'var(--primary)',
    };

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => {
                const isActive = router.pathname === navItem.href;

                return (
                    <Box key={navItem.label} display='grid' placeContent='center'>
                        <Link
                            p={2}
                            href={navItem.href ?? '#'}
                            fontSize={'medium'}
                            fontWeight={500}
                            target={navItem.external ? '_blank' : '_self'}
                            position="relative"
                            transition="all 0.2s ease-in-out"
                            color={isActive ? 'var(--primary)' : 'inherit'}
                            _before={isActive ? {
                                content: '""',
                                position: 'absolute',
                                bottom: '-2px',
                                left: '8px',
                                right: '8px',
                                height: '2px',
                                bg: 'var(--primary)',
                            } : undefined}
                            _focus={{
                                ...navLinkStyle
                            }}
                            _hover={{
                                ...navLinkStyle,
                                transform: 'translateY(-2px)',
                            }}>
                            {navItem.label}
                            {navItem.external && <ExternalLinkIcon mx='2px' mb='2px' />}
                        </Link>
                    </Box>
                );
            })}
        </Stack>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, external }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                bg={isActive ? 'var(--primary-light)' : 'transparent'}
                px={3}
                borderRadius="md"
                transition="all 0.2s ease-in-out"
                _hover={{
                    textDecoration: 'none',
                    bg: 'var(--primary-light)',
                }}>
                <Text
                    fontWeight={600}
                    color={isActive ? 'var(--primary)' : useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                    {external && <ExternalLinkIcon mx='2px' mb='2px' />}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href} target={external ? '_blank' : '_self'}
                            >
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};
