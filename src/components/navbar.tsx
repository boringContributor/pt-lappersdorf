import {
    ChevronDownIcon, CloseIcon, HamburgerIcon
} from '@chakra-ui/icons';
import {
    Box, Collapse, Flex, Icon, IconButton, Link, Stack, Text, useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '../../public/logo.png';
import { NavItem } from '../types/nav-item';
import { NAV_ITEMS } from '../utils/constants';

export const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const router = useRouter()

    return (
        <Box>
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
                    <Box ml={5} mr={5} _hover={{ cursor: 'pointer' }} onClick={() => router.push('/')} >
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
    const navLinkStyle = {
        textDecoration: 'underline',
        textUnderlineOffset: '10px',
        textDecorationThickness: '2px',
        color: 'var(--primary)',
    };

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} display='grid' placeContent='center'>
                    <Link
                        p={2}
                        href={navItem.href ?? '#'}
                        fontSize={'medium'}
                        fontWeight={500}
                        _focus={{
                            ...navLinkStyle
                        }}
                        _hover={{
                            ...navLinkStyle,
                        }}>
                        {navItem.label}
                    </Link>
                </Box>
            ))}
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

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
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
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};
