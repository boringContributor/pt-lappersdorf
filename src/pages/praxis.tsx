
import { gql, request } from "graphql-request";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { URL } from "../types/url";
import { Gallery } from "../components/gallery";
import { PageHeaderImg } from "../components/page-header-img";
import { PageHeading } from "../components/page-heading";
import { Box } from "@chakra-ui/react";

const title = 'Unsere Praxis im Herzen von'
const underlinedTitle = 'Lappersdorf'

type PraxisPage = {
    description: {
        text: string;
    }
    backgroundURL: URL
    praxisImage: URL[];
}
export const getStaticProps: GetStaticProps = async () => {
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
        props: data,
        revalidate: 60 * 60 // Enables ISR -> Cache response for 1 hour (60 seconds * 60 minutes)
    };
};

const transformToGallery = (urls: URL[]): { src: string, title: string, w: number, h: number }[] => {
    return urls.map(({ url }) => {
        return { src: url, title: 'Praxis', w: 200, h: 20 }
    })
};

const Praxis: NextPage = ({ praxis }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Box>
            <PageHeaderImg backgroundURL={praxis.backgroundURL.url} />
            <PageHeading title={title} underlinedTitle={underlinedTitle} description={praxis.description.text} />
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <Gallery sliderImages={transformToGallery(praxis.praxisImage)} />
            </Box>
        </Box>
    )
};

export default Praxis;