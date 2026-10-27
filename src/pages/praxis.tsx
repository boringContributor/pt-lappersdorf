
import { Box, Container } from "@chakra-ui/react";
import { gql, request } from "graphql-request";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Gallery } from "../components/gallery";
import { PageHero } from "../components/page-hero";
import { URL } from "../types/url";

const title = 'Unsere Praxis im Herzen von'
const highlight = 'Lappersdorf'

type PraxisPage = {
    description: {
        text: string;
    }
    backgroundURL: URL
    praxisImage: URL[];
}
export const getServerSideProps: GetServerSideProps = async () => {
    const query = gql`
    query {
        praxis(where: {slug: "praxis"}) {
            description {
              text
            }
            backgroundURL {
                url
            }
            praxisImage {
                url
            }
          }
      }
  `;

    const data = await request<{ praxis: PraxisPage }>(process.env.graphql as string, query);

    if (!data.praxis) {
        return {
            notFound: true
        }
    }
    return {
        props: data
    };
};

const Praxis: NextPage = ({ praxis }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Box>
            <PageHero title={title} highlight={highlight} description={praxis.description.text} backgroundURL={praxis.backgroundURL.url} />
            <Container maxW="7xl" px={{ base: 4, md: 6 }} pt={{ base: 10, md: 16 }}>
                <Gallery images={praxis.praxisImage.map(({ url }: URL) => url)} />
            </Container>
        </Box>
    )
};

export default Praxis;