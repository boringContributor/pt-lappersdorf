import { Box } from "@chakra-ui/react";
import { gql, request } from "graphql-request";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import { PageHeading } from "../components/page-heading";


export const getServerSideProps: GetServerSideProps = async () => {
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
        props: data
    };
};


const Impressum: NextPage = ({ impressum: { content } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

