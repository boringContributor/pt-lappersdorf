import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { siteMetadata } from '../data/site-metadata'

interface CommonSEOProps {
    title: string;
    description: string;

    canonicalUrl?: string;
}

export const CommonSEO: FC<CommonSEOProps> = ({ title, description, canonicalUrl }) => {
    const router = useRouter()

    const ogType = "website";
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner

    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="follow, index" />
            <meta name="description" content={description} />
            <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={siteMetadata.title} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={ogImageUrl} key={ogImageUrl} />
            <link rel="icon" href="/logo_ico.png" />
            <link
                rel="canonical"
                href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${router.asPath}`}
            />
        </Head>
    )
}