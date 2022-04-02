import { Box, SimpleGrid } from '@chakra-ui/react'
import { gql, request } from 'graphql-request'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { PageHeaderImg } from '../components/page-header-img'
import { PageHeading } from '../components/page-heading'
import { CommonSEO } from '../components/seo'
import { TeamCard, TeamCardProps } from '../components/team-card'
import { siteMetadata } from '../data/site-metadata'

type TeamPage = { team: { employees: TeamCardProps[], backgroundURL: { url: string } } }

export const getStaticProps: GetStaticProps = async () => {
    const query = gql`
        query {
            team(where: { slug: "team" }) {
                backgroundURL {
                    url
                }
                employees {
                    name
                    picture {
                        url
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
        props: data,
        revalidate: 60 * 60 // Enables ISR -> Cache response for 1 hour (60 seconds * 60 minutes)
    };
};

const Team: NextPage = ({ team }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
            <main>
                <PageHeaderImg backgroundURL={team.backgroundURL.url} />
                <PageHeading title="Unser" underlinedTitle='Team' />

                <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                    <SimpleGrid columns={[1, null, 4]} spacing={2}>
                        {team.employees.map((employee: TeamCardProps) => <TeamCard {...employee} />)}
                    </SimpleGrid>
                </Box>
            </main>
        </>
    )
}

export default Team
