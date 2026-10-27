import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';

// Map path segments to readable names
const breadcrumbNameMap: Record<string, string> = {
    'aktuelles': 'Aktuelles',
    'leistungen': 'Leistungen',
    'team': 'Team',
    'praxis': 'Praxis',
    'kontakt': 'Kontakt',
    'impressum': 'Impressum',
    'bgm': 'Gesundheitsmanagement',
};

/** Light breadcrumbs, meant to sit on top of the dark page hero */
export const Breadcrumbs: FC = () => {
    const router = useRouter();
    const pathArray = router.asPath.split(/[?#]/)[0].split('/').filter(path => path);

    // Don't show breadcrumbs on home page
    if (pathArray.length === 0) {
        return null;
    }

    return (
        <Breadcrumb
            spacing={2}
            separator={<FiChevronRight />}
            fontSize='sm'
            fontWeight={500}
            color='whiteAlpha.700'>
            <BreadcrumbItem>
                <BreadcrumbLink as={NextLink} href='/' _hover={{ color: 'white', textDecoration: 'none' }}>
                    Start
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathArray.map((path, index) => {
                const href = `/${pathArray.slice(0, index + 1).join('/')}`;
                const isLast = index === pathArray.length - 1;
                const name = breadcrumbNameMap[path] || decodeURIComponent(path);

                return (
                    <BreadcrumbItem key={href} isCurrentPage={isLast}>
                        {isLast ? (
                            <BreadcrumbLink color='white' cursor='default' _hover={{ textDecoration: 'none' }}>
                                {name}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbLink as={NextLink} href={href} _hover={{ color: 'white', textDecoration: 'none' }}>
                                {name}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
};
