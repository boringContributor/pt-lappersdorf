import { Box } from "@chakra-ui/layout";
import { request, gql } from "graphql-request";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Gallery } from "../components/gallery";
import { PageHeader } from "../components/page-header";
import { PageHeading } from "../components/page-heading";

const title = 'Unsere Praxis im Herzen von'
const underlinedTitle = 'Lappersdorf'
const backgroundURL = 'http://d35oszxnjbmfnc.cloudfront.net/front_3.jpg'


const cards = [
    { src: 'https://ucarecdn.com/88a857c8-d420-417d-a5a8-267993d1de79/', title: 'test', w: 200, h: 20 },
    { src: 'https://ucarecdn.com/d575c857-3f79-4259-83a9-b890fc6cf7c3/', title: 'test', w: 200, h: 20 },
    { src: 'https://ucarecdn.com/121bb7ec-5e05-4e31-82f5-07293a92831a/', title: 'test', w: 200, h: 20 },
    { src: 'https://ucarecdn.com/c13ce0d7-c2c7-428e-a506-9e95fb25a2a8/', title: 'test', w: 200, h: 20 },
]

type PraxisPage = {
    description: {
        text: string;
    }
}
export const getStaticProps: GetStaticProps = async () => {
    const query = gql`
    query {
        praxis(where: {slug: "praxis"}) {
            description {
              text
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

const Praxis = ({ praxis }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Box>
            <PageHeader backgroundURL={backgroundURL} />
            <PageHeading title={title} underlinedTitle={underlinedTitle} description={praxis.description.text} />
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
                <Gallery sliderImages={cards} />
            </Box>
        </Box>
    )
};

export default Praxis;