import { Box } from "@chakra-ui/react";
import { gql, request } from "graphql-request";
import { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import ReactMarkdown from "react-markdown";
import { PageHeading } from "../components/page-heading";


export const getStaticProps: GetStaticProps = async () => {
    const query = gql`
        query {
            impressum(where: { slug: "impressum"}) {
            content
            }
      }`;

    const data = await request<{ impressum: { content: string } }>(process.env.graphql as string, query);

    if (!data.impressum) {
        return {
            notFound: true
        }
    }
    return {
        props: data,
        revalidate: 60 * 60 // Enables ISR -> Cache response for 1 hour (60 seconds * 60 minutes)
    };
};


const Impressum: NextPage = ({ impressum: { content } }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Box>
            <PageHeading title='Impressum' />
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </Box>
    )
};

export default Impressum;

