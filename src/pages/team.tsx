import type { NextPage } from 'next'
import { TeamCard } from '../components/team-card'
import { PageHeader } from '../components/page-header'
import { PageHeading } from '../components/page-heading'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { CommonSEO } from '../components/seo'
import { siteMetadata } from '../data/site-metadata'
const backgroundURL = 'https://ucarecdn.com/c255ca4a-8769-4f01-b2a2-0ac4dd40da6a/-/progressive/yes/-/format/auto/-/resize/2000x/'

const Team: NextPage = () => {
    return (
        <>
            <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
            <main>
                <PageHeader backgroundURL={backgroundURL} />
                <PageHeading title="Unser" underlinedTitle='Team' />

                <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                    <SimpleGrid columns={[1, null, 4]} spacing={2}>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                        <TeamCard name={'Sebastian Sauerer'} photoURL={'https://d35oszxnjbmfnc.cloudfront.net/andreas_mederer.jpg'} position={'Inhaber'} qualifications={['Manuelle Lymphdrainage', 'Manuelle Therapie', 'Fachkraft für Betriebliches Gesundheitsmanagement', 'Augentrainer', 'Progressive Muskel Entspannung (PMR)']}></TeamCard>
                    </SimpleGrid>
                </Box>
            </main>

        </>
    )
}

export default Team
