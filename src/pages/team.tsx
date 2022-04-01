import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { TeamCard } from '../components/team-card'
import { PageHeader } from '../components/page-header'
import { Box, SimpleGrid } from '@chakra-ui/react'

const Team: NextPage = () => {
    const { pathname = '', asPath } = useRouter();

    return (
        <>
            <Head>
                <title>{asPath} Physioteam Lappersdorf</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <main>
                <PageHeader title="test" backgroundURL="https://ucarecdn.com/121bb7ec-5e05-4e31-82f5-07293a92831a/-/progressive/yes/-/format/auto/-/resize/2000x/" />

                <SimpleGrid columns={[1, null, 4]}>
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
            </main>

        </>
    )
}

export default Team
