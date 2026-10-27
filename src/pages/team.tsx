import { Container, SimpleGrid } from '@chakra-ui/react'
import { gql, request } from 'graphql-request'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { CtaBanner } from '../components/cta-banner'
import { PageHero } from '../components/page-hero'
import { CommonSEO } from '../components/seo'
import { TeamCard, TeamCardProps } from '../components/team-card'
import { siteMetadata } from '../data/site-metadata'

type TeamPage = { team: { employees: TeamCardProps[], backgroundURL: { url: string } } }

export const getServerSideProps: GetServerSideProps = async () => {
    const query = gql`
        query {
            team(where: { slug: "team" }) {
                backgroundURL {
                    url
                }
                employees {
                    name
                    picture {
                        url(transformation: { document: { output: { format: webp } } })
                    }
                    position
                    description
                }
            }
        }`;

    const data = await request<TeamPage>(process.env.graphql as string, query);

    if (!data.team) {
        return {
            notFound: true
        }
    }
    return {
        props: data
    };
};

const Team: NextPage = ({ team }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
            <PageHero title="Unser" highlight='Team' backgroundURL={team.backgroundURL.url} size='lg' />

            <Container maxW="7xl" px={{ base: 4, md: 6 }} pt={{ base: 10, md: 16 }}>
                <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacingX={{ base: 4, md: 6 }} spacingY={{ base: 8, md: 12 }}>
                    {team.employees.map((employee: TeamCardProps) => <TeamCard key={employee.name} {...employee} />)}
                </SimpleGrid>
            </Container>
            <CtaBanner />
        </>
    )
}

export default Team
