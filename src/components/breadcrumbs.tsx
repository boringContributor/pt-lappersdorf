import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export const Breadcrumbs: FC = () => {
    const router = useRouter();
    const pathArray = router.asPath.split('/').filter(path => path);

    // Map path segments to readable names
    const breadcrumbNameMap: Record<string, string> = {
        'aktuelles': 'Aktuelles',
        'leistungen': 'Leistungen',
        'team': 'Team',
        'praxis': 'Praxis',
        'kontakt': 'Kontakt',
        'impressum': 'Impressum',
    };

    // Don't show breadcrumbs on home page
    if (pathArray.length === 0) {
        return null;
    }

    return (
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, md: 8 }} py={4}>
            <Breadcrumb
                spacing={2}
                separator={<FiChevronRight color="gray.500" />}
                fontSize="sm">
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={NextLink}
                        href="/"
                        display="flex"
                        alignItems="center"
                        gap={1}
                        color="gray.600"
                        transition="all 0.2s"
                        _hover={{
                            color: 'var(--primary)',
                            textDecoration: 'none'
                        }}>
                        <FiHome />
                        <span>Start</span>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {pathArray.map((path, index) => {
                    const href = `/${pathArray.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathArray.length - 1;
                    const name = breadcrumbNameMap[path] || decodeURIComponent(path);

                    return (
                        <BreadcrumbItem key={href} isCurrentPage={isLast}>
                            {isLast ? (
                                <BreadcrumbLink
                                    color="var(--primary)"
                                    fontWeight={600}
                                    cursor="text"
                                    _hover={{ textDecoration: 'none' }}>
                                    {name}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbLink
                                    as={NextLink}
                                    href={href}
                                    color="gray.600"
                                    transition="all 0.2s"
                                    _hover={{
                                        color: 'var(--primary)',
                                        textDecoration: 'none'
                                    }}>
                                    {name}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumb>
        </Box>
    );
};
