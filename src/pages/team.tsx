import { Box, SimpleGrid } from '@chakra-ui/react'
import { gql, request } from 'graphql-request'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { BackgroundImageSize, PageHeaderImg } from '../components/page-header-img'
import { PageHeading } from '../components/page-heading'
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
            <main>
                <PageHeaderImg backgroundURL={team.backgroundURL.url} size={BackgroundImageSize.BIG} />
                <PageHeading title="Unser" underlinedTitle='Team' />

                <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 4, md: 8, lg: 12 }} >
                    <SimpleGrid minChildWidth='300px' spacing={2}>
                        {team.employees.map((employee: TeamCardProps) => <TeamCard key={employee.name} {...employee} />)}
                    </SimpleGrid>
                </Box>
            </main>
        </>
    )
}

export default Team
